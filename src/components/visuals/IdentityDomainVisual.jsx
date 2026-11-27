import React from "react";

export default function IdentityDomainVisual() {
  return (
    <div className="surface-panel rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4 font-mono text-[11px]">
        <span className="text-slate-400">Domain Intersection</span>
        <span className="text-sky-400">4 Core Disciplines</span>
      </div>

      <svg
        viewBox="0 0 360 220"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Venn intersection diagram connecting Cybersecurity, Networking, Software Systems, and Research"
      >
        {/* 4 Overlapping Subtle Geometry Circles */}
        <circle
          cx="145"
          cy="92"
          r="58"
          fill="rgba(56, 189, 248, 0.06)"
          stroke="rgba(56, 189, 248, 0.35)"
          strokeWidth="1"
        />
        <circle
          cx="215"
          cy="92"
          r="58"
          fill="rgba(148, 163, 184, 0.05)"
          stroke="rgba(148, 163, 184, 0.28)"
          strokeWidth="1"
        />
        <circle
          cx="145"
          cy="132"
          r="58"
          fill="rgba(148, 163, 184, 0.05)"
          stroke="rgba(148, 163, 184, 0.28)"
          strokeWidth="1"
        />
        <circle
          cx="215"
          cy="132"
          r="58"
          fill="rgba(56, 189, 248, 0.06)"
          stroke="rgba(56, 189, 248, 0.35)"
          strokeWidth="1"
        />

        {/* Domain Labels */}
        <text x="60" y="54" className="fill-sky-300 font-mono text-[10px] font-medium">
          Networking
        </text>
        <text x="236" y="54" className="fill-slate-200 font-mono text-[10px] font-medium">
          Cybersecurity
        </text>
        <text x="52" y="176" className="fill-slate-200 font-mono text-[10px] font-medium">
          Systems Dev
        </text>
        <text x="242" y="176" className="fill-sky-300 font-mono text-[10px] font-medium">
          Research
        </text>

        {/* Center Convergence Point */}
        <circle cx="180" cy="112" r="22" fill="#06080c" stroke="#38bdf8" strokeWidth="1.2" />
        <text
          x="180"
          y="109"
          textAnchor="middle"
          className="fill-slate-100 font-sans text-[8.5px] font-semibold"
        >
          Applied
        </text>
        <text
          x="180"
          y="119"
          textAnchor="middle"
          className="fill-sky-400 font-mono text-[7.5px]"
        >
          Security
        </text>
      </svg>
    </div>
  );
}
