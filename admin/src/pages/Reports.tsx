import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Modal from "../components/Modal";

const S = `
  .data-table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;}
  .data-table th{background:#f8fafc;padding:11px 16px;text-align:left;font-size:11px;font-weight:600;color:#4A5568;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e2e8f0;}
  .data-table td{padding:13px 16px;font-size:14px;color:#1a202c;border-bottom:1px solid #f0f4f8;vertical-align:middle;}
  .data-table tr:last-child td{border-bottom:none;}
  .data-table tr:hover td{background:#fafbff;}
  .badge{display:inline-block;padding:3px 10px;border-radius:2px;font-size:11px;font-weight:600;font-family:'IBM Plex Mono',monospace;letter-spacing:0.03em;}
  .badge-green{background:#f0fff4;color:#276749;}
  .badge-gray{background:#f7fafc;color:#718096;}
  .badge-amber{background:rgba(232,135,58,0.1);color:#B4502A;}
  .toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;}
  .add-btn{padding:10px 18px;background:#E8873A;color:#0A1628;font-size:13px;font-weight:600;border:none;border-radius:2px;cursor:pointer;}
  .add-btn:hover{background:#F0A669;}
  .copy-btn{padding:6px 12px;background:rgba(10,22,40,0.06);border:none;font-size:12px;font-weight:600;border-radius:2px;cursor:pointer;color:#0A1628;font-family:'IBM Plex Mono',monospace;}
  .copy-btn:hover{background:rgba(10,22,40,0.12);}
  .action-btn{padding:6px 12px;font-size:12px;font-weight:500;border-radius:2px;cursor:pointer;border:1px solid #e2e8f0;background:#fff;color:#4A5568;margin-right:6px;}
  .action-btn:hover{background:#f0f4f8;}
  .action-btn.danger:hover{background:#fff5f5;border-color:#fc8181;color:#c53030;}
  .link-box{display:flex;align-items:center;gap:8px;background:#f7fafc;border:1px solid #e2e8f0;padding:10px 14px;margin-bottom:20px;border-radius:2px;}
  .link-box span{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#0A1628;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .empty{text-align:center;padding:48px;color:#8B95A1;font-size:14px;}
  .info-note{background:rgba(232,135,58,0.08);border:1px solid rgba(232,135,58,0.25);padding:12px 16px;font-size:13px;color:#92400e;margin-bottom:20px;border-radius:2px;}
`;

interface Report {
    id: number; token: string; title: string; client_name: string;
    client_company: string; category: string; location: string;
    views: number; created_at: string; expires_at: string;
}

const EMPTY_FORM = {
    title: "", client_name: "", client_company: "", category: "pipeline",
    location: "", start_date: "", end_date: "", prepared_by: "ANBE Nigeria Limited",
    hse_note: "", expires_at: "",
    scope: "",       // textarea — split to array on submit
    outcomes: "",    // textarea — one outcome per line
    images: "",      // textarea — one image path per line
    milestones: "",  // textarea — "Label | YYYY-MM-DD | done" per line
};

type FormState = typeof EMPTY_FORM;

function parseOutcomes(s: string): string[] {
    return s.split("\n").map(l => l.trim()).filter(Boolean);
}
function parseImages(s: string): string[] {
    return s.split("\n").map(l => l.trim()).filter(Boolean);
}
function parseMilestones(s: string) {
    return s.split("\n").map(l => {
        const [label, date, done] = l.split("|").map(p => p.trim());
        return { label: label ?? "", date: date ?? "", done: done === "done" };
    }).filter(m => m.label);
}
function parseScope(s: string): string[] {
    return s.split("\n\n").map(p => p.trim()).filter(Boolean);
}

