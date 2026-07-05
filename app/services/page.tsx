"use client";
import { useEffect, useState } from "react";

const S = `
  *{box-sizing:border-box;}
  .site-nav-sub{position:fixed;top:0;left:0;right:0;z-index:1000;padding:14px 0;background:rgba(10,22,40,0.94);backdrop-filter:blur(10px);border-bottom:1px solid rgba(247,245,240,0.14);}
  .nav-inner{display:flex;align-items:center;justify-content:space-between;}
  .logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:#fff;letter-spacing:0.02em;display:flex;align-items:center;gap:10px;text-decoration:none;}
  .logo .mark{width:12px;height:12px;background:#E8873A;clip-path:polygon(50% 0%,100% 100%,0% 100%);display:inline-block;flex-shrink:0;}
  .logo span.sub{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#8B95A1;letter-spacing:0.1em;font-weight:400;display:block;}
  .main-links{display:flex;gap:34px;}
  .main-links a{font-family:'Inter',sans-serif;font-size:14px;color:rgba(255,255,255,0.82);font-weight:500;position:relative;padding:4px 0;text-decoration:none;}
  .main-links a::after{content:"";position:absolute;left:0;bottom:0;width:0;height:1px;background:#E8873A;transition:width .3s ease;}
  .main-links a:hover::after,.main-links a.active::after{width:100%;}
  .nav-cta{font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#0A1628;background:#E8873A;padding:11px 22px;border-radius:2px;letter-spacing:0.02em;transition:background .25s ease;text-decoration:none;}
  .nav-cta:hover{background:#F0A669;}
  .nav-toggle{display:none;background:none;border:none;color:#fff;font-size:22px;cursor:pointer;}
  .container{max-width:1240px;margin:0 auto;padding:0 32px;}
  h1,h2,h3,h4{font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:-0.01em;}
  p,li,a,label,input,textarea,select{font-family:'Inter',sans-serif;}
  .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#E8873A;display:flex;align-items:center;gap:10px;margin-bottom:18px;}
  .eyebrow::before{content:"";width:28px;height:1px;background:#E8873A;flex-shrink:0;}
  .btn{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;font-size:14px;font-weight:600;letter-spacing:0.02em;border-radius:2px;transition:all .25s ease;font-family:'Inter',sans-serif;text-decoration:none;border:none;cursor:pointer;}
  .btn-primary{background:#E8873A;color:#0A1628;}
  .btn-primary:hover{background:#F0A669;transform:translateY(-1px);}
  .btn-dark{border:1px solid rgba(10,22,40,0.12)!important;color:#0A1628;}
  .btn-dark:hover{border-color:#0A1628!important;background:#0A1628;color:#fff;}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.in{opacity:1;transform:translateY(0);}
  .section-pad{padding:110px 0;}
  @media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important;}}

  /* PAGE HERO */
  .page-hero{padding:180px 0 90px;background:linear-gradient(180deg,rgba(10,22,40,0.9) 0%,#0A1628 100%),linear-gradient(135deg,#0A1628 0%,#10203A 55%,#16283F 100%);position:relative;overflow:hidden;}
  .page-hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(139,149,161,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(139,149,161,0.06) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(180deg,rgba(0,0,0,0.5),transparent 80%);}
  .flare-glow{position:absolute;left:8%;top:10%;width:360px;height:360px;background:radial-gradient(circle,rgba(232,135,58,0.28) 0%,transparent 70%);filter:blur(12px);animation:flarePulse 6s ease-in-out infinite;}
  @keyframes flarePulse{0%,100%{opacity:.5;transform:scale(1);}50%{opacity:.85;transform:scale(1.06);}}
  .page-hero-inner{position:relative;z-index:2;max-width:760px;}
  .page-hero h1{font-size:clamp(34px,4.6vw,56px);color:#fff;line-height:1.08;margin-bottom:20px;}
  .page-hero p{font-size:17px;color:rgba(247,245,240,0.68);max-width:600px;}
  .breadcrumb{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8B95A1;margin-bottom:22px;letter-spacing:0.04em;}
  .breadcrumb a{color:#E8873A;text-decoration:none;}

  /* SERVICES GRID */
  .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(10,22,40,0.1);border:1px solid rgba(10,22,40,0.1);}
  .service-card{background:#F7F5F0;padding:40px 34px;transition:background .3s ease;position:relative;}
  .service-card:hover{background:#fff;}
  .service-card .idx{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#E8873A;letter-spacing:0.08em;margin-bottom:20px;}
  .service-card .svc-img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;margin-bottom:22px;}
  .service-card h3{font-size:19px;margin-bottom:12px;color:#0A1628;}
  .service-card p{font-size:14.5px;color:#4A5568;margin-bottom:22px;line-height:1.65;}
  .service-card ul{display:flex;flex-direction:column;gap:8px;margin-bottom:22px;}
  .service-card ul li{font-size:13.5px;color:#4A5568;display:flex;align-items:center;gap:8px;}
  .service-card ul li::before{content:"";width:5px;height:5px;background:#E8873A;border-radius:50%;flex-shrink:0;}
  .service-card .learn{font-size:13px;font-weight:600;color:#0A1628;display:inline-flex;align-items:center;gap:8px;text-decoration:none;font-family:'Inter',sans-serif;}
  .service-card .arrow{transition:transform .25s ease;}
  .service-card:hover .arrow{transform:translateX(4px);}

  /* FEATURE BAND */
  .feature-band{background:#1B222B;padding:80px 0;}
  .feature-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(247,245,240,0.08);}
  .feature-item{padding:36px 28px;background:#1B222B;}
  .feature-item .f-num{font-family:'Space Grotesk',sans-serif;font-size:clamp(32px,3vw,44px);font-weight:700;color:#E8873A;line-height:1;}
  .feature-item .f-lbl{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B95A1;letter-spacing:0.06em;text-transform:uppercase;margin-top:8px;}

  /* PROCESS SECTION */
  .process-steps{display:flex;flex-direction:column;gap:0;}
  .process-step{display:grid;grid-template-columns:80px 1fr 1fr;gap:40px;padding:44px 0;border-bottom:1px solid rgba(10,22,40,0.1);align-items:center;}
  .process-step:first-child{border-top:1px solid rgba(10,22,40,0.1);}
  .step-num{font-family:'IBM Plex Mono',monospace;font-size:36px;color:#E8873A;font-weight:500;line-height:1;}
  .step-body h4{font-family:'Space Grotesk',sans-serif;font-size:20px;color:#0A1628;margin-bottom:10px;}
  .step-body p{font-family:'Inter',sans-serif;font-size:14px;color:#4A5568;line-height:1.65;}
  .step-img{aspect-ratio:16/9;overflow:hidden;position:relative;}
  .step-img img{width:100%;height:100%;object-fit:cover;display:block;}

  /* GALLERY */
  .gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;}
  .gallery-item{aspect-ratio:4/3;overflow:hidden;position:relative;}
  .gallery-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
  .gallery-item:hover img{transform:scale(1.05);}
  .gallery-item .g-label{position:absolute;bottom:0;left:0;right:0;background:rgba(10,22,40,0.82);padding:14px 18px;transform:translateY(100%);transition:transform .3s ease;}
  .gallery-item:hover .g-label{transform:translateY(0);}
  .gallery-item .g-label span{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#E8873A;letter-spacing:0.06em;text-transform:uppercase;}

  /* CTA BAND */
  .cta-band{background:linear-gradient(120deg,#0A1628,#16283F);padding:80px 0;position:relative;overflow:hidden;}
  .cta-band::before{content:"";position:absolute;right:-8%;top:-30%;width:340px;height:340px;background:radial-gradient(circle,rgba(232,135,58,0.25),transparent 70%);}
  .cta-inner{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;}
  .cta-inner h2{color:#fff;font-size:clamp(24px,3vw,34px);max-width:520px;}
  .cta-inner p{color:rgba(247,245,240,0.65);margin-top:10px;max-width:480px;}

  /* FOOTER */
  footer.site-footer{background:#0A1628;padding:70px 0 30px;}
  .footer-grid{display:grid;grid-template-columns:1.4fr repeat(4,1fr);gap:40px;padding-bottom:48px;border-bottom:1px solid rgba(247,245,240,0.14);}
  .footer-brand p{color:#8B95A1;font-size:14px;margin:18px 0 22px;max-width:280px;}
  .footer-col h5{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:#E8873A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:20px;}
  .footer-col a{display:block;color:rgba(247,245,240,0.62);font-size:14px;margin-bottom:12px;transition:color .2s ease;text-decoration:none;}
  .footer-col a:hover{color:#fff;}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:26px;flex-wrap:wrap;gap:16px;}
  .footer-bottom p{font-size:12.5px;color:#8B95A1;font-family:'IBM Plex Mono',monospace;}
  .social-row{display:flex;gap:16px;}
  .social-row a{width:34px;height:34px;border:1px solid rgba(247,245,240,0.14);display:flex;align-items:center;justify-content:center;color:#8B95A1;font-size:13px;transition:all .2s ease;text-decoration:none;font-family:'IBM Plex Mono',monospace;}
  .social-row a:hover{border-color:#E8873A;color:#E8873A;}

  @media (max-width:1080px){
    .services-grid{grid-template-columns:repeat(2,1fr);}
    .feature-grid{grid-template-columns:repeat(2,1fr);}
    .process-step{grid-template-columns:60px 1fr;}.step-img{display:none;}
    .gallery-grid{grid-template-columns:repeat(2,1fr);}
    .footer-grid{grid-template-columns:repeat(3,1fr);}
  }
  @media (max-width:760px){
    .main-links,.nav-cta{display:none!important;}
    .nav-toggle{display:block!important;}
    .services-grid,.gallery-grid{grid-template-columns:1fr;}
    .feature-grid{grid-template-columns:1fr 1fr;}
    .footer-grid{grid-template-columns:repeat(2,1fr);}
    .container{padding:0 20px;}
    .section-pad{padding:72px 0;}
  }
`;

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
            { threshold: 0.12 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

function SiteNav() {
    const [mob, setMob] = useState(false);
    return (
        <header className="site-nav-sub">
            <div className="container nav-inner">
                <a href="/" className="logo"><img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" style={{ height: 50, width: "auto", display: "block" }} /></a>
                <nav className="main-links">
                    <a href="/about">About</a>
                    <a href="/services" className="active">Services</a>
                    <a href="/projects">Projects</a>
                    <a href="/blog">Blog</a>
                    <a href="/contact">Contact</a>
                </nav>
                <a href="/contact" className="nav-cta">Contact Us</a>
                <button className="nav-toggle" onClick={() => setMob(!mob)} aria-label="Toggle menu">☰</button>
            </div>
            {mob && (
                <div style={{ position: "fixed", top: 64, left: 0, right: 0, background: "rgba(10,22,40,0.98)", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 18, zIndex: 999 }}>
                    {[["/about", "About"], ["/services", "Services"], ["/#industries", "Industries"], ["/projects", "Projects"], ["/#sustainability", "Sustainability"], ["/#news", "News"], ["/#careers", "Careers"], ["/blog", "Blog"], ["/contact", "Contact Us"]].map(([h, l]) => (
                        <a key={h} href={h} onClick={() => setMob(false)} style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, fontWeight: 500, fontFamily: "'Inter',sans-serif", textDecoration: "none" }}>{l}</a>
                    ))}
                </div>
            )}
        </header>
    );
}

