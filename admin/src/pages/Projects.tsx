import { useEffect, useState } from "react";
import { api, type Project } from "../lib/api";
import Modal from "../components/Modal";

const S = `
  /* ── Filter tabs ── */
  .proj-filters {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
  }
  .proj-tab {
    padding: 7px 16px;
    background: transparent;
    border: 1px solid #E2DDD5;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #8B95A1;
    cursor: pointer;
    transition: all 0.13s;
    white-space: nowrap;
  }
  .proj-tab:hover { border-color: #c8c2b8; color: #0A1628; }
  .proj-tab.active { background: #0A1628; border-color: #0A1628; color: #fff; }

  .proj-count {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #8B95A1;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  /* ── Card grid ── */
  .proj-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (max-width: 1024px) { .proj-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px)  { .proj-grid { grid-template-columns: 1fr; } }

  /* ── Project card ── */
  .proj-card {
    background: #fff;
    border: 1px solid #E2DDD5;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .proj-card:hover {
    border-color: #c8c2b8;
    box-shadow: 0 4px 20px rgba(10,22,40,0.07);
  }

  /* Card image */
  .proj-card-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
    flex-shrink: 0;
  }
  .proj-card-img-fallback {
    width: 100%;
    aspect-ratio: 16/9;
    background: linear-gradient(135deg, #0A1628 0%, #152338 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Card top row: badge + status */
  .proj-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 0;
    gap: 8px;
  }
  .proj-cat-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    color: #E8873A;
    background: rgba(232,135,58,0.10);
    border: 1px solid rgba(232,135,58,0.25);
    padding: 3px 8px;
    white-space: nowrap;
    max-width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Card body */
  .proj-card-body {
    padding: 10px 16px 0;
    flex: 1;
  }
  .proj-card-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #0A1628;
    margin-bottom: 4px;
    line-height: 1.3;
    /* clamp to 2 lines */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .proj-card-client {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #8B95A1;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Meta pills */
  .proj-card-meta {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .proj-meta-pill {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #8B95A1;
    background: #F7F5F0;
    border: 1px solid #E2DDD5;
    padding: 3px 8px;
    white-space: nowrap;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Card footer */
  .proj-card-footer {
    border-top: 1px solid #F0ECE5;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .proj-card-actions {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  /* Mobile filter scroll */
  @media (max-width: 640px) {
    .proj-filters {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .proj-filters::-webkit-scrollbar { height: 0; }
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
        if (!confirm("Delete this project? This cannot be undone.")) return;
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
            {error && <div className="form-error">{error}</div>}
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
                            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
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
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" as const }}>
                    <div className="proj-filters">
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
                    <span className="proj-count">
                        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                    </span>
                </div>
                <button className="add-btn" onClick={openAdd}>+ Add Project</button>
            </div>

            {loading ? (
                <div className="empty">Loading…</div>
            ) : filtered.length === 0 ? (
                <div className="empty">No projects found.</div>
            ) : (
                <div className="proj-grid">
                    {filtered.map((p) => (
                        <div className="proj-card" key={p.slug}>
                            {/* Image */}
                            {p.image ? (
                                <img
                                    className="proj-card-img"
                                    src={p.image}
                                    alt={p.title}
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.style.display = "none";
                                        const fb = img.nextElementSibling as HTMLElement | null;
                                        if (fb) fb.style.display = "flex";
                                    }}
                                />
                            ) : null}
                            <div
                                className="proj-card-img-fallback"
                                style={{ display: p.image ? "none" : "flex" }}
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <rect x="3" y="3" width="11" height="11" stroke="rgba(232,135,58,0.5)" strokeWidth="1.5" />
                                    <rect x="18" y="3" width="11" height="11" stroke="rgba(232,135,58,0.5)" strokeWidth="1.5" />
                                    <rect x="3" y="18" width="11" height="11" stroke="rgba(232,135,58,0.5)" strokeWidth="1.5" />
                                    <rect x="18" y="18" width="11" height="11" stroke="rgba(232,135,58,0.5)" strokeWidth="1.5" />
                                </svg>
                            </div>

                            {/* Top: badge + status */}
                            <div className="proj-card-top">
                                {p.tag && <span className="proj-cat-badge">{p.tag}</span>}
                                <span className={`status-dot${p.published ? " live" : " draft"}`}>
                                    {p.published ? "Live" : "Draft"}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="proj-card-body">
                                <div className="proj-card-title">{p.title}</div>
                                <div className="proj-card-client">{p.client}</div>
                                <div className="proj-card-meta">
                                    {p.location && (
                                        <span className="proj-meta-pill" title={p.location}>
                                            📍 {p.location}
                                        </span>
                                    )}
                                    {p.duration && (
                                        <span className="proj-meta-pill" title={p.duration}>
                                            ⏱ {p.duration}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="proj-card-footer">
                                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "#8B95A1", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                                    {p.category}
                                </span>
                                <div className="proj-card-actions">
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
