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
  p,li,a,label,input,textarea,select,button{font-family:'Inter',sans-serif;}
  .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#E8873A;display:flex;align-items:center;gap:10px;margin-bottom:18px;}
  .eyebrow::before{content:"";width:28px;height:1px;background:#E8873A;flex-shrink:0;}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.in{opacity:1;transform:translateY(0);}
  .section-pad{padding:110px 0;}
  @media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important;}}

  /* PAGE HERO */
  .page-hero{padding:180px 0 90px;background:linear-gradient(180deg,rgba(10,22,40,0.9) 0%,#0A1628 100%),linear-gradient(135deg,#0A1628 0%,#10203A 55%,#16283F 100%);position:relative;overflow:hidden;}
  .page-hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(139,149,161,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(139,149,161,0.06) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(180deg,rgba(0,0,0,0.5),transparent 80%);}
  .flare-glow{position:absolute;right:8%;top:10%;width:360px;height:360px;background:radial-gradient(circle,rgba(232,135,58,0.28) 0%,transparent 70%);filter:blur(12px);animation:flarePulse 6s ease-in-out infinite;}
  @keyframes flarePulse{0%,100%{opacity:.5;transform:scale(1);}50%{opacity:.85;transform:scale(1.06);}}
  .page-hero-inner{position:relative;z-index:2;max-width:760px;}
  .page-hero h1{font-size:clamp(34px,4.6vw,56px);color:#fff;line-height:1.08;margin-bottom:20px;}
  .page-hero p{font-size:17px;color:rgba(247,245,240,0.68);max-width:600px;}
  .breadcrumb{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8B95A1;margin-bottom:22px;letter-spacing:0.04em;}
  .breadcrumb a{color:#E8873A;text-decoration:none;}

  /* CONTACT BODY */
  .contact-grid{display:grid;grid-template-columns:0.85fr 1.15fr;gap:70px;align-items:start;}
  .contact-info .item{border-top:1px solid rgba(10,22,40,0.1);padding:22px 0;}
  .contact-info .item:first-child{border-top:none;padding-top:0;}
  .contact-info .item .lbl{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#E8873A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;}
  .contact-info .item .val{font-size:16px;color:#0A1628;font-weight:500;}
  .contact-info .item .val small{display:block;font-size:13px;color:#4A5568;font-weight:400;margin-top:4px;}
  .office-img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;margin-top:28px;border-top:2px solid #E8873A;}
  .map-box{aspect-ratio:16/9;background:#EEEAE0;border:1px solid rgba(10,22,40,0.1);margin-top:26px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
  .map-box .grid-overlay{position:absolute;inset:0;background-image:linear-gradient(rgba(10,22,40,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.06) 1px,transparent 1px);background-size:34px 34px;}
  .map-box span{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#4A5568;letter-spacing:0.06em;position:relative;z-index:2;}

  /* FORM */
  form.contact-form{display:flex;flex-direction:column;gap:20px;}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  .field label{display:block;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#4A5568;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;}
  .field input,.field textarea,.field select{width:100%;border:1px solid rgba(10,22,40,0.12);background:#fff;padding:13px 14px;font-family:'Inter',sans-serif;font-size:14.5px;color:#12181F;border-radius:2px;transition:border-color .2s ease;outline:none;}
  .field input:focus,.field textarea:focus,.field select:focus{border-color:#E8873A;}
  .field textarea{resize:vertical;min-height:130px;}
  .btn-submit{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;font-size:14px;font-weight:600;letter-spacing:0.02em;border-radius:2px;transition:all .25s ease;background:#E8873A;color:#0A1628;border:none;cursor:pointer;align-self:flex-start;}
  .btn-submit:hover{background:#F0A669;transform:translateY(-1px);}
  .btn-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none;}
  .form-success{font-size:13px;color:#E8873A;font-family:'IBM Plex Mono',monospace;letter-spacing:0.04em;}

  /* TEAM STRIP */
  .team-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px;}
  .team-card{border:1px solid rgba(10,22,40,0.1);overflow:hidden;background:#fff;}
  .team-card img{width:100%;aspect-ratio:3/2.5;object-fit:cover;object-position:top;display:block;}
  .team-card .tc-info{padding:16px 18px 20px;border-top:2px solid #E8873A;}
  .team-card .tc-info strong{display:block;font-family:'Space Grotesk',sans-serif;font-size:15px;color:#0A1628;margin-bottom:3px;}
  .team-card .tc-info span{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#8B95A1;letter-spacing:0.05em;text-transform:uppercase;}

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
    .contact-grid{grid-template-columns:1fr;}
    .team-strip{grid-template-columns:repeat(2,1fr);}
    .footer-grid{grid-template-columns:repeat(3,1fr);}
  }
  @media (max-width:760px){
    .main-links,.nav-cta{display:none!important;}
    .nav-toggle{display:block!important;}
    .form-row{grid-template-columns:1fr;}
    .team-strip{grid-template-columns:1fr;}
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
            <a href="/services">Services</a>
            <a href="/projects">Projects</a>
            <a href="/blog">Blog</a>
          </nav>
                <a href="/contact" className="nav-cta">Contact Us</a>
                <button className="nav-toggle" onClick={() => setMob(!mob)} aria-label="Toggle menu">☰</button>
            </div>
            {mob && (
                <div style={{ position: "fixed", top: 64, left: 0, right: 0, background: "rgba(10,22,40,0.98)", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 18, zIndex: 999 }}>
                    {[["/about","About"],["/services","Services"],["/projects","Projects"],["/blog","Blog"],["/contact","Contact Us"]].map(([h, l]) => (
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
                <div className="breadcrumb"><a href="/">Home</a> / Contact</div>
                <div className="eyebrow">Get in Touch</div>
                <h1>Talk to us about your next scope.</h1>
                <p>Our engineering team is available 24/7 for field response. For project discussions, we respond to all enquiries within one business day.</p>
            </div>
        </section>
    );
}

function ContactBody() {
    const [status, setStatus] = useState("");
    const [sending, setSending] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => { setSending(false); setStatus("Thank you — we'll respond within one business day."); }, 1000);
    };
    return (
        <section className="section-pad" style={{ background: "#F7F5F0" }}>
            <div className="container">
                <div className="contact-grid reveal">
                    {/* Left — info */}
                    <div className="contact-info">
                        <div className="item">
                            <div className="lbl">Head Office</div>
                            <div className="val">Port Harcourt, Rivers State<small>Nigeria</small></div>
                        </div>
                        <div className="item">
                            <div className="lbl">Phone</div>
                            <div className="val">+234 803 310 0539<small>+234 803 775 3444</small></div>
                        </div>
                        <div className="item">
                            <div className="lbl">Email</div>
                            <div className="val">info@anbenig.com</div>
                        </div>
                        <div className="item">
                            <div className="lbl">Business Hours</div>
                            <div className="val">24/7 Field Response<small>Office: Mon–Fri, 8am–5pm WAT</small></div>
                        </div>
                        <img className="office-img" src="/contact.jpg" alt="ANBE Port Harcourt office" />
                        <div className="map-box" style={{ marginTop: 16 }}>
                            <div className="grid-overlay" />
                            <span>MAP — PORT HARCOURT, RIVERS STATE</span>
                        </div>
                    </div>

                    {/* Right — form */}
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="field"><label htmlFor="fname">Full Name</label><input id="fname" type="text" required /></div>
                            <div className="field"><label htmlFor="fcompany">Company</label><input id="fcompany" type="text" /></div>
                        </div>
                        <div className="form-row">
                            <div className="field"><label htmlFor="femail">Email</label><input id="femail" type="email" required /></div>
                            <div className="field"><label htmlFor="fphone">Phone</label><input id="fphone" type="tel" /></div>
                        </div>
                        <div className="field">
                            <label htmlFor="fscope">Scope of Interest</label>
                            <select id="fscope">
                                <option>Pipeline Construction</option>
                                <option>Flare &amp; Ignition Systems</option>
                                <option>Fabrication</option>
                                <option>Procurement</option>
                                <option>Equipment Maintenance</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="field"><label htmlFor="fmessage">Message</label><textarea id="fmessage" required /></div>
                        <button type="submit" className="btn-submit" disabled={sending}>
                            {sending ? "Sending…" : "Send Message →"}
                        </button>
                        {status && <p className="form-success">✓ {status}</p>}
                    </form>
                </div>

                {/* Team strip */}
                <div className="reveal" style={{ marginTop: 80 }}>
                    <div className="eyebrow">Who You'll Speak To</div>
                    <h2 style={{ fontSize: "clamp(24px,2.8vw,34px)", color: "#0A1628", marginBottom: 32, lineHeight: 1.1 }}>Our team handles every enquiry directly.</h2>
                    <div className="team-strip">
                        {[
                            { name: "Ernest Azukaeme", role: "Chief Executive Officer", img: "/ceo.png" },
                            { name: "Engineering Team", role: "Project Scoping & Design", img: "/industrial-3.jpg" },
                            { name: "Field Operations", role: "Site Mobilisation & Construction", img: "/industrial-8.jpg" },
                        ].map((t) => (
                            <div key={t.name} className="team-card">
                                <img src={t.img} alt={t.name} />
                                <div className="tc-info">
                                    <strong>{t.name}</strong>
                                    <span>{t.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
                        <a href="/services">Manufacturing</a>
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

export default function ContactPage() {
    useReveal();
    return (
        <>
            <style>{S}</style>
            <SiteNav />
            <main>
                <PageHero />
                <ContactBody />
            </main>
            <Footer />
        </>
    );
}
