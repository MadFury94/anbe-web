import type { Env } from "../index";
import { json, notFound, toSlug } from "../lib/utils";

export async function handleBlog(request: Request, env: Env, path: string, isAdmin: boolean): Promise<Response> {
    const method = request.method;

    // GET /api/blog — list published posts (or all for admin)
    if (path === "/api/blog" && method === "GET") {
        const query = isAdmin
            ? "SELECT id, slug, title, excerpt, category, image, read_time, published, created_at FROM blog_posts ORDER BY created_at DESC"
            : "SELECT id, slug, title, excerpt, category, image, read_time, created_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC";
        const { results } = await env.DB.prepare(query).all();
        return json({ posts: results });
    }

    // GET /api/blog/:slug
    const slugMatch = path.match(/^\/api\/blog\/([a-z0-9-]+)$/);
    if (slugMatch && method === "GET") {
        const slug = slugMatch[1];
        const whereClause = isAdmin ? "WHERE slug = ?" : "WHERE slug = ? AND published = 1";
        const post = await env.DB.prepare(
            `SELECT * FROM blog_posts ${whereClause}`
        ).bind(slug).first();
        if (!post) return notFound();
        // Parse content JSON
        return json({ post: { ...post, content: JSON.parse(post.content as string) } });
    }

    // POST /api/blog — create post (admin only)
    if (path === "/api/blog" && method === "POST" && isAdmin) {
        const body = await request.json<{
            title: string; excerpt: string; content: string[];
            category: string; image: string; read_time: string; published?: boolean;
        }>();
        if (!body.title || !body.content) return json({ error: "title and content required" }, 400);
        const slug = toSlug(body.title);
        await env.DB.prepare(
            `INSERT INTO blog_posts (slug, title, excerpt, content, category, image, read_time, published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            slug, body.title, body.excerpt ?? "", JSON.stringify(body.content),
            body.category ?? "General", body.image ?? "", body.read_time ?? "5 min read",
            body.published ? 1 : 0
        ).run();
        return json({ slug }, 201);
    }

    // PUT /api/blog/:slug — update post (admin only)
    if (slugMatch && method === "PUT" && isAdmin) {
        const slug = slugMatch[1];
        const body = await request.json<Partial<{
            title: string; excerpt: string; content: string[];
            category: string; image: string; read_time: string; published: boolean;
        }>>();
        await env.DB.prepare(
            `UPDATE blog_posts SET
        title = COALESCE(?, title),
        excerpt = COALESCE(?, excerpt),
        content = COALESCE(?, content),
        category = COALESCE(?, category),
        image = COALESCE(?, image),
        read_time = COALESCE(?, read_time),
        published = COALESCE(?, published),
        updated_at = datetime('now')
       WHERE slug = ?`
        ).bind(
            body.title ?? null, body.excerpt ?? null,
            body.content ? JSON.stringify(body.content) : null,
            body.category ?? null, body.image ?? null, body.read_time ?? null,
            body.published !== undefined ? (body.published ? 1 : 0) : null,
            slug
        ).run();
        return json({ ok: true });
    }

    // DELETE /api/blog/:slug (admin only)
    if (slugMatch && method === "DELETE" && isAdmin) {
        await env.DB.prepare("DELETE FROM blog_posts WHERE slug = ?").bind(slugMatch[1]).run();
        return json({ ok: true });
    }

    return notFound();
}
