import { useEffect, useState } from "react";
import { api, type Service } from "../lib/api";
import Modal from "../components/Modal";

const S = `
  /* ── Service row cards ── */
  .svc-list{display:flex;flex-direction:column;gap:10px;}
  .svc-card{
    display:flex;align-items:stretch;background:#fff;
    border:1px solid #e8e4dc;border-left:3px solid #E8873A;
    transition:box-shadow .18s;overflow:hidden;
  }
  .svc-card:hover{box-shadow:0 2px 12px rgba(10,22,40,0.08);}

  /* Drag handle */
  .svc-drag{
    width:32px;min-width:32px;display:flex;align-items:center;justify-content:center;
    border-right:1px solid #f0ece5;color:#c8c2b8;font-size:16px;cursor:grab;
    flex-shrink:0;user-select:none;
  }

  /* Number badge */
  .svc-num{
    width:52px;min-width:52px;display:flex;align-items:center;justify-content:center;
    border-right:1px solid #f0ece5;flex-shrink:0;
  }
  .svc-num span{
    font-family:'IBM Plex Mono',monospace;font-size:18px;font-weight:700;
    color:#E8873A;letter-spacing:-0.02em;
  }

  .svc-body{flex:1;padding:16px 20px;display:flex;align-items:center;gap:20px;overflow:hidden;}
  .svc-info{flex:1;min-width:0;}
  .svc-title{
    font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;
    color:#0A1628;margin-bottom:4px;
  }
  .svc-desc{
    font-family:'Inter',sans-serif;font-size:13px;color:#8B95A1;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
    margin-bottom:6px;
  }
  .svc-meta{display:flex;align-items:center;gap:10px;}
  .svc-feat-count{
    font-family:'IBM Plex Mono',monospace;font-size:10px;
    color:#8B95A1;letter-spacing:0.04em;
    display:flex;align-items:center;gap:4px;
  }

  .svc-status-dot{
    display:inline-flex;align-items:center;gap:5px;
    font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.04em;
    text-transform:uppercase;
  }
  .svc-status-dot::before{
    content:'';display:inline-block;width:6px;height:6px;border-radius:50%;
  }
  .svc-status-dot.live{color:#276749;}
  .svc-status-dot.live::before{background:#4CAF50;}
  .svc-status-dot.draft{color:#8B95A1;}
  .svc-status-dot.draft::before{background:#c8c2b8;}

  .svc-actions{display:flex;gap:6px;flex-shrink:0;}

  @media(max-width:640px){
    .svc-body{flex-wrap:wrap;gap:10px;}
    .svc-num{width:40px;min-width:40px;}
    .svc-drag{width:24px;min-width:24px;}
  }
`;

const EMPTY: Partial<Service> = {
    idx: "", title: "", description: "", features: [], image: "", sort_order: 99, published: 1,
};

