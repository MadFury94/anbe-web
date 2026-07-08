import { useEffect, useState } from "react";
import { api, type TeamMember } from "../lib/api";
import Modal from "../components/Modal";

const S = `
  /* ── Photo card grid ── */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  @media (max-width: 1100px) { .team-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px)  { .team-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px)  { .team-grid { grid-template-columns: 1fr; } }

  /* ── Card ── */
  .team-card {
    background: #fff;
    border: 1px solid #E2DDD5;
    border-bottom: 2px solid transparent;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: border-bottom-color 0.15s, box-shadow 0.15s;
    position: relative;
  }
  .team-card:hover {
    border-bottom-color: #E8873A;
    box-shadow: 0 6px 24px rgba(10,22,40,0.09);
  }

  /* Photo wrapper: square */
  .team-photo-wrap {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #0A1628;
    position: relative;
    flex-shrink: 0;
  }
  .team-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  /* Initials avatar (always rendered behind photo) */
  .team-initials {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px;
    font-weight: 700;
    color: #E8873A;
    letter-spacing: -0.02em;
    z-index: 0;
    opacity: 0.4;
  }

  /* Hover action overlay */
  .team-card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10,22,40,0.60);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    opacity: 0;
    transition: opacity 0.18s;
    z-index: 10;
  }
  .team-card:hover .team-card-overlay { opacity: 1; }

  .team-overlay-btn {
    width: 36px;
    height: 36px;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.13s, border-color 0.13s;
  }
  .team-overlay-btn:hover {
    background: rgba(232,135,58,0.25);
    border-color: #E8873A;
  }
  .team-overlay-btn.danger:hover {
    background: rgba(220,38,38,0.25);
    border-color: #fc8181;
  }

  /* Info section */
  .team-card-info {
    padding: 14px 14px 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .team-card-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #0A1628;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
  }
  .team-card-role {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    color: #E8873A;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .team-card-status {
    margin-top: 6px;
  }

  /* Photo preview in modal */
  .photo-preview-wrap {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border: 1px solid #E2DDD5;
    margin-bottom: 14px;
    flex-shrink: 0;
    background: #0A1628;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .photo-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
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
        if (!confirm("Remove this team member? This cannot be undone.")) return;
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
                            {/* Photo area */}
                            <div className="team-photo-wrap">
                                {/* Initials always present as background */}
                                <div className="team-initials">{getInitials(m.name) || "?"}</div>
                                {/* Photo on top if available */}
                                {m.image && (
                                    <img
                                        className="team-photo"
                                        src={m.image}
                                        alt={m.name}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                )}
                                {/* Hover overlay with action buttons */}
                                <div className="team-card-overlay">
                                    <button
                                        className="team-overlay-btn"
                                        title="Edit member"
                                        onClick={() => openEdit(m)}
                                    >
                                        ✎
                                    </button>
                                    <button
                                        className="team-overlay-btn danger"
                                        title="Delete member"
                                        onClick={() => del(m.id)}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="team-card-info">
                                <div className="team-card-name">{m.name}</div>
                                <div className="team-card-role">{m.role}</div>
                                <div className="team-card-status">
                                    <span className={`status-dot${m.published ? " live" : " draft"}`}>
                                        {m.published ? "Live" : "Draft"}
                                    </span>
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
                    {error && <div className="form-error">{error}</div>}
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
                        <div className="photo-preview-wrap">
                            <img
                                className="photo-preview"
                                src={form.image}
                                alt="preview"
                                onError={(e) => { (e.currentTarget.style.display = "none"); }}
                            />
                        </div>
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
                            <input type="number" value={form.sort_order ?? 99} onChange={f("sort_order")} />
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
