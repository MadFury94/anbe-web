import type { Env } from "../index";
import { json, notFound } from "../lib/utils";

export async function handleTeam(request: Request, env: Env, path: string, isAdmin: boolean): Promise<Response> {
    const method = request.method;

    // GET /api/team
    if (path === "/api/team" && method === "GET") {
        const { results } = await env.DB.prepare(
            isAdmin
                ? "SELECT * FROM team_members ORDER BY sort_order ASC"
                : "SELECT * FROM team_members WHERE published = 1 ORDER BY sort_order ASC"
        ).all();
        return json({ team: results });
    }

    // GET /api/team/:id
    const idMatch = path.match(/^\/api\/team\/(\d+)$/);
    if (idMatch && method === "GET") {
        const member = await env.DB.prepare("SELECT * FROM team_members WHERE id = ?").bind(idMatch[1]).first();
        if (!member) return notFound();
        return json({ member });
    }

    // POST /api/team (admin)
    if (path === "/api/team" && method === "POST" && isAdmin) {
        const body = await request.json<{ name: string; role: string; image?: string; bio?: string; sort_order?: number }>();
        if (!body.name || !body.role) return json({ error: "name and role required" }, 400);
        await env.DB.prepare(
            "INSERT INTO team_members (name, role, image, bio, sort_order, published) VALUES (?, ?, ?, ?, ?, 1)"
        ).bind(body.name, body.role, body.image ?? "", body.bio ?? "", body.sort_order ?? 99).run();
        return json({ ok: true }, 201);
    }

    // PUT /api/team/:id (admin)
    if (idMatch && method === "PUT" && isAdmin) {
        const body = await request.json<Record<string, unknown>>();
        await env.DB.prepare(
            `UPDATE team_members SET
             name = COALESCE(?, name), role = COALESCE(?, role),
             image = COALESCE(?, image), bio = COALESCE(?, bio),
             sort_order = COALESCE(?, sort_order),
             published = COALESCE(?, published),
             updated_at = datetime('now')
             WHERE id = ?`
        ).bind(
            body.name ?? null, body.role ?? null, body.image ?? null,
            body.bio ?? null, body.sort_order ?? null,
            body.published !== undefined ? (body.published ? 1 : 0) : null,
            idMatch[1]
        ).run();
        return json({ ok: true });
    }

    // DELETE /api/team/:id (admin)
    if (idMatch && method === "DELETE" && isAdmin) {
        await env.DB.prepare("DELETE FROM team_members WHERE id = ?").bind(idMatch[1]).run();
        return json({ ok: true });
    }

    return notFound();
}
