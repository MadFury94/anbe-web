import { clients } from "@/src/data/content";

export default function ClientLogos() {
    return (
        <section style={{ background: "var(--charcoal)", padding: "56px 0", borderTop: "1px solid rgba(247,245,240,0.08)", borderBottom: "1px solid rgba(247,245,240,0.08)" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
                <p style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 11, color: "var(--steel)", letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center", marginBottom: 36 }}>
                    Trusted by leading operators
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
                    {clients.map((c) => (
                        <div key={c.name} style={{ position: "relative", width: 140, height: 56, filter: "brightness(0) invert(1)", opacity: 0.55, transition: "opacity .25s ease" }} className="client-logo">
                            <img src={c.logo} alt={c.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                    ))}
                </div>
            </div>
            <style>{`.client-logo:hover { opacity: 1 !important; }`}</style>
        </section>
    );
}
