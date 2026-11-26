import React, { useState } from "react";
import { publications } from "../data/portfolioData";
import { BookOpen, Sparkles, CheckCircle2, ChevronRight, FileText, Layers, ShieldCheck } from "lucide-react";

export default function ResearchShowcase() {
  const [activePaper, setActivePaper] = useState(0);

  return (
    <section id="research" className="relative py-28 px-4 sm:px-8 bg-[#04050a] border-t border-purple-900/20">
      
      {/* Background Section Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-purple-950/20 to-transparent" />
      <div className="pointer-events-none absolute right-10 top-1/2 w-[500px] h-[500px] rounded-full bg-purple-700/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>PEER-REVIEWED RESEARCH // 5 ACCEPTED WORKS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              PUBLICATIONS & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                SCIENTIFIC CONTRIBUTIONS
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-md">
            Author and co-author on 5 research publications spanning zero-trust mobile frameworks, audio-domain steganography, smart city intrusion detection, and ad-hoc mesh networks.
          </p>
        </div>

        {/* Papers Grid with AetherMind Electric Arc Borders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Selection List (Left Column) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {publications.map((paper, idx) => (
              <button
                key={paper.id}
                onClick={() => setActivePaper(idx)}
                className={`text-left p-4 rounded-2xl transition-all duration-300 border relative overflow-hidden group ${
                  activePaper === idx
                    ? "glass-panel border-purple-400/80 shadow-[0_0_25px_rgba(168,85,247,0.25)] bg-purple-950/40"
                    : "border-slate-800/80 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                {activePaper === idx && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-400 to-cyan-400" />
                )}
                <div className="flex items-center justify-between font-mono text-[10px] text-purple-400 mb-1">
                  <span className="font-bold tracking-wider">[PAPER 0{idx + 1}]</span>
                  <span className="text-slate-400">{paper.year}</span>
                </div>
                <h4 className={`text-sm font-semibold line-clamp-2 transition-colors ${
                  activePaper === idx ? "text-white" : "text-slate-300 group-hover:text-white"
                }`}>
                  {paper.title}
                </h4>
                <div className="mt-2 text-xs font-mono text-cyan-400/80 flex items-center gap-1">
                  <span>{paper.publisher}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Paper Showcase Card (Right Column) */}
          <div className="lg:col-span-8">
            {(() => {
              const paper = publications[activePaper];
              return (
                <div className="relative rounded-3xl glass-panel p-6 sm:p-10 border border-purple-500/30 shadow-[0_12px_48px_rgba(0,0,0,0.6)] overflow-hidden">
                  
                  {/* SVG Electric Lightning Border Overlay */}
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full stroke-purple-400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="calc(100% - 4px)"
                      height="calc(100% - 4px)"
                      rx="22"
                      strokeWidth="2"
                      strokeDasharray="40 160"
                      className="animate-[electric-arc_5s_ease-in-out_infinite]"
                    />
                  </svg>

                  {/* Header Badges */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-6">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      {paper.tag}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      {paper.publisher}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-slate-800 text-slate-300">
                      Year: {paper.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                    {paper.title}
                  </h3>

                  {/* Authors */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 font-mono text-xs sm:text-sm text-slate-300">
                    <span className="text-purple-400 font-bold">Authors: </span>
                    {paper.authors}
                  </div>

                  {/* Abstract / Summary */}
                  <div className="mt-6 p-5 rounded-2xl bg-black/40 border border-purple-500/15">
                    <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Abstract / Key Methodology
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                      {paper.summary}
                    </p>
                  </div>

                  {/* Core Topics Pills */}
                  <div className="mt-6">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                      Domain Research Fields
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {paper.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 rounded-xl text-xs font-mono bg-purple-950/40 text-purple-300 border border-purple-500/30"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Verified Stamp */}
                  <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>PEER-REVIEW STATUS: VERIFIED CAMERA READY</span>
                    </div>
                    <div className="text-purple-300/80">
                      Taylor & Francis CRC Press Series
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
}
