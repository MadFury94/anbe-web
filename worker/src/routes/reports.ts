import type { Env } from "../index";
import { json, notFound } from "../lib/utils";

// Generate a cryptographically random URL-safe token
async function generateToken(): Promise<string> {
    const bytes = crypto.getRandomValues(new Uint8Array(18));
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function parseJson(val: unknown): unknown {
    if (typeof val !== "string") return val;
    try { return JSON.parse(val); } catch { return val; }
}

function serializeReport(row: Record<string, unknown>) {
    return {
        ...row,
        scope: parseJson(row.scope),
        outcomes: parseJson(row.outcomes),
        images: parseJson(row.images),
        milestones: parseJson(row.milestones),
    };
}

export async function handleReports(
    request: Request, env: Env, path: string, isAdmin: boolean
): Promise<Response> {
    const method = request.method;

    // ── PUBLIC: GET /api/reports/:token — client views their report ────────
    const tokenMatch = path.match(/^\/api\/reports\/([A-Za-z0-9_-]{10,})$/);
    if (tokenMatch && method === "GET") {
        const token = tokenMatch[1];
        const row = await env.DB.prepare(
            "SELECT * FROM project_reports WHERE token = ?"
        ).bind(token).first<Record<string, unknown>>();
        if (!row) return notFound();

        // Check expiry
        if (row.expires_at && new Date(row.expires_at as string) < new Date()) {
            return json({ error: "This report link has expired." }, 410);
        }

        // Increment view count (fire-and-forget)
        env.DB.prepare(
            "UPDATE project_reports SET views = views + 1 WHERE token = ?"
        ).bind(token).run().catch(() => { });

        return json({ report: serializeReport(row) });
    }

    // Everything below requires admin auth ─────────────────────────────────
    if (!isAdmin) return json({ error: "Unauthorised" }, 401);

    // GET /api/reports — list all reports (admin)
    if (path === "/api/reports" && method === "GET") {
        const { results } = await env.DB.prepare(
            "SELECT id, token, title, client_name, client_company, category, location, views, created_at, expires_at FROM project_reports ORDER BY created_at DESC"
        ).all<Record<string, unknown>>();
        return json({ reports: results });
    }

    // POST /api/reports — create a new report (admin)
    if (path === "/api/reports" && method === "POST") {
        const body = await request.json<{
            title: string;
            client_name: string;
            client_company?: string;
            category?: string;
            location?: string;
            start_date?: string;
            end_date?: string;
            scope?: string[];
            outcomes?: string[];
            images?: string[];
            milestones?: { label: string; date: string; done: boolean }[];
            hse_note?: string;
            prepared_by?: string;
            expires_at?: string;
        }>();

        if (!body.title || !body.client_name) {
            return json({ error: "title and client_name are required" }, 400);
        }

        const token = await generateToken();

        await env.DB.prepare(`
            INSERT INTO project_reports
              (token, title, client_name, client_company, category, location,
               start_date, end_date, scope, outcomes, images, milestones,
               hse_note, prepared_by, expires_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `).bind(
            token,
            body.title,
            body.client_name,
            body.client_company ?? "",
            body.category ?? "",
            body.location ?? "",
            body.start_date ?? "",
            body.end_date ?? "",
            JSON.stringify(body.scope ?? []),
            JSON.stringify(body.outcomes ?? []),
            JSON.stringify(body.images ?? []),
            JSON.stringify(body.milestones ?? []),
            body.hse_note ?? "",
            body.prepared_by ?? "ANBE Nigeria Limited",
            body.expires_at ?? "",
        ).run();

        return json({ token, url: `/report/${token}` }, 201);
    }

    // PUT /api/reports/:token — update a report (admin)
    if (tokenMatch && method === "PUT" && isAdmin) {
        const token = tokenMatch[1];
        const body = await request.json<Record<string, unknown>>();
        await env.DB.prepare(`
            UPDATE project_reports SET
              title        = COALESCE(?, title),
              client_name  = COALESCE(?, client_name),
              client_company = COALESCE(?, client_company),
              category     = COALESCE(?, category),
              location     = COALESCE(?, location),
              start_date   = COALESCE(?, start_date),
              end_date     = COALESCE(?, end_date),
              scope        = COALESCE(?, scope),
              outcomes     = COALESCE(?, outcomes),
              images       = COALESCE(?, images),
              milestones   = COALESCE(?, milestones),
              hse_note     = COALESCE(?, hse_note),
              prepared_by  = COALESCE(?, prepared_by),
              expires_at   = COALESCE(?, expires_at),
              updated_at   = datetime('now')
            WHERE token = ?
        `).bind(
            body.title ?? null,
            body.client_name ?? null,
            body.client_company ?? null,
            body.category ?? null,
            body.location ?? null,
            body.start_date ?? null,
            body.end_date ?? null,
            body.scope ? JSON.stringify(body.scope) : null,
            body.outcomes ? JSON.stringify(body.outcomes) : null,
            body.images ? JSON.stringify(body.images) : null,
            body.milestones ? JSON.stringify(body.milestones) : null,
            body.hse_note ?? null,
            body.prepared_by ?? null,
            body.expires_at ?? null,
            token,
        ).run();
        return json({ ok: true });
    }

    // DELETE /api/reports/:token (admin)
    if (tokenMatch && method === "DELETE" && isAdmin) {
        await env.DB.prepare(
            "DELETE FROM project_reports WHERE token = ?"
        ).bind(tokenMatch[1]).run();
        return json({ ok: true });
    }

    return notFound();
}
