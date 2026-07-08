import type { Env } from "../index";
import { json, signJwt, verifyPassword } from "../lib/utils";

export async function handleAuth(request: Request, env: Env, path: string): Promise<Response> {
    // POST /api/auth/login
    if (path === "/api/auth/login" && request.method === "POST") {
        let body: { email?: string; password?: string };
        try {
            body = await request.json();
        } catch {
            return json({ error: "Invalid JSON" }, 400);
        }

        const { email, password } = body;
        if (!email || !password) return json({ error: "Email and password required" }, 400);

        // Look up admin by email (stored as username)
        const admin = await env.DB.prepare(
            "SELECT id, username as email, password_hash FROM admin_users WHERE username = ?"
        ).bind(email.toLowerCase().trim()).first<{ id: number; email: string; password_hash: string }>();

        if (!admin) return json({ error: "Invalid credentials" }, 401);

        const valid = await verifyPassword(password, admin.password_hash);
        if (!valid) return json({ error: "Invalid credentials" }, 401);

        // Sign JWT — 8 hour expiry
        const token = await signJwt(
            { sub: String(admin.id), email: admin.email, name: "Admin", exp: Math.floor(Date.now() / 1000) + 28800 },
            env.JWT_SECRET
        );

        return json({ token, admin: { id: admin.id, email: admin.email, name: "Admin" } });
    }

    // POST /api/auth/verify — check if a token is still valid
    if (path === "/api/auth/verify" && request.method === "POST") {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) return json({ valid: false }, 401);
        const { verifyJwt } = await import("../lib/utils");
        const payload = await verifyJwt(authHeader.slice(7), env.JWT_SECRET);
        if (!payload) return json({ valid: false }, 401);
        return json({ valid: true, admin: { email: payload.email, name: payload.name } });
    }

    return json({ error: "Not found" }, 404);
}
