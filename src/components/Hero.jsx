import React from "react";
import { personalInfo, stats } from "../data/portfolioData";
import { Download, FileText, FolderGit2, MapPin, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Hero() {
  return (
    <section id="overview" className="relative min-h-[92vh] pt-24 pb-14 sm:pt-36 sm:pb-24 flex flex-col justify-center px-4 sm:px-6 md:px-8 overflow-hidden bg-transparent">
      
      {/* Restrained Ambient Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clear Identity & Positioning */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/25 bg-purple-950/30 text-purple-300 font-mono text-[10px] sm:text-xs tracking-wider w-fit max-w-full">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">DIU CPC GS // RESEARCHER // CTF CHAMPION</span>
            </div>

            {/* Recommended Hero Headline */}
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Building secure systems. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300">
                  Exploring networks.
                </span>{" "}
                <br className="hidden sm:inline" />
                Researching technology.
              </h1>
              
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 font-mono text-xs sm:text-sm text-slate-300">
                <span className="text-cyan-400 font-semibold">
                  Md. Yousuf Hossain (Mehrab)
                </span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="text-slate-400">
                  CSE Student | Cybersecurity & Network Engineering | Researcher
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Dhaka, Bangladesh · Dhaka International University (7th Semester)</span>
              </div>
            </div>

            {/* Concise Mission / Bio */}
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
              Undergraduate scholar engineering zero-trust mobile perimeter defenses, infrastructure-free offline ad-hoc mesh relays, and deep-learning IoT telemetry. Lead and co-author on 5 peer-reviewed works (including Taylor & Francis book chapters).
            </p>

            {/* Primary Recommended CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <a
                href="#projects"
                className="flex-1 sm:flex-initial px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 touch-target"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>View Projects</span>
              </a>

              <a
                href="#research"
                className="flex-1 sm:flex-initial px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold text-slate-200 hover:text-white border border-slate-700 hover:border-purple-400/60 bg-slate-900/60 hover:bg-purple-950/30 transition-all flex items-center justify-center gap-2 touch-target"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Research</span>
              </a>

              <a
                href={personalInfo.cvUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400 bg-purple-950/20 hover:bg-purple-900/40 transition-all flex items-center justify-center gap-2 touch-target"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pt-1 sm:pt-0 sm:ml-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-purple-500/40 transition-colors touch-target flex items-center justify-center"
                  title="GitHub"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors touch-target flex items-center justify-center"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-rose-300 hover:border-rose-500/40 transition-colors touch-target flex items-center justify-center"
                  title="Email"
                  aria-label="Email Md. Yousuf Hossain"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Grounded Professional Portrait Frame */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[220px] sm:max-w-[280px]">
              
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-purple-500/30 via-slate-800/80 to-cyan-500/30 border border-purple-500/25 overflow-hidden shadow-2xl">
                
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-950">
                  <img
                    src="/profile.jpeg"
                    alt="Md. Yousuf Hossain"
                    className="w-full h-full object-cover object-center filter grayscale-[25%] contrast-110 hover:grayscale-0 transition duration-500"
                    loading="eager"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030408] via-transparent to-transparent opacity-75" />

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-[#0a0d20]/90 backdrop-blur-md border border-purple-500/25 font-mono text-[10px] sm:text-[11px] text-slate-200">
                    <div className="flex justify-between items-center text-purple-300 font-bold">
                      <span>MD. YOUSUF HOSSAIN</span>
                      <span className="text-emerald-400 text-[9px] font-mono">ACTIVE</span>
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                      DIU CSE // 7TH SEMESTER
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Structured Metric Bar below Hero */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-purple-500/15 flex flex-col justify-between"
            >
              <div className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">{s.label}</div>
              <div className="font-display text-lg sm:text-2xl font-bold text-white mt-1">
                {s.value}
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] text-purple-400 mt-0.5">
                {s.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
