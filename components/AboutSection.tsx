import { Link } from "react-router-dom";
import { aboutSection, company } from "@/src/data/content";

export default function AboutSection() {
    return (
        <section style={{ padding: "110px 0", background: "var(--paper)" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 70, alignItems: "center" }} className="about-grid">
                {/* CEO visual */}
                <div style={{ aspectRatio: "4/5", background: "linear-gradient(155deg, #16283F, #0A1628)", position: "relative", overflow: "hidden", border: "1px solid rgba(10,22,40,0.12)" }}>
                    <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(232,135,58,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(232,135,58,0.12) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                    <img src={company.ceo.photo} alt={`${company.ceo.name} — ${company.ceo.title}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(10,22,40,0.72)", backdropFilter: "blur(6px)", padding: "16px 20px 18px" }}>
                        <strong style={{ display: "block", color: "#fff", fontFamily: "var(--font-space, sans-serif)", fontSize: 20, fontWeight: 600, marginBottom: 2 }}>{company.ceo.name}</strong>
                        <span style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 11, color: "var(--steel)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{company.ceo.title}</span>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <div className="eyebrow">{aboutSection.eyebrow}</div>
                    <h2 style={{ fontSize: "clamp(28px, 3.4vw, 42px)", lineHeight: 1.1 }}>{aboutSection.heading}</h2>
                    <p style={{ color: "var(--steel-dark)", fontSize: 16, marginTop: 18, lineHeight: 1.7 }}>{aboutSection.body}</p>

                    <ul style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 0, listStyle: "none" }}>
                        {aboutSection.values.map((v) => (
                            <li key={v.title} style={{ paddingLeft: 20, borderLeft: "2px solid var(--amber)" }}>
                                <strong style={{ display: "block", fontFamily: "var(--font-space, sans-serif)", fontSize: 15, color: "var(--navy)", marginBottom: 4 }}>{v.title}</strong>
                                <span style={{ fontSize: 14, color: "var(--steel-dark)" }}>{v.text}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to={aboutSection.cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 36, padding: "15px 28px", fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", borderRadius: 2, border: "1px solid rgba(10,22,40,0.12)", color: "var(--navy)", transition: "all .25s ease" }}>
                        {aboutSection.cta.label}
                    </Link>
                </div>
            </div>
            <style>{`@media (max-width: 1080px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>
    );
}
