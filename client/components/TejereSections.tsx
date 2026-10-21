import { useState } from "react";
import type { ReactNode } from "react";
import { tejere as t } from "../src/data/tejere";

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
  return (
    <section className="hero">
      <div className="flare-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">Energy services · Niger Delta</div>
          <h2 style={{ fontSize: "clamp(38px,5.2vw,68px)", color: "white" }}>
            Steel plus{" "}
            <em style={{ color: "var(--amber)", fontStyle: "normal" }}>
              consent.
            </em>
          </h2>
          <p className="lead" style={{ marginTop: 24 }}>
            {t.company.description}
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/contact">
              Request a briefing →
            </a>
            <a className="btn btn-ghost" href="/services">
              Explore Capabilities
            </a>
          </div>
          <div className="hero-meta">
            {t.stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <span className="num">{s.value}</span>
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-schematic">
          <span className="corner tl" />
          <span className="corner br" />
          <svg
            viewBox="0 0 400 420"
            role="img"
            aria-label="Illustrative pipeline corridor and host community"
          >
            <path
              d="M20 140Q130 80 200 190T400 270"
              stroke="#24404b"
              strokeWidth="30"
              fill="none"
            />
            <path
              d="M40 350H110L180 260H245L310 180H360"
              stroke="#E8873A"
              strokeWidth="3"
              fill="none"
            />
            {[
              [110, 350, "VALVE STATION"],
              [180, 260, "CREEK CROSSING"],
              [310, 180, "HOST COMMUNITY"],
            ].map(([x, y, label]) => (
              <g key={label}>
                <circle
                  cx={x}
                  cy={y}
                  r="9"
                  fill="#0A1628"
                  stroke="#E8873A"
                  strokeWidth="2"
                />
                <text
                  x={Number(x) - 50}
                  y={Number(y) - 25}
                  fill="#8B95A1"
                  fontSize="10"
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="section-pad" id="about">
      <div className="container about-grid">
        <div className="reveal about-visual">
          <img
            className="leadership-image"
            src={t.leadership.photo}
            alt={t.leadership.name}
          />
          <div className="badge">
            <strong>{t.leadership.name}</strong>
            {t.leadership.role}
          </div>
        </div>
        <div className="reveal">
          <div className="eyebrow">About Tejere Anderson Services</div>
          <h2>Pipeline protection built around people and place.</h2>
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
          title="Security, support and community partnership."
        >
          Practical services for upstream operations and pipeline corridors
          across the Niger Delta.
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
                  stroke="#E8873A"
                  strokeWidth="1.5"
                />
                <path
                  d="M14 30L20 18L26 24L32 12"
                  stroke="#0A1628"
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
          title="Three terrains, one map."
        >
          Onshore, swamp and creek each carry different risks. We plan for each
          one on its own terms.
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
              <img className="terrain-image" src={item.image} alt="" loading="lazy" width={1536} height={1024} />
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
    <section className="section-pad on-dark" id="approach">
      <div className="container">
        <SectionHeading
          eyebrow="How We Work"
          title="Build agreement. Protect it."
        >
          A pipeline stays secure when the people along it agree it should. Our
          process builds that agreement, then protects it.
        </SectionHeading>
        <div className="why-grid reveal">
          {t.approach.map((a, i) => (
            <article className="why-item" key={a.title}>
              <h4>
                0{i + 1} · {a.title}
              </h4>
              <p>{a.desc}</p>
            </article>
          ))}
        </div>
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
          <h2>Smart Petroleum Governance</h2>
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
          title="Talk to us about your corridor."
        >
          Tell us where you operate and what you need protected.
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
          <h2>Let’s talk about your corridor.</h2>
          <p>
            Pipeline security, oilfield support and community risk management.
          </p>
        </div>
        <a href="/contact" className="btn btn-primary">
          Request a briefing →
        </a>
      </div>
    </section>
  );
}
