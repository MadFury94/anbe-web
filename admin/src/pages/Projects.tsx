import { useEffect, useState } from "react";
import { api, type Project } from "../lib/api";
import Modal from "../components/Modal";

const S = `
  /* ── Filter tabs ── */
  .proj-tabs{display:flex;align-items:center;gap:4px;flex-wrap:wrap;}
  .proj-tab{
    padding:7px 16px;background:transparent;border:1px solid #e2ddd5;
    font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:600;
    text-transform:uppercase;letter-spacing:0.07em;color:#8B95A1;cursor:pointer;
    transition:all .15s;
  }
  .proj-tab:hover{border-color:#c8c2b8;color:#0A1628;}
  .proj-tab.active{background:#E8873A;border-color:#E8873A;color:#0A1628;}

  .proj-count{
    font-family:'IBM Plex Mono',monospace;font-size:11px;
    color:#8B95A1;letter-spacing:0.04em;
  }

  /* ── Project cards ── */
  .proj-list{display:flex;flex-direction:column;gap:12px;}
  .proj-card{
    display:flex;align-items:stretch;background:#fff;
    border:1px solid #e8e4dc;border-left:3px solid transparent;
    transition:border-left-color .18s;overflow:hidden;
  }
  .proj-card:hover{border-left-color:#E8873A;}

  .proj-card-img{
    width:120px;min-width:120px;height:90px;object-fit:cover;
    display:block;flex-shrink:0;
  }
  .proj-card-img-fallback{
    width:120px;min-width:120px;height:90px;flex-shrink:0;
    background:linear-gradient(135deg,#0A1628 0%,#1a3052 100%);
    display:flex;align-items:center;justify-content:center;
  }
  .proj-card-body{
    flex:1;padding:14px 18px;display:flex;align-items:center;gap:16px;
    overflow:hidden;
  }
  .proj-card-info{flex:1;min-width:0;}
  .proj-card-title{
    font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;
    color:#0A1628;margin-bottom:4px;white-space:nowrap;
    overflow:hidden;text-overflow:ellipsis;
  }
  .proj-card-client{
    font-family:'IBM Plex Mono',monospace;font-size:10px;
    color:#8B95A1;text-transform:uppercase;letter-spacing:0.06em;
    margin-bottom:6px;
  }
  .proj-card-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .proj-cat-badge{
    font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;
    text-transform:uppercase;letter-spacing:0.06em;
    padding:2px 8px;background:#F7F5F0;color:#0A1628;border:1px solid #e2ddd5;
  }
  .proj-location{
    font-family:'Inter',sans-serif;font-size:12px;color:#8B95A1;
    display:flex;align-items:center;gap:4px;
  }

  .proj-status-dot{
    display:inline-flex;align-items:center;gap:5px;
    font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.04em;
    text-transform:uppercase;
  }
  .proj-status-dot::before{
    content:'';display:inline-block;width:6px;height:6px;border-radius:50%;
  }
  .proj-status-dot.live{color:#276749;}
  .proj-status-dot.live::before{background:#4CAF50;}
  .proj-status-dot.draft{color:#8B95A1;}
  .proj-status-dot.draft::before{background:#c8c2b8;}

  .proj-actions{display:flex;gap:6px;flex-shrink:0;}

  @media(max-width:680px){
    .proj-card{flex-direction:column;}
    .proj-card-img,.proj-card-img-fallback{width:100%;min-width:0;height:140px;}
    .proj-card-body{flex-wrap:wrap;}
    .proj-actions{margin-top:4px;}
  }
`;

const EMPTY: Partial<Project> = {
    title: "", client: "", category: "pipeline", tag: "Pipeline",
    description: "", image: "", location: "", duration: "", scope: "", published: 1,
};