function PageHero() {
    return (
        <section className="page-hero">
            <div className="flare-glow" aria-hidden="true" />
            <div className="container page-hero-inner">
                <div className="breadcrumb"><a href="/">Home</a> / Services</div>
                <div className="eyebrow">EPC Capability</div>
                <h1>Engineering, procurement, and construction under one roof.</h1>
                <p>From flare stack design to trunkline installation, our scopes move through the same three disciplines — sequenced by our own field teams, not subcontracted out.</p>
            </div>
        </section>
    );
}

const SERVICES = [
    { idx: "01 — DESIGN & ENGINEERING", img: "/industrial-1.jpg", title: "Smokeless Flare & Ignition Systems", desc: "Design and fabrication of vertical and horizontal smokeless flares, high turndown flares, and tropicalised remote ignition systems for onshore and offshore facilities.", features: ["Vertical & Horizontal Flares", "High Turndown Design", "Remote Ignition Systems", "Tropicalised Components"] },
    { idx: "02 — CONSTRUCTION", img: "/industrial-5.jpg", title: "Pipeline Construction & Repair", desc: "Full-scope pipeline construction, installation, and repair, including tie-ins, hydrotesting, and right-of-way reinstatement across any terrain.", features: ["New Pipeline Construction", "Emergency Tie-ins", "Hydrotesting", "ROW Reinstatement"] },
    { idx: "03 — PROCUREMENT", img: "/industrial-9.jpg", title: "Procurement & Stockpiling", desc: "Sourcing, quality verification, and stockpiling of materials and equipment for oil & gas facility construction with vendor management.", features: ["Material Sourcing", "Quality Verification", "Vendor Management", "Stockpile Management"] },
    { idx: "04 — FABRICATION", img: "/industrial-3.jpg", title: "Fabrication & Workshop Services", desc: "In-house fabrication of flare components, structural steel, and skid-mounted equipment at our Port Harcourt facility with full QA/QC inspection.", features: ["Flare Components", "Structural Steel", "Skid Fabrication", "QA/QC Inspection"] },
    { idx: "05 — MAINTENANCE", img: "/industrial-11.jpg", title: "Equipment Maintenance", desc: "Combustion equipment maintenance covering generators, earth-moving equipment, and flare ignition assemblies — with 24/7 emergency response capability.", features: ["Preventive Maintenance", "Emergency Response", "Generator Overhaul", "Ignition Assemblies"] },
    { idx: "06 — SUPPORT", img: "/industrial-7.jpg", title: "24/7 Technical Partner Support", desc: "Direct access to ANBE Technical Partners for specialist expertise across the full life cycle of a facility — from first oil to decommissioning planning.", features: ["Round-the-Clock Support", "Specialist Advisory", "Field Response Teams", "Life-cycle Management"] },
];

