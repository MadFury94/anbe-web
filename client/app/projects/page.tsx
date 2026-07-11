"use client";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useEffect, useState } from "react";

const STYLES = `
  *{box-sizing:border-box;}
  .container{max-width:1240px;margin:0 auto;padding:0 32px;}
  h1,h2,h3,h4{font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:-0.01em;}
  p,li,a,label{font-family:'Inter',sans-serif;}
  .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#E8873A;display:flex;align-items:center;gap:10px;margin-bottom:18px;}
  .eyebrow::before{content:"";width:28px;height:1px;background:#E8873A;flex-shrink:0;}
  .btn{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;font-size:14px;font-weight:600;letter-spacing:0.02em;border-radius:2px;transition:all .25s ease;text-decoration:none;font-family:'Inter',sans-serif;}
  .btn-primary{background:#E8873A;color:#0A1628;}
  .btn-primary:hover{background:#F0A669;transform:translateY(-1px);}
  .btn-dark{border:1px solid rgba(10,22,40,0.12);color:#0A1628;}
  .btn-dark:hover{border-color:#0A1628;background:#0A1628;color:#fff;}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.in{opacity:1;transform:translateY(0);}
  @media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important;}}

  /* PAGE HERO */
  .page-hero{padding:180px 0 90px;background:linear-gradient(180deg,rgba(10,22,40,0.9) 0%,#0A1628 100%),linear-gradient(135deg,#0A1628 0%,#10203A 55%,#16283F 100%);position:relative;overflow:hidden;}
  .page-hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(139,149,161,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(139,149,161,0.06) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(180deg,rgba(0,0,0,0.5),transparent 80%);}
  .flare-glow{position:absolute;left:8%;top:10%;width:360px;height:360px;background:radial-gradient(circle,rgba(232,135,58,0.28) 0%,transparent 70%);filter:blur(12px);animation:flarePulse 6s ease-in-out infinite;}
  @keyframes flarePulse{0%,100%{opacity:.5;transform:scale(1);}50%{opacity:.85;transform:scale(1.06);}}
  .page-hero-inner{position:relative;z-index:2;max-width:920px;}
  .page-hero h1{font-size:clamp(34px,4.6vw,56px);color:#fff;line-height:1.08;margin-bottom:20px;font-family:'Space Grotesk',sans-serif;}
  .page-hero p{font-size:17px;color:rgba(247,245,240,0.68);max-width:760px;font-family:'Inter',sans-serif;}
  .breadcrumb{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8B95A1;margin-bottom:22px;letter-spacing:0.04em;}
  .breadcrumb a{color:#E8873A;text-decoration:none;}

  /* STATS */
  .stats-strip{background:#1B222B;padding:44px 0;}
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
  .stat{border-left:1px solid rgba(247,245,240,0.14);padding-left:22px;}
  .stat:first-child{border-left:none;padding-left:0;}
  .stat .val{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,2.6vw,34px);color:#fff;font-weight:700;}
  .stat .lbl{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B95A1;letter-spacing:0.06em;text-transform:uppercase;margin-top:6px;}

  /* FILTER & PROJECTS */
  .filter-bar{padding:60px 0 0;}
  .filter-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:44px;}
  .filter-tabs{display:flex;flex-wrap:wrap;gap:8px;}
  .filter-tabs button{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;padding:10px 18px;border:1px solid rgba(10,22,40,0.12);color:#4A5568;transition:all .25s ease;background:none;cursor:pointer;}
  .filter-tabs button:hover{border-color:#0A1628;color:#0A1628;}
  .filter-tabs button.active{background:#0A1628;border-color:#0A1628;color:#fff;}
  .result-count{font-family:'IBM Plex Mono',monospace;font-size:12.5px;color:#4A5568;}
  .projects-section{padding:0 0 110px;}
  .projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;}
  .proj-card{border:1px solid rgba(10,22,40,0.12);background:#fff;overflow:hidden;transition:box-shadow .3s ease,transform .3s ease;display:flex;flex-direction:column;}
  .proj-card:hover{box-shadow:0 24px 48px -20px rgba(10,22,40,0.25);transform:translateY(-4px);}
  .proj-thumb{aspect-ratio:16/10;background:linear-gradient(155deg,#16283F,#0A1628);position:relative;overflow:hidden;transition:transform .5s ease;}
  .proj-card:hover .proj-thumb{transform:scale(1.03);}
  .proj-thumb::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:30px 30px;}
  .zoom-tag{position:absolute;top:16px;left:16px;font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#E8873A;letter-spacing:0.08em;text-transform:uppercase;border:1px solid rgba(232,135,58,0.4);padding:4px 10px;z-index:2;}
  .proj-body{padding:26px 26px 28px;display:flex;flex-direction:column;flex:1;}
  .proj-body .client{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:#8B95A1;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;}
  .proj-body h3{font-size:19px;margin-bottom:10px;color:#0A1628;font-family:'Space Grotesk',sans-serif;}
  .proj-body p{font-size:14px;color:#4A5568;margin-bottom:18px;flex:1;font-family:'Inter',sans-serif;}
  .proj-body .view-btn{font-size:13px;font-weight:600;display:inline-flex;align-items:center;gap:8px;color:#0A1628;background:none;border:none;cursor:pointer;align-self:flex-start;font-family:'Inter',sans-serif;}
  .proj-body .view-btn .arrow{transition:transform .25s ease;}
  .proj-card:hover .view-btn .arrow{transform:translateX(4px);}
  .load-more-wrap{display:flex;justify-content:center;margin-top:56px;}

  /* CTA BAND */
  .cta-band{background:linear-gradient(120deg,#0A1628,#16283F);padding:80px 0;position:relative;overflow:hidden;}
  .cta-band::before{content:"";position:absolute;right:-8%;top:-30%;width:340px;height:340px;background:radial-gradient(circle,rgba(232,135,58,0.25),transparent 70%);}
  .cta-inner{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;}
  .cta-inner h2{color:#fff;font-size:clamp(24px,3vw,34px);max-width:680px;font-family:'Space Grotesk',sans-serif;}
  .cta-inner p{color:rgba(247,245,240,0.65);margin-top:10px;max-width:640px;font-family:'Inter',sans-serif;}

  /* MODAL */
  .modal-overlay{position:fixed;inset:0;background:rgba(10,22,40,0.7);backdrop-filter:blur(4px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:24px;}
  .modal-box{background:#F7F5F0;max-width:860px;width:100%;max-height:86vh;overflow-y:auto;position:relative;border:1px solid rgba(10,22,40,0.12);}
  .modal-close{position:absolute;top:18px;right:18px;width:36px;height:36px;border:1px solid rgba(10,22,40,0.12);background:#fff;font-size:16px;color:#0A1628;z-index:3;cursor:pointer;font-family:'Inter',sans-serif;}
  .modal-hero{aspect-ratio:16/8;background:linear-gradient(155deg,#16283F,#0A1628);position:relative;}
  .modal-hero::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:30px 30px;}
  .modal-hero .tag{position:absolute;bottom:18px;left:24px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#E8873A;letter-spacing:0.08em;text-transform:uppercase;z-index:2;}
  .modal-content{padding:36px;}
  .modal-content .client{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8B95A1;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;}
  .modal-content h3{font-size:26px;margin-bottom:16px;color:#0A1628;font-family:'Space Grotesk',sans-serif;}
  .modal-content p{font-size:15px;color:#4A5568;margin-bottom:22px;font-family:'Inter',sans-serif;}
  .modal-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;border-top:1px solid rgba(10,22,40,0.12);padding-top:22px;}
  .modal-meta div .lbl{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#E8873A;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;}
  .modal-meta div .val{font-size:14px;color:#0A1628;font-weight:600;font-family:'Space Grotesk',sans-serif;}

  @media (max-width:1080px){.projects-grid{grid-template-columns:repeat(2,1fr);}.stats-grid{grid-template-columns:repeat(2,1fr);}.stat:nth-child(3){border-left:none;padding-left:0;}}
  @media (max-width:920px){.projects-grid{grid-template-columns:1fr;}.stats-grid{grid-template-columns:1fr 1fr;}.stat:nth-child(3){border-left:none;padding-left:0;}.page-hero{padding:100px 0 50px;}.container{padding:0 20px;}.modal-meta{grid-template-columns:1fr;}}
`;

