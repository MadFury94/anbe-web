import type { Env } from "../index";

// ── JSON response helper ──────────────────────────────────────────────────
export function json(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export function notFound(): Response {
    return json({ error: "Not found" }, 404);
}

// ── CORS wrapper ──────────────────────────────────────────────────────────
export function cors(res: Response): Response {
    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return new Response(res.body, { status: res.status, headers });
}

// ── JWT (HS256) — pure Web Crypto, no libraries ───────────────────────────
function b64url(buf: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buf)))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function b64urlDecode(str: string): Uint8Array {
    const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64);
    return new Uint8Array([...bin].map((c) => c.charCodeAt(0)));
}

async function hmacKey(secret: string): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"]
    );
}

export async function signJwt(payload: Record<string, unknown>, secret: string): Promise<string> {
    const header = b64url(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
    const body = b64url(new TextEncoder().encode(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) })));
    const key = await hmacKey(secret);
    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${header}.${body}`));
    return `${header}.${body}.${b64url(sig)}`;
}

export async function verifyJwt(token: string, secret: string): Promise<Record<string, unknown> | null> {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify(
        "HMAC", key,
        b64urlDecode(sig),
        new TextEncoder().encode(`${header}.${body}`)
    );
    if (!valid) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body)));
    // Check expiry
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
}

// ── Auth middleware ───────────────────────────────────────────────────────
export async function requireAuth(request: Request, env: Env): Promise<Response | null> {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        return json({ error: "Unauthorised" }, 401);
    }
    const token = authHeader.slice(7);
    const payload = await verifyJwt(token, env.JWT_SECRET);
    if (!payload) return json({ error: "Invalid or expired token" }, 401);
    return null;
}

// ── Password hashing (SHA-256 based — use bcrypt in production via secrets) ─
// We store a pre-hashed password set via wrangler secret.
// At login we hash the submitted password and compare with timingSafeEqual.
export async function hashPassword(password: string): Promise<string> {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
    return b64url(buf);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
    const plainHash = new TextEncoder().encode(await hashPassword(plain));
    const storedHash = new TextEncoder().encode(hash);
    if (plainHash.length !== storedHash.length) return false;
    // Timing-safe comparison
    const key = await crypto.subtle.importKey("raw", crypto.getRandomValues(new Uint8Array(32)), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const [a, b] = await Promise.all([
        crypto.subtle.sign("HMAC", key, plainHash),
        crypto.subtle.sign("HMAC", key, storedHash),
    ]);
    const aBytes = new Uint8Array(a);
    const bBytes = new Uint8Array(b);
    let diff = 0;
    for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i];
    return diff === 0;
}

// ── Slug generator ────────────────────────────────────────────────────────
export function toSlug(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
