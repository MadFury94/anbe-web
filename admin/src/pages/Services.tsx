import { useEffect, useState } from "react";
import { api, type Service } from "../lib/api";
import Modal from "../components/Modal";

const S = `
  /* ── Numbered service list ── */
  .svc-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .svc-row {
    display: flex;
    align-items: stretch;
    background: #fff;
    border: 1px solid #E2DDD5;
    border-top: none;
    transition: border-left-color 0.15s, box-shadow 0.15s;
    border-left: 3px solid transparent;
    overflow: hidden;
    position: relative;
  }
  .svc-row:first-child { border-top: 1px solid #E2DDD5; }
  .svc-row:hover {
    border-left-color: #E8873A;
    box-shadow: 0 2px 12px rgba(10,22,40,0.06);
    z-index: 1;
  }

  /* Large number column */
  .svc-num-col {
    width: 64px;
    min-width: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #F0ECE5;
    padding: 20px 0;
    flex-shrink: 0;
  }
  .svc-big-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 18px;
    font-weight: 500;
    color: #E8873A;
    letter-spacing: 0.04em;
    line-height: 1;
    user-select: none;
  }

  /* Content column */
  .svc-content {
    flex: 1;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    overflow: hidden;
    min-width: 0;
  }
  .svc-info {
    flex: 1;
    min-width: 0;
  }
  .svc-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #0A1628;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .svc-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #8B95A1;
    line-height: 1.5;
    /* 2-line clamp */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 8px;
    max-width: 600px;
  }
  .svc-features {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .svc-feat-tag {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #0A1628;
    background: #F7F5F0;
    border: 1px solid #E2DDD5;
    padding: 3px 7px;
    white-space: nowrap;
  }
  .svc-feat-more {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #8B95A1;
    padding: 3px 0;
    white-space: nowrap;
  }

  /* Right column: status + actions */
  .svc-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 10px;
    padding: 18px 20px 18px 0;
    flex-shrink: 0;
  }
  .svc-actions {
    display: flex;
    gap: 6px;
  }

  /* Index label */
  .svc-idx-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 600;
    color: #8B95A1;
    text-transform: uppercase;
    letter-spacing: 0.10em;
  }

  @media (max-width: 640px) {
    .svc-num-col { width: 56px; min-width: 56px; }
    .svc-big-num { font-size: 28px; }
    .svc-content { flex-wrap: wrap; gap: 12px; padding: 14px 14px; }
    .svc-right { flex-direction: row; align-items: center; padding: 0 14px 14px; }
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
        if (!confirm("Delete this service? This cannot be undone.")) return;
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
                    {services.map((s, i) => {
                        const feats = s.features || [];
                        const visibleFeats = feats.slice(0, 4);
                        const extra = feats.length - visibleFeats.length;

                        return (
                            <div className="svc-row" key={s.id}>
                                {/* Clean number */}
                                <div className="svc-num-col">
                                    <span className="svc-big-num">{formatNum(i + 1)}</span>
                                </div>

                                {/* Content */}
                                <div className="svc-content">
                                    <div className="svc-info">
                                        <div className="svc-title">{s.title}</div>
                                        {s.description && (
                                            <div className="svc-desc">{s.description}</div>
                                        )}
                                        {feats.length > 0 && (
                                            <div className="svc-features">
                                                {visibleFeats.map((feat, fi) => (
                                                    <span key={fi} className="svc-feat-tag">{feat}</span>
                                                ))}
                                                {extra > 0 && (
                                                    <span className="svc-feat-more">+{extra} more</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right: status + actions */}
                                <div className="svc-right">
                                    <span className={`status-dot${s.published ? " live" : " draft"}`}>
                                        {s.published ? "Live" : "Draft"}
                                    </span>
                                    <div className="svc-actions">
                                        <button className="action-btn" onClick={() => openEdit(s)}>Edit</button>
                                        <button className="action-btn danger" onClick={() => del(s.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
                    {error && <div className="form-error">{error}</div>}
                    <div className="f-field">
                        <label>Index Label</label>
                        <input value={form.idx || ""} onChange={f("idx")} placeholder="01" />
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
                            <input type="number" value={form.sort_order ?? 0} onChange={f("sort_order")} />
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
