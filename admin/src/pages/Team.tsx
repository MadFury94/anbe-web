import { useEffect, useState } from "react";
import { api, type TeamMember } from "../lib/api";
import Modal from "../components/Modal";

const S = `
  /* ── Team grid ── */
  .team-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:16px;
  }
  @media(max-width:900px){.team-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:520px){.team-grid{grid-template-columns:1fr;}}

  /* ── Member card ── */
  .team-card{
    background:#fff;border:1px solid #e8e4dc;
    display:flex;flex-direction:column;overflow:hidden;
    transition:border-top-color .18s;border-top:2px solid transparent;
  }
  .team-card:hover{border-top-color:#E8873A;}

  .team-card-photo-wrap{
    width:100%;aspect-ratio:1/1;overflow:hidden;
    background:linear-gradient(135deg,#0A1628 0%,#1a3052 100%);
    flex-shrink:0;position:relative;
  }
  .team-card-photo{
    width:100%;height:100%;object-fit:cover;display:block;
  }
  .team-card-initials{
    position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;
    font-family:'Space Grotesk',sans-serif;font-size:36px;font-weight:700;
    color:#E8873A;letter-spacing:-0.02em;
  }

  .team-card-body{padding:16px;flex:1;display:flex;flex-direction:column;}
  .team-card-name{
    font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;
    color:#0A1628;margin-bottom:3px;
  }
  .team-card-role{
    font-family:'IBM Plex Mono',monospace;font-size:10px;
    color:#E8873A;text-transform:uppercase;letter-spacing:0.08em;
    margin-bottom:8px;
  }
  .team-card-footer{
    display:flex;align-items:center;justify-content:space-between;
    margin-top:auto;padding-top:12px;border-top:1px solid #f0ece5;
  }

  .team-status-dot{
    display:inline-flex;align-items:center;gap:5px;
    font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.04em;
    text-transform:uppercase;
  }
  .team-status-dot::before{
    content:'';display:inline-block;width:6px;height:6px;border-radius:50%;
  }
  .team-status-dot.live{color:#276749;}
  .team-status-dot.live::before{background:#4CAF50;}
  .team-status-dot.draft{color:#8B95A1;}
  .team-status-dot.draft::before{background:#c8c2b8;}

  .team-card-actions{display:flex;gap:6px;}

  /* Photo preview in modal */
  .photo-preview{
    width:80px;height:80px;object-fit:cover;
    border:1px solid #e2ddd5;display:block;margin-bottom:12px;
  }
`;

const EMPTY: Partial<TeamMember> = {
    name: "", role: "", image: "", bio: "", sort_order: 99, published: 1,
};

function getInitials(name: string): string {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
}

export default function TeamPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState<"add" | "edit" | null>(null);
    const [form, setForm] = useState<Partial<TeamMember>>(EMPTY);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const load = () => {
        setLoading(true);
        api.getTeam()
            .then((r) => { setTeam(r.team); setLoading(false); })
            .catch(() => setLoading(false));
    };
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

    const f =
        (k: keyof TeamMember) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                setForm((prev) => ({ ...prev, [k]: e.target.value }));

    return (
        <>
            <style>{S}</style>

            <div className="page-header">
                <h1>Team</h1>
                <p>Manage team members displayed on the About page.</p>
            </div>

            <div className="toolbar">
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#8B95A1", letterSpacing: "0.04em" }}>
                    {team.length} member{team.length !== 1 ? "s" : ""}
                </span>
                <button className="add-btn" onClick={openAdd}>+ Add Member</button>
            </div>

            {loading ? (
                <div className="empty">Loading…</div>
            ) : team.length === 0 ? (
                <div className="empty">No team members yet.</div>
            ) : (
                <div className="team-grid">
                    {team.map((m) => (
                        <div className="team-card" key={m.id}>
                            <div className="team-card-photo-wrap">
                                {m.image ? (
                                    <img
                                        className="team-card-photo"
                                        src={m.image}
                                        alt={m.name}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                ) : null}
                                {/* Always render initials as fallback behind image */}
                                <div className="team-card-initials">
                                    {getInitials(m.name) || "?"}
                                </div>
                            </div>
                            <div className="team-card-body">
                                <div className="team-card-name">{m.name}</div>
                                <div className="team-card-role">{m.role}</div>
                                <div className="team-card-footer">
                                    <span className={`team-status-dot${m.published ? " live" : " draft"}`}>
                                        {m.published ? "Live" : "Draft"}
                                    </span>
                                    <div className="team-card-actions">
                                        <button className="action-btn" onClick={() => openEdit(m)}>Edit</button>
                                        <button className="action-btn danger" onClick={() => del(m.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modal && (
                <Modal
                    title={modal === "add" ? "Add Team Member" : "Edit Member"}
                    onClose={close}
                    footer={
                        <>
                            <button className="btn-ghost" onClick={close}>Cancel</button>
                            <button className="btn-primary" onClick={save} disabled={saving}>
                                {saving ? "Saving…" : "Save Member"}
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
                    <div className="f-row">
                        <div className="f-field">
                            <label>Full Name *</label>
                            <input value={form.name || ""} onChange={f("name")} required />
                        </div>
                        <div className="f-field">
                            <label>Role / Title *</label>
                            <input value={form.role || ""} onChange={f("role")} required />
                        </div>
                    </div>
                    <div className="f-field">
                        <label>Photo path</label>
                        <input value={form.image || ""} onChange={f("image")} placeholder="/ceo.png" />
                    </div>
                    {form.image && (
                        <img
                            className="photo-preview"
                            src={form.image}
                            alt="preview"
                            onError={(e) => { (e.currentTarget.style.display = "none"); }}
                        />
                    )}
                    <div className="f-field">
                        <label>Bio</label>
                        <textarea
                            value={form.bio || ""}
                            onChange={f("bio")}
                            placeholder="Brief description of their role and experience…"
                        />
                    </div>
                    <div className="f-row">
                        <div className="f-field">
                            <label>Sort order</label>
                            <input type="number" value={form.sort_order || 99} onChange={f("sort_order")} />
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
                    </div>
                </Modal>
            )}
        </>
    );
}
