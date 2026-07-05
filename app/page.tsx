"use client";
import { useEffect, useState } from "react";

/* ── Helpers ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounters() {
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.count || "0", 10);
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTestimonials(total: number) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);
  return { active, setActive };
}

/* ── Shared CSS injected once ── */
const STYLES = `
  .site-nav { position:fixed;top:0;left:0;right:0;z-index:1000;padding:22px 0;transition:all .4s cubic-bezier(.4,0,.2,1);border-bottom:1px solid transparent; }
  .site-nav.scrolled { background:rgba(10,22,40,0.94);backdrop-filter:blur(10px);padding:14px 0;border-bottom:1px solid rgba(247,245,240,0.14); }
  .nav-inner { display:flex;align-items:center;justify-content:space-between; }
  .logo { font-family:var(--font-space);font-weight:700;font-size:20px;color:#fff;letter-spacing:0.02em;display:flex;align-items:center;gap:10px; }
  .logo .mark { width:12px;height:12px;background:var(--amber);clip-path:polygon(50% 0%,100% 100%,0% 100%);display:inline-block; }
  .logo span.sub { font-family:var(--font-ibm);font-size:10px;color:var(--steel);letter-spacing:0.1em;font-weight:400;display:block; }
  .main-links { display:flex;gap:34px; }
  .main-links a { font-size:14px;color:rgba(255,255,255,0.82);font-weight:500;position:relative;padding:4px 0; }
  .main-links a::after { content:"";position:absolute;left:0;bottom:0;width:0;height:1px;background:var(--amber);transition:width .3s ease; }
  .main-links a:hover::after,.main-links a.active::after { width:100%; }
  .nav-cta { font-size:13px;font-weight:600;color:var(--navy);background:var(--amber);padding:11px 22px;border-radius:2px;letter-spacing:0.02em;transition:background .25s ease; }
  .nav-cta:hover { background:var(--amber-soft); }
  .nav-toggle { display:none;background:none;border:none;color:#fff;font-size:22px;cursor:pointer; }
  .hero { min-height:100vh;display:flex;align-items:center;background:linear-gradient(180deg,rgba(10,22,40,0.82) 0%,rgba(10,22,40,0.94) 60%,#0A1628 100%),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(232,135,58,0.05) 80px),linear-gradient(135deg,#0A1628 0%,#10203A 55%,#16283F 100%);position:relative;overflow:hidden;padding-top:120px;padding-bottom:80px; }
  .hero::before { content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(139,149,161,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(139,149,161,0.06) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(180deg,rgba(0,0,0,0.6),transparent 75%); }
  .flare-glow { position:absolute;right:6%;top:18%;width:420px;height:420px;background:radial-gradient(circle,rgba(232,135,58,0.35) 0%,rgba(180,80,42,0.12) 45%,transparent 70%);filter:blur(10px);animation:flarePulse 6s ease-in-out infinite; }
  @keyframes flarePulse { 0%,100%{opacity:0.55;transform:scale(1);}50%{opacity:0.9;transform:scale(1.08);} }
  .hero-grid { display:grid;grid-template-columns:1.15fr 0.85fr;gap:60px;align-items:center;position:relative;z-index:2; }
  .hero h1 { font-size:clamp(38px,5.2vw,68px);color:#fff;line-height:1.05;letter-spacing:-0.02em;margin-bottom:24px; }
  .hero h1 em { font-style:normal;color:var(--amber); }
  .hero p.lead { font-size:18px;color:rgba(255,255,255,0.72);max-width:520px;margin-bottom:36px;font-weight:400; }
  .hero-actions { display:flex;gap:16px;flex-wrap:wrap;margin-bottom:56px; }
  .btn { display:inline-flex;align-items:center;gap:10px;padding:15px 28px;font-size:14px;font-weight:600;letter-spacing:0.02em;border-radius:2px;transition:all .25s ease; }
  .btn-primary { background:var(--amber);color:var(--navy); }
  .btn-primary:hover { background:var(--amber-soft);transform:translateY(-1px); }
  .btn-ghost { border:1px solid rgba(255,255,255,0.3);color:#fff; }
  .btn-ghost:hover { border-color:var(--amber);color:var(--amber); }
  .btn-dark { border:1px solid var(--line);color:var(--navy); }
  .btn-dark:hover { border-color:var(--navy);background:var(--navy);color:#fff; }
  .hero-meta { display:flex;gap:44px;border-top:1px solid rgba(247,245,240,0.14);padding-top:26px; }
  .hero-meta div { display:flex;flex-direction:column;gap:4px; }
  .hero-meta .num { font-family:var(--font-space);font-size:26px;color:#fff;font-weight:600; }
  .hero-meta .lbl { font-family:var(--font-ibm);font-size:11px;color:var(--steel);letter-spacing:0.06em;text-transform:uppercase; }
  .hero-schematic { position:relative;aspect-ratio:1/1.05;border:1px solid rgba(247,245,240,0.14);background:linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01)); }
  .hero-schematic svg { width:100%;height:100%; }
  .corner { position:absolute;width:18px;height:18px;border-color:var(--amber); }
  .corner.tl { top:-1px;left:-1px;border-top:2px solid;border-left:2px solid; }
  .corner.br { bottom:-1px;right:-1px;border-bottom:2px solid;border-right:2px solid; }
`;

