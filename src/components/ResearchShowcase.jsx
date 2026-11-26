import React, { useState, useEffect, useRef } from "react";
import { publications } from "../data/portfolioData";
import { BookOpen, FileText, Copy, Check, Download, X, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";

export default function ResearchShowcase() {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const copyBibtex = (paper) => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedId(paper.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Staggered Publication Cards Entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 45, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="research"
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-transparent border-t border-purple-900/25"
    >
      {/* Background Section Glow */}
      <div className="pointer-events-none absolute right-10 top-1/4 w-[400px] h-[400px] rounded-full bg-purple-700/10 blur-[160px]" />
      <div className="pointer-events-none absolute left-10 bottom-1/4 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 // DIGITAL ARCHIVE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              PUBLICATIONS & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300">
                RESEARCH SCHOLARSHIP
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-md">
            Author & co-author on 5 research works including accepted Taylor & Francis book chapters across zero-trust mobile sandboxing, cross-media steganography, and disaster mesh topologies.
          </p>
        </div>

        {/* Clean, Scannable Publication Cards Grid with Staggered Entrance */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {publications.map((paper) => (
            <div
              key={paper.id}
              className="rounded-3xl glass-panel p-5 sm:p-6 border border-purple-500/20 hover:border-cyan-400/50 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="flex flex-col">
                
                {/* Status & Venue Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30">
                    {paper.statusBadge}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {paper.year}
                  </span>
                </div>

                <div className="font-mono text-[11px] text-cyan-400 font-semibold mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{paper.venueType} · {paper.publisher}</span>
                </div>

                {/* Paper Title */}
                <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-3 leading-snug mb-2.5">
                  {paper.title}
                </h3>

                {/* Role / Contribution Stamp */}
                <div className="font-mono text-[11px] text-purple-300/90 mb-3 bg-purple-950/20 p-2 rounded-xl border border-purple-500/15">
                  <span className="text-slate-400">Role: </span>
                  {paper.role}
                </div>

                {/* Concise Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3 mb-4">
                  {paper.summary}
                </p>

                {/* Keyword Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {paper.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/40 text-slate-300 border border-slate-800"
                    >
                      {kw}
                    </span>
                  ))}
                  {paper.keywords.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/40 text-slate-500 border border-slate-800">
                      +{paper.keywords.length - 3}
                    </span>
                  )}
                </div>

              </div>

              {/* Action Buttons: Details Modal, PDF, BibTeX */}
              <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 font-mono text-xs">
                <button
                  onClick={() => setSelectedPaper(paper)}
                  className="px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyBibtex(paper)}
                    className="p-1.5 rounded-xl border border-slate-800 hover:border-purple-400/50 bg-slate-900 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95"
                    title="Copy BibTeX Citation"
                  >
                    {copiedId === paper.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {paper.pdfUrl && (
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Publication Detail Modal */}
        {selectedPaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#080c1f] border border-purple-500/40 p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col gap-5 text-slate-200">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedPaper(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white transition-colors touch-target flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs mb-2 pr-8">
                  <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                    {selectedPaper.statusBadge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                    {selectedPaper.venueType} · {selectedPaper.publisher}
                  </span>
                  <span className="text-slate-400">Year: {selectedPaper.year}</span>
                </div>

                <h3 className="font-display text-lg sm:text-2xl font-bold text-white leading-snug">
                  {selectedPaper.title}
                </h3>
              </div>

              {/* Authors & Yousuf's Contribution */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-purple-500/20 font-mono text-xs space-y-2">
                <div>
                  <span className="text-purple-400 font-bold">Authors: </span>
                  <span className="text-slate-300">{selectedPaper.authors}</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold">My Contribution: </span>
                  <span className="text-slate-200">{selectedPaper.role}</span>
                </div>
              </div>

              {/* Full Abstract */}
              <div>
                <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Full Scientific Abstract
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-black/20 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
                  {selectedPaper.abstract}
                </p>
              </div>

              {/* Keywords */}
              <div>
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                  Keywords & Domains
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPaper.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-xl text-xs font-mono bg-purple-950/40 text-purple-300 border border-purple-500/30"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* BibTeX with Instant Copy Button */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-purple-400 uppercase tracking-wider font-bold">
                    BibTeX Citation Entry
                  </span>
                  <button
                    onClick={() => copyBibtex(selectedPaper)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                  >
                    {copiedId === selectedPaper.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy BibTeX</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 sm:p-4 rounded-2xl bg-[#03050a] border border-slate-800 font-mono text-[10px] sm:text-[11px] text-cyan-300 overflow-x-auto whitespace-pre">
                  {selectedPaper.bibtex}
                </pre>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 sm:pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                {selectedPaper.pdfUrl && (
                  <a
                    href={selectedPaper.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold flex items-center gap-2 hover:opacity-95 transition-opacity"
                  >
                    <Download className="w-4 h-4" /> Download Full Paper PDF
                  </a>
                )}
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
                >
                  Close Modal
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
