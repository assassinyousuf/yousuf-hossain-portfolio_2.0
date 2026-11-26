import React, { useState } from "react";
import { educationData } from "../data/portfolioData";
import { GraduationCap, Calculator } from "lucide-react";

export default function EducationSection() {
  const [selectedCidr, setSelectedCidr] = useState("/26");

  const subnets = {
    "/24": { mask: "255.255.255.0", hosts: 254, range: "192.168.1.1 - 192.168.1.254", bcast: "192.168.1.255" },
    "/26": { mask: "255.255.255.192", hosts: 62, range: "192.168.1.1 - 192.168.1.62", bcast: "192.168.1.63" },
    "/28": { mask: "255.255.255.240", hosts: 14, range: "192.168.1.1 - 192.168.1.14", bcast: "192.168.1.15" },
    "/30": { mask: "255.255.255.252", hosts: 2, range: "192.168.1.1 - 192.168.1.2", bcast: "192.168.1.3" },
  };

  const currentSubnet = subnets[selectedCidr];

  return (
    <section id="education" className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-[#03050b] border-t border-purple-900/25">
      
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute right-10 top-1/2 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>07 // ACADEMICS & CERTIFICATION TRACKS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            EDUCATION & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300">
              CREDENTIAL PREPARATION
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Degree Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-purple-500/25 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  UNDERGRADUATE DEGREE
                </span>
                <span className="font-mono text-xs text-purple-400 font-semibold">2023 – 2027</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                {educationData.degree}
              </h3>
              <div className="font-mono text-xs text-slate-400 mb-4">
                {educationData.institution} · {educationData.location}
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 font-mono text-xs text-slate-300 space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Current Academic Standing:</span>
                  <span className="text-emerald-400 font-bold">7th Semester (Expected 2027)</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400">{educationData.hsc.exam}:</span>
                  <span className="text-purple-300 font-bold">GPA {educationData.hsc.gpa} ({educationData.hsc.group})</span>
                </div>
              </div>

              {/* Certifications & Memberships */}
              <div className="space-y-3">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                  Active Professional Tracks
                </div>
                {educationData.certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{cert.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{cert.focus}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto shrink-0">
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive CCNA VLSM Subnet Calculator (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-cyan-500/25 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-display text-lg font-bold text-white">
                    CCNA Subnet Telemetry Sandbox
                  </h3>
                </div>
                <p className="font-mono text-xs text-slate-400 mb-5 leading-relaxed">
                  Interactive IPv4 VLSM calculator verifying hands-on subnetting logic for Cisco CCNA 200-301.
                </p>

                {/* Subnet CIDR Selector */}
                <div className="flex items-center gap-2 mb-5 font-mono text-xs">
                  {Object.keys(subnets).map((cidr) => (
                    <button
                      key={cidr}
                      onClick={() => setSelectedCidr(cidr)}
                      className={`flex-1 py-1.5 rounded-xl transition-colors border ${
                        selectedCidr === cidr
                          ? "bg-cyan-600 text-white font-bold border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                          : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {cidr}
                    </button>
                  ))}
                </div>

                {/* Subnet Inspection Telemetry */}
                <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 font-mono text-xs space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subnet Mask:</span>
                    <span className="text-cyan-300 font-bold">{currentSubnet.mask}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Usable Hosts:</span>
                    <span className="text-emerald-400 font-bold">{currentSubnet.hosts} hosts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Usable Range:</span>
                    <span className="text-purple-300">{currentSubnet.range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Broadcast IP:</span>
                    <span className="text-rose-300">{currentSubnet.bcast}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span>Base Network: 192.168.1.0</span>
                <span className="text-cyan-400">Cisco CCNA 200-301</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
