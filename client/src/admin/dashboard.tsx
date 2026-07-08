"use client";
import { useEffect, useState, useCallback } from "react";

const API = import.meta.env.VITE_API_URL ?? "https://anbe-api.workers.dev";

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Inter',sans-serif;background:#F7F5F0;}
  .admin-layout{display:grid;grid-template-columns:240px 1fr;min-height:100vh;}
  .sidebar{background:#0A1628;padding:0;display:flex;flex-direction:column;position:fixed;top:0;left:0;width:240px;height:100vh;overflow-y:auto;z-index:100;}
  .sidebar-logo{padding:24px 24px 20px;border-bottom:1px solid rgba(247,245,240,0.1);}
  .sidebar-logo img{height:38px;width:auto;}
  .sidebar-logo .sub{font-family:'IBM Plex Mono',monospace;font-size:9px;color:#8B95A1;letter-spacing:0.1em;text-transform:uppercase;margin-top:6px;}
  .sidebar-nav{padding:16px 0;flex:1;}
  .nav-section{font-family:'IBM Plex Mono',monospace;font-size:9px;color:#4A5568;letter-spacing:0.12em;text-transform:uppercase;padding:8px 24px 6px;}
  .nav-item{display:flex;align-items:center;gap:10px;padding:10px 24px;color:rgba(247,245,240,0.62);font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;border-left:2px solid transparent;text-decoration:none;}
  .nav-item:hover{color:#fff;background:rgba(255,255,255,0.05);}
  .nav-item.active{color:#fff;background:rgba(232,135,58,0.12);border-left-color:#E8873A;}
  .nav-item .icon{font-size:15px;width:20px;text-align:center;}
  .sidebar-footer{padding:16px 24px;border-top:1px solid rgba(247,245,240,0.1);}
  .admin-name{font-family:'Space Grotesk',sans-serif;font-size:13px;color:#fff;font-weight:500;}
  .admin-email{font-size:11px;color:#8B95A1;margin-top:2px;}
  .logout-btn{margin-top:12px;width:100%;padding:8px;background:none;border:1px solid rgba(247,245,240,0.14);color:#8B95A1;font-size:12px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;}
  .logout-btn:hover{border-color:#E8873A;color:#E8873A;}
  .main-content{margin-left:240px;padding:40px;min-height:100vh;}
  .page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;}
  .page-title{font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:600;color:#0A1628;}
  .page-sub{font-size:13px;color:#8B95A1;margin-top:4px;}
  .btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;font-size:13px;font-weight:600;border-radius:2px;cursor:pointer;transition:all .25s;font-family:'Inter',sans-serif;border:none;}
  .btn-primary{background:#E8873A;color:#0A1628;}
  .btn-primary:hover{background:#F0A669;}
  .btn-ghost{background:none;border:1px solid rgba(10,22,40,0.15);color:#0A1628;}
  .btn-ghost:hover{background:#0A1628;color:#fff;}
  .btn-danger{background:none;border:1px solid rgba(239,68,68,0.3);color:#ef4444;font-size:12px;padding:6px 12px;}
  .btn-danger:hover{background:rgba(239,68,68,0.08);}
  .btn-sm{padding:7px 14px;font-size:12px;}
  .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:36px;}
  .stat-card{background:#fff;border:1px solid rgba(10,22,40,0.1);padding:22px 24px;}
  .stat-card .s-val{font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:700;color:#0A1628;}
  .stat-card .s-lbl{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#8B95A1;letter-spacing:0.06em;text-transform:uppercase;margin-top:6px;}
  .stat-card .s-new{font-size:11px;color:#E8873A;margin-top:4px;}
  .card{background:#fff;border:1px solid rgba(10,22,40,0.1);}
  .card-head{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid rgba(10,22,40,0.08);}
  .card-head h3{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:600;color:#0A1628;}
  .table{width:100%;border-collapse:collapse;}
  .table th{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#8B95A1;letter-spacing:0.06em;text-transform:uppercase;padding:12px 16px;text-align:left;border-bottom:1px solid rgba(10,22,40,0.08);background:#F7F5F0;}
  .table td{padding:14px 16px;border-bottom:1px solid rgba(10,22,40,0.06);font-size:13px;color:#12181F;vertical-align:middle;}
  .table tr:last-child td{border-bottom:none;}
  .table tr:hover td{background:#F7F5F0;}
  .badge{display:inline-block;padding:3px 10px;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.04em;text-transform:uppercase;border-radius:2px;}
  .badge-green{background:rgba(34,197,94,0.1);color:#15803d;}
  .badge-grey{background:rgba(10,22,40,0.07);color:#4A5568;}
  .badge-amber{background:rgba(232,135,58,0.1);color:#B4502A;}
  .badge-blue{background:rgba(59,130,246,0.1);color:#1d4ed8;}
  .modal-overlay{position:fixed;inset:0;background:rgba(10,22,40,0.6);backdrop-filter:blur(4px);z-index:500;display:flex;align-items:center;justify-content:center;padding:24px;}
  .modal{background:#fff;width:100%;max-width:640px;max-height:90vh;overflow-y:auto;border:1px solid rgba(10,22,40,0.1);}
  .modal-head{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid rgba(10,22,40,0.08);}
  .modal-head h3{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;color:#0A1628;}
  .modal-close{background:none;border:none;font-size:18px;color:#8B95A1;cursor:pointer;padding:4px;}
  .modal-body{padding:24px;}
  .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .form-full{grid-column:1/-1;}
  .f-label{display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;color:#4A5568;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:7px;}
  .f-input{width:100%;border:1px solid rgba(10,22,40,0.15);background:#fff;padding:10px 12px;font-family:'Inter',sans-serif;font-size:13.5px;color:#12181F;outline:none;transition:border-color .2s;}
  .f-input:focus{border-color:#E8873A;}
  .f-textarea{resize:vertical;min-height:100px;}
  .f-select{width:100%;border:1px solid rgba(10,22,40,0.15);background:#fff;padding:10px 12px;font-family:'Inter',sans-serif;font-size:13.5px;color:#12181F;outline:none;}
  .modal-foot{padding:16px 24px;border-top:1px solid rgba(10,22,40,0.08);display:flex;gap:10px;justify-content:flex-end;}
  .tab-row{display:flex;gap:0;border-bottom:1px solid rgba(10,22,40,0.1);margin-bottom:28px;}
  .tab{padding:12px 20px;font-size:13px;font-weight:500;color:#8B95A1;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;font-family:'Inter',sans-serif;}
  .tab.active{color:#0A1628;border-bottom-color:#E8873A;}
  .empty{padding:48px 24px;text-align:center;color:#8B95A1;font-size:14px;}
  .unread-dot{width:8px;height:8px;background:#E8873A;border-radius:50%;display:inline-block;margin-right:6px;}
  @media(max-width:900px){.admin-layout{grid-template-columns:1fr;}.sidebar{display:none;}.main-content{margin-left:0;padding:24px;}.stats-row{grid-template-columns:repeat(2,1fr);}.form-grid{grid-template-columns:1fr;}}
`;

// ── Auth helpers ──────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem("anbe_token") ?? ""; }
function getAdmin() {
    try { return JSON.parse(localStorage.getItem("anbe_admin") ?? "{}"); }
    catch { return {}; }
}
function authHeaders() {
    return { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };
}

// ── Types ─────────────────────────────────────────────────────────────────
interface Post { id: number; slug: string; title: string; category: string; published: number; created_at: string; }
interface Project { id: number; slug: string; title: string; client: string; category: string; published: number; }
interface Submission { id: number; name: string; email: string; scope: string; message: string; read: number; created_at: string; }
interface Service { id: number; idx: string; title: string; sort_order: number; }

// ── API calls ─────────────────────────────────────────────────────────────
async function apiFetch(path: string, opts?: RequestInit) {
    const res = await fetch(`${API}${path}`, { ...opts, headers: { ...authHeaders(), ...(opts?.headers ?? {}) } });
    if (res.status === 401) { localStorage.clear(); window.location.href = "/admin"; }
    return res.json();
}

// ── Overview Tab ──────────────────────────────────────────────────────────
function OverviewTab({ posts, projects, submissions, services }: { posts: Post[]; projects: Project[]; submissions: Submission[]; services: Service[]; }) {
    const unread = submissions.filter(s => !s.read).length;
    return (
        <div>
            <div className="stats-row">
                {[
                    { val: posts.length, lbl: "Blog Posts", new: `${posts.filter(p => p.published).length} published` },
                    { val: projects.length, lbl: "Projects", new: `${projects.filter(p => p.published).length} visible` },
                    { val: services.length, lbl: "Services", new: "6 active" },
                    { val: submissions.length, lbl: "Enquiries", new: unread ? `${unread} unread` : "All read" },
                ].map(s => (
                    <div key={s.lbl} className="stat-card">
                        <div className="s-val">{s.val}</div>
                        <div className="s-lbl">{s.lbl}</div>
                        <div className="s-new">{s.new}</div>
                    </div>
                ))}
            </div>
            <div className="card">
                <div className="card-head"><h3>Recent Enquiries</h3></div>
                <table className="table">
                    <thead><tr><th>Name</th><th>Email</th><th>Scope</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>
                        {submissions.slice(0, 5).map(s => (
                            <tr key={s.id}>
                                <td>{s.read ? "" : <span className="unread-dot" />}{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.scope || "—"}</td>
                                <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>{s.created_at?.slice(0, 10)}</td>
                                <td><span className={`badge ${s.read ? "badge-grey" : "badge-amber"}`}>{s.read ? "Read" : "New"}</span></td>
                            </tr>
                        ))}
                        {!submissions.length && <tr><td colSpan={5} className="empty">No submissions yet</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Blog Tab ──────────────────────────────────────────────────────────────
function BlogTab({ posts, reload }: { posts: Post[]; reload: () => void }) {
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ title: "", excerpt: "", category: "Engineering", image: "/industrial-1.jpg", read_time: "5 min read", published: true, content: "" });

    const create = async () => {
        const paragraphs = form.content.split("\n\n").map(p => p.trim()).filter(Boolean);
        await apiFetch("/api/blog", { method: "POST", body: JSON.stringify({ ...form, content: paragraphs }) });
        setModal(false); reload();
    };
    const toggle = async (slug: string, published: number) => {
        await apiFetch(`/api/blog/${slug}`, { method: "PUT", body: JSON.stringify({ published: !published }) });
        reload();
    };
    const del = async (slug: string) => {
        if (!confirm("Delete this post?")) return;
        await apiFetch(`/api/blog/${slug}`, { method: "DELETE" });
        reload();
    };

    return (
        <div>
            <div className="card">
                <div className="card-head">
                    <h3>Blog Posts</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => setModal(true)}>+ New Post</button>
                </div>
                <table className="table">
                    <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                    <tbody>
                        {posts.map(p => (
                            <tr key={p.id}>
                                <td style={{ fontWeight: 500 }}>{p.title}</td>
                                <td><span className="badge badge-blue">{p.category}</span></td>
                                <td><span className={`badge ${p.published ? "badge-green" : "badge-grey"}`}>{p.published ? "Published" : "Draft"}</span></td>
                                <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>{p.created_at?.slice(0, 10)}</td>
                                <td style={{ display: "flex", gap: 8 }}>
                                    <button className="btn btn-ghost btn-sm" onClick={() => toggle(p.slug, p.published)}>{p.published ? "Unpublish" : "Publish"}</button>
                                    <button className="btn btn-danger" onClick={() => del(p.slug)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!posts.length && <tr><td colSpan={5} className="empty">No posts yet</td></tr>}
                    </tbody>
                </table>
            </div>

            {modal && (
                <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
                    <div className="modal">
                        <div className="modal-head"><h3>New Blog Post</h3><button className="modal-close" onClick={() => setModal(false)}>✕</button></div>
                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-full"><label className="f-label">Title</label><input className="f-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
                                <div><label className="f-label">Category</label>
                                    <select className="f-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                        {["Engineering", "Field Work", "Safety", "Company", "Fabrication", "Industry"].map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div><label className="f-label">Read Time</label><input className="f-input" value={form.read_time} onChange={e => setForm(f => ({ ...f, read_time: e.target.value }))} /></div>
                                <div className="form-full"><label className="f-label">Image Path (e.g. /industrial-1.jpg)</label><input className="f-input" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} /></div>
                                <div className="form-full"><label className="f-label">Excerpt</label><textarea className="f-input f-textarea" style={{ minHeight: 70 }} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} /></div>
                                <div className="form-full"><label className="f-label">Content (separate paragraphs with a blank line)</label><textarea className="f-input f-textarea" style={{ minHeight: 180 }} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} /></div>
                                <div><label className="f-label">Status</label>
                                    <select className="f-select" value={form.published ? "1" : "0"} onChange={e => setForm(f => ({ ...f, published: e.target.value === "1" }))}>
                                        <option value="1">Published</option><option value="0">Draft</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-foot">
                            <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={create}>Create Post</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Projects Tab ──────────────────────────────────────────────────────────
function ProjectsTab({ projects, reload }: { projects: Project[]; reload: () => void }) {
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ title: "", client: "", category: "pipeline", description: "", location: "", duration: "", scope: "", image: "" });

    const create = async () => {
        await apiFetch("/api/projects", { method: "POST", body: JSON.stringify({ ...form, published: true }) });
        setModal(false); reload();
    };
    const toggle = async (slug: string, published: number) => {
        await apiFetch(`/api/projects/${slug}`, { method: "PUT", body: JSON.stringify({ published: !published }) });
        reload();
    };
    const del = async (slug: string) => {
        if (!confirm("Delete this project?")) return;
        await apiFetch(`/api/projects/${slug}`, { method: "DELETE" });
        reload();
    };

    return (
        <div>
            <div className="card">
                <div className="card-head">
                    <h3>Projects</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => setModal(true)}>+ New Project</button>
                </div>
                <table className="table">
                    <thead><tr><th>Title</th><th>Client</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {projects.map(p => (
                            <tr key={p.id}>
                                <td style={{ fontWeight: 500 }}>{p.title}</td>
                                <td>{p.client}</td>
                                <td><span className="badge badge-blue">{p.category}</span></td>
                                <td><span className={`badge ${p.published ? "badge-green" : "badge-grey"}`}>{p.published ? "Visible" : "Hidden"}</span></td>
                                <td style={{ display: "flex", gap: 8 }}>
                                    <button className="btn btn-ghost btn-sm" onClick={() => toggle(p.slug, p.published)}>{p.published ? "Hide" : "Show"}</button>
                                    <button className="btn btn-danger" onClick={() => del(p.slug)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!projects.length && <tr><td colSpan={5} className="empty">No projects yet</td></tr>}
                    </tbody>
                </table>
            </div>

            {modal && (
                <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
                    <div className="modal">
                        <div className="modal-head"><h3>New Project</h3><button className="modal-close" onClick={() => setModal(false)}>✕</button></div>
                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-full"><label className="f-label">Title</label><input className="f-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
                                <div><label className="f-label">Client</label><input className="f-input" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} /></div>
                                <div><label className="f-label">Category</label>
                                    <select className="f-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                        <option value="flare">Flare Systems</option>
                                        <option value="pipeline">Pipeline</option>
                                        <option value="fabrication">Fabrication</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </div>
                                <div><label className="f-label">Location</label><input className="f-input" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
                                <div><label className="f-label">Duration</label><input className="f-input" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} /></div>
                                <div><label className="f-label">Scope</label><input className="f-input" value={form.scope} onChange={e => setForm(f => ({ ...f, scope: e.target.value }))} /></div>
                                <div className="form-full"><label className="f-label">Image Path</label><input className="f-input" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} /></div>
                                <div className="form-full"><label className="f-label">Description</label><textarea className="f-input f-textarea" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
                            </div>
                        </div>
                        <div className="modal-foot">
                            <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={create}>Create Project</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Enquiries Tab ─────────────────────────────────────────────────────────
function EnquiriesTab({ submissions, reload }: { submissions: Submission[]; reload: () => void }) {
    const [selected, setSelected] = useState<Submission | null>(null);

    const markRead = async (id: number) => {
        await apiFetch(`/api/contact/${id}/read`, { method: "PUT" });
        reload();
    };
    const del = async (id: number) => {
        if (!confirm("Delete this submission?")) return;
        await apiFetch(`/api/contact/${id}`, { method: "DELETE" });
        setSelected(null); reload();
    };

    return (
        <div>
            <div className="card">
                <div className="card-head"><h3>Contact Submissions</h3></div>
                <table className="table">
                    <thead><tr><th>Name</th><th>Email</th><th>Scope</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {submissions.map(s => (
                            <tr key={s.id} style={{ cursor: "pointer" }} onClick={() => setSelected(s)}>
                                <td>{s.read ? "" : <span className="unread-dot" />}<strong>{s.name}</strong></td>
                                <td>{s.email}</td>
                                <td>{s.scope || "—"}</td>
                                <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>{s.created_at?.slice(0, 10)}</td>
                                <td><span className={`badge ${s.read ? "badge-grey" : "badge-amber"}`}>{s.read ? "Read" : "New"}</span></td>
                                <td style={{ display: "flex", gap: 8 }} onClick={e => e.stopPropagation()}>
                                    {!s.read && <button className="btn btn-ghost btn-sm" onClick={() => markRead(s.id)}>Mark Read</button>}
                                    <button className="btn btn-danger" onClick={() => del(s.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!submissions.length && <tr><td colSpan={6} className="empty">No submissions yet</td></tr>}
                    </tbody>
                </table>
            </div>

            {selected && (
                <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
                    <div className="modal">
                        <div className="modal-head">
                            <h3>{selected.name}</h3>
                            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                                {[["Email", selected.email], ["Scope", selected.scope || "—"], ["Date", selected.created_at?.slice(0, 16)]].map(([l, v]) => (
                                    <div key={l}>
                                        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "#8B95A1", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>{l}</div>
                                        <div style={{ fontSize: 14, color: "#0A1628", fontWeight: 500 }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "#8B95A1", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Message</div>
                            <div style={{ fontSize: 14, color: "#12181F", lineHeight: 1.7, background: "#F7F5F0", padding: "14px 16px", border: "1px solid rgba(10,22,40,0.08)" }}>{selected.message}</div>
                        </div>
                        <div className="modal-foot">
                            {!selected.read && <button className="btn btn-ghost" onClick={() => { markRead(selected.id); setSelected(null); }}>Mark as Read</button>}
                            <a href={`mailto:${selected.email}`} className="btn btn-primary" style={{ textDecoration: "none" }}>Reply via Email →</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Services Tab ──────────────────────────────────────────────────────────
function ServicesTab({ services }: { services: Service[] }) {
    return (
        <div>
            <div className="card">
                <div className="card-head"><h3>Services</h3><span style={{ fontSize: 12, color: "#8B95A1" }}>Edit via API or seed migration</span></div>
                <table className="table">
                    <thead><tr><th>#</th><th>Index</th><th>Title</th><th>Order</th></tr></thead>
                    <tbody>
                        {services.map(s => (
                            <tr key={s.id}>
                                <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#8B95A1" }}>{s.id}</td>
                                <td><span className="badge badge-amber">{s.idx}</span></td>
                                <td style={{ fontWeight: 500 }}>{s.title}</td>
                                <td>{s.sort_order}</td>
                            </tr>
                        ))}
                        {!services.length && <tr><td colSpan={4} className="empty">No services. Run seed migration.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Main Dashboard ────────────────────────────────────────────────────────
export default function AdminDashboard() {
    const [tab, setTab] = useState("overview");
    const [posts, setPosts] = useState<Post[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const admin = getAdmin();

    const loadAll = useCallback(async () => {
        const [b, p, c, s] = await Promise.all([
            apiFetch("/api/blog"),
            apiFetch("/api/projects"),
            apiFetch("/api/contact"),
            apiFetch("/api/services"),
        ]);
        setPosts(b.posts ?? []);
        setProjects(p.projects ?? []);
        setSubmissions(c.submissions ?? []);
        setServices(s.services ?? []);
    }, []);

    useEffect(() => {
        if (!getToken()) { window.location.href = "/admin"; return; }
        loadAll();
    }, [loadAll]);

    const logout = () => { localStorage.clear(); window.location.href = "/admin"; };

    const TABS = [
        { id: "overview", label: "Overview", icon: "◈" },
        { id: "blog", label: "Blog", icon: "✦" },
        { id: "projects", label: "Projects", icon: "◉" },
        { id: "enquiries", label: "Enquiries", icon: "✉", badge: submissions.filter(s => !s.read).length },
        { id: "services", label: "Services", icon: "⚙" },
    ];

    return (
        <>
            <style>{S}</style>
            <div className="admin-layout">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-logo">
                        <img src="/anbe-logo.svg" alt="ANBE" />
                        <div className="sub">Admin Dashboard</div>
                    </div>
                    <nav className="sidebar-nav">
                        <div className="nav-section">Content</div>
                        {TABS.map(t => (
                            <div
                                key={t.id}
                                className={`nav-item${tab === t.id ? " active" : ""}`}
                                onClick={() => setTab(t.id)}
                            >
                                <span className="icon">{t.icon}</span>
                                {t.label}
                                {t.badge ? <span style={{ marginLeft: "auto", background: "#E8873A", color: "#0A1628", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{t.badge}</span> : null}
                            </div>
                        ))}
                        <div className="nav-section" style={{ marginTop: 16 }}>Site</div>
                        <a href="/" target="_blank" className="nav-item"><span className="icon">↗</span>View Website</a>
                    </nav>
                    <div className="sidebar-footer">
                        <div className="admin-name">{admin.name ?? "Admin"}</div>
                        <div className="admin-email">{admin.email ?? ""}</div>
                        <button className="logout-btn" onClick={logout}>Sign Out</button>
                    </div>
                </aside>

                {/* Main */}
                <main className="main-content">
                    <div className="page-header">
                        <div>
                            <div className="page-title">{TABS.find(t => t.id === tab)?.label}</div>
                            <div className="page-sub">ANBE Nigeria Limited — Content Management</div>
                        </div>
                    </div>

                    {tab === "overview" && <OverviewTab posts={posts} projects={projects} submissions={submissions} services={services} />}
                    {tab === "blog" && <BlogTab posts={posts} reload={loadAll} />}
                    {tab === "projects" && <ProjectsTab projects={projects} reload={loadAll} />}
                    {tab === "enquiries" && <EnquiriesTab submissions={submissions} reload={loadAll} />}
                    {tab === "services" && <ServicesTab services={services} />}
                </main>
            </div>
        </>
    );
}
