"use client";
import { useEffect, useState } from "react";

const NAV_CSS = `
  .site-nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(10,22,40,0.96);backdrop-filter:blur(10px);border-bottom:1px solid rgba(247,245,240,0.14);}
  .nav-inner{display:flex;align-items:center;justify-content:space-between;max-width:1240px;margin:0 auto;padding:0 32px;height:64px;}
  .nav-logo{display:flex;align-items:center;text-decoration:none;flex-shrink:0;}
  .main-links{display:flex;gap:28px;align-items:center;}
  .main-links a{font-family:'Inter',sans-serif;font-size:14px;color:rgba(255,255,255,0.82);font-weight:500;position:relative;padding:4px 0;text-decoration:none;white-space:nowrap;}
  .main-links a::after{content:"";position:absolute;left:0;bottom:0;width:0;height:1px;background:#E8873A;transition:width .3s ease;}
  .main-links a:hover::after,.main-links a.nav-active::after{width:100%;}
  .nav-cta-btn{font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#0A1628;background:#E8873A;padding:10px 20px;border-radius:2px;letter-spacing:0.02em;transition:background .25s ease;text-decoration:none;white-space:nowrap;flex-shrink:0;}
  .nav-cta-btn:hover{background:#F0A669;}
  .nav-toggle-btn{display:none;background:none;border:none;color:#fff;font-size:26px;cursor:pointer;padding:4px;line-height:1;flex-shrink:0;}
  .mobile-menu{position:fixed;top:64px;left:0;right:0;bottom:0;background:rgba(10,22,40,0.99);z-index:997;display:flex;flex-direction:column;padding:32px;gap:0;overflow-y:auto;}
  .mobile-menu a{font-family:'Inter',sans-serif;font-size:18px;font-weight:500;color:rgba(255,255,255,0.9);text-decoration:none;padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.07);}
  .mobile-menu a:last-child{border-bottom:none;}
  .mobile-menu a.mob-cta{margin-top:24px;background:#E8873A;color:#0A1628;padding:16px 24px;text-align:center;font-weight:600;border-bottom:none;border-radius:2px;}
  @media(max-width:1080px){.main-links{gap:18px;}}
  @media(max-width:900px){.main-links{gap:14px;} .main-links a{font-size:13px;}}
  @media(max-width:760px){
    .main-links,.nav-cta-btn{display:none!important;}
    .nav-toggle-btn{display:flex!important;align-items:center;justify-content:center;}
    .nav-inner{padding:0 20px;}
  }
`;

const NAV_LINKS = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
];

interface SiteNavProps {
    activePath?: string;
}

export default function SiteNav({ activePath }: SiteNavProps) {
    const [mob, setMob] = useState(false);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 760) setMob(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mob ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mob]);

    return (
        <>
            <style>{NAV_CSS}</style>
            <header className="site-nav">
                <div className="nav-inner">
                    <a href="/" className="nav-logo">
                        <img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" style={{ height: 40, width: "auto", display: "block" }} />
                    </a>

                    <nav className="main-links" aria-label="Main navigation">
                        {NAV_LINKS.map(({ href, label }) => (
                            <a key={href} href={href} className={activePath === href ? "nav-active" : undefined}>
                                {label}
                            </a>
                        ))}
                    </nav>

                    <a href="/contact" className="nav-cta-btn">Contact Us</a>

                    <button className="nav-toggle-btn" aria-label="Toggle menu" onClick={() => setMob(!mob)}>
                        {mob ? "✕" : "☰"}
                    </button>
                </div>
            </header>

            {mob && (
                <div className="mobile-menu">
                    {NAV_LINKS.map(({ href, label }) => (
                        <a key={href} href={href} onClick={() => setMob(false)}>{label}</a>
                    ))}
                    <a href="/contact" className="mob-cta" onClick={() => setMob(false)}>Contact Us</a>
                </div>
            )}
        </>
    );
}
