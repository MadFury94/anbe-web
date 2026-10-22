import { tejere as t } from "../src/data/tejere";

export default function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="/" className="tejere-brand">
              <strong>{t.company.shortName}</strong>
              <small>SERVICES</small>
            </a>
            <p>{t.company.description}</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>Company</h5>
              <a href="/about">About Us</a>
              <a href="/about#leadership">Leadership</a>
              <a href="/blog">Insights</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="footer-col">
              <h5>Services</h5>
              {t.services.map((s) => (
                <a href={`/services#${s.id}`} key={s.id}>
                  {s.title}
                </a>
              ))}
            </div>
            <div className="footer-col">
              <h5>Our Approach</h5>
              <a href="/projects">Track Record</a>
              <a href="/services#terrain">Our operating environments</a>
              <a href="/services#approach">How We Work</a>
              <a href="/about#governance">Smart Petroleum Governance</a>
            </div>
            <div className="footer-col">
              <h5>Contact</h5>
              <span className="contact-label">Phone</span>
              <span className="contact-value">{t.contact.phone}</span>
              <span className="contact-label">Email</span>
              <span className="contact-value">{t.contact.email}</span>
              <span className="contact-label">Address</span>
              <span className="contact-value">{t.contact.address}</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} {t.company.name}. All rights
              reserved.
            </p>
            <div className="footer-socials">
              Social links: {t.contact.social}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
