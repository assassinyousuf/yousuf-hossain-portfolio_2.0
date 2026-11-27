import React, { useState, useEffect, useRef } from "react";
import { categorizedSkills } from "../data/portfolioData";
import { gsap } from "gsap";

const DOMAIN_POSITIONS = [
  { key: "networking", x: 115, y: 75, short: "Networking" },
  { key: "cybersecurity", x: 305, y: 75, short: "Cybersecurity" },
  { key: "systems", x: 75, y: 215, short: "Systems" },
  { key: "programming", x: 210, y: 268, short: "Programming" },
  { key: "tools", x: 345, y: 215, short: "Tools & DevOps" },
];

export default function SkillsSection() {
  const [selectedKey, setSelectedKey] = useState("networking");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const visualRef = useRef(null);

  const activeCategory = categorizedSkills[selectedKey] || categorizedSkills.networking;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Clean Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs text-sky-400 mb-2">
              02 · Capabilities
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-100">
              Technical Ecosystem
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md leading-relaxed">
            Interactive map of connected engineering domains spanning enterprise routing, defensive security, Linux systems, and software tooling.
          </p>
        </div>

        {/* Visual Interactive Constellation + Domain Inspector */}
        <div
          ref={visualRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* SVG Interactive Constellation Diagram (6 cols) */}
          <div className="lg:col-span-6 surface-panel rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3 font-mono text-[11px]">
              <span className="text-slate-400">Domain Constellation</span>
              <span className="text-sky-400">Select a hub to inspect</span>
            </div>

            <svg
              viewBox="0 0 420 315"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Interactive technical skill ecosystem constellation diagram"
            >
              {/* Orbital Boundary */}
              <circle
                cx="210"
                cy="158"
                r="116"
                fill="none"
                stroke="rgba(148,163,184,0.08)"
                strokeDasharray="3 5"
              />

              {/* Cross-domain relationship links */}
              <line x1="115" y1="75" x2="305" y2="75" stroke="rgba(148,163,184,0.14)" strokeWidth="1" />
              <line x1="75" y1="215" x2="345" y2="215" stroke="rgba(148,163,184,0.14)" strokeWidth="1" />
              <line x1="115" y1="75" x2="75" y2="215" stroke="rgba(148,163,184,0.14)" strokeWidth="1" />
              <line x1="305" y1="75" x2="345" y2="215" stroke="rgba(148,163,184,0.14)" strokeWidth="1" />

              {/* Spokes from central stack hub to each domain */}
              {DOMAIN_POSITIONS.map((dom) => {
                const isSelected = dom.key === selectedKey;
                return (
                  <line
                    key={`spoke-${dom.key}`}
                    x1="210"
                    y1="158"
                    x2={dom.x}
                    y2={dom.y}
                    stroke={isSelected ? "#38bdf8" : "rgba(148,163,184,0.2)"}
                    strokeWidth={isSelected ? "1.8" : "1"}
                  />
                );
              })}

              {/* Center Hub */}
              <g transform="translate(210, 158)">
                <circle
                  r="34"
                  fill="#06080c"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                />
                <text
                  y="-3"
                  textAnchor="middle"
                  className="fill-slate-100 font-mono text-[9.5px] font-semibold"
                >
                  STACK
                </text>
                <text
                  y="10"
                  textAnchor="middle"
                  className="fill-sky-400 font-mono text-[8px]"
                >
                  5 Domains
                </text>
              </g>

              {/* Clickable Domain Nodes */}
              {DOMAIN_POSITIONS.map((dom) => {
                const isSelected = dom.key === selectedKey;
                return (
                  <g
                    key={dom.key}
                    transform={`translate(${dom.x}, ${dom.y})`}
                    onClick={() => setSelectedKey(dom.key)}
                    onMouseEnter={() => setSelectedKey(dom.key)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${dom.short} domain`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedKey(dom.key);
                    }}
                  >
                    <rect
                      x="-58"
                      y="-20"
                      width="116"
                      height="40"
                      rx="10"
                      fill={isSelected ? "rgba(14, 30, 48, 0.96)" : "rgba(10, 14, 22, 0.92)"}
                      stroke={isSelected ? "#38bdf8" : "rgba(148,163,184,0.24)"}
                      strokeWidth={isSelected ? "1.5" : "1"}
                    />
                    <circle
                      cx="-42"
                      cy="0"
                      r="3.5"
                      fill={isSelected ? "#38bdf8" : "#64748b"}
                    />
                    <text
                      x="-31"
                      y="3"
                      className="fill-slate-100 font-sans text-[11px] font-semibold"
                    >
                      {dom.short}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Domain Blueprint Detail Panel (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Domain Tabs for quick mobile/keyboard switching */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {DOMAIN_POSITIONS.map((dom) => (
                <button
                  key={dom.key}
                  type="button"
                  onClick={() => setSelectedKey(dom.key)}
                  className={`px-3 py-1.5 rounded-lg font-sans text-xs transition-colors whitespace-nowrap shrink-0 border ${
                    selectedKey === dom.key
                      ? "bg-sky-500/15 text-sky-300 border-sky-400/40 font-medium"
                      : "bg-transparent text-slate-400 hover:text-slate-200 border-white/[0.08]"
                  }`}
                >
                  {dom.short}
                </button>
              ))}
            </div>

            <div className="surface-panel rounded-2xl p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.08] pb-4 mb-5">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-100">
                    {activeCategory.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                    {activeCategory.summary}
                  </p>
                </div>
                <span className="font-mono text-xs text-sky-400 shrink-0">
                  {activeCategory.prominent.length} focus areas
                </span>
              </div>

              {/* Clean Visual Node Rows instead of text pill clutter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCategory.prominent.map((item, idx) => (
                  <div
                    key={item}
                    className="p-3 rounded-xl bg-[#04060a]/75 border border-white/[0.06] flex items-start gap-2.5"
                  >
                    <span className="font-mono text-[10px] text-sky-400 mt-0.5 shrink-0 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-slate-200 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