const CATS = ["pipeline", "flare", "fabrication", "maintenance", "engineering"];
const FILTER_TABS = ["All", "Pipeline", "Flare", "Fabrication", "Maintenance"];

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState<"add" | "edit" | null>(null);
    const [form, setForm] = useState<Partial<Project>>(EMPTY);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const load = () => {
        setLoading(true);
        api.getProjects()
            .then((r) => { setProjects(r.projects); setLoading(false); })
            .catch(() => setLoading(false));
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

    const f =
        (k: keyof Project) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                setForm((prev) => ({ ...prev, [k]: e.target.value }));

    const filtered =
        activeFilter === "All"
            ? projects
            : projects.filter(
                (p) =>
                    p.category?.toLowerCase() === activeFilter.toLowerCase() ||
                    p.tag?.toLowerCase().includes(activeFilter.toLowerCase())
            );

    const FormContent = (
        <>
            {error && (
                <div
                    style={{
                        borderLeft: "3px solid #E8873A",
                        background: "#fff8f3",
                        color: "#c55a10",
                        padding: "10px 14px",
                        marginBottom: 16,
                        fontSize: 13,
                        fontFamily: "'Inter',sans-serif",
                    }}
                >
                    {error}
                </div>
            )}
            <div className="f-row">
                <div className="f-field">
                    <label>Title *</label>
                    <input value={form.title || ""} onChange={f("title")} required />
                </div>
                <div className="f-field">
                    <label>Client *</label>
                    <input value={form.client || ""} onChange={f("client")} required />
                </div>
            </div>
            <div className="f-row">
                <div className="f-field">
                    <label>Category</label>
                    <select value={form.category || "pipeline"} onChange={f("category")}>
                        {CATS.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div className="f-field">
                    <label>Tag Label</label>
                    <input value={form.tag || ""} onChange={f("tag")} placeholder="e.g. Flare Systems" />
                </div>
            </div>
            <div className="f-field">
                <label>Description</label>
                <textarea value={form.description || ""} onChange={f("description")} />
            </div>
            <div className="f-row">
                <div className="f-field">
                    <label>Location</label>
                    <input value={form.location || ""} onChange={f("location")} />
                </div>
                <div className="f-field">
                    <label>Duration</label>
                    <input value={form.duration || ""} onChange={f("duration")} placeholder="e.g. 7 Months" />
                </div>
            </div>
            <div className="f-row">
                <div className="f-field">
                    <label>Scope</label>
                    <input value={form.scope || ""} onChange={f("scope")} />
                </div>
                <div className="f-field">
                    <label>Image path</label>
                    <input value={form.image || ""} onChange={f("image")} placeholder="/industrial-1.jpg" />
                </div>
            </div>
            <div className="f-field">
                <label>Published</label>
                <select
                    value={form.published ? 1 : 0}
                    onChange={(e) => setForm((p) => ({ ...p, published: parseInt(e.target.value) }))}
                >
                    <option value={1}>Yes — Live</option>
                    <option value={0}>No — Draft</option>
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
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" as const }}>
                    <div className="proj-tabs">
                        {FILTER_TABS.map((tab) => (
                            <button
                                key={tab}
                                className={`proj-tab${activeFilter === tab ? " active" : ""}`}
                                onClick={() => setActiveFilter(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <span className="proj-count">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</span>
                </div>
                <button className="add-btn" onClick={openAdd}>+ Add Project</button>
            </div>

            {loading ? (
                <div className="empty">Loading…</div>
            ) : filtered.length === 0 ? (
                <div className="empty">No projects found.</div>
            ) : (
                <div className="proj-list">
                    {filtered.map((p) => (
                        <div className="proj-card" key={p.slug}>
                            {p.image ? (
                                <img
                                    className="proj-card-img"
                                    src={p.image}
                                    alt={p.title}
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                />
                            ) : (
                                <div className="proj-card-img-fallback">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <rect x="3" y="3" width="10" height="10" stroke="rgba(232,135,58,0.6)" strokeWidth="1.5" />
                                        <rect x="15" y="3" width="10" height="10" stroke="rgba(232,135,58,0.6)" strokeWidth="1.5" />
                                        <rect x="3" y="15" width="10" height="10" stroke="rgba(232,135,58,0.6)" strokeWidth="1.5" />
                                        <rect x="15" y="15" width="10" height="10" stroke="rgba(232,135,58,0.6)" strokeWidth="1.5" />
                                    </svg>
                                </div>
                            )}
                            <div className="proj-card-body">
                                <div className="proj-card-info">
                                    <div className="proj-card-title">{p.title}</div>
                                    <div className="proj-card-client">{p.client}</div>
                                    <div className="proj-card-meta">
                                        {p.tag && <span className="proj-cat-badge">{p.tag}</span>}
                                        {p.location && (
                                            <span className="proj-location">
                                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                                                    <path d="M5 1C3.07 1 1.5 2.57 1.5 4.5c0 2.72 3.5 6.5 3.5 6.5s3.5-3.78 3.5-6.5C8.5 2.57 6.93 1 5 1z" stroke="#8B95A1" strokeWidth="1.2" />
                                                    <circle cx="5" cy="4.5" r="1" fill="#8B95A1" />
                                                </svg>
                                                {p.location}
                                            </span>
                                        )}
                                        <span className={`proj-status-dot${p.published ? " live" : " draft"}`}>
                                            {p.published ? "Live" : "Draft"}
                                        </span>
                                    </div>
                                </div>
                                <div className="proj-actions">
                                    <button className="action-btn" onClick={() => openEdit(p)}>Edit</button>
                                    <button className="action-btn danger" onClick={() => del(p.slug)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modal && (
                <Modal
                    title={modal === "add" ? "Add Project" : "Edit Project"}
                    onClose={close}
                    footer={
                        <>
                            <button className="btn-ghost" onClick={close}>Cancel</button>
                            <button className="btn-primary" onClick={save} disabled={saving}>
                                {saving ? "Saving…" : "Save Project"}
                            </button>
                        </>
                    }
                >
                    {FormContent}
                </Modal>
            )}
        </>
    );
}
