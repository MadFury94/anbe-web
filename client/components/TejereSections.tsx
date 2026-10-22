import { useState } from "react";
import type { ReactNode } from "react";
import { tejere as t } from "../src/data/tejere";
import UpstreamField from "./UpstreamField";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-head reveal">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function PageHero({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-hero">
      <div className="flare-glow" aria-hidden="true" />
      <div className="container page-hero-inner">
        <div className="breadcrumb">
          <a href="/">Home</a> / {label}
        </div>
        <div className="eyebrow">{label}</div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

export function Hero() {
  return <section className="intro-hero"><div className="container intro-grid">
    <div><div className="eyebrow">Upstream & exploration · Niger Delta</div>
      <h1>Upstream, built with <em>the community.</em></h1><p className="intro-lead">{t.company.description}</p>
      <div className="hero-actions"><a className="btn btn-primary" href="/contact">Request a briefing →</a><a className="btn btn-dark" href="/services">See our services →</a></div>
      <p className="intro-footnote">ONSHORE / SWAMP / CREEK / DEEP OFFSHORE</p>
      <div className="intro-signature"><span className="signature-line"/><span>Local knowledge.<br/><strong>From the first survey onward.</strong></span></div>
    </div>
    <UpstreamField />
  </div></section>;
}

export function CommunitySection() {
  return <section className="section-pad community-section" id="community"><div className="container community-grid">
    <figure><img src="/images/concept-1.jpg" alt="Tejere Jolomi Thomas with Government Oweizide Ekpemupolo" width="664" height="886" loading="lazy"/><figcaption>Tejere Jolomi Thomas with Government Oweizide Ekpemupolo, popularly known as Tompolo.</figcaption></figure>
    <div><div className="eyebrow">Community relationships</div><h2>Rooted in the Niger Delta</h2><p>Upstream work in the Niger Delta succeeds when it is built on trust with the region’s leaders and communities.</p><p>Tejere is an associate of Government Oweizide Ekpemupolo, popularly known as Tompolo, a Niger Delta leader.</p></div>
  </div></section>;
}

export function AboutSection() {
  return (
    <section className="section-pad" id="about">
      <div className="container about-grid">
        <div className="reveal about-visual">
          <img
            className="leadership-image"
            src="/images/tejere-portrait.jpg"
            alt={t.leadership.name}
          />
          <div className="badge">
            <strong>{t.leadership.name}</strong>
            {t.leadership.role}
          </div>
        </div>
        <div className="reveal">
          <div className="eyebrow">About Tejere Anderson Services</div>
          <h2>Upstream expertise. Community understanding.</h2>
          <p style={{ marginTop: 18, color: "var(--steel-dark)" }}>
            {t.company.description}
          </p>
          <ul className="values-list">
            {t.governance.map((v) => (
              <li key={v.title}>
                <strong>{v.title}</strong>
                <span>{v.desc}</span>
              </li>
            ))}
            <li>
              <strong>Local knowledge</strong>
              <span>
                First-hand understanding of onshore, swamp and creek terrain.
              </span>
            </li>
          </ul>
          <a href="/about" className="btn btn-dark" style={{ marginTop: 30 }}>
            Meet our leadership →
          </a>
        </div>
      </div>
    </section>
  );
}