const API = import.meta.env.VITE_API_URL ?? "https://anbe-api.onochieazukaeme.workers.dev";

interface Project {
  id: number; slug: string; title: string; client: string; category: string;
  tag: string; description: string; image: string; location: string;
  duration: string; scope: string;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}



function PageHero() {
  return (
    <section className="page-hero">
      <div className="flare-glow" aria-hidden="true" />
      <div className="container page-hero-inner">
        <div className="breadcrumb"><a href="/">Home</a> / Projects</div>
        <h1>A record of pipeline, flare, and fabrication work across the Niger Delta.</h1>
        <p>Every project below moved through the same three disciplines — engineering, procurement, and construction — delivered by ANBE's own field teams from mobilisation to close-out.</p>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="container stats-grid">
        <div className="stat"><div className="val">140+</div><div className="lbl">Projects Completed</div></div>
        <div className="stat"><div className="val">36</div><div className="lbl">Years in the Field</div></div>
        <div className="stat"><div className="val">4</div><div className="lbl">Core Service Lines</div></div>
        <div className="stat"><div className="val">0</div><div className="lbl">Lost-Time Incidents YTD</div></div>
      </div>
    </div>
  );
}

function ProjectsSection({ onOpen }: { onOpen: (p: Project) => void }) {
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then(r => r.json())
      .then(d => { setProjects(d.projects ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const TABS = [
    { key: "all", label: "All Projects" },
    { key: "flare", label: "Flare Systems" },
    { key: "pipeline", label: "Pipeline" },
    { key: "fabrication", label: "Fabrication" },
    { key: "maintenance", label: "Maintenance" },
  ];
  const visible = projects.filter((p) => filter === "all" || p.category === filter);
  return (
    <>
      <section className="filter-bar">
        <div className="container">
          <div className="filter-row">
            <div className="filter-tabs">
              {TABS.map((t) => (
                <button key={t.key} className={filter === t.key ? "active" : ""} onClick={() => setFilter(t.key)}>{t.label}</button>
              ))}
            </div>
            <div className="result-count"><span>{visible.length}</span> Projects</div>
          </div>
        </div>
      </section>
      <section className="projects-section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: "#8B95A1" }}>Loading projects…</div>
          ) : (
            <div className="projects-grid reveal">
              {visible.map((p) => (
                <div key={p.id} className="proj-card">
                  <div className="proj-thumb" style={p.image ? { backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}>
                    <span className="zoom-tag">{p.tag || p.category}</span>
                  </div>
                  <div className="proj-body">
                    <div className="client">{p.client}</div>
                    <h3>{p.title}</h3>
                    <p>{p.description?.split(",")[0]}…</p>
                    <button className="view-btn" onClick={() => onOpen(p)}>View Project <span className="arrow">→</span></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="load-more-wrap">
            <a href="/#contact" className="btn btn-dark">Discuss a Project With Us →</a>
          </div>
        </div>
      </section>
    </>
  );
}

function Modal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-hero" style={project.image ? { backgroundImage: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}>
          <span className="tag">{project.tag || project.category}</span>
        </div>
        <div className="modal-content">
          <div className="client">{project.client}</div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="modal-meta">
            <div><div className="lbl">Location</div><div className="val">{project.location}</div></div>
            <div><div className="lbl">Duration</div><div className="val">{project.duration}</div></div>
            <div><div className="lbl">Scope</div><div className="val">{project.scope}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <h2>Have a scope that needs an indigenous EPC partner?</h2>
          <p>Send us the details and a member of our engineering team will respond within one business day.</p>
        </div>
        <a href="/#contact" className="btn btn-primary">Start a Conversation →</a>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  useReveal();
  const [modal, setModal] = useState<Project | null>(null);
  return (
    <>
      <style>{STYLES}</style>
      <SiteNav activePath="/projects" />
      <main>
        <PageHero />
        <StatsStrip />
        <ProjectsSection onOpen={setModal} />
        <CtaBand />
      </main>
      <SiteFooter />
      {modal && <Modal project={modal} onClose={() => setModal(null)} />}
    </>
  );
}
