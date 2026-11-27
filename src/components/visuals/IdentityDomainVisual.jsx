import React from "react";

export default function IdentityDomainVisual() {
  return (
    <div className="surface-panel rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4 font-mono text-[11px]">
        <span className="text-[#8C96A8]">Domain Intersection</span>
        <span className="text-[#A78BFA]">4 Core Disciplines</span>
      </div>

      <svg
        viewBox="0 0 360 220"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Venn intersection diagram connecting Cybersecurity, Networking, Software Systems, and Research"
      >
        <circle
          cx="145"
          cy="92"
          r="58"
          fill="rgba(101, 214, 231, 0.06)"
          stroke="rgba(101, 214, 231, 0.38)"
          strokeWidth="1"
        />
        <circle
          cx="215"
          cy="92"
          r="58"
          fill="rgba(140, 150, 168, 0.05)"
          stroke="rgba(140, 150, 168, 0.28)"
          strokeWidth="1"
        />
        <circle
          cx="145"
          cy="132"
          r="58"
          fill="rgba(140, 150, 168, 0.05)"
          stroke="rgba(140, 150, 168, 0.28)"
          strokeWidth="1"
        />
        <circle
          cx="215"
          cy="132"
          r="58"
          fill="rgba(167, 139, 250, 0.06)"
          stroke="rgba(167, 139, 250, 0.36)"
          strokeWidth="1"
        />

        <text x="60" y="54" className="fill-[#65D6E7] font-mono text-[10px] font-medium">
          Networking
        </text>
        <text x="236" y="54" className="fill-[#E8E4DA] font-mono text-[10px] font-medium">
          Cybersecurity
        </text>
        <text x="52" y="176" className="fill-[#E8E4DA] font-mono text-[10px] font-medium">
          Systems Dev
        </text>
        <text x="242" y="176" className="fill-[#A78BFA] font-mono text-[10px] font-medium">
          Research
        </text>

        <circle cx="180" cy="112" r="22" fill="#0B0D12" stroke="#65D6E7" strokeWidth="1.2" />
        <text
          x="180"
          y="109"
          textAnchor="middle"
          className="fill-[#E8E4DA] font-sans text-[8.5px] font-semibold"
        >
          Applied
        </text>
        <text
          x="180"
          y="119"
          textAnchor="middle"
          className="fill-[#65D6E7] font-mono text-[7.5px]"
        >
          Security
        </text>
      </svg>
    </div>
  );
}
