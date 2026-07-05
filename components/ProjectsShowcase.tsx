import { Link } from "react-router-dom";
import { projects } from "@/src/data/content";

// Show only first 3 on homepage
const featured = projects.slice(0, 3);

export default function ProjectsShowcase() {
    return (
        <section style={{ padding: "110px 0", background: "var(--paper)" }} id="projects">
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 56 }}>
                    <div>
                        <div className="eyebrow">Field Work</div>
                        <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1 }}>Featured Projects</h2>
                    </div>
                    <Link to="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 24px", fontSize: 14, fontWeight: 600, borderRadius: 2, border: "1px solid rgba(10,22,40,0.12)", color: "var(--navy)", transition: "all .25s ease", whiteSpace: "nowrap" }}>
                        View All Projects →
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="projects-grid">
                    {featured.map((p) => (
                        <div key={p.title} style={{ border: "1px solid rgba(10,22,40,0.12)", background: "#fff", overflow: "hidden", transition: "box-shadow .3s ease, transform .3s ease" }} className="proj-card">
                            <div style={{ aspectRatio: "16/10", position: "relative", overflow: "hidden" }}>
                                <img src={p.image} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(10,22,40,0.6) 100%)" }} />
                                <span style={{ position: "absolute", top: 16, left: 16, fontFamily: "var(--font-ibm, monospace)", fontSize: 10.5, color: "var(--amber)", letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(232,135,58,0.4)", padding: "4px 10px", zIndex: 2 }}>{p.tag}</span>
                            </div>
                            <div style={{ padding: "26px 26px 28px" }}>
                                <div style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 11.5, color: "var(--steel)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{p.client}</div>
                                <h3 style={{ fontSize: 19, marginBottom: 10, fontFamily: "var(--font-space, sans-serif)" }}>{p.title}</h3>
                                <p style={{ fontSize: 14, color: "var(--steel-dark)", marginBottom: 18 }}>{p.desc}</p>
                                <Link to="/projects" style={{ fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, color: "var(--navy)" }}>View Project →</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        .proj-card:hover { box-shadow: 0 24px 48px -20px rgba(10,22,40,0.25); transform: translateY(-4px); }
        @media (max-width: 1080px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 760px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
}
