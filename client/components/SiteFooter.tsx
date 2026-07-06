"use client";

const FOOTER_CSS = `
  .site-footer { background:#0A1628; padding:60px 0 0; }
  .footer-inner { max-width:1240px; margin:0 auto; padding:0 32px; }

  /* Brand row */
  .footer-brand { margin-bottom:48px; }
  .footer-brand img { height:36px; width:auto; display:block; margin-bottom:16px; }
  .footer-brand p { font-family:'Inter',sans-serif; font-size:14px; color:#8B95A1; line-height:1.7; max-width:320px; }

  /* Newsletter */
  .footer-newsletter { display:flex; margin-top:20px; border:1px solid rgba(247,245,240,0.14); max-width:320px; }
  .footer-newsletter input { flex:1; background:none; border:none; padding:11px 14px; color:#fff; font-size:13px; font-family:'Inter',sans-serif; outline:none; min-width:0; }
  .footer-newsletter input::placeholder { color:#8B95A1; }
  .footer-newsletter button { padding:11px 16px; background:#E8873A; color:#0A1628; font-size:13px; font-weight:600; border:none; cursor:pointer; font-family:'Inter',sans-serif; white-space:nowrap; }

  /* Links grid */
  .footer-links { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; padding-bottom:48px; border-bottom:1px solid rgba(247,245,240,0.1); }
  .footer-col h5 { font-family:'IBM Plex Mono',monospace; font-size:11px; color:#E8873A; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:16px; }
  .footer-col a { display:block; font-family:'Inter',sans-serif; color:rgba(247,245,240,0.6); font-size:14px; margin-bottom:10px; text-decoration:none; transition:color .2s; }
  .footer-col a:hover { color:#fff; }

  /* Bottom bar */
  .footer-bottom { display:flex; justify-content:space-between; align-items:center; padding:20px 0; flex-wrap:wrap; gap:12px; }
  .footer-bottom p { font-family:'IBM Plex Mono',monospace; font-size:11.5px; color:#8B95A1; }
  .footer-socials { display:flex; gap:12px; }
  .footer-socials a { width:32px; height:32px; border:1px solid rgba(247,245,240,0.14); display:flex; align-items:center; justify-content:center; color:#8B95A1; font-size:12px; text-decoration:none; font-family:'IBM Plex Mono',monospace; transition:all .2s; }
  .footer-socials a:hover { border-color:#E8873A; color:#E8873A; }

  /* Mobile */
  @media(max-width:760px) {
    .site-footer { padding:48px 0 0; }
    .footer-inner { padding:0 20px; }
    .footer-brand { margin-bottom:36px; }
    .footer-brand p { max-width:100%; }
    .footer-newsletter { max-width:100%; }
    .footer-links { grid-template-columns:1fr 1fr; gap:28px; }
    .footer-bottom { flex-direction:column; align-items:flex-start; gap:16px; }
  }
  @media(max-width:400px) {
    .footer-links { grid-template-columns:1fr; }
  }
`;

export default function SiteFooter() {
    return (
        <>
            <style>{FOOTER_CSS}</style>
            <footer className="site-footer">
                <div className="footer-inner">

                    {/* Brand + newsletter */}
                    <div className="footer-brand">
                        <a href="/"><img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" /></a>
                        <p>An indigenous engineering company delivering pipeline construction, fabrication, and flare systems to Nigeria's oil &amp; gas sector since 1990.</p>
                        <div className="footer-newsletter">
                            <input type="email" placeholder="Your email address" aria-label="Subscribe to newsletter" />
                            <button type="button">Subscribe</button>
                        </div>
                    </div>

                    {/* Link columns */}
                    <div className="footer-links">
                        <div className="footer-col">
                            <h5>Company</h5>
                            <a href="/about">About Us</a>
                            <a href="/about">Our Team</a>
                            <a href="/blog">News &amp; Blog</a>
                            <a href="/contact">Contact</a>
                        </div>
                        <div className="footer-col">
                            <h5>Services</h5>
                            <a href="/services">Pipeline Construction</a>
                            <a href="/services">Flare Systems</a>
                            <a href="/services">Fabrication</a>
                            <a href="/services">Procurement</a>
                            <a href="/services">Maintenance</a>
                        </div>
                        <div className="footer-col">
                            <h5>Projects</h5>
                            <a href="/projects">All Projects</a>
                            <a href="/projects">Flare Systems</a>
                            <a href="/projects">Pipeline Work</a>
                            <a href="/projects">Fabrication</a>
                        </div>
                        <div className="footer-col">
                            <h5>Contact</h5>
                            <a href="tel:+2348033100539">+234 803 310 0539</a>
                            <a href="tel:+2348037753444">+234 803 775 3444</a>
                            <a href="mailto:info@anbenig.com">info@anbenig.com</a>
                            <a href="/contact">Port Harcourt, Nigeria</a>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="footer-bottom">
                        <p>© 2026 ANBE Nigeria Limited. All rights reserved.</p>
                        <div className="footer-socials">
                            <a href="#" aria-label="LinkedIn">in</a>
                            <a href="#" aria-label="Twitter">x</a>
                            <a href="#" aria-label="Facebook">f</a>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}
