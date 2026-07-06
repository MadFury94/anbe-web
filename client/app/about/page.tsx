"use client";
import SiteNav from "@/components/SiteNav";
import { useEffect, useState } from "react";

const S = `
  *{box-sizing:border-box;}
  .container{max-width:1240px;margin:0 auto;padding:0 32px;}
  h1,h2,h3,h4{font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:-0.01em;}
  p,li,label,input,textarea,select,a{font-family:'Inter',sans-serif;}
  .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#E8873A;display:flex;align-items:center;gap:10px;margin-bottom:18px;}
  .eyebrow::before{content:"";width:28px;height:1px;background:#E8873A;flex-shrink:0;}
  .btn{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;font-size:14px;font-weight:600;letter-spacing:0.02em;border-radius:2px;transition:all .25s ease;font-family:'Inter',sans-serif;text-decoration:none;}
  .btn-primary{background:#E8873A;color:#0A1628;}
  .btn-primary:hover{background:#F0A669;transform:translateY(-1px);}
  .btn-dark{border:1px solid rgba(10,22,40,0.12);color:#0A1628;}
  .btn-dark:hover{border-color:#0A1628;background:#0A1628;color:#fff;}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.in{opacity:1;transform:translateY(0);}
  .section-pad{padding:110px 0;}
  .on-dark{background:#0A1628;}
  @media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important;}}

  /* PAGE HERO */
  .page-hero{padding:180px 0 90px;background:linear-gradient(180deg,rgba(10,22,40,0.9) 0%,#0A1628 100%),linear-gradient(135deg,#0A1628 0%,#10203A 55%,#16283F 100%);position:relative;overflow:hidden;}
  .page-hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(139,149,161,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(139,149,161,0.06) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(180deg,rgba(0,0,0,0.5),transparent 80%);}
  .flare-glow{position:absolute;right:8%;top:10%;width:360px;height:360px;background:radial-gradient(circle,rgba(232,135,58,0.28) 0%,transparent 70%);filter:blur(12px);animation:flarePulse 6s ease-in-out infinite;}
  @keyframes flarePulse{0%,100%{opacity:.5;transform:scale(1);}50%{opacity:.85;transform:scale(1.06);}}
  .page-hero-inner{position:relative;z-index:2;max-width:760px;}
  .page-hero h1{font-size:clamp(34px,4.6vw,56px);color:#fff;line-height:1.08;margin-bottom:20px;font-family:'Space Grotesk',sans-serif;}
  .page-hero p{font-size:17px;color:rgba(247,245,240,0.68);max-width:600px;font-family:'Inter',sans-serif;}
  .breadcrumb{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8B95A1;margin-bottom:22px;letter-spacing:0.04em;}
  .breadcrumb a{color:#E8873A;text-decoration:none;}

  /* OVERVIEW */
  .overview-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
  .overview-img{position:relative;}
  .overview-img img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;}
  .overview-img .img-badge{position:absolute;bottom:0;left:0;right:0;background:rgba(10,22,40,0.88);backdrop-filter:blur(8px);padding:20px 24px;border-top:2px solid #E8873A;}
  .overview-img .img-badge .num{font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:700;color:#E8873A;line-height:1;}
  .overview-img .img-badge .lbl{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B95A1;letter-spacing:0.06em;text-transform:uppercase;margin-top:4px;}
  .overview-img .corner{position:absolute;width:20px;height:20px;border-color:#E8873A;}
  .overview-img .corner.tl{top:-1px;left:-1px;border-top:2px solid;border-left:2px solid;}
  .overview-img .corner.br{bottom:-1px;right:-1px;border-bottom:2px solid;border-right:2px solid;}

  /* CEO */
  .ceo-grid{display:grid;grid-template-columns:0.7fr 1.3fr;gap:70px;align-items:start;}
  .ceo-photo{position:relative;}
  .ceo-photo img{width:100%;aspect-ratio:3/4;object-fit:cover;object-position:top;display:block;}
  .ceo-photo .ceo-tag{position:absolute;bottom:0;left:0;right:0;background:rgba(10,22,40,0.9);padding:18px 20px;border-top:2px solid #E8873A;}
  .ceo-photo .ceo-tag strong{display:block;color:#fff;font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:600;}
  .ceo-photo .ceo-tag span{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#E8873A;letter-spacing:0.06em;text-transform:uppercase;}
  .ceo-quote{font-family:'Space Grotesk',sans-serif;font-size:clamp(18px,2vw,22px);color:#fff;line-height:1.5;font-weight:500;font-style:italic;margin-bottom:20px;padding-left:24px;border-left:3px solid #E8873A;}

  /* VALUES */
  .values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(247,245,240,0.1);border:1px solid rgba(247,245,240,0.1);}
  .value-card{background:#0A1628;padding:40px 32px;}
  .value-card .v-num{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#E8873A;letter-spacing:0.1em;margin-bottom:16px;}
  .value-card h4{color:#fff;font-family:'Space Grotesk',sans-serif;font-size:17px;margin-bottom:10px;}
  .value-card p{color:rgba(247,245,240,0.62);font-size:14px;line-height:1.6;font-family:'Inter',sans-serif;}

  /* TEAM */
  .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
  .team-card{border:1px solid rgba(10,22,40,0.1);overflow:hidden;background:#fff;}
  .team-card img{width:100%;aspect-ratio:3/3.5;object-fit:cover;object-position:top;display:block;}
  .team-card .team-info{padding:18px 20px 22px;border-top:2px solid #E8873A;}
  .team-card .team-info strong{display:block;font-family:'Space Grotesk',sans-serif;font-size:15px;color:#0A1628;margin-bottom:4px;}
  .team-card .team-info span{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B95A1;letter-spacing:0.05em;text-transform:uppercase;}

  /* MILESTONES */
  .milestones{display:flex;flex-direction:column;gap:0;}
  .milestone-row{display:grid;grid-template-columns:140px 1fr;gap:40px;padding:32px 0;border-bottom:1px solid rgba(10,22,40,0.1);align-items:start;}
  .milestone-row:first-child{border-top:1px solid rgba(10,22,40,0.1);}
  .milestone-year{font-family:'IBM Plex Mono',monospace;font-size:28px;color:#E8873A;font-weight:500;}
  .milestone-body h4{font-family:'Space Grotesk',sans-serif;font-size:18px;color:#0A1628;margin-bottom:6px;}
  .milestone-body p{font-family:'Inter',sans-serif;font-size:14px;color:#4A5568;line-height:1.6;}

  /* GALLERY STRIP */
  .gallery-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;}
  .gallery-strip .g-item{aspect-ratio:3/2;overflow:hidden;position:relative;}
  .gallery-strip .g-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
  .gallery-strip .g-item:hover img{transform:scale(1.06);}

  /* CTA BAND */
  .cta-band{background:linear-gradient(120deg,#0A1628,#16283F);padding:80px 0;position:relative;overflow:hidden;}
  .cta-band::before{content:"";position:absolute;right:-8%;top:-30%;width:340px;height:340px;background:radial-gradient(circle,rgba(232,135,58,0.25),transparent 70%);}
  .cta-inner{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;}
  .cta-inner h2{color:#fff;font-size:clamp(24px,3vw,34px);max-width:520px;font-family:'Space Grotesk',sans-serif;}
  .cta-inner p{color:rgba(247,245,240,0.65);margin-top:10px;max-width:480px;font-family:'Inter',sans-serif;}

  /* FOOTER */
  footer.site-footer{background:#0A1628;padding:70px 0 30px;}
  .footer-grid{display:grid;grid-template-columns:1.4fr repeat(4,1fr);gap:40px;padding-bottom:48px;border-bottom:1px solid rgba(247,245,240,0.14);}
  .footer-brand p{color:#8B95A1;font-size:14px;margin:18px 0 22px;max-width:280px;font-family:'Inter',sans-serif;}
  .footer-col h5{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:#E8873A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:20px;}
  .footer-col a{display:block;color:rgba(247,245,240,0.62);font-size:14px;margin-bottom:12px;transition:color .2s ease;text-decoration:none;font-family:'Inter',sans-serif;}
  .footer-col a:hover{color:#fff;}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:26px;flex-wrap:wrap;gap:16px;}
  .footer-bottom p{font-size:12.5px;color:#8B95A1;font-family:'IBM Plex Mono',monospace;}
  .social-row{display:flex;gap:16px;}
  .social-row a{width:34px;height:34px;border:1px solid rgba(247,245,240,0.14);display:flex;align-items:center;justify-content:center;color:#8B95A1;font-size:13px;transition:all .2s ease;text-decoration:none;font-family:'IBM Plex Mono',monospace;}
  .social-row a:hover{border-color:#E8873A;color:#E8873A;}

  @media (max-width:1080px){
    .overview-grid,.ceo-grid{grid-template-columns:1fr;}
    .values-grid{grid-template-columns:repeat(2,1fr);}
    .team-grid{grid-template-columns:repeat(2,1fr);}
    .footer-grid{grid-template-columns:repeat(3,1fr);}
    .gallery-strip{grid-template-columns:repeat(2,1fr);}
  }
  @media (max-width:760px){
    .values-grid,.team-grid{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:repeat(2,1fr);}
    .milestone-row{grid-template-columns:80px 1fr;gap:20px;}
    .container{padding:0 20px;}
    .section-pad{padding:72px 0;}
    .gallery-strip{grid-template-columns:repeat(2,1fr);}
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



function PageHero() {
    return (
        <section className="page-hero">
            <div className="flare-glow" aria-hidden="true" />
            <div className="container page-hero-inner">
                <div className="breadcrumb"><a href="/">Home</a> / About</div>
                <div className="eyebrow">Who We Are</div>
                <h1>An indigenous engineering house built for the Niger Delta.</h1>
                <p>Incorporated in 1990, ANBE Nigeria Limited has spent 36 years delivering pipeline construction, fabrication engineering, and flare system design to operators across Nigeria's oil &amp; gas sector.</p>
            </div>
        </section>
    );
}

function Overview() {
    return (
        <section className="section-pad" style={{ background: "#F7F5F0" }}>
            <div className="container overview-grid">
                <div className="reveal overview-img">
                    <span className="corner tl" aria-hidden="true" />
                    <span className="corner br" aria-hidden="true" />
                    <img src="/industrial-2.jpg" alt="ANBE field operations" />
                    <div className="img-badge">
                        <div className="num">36</div>
                        <div className="lbl">Years in the Field</div>
                    </div>
                </div>
                <div className="reveal">
                    <div className="eyebrow">About ANBE</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1, color: "#0A1628", marginBottom: 24 }}>Engineering excellence delivered by Nigerian hands.</h2>
                    <p style={{ fontSize: 16, color: "#4A5568", lineHeight: 1.7, marginBottom: 20 }}>ANBE Nigeria Limited provides pipeline construction, fabrication engineering, and flare system design to operators across Nigeria's oil &amp; gas sector. Our fabrication and maintenance facility, combined with a technical team drawn from combustion engineering and equipment maintenance disciplines, lets us take a project from design through procurement to commissioning without handing it off.</p>
                    <p style={{ fontSize: 16, color: "#4A5568", lineHeight: 1.7, marginBottom: 36 }}>We are 100% indigenous-owned and operate out of Port Harcourt with a field response capability that runs around the clock. Every scope is planned, permitted, and closed out against a documented HSE standard — because Nigeria's oil &amp; gas sector demands nothing less.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                        {[["36+", "Years in Operation"], ["140+", "Projects Completed"], ["60+", "Engineers & Technicians"], ["0", "Lost-Time Incidents YTD"]].map(([n, l]) => (
                            <div key={l} style={{ paddingLeft: 18, borderLeft: "2px solid #E8873A" }}>
                                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: "#0A1628", lineHeight: 1 }}>{n}</div>
                                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#8B95A1", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 5 }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CeoSection() {
    return (
        <section className="section-pad on-dark">
            <div className="container ceo-grid">
                <div className="reveal ceo-photo">
                    <img src="/ceo.png" alt="Ernest Azukaeme — CEO" />
                    <div className="ceo-tag">
                        <strong>Ernest Azukaeme</strong>
                        <span>Chief Executive Officer</span>
                    </div>
                </div>
                <div className="reveal">
                    <div className="eyebrow">Leadership</div>
                    <h2 style={{ fontSize: "clamp(26px,3vw,38px)", color: "#fff", marginBottom: 32, lineHeight: 1.15 }}>Message from our Chief Executive Officer</h2>
                    <p className="ceo-quote">"At ANBE Nigeria, we are driven by a passion for excellence and a commitment to delivering innovative engineering solutions that power Nigeria's energy sector."</p>
                    <p style={{ color: "rgba(247,245,240,0.68)", fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontFamily: "'Inter',sans-serif" }}>Our success is built on the dedication of our talented team and the trust of our valued clients. We continue to invest in cutting-edge technology, professional development, and safety protocols to ensure we remain at the forefront of the industry.</p>
                    <p style={{ color: "rgba(247,245,240,0.68)", fontSize: 15, lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>What we have built over 36 years is more than a company — it is proof that indigenous engineering talent can meet the highest international standards, right here in Nigeria.</p>
                    <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(247,245,240,0.14)" }}>
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>Ernest Azukaeme</div>
                        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#E8873A", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>CEO, ANBE Nigeria Limited</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CoreValues() {
    const values = [
        { n: "01", title: "Mission", desc: "Deliver engineering solutions of international standard, executed by Nigerian talent, from wellhead to flare tip." },
        { n: "02", title: "Vision", desc: "Become a leading Pipeline, Engineering & Construction company across West Africa, setting the benchmark for indigenous technical excellence." },
        { n: "03", title: "Safety First", desc: "Uncompromising commitment to safety in all operations — every scope is planned and permitted against a documented HSE standard." },
        { n: "04", title: "Quality Excellence", desc: "Delivering superior quality in every project, backed by real project data and international benchmarks." },
        { n: "05", title: "Integrity", desc: "Operating with honesty and transparency — our budgets and schedules are backed by facts, not estimates alone." },
        { n: "06", title: "Accountability", desc: "Taking full responsibility for our commitments — from first mobilisation to final close-out documentation." },
    ];
    return (
        <section className="section-pad" style={{ background: "#F7F5F0" }}>
            <div className="container">
                <div className="reveal" style={{ maxWidth: 640, marginBottom: 56 }}>
                    <div className="eyebrow">Our Values</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1, color: "#0A1628" }}>The principles we operate by.</h2>
                    <p style={{ color: "#4A5568", fontSize: 16, marginTop: 16 }}>Every project scope, safety plan, and client relationship is shaped by these six commitments.</p>
                </div>
                <div className="values-grid reveal">
                    {values.map((v) => (
                        <div key={v.n} className="value-card">
                            <div className="v-num">{v.n} —</div>
                            <h4>{v.title}</h4>
                            <p>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TeamSection() {
    const team = [
        { name: "Ernest Azukaeme", role: "Chief Executive Officer", img: "/ceo.png" },
        { name: "Field Engineer", role: "Pipeline Division", img: "/industrial-3.jpg" },
        { name: "Workshop Team", role: "Fabrication Unit", img: "/industrial-6.jpg" },
        { name: "HSE Officer", role: "Site Safety", img: "/industrial-8.jpg" },
    ];
    return (
        <section className="section-pad on-dark">
            <div className="container">
                <div className="reveal" style={{ maxWidth: 640, marginBottom: 56 }}>
                    <div className="eyebrow">Our People</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1, color: "#fff" }}>The team behind the delivery.</h2>
                    <p style={{ color: "rgba(247,245,240,0.68)", fontSize: 16, marginTop: 16 }}>60+ engineers and technicians across design, construction, fabrication, and HSE disciplines.</p>
                </div>
                <div className="team-grid reveal">
                    {team.map((t) => (
                        <div key={t.name} className="team-card">
                            <img src={t.img} alt={t.name} />
                            <div className="team-info">
                                <strong>{t.name}</strong>
                                <span>{t.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MilestonesSection() {
    const items = [
        { year: "1990", title: "Company Founded", desc: "ANBE Nigeria Limited incorporated in Port Harcourt with a mandate to deliver indigenous engineering solutions to the oil & gas sector." },
        { year: "1998", title: "First Major Pipeline Contract", desc: "Awarded first large-scale trunkline construction contract in the Niger Delta, establishing ANBE's field construction capability." },
        { year: "2005", title: "Fabrication Facility Established", desc: "Opened ANBE's in-house fabrication workshop in Port Harcourt, enabling end-to-end delivery without third-party sub-contracting." },
        { year: "2012", title: "Flare & Ignition Division", desc: "Expanded into specialist smokeless flare design and tropicalised remote ignition system installation." },
        { year: "2019", title: "100+ Projects Milestone", desc: "Surpassed 100 completed project scopes across pipeline, flare systems, and fabrication — all with a clean safety record." },
        { year: "2026", title: "36 Years & Counting", desc: "Continuing to deliver pipeline integrity, flare engineering, and fabrication services with zero lost-time incidents year to date." },
    ];
    return (
        <section className="section-pad" style={{ background: "#F7F5F0" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
                    <div className="reveal">
                        <div className="eyebrow">Our History</div>
                        <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1, color: "#0A1628", marginBottom: 16 }}>36 years of delivery in the Niger Delta.</h2>
                        <p style={{ fontSize: 16, color: "#4A5568", lineHeight: 1.7, marginBottom: 36 }}>From a small start in 1990 to over 140 completed scopes across Nigeria, every milestone reflects the same commitment — well-planned, safely executed, and properly closed out.</p>
                        <img src="/group.jpg" alt="ANBE team" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block", borderTop: "2px solid #E8873A" }} />
                    </div>
                    <div className="reveal milestones">
                        {items.map((m) => (
                            <div key={m.year} className="milestone-row">
                                <div className="milestone-year">{m.year}</div>
                                <div className="milestone-body"><h4>{m.title}</h4><p>{m.desc}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function GalleryStrip() {
    return (
        <div className="gallery-strip reveal">
            {["/industrial-1.jpg", "/industrial-4.jpg", "/industrial-7.jpg", "/industrial-10.jpg"].map((src, i) => (
                <div key={i} className="g-item"><img src={src} alt={`ANBE project ${i + 1}`} /></div>
            ))}
        </div>
    );
}

function CtaBand() {
    return (
        <section className="cta-band">
            <div className="container cta-inner">
                <div>
                    <h2>Ready to work with Nigeria's leading indigenous EPC partner?</h2>
                    <p>Send us your project details and we'll respond within one business day.</p>
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
                        <a href="/" className="logo"><img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" style={{ height: 34, width: "auto", display: "block" }} /></a>
                        <p>An indigenous engineering company delivering pipeline construction, fabrication, and flare systems to Nigeria's oil &amp; gas sector since 1990.</p>
                    </div>
                    <div className="footer-col"><h5>Company</h5>
                        <a href="/about" className="active">About Us</a><a href="/contact">Careers</a><a href="/contact">Contact</a>
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
                        <a href="/projects">Projects</a><a href="/about" className="active">Sustainability</a><a href="/contact">Insights</a>
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

export default function AboutPage() {
    useReveal();
    return (
        <>
            <style>{S}</style>
            <SiteNav activePath="/about" />
            <main>
                <PageHero />
                <Overview />
                <CeoSection />
                <CoreValues />
                <TeamSection />
                <MilestonesSection />
                <GalleryStrip />
                <CtaBand />
            </main>
            <Footer />
        </>
    );
}
