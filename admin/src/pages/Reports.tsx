import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, type ReportSummary } from "../lib/api";

const S = `
  .data-table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;}
  .data-table th{background:#f8fafc;padding:11px 16px;text-align:left;font-size:11px;font-weight:600;color:#4A5568;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e2e8f0;}
  .data-table td{padding:13px 16px;font-size:14px;color:#1a202c;border-bottom:1px solid #f0f4f8;vertical-align:middle;}
  .data-table tr:last-child td{border-bottom:none;}
  .data-table tr:hover td{background:#fafbff;}
  .toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;}
  .add-btn{padding:10px 18px;background:#E8873A;color:#0A1628;font-size:13px;font-weight:600;border:none;border-radius:2px;cursor:pointer;font-family:'Inter',sans-serif;}
  .add-btn:hover{background:#F0A669;}
  .copy-btn{padding:6px 12px;background:rgba(10,22,40,0.06);border:none;font-size:12px;font-weight:600;border-radius:2px;cursor:pointer;color:#0A1628;font-family:'IBM Plex Mono',monospace;}
  .copy-btn:hover{background:rgba(10,22,40,0.12);}
  .action-btn{padding:6px 12px;font-size:12px;font-weight:500;border-radius:2px;cursor:pointer;border:1px solid #e2e8f0;background:#fff;color:#4A5568;margin-right:4px;font-family:'Inter',sans-serif;text-decoration:none;display:inline-block;}
  .action-btn:hover{background:#f0f4f8;}
  .action-btn.danger{color:#c53030;border-color:rgba(220,38,38,0.2);}
  .action-btn.danger:hover{background:#fff5f5;border-color:#fc8181;}
  .empty{text-align:center;padding:60px;color:#8B95A1;font-size:14px;}
  .views-badge{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8B95A1;}
  .toast{position:fixed;bottom:24px;right:24px;background:#0A1628;color:#fff;padding:12px 20px;font-size:13px;font-weight:600;z-index:9999;border-left:3px solid #E8873A;}
  @media(max-width:760px){
    .data-table{font-size:13px;}
    .data-table th,.data-table td{padding:10px 12px;}
  }
`;

export default function ReportsPage() {
    const navigate = useNavigate();
    const [reports, setReports] = useState<ReportSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const load = () => {
        setLoading(true);
        api.getReports()
            .then(r => { setReports(r.reports ?? []); setLoading(false); })
            .catch(() => setLoading(false));
    };
    useEffect(load, []);

    const del = async (token: string, title: string) => {
        if (!confirm(`Delete "${title}"? The client link will stop working.`)) return;
        await api.deleteReport(token);
        load();
    };

    const copy = async (token: string) => {
        const base = window.location.hostname === "localhost" ? "http://localhost:5173" : "https://anbenig.com";
        await navigator.clipboard.writeText(`${base}/report/${token}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const previewUrl = (token: string) => {
        const base = window.location.hostname === "localhost" ? "http://localhost:5173" : "https://anbenig.com";
        return `${base}/report/${token}`;
    };

    return (
        <>
            <style>{S}</style>
            <div className="page-header">
                <h1>Client Reports</h1>
                <p>Private project close-out reports shared via a unique link.</p>
            </div>

            <div className="toolbar">
                <span style={{ fontSize: 14, color: "#8B95A1" }}>
                    {reports.length} report{reports.length !== 1 ? "s" : ""}
                </span>
                <button className="add-btn" onClick={() => navigate("/reports/new")}>
                    + New Report
                </button>
            </div>

            {loading ? (
                <div className="empty">Loading…</div>
            ) : (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Client</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Views</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length === 0 && (
                            <tr><td colSpan={6} className="empty">
                                No reports yet. Create one to share with a client.
                            </td></tr>
                        )}
                        {reports.map(r => (
                            <tr key={r.token}>
                                <td>
                                    <strong style={{ display: "block", marginBottom: 2 }}>{r.project_title}</strong>
                                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "#8B95A1", letterSpacing: "0.05em" }}>{r.token.slice(0, 12)}…</span>
                                </td>
                                <td>
                                    {r.client_name}
                                    {r.client_company && <span style={{ color: "#8B95A1", fontSize: 12, display: "block" }}>{r.client_company}</span>}
                                </td>
                                <td>{r.location || "—"}</td>
                                <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>
                                    {r.report_date || r.created_at?.slice(0, 10)}
                                </td>
                                <td><span className="views-badge">{r.views}</span></td>
                                <td>
                                    <button className="copy-btn" onClick={() => copy(r.token)}>Copy Link</button>
                                    {" "}
                                    <a
                                        className="action-btn"
                                        onClick={() => navigate(`/reports/edit/${r.token}`)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Edit
                                    </a>
                                    <a
                                        href={previewUrl(r.token)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="action-btn"
                                    >
                                        Preview
                                    </a>
                                    <button
                                        className="action-btn danger"
                                        onClick={() => del(r.token, r.project_title)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {copied && <div className="toast">✓ Link copied to clipboard</div>}
        </>
    );
}