const STYLES2 = `
  .section-head { max-width:640px;margin-bottom:56px; }
  .section-head h2 { font-size:clamp(28px,3.4vw,42px);line-height:1.1; }
  .section-head p { color:var(--steel-dark);font-size:16px;margin-top:16px;max-width:560px; }
  .section-pad { padding:110px 0; }
  .on-dark { background:var(--navy);color:var(--paper); }
  .on-dark h2,.on-dark h3,.on-dark h4 { color:#fff; }
  .on-dark p { color:rgba(247,245,240,0.68); }
  .container { max-width:1240px;margin:0 auto;padding:0 32px; }
    .partners-strip { background:#fff;padding:48px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);overflow:hidden; }
  .partners-label { font-family:var(--font-ibm);font-size:11px;color:var(--steel);letter-spacing:0.12em;text-transform:uppercase;text-align:center;margin-bottom:32px; }
  .partners-track-wrap { overflow:hidden;position:relative; }
  .partners-track-wrap::before,.partners-track-wrap::after { content:"";position:absolute;top:0;bottom:0;width:100px;z-index:2; }
  .partners-track-wrap::before { left:0;background:linear-gradient(to right,#fff,transparent); }
  .partners-track-wrap::after { right:0;background:linear-gradient(to left,#fff,transparent); }
  .partners-track { display:flex;gap:64px;align-items:center;width:max-content;animation:marquee 28s linear infinite; }
  .partners-track:hover { animation-play-state:paused; }
  @keyframes marquee { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
  .p-logo-box { width:130px;height:52px;flex-shrink:0;background-size:contain;background-repeat:no-repeat;background-position:center;filter:grayscale(1) opacity(0.45);transition:filter .3s ease; }
  .p-logo-box:hover { filter:grayscale(0) opacity(1); }
  .about-grid { display:grid;grid-template-columns:0.9fr 1.1fr;gap:70px;align-items:center; }
  .about-visual { aspect-ratio:4/5;background:linear-gradient(155deg,#16283F,#0A1628);position:relative;overflow:hidden;border:1px solid var(--line); }
  .about-visual .grid-overlay { position:absolute;inset:0;background-image:linear-gradient(rgba(232,135,58,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(232,135,58,0.12) 1px,transparent 1px);background-size:40px 40px; }
  .about-visual .badge { position:absolute;bottom:24px;left:24px;right:24px;border-top:1px solid rgba(247,245,240,0.14);padding-top:16px;font-family:var(--font-ibm);font-size:11px;color:var(--steel);letter-spacing:0.08em;text-transform:uppercase; }
  .about-visual .badge strong { display:block;color:#fff;font-family:var(--font-space);font-size:22px;font-weight:600;letter-spacing:0;margin-bottom:2px;text-transform:none; }
  .values-list { margin-top:36px;display:grid;grid-template-columns:1fr 1fr;gap:24px; }
  .values-list li { padding-left:20px;border-left:2px solid var(--amber); }
  .values-list li strong { display:block;font-family:var(--font-space);font-size:15px;color:var(--navy);margin-bottom:4px; }
  .values-list li span { font-size:14px;color:var(--steel-dark); }
  .stats-strip { background:var(--charcoal);padding:64px 0; }
  .stats-grid { display:grid;grid-template-columns:repeat(5,1fr);gap:20px; }
  .stat { border-left:1px solid rgba(247,245,240,0.14);padding-left:22px; }
  .stat:first-child { border-left:none;padding-left:0; }
  .stat .val { font-family:var(--font-space);font-size:clamp(28px,3vw,40px);color:#fff;font-weight:700;display:flex;align-items:baseline;gap:2px; }
  .stat .val .plus { color:var(--amber);font-size:0.6em; }
  .stat .lbl { font-family:var(--font-ibm);font-size:11px;color:var(--steel);letter-spacing:0.06em;text-transform:uppercase;margin-top:8px; }
  .services-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line); }
  .service-card { background:var(--paper);padding:40px 34px;transition:background .3s ease;position:relative; }
  .service-card:hover { background:#fff; }
  .service-card .idx { font-family:var(--font-ibm);font-size:12px;color:var(--amber);letter-spacing:0.08em; }
  .service-card .icon { margin:20px 0 22px;width:44px;height:44px; }
  .service-card h3 { font-size:19px;margin-bottom:12px; }
  .service-card p { font-size:14.5px;color:var(--steel-dark);margin-bottom:22px; }
  .service-card .learn { font-size:13px;font-weight:600;color:var(--navy);display:inline-flex;align-items:center;gap:8px; }
  .service-card .learn .arrow { transition:transform .25s ease; }
  .service-card:hover .learn .arrow { transform:translateX(4px); }
  .industries-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
  .industry-card { aspect-ratio:3/3.6;position:relative;overflow:hidden;background:linear-gradient(200deg,#16283F,#0A1628);display:flex;flex-direction:column;justify-content:flex-end;padding:24px;border:1px solid rgba(247,245,240,0.14); }
  .industry-card::before { content:"";position:absolute;inset:0;opacity:0.5;background-image:linear-gradient(rgba(232,135,58,0.08) 1px,transparent 1px);background-size:100% 22px; }
  .industry-card h4 { color:#fff;font-size:16px;position:relative;z-index:2; }
  .industry-card span.tag { font-family:var(--font-ibm);font-size:10.5px;color:var(--amber);letter-spacing:0.08em;text-transform:uppercase;position:relative;z-index:2;margin-bottom:8px;display:block; }
  .projects-preview { display:grid;grid-template-columns:repeat(3,1fr);gap:28px; }
  .proj-card { border:1px solid var(--line);background:#fff;overflow:hidden;transition:box-shadow .3s ease,transform .3s ease; }
  .proj-card:hover { box-shadow:0 24px 48px -20px rgba(10,22,40,0.25);transform:translateY(-4px); }
  .proj-thumb { aspect-ratio:16/10;background:linear-gradient(155deg,#16283F,#0A1628);position:relative;overflow:hidden; }
  .proj-thumb::after { content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:30px 30px; }
  .proj-thumb .zoom-tag { position:absolute;top:16px;left:16px;font-family:var(--font-ibm);font-size:10.5px;color:var(--amber);letter-spacing:0.08em;text-transform:uppercase;border:1px solid rgba(232,135,58,0.4);padding:4px 10px;z-index:2; }
  .proj-body { padding:26px 26px 28px; }
  .proj-body .client { font-family:var(--font-ibm);font-size:11.5px;color:var(--steel);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px; }
  .proj-body h3 { font-size:19px;margin-bottom:10px; }
  .proj-body p { font-size:14px;color:var(--steel-dark);margin-bottom:18px; }
  .proj-body .view { font-size:13px;font-weight:600;display:inline-flex;align-items:center;gap:8px;color:var(--navy); }
`;

