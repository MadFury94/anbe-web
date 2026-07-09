"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? "https://anbe-api.onochieazukaeme.workers.dev";

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Inter',sans-serif;background:#F7F5F0;color:#12181F;}
  h1,h2,h3,h4{font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:-0.01em;}
  .report-page{min-height:100vh;}
  .topbar{background:#0A1628;padding:14px 0;border-bottom:3px solid #E8873A;}
  .topbar-inner{max-width:900px;margin:0 auto;padding:0 32px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
  .topbar img{height:44px;width:auto;}
  .topbar-right{display:flex;align-items:center;gap:16px;}
  .confidential{font-family:'IBM Plex Mono',monospace;font-size:10px;color:rgba(247,245,240,0.5);letter-spacing:0.12em;text-transform:uppercase;}
  .pdf-btn{font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#0A1628;background:#E8873A;border:none;padding:8px 16px;cursor:pointer;transition:background .2s;white-space:nowrap;}
  .pdf-btn:hover{background:#F0A669;}
  @media print{
    .topbar,.rpt-footer{display:none!important;}
    .pdf-btn{display:none!important;}
    body{background:#fff!important;}
    .cover{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .rpt-table th{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .rpt-section{page-break-inside:avoid;}
    .body-wrap{padding-bottom:0!important;}
    @page{margin:18mm 15mm;}
  }
  /* COVER */
  .cover{background:linear-gradient(135deg,#0A1628 0%,#16283F 100%);padding:60px 0 52px;position:relative;overflow:hidden;}
  .cover::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(139,149,161,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(139,149,161,0.05) 1px,transparent 1px);background-size:48px 48px;}
  .cover-glow{position:absolute;right:5%;top:10%;width:300px;height:300px;background:radial-gradient(circle,rgba(232,135,58,0.22) 0%,transparent 70%);filter:blur(30px);}
  .cover-inner{max-width:900px;margin:0 auto;padding:0 32px;position:relative;z-index:2;}
  .cover-eyebrow{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#E8873A;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px;}
  .cover-eyebrow::before{content:"";width:24px;height:1px;background:#E8873A;}
  .cover h1{font-size:clamp(24px,4vw,42px);color:#fff;line-height:1.1;margin-bottom:12px;}
  .cover-meta{display:grid;grid-template-columns:repeat(2,1fr);gap:0;margin-top:32px;border:1px solid rgba(247,245,240,0.12);}
  .cover-meta .cm-row{display:contents;}
  .cover-meta .cm-lbl{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#8B95A1;letter-spacing:0.08em;text-transform:uppercase;padding:12px 16px;background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(247,245,240,0.08);border-right:1px solid rgba(247,245,240,0.08);}
  .cover-meta .cm-val{font-size:14px;color:#fff;font-weight:500;padding:12px 16px;border-bottom:1px solid rgba(247,245,240,0.08);}
  /* BODY */
  .body-wrap{max-width:900px;margin:0 auto;padding:0 32px 80px;}
  /* SECTION */
  .rpt-section{margin-top:48px;}
  .rpt-section-title{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#E8873A;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:20px;display:flex;align-items:center;gap:12px;}
  .rpt-section-title::after{content:"";flex:1;height:1px;background:rgba(10,22,40,0.12);}
  /* NARRATIVE */
  .narrative p{font-size:15px;color:#1B222B;line-height:1.8;margin-bottom:16px;}
  .narrative p:last-child{margin-bottom:0;}
  /* TABLES */
  .rpt-table{width:100%;border-collapse:collapse;font-size:13.5px;}
  .rpt-table th{background:#0A1628;color:#fff;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;padding:10px 14px;text-align:left;font-weight:500;}
  .rpt-table td{padding:10px 14px;border-bottom:1px solid rgba(10,22,40,0.08);color:#12181F;vertical-align:top;}
  .rpt-table tr:last-child td{border-bottom:none;}
  .rpt-table tr:nth-child(even) td{background:rgba(10,22,40,0.02);}
  .sub-label{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;color:#0A1628;margin:20px 0 10px;padding-bottom:6px;border-bottom:2px solid #E8873A;display:inline-block;}
  /* BULLETS */
  .bullet-list{list-style:none;display:flex;flex-direction:column;gap:8px;}
  .bullet-list li{display:flex;align-items:flex-start;gap:10px;font-size:14.5px;color:#1B222B;line-height:1.65;}
  .bullet-list li::before{content:"";width:6px;height:6px;border-radius:50%;background:#E8873A;flex-shrink:0;margin-top:7px;}
  /* IMAGES */
  .img-gallery{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:8px;}
  .img-gallery img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;border:1px solid rgba(10,22,40,0.1);}
  /* HSE */
  .hse-box{background:#0A1628;padding:24px 28px;border-left:4px solid #E8873A;margin-bottom:20px;}
  .hse-box p{font-size:13.5px;color:rgba(247,245,240,0.75);line-height:1.7;font-family:'Inter',sans-serif;}
  .hse-list{list-style:none;display:flex;flex-direction:column;gap:10px;}
  .hse-list li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:rgba(247,245,240,0.82);line-height:1.65;font-family:'Inter',sans-serif;}
  .hse-list li::before{content:"";width:6px;height:6px;border-radius:50%;background:#E8873A;flex-shrink:0;margin-top:7px;}
  /* SIGNOFF */
  .signoff-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:8px;}
  .signoff-party{border:1px solid rgba(10,22,40,0.12);padding:20px 24px;}
  .signoff-party .sp-label{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#E8873A;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:14px;}
  .signoff-party .sp-field{margin-bottom:10px;border-bottom:1px solid rgba(10,22,40,0.1);padding-bottom:10px;}
  .signoff-party .sp-field:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
  .signoff-party .sp-lbl{font-family:'IBM Plex Mono',monospace;font-size:9px;color:#8B95A1;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:3px;}
  .signoff-party .sp-val{font-size:14px;color:#0A1628;font-weight:500;min-height:22px;}
  /* FOOTER */
  .rpt-footer{background:#0A1628;padding:32px 0;margin-top:60px;}
  .rpt-footer-inner{max-width:900px;margin:0 auto;padding:0 32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
  .rpt-footer .pby{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#8B95A1;letter-spacing:0.06em;}
  .rpt-footer .pby strong{color:#E8873A;display:block;margin-bottom:3px;font-size:11px;}
  /* STATES */
  .state{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:48px;}
  .state-box{max-width:480px;text-align:center;}
  .state-box h2{font-size:26px;color:#0A1628;margin-bottom:12px;}
  .state-box p{font-size:15px;color:#4A5568;line-height:1.7;margin-bottom:28px;}
  @media(max-width:640px){
    .cover-meta{grid-template-columns:1fr;}
    .signoff-grid{grid-template-columns:1fr;}
    .img-gallery{grid-template-columns:1fr;}
    .cover-inner,.body-wrap,.topbar-inner,.rpt-footer-inner{padding:0 20px;}
  }
  @media print{
    .topbar,.rpt-footer{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .rpt-section{page-break-inside:avoid;}
  }
`;

type Row = string[];
interface Report {
    project_title: string; client_name: string; client_company: string;
    contractor: string; location: string; report_date: string;
    introduction: string; scope_of_work: string; conclusion: string;
    achievements: string[];
    work_summary: { mechanical: Row[]; civil: Row[]; ei: Row[]; };
    materials: { mechanical: Row[]; civil: Row[]; ei: Row[]; };
    hse_notes: string[]; hse_status: Row[];
    personnel: Row[]; equipment: Row[];
    signoff_contractor_name: string; signoff_contractor_desig: string; signoff_contractor_date: string;
    signoff_client_name: string; signoff_client_desig: string; signoff_client_date: string;
    images: string[]; created_at: string;
}

function fmt(d: string) {
    if (!d) return "";
    try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); }
    catch { return d; }
}

function RptTable({ headers, rows }: { headers: string[]; rows: Row[]; }) {
    if (!rows?.length) return null;
    const filled = rows
        .filter(r => r.some(c => c?.trim()))
        .map(r => {
            // Pad short rows to match header count
            const padded = [...r];
            while (padded.length < headers.length) padded.push("");
            return padded;
        });
    if (!filled.length) return null;
    return (
        <table className="rpt-table">
            <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{filled.map((row, i) => (
                <tr key={i}>{row.slice(0, headers.length).map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}</tbody>
        </table>
    );
}

export default function ReportPage() {
    const { token } = useParams<{ token: string }>();
    const [report, setReport] = useState<Report | null>(null);
    const [status, setStatus] = useState<"loading" | "ok" | "notfound" | "expired">("loading");

    useEffect(() => {
        if (!token) { setStatus("notfound"); return; }
        fetch(`${API}/api/reports/${token}`)
            .then(async r => {
                if (r.status === 404) { setStatus("notfound"); return; }
                if (r.status === 410) { setStatus("expired"); return; }
                const d = await r.json();
                setReport(d.report); setStatus("ok");
            })
            .catch(() => setStatus("notfound"));
    }, [token]);

    if (status === "loading") return (
        <><style>{S}</style><div className="state"><p style={{ fontFamily: "'IBM Plex Mono',monospace", color: "#8B95A1", fontSize: 13 }}>Loading report…</p></div></>
    );
    if (status === "expired") return (
        <><style>{S}</style><div className="state"><div className="state-box"><h2>Link Expired</h2><p>This report link has expired. Contact ANBE Nigeria Limited for an updated link.</p><a href="/" style={{ color: "#E8873A", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }}>← anbenig.com</a></div></div></>
    );
    if (!report || status === "notfound") return (
        <><style>{S}</style><div className="state"><div className="state-box"><h2>Report Not Found</h2><p>This link is invalid or has been removed. Contact ANBE Nigeria Limited.</p><a href="/" style={{ color: "#E8873A", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }}>← anbenig.com</a></div></div></>
    );

    const achievements = Array.isArray(report.achievements) ? report.achievements.filter(Boolean).map(s => s.replace(/^[•\-–*]\s*/, "")) : [];
    const images = Array.isArray(report.images) ? report.images.filter(Boolean) : [];
    const hseNotes = Array.isArray(report.hse_notes) ? report.hse_notes.filter(Boolean).map(s => s.replace(/^[•\-–*]\s*/, "")) : [];

    return (
        <>
            <style>{S}</style>
            <div className="report-page">
                <div className="topbar">
                    <div className="topbar-inner">
                        <a href="/"><img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" /></a>
                        <div className="topbar-right">
                            <span className="confidential">Confidential — For {report.client_name} only</span>
                            <button className="pdf-btn" onClick={() => window.print()}>⬇ Download PDF</button>
                        </div>
                    </div>
                </div>

                {/* Cover */}
                <div className="cover">
                    <div className="cover-glow" aria-hidden="true" />
                    <div className="cover-inner">
                        <div className="cover-eyebrow">Project Close-Out Report</div>
                        <h1>{report.project_title}</h1>
                        <div className="cover-meta">
                            <div className="cm-lbl">Client</div>
                            <div className="cm-val">{report.client_company || report.client_name}</div>
                            <div className="cm-lbl">Contractor</div>
                            <div className="cm-val">{report.contractor || "ANBE Nigeria Limited"}</div>
                            <div className="cm-lbl">Location</div>
                            <div className="cm-val">{report.location || "—"}</div>
                            <div className="cm-lbl">Report Date</div>
                            <div className="cm-val">{report.report_date ? fmt(report.report_date) : fmt(report.created_at)}</div>
                        </div>
                    </div>
                </div>

                <div className="body-wrap">

                    {/* 1. Introduction */}
                    {report.introduction && (
                        <div className="rpt-section">
                            <div className="rpt-section-title">1. Introduction</div>
                            <div className="narrative">{report.introduction.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</div>
                        </div>
                    )}

                    {/* 2. Scope */}
                    {report.scope_of_work && (
                        <div className="rpt-section">
                            <div className="rpt-section-title">2. Scope of Work</div>
                            <div className="narrative">{report.scope_of_work.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</div>
                        </div>
                    )}

                    {/* 3. Work Summary */}
                    {(report.work_summary?.mechanical?.length || report.work_summary?.civil?.length || report.work_summary?.ei?.length) ? (
                        <div className="rpt-section">
                            <div className="rpt-section-title">3. Work Summary Executed</div>
                            {report.work_summary.mechanical?.some(r => r.some(c => c?.trim())) && (<><div className="sub-label">Mechanical / Piping</div><RptTable headers={["Activity", "Quantity"]} rows={report.work_summary.mechanical} /></>)}
                            {report.work_summary.civil?.some(r => r.some(c => c?.trim())) && (<><div className="sub-label">Civil Works</div><RptTable headers={["Activity", "Quantity"]} rows={report.work_summary.civil} /></>)}
                            {report.work_summary.ei?.some(r => r.some(c => c?.trim())) && (<><div className="sub-label">E&amp;I Works</div><RptTable headers={["Activity", "Quantity"]} rows={report.work_summary.ei} /></>)}
                        </div>
                    ) : null}

                    {/* 4. Materials */}
                    {(report.materials?.mechanical?.length || report.materials?.civil?.length || report.materials?.ei?.length) ? (
                        <div className="rpt-section">
                            <div className="rpt-section-title">4. List of Materials Used</div>
                            {(["mechanical", "civil", "ei"] as const).map(type => report.materials[type]?.some(r => r.some(c => c?.trim())) && (
                                <div key={type}>
                                    <div className="sub-label">{type === "ei" ? "E&I" : type.charAt(0).toUpperCase() + type.slice(1)}</div>
                                    <RptTable headers={["S/N", "Description", "Qty Supplied", "Qty Used", "Balance"]} rows={report.materials[type]} />
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {/* 5. HSE */}
                    {(hseNotes.length > 0 || report.hse_status?.length) && (
                        <div className="rpt-section">
                            <div className="rpt-section-title">5. HSE Performance</div>
                            {hseNotes.length > 0 && (
                                <div className="hse-box">
                                    <ul className="bullet-list">{hseNotes.map((n, i) => <li key={i}>{n}</li>)}</ul>
                                </div>
                            )}
                            {report.hse_status?.some(r => r.some(c => c?.trim())) && (
                                <RptTable headers={["HSE Item", "Status"]} rows={report.hse_status} />
                            )}
                        </div>
                    )}

                    {/* 6. Personnel */}
                    {report.personnel?.some(r => r.some(c => c?.trim())) && (
                        <div className="rpt-section">
                            <div className="rpt-section-title">6. Project Personnel Summary</div>
                            <RptTable headers={["Role", "Number"]} rows={report.personnel} />
                        </div>
                    )}

                    {/* 7. Equipment */}
                    {report.equipment?.some(r => r.some(c => c?.trim())) && (
                        <div className="rpt-section">
                            <div className="rpt-section-title">7. Equipment Deployed</div>
                            <RptTable headers={["Equipment", "Quantity"]} rows={report.equipment} />
                        </div>
                    )}

                    {/* 8. Achievements */}
                    {achievements.length > 0 && (
                        <div className="rpt-section">
                            <div className="rpt-section-title">8. Project Achievements</div>
                            <ul className="bullet-list">{achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
                        </div>
                    )}

                    {/* 9. Conclusion */}
                    {report.conclusion && (
                        <div className="rpt-section">
                            <div className="rpt-section-title">9. Conclusion</div>
                            <div className="narrative">{report.conclusion.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</div>
                        </div>
                    )}

                    {/* Images */}
                    {images.length > 0 && (
                        <div className="rpt-section">
                            <div className="rpt-section-title">Project Photography</div>
                            <div className="img-gallery">
                                {images.map((src, i) => <img key={i} src={src} alt={`Project image ${i + 1}`} loading="lazy" />)}
                            </div>
                        </div>
                    )}

                    {/* Sign-off */}
                    {(report.signoff_contractor_name || report.signoff_client_name) && (
                        <div className="rpt-section">
                            <div className="rpt-section-title">Sign-Off</div>
                            <div className="signoff-grid">
                                <div className="signoff-party">
                                    <div className="sp-label">For Contractor — ANBE Nigeria Limited</div>
                                    {[["Name", report.signoff_contractor_name], ["Designation", report.signoff_contractor_desig], ["Date", report.signoff_contractor_date ? fmt(report.signoff_contractor_date) : ""], ["Signature", ""]].map(([l, v]) => (
                                        <div key={l} className="sp-field"><div className="sp-lbl">{l}</div><div className="sp-val">{v}</div></div>
                                    ))}
                                </div>
                                <div className="signoff-party">
                                    <div className="sp-label">For Client — {report.client_company || report.client_name}</div>
                                    {[["Name", report.signoff_client_name], ["Designation", report.signoff_client_desig], ["Date", report.signoff_client_date ? fmt(report.signoff_client_date) : ""], ["Signature", ""]].map(([l, v]) => (
                                        <div key={l} className="sp-field"><div className="sp-lbl">{l}</div><div className="sp-val">{v}</div></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                <div className="rpt-footer">
                    <div className="rpt-footer-inner">
                        <div className="pby"><strong>Prepared by</strong>{report.contractor || "ANBE Nigeria Limited"}</div>
                        <div className="pby" style={{ textAlign: "right" }}><strong>Confidential</strong>For {report.client_name} only</div>
                    </div>
                </div>
            </div>
        </>
    );
}
