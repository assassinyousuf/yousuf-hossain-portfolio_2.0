import React from "react";

export default function TechLogosTicker() {
  const credentials = [
    {
      name: "IEEE Computer Society",
      badge: "VALID 2026",
      desc: "Student Member • Global Computing Org",
      color: "border-cyan-500/30 text-cyan-300 bg-cyan-950/20"
    },
    {
      name: "Cisco CCNA (200-301)",
      badge: "ROUTING & SWITCHING",
      desc: "Enterprise Network Infrastructure",
      color: "border-yellow-500/30 text-yellow-300 bg-yellow-950/20"
    },
    {
      name: "Taylor & Francis",
      badge: "BOOK CHAPTER PUBLISHER",
      desc: "Peer-Reviewed Scientific Series",
      color: "border-purple-500/30 text-purple-300 bg-purple-950/20"
    },
    {
      name: "DIU CPC",
      badge: "GENERAL SECRETARY",
      desc: "Computer Programming Club",
      color: "border-pink-500/30 text-pink-300 bg-pink-950/20"
    },
    {
      name: "Kali Linux / CTF",
      badge: "CHAMPION 1ST",
      desc: "Offensive Security & Forensics",
      color: "border-emerald-500/30 text-emerald-300 bg-emerald-950/20"
    },
    {
      name: "Wireshark Telemetry",
      badge: "PACKET INSPECTION",
      desc: "Deep Packet Telemetry & Protocols",
      color: "border-blue-500/30 text-blue-300 bg-blue-950/20"
    }
  ];

  const doubleList = [...credentials, ...credentials];

  return (
    <section className="relative py-10 bg-black/50 border-y border-purple-900/25 overflow-hidden select-none">
      
      {/* Side Vignette Fades */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[#030408] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-[#030408] to-transparent z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-purple-400/90 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          ACCREDITATIONS & RESEARCH PARTNERS
        </span>
        <span className="font-mono text-[10px] text-slate-500 hidden sm:inline">
          IEEE • CISCO • TAYLOR & FRANCIS • DIU CPC
        </span>
      </div>

      {/* Infinite Scrolling Marquee Track */}
      <div className="animate-marquee gap-4 sm:gap-5">
        {doubleList.map((item, index) => (
          <div
            key={index}
            className={`glass-panel px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border ${item.color} flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)] min-w-[240px] sm:min-w-[280px]`}
          >
            <div className="flex flex-col">
              <span className="font-display font-bold text-xs sm:text-sm text-white">{item.name}</span>
              <span className="text-[10px] font-mono text-purple-300/80 font-bold tracking-wider">{item.badge}</span>
              <span className="text-[11px] text-slate-400 font-sans mt-0.5">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