function formatNum(n: number): string {
    return String(n).padStart(2, "0");
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState<"add" | "edit" | null>(null);
    const [form, setForm] = useState<Partial<Service>>(EMPTY);
    const [featuresStr, setFeaturesStr] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const load = () => {
        setLoading(true);
        api.getServices()
            .then((r) => { setServices(r.services); setLoading(false); })
            .catch(() => setLoading(false));
    };
    useEffect(load, []);

    const openAdd = () => { setForm(EMPTY); setFeaturesStr(""); setError(""); setModal("add"); };
    const openEdit = (s: Service) => {
        setForm(s);
        setFeaturesStr((s.features || []).join("\n"));
        setError("");
        setModal("edit");
    };
    const close = () => { setModal(null); setError(""); };

    const save = async () => {
        setSaving(true); setError("");
        const features = featuresStr.split("\n").map((f) => f.trim()).filter(Boolean);
        try {
            if (modal === "add") await api.createService({ ...form, features });
            else await api.updateService(form.id!, { ...form, features });
            close(); load();
        } catch (e) { setError((e as Error).message); }
        finally { setSaving(false); }
    };

    const del = async (id: number) => {
        if (!confirm("Delete this service?")) return;
        await api.deleteService(id); load();
    };

    const f =
        (k: keyof Service) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                setForm((prev) => ({ ...prev, [k]: e.target.value }));

    return (
        <>
            <style>{S}</style>

            <div className="page-header">
                <h1>Services</h1>
                <p>Manage the services displayed on the website.</p>
            </div>

            <div className="toolbar">
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#8B95A1", letterSpacing: "0.04em" }}>
                    {services.length} service{services.length !== 1 ? "s" : ""}
                </span>
                <button className="add-btn" onClick={openAdd}>+ Add Service</button>
            </div>

            {loading ? (
                <div className="empty">Loading…</div>
            ) : services.length === 0 ? (
                <div className="empty">No services yet.</div>
            ) : (
                <div className="svc-list">
                    {services.map((s, i) => (
                        <div className="svc-card" key={s.id}>
                            {/* Drag handle */}
                            <div className="svc-drag" title="Drag to reorder">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 2h8M2 6h8M2 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                                </svg>
                            </div>

                            {/* Number badge */}
                            <div className="svc-num">
                                <span>{s.idx || formatNum(i + 1)}</span>
                            </div>

                            <div className="svc-body">
                                <div className="svc-info">
                                    <div className="svc-title">{s.title}</div>
                                    {s.description && (
                                        <div className="svc-desc">
                                            {s.description.length > 80 ? s.description.slice(0, 80) + "…" : s.description}
                                        </div>
                                    )}
                                    <div className="svc-meta">
                                        {s.features && s.features.length > 0 && (
                                            <span className="svc-feat-count">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                    <path d="M2 2h6M2 5h6M2 8h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                                                </svg>
                                                {s.features.length} feature{s.features.length !== 1 ? "s" : ""}
                                            </span>
                                        )}
                                        <span className={`svc-status-dot${s.published ? " live" : " draft"}`}>
                                            {s.published ? "Live" : "Draft"}
                                        </span>
                                    </div>
                                </div>
                                <div className="svc-actions">
                                    <button className="action-btn" onClick={() => openEdit(s)}>Edit</button>
                                    <button className="action-btn danger" onClick={() => del(s.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modal && (
                <Modal
                    title={modal === "add" ? "Add Service" : "Edit Service"}
                    onClose={close}
                    footer={
                        <>
                            <button className="btn-ghost" onClick={close}>Cancel</button>
                            <button className="btn-primary" onClick={save} disabled={saving}>
                                {saving ? "Saving…" : "Save Service"}
                            </button>
                        </>
                    }
                >
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
                    <div className="f-field">
                        <label>Index Label</label>
                        <input value={form.idx || ""} onChange={f("idx")} placeholder="01 — ENGINEERING" />
                    </div>
                    <div className="f-field">
                        <label>Title *</label>
                        <input value={form.title || ""} onChange={f("title")} required />
                    </div>
                    <div className="f-field">
                        <label>Description</label>
                        <textarea value={form.description || ""} onChange={f("description")} />
                    </div>
                    <div className="f-field">
                        <label>Features (one per line)</label>
                        <textarea
                            value={featuresStr}
                            onChange={(e) => setFeaturesStr(e.target.value)}
                            placeholder={"Pipeline Construction\nTie-ins & Repair"}
                            style={{ minHeight: 100 }}
                        />
                    </div>
                    <div className="f-row">
                        <div className="f-field">
                            <label>Image path</label>
                            <input value={form.image || ""} onChange={f("image")} placeholder="/industrial-1.jpg" />
                        </div>
                        <div className="f-field">
                            <label>Sort order</label>
                            <input type="number" value={form.sort_order || 0} onChange={f("sort_order")} />
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
                </Modal>
            )}
        </>
    );
}
