import { Link } from "react-router-dom";
import { hero } from "@/src/data/content";

export default function Hero() {
    return (
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "linear-gradient(180deg, rgba(10,22,40,0.82) 0%, rgba(10,22,40,0.94) 60%, #0A1628 100%)", position: "relative", overflow: "hidden", paddingTop: 120, paddingBottom: 80 }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(139,149,161,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,149,161,0.06) 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "linear-gradient(180deg, rgba(0,0,0,0.6), transparent 75%)", WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.6), transparent 75%)" }} />
            <div aria-hidden="true" style={{ position: "absolute", right: "6%", top: "18%", width: 420, height: 420, background: "radial-gradient(circle, rgba(232,135,58,0.35) 0%, rgba(180,80,42,0.12) 45%, transparent 70%)", filter: "blur(10px)", animation: "flarePulse 6s ease-in-out infinite" }} />

            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 60, alignItems: "center", width: "100%" }} className="hero-grid">
                <div>
                    <div className="eyebrow" style={{ color: "var(--amber)" }}>{hero.eyebrow}</div>
                    <h1 style={{ fontSize: "clamp(38px, 5.2vw, 68px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 24, fontFamily: "var(--font-space, sans-serif)", fontWeight: 600 }}>
                        {hero.headline}{" "}
                        <em style={{ fontStyle: "normal", color: "var(--amber)" }}>{hero.headlineEm}</em>
                    </h1>
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 520, marginBottom: 36, fontWeight: 400 }}>
                        {hero.body}
                    </p>

                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
                        <Link to={hero.ctaPrimary.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", borderRadius: 2, background: "var(--amber)", color: "var(--navy)", transition: "all .25s ease" }}>
                            {hero.ctaPrimary.label}
                        </Link>
                        <Link to={hero.ctaSecondary.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", borderRadius: 2, border: "1px solid rgba(255,255,255,0.3)", color: "#fff", transition: "all .25s ease" }}>
                            {hero.ctaSecondary.label}
                        </Link>
                    </div>

                    <div style={{ display: "flex", gap: 44, borderTop: "1px solid rgba(247,245,240,0.14)", paddingTop: 26 }}>
                        {hero.stats.map((m) => (
                            <div key={m.lbl} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <span style={{ fontFamily: "var(--font-space, sans-serif)", fontSize: 26, color: "#fff", fontWeight: 600 }}>{m.num}</span>
                                <span style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 11, color: "var(--steel)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{m.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero-schematic" style={{ position: "relative", aspectRatio: "1 / 1.05", border: "1px solid rgba(247,245,240,0.14)", background: "linear-gradient(160deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))" }}>
                    <span aria-hidden="true" style={{ position: "absolute", top: -1, left: -1, width: 18, height: 18, borderTop: "2px solid var(--amber)", borderLeft: "2px solid var(--amber)" }} />
                    <span aria-hidden="true" style={{ position: "absolute", bottom: -1, right: -1, width: 18, height: 18, borderBottom: "2px solid var(--amber)", borderRight: "2px solid var(--amber)" }} />
                    <svg viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
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

            <style>{`
        @keyframes flarePulse { 0%,100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.08); } }
        @media (max-width: 1080px) { .hero-grid { grid-template-columns: 1fr !important; } .hero-schematic { display: none !important; } }
      `}</style>
        </section>
    );
}