const STYLES3 = `
  .why-grid { display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(247,245,240,0.14);border:1px solid rgba(247,245,240,0.14); }
  .why-item { padding:34px 32px;background:var(--navy); }
  .why-item h4 { color:#fff;font-size:16.5px;margin-bottom:8px;display:flex;align-items:center;gap:12px; }
  .why-item h4::before { content:"";width:7px;height:7px;background:var(--amber);border-radius:50%;flex-shrink:0; }
  .why-item p { font-size:13.5px;color:rgba(247,245,240,0.62);padding-left:19px; }
  .sustain-grid { display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center; }
  .sustain-list { display:flex;flex-direction:column;gap:26px; }
  .sustain-list .row { display:flex;gap:20px;align-items:flex-start; }
  .sustain-list .row .n { font-family:var(--font-ibm);font-size:12px;color:var(--amber);padding-top:4px; }
  .sustain-list .row h4 { font-size:16px;margin-bottom:6px; }
  .sustain-list .row p { font-size:14px;color:var(--steel-dark); }
  .sustain-visual { aspect-ratio:1/1;border:1px solid var(--line);position:relative;background:var(--paper-2); }
  .sustain-visual svg { position:absolute;inset:0;width:100%;height:100%; }
  .testi-wrap { max-width:820px;margin:0 auto;text-align:center; }
  .testi-slide { display:none; }
  .testi-slide.active { display:block;animation:fadeUp .5s ease; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
  .testi-quote { font-family:var(--font-space);font-size:clamp(20px,2.6vw,28px);color:#fff;line-height:1.4;margin-bottom:28px;font-weight:500; }
  .testi-person { font-family:var(--font-ibm);font-size:12.5px;color:var(--amber);letter-spacing:0.04em; }
  .testi-person span { color:var(--steel);display:block;margin-top:4px; }
  .testi-dots { display:flex;justify-content:center;gap:10px;margin-top:40px; }
  .testi-dots button { width:8px;height:8px;border-radius:50%;background:rgba(247,245,240,0.14);border:none;cursor:pointer;transition:background .25s; }
  .testi-dots button.active { background:var(--amber); }
  .news-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:28px; }
  .news-card { border:1px solid var(--line);background:#fff; }
  .news-thumb { aspect-ratio:16/10;background:linear-gradient(160deg,var(--paper-2),#e2ddd0);position:relative; }
  .news-thumb .cat { position:absolute;bottom:14px;left:16px;font-family:var(--font-ibm);font-size:10.5px;color:var(--navy);background:var(--amber-soft);padding:4px 10px;text-transform:uppercase;letter-spacing:0.06em; }
  .news-body { padding:22px 24px 26px; }
  .news-body .date { font-family:var(--font-ibm);font-size:11px;color:var(--steel);margin-bottom:10px; }
  .news-body h3 { font-size:17px;margin-bottom:10px;line-height:1.35; }
  .news-body p { font-size:13.5px;color:var(--steel-dark);margin-bottom:16px; }
  .news-body .read { font-size:12.5px;font-weight:600;color:var(--navy); }
  .careers-panel { background:linear-gradient(120deg,#0A1628,#16283F);border:1px solid rgba(247,245,240,0.14);padding:64px;display:grid;grid-template-columns:1.2fr 0.8fr;gap:50px;align-items:center;position:relative;overflow:hidden; }
  .careers-panel::before { content:"";position:absolute;right:-10%;top:-30%;width:340px;height:340px;background:radial-gradient(circle,rgba(232,135,58,0.25),transparent 70%); }
  .careers-panel h2 { color:#fff; }
  .careers-panel p { color:rgba(247,245,240,0.68);margin:18px 0 28px;max-width:460px; }
  .careers-tags { display:flex;flex-wrap:wrap;gap:10px; }
  .careers-tags span { font-family:var(--font-ibm);font-size:11.5px;color:var(--amber);border:1px solid rgba(232,135,58,0.35);padding:7px 14px;letter-spacing:0.04em; }
  .careers-side { border-left:1px solid rgba(247,245,240,0.14);padding-left:40px;display:flex;flex-direction:column;gap:22px;position:relative;z-index:2; }
  .careers-side .role { display:flex;justify-content:space-between;border-bottom:1px solid rgba(247,245,240,0.14);padding-bottom:16px; }
  .careers-side .role h5 { color:#fff;font-family:var(--font-space);font-size:15px;font-weight:500; }
  .careers-side .role span { font-family:var(--font-ibm);font-size:11px;color:var(--steel); }
  .contact-grid { display:grid;grid-template-columns:0.9fr 1.1fr;gap:64px; }
  .contact-info .item { border-top:1px solid var(--line);padding:22px 0; }
  .contact-info .item:first-child { border-top:none;padding-top:0; }
  .contact-info .item .lbl { font-family:var(--font-ibm);font-size:11px;color:var(--amber);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px; }
  .contact-info .item .val { font-size:16px;color:var(--navy);font-weight:500; }
  .contact-info .item .val small { display:block;font-size:13px;color:var(--steel-dark);font-weight:400;margin-top:4px; }
  .map-box { aspect-ratio:16/9;background:var(--paper-2);border:1px solid var(--line);margin-top:26px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden; }
  .map-box .grid-overlay { position:absolute;inset:0;background-image:linear-gradient(rgba(10,22,40,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.06) 1px,transparent 1px);background-size:34px 34px; }
  .map-box span { font-family:var(--font-ibm);font-size:12px;color:var(--steel-dark);letter-spacing:0.06em;position:relative;z-index:2; }
  form.contact-form { display:flex;flex-direction:column;gap:20px; }
  .form-row { display:grid;grid-template-columns:1fr 1fr;gap:20px; }
  .field label { display:block;font-family:var(--font-ibm);font-size:11px;color:var(--steel-dark);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px; }
  .field input,.field textarea,.field select { width:100%;border:1px solid var(--line);background:#fff;padding:13px 14px;font-family:var(--font-inter);font-size:14.5px;color:var(--ink);border-radius:2px;transition:border-color .2s ease; }
  .field input:focus,.field textarea:focus,.field select:focus { border-color:var(--amber);outline:none; }
  .field textarea { resize:vertical;min-height:120px; }
  footer.site-footer { background:var(--navy);padding:80px 0 30px; }
  .footer-grid { display:grid;grid-template-columns:1.4fr repeat(4,1fr);gap:40px;padding-bottom:56px;border-bottom:1px solid rgba(247,245,240,0.14); }
  .footer-brand p { color:var(--steel);font-size:14px;margin:18px 0 22px;max-width:280px; }
  .footer-col h5 { font-family:var(--font-ibm);font-size:11.5px;color:var(--amber);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:20px; }
  .footer-col a { display:block;color:rgba(247,245,240,0.62);font-size:14px;margin-bottom:12px;transition:color .2s ease; }
  .footer-col a:hover { color:#fff; }
  .newsletter { display:flex;margin-top:8px;border:1px solid rgba(247,245,240,0.14); }
  .newsletter input { flex:1;background:none;border:none;padding:12px 14px;color:#fff;font-size:13px; }
  .newsletter input::placeholder { color:var(--steel); }
  .newsletter button { padding:12px 18px;background:var(--amber);color:var(--navy);font-size:13px;font-weight:600;border:none;cursor:pointer; }
  .footer-bottom { display:flex;justify-content:space-between;align-items:center;padding-top:26px;flex-wrap:wrap;gap:16px; }
  .footer-bottom p { font-size:12.5px;color:var(--steel); }
  .social-row { display:flex;gap:16px; }
  .social-row a { width:34px;height:34px;border:1px solid rgba(247,245,240,0.14);display:flex;align-items:center;justify-content:center;color:var(--steel);font-size:13px;transition:all .2s ease; }
  .social-row a:hover { border-color:var(--amber);color:var(--amber); }
  @media (max-width:1080px) {
    .hero-grid { grid-template-columns:1fr; }
    .hero-schematic { display:none; }
    .about-grid,.sustain-grid,.contact-grid { grid-template-columns:1fr; }
    .stats-grid { grid-template-columns:repeat(3,1fr); }
    .stat:nth-child(4) { border-left:none;padding-left:0; }
    .services-grid,.news-grid,.projects-preview { grid-template-columns:repeat(2,1fr); }
    .industries-grid { grid-template-columns:repeat(2,1fr); }
    .why-grid { grid-template-columns:1fr; }
    .careers-panel { grid-template-columns:1fr;padding:44px 32px; }
    .careers-side { border-left:none;padding-left:0;border-top:1px solid rgba(247,245,240,0.14);padding-top:28px; }
    .footer-grid { grid-template-columns:repeat(3,1fr); }
  }
  @media (max-width:760px) {
    .main-links,.nav-cta { display:none !important; }
    .nav-toggle { display:block !important; }
    .stats-grid { grid-template-columns:repeat(2,1fr); }
    .stat:nth-child(3) { border-left:none;padding-left:0; }
    .services-grid,.news-grid,.projects-preview,.industries-grid { grid-template-columns:1fr; }
    .footer-grid { grid-template-columns:repeat(2,1fr); }
    .form-row { grid-template-columns:1fr; }
    .section-pad { padding:72px 0; }
    .container { padding:0 20px; }
  }
`;

