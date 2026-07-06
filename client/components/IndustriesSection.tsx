import { industriesSection } from "@/src/data/content";

export default function IndustriesSection() {
    return (
        <section style={{ padding: "110px 0", background: "var(--navy)", color: "var(--paper)" }} id="industries">
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ maxWidth: 640, marginBottom: 56 }}>
                    <div className="eyebrow" style={{ color: "var(--amber)" }}>{industriesSection.eyebrow}</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1, color: "#fff" }}>{industriesSection.heading}</h2>
                    <p style={{ color: "rgba(247,245,240,0.68)", fontSize: 16, marginTop: 16, maxWidth: 560 }}>{industriesSection.body}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="industries-grid">
                    {industriesSection.items.map((ind) => (
                        <div key={ind.name} style={{ aspectRatio: "3/3.6", position: "relative", overflow: "hidden", background: "linear-gradient(200deg, #16283F, #0A1628)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24, border: "1px solid rgba(247,245,240,0.14)" }}>
                            <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "linear-gradient(rgba(232,135,58,0.08) 1px, transparent 1px)", backgroundSize: "100% 22px" }} />
                            <span style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 10.5, color: "var(--amber)", letterSpacing: "0.08em", textTransform: "uppercase", position: "relative", zIndex: 2, marginBottom: 8, display: "block" }}>{ind.tag}</span>
                            <h4 style={{ color: "#fff", fontSize: 16, position: "relative", zIndex: 2, fontFamily: "var(--font-space, sans-serif)" }}>{ind.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        @media (max-width: 1080px) { .industries-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 760px) { .industries-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
}
