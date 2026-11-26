import React from "react";
import { personalInfo } from "../data/portfolioData";
import { MapPin, Download } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative py-14 px-4 sm:px-6 md:px-8 bg-[#020306] border-t border-purple-900/30 overflow-hidden">
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-10 border-b border-slate-800/80">
          
          {/* Identity & Current Status */}
          <div className="md:col-span-5 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base sm:text-lg text-white tracking-wider">
                MD. YOUSUF HOSSAIN
              </span>
              <span className="text-xs font-mono text-purple-400 font-bold">
                [ MEHRAB ]
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-md">
              Computer Science & Engineering student at Dhaka International University (7th Semester). Researching zero-trust mobile execution security, ad-hoc mesh networks, and packet telemetry.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{personalInfo.location} · DIU CSE</span>
            </div>
          </div>

          {/* Quick Structured Navigation */}
          <div className="md:col-span-3 flex flex-col gap-1.5 font-mono text-xs text-slate-400">
            <span className="text-slate-200 font-bold uppercase tracking-wider mb-1">Architecture</span>
            <a href="#overview" className="hover:text-purple-300 transition-colors">/ 01 — Overview</a>
            <a href="#projects" className="hover:text-purple-300 transition-colors">/ 02 — Featured Work</a>
            <a href="#research" className="hover:text-purple-300 transition-colors">/ 03 — Research Papers</a>
            <a href="#skills" className="hover:text-purple-300 transition-colors">/ 04 — Technical Skills</a>
            <a href="#achievements" className="hover:text-purple-300 transition-colors">/ 05 — CTF Honors</a>
            <a href="#timeline" className="hover:text-purple-300 transition-colors">/ 06 — Timeline</a>
            <a href="#education" className="hover:text-purple-300 transition-colors">/ 07 — Education</a>
          </div>

          {/* Verification Badge & Direct CV Download */}
          <div className="md:col-span-4 flex flex-col sm:items-end gap-3">
            <div className="p-4 rounded-2xl glass-panel border border-purple-500/20 font-mono text-xs text-slate-300 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>VERIFIED RESEARCHER & CSE STUDENT</span>
              </div>
              <div className="text-[11px] text-slate-400">
                DOMAIN: yousuf.surf // DIU CPC NODE
              </div>
              <div className="text-[10px] text-purple-300/80 mt-1">
                KEY_ID: CCNA-MESH-CTF-2026-OK
              </div>
            </div>

            <a
              href={personalInfo.cvUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official CV (PDF)</span>
            </a>
          </div>

        </div>

        {/* Bottom Socials & Rights */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © {currentYear} Md. Yousuf Hossain. Open-access research & code.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-purple-300 transition-colors">
              GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
              LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-rose-300 transition-colors">
              Email
            </a>
            <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:text-emerald-300 transition-colors">
              yousuf.surf
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
