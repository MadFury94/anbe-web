import type { Env } from "../index";
import { json, notFound, toSlug } from "../lib/utils";

export async function handleProjects(request: Request, env: Env, path: string, isAdmin: boolean): Promise<Response> {
    const method = request.method;

    // GET /api/projects
    if (path === "/api/projects" && method === "GET") {
        const url = new URL(request.url);
        const category = url.searchParams.get("category");
        let query = isAdmin
            ? "SELECT * FROM projects ORDER BY created_at DESC"
            : "SELECT * FROM projects WHERE published = 1 ORDER BY created_at DESC";
        if (category && category !== "all") {
            query = isAdmin
                ? `SELECT * FROM projects WHERE category = '${category}' ORDER BY created_at DESC`
                : `SELECT * FROM projects WHERE published = 1 AND category = '${category}' ORDER BY created_at DESC`;
        }
        const { results } = await env.DB.prepare(query).all();
        return json({ projects: results });
    }

    // GET /api/projects/:slug
    const slugMatch = path.match(/^\/api\/projects\/([a-z0-9-]+)$/);
    if (slugMatch && method === "GET") {
        const whereClause = isAdmin ? "WHERE slug = ?" : "WHERE slug = ? AND published = 1";
        const project = await env.DB.prepare(`SELECT * FROM projects ${whereClause}`).bind(slugMatch[1]).first();
        if (!project) return notFound();
        return json({ project });
    }

    // POST /api/projects
    if (path === "/api/projects" && method === "POST" && isAdmin) {
        const body = await request.json<{
            title: string; client: string; category: string; description: string;
            location: string; duration: string; scope: string; image?: string; published?: boolean;
        }>();
        if (!body.title || !body.client) return json({ error: "title and client required" }, 400);
        const slug = toSlug(body.title);
        await env.DB.prepare(
            `INSERT INTO projects (slug, title, client, category, description, location, duration, scope, image, published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            slug, body.title, body.client, body.category ?? "pipeline",
            body.description ?? "", body.location ?? "", body.duration ?? "",
            body.scope ?? "", body.image ?? "", body.published ? 1 : 1
        ).run();
        return json({ slug }, 201);
    }

    // PUT /api/projects/:slug
    if (slugMatch && method === "PUT" && isAdmin) {
        const body = await request.json<Record<string, unknown>>();
        await env.DB.prepare(
            `UPDATE projects SET
        title = COALESCE(?, title), client = COALESCE(?, client),
        category = COALESCE(?, category), description = COALESCE(?, description),
        location = COALESCE(?, location), duration = COALESCE(?, duration),
        scope = COALESCE(?, scope), image = COALESCE(?, image),
        published = COALESCE(?, published), updated_at = datetime('now')
       WHERE slug = ?`
        ).bind(
            body.title ?? null, body.client ?? null, body.category ?? null,
            body.description ?? null, body.location ?? null, body.duration ?? null,
            body.scope ?? null, body.image ?? null,
            body.published !== undefined ? (body.published ? 1 : 0) : null,
            slugMatch[1]
        ).run();
        return json({ ok: true });
    }

    // DELETE /api/projects/:slug
    if (slugMatch && method === "DELETE" && isAdmin) {
        await env.DB.prepare("DELETE FROM projects WHERE slug = ?").bind(slugMatch[1]).run();
        return json({ ok: true });
    }

    return notFound();
}
