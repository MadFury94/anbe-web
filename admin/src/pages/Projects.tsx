import { useEffect, useState } from "react";
import { api, type Project } from "../lib/api";
import Modal from "../components/Modal";

const S = `
  .data-table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:4px;overflow:hidden;}
  .data-table th{background:#f8fafc;padding:11px 16px;text-align:left;font-size:11px;font-weight:600;color:#4A5568;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e2e8f0;}
  .data-table td{padding:13px 16px;font-size:14px;color:#1a202c;border-bottom:1px solid #f0f4f8;vertical-align:middle;}
  .data-table tr:last-child td{border-bottom:none;}
  .data-table tr:hover td{background:#fafbff;}
  .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
  .badge-green{background:#f0fff4;color:#276749;}
  .badge-gray{background:#f7fafc;color:#718096;}
  .action-btn{padding:6px 12px;font-size:12px;font-weight:500;border-radius:4px;cursor:pointer;border:1px solid #e2e8f0;background:#fff;color:#4A5568;margin-right:6px;transition:all .15s;}
  .action-btn:hover{background:#f0f4f8;}
  .action-btn.danger:hover{background:#fff5f5;border-color:#fc8181;color:#c53030;}
  .toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;}
  .add-btn{padding:10px 18px;background:#E8873A;color:#0A1628;font-size:13px;font-weight:600;border:none;border-radius:4px;cursor:pointer;}
  .add-btn:hover{background:#F0A669;}
  .empty{text-align:center;padding:48px;color:#8B95A1;font-size:14px;}
`;

const EMPTY: Partial<Project> = { title: "", client: "", category: "pipeline", tag: "Pipeline", description: "", image: "", location: "", duration: "", scope: "", published: 1 };
const CATS = ["pipeline", "flare", "fabrication", "maintenance", "engineering"];

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState<"add" | "edit" | null>(null);
    const [form, setForm] = useState<Partial<Project>>(EMPTY);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const load = () => {
        setLoading(true);
        api.getProjects().then(r => { setProjects(r.projects); setLoading(false); }).catch(() => setLoading(false));
    };
    useEffect(load, []);

    const openAdd = () => { setForm(EMPTY); setError(""); setModal("add"); };
    const openEdit = (p: Project) => { setForm(p); setError(""); setModal("edit"); };
    const close = () => { setModal(null); setError(""); };

    const save = async () => {
        setSaving(true); setError("");
        try {
            if (modal === "add") await api.createProject(form);
            else await api.updateProject(form.slug!, form);
            close(); load();
        } catch (e) { setError((e as Error).message); }
        finally { setSaving(false); }
    };

    const del = async (slug: string) => {
        if (!confirm("Delete this project?")) return;
        await api.deleteProject(slug); load();
    };

    const f = (k: keyof Project) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [k]: e.target.value }));

    const FormContent = (
        <>
            {error && <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", color: "#c53030", padding: "10px 14px", borderRadius: 4, marginBottom: 16, fontSize: 13 }}>{error}</div>}
            <div className="f-row">
                <div className="f-field"><label>Title *</label><input value={form.title || ""} onChange={f("title")} required /></div>
                <div className="f-field"><label>Client *</label><input value={form.client || ""} onChange={f("client")} required /></div>
            </div>
            <div className="f-row">
                <div className="f-field"><label>Category</label>
                    <select value={form.category || "pipeline"} onChange={f("category")}>
                        {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="f-field"><label>Tag Label</label><input value={form.tag || ""} onChange={f("tag")} placeholder="e.g. Flare Systems" /></div>
            </div>
            <div className="f-field"><label>Description</label><textarea value={form.description || ""} onChange={f("description")} /></div>
            <div className="f-row">
                <div className="f-field"><label>Location</label><input value={form.location || ""} onChange={f("location")} /></div>
                <div className="f-field"><label>Duration</label><input value={form.duration || ""} onChange={f("duration")} placeholder="e.g. 7 Months" /></div>
            </div>
            <div className="f-row">
                <div className="f-field"><label>Scope</label><input value={form.scope || ""} onChange={f("scope")} /></div>
                <div className="f-field"><label>Image path</label><input value={form.image || ""} onChange={f("image")} placeholder="/industrial-1.jpg" /></div>
            </div>
            <div className="f-field"><label>Published</label>
                <select value={form.published ? 1 : 0} onChange={e => setForm(p => ({ ...p, published: parseInt(e.target.value) }))}>
                    <option value={1}>Yes</option><option value={0}>No (draft)</option>
                </select>
            </div>
        </>
    );

    return (
        <>
            <style>{S}</style>
            <div className="page-header">
                <h1>Projects</h1>
                <p>Manage all project entries shown on the website.</p>
            </div>
            <div className="toolbar">
                <span style={{ fontSize: 14, color: "#8B95A1" }}>{projects.length} projects</span>
                <button className="add-btn" onClick={openAdd}>+ Add Project</button>
            </div>
            {loading ? <div className="empty">Loading…</div> : (
                <table className="data-table">
                    <thead><tr>
                        <th>Title</th><th>Client</th><th>Category</th><th>Location</th><th>Status</th><th>Actions</th>
                    </tr></thead>
                    <tbody>
                        {projects.length === 0 && <tr><td colSpan={6} className="empty">No projects yet</td></tr>}
                        {projects.map(p => (
                            <tr key={p.slug}>
                                <td><strong>{p.title}</strong></td>
                                <td>{p.client}</td>
                                <td>{p.tag || p.category}</td>
                                <td>{p.location}</td>
                                <td><span className={`badge ${p.published ? "badge-green" : "badge-gray"}`}>{p.published ? "Live" : "Draft"}</span></td>
                                <td>
                                    <button className="action-btn" onClick={() => openEdit(p)}>Edit</button>
                                    <button className="action-btn danger" onClick={() => del(p.slug)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {modal && (
                <Modal title={modal === "add" ? "Add Project" : "Edit Project"} onClose={close}
                    footer={<><button className="btn-ghost" onClick={close}>Cancel</button><button className="btn-primary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save Project"}</button></>}>
                    {FormContent}
                </Modal>
            )}
        </>
    );
}
