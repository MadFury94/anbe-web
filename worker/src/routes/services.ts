import type { Env } from "../index";
import { json, notFound } from "../lib/utils";

export async function handleServices(request: Request, env: Env, path: string, isAdmin: boolean): Promise<Response> {
    const method = request.method;

    // GET /api/services
    if (path === "/api/services" && method === "GET") {
        const { results } = await env.DB.prepare(
            "SELECT * FROM services ORDER BY sort_order ASC"
        ).all();
        return json({ services: results.map(s => ({ ...s, features: JSON.parse(s.features as string) })) });
    }

    // GET /api/services/:id
    const idMatch = path.match(/^\/api\/services\/(\d+)$/);
    if (idMatch && method === "GET") {
        const service = await env.DB.prepare("SELECT * FROM services WHERE id = ?").bind(idMatch[1]).first();
        if (!service) return notFound();
        return json({ service: { ...service, features: JSON.parse(service.features as string) } });
    }

    // POST /api/services (admin)
    if (path === "/api/services" && method === "POST" && isAdmin) {
        const body = await request.json<{ idx: string; title: string; description: string; features: string[]; image?: string; sort_order?: number }>();
        await env.DB.prepare(
            "INSERT INTO services (idx, title, description, features, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(body.idx, body.title, body.description, JSON.stringify(body.features ?? []), body.image ?? "", body.sort_order ?? 0).run();
        return json({ ok: true }, 201);
    }

    // PUT /api/services/:id (admin)
    if (idMatch && method === "PUT" && isAdmin) {
        const body = await request.json<Record<string, unknown>>();
        await env.DB.prepare(
            `UPDATE services SET
        idx = COALESCE(?, idx), title = COALESCE(?, title),
        description = COALESCE(?, description),
        features = COALESCE(?, features),
        image = COALESCE(?, image),
        sort_order = COALESCE(?, sort_order),
        updated_at = datetime('now')
       WHERE id = ?`
        ).bind(
            body.idx ?? null, body.title ?? null, body.description ?? null,
            body.features ? JSON.stringify(body.features) : null,
            body.image ?? null, body.sort_order ?? null, idMatch[1]
        ).run();
        return json({ ok: true });
    }

    // DELETE /api/services/:id (admin)
    if (idMatch && method === "DELETE" && isAdmin) {
        await env.DB.prepare("DELETE FROM services WHERE id = ?").bind(idMatch[1]).run();
        return json({ ok: true });
    }

    return notFound();
}
