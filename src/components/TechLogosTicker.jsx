import React from "react";

export default function TechLogosTicker() {
  const credentials = [
    {
      name: "IEEE Computer Society",
      detail: "Student Member · Valid 2026",
    },
    {
      name: "Taylor & Francis",
      detail: "Accepted Book Chapter Author",
    },
    {
      name: "Cisco CCNA (200-301)",
      detail: "Routing & Switching Track",
    },
    {
      name: "DIU CPC",
      detail: "General Secretary (2026–Present)",
    },
  ];

  return (
    <section className="relative py-8 px-4 sm:px-6 md:px-8 border-y border-white/[0.06] bg-[#06080c]/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {credentials.map((item) => (
            <div key={item.name} className="flex flex-col gap-0.5">
              <span className="font-sans text-sm font-semibold text-slate-200">
                {item.name}
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
