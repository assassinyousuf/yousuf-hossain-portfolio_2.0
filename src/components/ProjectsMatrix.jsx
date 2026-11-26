import React, { useState } from "react";
import { featuredProjects, secondaryProjects } from "../data/portfolioData";
import { FolderGit2, ExternalLink, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function ProjectsMatrix() {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'flagship' | 'systems'

  const displayFlagships = activeTab === "all" || activeTab === "flagship";
  const displaySecondary = activeTab === "all" || activeTab === "systems";

  return (
    <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-transparent border-t border-purple-900/25">
      
      {/* Subtle Ambient Section Glow */}
      <div className="pointer-events-none absolute left-10 top-1/3 w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-10 bottom-1/3 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>03 // ENGINEERING ARCHIVE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              FEATURED ENGINEERING // <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300">
                TECHNICAL CASE STUDIES
              </span>
            </h2>
          </div>

          {/* Filter Tabs - Mobile Horizontal Scrollable */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#090d22] border border-purple-500/20 font-mono text-xs overflow-x-auto max-w-full scrollbar-none self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(147,51,234,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All ({featuredProjects.length + secondaryProjects.length})
            </button>
            <button
              onClick={() => setActiveTab("flagship")}
              className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === "flagship"
                  ? "bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(147,51,234,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Flagship Studies ({featuredProjects.length})
            </button>
            <button
              onClick={() => setActiveTab("systems")}
              className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === "systems"
                  ? "bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(147,51,234,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Secondary Tools ({secondaryProjects.length})
            </button>
          </div>
        </div>

        {/* Flagship Case Studies Showcase */}
        {displayFlagships && (
          <div className="flex flex-col gap-6 sm:gap-8 mb-12 sm:mb-16">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl glass-panel p-5 sm:p-8 md:p-10 border border-purple-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-purple-400/50 flex flex-col gap-5 sm:gap-6 relative overflow-hidden"
              >
                {/* Top Glowing Strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 opacity-70" />

                {/* Header: Tag + Badges + Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 sm:pb-5">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-purple-400 tracking-wider">
                      {project.tag}
                    </span>
                    <h3 className="font-display text-xl sm:text-3xl font-bold text-white mt-1">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-cyan-400/90 mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                    <span className="px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold bg-purple-950/60 text-purple-300 border border-purple-500/40">
                      {project.coverTag}
                    </span>
                    <span className="px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] bg-slate-900 text-slate-300 border border-slate-800">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Structured Case Study Grid: Problem, Solution, Contribution, Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  
                  {/* Left Column: Problem & Solution */}
                  <div className="flex flex-col gap-4">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-rose-500/15">
                      <div className="font-mono text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                        The Problem
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-emerald-500/15">
                      <div className="font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        The Solution & Architecture
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: What I Contributed & Results */}
                  <div className="flex flex-col gap-4">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-purple-500/20">
                      <div className="font-mono text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                        What I Contributed
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {project.contribution}
                      </p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-cyan-500/20">
                      <div className="font-mono text-[11px] font-bold text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        Results & Verifiable Outcomes
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {project.results}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Architecture Pipeline Flow Diagram */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#03050c] border border-slate-800 font-mono text-[11px]">
                  <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                    System Architecture Flow
                  </div>
                  <div className="text-cyan-300 overflow-x-auto whitespace-nowrap py-1">
                    {project.architecture}
                  </div>
                </div>

                {/* Tech Stack & Action Links */}
                <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono bg-purple-950/30 text-purple-300 border border-purple-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {project.pdfUrl && (
                      <a
                        href={project.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Paper PDF</span>
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-purple-400/50 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-purple-400" />
                      <span>Source</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Secondary Systems Grid */}
        {displaySecondary && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-lg sm:text-2xl font-bold text-white">
                ADDITIONAL SOFTWARE & INFRASTRUCTURE
              </h3>
              <a
                href="https://github.com/assassinyousuf"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-purple-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>GitHub Repos</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {secondaryProjects.map((p, idx) => (
                <div
                  key={p.title}
                  className="rounded-2xl glass-panel p-5 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-purple-400 mb-2">
                      <span className="font-bold">SYSTEM // 0{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-900 text-slate-300 border border-slate-800">
                        {p.status}
                      </span>
                    </div>

                    <h4 className="font-display text-base sm:text-xl font-bold text-white mb-1">
                      {p.title}
                    </h4>
                    <p className="font-mono text-xs text-cyan-400 mb-2.5">
                      {p.category}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-4">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/40 text-slate-300 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-white bg-slate-900 hover:bg-purple-900/40 border border-slate-800 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-purple-400" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
