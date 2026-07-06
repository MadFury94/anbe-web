"use client";
import { useEffect, useState } from "react";

const NAV_CSS = `
  .site-nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:14px 0;background:rgba(10,22,40,0.94);backdrop-filter:blur(10px);border-bottom:1px solid rgba(247,245,240,0.14);transition:padding .3s ease;}
  .nav-inner{display:flex;align-items:center;justify-content:space-between;max-width:1240px;margin:0 auto;padding:0 32px;}
  .nav-logo{display:flex;align-items:center;text-decoration:none;}
  .main-links{display:flex;gap:28px;}
  .main-links a{font-family:'Inter',sans-serif;font-size:14px;color:rgba(255,255,255,0.82);font-weight:500;position:relative;padding:4px 0;text-decoration:none;}
  .main-links a::after{content:"";position:absolute;left:0;bottom:0;width:0;height:1px;background:#E8873A;transition:width .3s ease;}
  .main-links a:hover::after,.main-links a.nav-active::after{width:100%;}
  .nav-cta-btn{font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#0A1628;background:#E8873A;padding:11px 22px;border-radius:2px;letter-spacing:0.02em;transition:background .25s ease;text-decoration:none;white-space:nowrap;}
  .nav-cta-btn:hover{background:#F0A669;}
  .nav-toggle-btn{display:none;background:none;border:none;color:#fff;font-size:22px;cursor:pointer;padding:0;}
  @media(max-width:1080px){.main-links{gap:20px;}}
  @media(max-width:760px){
    .main-links,.nav-cta-btn{display:none!important;}
    .nav-toggle-btn{display:block!important;}
    .nav-inner{padding:0 20px;}
  }
`;

const NAV_LINKS = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/#industries", label: "Industries" },
    { href: "/projects", label: "Projects" },
    { href: "/#sustainability", label: "Sustainability" },
    { href: "/blog", label: "Blog" },
    { href: "/#careers", label: "Careers" },
];

interface SiteNavProps {
    activePath?: string; // e.g. "/about", "/projects", "/blog"
}

export default function SiteNav({ activePath }: SiteNavProps) {
    const [mob, setMob] = useState(false);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 760) setMob(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <>
            <style>{NAV_CSS}</style>
            <header className="site-nav">
                <div className="nav-inner">
                    <a href="/" className="nav-logo">
                        <img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" style={{ height: 50, width: "auto", display: "block" }} />
                    </a>

                    <nav className="main-links" aria-label="Main navigation">
                        {NAV_LINKS.map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                className={activePath === href ? "nav-active" : undefined}
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    <a href="/contact" className="nav-cta-btn">Contact Us</a>

                    <button
                        className="nav-toggle-btn"
                        aria-label="Toggle menu"
                        onClick={() => setMob(!mob)}
                    >
                        {mob ? "✕" : "☰"}
                    </button>
                </div>

                {mob && (
                    <div style={{
                        position: "fixed", top: 73, left: 0, right: 0,
                        background: "rgba(10,22,40,0.98)", padding: "24px 32px",
                        display: "flex", flexDirection: "column", gap: 18, zIndex: 998,
                        borderTop: "1px solid rgba(247,245,240,0.1)",
                    }}>
                        {[...NAV_LINKS, { href: "/contact", label: "Contact Us" }].map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => setMob(false)}
                                style={{
                                    color: "rgba(255,255,255,0.9)", fontSize: 16,
                                    fontWeight: 500, fontFamily: "'Inter',sans-serif",
                                    textDecoration: "none",
                                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                                    paddingBottom: 14,
                                }}
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                )}
            </header>
        </>
    );
}
