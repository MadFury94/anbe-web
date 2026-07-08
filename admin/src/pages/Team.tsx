import { useEffect, useState } from "react";
import { api, type TeamMember } from "../lib/api";
import Modal from "../components/Modal";

const EMPTY: Partial<TeamMember> = { name: "", role: "", image: "", bio: "", sort_order: 99, published: 1 };

export default function TeamPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState<"add" | "edit" | null>(null);
    const [form, setForm] = useState<Partial<TeamMember>>(EMPTY);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const load = () => { setLoading(true); api.getTeam().then(r => { setTeam(r.team); setLoading(false); }).catch(() => setLoading(false)); };
    useEffect(load, []);

    const openAdd = () => { setForm(EMPTY); setError(""); setModal("add"); };
    const openEdit = (m: TeamMember) => { setForm(m); setError(""); setModal("edit"); };
    const close = () => { setModal(null); setError(""); };

    const save = async () => {
        setSaving(true); setError("");
        try {
            if (modal === "add") await api.createTeamMember(form);
            else await api.updateTeamMember(form.id!, form);
            close(); load();
        } catch (e) { setError((e as Error).message); }
        finally { setSaving(false); }
    };

    const del = async (id: number) => {
        if (!confirm("Remove this team member?")) return;
        await api.deleteTeamMember(id); load();
    };

    const f = (k: keyof TeamMember) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [k]: e.target.value }));

    return (
        <>
            <div className="page-header">
                <h1>Team</h1>
                <p>Manage team members displayed on the About page.</p>
            </div>
            <div className="toolbar">
                <span style={{ fontSize: 14, color: "#8B95A1" }}>{team.length} members</span>
                <button className="add-btn" onClick={openAdd}>+ Add Member</button>
            </div>
            {loading ? <div className="empty">Loading…</div> : (
                <table className="data-table">
                    <thead><tr><th>Photo</th><th>Name</th><th>Role</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {team.length === 0 && <tr><td colSpan={6} className="empty">No team members yet</td></tr>}
                        {team.map(m => (
                            <tr key={m.id}>
                                <td>
                                    {m.image
                                        ? <img src={m.image} alt={m.name} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%", border: "2px solid #e2e8f0" }} />
                                        : <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#8B95A1" }}>?</div>
                                    }
                                </td>
                                <td><strong>{m.name}</strong></td>
                                <td>{m.role}</td>
                                <td>{m.sort_order}</td>
                                <td><span className={`badge ${m.published ? "badge-green" : "badge-gray"}`}>{m.published ? "Live" : "Draft"}</span></td>
                                <td>
                                    <button className="action-btn" onClick={() => openEdit(m)}>Edit</button>
                                    <button className="action-btn danger" onClick={() => del(m.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {modal && (
                <Modal title={modal === "add" ? "Add Team Member" : "Edit Member"} onClose={close}
                    footer={<><button className="btn-ghost" onClick={close}>Cancel</button><button className="btn-primary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save Member"}</button></>}>
                    {error && <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", color: "#c53030", padding: "10px 14px", borderRadius: 4, marginBottom: 16, fontSize: 13 }}>{error}</div>}
                    <div className="f-row">
                        <div className="f-field"><label>Full Name *</label><input value={form.name || ""} onChange={f("name")} required /></div>
                        <div className="f-field"><label>Role / Title *</label><input value={form.role || ""} onChange={f("role")} required /></div>
                    </div>
                    <div className="f-field"><label>Photo path</label><input value={form.image || ""} onChange={f("image")} placeholder="/ceo.png" /></div>
                    {form.image && <img src={form.image} alt="preview" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4, marginBottom: 12, border: "1px solid #e2e8f0" }} onError={e => (e.currentTarget.style.display = "none")} />}
                    <div className="f-field"><label>Bio</label><textarea value={form.bio || ""} onChange={f("bio")} placeholder="Brief description of their role and experience…" /></div>
                    <div className="f-row">
                        <div className="f-field"><label>Sort order</label><input type="number" value={form.sort_order || 99} onChange={f("sort_order")} /></div>
                        <div className="f-field"><label>Published</label>
                            <select value={form.published ? 1 : 0} onChange={e => setForm(p => ({ ...p, published: parseInt(e.target.value) }))}>
                                <option value={1}>Yes</option><option value={0}>No (draft)</option>
                            </select>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
