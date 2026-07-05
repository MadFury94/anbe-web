import { useEffect, useRef, useState } from "react";
import { stats } from "@/src/data/content";

function useCountUp(target: number, duration = 1600, active = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        if (target === 0) { setCount(0); return; }
        let start: number | null = null;
        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, active]);
    return count;
}

function AnimCount({ target }: { target: number }) {
    const count = useCountUp(target, 1600, true);
    return <>{count}</>;
}

export default function StatsStrip() {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ background: "var(--charcoal)", padding: "64px 0" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }} className="stats-grid">
                {stats.map((s, i) => (
                    <div key={s.label} style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(247,245,240,0.14)", paddingLeft: i === 0 ? 0 : 22 }}>
                        <div style={{ fontFamily: "var(--font-space, sans-serif)", fontSize: "clamp(28px, 3vw, 40px)", color: "#fff", fontWeight: 700, display: "flex", alignItems: "baseline", gap: 2 }}>
                            {active ? <AnimCount target={s.value} /> : 0}
                            {s.suffix && <span style={{ color: "var(--amber)", fontSize: "0.6em" }}>{s.suffix}</span>}
                        </div>
                        <div style={{ fontFamily: "var(--font-ibm, monospace)", fontSize: 11, color: "var(--steel)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 8 }}>
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
        @media (max-width: 1080px) { .stats-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 760px)  { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
        </div>
    );
}
