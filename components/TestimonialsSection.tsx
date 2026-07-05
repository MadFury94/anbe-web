import { useState } from "react";
import { testimonials } from "@/src/data/content";

export default function TestimonialsSection() {
    const [active, setActive] = useState(0);

    return (
        <section style={{ padding: "110px 0", background: "var(--navy)", borderTop: "1px solid rgba(247,245,240,0.08)" }}>
            <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
                <div className="eyebrow" style={{ color: "var(--amber)", justifyContent: "center" }}>Client Feedback</div>

                <div style={{ minHeight: 180 }}>
                    {testimonials.map((t, i) => (
                        <div key={i} style={{ display: i === active ? "block" : "none", animation: i === active ? "fadeUp .5s ease" : "none" }}>
                            <p style={{ fontFamily: "var(--font-space, sans-serif)", fontSize: "clamp(20px, 2.6vw, 28px)", color: "#fff", lineHeight: 1.4, marginBottom: 28, fontWeight: 500 }}>
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 12.5, color: "var(--amber)", letterSpacing: "0.04em" }}>
                                {t.name}
                                <span style={{ color: "var(--steel)", display: "block", marginTop: 4 }}>{t.company}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 40 }}>
                    {testimonials.map((_, i) => (
                        <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`}
                            style={{ width: 8, height: 8, borderRadius: "50%", background: i === active ? "var(--amber)" : "rgba(247,245,240,0.14)", border: "none", cursor: "pointer", transition: "background .25s", padding: 0 }}
                        />
                    ))}
                </div>
            </div>
            <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </section>
    );
}