function ServicesSection() {
    return (
        <section className="section-pad" style={{ background: "#F7F5F0" }}>
            <div className="container">
                <div className="reveal" style={{ maxWidth: 640, marginBottom: 56 }}>
                    <div className="eyebrow">What We Deliver</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1, color: "#0A1628" }}>Six service lines, one delivery team.</h2>
                    <p style={{ color: "#4A5568", fontSize: 16, marginTop: 16 }}>Every scope runs through our in-house engineering, procurement, and construction disciplines — no hand-offs.</p>
                </div>
                <div className="services-grid reveal">
                    {SERVICES.map((s) => (
                        <div key={s.idx} className="service-card">
                            <div className="idx">{s.idx}</div>
                            <img className="svc-img" src={s.img} alt={s.title} />
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                            <ul>{s.features.map((f) => <li key={f}>{f}</li>)}</ul>
                            <a href="/contact" className="learn">Discuss a Scope <span className="arrow">→</span></a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureBand() {
    return (
        <div className="feature-band">
            <div className="container">
                <div className="feature-grid reveal">
                    {[["140+", "Projects Completed"], ["36", "Years in the Field"], ["0", "Lost-Time Incidents YTD"], ["24/7", "Field Response"]].map(([n, l]) => (
                        <div key={l} className="feature-item">
                            <div className="f-num">{n}</div>
                            <div className="f-lbl">{l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const PROCESS = [
    { n: "01", title: "Engineering & Design", desc: "Every scope starts at the drawing board. Our engineers develop technical specifications, material take-offs, and HSE plans before procurement begins.", img: "/industrial-2.jpg" },
    { n: "02", title: "Procurement", desc: "We source materials and equipment directly, applying quality verification checks at the supplier before anything reaches site.", img: "/industrial-6.jpg" },
    { n: "03", title: "Construction & Installation", desc: "Our own field teams mobilise and execute — tie-ins, welding, testing, and commissioning — with daily progress reporting to the client.", img: "/industrial-8.jpg" },
    { n: "04", title: "Commissioning & Close-out", desc: "Every scope is formally closed with hydrotesting certificates, as-built documentation, and a final HSE close-out sign-off.", img: "/industrial-10.jpg" },
];

function ProcessSection() {
    return (
        <section className="section-pad" style={{ background: "#fff" }}>
            <div className="container">
                <div className="reveal" style={{ maxWidth: 640, marginBottom: 56 }}>
                    <div className="eyebrow">How We Work</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1, color: "#0A1628" }}>Design through close-out — no gaps.</h2>
                    <p style={{ color: "#4A5568", fontSize: 16, marginTop: 16 }}>A single project team takes each scope from the first drawing to the final handover document.</p>
                </div>
                <div className="process-steps reveal">
                    {PROCESS.map((step) => (
                        <div key={step.n} className="process-step">
                            <div className="step-num">{step.n}</div>
                            <div className="step-body"><h4>{step.title}</h4><p>{step.desc}</p></div>
                            <div className="step-img"><img src={step.img} alt={step.title} /></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const GALLERY = [
    { src: "/industrial-4.jpg", label: "Pipeline Construction" },
    { src: "/industrial-12.jpg", label: "Flare Fabrication" },
    { src: "/industrial-7.jpg", label: "Field Installation" },
    { src: "/industrial-1.jpg", label: "Smokeless Flare Systems" },
    { src: "/industrial-9.jpg", label: "Ignition Upgrade" },
    { src: "/industrial-11.jpg", label: "Equipment Maintenance" },
];

function GallerySection() {
    return (
        <section className="section-pad" style={{ background: "#F7F5F0" }}>
            <div className="container">
                <div className="reveal" style={{ maxWidth: 640, marginBottom: 48 }}>
                    <div className="eyebrow">Field Work</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1, color: "#0A1628" }}>Our work in action.</h2>
                </div>
                <div className="gallery-grid reveal">
                    {GALLERY.map((g) => (
                        <div key={g.src} className="gallery-item">
                            <img src={g.src} alt={g.label} />
                            <div className="g-label"><span>{g.label}</span></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
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
                <a href="/contact" className="btn btn-primary">Start a Conversation →</a>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href="/" className="logo"><img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" style={{ height: 45, width: "auto", display: "block" }} /></a>
                        <p>An indigenous engineering company delivering pipeline construction, fabrication, and flare systems to Nigeria's oil &amp; gas sector since 1990.</p>
                    </div>
                    <div className="footer-col"><h5>Company</h5>
                        <a href="/about">About Us</a><a href="/contact">Careers</a><a href="/contact">Contact</a>
                    </div>
                    <div className="footer-col"><h5>Services</h5>
                        <a href="/services">Pipeline Construction</a><a href="/services">Flare Systems</a>
                        <a href="/services">Fabrication</a><a href="/services">Procurement</a>
                    </div>
                    <div className="footer-col"><h5>Industries</h5>
                        <a href="/services">Oil &amp; Gas</a><a href="/services">Infrastructure</a>
                        <a href="/services">Manufacturing</a><a href="/services">Government</a>
                    </div>
                    <div className="footer-col"><h5>Resources</h5>
                        <a href="/projects">Projects</a><a href="/about">Sustainability</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 ANBE Nigeria Limited. All rights reserved.</p>
                    <div className="social-row">
                        <a href="#" aria-label="LinkedIn">in</a>
                        <a href="#" aria-label="Twitter">x</a>
                        <a href="#" aria-label="Facebook">f</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function ServicesPage() {
    useReveal();
    return (
        <>
            <style>{S}</style>
            <SiteNav />
            <main>
                <PageHero />
                <ServicesSection />
                <FeatureBand />
                <ProcessSection />
                <GallerySection />
                <CtaBand />
            </main>
            <Footer />
        </>
    );
}
