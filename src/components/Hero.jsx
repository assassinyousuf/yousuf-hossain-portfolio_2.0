import React from "react";
import { personalInfo, stats } from "../data/portfolioData";
import { Terminal, Shield, Network, Award, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Hero() {
  return (
    <section id="overview" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center px-4 sm:px-8 overflow-hidden">
      
      {/* Ambient Radial Glowing Orbs (AetherMind style) */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[130px] animate-orb-1" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-cyan-600/10 blur-[150px] animate-orb-2" />

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Titles, Bio, Badges, CTAs */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* HUD Status Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-wider w-fit shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>SECURITY RESEARCHER // NETWORKING SPECIALIST</span>
            </div>

            {/* Main Name in Giant Futuristic Display Font */}
            <div className="flex flex-col">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                MD. YOUSUF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">
                  HOSSAIN
                </span>
              </h1>
              <p className="mt-2 font-mono text-sm sm:text-base text-purple-300/80 font-medium">
                aka <span className="text-cyan-400">@{personalInfo.alias}</span> — {personalInfo.title}
              </p>
            </div>

            {/* Bio Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* Quick Badge Chips */}
            <div className="flex flex-wrap gap-2.5 font-mono text-xs">
              <span className="px-3 py-1 rounded-lg border border-purple-500/20 bg-purple-900/20 text-purple-200 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-400" /> DIU Intra CTF Champion
              </span>
              <span className="px-3 py-1 rounded-lg border border-cyan-500/20 bg-cyan-900/20 text-cyan-200 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-cyan-400" /> CCNA 200-301 Track
              </span>
              <span className="px-3 py-1 rounded-lg border border-indigo-500/20 bg-indigo-900/20 text-indigo-200 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-400" /> General Secretary @ DIU CPC
              </span>
              <span className="px-3 py-1 rounded-lg border border-slate-700 bg-slate-900/40 text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Dhaka, Bangladesh
              </span>
            </div>

            {/* Action Buttons & Socials */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#research"
                className="group px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore 5 Papers</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#terminal"
                className="px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold text-slate-200 hover:text-white border border-slate-700 hover:border-purple-400/60 bg-slate-900/60 hover:bg-purple-950/30 transition-all flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Launch Terminal</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5 ml-0 sm:ml-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-purple-300 hover:border-purple-500/40 transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-rose-300 hover:border-rose-500/40 transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Holographic Cyber Portrait Frame */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group w-full max-w-[320px]">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 opacity-30 blur-xl group-hover:opacity-60 transition duration-700 animate-electric" />
              
              {/* Sci-fi Corner Brackets */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-purple-500/40 via-slate-800 to-cyan-500/40 border border-purple-500/30 overflow-hidden shadow-2xl">
                
                {/* Profile Image with subtle cyber scanline filter */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-950">
                  <img
                    src="/profile.jpeg"
                    alt="Md. Yousuf Hossain"
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
                  />
                  
                  {/* Subtle Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030408] via-transparent to-transparent opacity-80" />

                  {/* High-tech HUD tag at bottom of photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl glass-panel border border-purple-500/30 font-mono text-[11px] text-slate-200">
                    <div className="flex justify-between items-center text-purple-300 font-bold">
                      <span>YOUSUF.MEHRAB</span>
                      <span className="text-emerald-400">ACTIVE</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      NODE_ID: BD-DHAKA-DIU // CSE
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Stats HUD Bar below Hero */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-panel p-5 rounded-2xl border border-purple-500/15 relative overflow-hidden group hover:border-purple-500/40 transition-all"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/15 transition-all" />
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-baseline gap-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-purple-400/80 font-normal">
                  {stat.suffix}
                </span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-400 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
