import React from "react";
import { Shield, Network, Users, Award, Compass } from "lucide-react";

export default function IdentityScene() {
  const pillars = [
    {
      title: "Computer Science & Engineering Scholar",
      desc: "7th Semester undergraduate at Dhaka International University (Expected 2027), focusing on distributed networks, zero-trust protocols, and systems engineering.",
      icon: Compass,
      color: "border-cyan-500/30 text-cyan-300 bg-cyan-950/20",
    },
    {
      title: "Cybersecurity & Cryptography Researcher",
      desc: "Lead and co-author on 5 peer-reviewed publications, including accepted Taylor & Francis book chapters on audio-domain steganography and mobile container sandboxing.",
      icon: Shield,
      color: "border-purple-500/30 text-purple-300 bg-purple-950/20",
    },
    {
      title: "Enterprise Network Systems Engineer",
      desc: "Active preparation on the Cisco CCNA 200-301 track; designing VLSM subnet topologies, VLANs, and analyzing packet telemetry via Wireshark and Packet Tracer.",
      icon: Network,
      color: "border-yellow-500/30 text-yellow-300 bg-yellow-950/20",
    },
    {
      title: "Competitive CTF Champion",
      desc: "1st Place Champion at DIU Intra First CTF 2025; Global Rank #72 in BCS ICT Fest CTF, and Global Rank #158 in HiCyberCon international cyber competition.",
      icon: Award,
      color: "border-emerald-500/30 text-emerald-300 bg-emerald-950/20",
    },
    {
      title: "Student Tech Leadership",
      desc: "General Secretary of DIU Computer Programming Club (DIU CPC), leading workshops, hackathons, and technical mentorship for over 1,000 engineering peers.",
      icon: Users,
      color: "border-pink-500/30 text-pink-300 bg-pink-950/20",
    },
  ];

  return (
    <section id="identity" className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-transparent border-t border-purple-900/25">
      
      {/* Background Subtle Accent Glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>01 // IDENTITY: ENTER THE NETWORK</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              CORE IDENTITY // <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300">
                ENGINEERING PILLARS
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-md">
            A cohesive synthesis of systems security, network engineering, empirical research, and developer community leadership.
          </p>
        </div>

        {/* 5 Identity Pillar Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`rounded-3xl glass-panel p-5 sm:p-7 border border-purple-500/20 hover:border-purple-400/50 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between group ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 sm:p-3 rounded-2xl border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      0{index + 1} //
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-purple-400/80 flex items-center justify-between">
                  <span>VERIFIED RECORD</span>
                  <span className="text-cyan-400">YOUSUF.SURF</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
