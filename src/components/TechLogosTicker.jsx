import React from "react";
import { ShieldCheck, Award, Network, BookOpen, Terminal, Cpu, Database, Binary } from "lucide-react";

export default function TechLogosTicker() {
  const credentials = [
    {
      name: "IEEE Computer Society",
      badge: "VALID 2026",
      desc: "Student Member • Global Computing Org",
      icon: (
        <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      color: "border-cyan-500/30 text-cyan-300 bg-cyan-950/20"
    },
    {
      name: "Cisco CCNA (200-301)",
      badge: "ROUTING & SWITCHING",
      desc: "Enterprise Network Infrastructure",
      icon: (
        <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18M6.5 6.5l11 11M6.5 17.5l11-11" />
        </svg>
      ),
      color: "border-yellow-500/30 text-yellow-300 bg-yellow-950/20"
    },
    {
      name: "Taylor & Francis",
      badge: "BOOK CHAPTER PUBLISHER",
      desc: "Peer-Reviewed Scientific Series",
      icon: (
        <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z" />
          <path d="M6 2v14a4 4 0 0 1 4 4h10V2H6z" opacity="0.4" />
        </svg>
      ),
      color: "border-purple-500/30 text-purple-300 bg-purple-950/20"
    },
    {
      name: "DIU CPC",
      badge: "GENERAL SECRETARY",
      desc: "Computer Programming Club",
      icon: (
        <svg className="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="22" x2="12" y2="15.5" />
          <polyline points="22 8.5 12 15.5 2 8.5" />
        </svg>
      ),
      color: "border-pink-500/30 text-pink-300 bg-pink-950/20"
    },
    {
      name: "Kali Linux / CTF",
      badge: "CHAMPION 1ST",
      desc: "Offensive Security & Forensics",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      color: "border-emerald-500/30 text-emerald-300 bg-emerald-950/20"
    },
    {
      name: "Wireshark Telemetry",
      badge: "PACKET INSPECTION",
      desc: "Deep Packet Telemetry & Protocols",
      icon: (
        <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      color: "border-blue-500/30 text-blue-300 bg-blue-950/20"
    }
  ];

  // Duplicate for seamless infinite loop
  const doubleList = [...credentials, ...credentials];

  return (
    <section className="relative py-12 bg-black/60 border-y border-purple-900/30 overflow-hidden select-none">
      
      {/* Side Vignette Fades */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#030408] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#030408] to-transparent z-10" />

      <div className="mx-auto max-w-7xl px-4 mb-5 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-widest text-purple-400/90 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          VERIFIED ACCREDITATIONS & RESEARCH PARTNERS
        </span>
        <span className="font-mono text-[11px] text-slate-500 hidden sm:inline">
          IEEE • CISCO • TAYLOR & FRANCIS • DIU CPC
        </span>
      </div>

      {/* Infinite Scrolling Marquee Track */}
      <div className="flex w-max gap-5 animate-[track-scroll_35s_linear_infinite] hover:[animation-play-state:paused]">
        {doubleList.map((item, index) => (
          <div
            key={index}
            className={`glass-panel px-5 py-3.5 rounded-2xl border ${item.color} flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all transform hover:scale-105 min-w-[280px]`}
          >
            <div className="p-2 rounded-xl bg-black/50 border border-white/5">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-white">{item.name}</span>
              </div>
              <span className="text-[10px] font-mono text-purple-300/80 font-bold tracking-wider">{item.badge}</span>
              <span className="text-[11px] text-slate-400 font-sans mt-0.5">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
