import React from "react";

export default function TechLogosTicker() {
  const credentials = [
    {
      code: "T&F",
      name: "Taylor & Francis",
      role: "Published Book Chapters",
      detail: "3 accepted security & IoT chapters",
      accent: "text-[#A78BFA] border-[#A78BFA]/30 bg-[#A78BFA]/10",
    },
    {
      code: "IEEE",
      name: "IEEE Computer Society",
      role: "Active Member",
      detail: "Student Membership · Valid 2026",
      accent: "text-[#65D6E7] border-[#65D6E7]/30 bg-[#65D6E7]/10",
    },
    {
      code: "CCNA",
      name: "Cisco CCNA (200-301)",
      role: "Network Track",
      detail: "Routing, Switching & VLSM Telemetry",
      accent: "text-[#65D6E7] border-[#65D6E7]/30 bg-[#65D6E7]/10",
    },
    {
      code: "CPC",
      name: "DIU Computer Programming Club",
      role: "General Secretary",
      detail: "Executive Governance · 2026–Present",
      accent: "text-[#EDE9DF] border-[var(--border-strong)] bg-[#141923]",
    },
  ];

  return (
    <section className="relative border-y border-[var(--border-subtle)] section-band">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-6 sm:py-7">
        <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[var(--border-subtle)]/70 font-mono text-[11px] text-[#5A6476]">
          <span>VERIFIED AFFILIATIONS &amp; RESEARCH TRACKS</span>
          <span className="hidden sm:inline">ACADEMIC · INDUSTRY · GOVERNANCE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-[var(--border-subtle)]">
          {credentials.map((item, idx) => (
            <div
              key={item.name}
              className={`flex items-start gap-3.5 ${
                idx === 0 ? "lg:pr-6" : idx === credentials.length - 1 ? "lg:pl-6" : "lg:px-6"
              }`}
            >
              <div
                className={`h-9 w-11 rounded-md border flex items-center justify-center font-mono text-[10px] font-semibold shrink-0 ${item.accent}`}
              >
                {item.code}
              </div>
              <div className="min-w-0">
                <div className="font-sans text-sm font-semibold text-[#EDE9DF] leading-snug">
                  {item.name}
                </div>
                <div className="font-mono text-[11px] text-[#8A94A6] mt-0.5">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
