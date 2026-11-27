import React from "react";

export default function IdentityDomainVisual() {
  return (
    <div className="relative surface-panel tech-grid-bg rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4 font-mono text-[11px]">
        <span className="text-[#8A94A6]">DOMAIN CONVERGENCE</span>
        <span className="text-[#A78BFA]">4 DISCIPLINES</span>
      </div>

      <svg
        viewBox="0 0 360 210"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Venn intersection diagram connecting Cybersecurity, Networking, Software Systems, and Research"
      >
        <defs>
          <radialGradient id="centerConvergence" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(101, 214, 231, 0.18)" />
            <stop offset="100%" stopColor="rgba(101, 214, 231, 0)" />
          </radialGradient>
        </defs>

        <circle cx="180" cy="105" r="76" fill="url(#centerConvergence)" />

        <circle
          cx="144"
          cy="86"
          r="56"
          fill="rgba(101, 214, 231, 0.05)"
          stroke="rgba(101, 214, 231, 0.4)"
          strokeWidth="1"
        />
        <circle
          cx="216"
          cy="86"
          r="56"
          fill="rgba(148, 163, 184, 0.04)"
          stroke="rgba(148, 163, 184, 0.26)"
          strokeWidth="1"
        />
        <circle
          cx="144"
          cy="126"
          r="56"
          fill="rgba(148, 163, 184, 0.04)"
          stroke="rgba(148, 163, 184, 0.26)"
          strokeWidth="1"
        />
        <circle
          cx="216"
          cy="126"
          r="56"
          fill="rgba(167, 139, 250, 0.06)"
          stroke="rgba(167, 139, 250, 0.38)"
          strokeWidth="1"
        />

        <text x="48" y="46" className="fill-[#65D6E7] font-mono text-[10px] font-medium">
          Networking
        </text>
        <text x="234" y="46" className="fill-[#EDE9DF] font-mono text-[10px] font-medium">
          Cybersecurity
        </text>
        <text x="44" y="176" className="fill-[#EDE9DF] font-mono text-[10px] font-medium">
          Systems Dev
        </text>
        <text x="242" y="176" className="fill-[#A78BFA] font-mono text-[10px] font-medium">
          Research
        </text>

        <circle cx="180" cy="106" r="24" fill="#07090D" stroke="#65D6E7" strokeWidth="1.2" />
        <text
          x="180"
          y="103"
          textAnchor="middle"
          className="fill-[#EDE9DF] font-sans text-[8.5px] font-semibold"
        >
          Applied
        </text>
        <text
          x="180"
          y="114"
          textAnchor="middle"
          className="fill-[#65D6E7] font-mono text-[7.5px]"
        >
          Security
        </text>
      </svg>
    </div>
  );
}
