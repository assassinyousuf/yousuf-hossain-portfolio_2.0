import React from "react";
import { achievements, leadership, skills } from "../data/portfolioData";
import { Trophy, ShieldAlert, Award, Terminal, Cpu, Network, Users, CheckCircle, ExternalLink } from "lucide-react";

export default function SecurityBento() {
  return (
    <section id="ctf" className="relative py-28 px-4 sm:px-8 bg-[#030408]">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="pointer-events-none absolute left-1/3 top-1/3 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span>OPERATIONAL EXPERTISE // RED TEAM & BLUE TEAM</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CYBERSECURITY, CTF & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-300 to-cyan-300">
              INFRASTRUCTURE LEADERSHIP
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Champion Trophy Spotlight (Large 8 cols) */}
          <div className="md:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.12)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-yellow-400" /> 1ST PLACE CHAMPION
              </span>
              <span className="font-mono text-xs text-yellow-400 font-semibold">2025</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              DIU Intra First CTF Champion
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Solved multi-domain cybersecurity flags across web security vulnerabilities, cryptographic cracking, digital forensics analysis, and binary exploitation under strict competition countdowns.
            </p>

            {/* Sub-ranks strip */}
            <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20">
                <div className="text-xs font-mono text-purple-400 font-bold">BCS ICT FEST CTF 2026</div>
                <div className="text-xl font-display font-bold text-white mt-1">GLOBAL RANK #72</div>
                <div className="text-xs text-slate-400 mt-0.5">National team division</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20">
                <div className="text-xs font-mono text-cyan-400 font-bold">HICYBERCON CTF 2026</div>
                <div className="text-xl font-display font-bold text-white mt-1">GLOBAL RANK #158</div>
                <div className="text-xs text-slate-400 mt-0.5">International cyber challenge</div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Cisco CCNA Preparation (4 cols) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.1)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 mb-4">
                <Network className="w-3.5 h-3.5 text-cyan-400" /> ACTIVE TRACK
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Cisco CCNA (200-301)
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hands-on routing and switching topology design, IPv4/IPv6 VLSM subnetting, VLAN segmentation, and packet inspection via Cisco Packet Tracer and Wireshark.
              </p>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 font-mono text-xs text-cyan-300 flex items-center justify-between">
              <span>Jeremy's IT Lab Track</span>
              <span className="text-emerald-400 font-bold">In Progress</span>
            </div>
          </div>

          {/* Bento Card 3: Club Leadership & IEEE CS (6 cols) */}
          <div className="md:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-400" />
              <h3 className="font-display text-xl font-bold text-white">
                Executive Leadership
              </h3>
            </div>
            
            <div className="space-y-4">
              {leadership.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black/30 border border-purple-500/15">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-purple-300">{item.role}</span>
                    <span className="text-slate-400">{item.period}</span>
                  </div>
                  <div className="text-sm font-semibold text-white mt-1">{item.org}</div>
                  <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 4: Operating Systems & Red Team Tooling (6 cols) */}
          <div className="md:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display text-xl font-bold text-white">
                  Security & Systems Tooling
                </h3>
              </div>
              <p className="text-slate-300 text-sm mb-6">
                Specialized in Linux environment operations (Kali & Ubuntu) and network defense analysis tools.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 font-mono text-xs">
                  <div className="text-purple-400 font-bold mb-1">Kali Linux</div>
                  <div className="text-slate-400 text-[11px]">Pen-testing & Security Auditing</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 font-mono text-xs">
                  <div className="text-cyan-400 font-bold mb-1">VirtualBox / Lab</div>
                  <div className="text-slate-400 text-[11px]">Sandboxed Network Emulation</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 font-mono text-xs">
                  <div className="text-emerald-400 font-bold mb-1">Packet Tracer</div>
                  <div className="text-slate-400 text-[11px]">Switch & Router Topologies</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 font-mono text-xs">
                  <div className="text-yellow-400 font-bold mb-1">Git & GitHub</div>
                  <div className="text-slate-400 text-[11px]">Version Control & Workflows</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
              <span>IEEE Student Member #Valid 2026</span>
              <span className="text-purple-400">IEEE Computer Society</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
