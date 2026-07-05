import React, { useState } from "react";
import { contact, contactScopes } from "@/src/data/content";

export default function ContactSection() {
    const [status, setStatus] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("Thank you — we'll respond within one business day.");
    }

    const contactItems = [
        { lbl: "Head Office", val: contact.address, sub: contact.country },
        { lbl: "Phone", val: contact.phones[0], sub: contact.phones[1] },
        { lbl: "Email", val: contact.email, sub: "" },
        { lbl: "Business Hours", val: contact.fieldResponse, sub: `Office: ${contact.officeHours}` },
    ];

    return (
        <section style={{ padding: "110px 0", background: "var(--paper)" }} id="contact">
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ maxWidth: 640, marginBottom: 56 }}>
                    <div className="eyebrow">Contact</div>
                    <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.1 }}>Talk to us about your next scope.</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64 }} className="contact-grid">
                    {/* Info */}
                    <div>
                        {contactItems.map((item, i) => (
                            <div key={item.lbl} style={{ borderTop: i === 0 ? "none" : "1px solid rgba(10,22,40,0.12)", padding: i === 0 ? "0 0 22px" : "22px 0" }}>
                                <div style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 11, color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{item.lbl}</div>
                                <div style={{ fontSize: 16, color: "var(--navy)", fontWeight: 500 }}>
                                    {item.val}
                                    {item.sub && <small style={{ display: "block", fontSize: 13, color: "var(--steel-dark)", fontWeight: 400, marginTop: 4 }}>{item.sub}</small>}
                                </div>
                            </div>
                        ))}
                        <div style={{ aspectRatio: "16/9", background: "var(--paper-2)", border: "1px solid rgba(10,22,40,0.12)", marginTop: 26, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                            <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(10,22,40,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,22,40,0.06) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
                            <span style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 12, color: "var(--steel-dark)", letterSpacing: "0.06em", position: "relative", zIndex: 2 }}>
                                MAP — {contact.address.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row">
                            <Field label="Full Name" id="fname" type="text" required />
                            <Field label="Company" id="fcompany" type="text" />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row">
                            <Field label="Email" id="femail" type="email" required />
                            <Field label="Phone" id="fphone" type="tel" />
                        </div>
                        <div>
                            <label htmlFor="fscope" style={{ display: "block", fontFamily: "var(--font-ibm, monospace)", fontSize: 11, color: "var(--steel-dark)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Scope of Interest</label>
                            <select id="fscope" style={{ width: "100%", border: "1px solid rgba(10,22,40,0.12)", background: "#fff", padding: "13px 14px", fontFamily: "var(--font-inter, sans-serif)", fontSize: 14.5, color: "var(--ink)", borderRadius: 2 }}>
                                {contactScopes.map((s) => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fmessage" style={{ display: "block", fontFamily: "var(--font-ibm, monospace)", fontSize: 11, color: "var(--steel-dark)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Message</label>
                            <textarea id="fmessage" required style={{ width: "100%", border: "1px solid rgba(10,22,40,0.12)", background: "#fff", padding: "13px 14px", fontFamily: "var(--font-inter, sans-serif)", fontSize: 14.5, color: "var(--ink)", borderRadius: 2, resize: "vertical", minHeight: 120 }} />
                        </div>
                        <button type="submit" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", borderRadius: 2, background: "var(--amber)", color: "var(--navy)", border: "none", cursor: "pointer" }}>
                            Send Message →
                        </button>
                        {status && <p style={{ fontSize: 13, color: "var(--amber)" }}>{status}</p>}
                    </form>
                </div>
            </div>
            <style>{`
        @media (max-width: 1080px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 760px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
}

function Field({ label, id, type, required }: { label: string; id: string; type: string; required?: boolean }) {
    return (
        <div>
            <label htmlFor={id} style={{ display: "block", fontFamily: "var(--font-ibm, monospace)", fontSize: 11, color: "var(--steel-dark)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{label}</label>
            <input id={id} type={type} required={required} style={{ width: "100%", border: "1px solid rgba(10,22,40,0.12)", background: "#fff", padding: "13px 14px", fontFamily: "var(--font-inter, sans-serif)", fontSize: 14.5, color: "var(--ink)", borderRadius: 2, transition: "border-color .2s ease" }} />
        </div>
    );
}
