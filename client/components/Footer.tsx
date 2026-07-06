import { useState } from "react";
import { Link } from "react-router-dom";
import { company, contact, footerColumns, socialLinks } from "@/src/data/content";

export default function Footer() {
    const [email, setEmail] = useState("");

    return (
        <footer style={{ background: "var(--navy)", padding: "80px 0 30px" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(3, 1fr) 1fr", gap: 40, paddingBottom: 56, borderBottom: "1px solid rgba(247,245,240,0.14)" }} className="footer-grid">
                    {/* Brand */}
                    <div>
                        <Link to="/" style={{ fontFamily: "var(--font-space, sans-serif)", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 12, height: 12, background: "var(--amber)", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", display: "inline-block", flexShrink: 0 }} />
                            {company.shortName}
                        </Link>
                        <p style={{ color: "var(--steel)", fontSize: 14, margin: "18px 0 22px", maxWidth: 280, lineHeight: 1.6 }}>{company.description}</p>
                        <div style={{ display: "flex", border: "1px solid rgba(247,245,240,0.14)", marginTop: 8 }}>
                            <input type="email" placeholder="Your email address" aria-label="Email for newsletter" value={email} onChange={(e) => setEmail(e.target.value)}
                                style={{ flex: 1, background: "none", border: "none", padding: "12px 14px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "var(--font-inter, sans-serif)" }} />
                            <button style={{ padding: "12px 18px", background: "var(--amber)", color: "var(--navy)", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>→</button>
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerColumns.map((col) => (
                        <div key={col.title}>
                            <h5 style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 11.5, color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20, fontWeight: 400 }}>{col.title}</h5>
                            {col.links.map((l) => (
                                <Link key={l.label} to={l.href} style={{ display: "block", color: "rgba(247,245,240,0.62)", fontSize: 14, marginBottom: 12, transition: "color .2s ease" }} className="footer-link">{l.label}</Link>
                            ))}
                        </div>
                    ))}

                    {/* Contact */}
                    <div>
                        <h5 style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 11.5, color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20, fontWeight: 400 }}>Contact</h5>
                        {[
                            { label: "Head Office", val: contact.address },
                            { label: "Phone", val: contact.phones[0] },
                            { label: "Email", val: contact.email },
                        ].map((item) => (
                            <div key={item.label} style={{ marginBottom: 16 }}>
                                <span style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 10, color: "var(--steel)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 3 }}>{item.label}</span>
                                <span style={{ color: "rgba(247,245,240,0.62)", fontSize: 14 }}>{item.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 26, flexWrap: "wrap", gap: 16 }}>
                    <p style={{ fontSize: 12.5, color: "var(--steel)" }}>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
                    <div style={{ display: "flex", gap: 16 }}>
                        {socialLinks.map((s) => (
                            <a key={s.label} href={s.href} style={{ width: 34, height: 34, border: "1px solid rgba(247,245,240,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--steel)", fontSize: 11, fontFamily: "var(--font-ibm, monospace)", transition: "all .2s ease", textDecoration: "none" }} className="social-icon">
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
        .footer-link:hover { color: #fff !important; }
        .social-icon:hover { border-color: var(--amber) !important; color: var(--amber) !important; }
        @media (max-width: 1080px) { .footer-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 760px) { .footer-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
        </footer>
    );
}
