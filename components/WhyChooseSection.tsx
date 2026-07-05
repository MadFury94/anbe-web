import { whyChoose } from "@/src/data/content";

export default function WhyChooseSection() {
    return (
        <section style={{ paddingBottom: "110px", background: "var(--navy)" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ maxWidth: 640, marginBottom: 56 }}>
                    <div className="eyebrow" style={{ color: "var(--amber)" }}>{whyChoose.eyebrow}</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1, color: "#fff" }}>{whyChoose.heading}</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(247,245,240,0.14)", border: "1px solid rgba(247,245,240,0.14)" }} className="why-grid">
                    {whyChoose.reasons.map((r) => (
                        <div key={r.title} style={{ padding: "34px 32px", background: "var(--navy)" }}>
                            <h4 style={{ color: "#fff", fontSize: 16.5, marginBottom: 8, display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-space, sans-serif)" }}>
                                <span style={{ width: 7, height: 7, background: "var(--amber)", borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
                                {r.title}
                            </h4>
                            <p style={{ fontSize: 13.5, color: "rgba(247,245,240,0.62)", paddingLeft: 19 }}>{r.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`@media (max-width: 1080px) { .why-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>
    );
}
