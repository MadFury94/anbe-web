"use client";
import { useEffect, useState } from "react";
import { blogPosts } from "../../src/data/blog";

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
  .section-pad{padding:110px 0;}
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

  /* BLOG GRID */
  .blog-section{padding:90px 0 110px;}
  .blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;}
  .blog-card{border:1px solid rgba(10,22,40,0.12);background:#fff;overflow:hidden;transition:box-shadow .3s ease,transform .3s ease;display:flex;flex-direction:column;text-decoration:none;}
  .blog-card:hover{box-shadow:0 24px 48px -20px rgba(10,22,40,0.22);transform:translateY(-4px);}
  .blog-card-img{aspect-ratio:16/10;overflow:hidden;position:relative;background:#16283F;}
  .blog-card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
  .blog-card:hover .blog-card-img img{transform:scale(1.05);}
  .blog-card-body{padding:26px 26px 28px;display:flex;flex-direction:column;flex:1;}
  .blog-meta{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
  .blog-category{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#fff;background:#E8873A;padding:3px 9px;}
  .blog-date{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B95A1;letter-spacing:0.04em;}
  .blog-card-body h3{font-size:18px;color:#0A1628;margin-bottom:10px;font-family:'Space Grotesk',sans-serif;line-height:1.25;}
  .blog-card-body p{font-size:14px;color:#4A5568;line-height:1.65;flex:1;margin-bottom:18px;font-family:'Inter',sans-serif;}
  .blog-card-link{font-size:13px;font-weight:600;color:#0A1628;font-family:'Inter',sans-serif;display:inline-flex;align-items:center;gap:6px;transition:gap .2s ease;}
  .blog-card:hover .blog-card-link{gap:10px;}

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
    .blog-grid{grid-template-columns:repeat(2,1fr);}
    .footer-grid{grid-template-columns:repeat(3,1fr);}
  }
  @media (max-width:760px){
    .main-links,.nav-cta{display:none!important;}
    .nav-toggle{display:block!important;}
    .blog-grid{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:repeat(2,1fr);}
    .container{padding:0 20px;}
    .section-pad{padding:72px 0;}
    .blog-section{padding:60px 0 80px;}
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
          <a href="/blog" className="active">Blog</a>
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
        <div className="breadcrumb"><a href="/">Home</a> / Blog</div>
        <div className="eyebrow">News &amp; Insights</div>
        <h1>From the Field and the Workshop</h1>
        <p>Engineering perspectives, project updates, and industry analysis from ANBE Nigeria Limited's technical team.</p>
      </div>
    </section>
  );
}

function BlogGrid() {
  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-grid reveal">
          {blogPosts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-img">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-card-body">
                <div className="blog-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date} · {post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="blog-card-link">Read More →</span>
              </div>
            </a>
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
            <a href="/about">About Us</a><a href="/contact">Careers</a><a href="/blog">Blog</a><a href="/contact">Contact</a>
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
            <a href="/projects">Projects</a><a href="/about">Sustainability</a><a href="/blog">Insights</a>
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

export default function BlogPage() {
  useReveal();
  return (
    <>
      <style>{S}</style>
      <SiteNav />
      <main>
        <PageHero />
        <BlogGrid />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
