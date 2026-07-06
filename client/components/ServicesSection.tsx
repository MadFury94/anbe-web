import { Link } from "react-router-dom";
import { services, servicesPage } from "@/src/data/content";

const icons = [
    <svg key="1" viewBox="0 0 44 44" fill="none" width={44} height={44}><rect x="6" y="6" width="32" height="32" rx="1" stroke="#E8873A" strokeWidth="1.5" /><path d="M14 30 L20 18 L26 24 L32 12" stroke="#0A1628" strokeWidth="1.5" /></svg>,
    <svg key="2" viewBox="0 0 44 44" fill="none" width={44} height={44}><path d="M8 34 L8 20 L22 20 L22 8 L36 8 L36 34" stroke="#E8873A" strokeWidth="1.5" fill="none" /><circle cx="22" cy="34" r="2" fill="#0A1628" /></svg>,
    <svg key="3" viewBox="0 0 44 44" fill="none" width={44} height={44}><rect x="8" y="12" width="28" height="20" rx="1" stroke="#E8873A" strokeWidth="1.5" /><path d="M8 18 H36" stroke="#0A1628" strokeWidth="1.5" /></svg>,
    <svg key="4" viewBox="0 0 44 44" fill="none" width={44} height={44}><path d="M10 34 L34 34 M14 34 L14 20 L30 20 L30 34" stroke="#E8873A" strokeWidth="1.5" fill="none" /><circle cx="22" cy="14" r="4" stroke="#0A1628" strokeWidth="1.5" /></svg>,
    <svg key="5" viewBox="0 0 44 44" fill="none" width={44} height={44}><circle cx="22" cy="22" r="14" stroke="#E8873A" strokeWidth="1.5" /><path d="M22 14 V22 L28 26" stroke="#0A1628" strokeWidth="1.5" /></svg>,
    <svg key="6" viewBox="0 0 44 44" fill="none" width={44} height={44}><path d="M22 8 C 30 8 36 14 36 22 C 36 30 30 36 22 36 C 14 36 8 30 8 22" stroke="#E8873A" strokeWidth="1.5" fill="none" /><path d="M8 22 L14 22 L11 28 Z" fill="#0A1628" /></svg>,
];

export default function ServicesSection() {
    return (
        <section style={{ padding: "110px 0", background: "var(--paper)" }} id="services">
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ maxWidth: 640, marginBottom: 56 }}>
                    <div className="eyebrow">EPC Capability</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1 }}>{servicesPage.sectionHeading}</h2>
                    <p style={{ color: "var(--steel-dark)", fontSize: 16, marginTop: 16, maxWidth: 560 }}>{servicesPage.sectionBody}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(10,22,40,0.12)", border: "1px solid rgba(10,22,40,0.12)" }} className="services-grid">
                    {services.map((s, i) => (
                        <div key={s.idx} style={{ background: "var(--paper)", padding: "40px 34px", position: "relative", transition: "background .3s ease" }} className="service-card">
                            <div style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 12, color: "var(--amber)", letterSpacing: "0.08em" }}>{s.idx}</div>
                            <div style={{ margin: "20px 0 22px" }}>{icons[i]}</div>
                            <h3 style={{ fontSize: 19, marginBottom: 12, fontFamily: "var(--font-space, sans-serif)" }}>{s.title}</h3>
                            <p style={{ fontSize: 14.5, color: "var(--steel-dark)", marginBottom: 22 }}>{s.desc}</p>
                            <Link to="/services" style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                                Discuss a Scope <span>→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        .service-card:hover { background: #fff !important; }
        @media (max-width: 1080px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 760px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
}
