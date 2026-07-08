import { handleAuth } from "./routes/auth";
import { handleBlog } from "./routes/blog";
import { handleProjects } from "./routes/projects";
import { handleServices } from "./routes/services";
import { handleTeam } from "./routes/team";
import { handleContact } from "./routes/contact";
import { handleReports } from "./routes/reports";
import { cors, json, notFound, requireAuth } from "./lib/utils";

export interface Env {
    DB: D1Database;
    SESSIONS: KVNamespace;
    JWT_SECRET: string;
    ADMIN_PASSWORD_HASH: string;
    REPORTS_BUCKET: R2Bucket;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        // CORS preflight
        if (method === "OPTIONS") {
            return cors(new Response(null, { status: 204 }));
        }

        try {
            // Auth routes — public
            if (path.startsWith("/api/auth")) {
                return cors(await handleAuth(request, env, path));
            }

            // Public read endpoints
            if (method === "GET") {
                if (path.startsWith("/api/blog")) return cors(await handleBlog(request, env, path, false));
                if (path.startsWith("/api/projects")) return cors(await handleProjects(request, env, path, false));
                if (path.startsWith("/api/services")) return cors(await handleServices(request, env, path, false));
                if (path.startsWith("/api/team")) return cors(await handleTeam(request, env, path, false));
                // Public report access via token (no auth needed)
                if (path.startsWith("/api/reports/")) return cors(await handleReports(request, env, path, false));
            }

            // Protected write endpoints — require valid JWT
            const authError = await requireAuth(request, env);
            if (authError) return cors(authError);

            if (path.startsWith("/api/blog")) return cors(await handleBlog(request, env, path, true));
            if (path.startsWith("/api/projects")) return cors(await handleProjects(request, env, path, true));
            if (path.startsWith("/api/services")) return cors(await handleServices(request, env, path, true));
            if (path.startsWith("/api/team")) return cors(await handleTeam(request, env, path, true));
            if (path.startsWith("/api/contact")) return cors(await handleContact(request, env, path));
            if (path.startsWith("/api/reports")) return cors(await handleReports(request, env, path, true));

            return cors(notFound());
        } catch (err) {
            console.error(JSON.stringify({ error: String(err), path, method }));
            return cors(json({ error: "Internal server error" }, 500));
        }
    },
};
