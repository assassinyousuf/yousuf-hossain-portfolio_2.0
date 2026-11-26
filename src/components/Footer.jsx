import React from "react";
import { personalInfo } from "../data/portfolioData";
import { Shield, Mail, Globe, MapPin, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 sm:px-8 bg-[#020306] border-t border-purple-900/30 overflow-hidden">
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center pb-12 border-b border-slate-800/80">
          
          {/* Identity & Mission */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-white tracking-wider">
                MD. YOUSUF HOSSAIN
              </span>
              <span className="text-xs font-mono text-purple-400 font-bold">
                [ MEHRAB ]
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-sm">
              Computer Science & Engineering scholar focused on resilient network architectures, mobile defense protocols, and cybersecurity research.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-2 font-mono text-xs text-slate-400">
            <span className="text-slate-200 font-bold uppercase tracking-wider mb-1">Navigation</span>
            <a href="#overview" className="hover:text-purple-300 transition-colors">/ System Overview</a>
            <a href="#research" className="hover:text-purple-300 transition-colors">/ 5 Research Papers</a>
            <a href="#ctf" className="hover:text-purple-300 transition-colors">/ CTF & Credentials</a>
            <a href="#projects" className="hover:text-purple-300 transition-colors">/ Selected Projects</a>
            <a href="#terminal" className="hover:text-purple-300 transition-colors">/ Interactive Console</a>
          </div>

          {/* Security Verification & Node Status */}
          <div className="md:col-span-4 flex flex-col sm:items-end gap-2.5">
            <div className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Security Node Verification</span>
            </div>
            <div className="p-3 rounded-2xl glass-panel border border-purple-500/20 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                <span>IDENTITY: VERIFIED RESEARCHER</span>
              </div>
              <div className="text-[11px] text-slate-400">
                HOST: yousuf.surf // DIU CSE NODE
              </div>
              <div className="text-[10px] text-purple-300/80 mt-1">
                KEY_ID: 8F92-CCNA-MESH-CTF-2026
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Md. Yousuf Hossain.</span>
            <span>All research & code open-access.</span>
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
