"use client";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useEffect, useState } from "react";

const S = `
  *{box-sizing:border-box;}
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
  .page-hero-inner{position:relative;z-index:2;max-width:920px;}
  .page-hero h1{font-size:clamp(34px,4.6vw,56px);color:#fff;line-height:1.08;margin-bottom:20px;}
  .page-hero p{font-size:17px;color:rgba(247,245,240,0.68);max-width:760px;}
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

  @media (max-width:1080px){
    .contact-grid{grid-template-columns:1fr;}
    .team-strip{grid-template-columns:repeat(2,1fr);}
  }
  @media (max-width:920px){
    .form-row{grid-template-columns:1fr;}
    .team-strip{grid-template-columns:1fr;}
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
        setTimeout(() => { setSending(false); setStatus("Thank you, we'll respond within one business day."); }, 1000);
    };
    return (
        <section className="section-pad" style={{ background: "#F7F5F0" }}>
            <div className="container">
                <div className="contact-grid reveal">
                    {/* Left, info */}
                    <div className="contact-info">
                        <div className="item">
                            <div className="lbl">Head Office</div>
                            <div className="val">No. 245, Aba Road, Rumuogba Layout, Port Harcourt, Rivers State<small>Nigeria</small></div>
                        </div>
                        <div className="item">
                            <div className="lbl">Phone</div>
                            <div className="val">08033100539<small>08037753444</small></div>
                        </div>
                        <div className="item">
                            <div className="lbl">Email</div>
                            <div className="val">info@anbenigeria.com</div>
                        </div>
                        <div className="item">
                            <div className="lbl">Business Hours</div>
                            <div className="val">24/7 Field Response<small>Office: Mon–Fri, 8am–5pm WAT</small></div>
                        </div>
                        <img className="office-img" src="/contact.jpg" alt="ANBE Port Harcourt office" />
                        <div className="map-box" style={{ marginTop: 16 }}>
                            <div className="grid-overlay" />
                            <span>MAP, No. 245, Aba Road, Rumuogba Layout, Port Harcourt, Rivers State</span>
                        </div>
                    </div>

                    {/* Right, form */}
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
            <SiteFooter />
        </>
    );
}
