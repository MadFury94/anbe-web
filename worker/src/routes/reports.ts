import type { Env } from "../index";
import { json, notFound } from "../lib/utils";

async function generateToken(): Promise<string> {
    const bytes = crypto.getRandomValues(new Uint8Array(18));
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function p(val: unknown): unknown {
    if (typeof val !== "string") return val;
    try { return JSON.parse(val); } catch { return val; }
}

function serialize(row: Record<string, unknown>) {
    return {
        ...row,
        achievements: p(row.achievements),
        work_summary: p(row.work_summary),
        materials: p(row.materials),
        hse_notes: p(row.hse_notes),
        hse_status: p(row.hse_status),
        personnel: p(row.personnel),
        equipment: p(row.equipment),
        images: p(row.images),
    };
}

export async function handleReports(
    request: Request, env: Env, path: string, isAdmin: boolean
): Promise<Response> {
    const method = request.method;
    const tokenMatch = path.match(/^\/api\/reports\/([A-Za-z0-9_-]{10,})$/);
    const uploadMatch = path.match(/^\/api\/reports\/([A-Za-z0-9_-]{10,})\/upload$/);

    // ── PUBLIC: GET /api/reports/:token ──────────────────────────────────
    if (tokenMatch && method === "GET" && !isAdmin) {
        const row = await env.DB.prepare(
            "SELECT * FROM project_reports WHERE token = ?"
        ).bind(tokenMatch[1]).first<Record<string, unknown>>();
        if (!row) return notFound();
        if (row.expires_at && new Date(row.expires_at as string) < new Date())
            return json({ error: "This report link has expired." }, 410);
        env.DB.prepare("UPDATE project_reports SET views = views + 1 WHERE token = ?")
            .bind(tokenMatch[1]).run().catch(() => { });
        return json({ report: serialize(row) });
    }

    // Everything below requires admin
    if (!isAdmin) return json({ error: "Unauthorised" }, 401);

    // GET /api/reports — list all (admin)
    if (path === "/api/reports" && method === "GET") {
        const { results } = await env.DB.prepare(
            `SELECT id, token, project_title, client_name, client_company,
             location, report_date, views, created_at, expires_at
             FROM project_reports ORDER BY created_at DESC`
        ).all<Record<string, unknown>>();
        return json({ reports: results });
    }

    // GET /api/reports/:token — full record (admin)
    if (tokenMatch && method === "GET") {
        const row = await env.DB.prepare(
            "SELECT * FROM project_reports WHERE token = ?"
        ).bind(tokenMatch[1]).first<Record<string, unknown>>();
        if (!row) return notFound();
        return json({ report: serialize(row) });
    }

    // POST /api/reports — create new report
    if (path === "/api/reports" && method === "POST") {
        const b = await request.json<Record<string, unknown>>();
        if (!b.project_title || !b.client_name)
            return json({ error: "project_title and client_name required" }, 400);
        const token = await generateToken();
        await env.DB.prepare(`
            INSERT INTO project_reports (
              token, project_title, client_name, client_company, contractor, location, report_date,
              introduction, scope_of_work, conclusion, achievements,
              work_summary, materials, hse_notes, hse_status, personnel, equipment,
              signoff_contractor_name, signoff_contractor_desig, signoff_contractor_date,
              signoff_client_name, signoff_client_desig, signoff_client_date,
              images, expires_at
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `).bind(
            token,
            b.project_title, b.client_name,
            b.client_company ?? "", b.contractor ?? "ANBE Nigeria Limited",
            b.location ?? "", b.report_date ?? "",
            b.introduction ?? "", b.scope_of_work ?? "", b.conclusion ?? "",
            JSON.stringify(b.achievements ?? []),
            JSON.stringify(b.work_summary ?? { mechanical: [], civil: [], ei: [] }),
            JSON.stringify(b.materials ?? { mechanical: [], civil: [], ei: [] }),
            JSON.stringify(b.hse_notes ?? []),
            JSON.stringify(b.hse_status ?? []),
            JSON.stringify(b.personnel ?? []),
            JSON.stringify(b.equipment ?? []),
            b.signoff_contractor_name ?? "", b.signoff_contractor_desig ?? "", b.signoff_contractor_date ?? "",
            b.signoff_client_name ?? "", b.signoff_client_desig ?? "", b.signoff_client_date ?? "",
            JSON.stringify(b.images ?? []),
            b.expires_at ?? "",
        ).run();
        return json({ token, url: `/report/${token}` }, 201);
    }

    // PUT /api/reports/:token — update
    if (tokenMatch && method === "PUT") {
        const b = await request.json<Record<string, unknown>>();
        const textFields = [
            "project_title", "client_name", "client_company", "contractor", "location", "report_date",
            "introduction", "scope_of_work", "conclusion", "expires_at",
            "signoff_contractor_name", "signoff_contractor_desig", "signoff_contractor_date",
            "signoff_client_name", "signoff_client_desig", "signoff_client_date",
        ];
        const jsonFields = ["achievements", "work_summary", "materials", "hse_notes", "hse_status", "personnel", "equipment", "images"];
        const sets: string[] = ["updated_at = datetime('now')"];
        const vals: unknown[] = [];
        textFields.forEach(f => { if (b[f] !== undefined) { sets.push(`${f} = ?`); vals.push(b[f]); } });
        jsonFields.forEach(f => { if (b[f] !== undefined) { sets.push(`${f} = ?`); vals.push(JSON.stringify(b[f])); } });
        vals.push(tokenMatch[1]);
        await env.DB.prepare(
            `UPDATE project_reports SET ${sets.join(", ")} WHERE token = ?`
        ).bind(...vals).run();
        return json({ ok: true });
    }

    // POST /api/reports/:token/upload — upload image to R2, attach URL to report
    if (uploadMatch && method === "POST") {
        const token = uploadMatch[1];
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        if (!file) return json({ error: "No file provided" }, 400);

        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const key = `reports/${token}/${Date.now()}.${ext}`;

        await env.REPORTS_BUCKET.put(key, await file.arrayBuffer(), {
            httpMetadata: { contentType: file.type || "image/jpeg" },
        });

        // Construct public URL — requires public bucket or custom domain
        const publicUrl = `https://pub-anbe-reports.r2.dev/${key}`;

        // Append URL to report's images array
        const row = await env.DB.prepare(
            "SELECT images FROM project_reports WHERE token = ?"
        ).bind(token).first<{ images: string }>();
        const imgs: string[] = row ? JSON.parse(row.images || "[]") : [];
        imgs.push(publicUrl);
        await env.DB.prepare(
            "UPDATE project_reports SET images = ?, updated_at = datetime('now') WHERE token = ?"
        ).bind(JSON.stringify(imgs), token).run();

        return json({ url: publicUrl, key });
    }

    // DELETE /api/reports/:token
    if (tokenMatch && method === "DELETE") {
        await env.DB.prepare("DELETE FROM project_reports WHERE token = ?")
            .bind(tokenMatch[1]).run();
        return json({ ok: true });
    }

    return notFound();
}