export default function ReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [created, setCreated] = useState<{ token: string; url: string } | null>(null);
    const [copied, setCopied] = useState(false);

    const load = () => {
        setLoading(true);
        api.getReports().then(r => { setReports(r.reports ?? []); setLoading(false); })
            .catch(() => setLoading(false));
    };
    useEffect(load, []);

    const openAdd = () => { setForm(EMPTY_FORM); setError(""); setCreated(null); setModal(true); };
    const close = () => { setModal(false); setCreated(null); };

    const f = (k: keyof FormState) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm(prev => ({ ...prev, [k]: e.target.value }));

    const save = async () => {
        if (!form.title || !form.client_name) { setError("Title and client name are required."); return; }
        setSaving(true); setError("");
        try {
            const payload = {
                title: form.title,
                client_name: form.client_name,
                client_company: form.client_company,
                category: form.category,
                location: form.location,
                start_date: form.start_date,
                end_date: form.end_date,
                prepared_by: form.prepared_by,
                hse_note: form.hse_note,
                expires_at: form.expires_at,
                scope: parseScope(form.scope),
                outcomes: parseOutcomes(form.outcomes),
                images: parseImages(form.images),
                milestones: parseMilestones(form.milestones),
            };
            const result = await api.createReport(payload);
            const siteBase = window.location.hostname === "localhost"
                ? "http://localhost:5173"
                : "https://anbenig.com";
            setCreated({ token: result.token, url: `${siteBase}/report/${result.token}` });
            load();
        } catch (e) { setError((e as Error).message); }
        finally { setSaving(false); }
    };

    const del = async (token: string) => {
        if (!confirm("Delete this report? The client link will stop working.")) return;
        await api.deleteReport(token); load();
    };

    const copy = async (url: string) => {
        await navigator.clipboard.writeText(url);
        setCopied(true); setTimeout(() => setCopied(false), 2000);
    };

    const reportUrl = (token: string) => {
        const base = window.location.hostname === "localhost" ? "http://localhost:5173" : "https://anbenig.com";
        return `${base}/report/${token}`;
    };

    return (
        <>
            <style>{S}</style>
            <div className="page-header">
                <h1>Client Reports</h1>
                <p>Create a private, shareable report link for each completed project. Only people with the link can view it.</p>
            </div>

            <div className="toolbar">
                <span style={{ fontSize: 14, color: "#8B95A1" }}>{reports.length} report{reports.length !== 1 ? "s" : ""}</span>
                <button className="add-btn" onClick={openAdd}>+ Create Report</button>
            </div>

            {loading ? <div className="empty">Loading…</div> : (
                <table className="data-table">
                    <thead>
                        <tr><th>Title</th><th>Client</th><th>Category</th><th>Created</th><th>Views</th><th>Expires</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {reports.length === 0 && <tr><td colSpan={7} className="empty">No reports yet. Create one to share with a client.</td></tr>}
                        {reports.map(r => (
                            <tr key={r.token}>
                                <td><strong>{r.title}</strong></td>
                                <td>{r.client_name}{r.client_company ? <span style={{ color: "#8B95A1", fontSize: 12 }}> — {r.client_company}</span> : ""}</td>
                                <td>{r.category ? <span className="badge badge-gray">{r.category}</span> : "—"}</td>
                                <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>{r.created_at?.slice(0, 10)}</td>
                                <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "#8B95A1" }}>{r.views}</td>
                                <td style={{ fontSize: 12, color: r.expires_at ? "#92400e" : "#8B95A1" }}>{r.expires_at || "Never"}</td>
                                <td>
                                    <button className="copy-btn" onClick={() => copy(reportUrl(r.token))}>Copy Link</button>
                                    {" "}
                                    <a href={reportUrl(r.token)} target="_blank" rel="noreferrer" className="action-btn" style={{ textDecoration: "none", display: "inline-block" }}>Preview</a>
                                    {" "}
                                    <button className="action-btn danger" onClick={() => del(r.token)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {copied && (
                <div style={{ position: "fixed", bottom: 24, right: 24, background: "#0A1628", color: "#fff", padding: "12px 20px", borderRadius: 2, fontSize: 13, fontWeight: 600, zIndex: 9999 }}>
                    ✓ Link copied to clipboard
                </div>
            )}

            {modal && (
                <Modal
                    title="Create Client Report"
                    onClose={close}
                    footer={
                        created ? (
                            <button className="add-btn" onClick={close}>Done</button>
                        ) : (
                            <>
                                <button className="action-btn" onClick={close}>Cancel</button>
                                <button className="add-btn" onClick={save} disabled={saving}>
                                    {saving ? "Creating…" : "Create & Get Link"}
                                </button>
                            </>
                        )
                    }
                >
                    {created ? (
                        <div>
                            <div style={{ color: "#276749", fontWeight: 600, marginBottom: 16, fontSize: 15 }}>
                                ✓ Report created successfully
                            </div>
                            <p style={{ fontSize: 14, color: "#4A5568", marginBottom: 16 }}>
                                Share this link with <strong>{form.client_name}</strong>. Only people with this link can view the report.
                            </p>
                            <div className="link-box">
                                <span>{created.url}</span>
                                <button className="copy-btn" onClick={() => copy(created.url)}>
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <a href={created.url} target="_blank" rel="noreferrer"
                                style={{ fontSize: 13, color: "#E8873A", fontWeight: 600 }}>
                                Preview report →
                            </a>
                        </div>
                    ) : (
                        <>
                            {error && <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", color: "#c53030", padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>{error}</div>}
                            <div className="info-note">
                                The link will be private — it won't appear on the public website. Only people you share it with can access it.
                            </div>

                            <div className="f-row">
                                <div className="f-field">
                                    <label>Project Title *</label>
                                    <input value={form.title} onChange={f("title")} placeholder="e.g. Smokeless Flare Retrofit" required />
                                </div>
                                <div className="f-field">
                                    <label>Client Name *</label>
                                    <input value={form.client_name} onChange={f("client_name")} placeholder="e.g. John Adeyemi" required />
                                </div>
                            </div>
                            <div className="f-row">
                                <div className="f-field">
                                    <label>Client Company</label>
                                    <input value={form.client_company} onChange={f("client_company")} placeholder="e.g. Niger Delta Terminal" />
                                </div>
                                <div className="f-field">
                                    <label>Category</label>
                                    <select value={form.category} onChange={f("category")}>
                                        <option value="pipeline">Pipeline</option>
                                        <option value="flare">Flare Systems</option>
                                        <option value="fabrication">Fabrication</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>
                            <div className="f-row">
                                <div className="f-field">
                                    <label>Location</label>
                                    <input value={form.location} onChange={f("location")} placeholder="e.g. Rivers State" />
                                </div>
                                <div className="f-field">
                                    <label>Prepared By</label>
                                    <input value={form.prepared_by} onChange={f("prepared_by")} />
                                </div>
                            </div>
                            <div className="f-row">
                                <div className="f-field">
                                    <label>Start Date</label>
                                    <input type="date" value={form.start_date} onChange={f("start_date")} />
                                </div>
                                <div className="f-field">
                                    <label>End Date</label>
                                    <input type="date" value={form.end_date} onChange={f("end_date")} />
                                </div>
                            </div>

                            <div className="f-field">
                                <label>Scope of Work</label>
                                <p style={{ fontSize: 11, color: "#8B95A1", marginBottom: 6 }}>Separate paragraphs with a blank line.</p>
                                <textarea value={form.scope} onChange={f("scope")} rows={4}
                                    placeholder={"Design and fabrication of a high turndown flare system...\n\nInstallation was completed in 7 months..."} />
                            </div>

                            <div className="f-field">
                                <label>Key Outcomes</label>
                                <p style={{ fontSize: 11, color: "#8B95A1", marginBottom: 6 }}>One outcome per line.</p>
                                <textarea value={form.outcomes} onChange={f("outcomes")} rows={3}
                                    placeholder={"Zero lost-time incidents\nDelivered 2 weeks ahead of schedule\nDRE > 98% achieved on first test"} />
                            </div>

                            <div className="f-field">
                                <label>Milestones</label>
                                <p style={{ fontSize: 11, color: "#8B95A1", marginBottom: 6 }}>Format: Label | YYYY-MM-DD | done (or pending)</p>
                                <textarea value={form.milestones} onChange={f("milestones")} rows={4}
                                    placeholder={"Engineering complete | 2025-11-15 | done\nProcurement | 2025-12-01 | done\nInstallation | 2026-02-10 | done\nCommissioning | 2026-03-01 | done"} />
                            </div>

                            <div className="f-field">
                                <label>Image Paths or URLs</label>
                                <p style={{ fontSize: 11, color: "#8B95A1", marginBottom: 6 }}>One per line. Use /industrial-1.jpg or a full URL.</p>
                                <textarea value={form.images} onChange={f("images")} rows={3}
                                    placeholder={"/industrial-1.jpg\n/industrial-5.jpg"} />
                            </div>

                            <div className="f-field">
                                <label>HSE Summary</label>
                                <textarea value={form.hse_note} onChange={f("hse_note")} rows={2}
                                    placeholder="Zero lost-time incidents. All works executed under a documented PTW system." />
                            </div>

                            <div className="f-field">
                                <label>Link Expiry Date (optional)</label>
                                <p style={{ fontSize: 11, color: "#8B95A1", marginBottom: 6 }}>Leave blank to never expire.</p>
                                <input type="date" value={form.expires_at} onChange={f("expires_at")} />
                            </div>
                        </>
                    )}
                </Modal>
            )}
        </>
    );
}
