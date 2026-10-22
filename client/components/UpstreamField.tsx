import { useState } from "react";

const points = [
  { title: "Host community", label: "Community", x: 15, y: 39, note: "People before the first survey.", text: "Host communities are consulted before any crew arrives. Community programmes are agreed alongside the work plan." },
  { title: "Seismic survey", label: "Survey", x: 36, y: 46, note: "Understand the ground. Agree access.", text: "Exploration starts with surveying the ground. Early talks with the people who live on that ground keep access open." },
  { title: "Exploration well", label: "Exploration", x: 60, y: 34, note: "Keep neighbours part of the plan.", text: "Wells are where plans meet reality. Clear, regular communication with neighbours keeps the site welcome." },
  { title: "Production", label: "Production", x: 84, y: 41, note: "Stay connected as production grows.", text: "When production begins, community programmes carry on: reviewed regularly and reported openly." },
];

export default function UpstreamField() {
  const [active, setActive] = useState(0);
  const point = points[active];
  return (
    <div className="field-explorer" aria-label="Explore an upstream field">
      <div className="field-heading"><span>FIELD NOTES / NIGER DELTA</span><span>01—04</span></div>
      <div className={`field-scene field-stage-${active}`}>
        <svg viewBox="0 0 640 420" aria-hidden="true" focusable="false">
          <defs>
            <pattern id="field-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#dbe3de" strokeWidth=".6"/></pattern>
            <pattern id="field-rock" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r=".8" fill="#b9ad91"/></pattern>
          </defs>
          <rect width="640" height="420" fill="url(#field-grid)"/>
          <text x="30" y="38" className="drawing-label">SURFACE / PEOPLE & OPERATIONS</text>
          <path d="M30 210L320 140L610 220L320 305Z" fill="#e3e9df" stroke="#80958b"/>
          <path d="M30 210L320 305V385L30 290Z" fill="#dbd2bf"/>
          <path d="M320 305L610 220V300L320 385Z" fill="#c4b99f"/>
          <path d="M30 241L320 337L610 252V279L320 364L30 267Z" fill="#e9e1cd"/>
          <path d="M30 210L320 305V385L30 290Z" fill="url(#field-rock)"/>
          <path d="M30 290L320 385L610 300" fill="none" stroke="#9c927d"/>
          <path d="M60 219C150 184 196 244 263 235S363 172 427 195S518 264 580 229" stroke="#b4d4ce" strokeWidth="19" fill="none"/>
          <path d="M60 219C150 184 196 244 263 235S363 172 427 195S518 264 580 229" stroke="#76a8a0" strokeWidth="1.5" fill="none"/>
          <path d="M100 208L226 236L385 188L532 224" stroke="#fffaf0" strokeWidth="8" fill="none"/>
          <path d="M100 208L226 236L385 188L532 224" stroke="#b8892f" strokeWidth="2" strokeDasharray="4 5" fill="none"/>
          {/* Village, with pitched roofs and a shared access route. */}
          <g stroke="#24453f" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M70 183V160L91 149L113 163V187L91 197Z" fill="#faf8ef"/><path d="M65 161L90 139L118 162L92 174Z" fill="#567b68"/><path d="M92 174V197M100 181V190" fill="none"/>
            <path d="M122 198V176L142 166L161 180V202L142 211Z" fill="#faf8ef"/><path d="M117 177L141 156L166 178L143 188Z" fill="#819682"/><path d="M143 188V211"/>
            <path d="M90 219v-19m-7 11h14"/><path d="M178 192v-25m-8 15h16"/>
          </g>
          {/* Survey truck and geophone line. */}
          <g stroke="#173b40" strokeWidth="2" strokeLinejoin="round">
            <path d="M202 220V202L231 194L247 202V222L218 232Z" fill="#f8f4e7"/><path d="M231 194V213L247 222M202 202L218 211L247 202" fill="none"/>
            <circle cx="211" cy="226" r="5" fill="#173b40"/><circle cx="240" cy="223" r="5" fill="#173b40"/>
            <path d="M255 234L304 249" strokeDasharray="2 7"/>
          </g>
          <g className="survey-waves" fill="none" stroke="#1f6f6b" strokeWidth="1.5"><path d="M211 251Q232 275 253 251"/><path d="M199 260Q232 300 265 260"/><path d="M187 269Q232 325 277 269"/></g>
          {/* Derrick and a visible well bore in the geological cutaway. */}
          <ellipse cx="403" cy="324" rx="53" ry="12" transform="rotate(-15 403 324)" fill="#b8892f" opacity=".55"/>
          <path d="M385 190V281Q385 306 420 318" fill="none" stroke="#173b40" strokeWidth="5"/>
          <path key={active} className="field-flow" d="M420 318Q385 306 385 281V190L532 224" fill="none" stroke="#b8892f" strokeWidth="3" strokeDasharray="7 9"/>
          <g stroke="#173b40" strokeWidth="3" fill="none" strokeLinejoin="round">
            <path d="M352 198L382 81L416 189M365 151L403 160M373 119L394 123M358 179L410 181M365 151L410 181M403 160L373 119M382 81V64"/>
            <path d="M344 201L381 210L424 197"/>
          </g>
          {/* Production tanks, pipework and processing unit. */}
          <g stroke="#24453f" strokeWidth="1.7" strokeLinejoin="round">
            <path d="M495 212V176L526 165L557 177V213L526 225Z" fill="#f7f5ec"/><path d="M495 176L526 188L557 177M526 188V225" fill="none"/>
            <path d="M503 174V148H511V179M539 174V143H547V179" fill="#78958a"/>
            <path d="M567 225V202C567 191 595 191 595 202V225C595 236 567 236 567 225Z" fill="#becfc3"/><ellipse cx="581" cy="202" rx="14" ry="6" fill="#e8eee5"/>
            <path d="M548 226H568" fill="none" strokeWidth="4"/>
          </g>
          <path d="M422 338L474 353H550" fill="none" stroke="#8c7954"/><text x="478" y="370" className="drawing-label">RESERVOIR</text>
          <text x="30" y="405" className="drawing-label">ILLUSTRATIVE CROSS-SECTION · NOT A REAL FIELD</text>
        </svg>
        {points.map((p, i) => <button key={p.title} type="button" className={`field-point ${i === active ? 'is-active' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-label={`Explore ${p.title.toLowerCase()}`} aria-pressed={i === active} aria-controls="field-readout" onClick={() => setActive(i)}><span>{String(i + 1).padStart(2, '0')}</span></button>)}
      </div>
      <div className="field-selector" role="group" aria-label="Field stages">
        {points.map((p, i) => <button type="button" key={p.title} aria-pressed={i === active} aria-controls="field-readout" onClick={() => setActive(i)}><span>0{i + 1}</span>{p.label}</button>)}
      </div>
      <div className="field-readout" id="field-readout" aria-live="polite" aria-atomic="true">
        <div className="field-readout-title"><span>0{active + 1}</span><h3>{point.title}</h3></div>
        <p>{point.text}</p>
        <div className="field-note" key={point.note}><span>{point.note}</span></div>
      </div>
      <p className="field-hint">Choose a point. See where people and operations meet.</p>
    </div>
  );
}
