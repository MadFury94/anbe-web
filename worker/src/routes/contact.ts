import type { Env } from "../index";
import { json, notFound } from "../lib/utils";

export async function handleContact(request: Request, env: Env, path: string): Promise<Response> {
    const method = request.method;

    // POST /api/contact — public form submission
    if (path === "/api/contact" && method === "POST") {
        const body = await request.json<{
            name: string; email: string; phone?: string;
            company?: string; scope?: string; message: string;
        }>();
        if (!body.name || !body.email || !body.message) {
            return json({ error: "name, email and message are required" }, 400);
        }
        await env.DB.prepare(
            "INSERT INTO contact_submissions (name, email, phone, company, scope, message) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(body.name, body.email, body.phone ?? "", body.company ?? "", body.scope ?? "", body.message).run();
        return json({ ok: true }, 201);
    }

    // GET /api/contact — list submissions (admin only — requireAuth already ran)
    if (path === "/api/contact" && method === "GET") {
        const { results } = await env.DB.prepare(
            "SELECT * FROM contact_submissions ORDER BY created_at DESC"
        ).all();
        return json({ submissions: results });
    }

    // PUT /api/contact/:id/read — mark as read
    const readMatch = path.match(/^\/api\/contact\/(\d+)\/read$/);
    if (readMatch && method === "PUT") {
        await env.DB.prepare("UPDATE contact_submissions SET read = 1 WHERE id = ?").bind(readMatch[1]).run();
        return json({ ok: true });
    }

    // DELETE /api/contact/:id
    const idMatch = path.match(/^\/api\/contact\/(\d+)$/);
    if (idMatch && method === "DELETE") {
        await env.DB.prepare("DELETE FROM contact_submissions WHERE id = ?").bind(idMatch[1]).run();
        return json({ ok: true });
    }

    return notFound();
}
