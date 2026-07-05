import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks, company } from "@/src/data/content";

export default function Header() {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "14px 0" : "22px 0", background: scrolled ? "rgba(10,22,40,0.94)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", borderBottom: scrolled ? "1px solid rgba(247,245,240,0.14)" : "1px solid transparent", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link to="/" style={{ fontFamily: "var(--font-space, sans-serif)", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 12, height: 12, background: "var(--amber)", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", display: "inline-block", flexShrink: 0 }} />
                    <span>
                        {company.shortName}
                        <span style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 10, color: "var(--steel)", letterSpacing: "0.1em", fontWeight: 400, display: "block", lineHeight: 1.2 }}>
                            NIGERIA LIMITED
                        </span>
                    </span>
                </Link>

                <nav style={{ display: "flex", gap: 34 }} className="hidden-mobile">
                    {navLinks.map((link) => (
                        <Link key={link.href} to={link.href} style={{ fontSize: 14, color: pathname === link.href ? "var(--amber)" : "rgba(255,255,255,0.82)", fontWeight: 500, padding: "4px 0", transition: "color 0.2s" }}>
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <Link to="/contact" style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", background: "var(--amber)", padding: "11px 22px", borderRadius: 2, letterSpacing: "0.02em", transition: "background 0.25s ease" }} className="hidden-mobile">
                    Contact Us
                </Link>

                <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", display: "none" }} className="show-mobile">
                    {mobileOpen ? "✕" : "☰"}
                </button>
            </div>

            {mobileOpen && (
                <div style={{ background: "rgba(10,22,40,0.97)", borderTop: "1px solid rgba(247,245,240,0.14)", padding: "20px 32px 28px" }}>
                    {navLinks.map((link) => (
                        <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} style={{ display: "block", color: pathname === link.href ? "var(--amber)" : "rgba(255,255,255,0.82)", fontSize: 14, fontWeight: 500, padding: "12px 0", borderBottom: "1px solid rgba(247,245,240,0.08)" }}>
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" onClick={() => setMobileOpen(false)} style={{ display: "inline-block", marginTop: 18, background: "var(--amber)", color: "var(--navy)", padding: "11px 22px", borderRadius: 2, fontSize: 13, fontWeight: 600 }}>
                        Contact Us
                    </Link>
                </div>
            )}

            <style>{`
        @media (max-width: 760px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
        @media (min-width: 761px) { .show-mobile { display: none !important; } }
      `}</style>
        </header>
    );
}
