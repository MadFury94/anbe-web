"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? "https://anbe-api.workers.dev";

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Inter',sans-serif;background:#F7F5F0;color:#12181F;}
  h1,h2,h3,h4{font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:-0.01em;}
  .report-page{min-height:100vh;background:#F7F5F0;}

  /* TOP BAR */
  .report-topbar{background:#0A1628;padding:16px 0;border-bottom:3px solid #E8873A;}
  .report-topbar-inner{max-width:900px;margin:0 auto;padding:0 32px;display:flex;align-items:center;justify-content:space-between;}
  .report-topbar img{height:44px;width:auto;}
  .report-topbar .confidential{font-family:'IBM Plex Mono',monospace;font-size:10px;color:rgba(247,245,240,0.5);letter-spacing:0.12em;text-transform:uppercase;}

  /* HERO */
  .report-hero{background:linear-gradient(135deg,#0A1628 0%,#16283F 100%);padding:60px 0 52px;position:relative;overflow:hidden;}
  .report-hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(139,149,161,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(139,149,161,0.05) 1px,transparent 1px);background-size:48px 48px;}
  .report-hero-glow{position:absolute;right:5%;top:10%;width:300px;height:300px;background:radial-gradient(circle,rgba(232,135,58,0.22) 0%,transparent 70%);filter:blur(30px);}
  .report-hero-inner{max-width:900px;margin:0 auto;padding:0 32px;position:relative;z-index:2;}
  .report-eyebrow{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#E8873A;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px;}
  .report-eyebrow::before{content:"";width:24px;height:1px;background:#E8873A;}
  .report-hero h1{font-size:clamp(26px,4vw,44px);color:#fff;line-height:1.1;margin-bottom:12px;}
  .report-hero .client-tag{font-size:16px;color:rgba(247,245,240,0.65);font-family:'Inter',sans-serif;}
  .report-hero .meta-row{display:flex;flex-wrap:wrap;gap:28px;margin-top:32px;padding-top:28px;border-top:1px solid rgba(247,245,240,0.12);}
  .report-hero .meta-item .lbl{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#8B95A1;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:5px;}
  .report-hero .meta-item .val{font-size:15px;color:#fff;font-weight:500;}

  /* BODY */
  .report-body{max-width:900px;margin:0 auto;padding:0 32px 80px;}

  /* SECTION */
  .report-section{margin-top:52px;}
  .section-label{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#E8873A;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:20px;display:flex;align-items:center;gap:10px;}
  .section-label::after{content:"";flex:1;height:1px;background:rgba(10,22,40,0.1);}
  .section-h2{font-size:22px;color:#0A1628;margin-bottom:20px;}

  /* SCOPE */
  .scope-text p{font-size:15px;color:#4A5568;line-height:1.8;margin-bottom:16px;}
  .scope-text p:last-child{margin-bottom:0;}

  /* MILESTONES */
  .milestones{display:flex;flex-direction:column;gap:0;position:relative;}
  .milestones::before{content:"";position:absolute;left:14px;top:0;bottom:0;width:1px;background:rgba(10,22,40,0.1);}
  .milestone{display:grid;grid-template-columns:30px 1fr auto;gap:16px;align-items:center;padding:14px 0;position:relative;}
  .milestone .dot{width:14px;height:14px;border-radius:50%;border:2px solid #E8873A;background:#fff;z-index:1;margin:0 auto;}
  .milestone.done .dot{background:#E8873A;}
  .milestone .m-label{font-size:14px;font-weight:500;color:#0A1628;}
  .milestone .m-date{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B95A1;text-align:right;}
  .milestone .m-status{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;padding:2px 8px;border-radius:2px;}
  .milestone.done .m-status{background:rgba(34,197,94,0.1);color:#15803d;}
  .milestone:not(.done) .m-status{background:rgba(10,22,40,0.07);color:#8B95A1;}

  /* OUTCOMES */
  .outcomes{display:flex;flex-direction:column;gap:10px;}
  .outcome{display:flex;align-items:flex-start;gap:12px;padding:14px 18px;background:#fff;border:1px solid rgba(10,22,40,0.08);border-left:3px solid #E8873A;}
  .outcome::before{content:"✓";color:#E8873A;font-weight:700;flex-shrink:0;margin-top:1px;}
  .outcome span{font-size:14px;color:#12181F;line-height:1.6;}

  /* IMAGE GALLERY */
  .img-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
  .img-grid img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;border:1px solid rgba(10,22,40,0.1);}
  .img-grid .img-single{grid-column:1/-1;}

  /* HSE */
  .hse-box{background:#0A1628;padding:28px 32px;border-left:4px solid #E8873A;display:flex;gap:20px;align-items:flex-start;}
  .hse-box .hse-icon{font-size:24px;flex-shrink:0;}
  .hse-box h4{font-family:'Space Grotesk',sans-serif;font-size:15px;color:#fff;margin-bottom:6px;}
  .hse-box p{font-size:13.5px;color:rgba(247,245,240,0.68);line-height:1.7;}

  /* FOOTER */
  .report-footer{background:#0A1628;padding:36px 0;margin-top:60px;}
  .report-footer-inner{max-width:900px;margin:0 auto;padding:0 32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
  .report-footer .prepared{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B95A1;letter-spacing:0.06em;}
  .report-footer .prepared strong{color:#E8873A;display:block;margin-bottom:3px;}

  /* STATES */
  .loading-state,.error-state{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:48px;}
  .loading-state p{font-family:'IBM Plex Mono',monospace;font-size:13px;color:#8B95A1;letter-spacing:0.06em;}
  .error-box{max-width:480px;text-align:center;}
  .error-box h2{font-size:24px;color:#0A1628;margin-bottom:12px;}
  .error-box p{font-size:15px;color:#4A5568;line-height:1.7;}

  @media(max-width:640px){
    .report-hero-inner,.report-body,.report-topbar-inner,.report-footer-inner{padding:0 20px;}
    .img-grid{grid-template-columns:1fr;}
    .hse-box{flex-direction:column;gap:12px;}
    .milestone{grid-template-columns:24px 1fr;}
    .m-date{display:none;}
  }
`;

interface Milestone { label: string; date: string; done: boolean; }
interface Report {
    title: string; client_name: string; client_company: string;
    category: string; location: string; start_date: string; end_date: string;
    scope: string[]; outcomes: string[]; images: string[];
    milestones: Milestone[]; hse_note: string; prepared_by: string;
    views: number; created_at: string;
}

function fmt(d: string) {
    if (!d) return "";
    try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); }
    catch { return d; }
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
                const data = await r.json();
                setReport(data.report);
                setStatus("ok");
            })
            .catch(() => setStatus("notfound"));
    }, [token]);

    if (status === "loading") return (
        <>
            <style>{S}</style>
            <div className="loading-state"><p>Loading report…</p></div>
        </>
    );

    if (status === "expired") return (
        <>
            <style>{S}</style>
            <div className="error-state">
                <div className="error-box">
                    <h2>Link Expired</h2>
                    <p>This report link has expired. Please contact ANBE Nigeria Limited for an updated link.</p>
                    <a href="/" style={{ display: "inline-block", marginTop: 24, fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "#E8873A" }}>← anbenig.com</a>
                </div>
            </div>
        </>
    );

    if (status === "notfound" || !report) return (
        <>
            <style>{S}</style>
            <div className="error-state">
                <div className="error-box">
                    <h2>Report Not Found</h2>
                    <p>This report link is invalid or has been removed. Please contact ANBE Nigeria Limited.</p>
                    <a href="/" style={{ display: "inline-block", marginTop: 24, fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "#E8873A" }}>← anbenig.com</a>
                </div>
            </div>
        </>
    );

    const images: string[] = Array.isArray(report.images) ? report.images : [];
    const outcomes: string[] = Array.isArray(report.outcomes) ? report.outcomes : [];
    const milestones: Milestone[] = Array.isArray(report.milestones) ? report.milestones : [];
    const scope: string[] = Array.isArray(report.scope) ? report.scope : [];

    return (
        <>
            <style>{S}</style>
            <div className="report-page">

                {/* Top bar */}
                <div className="report-topbar">
                    <div className="report-topbar-inner">
                        <a href="/"><img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" /></a>
                        <span className="confidential">Confidential — For {report.client_name} only</span>
                    </div>
                </div>

                {/* Hero */}
                <div className="report-hero">
                    <div className="report-hero-glow" aria-hidden="true" />
                    <div className="report-hero-inner">
                        <div className="report-eyebrow">Project Completion Report</div>
                        <h1>{report.title}</h1>
                        <p className="client-tag">
                            Prepared for {report.client_name}
                            {report.client_company ? ` — ${report.client_company}` : ""}
                        </p>
                        <div className="meta-row">
                            {report.category && (
                                <div className="meta-item">
                                    <div className="lbl">Category</div>
                                    <div className="val" style={{ textTransform: "capitalize" }}>{report.category}</div>
                                </div>
                            )}
                            {report.location && (
                                <div className="meta-item">
                                    <div className="lbl">Location</div>
                                    <div className="val">{report.location}</div>
                                </div>
                            )}
                            {report.start_date && (
                                <div className="meta-item">
                                    <div className="lbl">Start Date</div>
                                    <div className="val">{fmt(report.start_date)}</div>
                                </div>
                            )}
                            {report.end_date && (
                                <div className="meta-item">
                                    <div className="lbl">Completion Date</div>
                                    <div className="val">{fmt(report.end_date)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="report-body">

                    {/* Scope of Work */}
                    {scope.length > 0 && (
                        <div className="report-section">
                            <div className="section-label">Scope of Work</div>
                            <div className="scope-text">
                                {scope.map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                        </div>
                    )}

                    {/* Milestones */}
                    {milestones.length > 0 && (
                        <div className="report-section">
                            <div className="section-label">Project Milestones</div>
                            <div className="milestones">
                                {milestones.map((m, i) => (
                                    <div key={i} className={`milestone${m.done ? " done" : ""}`}>
                                        <div className="dot" />
                                        <div className="m-label">{m.label}</div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            {m.date && <span className="m-date">{fmt(m.date)}</span>}
                                            <span className="m-status">{m.done ? "Complete" : "Pending"}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Key Outcomes */}
                    {outcomes.length > 0 && (
                        <div className="report-section">
                            <div className="section-label">Key Outcomes</div>
                            <div className="outcomes">
                                {outcomes.map((o, i) => (
                                    <div key={i} className="outcome"><span>{o}</span></div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Images */}
                    {images.length > 0 && (
                        <div className="report-section">
                            <div className="section-label">Project Photography</div>
                            <div className="img-grid">
                                {images.map((src, i) => (
                                    <div key={i} className={images.length === 1 ? "img-single" : ""}>
                                        <img src={src} alt={`Project image ${i + 1}`} loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* HSE */}
                    {report.hse_note && (
                        <div className="report-section">
                            <div className="section-label">Health, Safety & Environment</div>
                            <div className="hse-box">
                                <div className="hse-icon">🛡</div>
                                <div>
                                    <h4>HSE Performance Summary</h4>
                                    <p>{report.hse_note}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="report-footer">
                    <div className="report-footer-inner">
                        <div className="prepared">
                            <strong>Prepared by</strong>
                            {report.prepared_by || "ANBE Nigeria Limited"}
                        </div>
                        <div className="prepared" style={{ textAlign: "right" }}>
                            <strong>Report Date</strong>
                            {fmt(report.created_at)}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
