import { useEffect, useState } from "react";
import { api, type Service } from "../lib/api";
import Modal from "../components/Modal";

const EMPTY: Partial<Service> = { idx: "", title: "", description: "", features: [], image: "", sort_order: 99, published: 1 };

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState<"add" | "edit" | null>(null);
    const [form, setForm] = useState<Partial<Service>>(EMPTY);
    const [featuresStr, setFeaturesStr] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const load = () => { setLoading(true); api.getServices().then(r => { setServices(r.services); setLoading(false); }).catch(() => setLoading(false)); };
    useEffect(load, []);

    const openAdd = () => { setForm(EMPTY); setFeaturesStr(""); setError(""); setModal("add"); };
    const openEdit = (s: Service) => { setForm(s); setFeaturesStr((s.features || []).join("\n")); setError(""); setModal("edit"); };
    const close = () => { setModal(null); setError(""); };

    const save = async () => {
        setSaving(true); setError("");
        const features = featuresStr.split("\n").map(f => f.trim()).filter(Boolean);
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

    const f = (k: keyof Service) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [k]: e.target.value }));

    return (
        <>
            <div className="page-header">
                <h1>Services</h1>
                <p>Manage the services displayed on the website.</p>
            </div>
            <div className="toolbar">
                <span style={{ fontSize: 14, color: "#8B95A1" }}>{services.length} services</span>
                <button className="add-btn" onClick={openAdd}>+ Add Service</button>
            </div>
            {loading ? <div className="empty">Loading…</div> : (
                <table className="data-table">
                    <thead><tr><th>#</th><th>Title</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {services.length === 0 && <tr><td colSpan={5} className="empty">No services yet</td></tr>}
                        {services.map(s => (
                            <tr key={s.id}>
                                <td style={{ color: "#E8873A", fontFamily: "monospace", fontSize: 12 }}>{s.idx}</td>
                                <td><strong>{s.title}</strong></td>
                                <td>{s.sort_order}</td>
                                <td><span className={`badge ${s.published ? "badge-green" : "badge-gray"}`}>{s.published ? "Live" : "Draft"}</span></td>
                                <td>
                                    <button className="action-btn" onClick={() => openEdit(s)}>Edit</button>
                                    <button className="action-btn danger" onClick={() => del(s.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {modal && (
                <Modal title={modal === "add" ? "Add Service" : "Edit Service"} onClose={close}
                    footer={<><button className="btn-ghost" onClick={close}>Cancel</button><button className="btn-primary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save Service"}</button></>}>
                    {error && <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", color: "#c53030", padding: "10px 14px", borderRadius: 4, marginBottom: 16, fontSize: 13 }}>{error}</div>}
                    <div className="f-field"><label>Index Label</label><input value={form.idx || ""} onChange={f("idx")} placeholder="01 — ENGINEERING" /></div>
                    <div className="f-field"><label>Title *</label><input value={form.title || ""} onChange={f("title")} required /></div>
                    <div className="f-field"><label>Description</label><textarea value={form.description || ""} onChange={f("description")} /></div>
                    <div className="f-field">
                        <label>Features (one per line)</label>
                        <textarea value={featuresStr} onChange={e => setFeaturesStr(e.target.value)} placeholder={"Pipeline Construction\nTie-ins & Repair"} style={{ minHeight: 100 }} />
                    </div>
                    <div className="f-row">
                        <div className="f-field"><label>Image path</label><input value={form.image || ""} onChange={f("image")} placeholder="/industrial-1.jpg" /></div>
                        <div className="f-field"><label>Sort order</label><input type="number" value={form.sort_order || 0} onChange={f("sort_order")} /></div>
                    </div>
                    <div className="f-field"><label>Published</label>
                        <select value={form.published ? 1 : 0} onChange={e => setForm(p => ({ ...p, published: parseInt(e.target.value) }))}>
                            <option value={1}>Yes</option><option value={0}>No (draft)</option>
                        </select>
                    </div>
                </Modal>
            )}
        </>
    );
}