/* ── Nav Component ── */
function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`site-nav${scrolled ? " scrolled" : ""}`} id="siteNav">
      <div className="container nav-inner">
        <a href="/" className="logo"><img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" style={{ height: 50, width: "auto", display: "block" }} /></a>
        <nav className="main-links">
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="#industries">Industries</a>
          <a href="/projects">Projects</a>
          <a href="#sustainability">Sustainability</a>
          <a href="#news">News</a>
          <a href="#careers">Careers</a>
          <a href="/blog">Blog</a>
        </nav>
        <a href="#contact" className="nav-cta">Contact Us</a>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
      </div>
      {mobileOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, background: "rgba(10,22,40,0.98)", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 18, zIndex: 999 }}>
          {[["#about", "About"], ["#services", "Services"], ["#industries", "Industries"], ["/projects", "Projects"], ["#sustainability", "Sustainability"], ["#news", "News"], ["#careers", "Careers"], ["/blog", "Blog"], ["#contact", "Contact Us"]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)} style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, fontWeight: 500 }}>{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="hero">
      <div className="flare-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">Est. 1990 — Port Harcourt, Nigeria</div>
          <h1>Engineering integrity, <em>from wellhead to flare tip.</em></h1>
          <p className="lead">ANBE Nigeria Limited designs, fabricates, and installs the pipeline and flare systems that keep Nigeria's oil &amp; gas facilities running safely — built by an indigenous team with 36 years in the field.</p>
          <div className="hero-actions">
            <a href="/projects" className="btn btn-primary">View Our Projects →</a>
            <a href="#services" className="btn btn-ghost">Explore Capabilities</a>
          </div>
          <div className="hero-meta">
            <div><span className="num">36</span><span className="lbl">Years in Operation</span></div>
            <div><span className="num">24/7</span><span className="lbl">Field Response</span></div>
            <div><span className="num">100%</span><span className="lbl">Indigenous Owned</span></div>
          </div>
        </div>
        <div className="hero-schematic">
          <span className="corner tl" aria-hidden="true" />
          <span className="corner br" aria-hidden="true" />
          <svg viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="40" y1="360" x2="360" y2="360" stroke="#4A5568" strokeWidth="1" />
            <path d="M40 360 L40 220 L140 220 L140 120" stroke="#8B95A1" strokeWidth="1.5" />
            <path d="M140 120 L140 60" stroke="#E8873A" strokeWidth="2" />
            <circle cx="140" cy="60" r="6" fill="#E8873A" />
            <path d="M140 60 C 150 40, 130 30, 140 10" stroke="#F0A669" strokeWidth="2" fill="none" />
            <circle cx="140" cy="220" r="4" fill="#8B95A1" />
            <line x1="180" y1="220" x2="320" y2="220" stroke="#8B95A1" strokeWidth="1.5" />
            <circle cx="320" cy="220" r="18" stroke="#4A5568" strokeWidth="1.5" fill="none" />
            <circle cx="320" cy="220" r="4" fill="#E8873A" />
            <line x1="60" y1="300" x2="60" y2="360" stroke="#4A5568" strokeWidth="1" />
            <text x="60" y="295" fill="#8B95A1" fontFamily="IBM Plex Mono" fontSize="9">PSV-01</text>
            <text x="150" y="80" fill="#E8873A" fontFamily="IBM Plex Mono" fontSize="9">FLARE STACK</text>
            <text x="290" y="255" fill="#8B95A1" fontFamily="IBM Plex Mono" fontSize="9">SEP-02</text>
            <rect x="40" y="360" width="320" height="1" fill="#4A5568" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  return (
    <section className="section-pad" id="about">
      <div className="container about-grid">
        <div className="reveal about-visual">
          <div className="grid-overlay" aria-hidden="true" />
          <div className="badge"><strong>Ernest Azukaeme</strong>Chief Executive Officer</div>
        </div>
        <div className="reveal">
          <div className="eyebrow">About ANBE</div>
          <h2>An indigenous engineering house built for the Niger Delta's toughest work.</h2>
          <p style={{ color: "var(--steel-dark)", fontSize: 16, marginTop: 18 }}>Incorporated in 1990, ANBE Nigeria Limited provides pipeline construction, fabrication engineering, and flare system design to operators across Nigeria's oil &amp; gas sector. Our fabrication and maintenance facility, combined with a technical team drawn from combustion engineering and equipment maintenance disciplines, lets us take a project from design through procurement to commissioning without handing it off.</p>
          <ul className="values-list">
            <li><strong>Mission</strong><span>Deliver engineering solutions of international standard, executed by Nigerian talent.</span></li>
            <li><strong>Vision</strong><span>Become a leading Pipeline, Engineering &amp; Construction company across West Africa.</span></li>
            <li><strong>Safety</strong><span>Every scope is planned, permitted, and closed out against a documented HSE standard.</span></li>
            <li><strong>Reliability</strong><span>Budgets and schedules are backed by real project data, not estimates alone.</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Partners ── */
const PARTNERS = [
  { src: "/partners/newscross.webp", alt: "Newcross E&P" },
  { src: "/partners/seplat.webp", alt: "Seplat Energy" },
  { src: "/partners/chevron.webp", alt: "Chevron" },
  { src: "/partners/Total_SA_logo-1.webp", alt: "TotalEnergies" },
  { src: "/partners/Heirs-Energies-Logo_Approved.webp", alt: "Heirs Energies" },
  { src: "/partners/oando-seeklogo.webp", alt: "Oando" },
  { src: "/partners/mobile.webp", alt: "Mobil" },
];

function PartnersStrip() {
  const all = [...PARTNERS, ...PARTNERS];
  return (
    <div className="partners-strip">
      <div className="container">
        <p className="partners-label">Trusted by Leading Organizations in the Oil &amp; Gas Industry</p>
      </div>
      <div className="partners-track-wrap">
        <div className="partners-track">
          {all.map((p, i) => (
            <div
              key={`${p.src}-${i}`}
              className="p-logo-box"
              style={{ backgroundImage: `url(${p.src})` }}
              role="img"
              aria-label={p.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Stats ── */
function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="container stats-grid">
        <div className="stat"><div className="val" data-count="36">0</div><div className="lbl">Years in Business</div></div>
        <div className="stat"><div className="val"><span data-count="140">0</span><span className="plus">+</span></div><div className="lbl">Projects Completed</div></div>
        <div className="stat"><div className="val"><span data-count="60">0</span><span className="plus">+</span></div><div className="lbl">Engineers &amp; Technicians</div></div>
        <div className="stat"><div className="val" data-count="24">0</div><div className="lbl">Hour Field Response</div></div>
        <div className="stat"><div className="val"><span data-count="0">0</span></div><div className="lbl">Lost-Time Incidents YTD</div></div>
      </div>
    </div>
  );
}

/* ── Services ── */
function Services() {
  return (
    <section className="section-pad" id="services">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">EPC Capability</div>
          <h2>Engineering, procurement, and construction under one roof.</h2>
          <p>From flare stack design to trunkline installation, our scopes move through the same three disciplines — sequenced by our own field teams, not subcontracted out.</p>
        </div>
        <div className="services-grid reveal">
          <div className="service-card">
            <div className="idx">01 — DESIGN &amp; ENGINEERING</div>
            <svg className="icon" viewBox="0 0 44 44" fill="none"><rect x="6" y="6" width="32" height="32" rx="1" stroke="#E8873A" strokeWidth="1.5" /><path d="M14 30 L20 18 L26 24 L32 12" stroke="#0A1628" strokeWidth="1.5" /></svg>
            <h3>Smokeless Flare &amp; Ignition Systems</h3>
            <p>Design and fabrication of vertical and horizontal smokeless flares, high turndown flares, and tropicalised remote ignition systems.</p>
            <a href="#contact" className="learn">Discuss a Scope <span className="arrow">→</span></a>
          </div>
          <div className="service-card">
            <div className="idx">02 — CONSTRUCTION</div>
            <svg className="icon" viewBox="0 0 44 44" fill="none"><path d="M8 34 L8 20 L22 20 L22 8 L36 8 L36 34" stroke="#E8873A" strokeWidth="1.5" fill="none" /><circle cx="22" cy="34" r="2" fill="#0A1628" /></svg>
            <h3>Pipeline Construction &amp; Repair</h3>
            <p>Full-scope pipeline construction, installation, and repair, including tie-ins, hydrotesting, and right-of-way reinstatement.</p>
            <a href="#contact" className="learn">Discuss a Scope <span className="arrow">→</span></a>
          </div>
          <div className="service-card">
            <div className="idx">03 — PROCUREMENT</div>
            <svg className="icon" viewBox="0 0 44 44" fill="none"><rect x="8" y="12" width="28" height="20" rx="1" stroke="#E8873A" strokeWidth="1.5" /><path d="M8 18 H36" stroke="#0A1628" strokeWidth="1.5" /></svg>
            <h3>Procurement &amp; Stockpiling</h3>
            <p>Sourcing, quality verification, and stockpiling of materials and equipment for oil &amp; gas facility construction.</p>
            <a href="#contact" className="learn">Discuss a Scope <span className="arrow">→</span></a>
          </div>
          <div className="service-card">
            <div className="idx">04 — FABRICATION</div>
            <svg className="icon" viewBox="0 0 44 44" fill="none"><path d="M10 34 L34 34 M14 34 L14 20 L30 20 L30 34" stroke="#E8873A" strokeWidth="1.5" fill="none" /><circle cx="22" cy="14" r="4" stroke="#0A1628" strokeWidth="1.5" /></svg>
            <h3>Fabrication &amp; Workshop Services</h3>
            <p>In-house fabrication of flare components, structural steel, and skid-mounted equipment at our Port Harcourt facility.</p>
            <a href="#contact" className="learn">Discuss a Scope <span className="arrow">→</span></a>
          </div>
          <div className="service-card">
            <div className="idx">05 — MAINTENANCE</div>
            <svg className="icon" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="14" stroke="#E8873A" strokeWidth="1.5" /><path d="M22 14 V22 L28 26" stroke="#0A1628" strokeWidth="1.5" /></svg>
            <h3>Equipment Maintenance</h3>
            <p>Combustion equipment maintenance covering generators, earth-moving equipment, and flare ignition assemblies.</p>
            <a href="#contact" className="learn">Discuss a Scope <span className="arrow">→</span></a>
          </div>
          <div className="service-card">
            <div className="idx">06 — SUPPORT</div>
            <svg className="icon" viewBox="0 0 44 44" fill="none"><path d="M22 8 C 30 8 36 14 36 22 C 36 30 30 36 22 36 C 14 36 8 30 8 22" stroke="#E8873A" strokeWidth="1.5" fill="none" /><path d="M8 22 L14 22 L11 28 Z" fill="#0A1628" /></svg>
            <h3>24/7 Technical Partner Support</h3>
            <p>Direct access to ANBE Technical Partners for specialist expertise across the life of a facility.</p>
            <a href="#contact" className="learn">Discuss a Scope <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Industries ── */
function Industries() {
  const items = [
    { tag: "Core", label: "Oil & Gas" }, { tag: "Core", label: "Energy & Flare Systems" },
    { tag: "Adjacent", label: "Industrial Fabrication" }, { tag: "Adjacent", label: "Infrastructure & Utilities" },
    { tag: "Adjacent", label: "Construction" }, { tag: "Adjacent", label: "Government & Public Works" },
    { tag: "Adjacent", label: "Manufacturing" }, { tag: "Adjacent", label: "Industrial Automation" },
  ];
  return (
    <section className="section-pad on-dark" id="industries">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Where We Work</div>
          <h2>Industries served across the Niger Delta and beyond.</h2>
          <p>Our core is oil &amp; gas, but the same fabrication and construction disciplines carry across adjacent industrial sectors.</p>
        </div>
        <div className="industries-grid reveal">
          {items.map((item) => (
            <div key={item.label} className="industry-card">
              <span className="tag">{item.tag}</span>
              <h4>{item.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects Preview ── */
function ProjectsPreview() {
  return (
    <section className="section-pad" id="projects-preview">
      <div className="container">
        <div className="section-head reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "none", flexWrap: "wrap", gap: 20 }}>
          <div><div className="eyebrow">Field Work</div><h2>Featured Projects</h2></div>
          <a href="/projects" className="btn btn-dark">View All Projects →</a>
        </div>
        <div className="projects-preview reveal">
          {[
            { tag: "Flare Systems", client: "Niger Delta Terminal", title: "Smokeless Flare Stack Retrofit", desc: "Design and fabrication of a high turndown flare system to replace an ageing stack at an onshore export terminal." },
            { tag: "Pipeline", client: "Delta State Flowline", title: "18km Trunkline Replacement", desc: "Full pipeline construction and hydrotesting scope, delivered with zero lost-time incidents across an 11-month programme." },
            { tag: "Fabrication", client: "Rivers State Facility", title: "Remote Ignition System Upgrade", desc: "Installation of a tropicalised remote ignition system across three flare points to reduce manual intervention." },
          ].map((p) => (
            <div key={p.title} className="proj-card">
              <div className="proj-thumb"><span className="zoom-tag">{p.tag}</span></div>
              <div className="proj-body">
                <div className="client">{p.client}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <a href="/projects" className="view">View Project →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Why Choose ── */
function WhyChoose() {
  const items = [
    { title: "Experienced Field Teams", desc: "Personnel with backgrounds spanning combustion engineering, risk asset management, and major-project delivery." },
    { title: "Proven Delivery Record", desc: "36 years executing scopes to budget and schedule, backed by real project data." },
    { title: "Safety-First Culture", desc: "Every site operates under a documented HSE standard from mobilisation to demobilisation." },
    { title: "In-House Fabrication", desc: "An ultra-modern workshop means less dependency on third-party vendors and tighter schedule control." },
    { title: "Indigenous Content", desc: "A Nigerian-owned company prioritising local goods, materials, and manpower wherever available." },
    { title: "24/7 Availability", desc: "Round-the-clock response for operational facilities that cannot afford downtime." },
  ];
  return (
    <section className="section-pad on-dark">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Why ANBE</div>
          <h2>Six reasons operators keep us on their bid list.</h2>
        </div>
        <div className="why-grid reveal">
          {items.map((item) => (
            <div key={item.title} className="why-item">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sustainability ── */
function Sustainability() {
  return (
    <section className="section-pad" id="sustainability">
      <div className="container sustain-grid">
        <div className="reveal">
          <div className="eyebrow">Sustainability</div>
          <h2>Reducing flare footprint, protecting the field crew.</h2>
          <div className="sustain-list" style={{ marginTop: 30 }}>
            {[
              { n: "01", title: "Smokeless Combustion", desc: "Our flare designs are engineered specifically to reduce visible smoke and improve combustion efficiency at site." },
              { n: "02", title: "Health & Safety", desc: "Every crew operates under a documented permit-to-work system with daily toolbox talks." },
              { n: "03", title: "Community Impact", desc: "Local sourcing and manpower policies keep economic value inside host communities." },
              { n: "04", title: "Continuous Improvement", desc: "Field data from every project feeds back into how the next flare or pipeline scope is engineered." },
            ].map((row) => (
              <div key={row.n} className="row"><span className="n">{row.n}</span><div><h4>{row.title}</h4><p>{row.desc}</p></div></div>
            ))}
          </div>
        </div>
        <div className="reveal sustain-visual">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="150" stroke="#0A1628" strokeWidth="1" fill="none" opacity="0.15" />
            <circle cx="200" cy="200" r="110" stroke="#0A1628" strokeWidth="1" fill="none" opacity="0.15" />
            <circle cx="200" cy="200" r="70" stroke="#E8873A" strokeWidth="1.5" fill="none" />
            <path d="M200 130 C 215 150, 185 165, 200 190" stroke="#E8873A" strokeWidth="2" fill="none" />
            <circle cx="200" cy="200" r="4" fill="#0A1628" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
const TESTIMONIALS = [
  { quote: `"ANBE mobilised within days and closed out the flare retrofit ahead of our turnaround window. Documentation was clean and the crew ran a tight site."`, name: "Facility Manager", org: "Onshore Export Terminal, Rivers State" },
  { quote: `"What stood out was the fabrication quality — every skid arrived to spec and passed inspection first time."`, name: "Project Engineer", org: "Independent E&P Operator" },
  { quote: `"A dependable indigenous partner for pipeline work. Budgets held and the safety record was spotless across the programme."`, name: "Procurement Lead", org: "EPC Contractor, Niger Delta" },
];

function Testimonials() {
  const { active, setActive } = useTestimonials(TESTIMONIALS.length);
  return (
    <section className="section-pad on-dark">
      <div className="container testi-wrap">
        <div className="eyebrow" style={{ justifyContent: "center" }}>Client Feedback</div>
        <div id="testiSlides">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`testi-slide${i === active ? " active" : ""}`}>
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-person">{t.name}<span>{t.org}</span></div>
            </div>
          ))}
        </div>
        <div className="testi-dots">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={`Show testimonial ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── News ── */
function News() {
  const items = [
    { cat: "Fabrication", date: "June 2026", title: "ANBE completes workshop expansion for skid fabrication", desc: "New bay capacity shortens lead times on flare component fabrication for upcoming terminal projects." },
    { cat: "Safety", date: "April 2026", title: "Marking another year without a lost-time incident", desc: "A look at the permit-to-work practices behind ANBE's ongoing safety record across active sites." },
    { cat: "Company", date: "February 2026", title: "Building indigenous capacity in flare engineering", desc: "How ANBE's technical partnerships are training the next generation of Nigerian combustion engineers." },
  ];
  return (
    <section className="section-pad" id="news">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">News &amp; Insights</div>
          <h2>From the field and the workshop.</h2>
        </div>
        <div className="news-grid reveal">
          {items.map((item) => (
            <div key={item.title} className="news-card">
              <div className="news-thumb"><span className="cat">{item.cat}</span></div>
              <div className="news-body">
                <div className="date">{item.date}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href="#" className="read">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Careers ── */
function Careers() {
  return (
    <section className="section-pad" id="careers">
      <div className="container">
        <div className="careers-panel reveal">
          <div>
            <div className="eyebrow">Careers</div>
            <h2>Build the systems that keep the field running.</h2>
            <p>We hire engineers, fabricators, and field technicians who take safety and precision seriously — and back them with steady, well-run projects.</p>
            <div className="careers-tags">
              <span>Health Cover</span><span>Field Allowances</span><span>Training Sponsorship</span><span>Local Hire Priority</span>
            </div>
          </div>
          <div className="careers-side">
            <div className="role"><h5>Pipeline Construction Supervisor</h5><span>Port Harcourt</span></div>
            <div className="role"><h5>Flare &amp; Ignition Fabricator</h5><span>Port Harcourt</span></div>
            <div className="role"><h5>HSE Officer — Field Sites</h5><span>Niger Delta</span></div>
            <a href="#contact" className="btn btn-primary" style={{ alignSelf: "flex-start", marginTop: 6 }}>View Open Roles →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  const [status, setStatus] = useState("");
  return (
    <section className="section-pad" id="contact">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Contact</div>
          <h2>Talk to us about your next scope.</h2>
        </div>
        <div className="contact-grid reveal">
          <div className="contact-info">
            <div className="item"><div className="lbl">Head Office</div><div className="val">Port Harcourt, Rivers State<small>Nigeria</small></div></div>
            <div className="item"><div className="lbl">Phone</div><div className="val">+234 803 310 0539<small>+234 803 775 3444</small></div></div>
            <div className="item"><div className="lbl">Email</div><div className="val">info@anbenig.com</div></div>
            <div className="item"><div className="lbl">Business Hours</div><div className="val">24/7 Field Response<small>Office: Mon–Fri, 8am–5pm WAT</small></div></div>
            <div className="map-box"><div className="grid-overlay" /><span>MAP — PORT HARCOURT, RIVERS STATE</span></div>
          </div>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setStatus("Thank you — we'll respond within one business day."); }}>
            <div className="form-row">
              <div className="field"><label htmlFor="fname">Full Name</label><input id="fname" type="text" required /></div>
              <div className="field"><label htmlFor="fcompany">Company</label><input id="fcompany" type="text" /></div>
            </div>
            <div className="form-row">
              <div className="field"><label htmlFor="femail">Email</label><input id="femail" type="email" required /></div>
              <div className="field"><label htmlFor="fphone">Phone</label><input id="fphone" type="tel" /></div>
            </div>
            <div className="field"><label htmlFor="fscope">Scope of Interest</label>
              <select id="fscope">
                <option>Pipeline Construction</option><option>Flare &amp; Ignition Systems</option>
                <option>Fabrication</option><option>Procurement</option>
                <option>Equipment Maintenance</option><option>Other</option>
              </select>
            </div>
            <div className="field"><label htmlFor="fmessage">Message</label><textarea id="fmessage" required /></div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Send Message →</button>
            {status && <p style={{ fontSize: 13, color: "var(--amber)" }}>{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="logo"><img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" style={{ height: 45, width: "auto", display: "block" }} /></a>
            <p>An indigenous engineering company delivering pipeline construction, fabrication, and flare systems to Nigeria's oil &amp; gas sector since 1990.</p>
            <div className="newsletter">
              <input type="email" placeholder="Your email address" aria-label="Email for newsletter" />
              <button>Subscribe</button>
            </div>
          </div>
          <div className="footer-col"><h5>Company</h5>
            <a href="#about">About Us</a><a href="#careers">Careers</a><a href="#news">News</a><a href="#contact">Contact</a>
          </div>
          <div className="footer-col"><h5>Services</h5>
            <a href="#services">Pipeline Construction</a><a href="#services">Flare Systems</a>
            <a href="#services">Fabrication</a><a href="#services">Procurement</a>
          </div>
          <div className="footer-col"><h5>Industries</h5>
            <a href="#industries">Oil &amp; Gas</a><a href="#industries">Infrastructure</a>
            <a href="#industries">Manufacturing</a><a href="#industries">Government</a>
          </div>
          <div className="footer-col"><h5>Resources</h5>
            <a href="/projects">Projects</a><a href="#sustainability">Sustainability</a><a href="#news">Insights</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 ANBE Nigeria Limited. All rights reserved.</p>
          <div className="social-row">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Twitter / X">x</a>
            <a href="#" aria-label="Facebook">f</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */
export default function Home() {
  useReveal();
  useCounters();
  return (
    <>
      <style>{STYLES + STYLES2 + STYLES3}</style>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <StatsStrip />
        <PartnersStrip />
        <Services />
        <Industries />
        <ProjectsPreview />
        <WhyChoose />
        <Sustainability />
        <Testimonials />
        <News />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
