import React, { useState, useEffect, useRef } from "react";
import { categorizedSkills } from "../data/portfolioData";
import { gsap } from "gsap";

const DOMAIN_POSITIONS = [
  { key: "networking", code: "D-01", x: 112, y: 74, short: "Networking" },
  { key: "cybersecurity", code: "D-02", x: 308, y: 74, short: "Cybersecurity" },
  { key: "systems", code: "D-03", x: 74, y: 214, short: "Systems" },
  { key: "programming", code: "D-04", x: 210, y: 266, short: "Programming" },
  { key: "tools", code: "D-05", x: 346, y: 214, short: "Tools & DevOps" },
];

export default function SkillsSection() {
  const [selectedKey, setSelectedKey] = useState("networking");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const visualRef = useRef(null);

  const activeCategory = categorizedSkills[selectedKey] || categorizedSkills.networking;
  const totalCapabilities = Object.values(categorizedSkills).reduce(
    (sum, cat) => sum + cat.prominent.length,
    0
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
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
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 section-band border-y border-[var(--border-subtle)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        <div ref={headerRef} className="mb-12 sm:mb-14">
          <div className="flex items-center gap-4 font-mono text-xs mb-4">
            <span className="text-[#65D6E7] tracking-wider">02 / CAPABILITIES</span>
            <span className="h-[1px] flex-1 bg-[var(--border-subtle)]" />
            <span className="text-[#8A94A6] hidden sm:inline">
              5 DOMAINS · {totalCapabilities} DISCIPLINES
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-2xl sm:text-4xl font-medium tracking-[-0.025em] text-[#EDE9DF]">
              Technical Ecosystem
            </h2>
            <p className="font-sans text-sm text-[#8A94A6] max-w-md leading-relaxed">
              Connected engineering domains spanning enterprise routing, defensive security, Linux systems, and software tooling.
            </p>
          </div>
        </div>

        <div
          ref={visualRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
        >
          {/* Left: Interactive Domain Constellation */}
          <div className="lg:col-span-5 surface-panel tech-grid-bg rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-3 font-mono text-[11px]">
              <span className="text-[#8A94A6]">DOMAIN TOPOLOGY</span>
              <span className="text-[#65D6E7]">INSPECT HUB</span>
            </div>

            <svg
              viewBox="0 0 420 315"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Interactive technical skill ecosystem constellation diagram"
            >
              <circle
                cx="210"
                cy="158"
                r="116"
                fill="none"
                stroke="rgba(148, 163, 184, 0.12)"
                strokeDasharray="3 5"
              />

              {/* Cross-domain links */}
              <line x1="112" y1="74" x2="308" y2="74" stroke="rgba(167, 139, 250, 0.2)" strokeWidth="1" />
              <line x1="74" y1="214" x2="346" y2="214" stroke="rgba(148, 163, 184, 0.14)" strokeWidth="1" />
              <line x1="112" y1="74" x2="74" y2="214" stroke="rgba(148, 163, 184, 0.14)" strokeWidth="1" />
              <line x1="308" y1="74" x2="346" y2="214" stroke="rgba(167, 139, 250, 0.2)" strokeWidth="1" />

              {DOMAIN_POSITIONS.map((dom) => {
                const isSelected = dom.key === selectedKey;
                return (
                  <line
                    key={`spoke-${dom.key}`}
                    x1="210"
                    y1="158"
                    x2={dom.x}
                    y2={dom.y}
                    stroke={isSelected ? "#65D6E7" : "rgba(148, 163, 184, 0.22)"}
                    strokeWidth={isSelected ? "1.6" : "1"}
                  />
                );
              })}

              <g transform="translate(210, 158)">
                <circle
                  r="34"
                  fill="#07090D"
                  stroke="#65D6E7"
                  strokeWidth="1.15"
                />
                <text
                  y="-3"
                  textAnchor="middle"
                  className="fill-[#EDE9DF] font-mono text-[9.5px] font-semibold"
                >
                  STACK
                </text>
                <text
                  y="10"
                  textAnchor="middle"
                  className="fill-[#65D6E7] font-mono text-[8px]"
                >
                  5 Hubs
                </text>
              </g>

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
                      rx="8"
                      fill={isSelected ? "#141923" : "rgba(7, 9, 13, 0.92)"}
                      stroke={isSelected ? "#65D6E7" : "rgba(148, 163, 184, 0.24)"}
                      strokeWidth={isSelected ? "1.4" : "1"}
                    />
                    <circle
                      cx="-42"
                      cy="0"
                      r="3.2"
                      fill={isSelected ? "#65D6E7" : "#5A6476"}
                    />
                    <text
                      x="-31"
                      y="3"
                      className="fill-[#EDE9DF] font-sans text-[11px] font-semibold"
                    >
                      {dom.short}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right: Borderless Structured Specification Sheet */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Clean Tab Rail */}
            <div className="flex flex-nowrap lg:flex-wrap items-center gap-x-1 border-b border-[var(--border-subtle)] overflow-x-auto scrollbar-none">
              {DOMAIN_POSITIONS.map((dom) => {
                const isSelected = selectedKey === dom.key;
                return (
                  <button
                    key={dom.key}
                    type="button"
                    onClick={() => setSelectedKey(dom.key)}
                    className={`px-2.5 py-2.5 font-sans text-xs whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                      isSelected
                        ? "border-[#65D6E7] text-[#EDE9DF] font-semibold"
                        : "border-transparent text-[#8A94A6] hover:text-[#EDE9DF]"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-[#5A6476] mr-1">{dom.code}</span>
                    {dom.short}
                  </button>
                );
              })}
            </div>

            {/* Active Domain Specification Ledger */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-[#EDE9DF]">
                    {activeCategory.title}
                  </h3>
                  <p className="font-sans text-sm text-[#8A94A6] mt-1">
                    {activeCategory.summary}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#65D6E7] shrink-0">
                  {activeCategory.prominent.length} tracked focus areas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 divide-y divide-[var(--border-subtle)] sm:divide-y-0">
                {activeCategory.prominent.map((item, idx) => (
                  <div
                    key={item}
                    className="py-3.5 sm:border-b sm:border-[var(--border-subtle)] flex items-baseline gap-3"
                  >
                    <span className="font-mono text-[11px] text-[#65D6E7] shrink-0 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-sm text-[#EDE9DF] leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Domain Summary Strip */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {DOMAIN_POSITIONS.map((dom) => {
                const count = categorizedSkills[dom.key]?.prominent.length || 0;
                const active = selectedKey === dom.key;
                return (
                  <button
                    key={`summary-${dom.key}`}
                    type="button"
                    onClick={() => setSelectedKey(dom.key)}
                    className={`text-left p-2.5 rounded-lg border transition-colors ${
                      active
                        ? "border-[#65D6E7]/45 bg-[#65D6E7]/[0.06]"
                        : "border-[var(--border-subtle)] bg-[#07090D]/55 hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="font-mono text-[10px] text-[#5A6476]">{dom.code}</div>
                    <div className="font-sans text-xs font-medium text-[#EDE9DF] truncate mt-0.5">
                      {dom.short}
                    </div>
                    <div className="font-mono text-[10px] text-[#65D6E7] mt-0.5">
                      {count} items
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
