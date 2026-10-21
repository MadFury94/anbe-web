import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { tejere } from "../src/data/tejere";
const VEX_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);
  return (
    <div
      className={`transition-opacity ${visible ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

function AnimatedHeading({
  text,
  delay = 200,
  charDelay = 30,
}: {
  text: string;
  delay?: number;
  charDelay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const lines = text.split("\n");
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);
  return (
    <h1
      className="mb-4 text-4xl font-normal text-white md:text-5xl lg:text-6xl xl:text-7xl"
      style={{ letterSpacing: "-0.04em" }}
    >
      {lines.map((line, lineIndex) => (
        <span className="block" key={`${line}-${lineIndex}`}>
          {Array.from(line).map((character, charIndex) => (
            <span
              className="inline-block transition-[opacity,transform] duration-500"
              key={`${lineIndex}-${charIndex}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-18px)",
                transitionDelay: `${lineIndex * line.length * charDelay + charIndex * charDelay}ms`,
              }}
            >
              {character === " " ? "\u00A0" : character}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function VideoHero() {
  return (
    <section className="vex-hero relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VEX_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="container relative z-10 flex min-h-screen flex-col pt-16">
        <div className="flex flex-1 flex-col justify-end pb-12 lg:pb-20">
          <div className="gap-10 lg:grid lg:grid-cols-2 lg:items-end">
            <div>
              <AnimatedHeading text={tejere.hero.subheading} />
              <FadeIn delay={800}>
                <p className="mb-5 text-base text-gray-300 md:text-lg">
                  {tejere.company.description}
                </p>
              </FadeIn>
              <FadeIn delay={1200}>
                <div className="flex flex-wrap gap-4">
                  <a href="/contact" className="btn btn-primary">
                    Request a briefing →
                  </a>
                  <a href="#about" className="btn btn-ghost">
                    Explore Now
                  </a>
                </div>
              </FadeIn>
            </div>
            <FadeIn
              delay={1400}
              className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end"
            >
              <div className="vex-tag px-6 py-3">
                <p className="text-lg font-light md:text-xl lg:text-2xl">
                  {tejere.hero.tagline}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