export function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="container stats-grid">
        {t.stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="val">{s.value}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartnersStrip() {
  return (
    <div className="partners-strip">
      <div className="container">
        <p className="partners-label">Partners</p>
      </div>
      <div className="partners-track-wrap">
        <div className="partners-track">
          {[...t.partners, ...t.partners].map((p, i) => (
            <div
              className="p-logo-box placeholder-logo"
              key={i}
              aria-hidden={i >= t.partners.length}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="section-pad" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="Our Services"
          title="Three services that work as one."
        >
          Run the upstream work well, explore responsibly, and develop the community programmes that keep operations welcome.
        </SectionHeading>
        <div className="services-grid reveal">
          {t.services.map((s, i) => (
            <article className="service-card" id={s.id} key={s.id}>
              <div className="idx">
                0{i + 1} — {s.title.toUpperCase()}
              </div>
              <svg
                className="icon"
                viewBox="0 0 44 44"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="6"
                  y="6"
                  width="32"
                  height="32"
                  stroke="#b8892f"
                  strokeWidth="1.5"
                />
                <path
                  d="M14 30L20 18L26 24L32 12"
                  stroke="#0e2236"
                  strokeWidth="1.5"
                />
              </svg>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-features">
                {s.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="/contact" className="learn">
                Discuss a Scope <span className="arrow">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TerrainSection() {
  const [active, setActive] = useState(0);
  const terrain = t.terrains[active];
  return (
    <section className="section-pad on-dark" id="terrain">
      <div className="container">
        <SectionHeading
          eyebrow="Where We Work"
          title="Four settings. Local understanding."
        >
          Onshore, swamp, creek and deep offshore: each brings its own access, logistics and community questions.
        </SectionHeading>
        <div
          className="industries-grid terrain-grid"
          role="tablist"
          aria-label="Terrain"
        >
          {t.terrains.map((item, i) => (
            <button
              type="button"
              role="tab"
              id={`terrain-${i}`}
              aria-controls="terrain-details"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              key={item.title}
              className={`industry-card terrain-choice ${active === i ? "selected" : ""}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                let next: number;
                if (e.key === "ArrowRight") next = (i + 1) % t.terrains.length;
                else if (e.key === "ArrowLeft")
                  next = (i + t.terrains.length - 1) % t.terrains.length;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = t.terrains.length - 1;
                else return;
                e.preventDefault();
                setActive(next);
                document.getElementById(`terrain-${next}`)?.focus();
              }}
            >
              {item.image ? <img className="terrain-image" src={item.image} alt="" loading="lazy" width={1536} height={1024} /> : <div className="offshore-art" aria-hidden="true"><svg viewBox="0 0 300 200"><path d="M0 160 Q40 145 80 160 T160 160 T240 160 T320 160 M0 180 Q40 165 80 180 T160 180 T240 180 T320 180 M100 150 V100 H220 V150 M90 100 H230 M120 100 L150 35 L180 100 M133 72 H167 M195 100 V65" fill="none" stroke="currentColor" strokeWidth="3"/></svg></div>}
              <span className="tag">Niger Delta</span>
              <span className="terrain-title">{item.title}</span>
            </button>
          ))}
        </div>
        <div
          className="terrain-details"
          role="tabpanel"
          id="terrain-details"
          aria-labelledby={`terrain-${active}`}
          tabIndex={0}
        >
          <h3>{terrain.title}</h3>
          <p>{terrain.desc}</p>
          <dl>
            <dt>Main concern</dt>
            <dd>{terrain.concern}</dd>
            <dt>Our approach</dt>
            <dd>{terrain.approach}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function TrackRecord() {
  return (
    <section className="section-pad" id="track">
      <div className="container">
        <SectionHeading
          eyebrow="Leadership Track Record"
          title="Escravos Gas-to-Liquids."
        >
          Tejere was recruited for the Escravos Gas-to-Liquids (EGTL) project in
          Delta State, which ran from January 2011 to July 2013. This is our
          CEO’s professional experience.
        </SectionHeading>
        <div className="projects-preview reveal">
          {t.track.map((m) => (
            <article className="proj-card" key={m.date}>
              <div className="proj-thumb">
                <span className="zoom-tag">EGTL · Delta State</span>
                <span className="milestone-art" aria-hidden="true">
                  {m.date.split(" ")[1]}
                </span>
              </div>
              <div className="proj-body">
                <div className="client">{m.date}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApproachSection() {
  return (
    <section className="section-pad lifecycle" id="approach">
      <div className="container">
        <SectionHeading
          eyebrow="How We Work"
          title="The upstream lifecycle."
        >
          Every stage touches the people who live nearby. We plan the technical work and the community programme together.
        </SectionHeading>
        <ol className="lifecycle-steps" aria-label="Upstream lifecycle stages">
          {t.approach.map((a, i) => (
            <li className="lifecycle-step" key={a.title}>
              <span className="lifecycle-number" aria-hidden="true">0{i + 1}</span>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
              <span className="lifecycle-outcome"><span aria-hidden="true">✓</span>{["Agree access early", "Keep neighbours informed", "Plan with the community", "Review and report openly"][i]}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function GovernanceSection() {
  return (
    <section className="section-pad" id="governance">
      <div className="container sustain-grid">
        <div className="reveal">
          <div className="eyebrow">Our Approach</div>
          <h2>Smart Petroleum Governance</h2><blockquote className="governance-quote">{t.governanceQuote}</blockquote>
          <div className="sustain-list" style={{ marginTop: 30 }}>
            {t.governance.map((g, i) => (
              <div className="row" key={g.title}>
                <span className="n">0{i + 1}</span>
                <div>
                  <h4>{g.title}</h4>
                  <p>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal sustain-visual governance-image">
          <img
            src="/Overcast Niger Delta metering station (1) (1).png"
            alt={`Niger Delta metering station. ${t.governanceQuote}`}
            width={1254}
            height={1254}
          />
        </div>
      </div>
    </section>
  );
}

export function LeadershipSection() {
  return (
    <section className="section-pad on-dark" id="leadership">
      <div className="container ceo-grid">
        <div className="reveal ceo-photo">
          <img src={t.leadership.photo} alt={t.leadership.name} />
          <div className="ceo-tag">
            <strong>{t.leadership.name}</strong>
            <span>{t.leadership.role}</span>
          </div>
        </div>
        <div className="reveal">
          <div className="eyebrow">Leadership</div>
          <h2>{t.leadership.name}</h2>
          {t.leadership.bio.map((p) => (
            <p key={p} style={{ marginTop: 24 }}>
              {p}
            </p>
          ))}
          <ul className="leadership-facts">
            {t.leadership.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="section-pad on-dark">
      <div className="container testi-wrap">
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          Client Feedback
        </div>
        <p style={{ color: "var(--steel)", fontSize: 13, marginBottom: 28 }}>Demo testimonials — illustrative feedback, not actual client endorsements.</p>
        {t.testimonials.map((item, i) => (
          <div key={i} className={`testi-slide${i === active ? " active" : ""}`}>
            <p className="testi-quote">{item.quote}</p>
            <div className="testi-person">
              {item.name}
              <span>{item.org}</span>
            </div>
          </div>
        ))}
        <div className="testi-dots">
          {t.testimonials.map((_, i) => (
            <button type="button" key={i} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={`Show demo testimonial ${i + 1}`} aria-pressed={i === active} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function News() {
  return (
    <section className="section-pad" id="news">
      <div className="container">
        <SectionHeading
          eyebrow="News & Insights"
          title="From our corridors and communities."
        />
        <div className="news-grid reveal">
          {t.news.map((item, i) => (
            <article className="news-card" key={i}>
              <div className="news-thumb">
                <span className="cat">{item.category}</span>
              </div>
              <div className="news-body">
                <div className="date">{item.date}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section-pad" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to us about your upstream project."
        >
          Tell us where you operate or plan to explore, and the support your project needs.
        </SectionHeading>
        <div className="contact-grid reveal">
          <div className="contact-info">
            {Object.entries({
              Address: t.contact.address,
              Phone: t.contact.phone,
              Email: t.contact.email,
              "Business hours": t.contact.hours,
            }).map(([label, value]) => (
              <div className="item" key={label}>
                <div className="lbl">{label}</div>
                <div className="val">{value}</div>
              </div>
            ))}
            <div className="map-box">
              <div className="grid-overlay" />
              <span>Office location: {t.contact.address}</span>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={(e) => e.preventDefault()}
            aria-describedby="contact-note"
          >
            <div className="form-row">
              <div className="field">
                <label htmlFor="fname">Full Name</label>
                <input id="fname" name="name" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="fcompany">Organisation</label>
                <input
                  id="fcompany"
                  name="organisation"
                  autoComplete="organization"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="femail">Email</label>
                <input
                  id="femail"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </div>
              <div className="field">
                <label htmlFor="fphone">Phone</label>
                <input id="fphone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="fscope">Scope of Interest</label>
              <select id="fscope" name="scope">
                {t.services.map((s) => (
                  <option key={s.id}>{s.title}</option>
                ))}
                <option>Something else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="fmessage">Message</label>
              <textarea id="fmessage" name="message" />
            </div>
            <button className="btn btn-primary" type="submit" disabled>
              Send enquiry →
            </button>
            <p id="contact-note" className="contact-note">
              Online enquiries are not available yet. Nothing entered here is
              sent or saved.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <h2>Let’s talk about your upstream project.</h2>
          <p>
            Upstream operations, exploration support and community programmes.
          </p>
        </div>
        <a href="/contact" className="btn btn-primary">
          Request a briefing →
        </a>
      </div>
    </section>
  );
}
