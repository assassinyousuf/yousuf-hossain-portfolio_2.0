import React, { useState, useEffect, useRef } from "react";
import { publications } from "../data/portfolioData";
import { ChevronDown, ChevronUp, Copy, Check, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

export default function ResearchShowcase() {
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  const togglePaper = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const copyBibtex = (paper) => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedId(paper.id);
    setTimeout(() => setCopiedId(null), 2400);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 82%",
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Clean Editorial Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs text-sky-400 mb-2">
              04 · Research Archive
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-100">
              Publications & Scholarship
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md leading-relaxed">
            Five peer-reviewed works across zero-trust mobile execution, audio-domain steganography, IoT intrusion detection, and ad-hoc mesh routing.
          </p>
        </div>

        {/* Editorial Publication Rows (Abstracts collapsed by default) */}
        <div ref={listRef} className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {publications.map((paper, idx) => {
            const isExpanded = expandedId === paper.id;
            const isAccepted = paper.statusType === "accepted";

            return (
              <article key={paper.id} className="py-7 sm:py-9 flex flex-col gap-3">
                
                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-slate-400">
                    <span className="text-slate-500 tabular-nums">0{idx + 1}</span>
                    <span className="text-slate-600">·</span>
                    <span>{paper.year}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-300">{paper.venueType}</span>
                    <span className="text-slate-600">·</span>
                    <span>{paper.publisher}</span>
                  </div>

                  {/* Subtle, accurate status indicator */}
                  <span
                    className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full border ${
                      isAccepted
                        ? "text-emerald-300 border-emerald-500/30 bg-emerald-500/10"
                        : "text-sky-300 border-sky-400/30 bg-sky-500/10"
                    }`}
                  >
                    {paper.statusBadge}
                  </span>
                </div>

                {/* Strong Full Publication Title */}
                <h3 className="font-display text-lg sm:text-xl font-semibold text-slate-100 leading-snug max-w-4xl">
                  {paper.title}
                </h3>

                {/* Secondary Authors & Role */}
                <div className="font-sans text-sm text-slate-400 leading-relaxed max-w-4xl">
                  <span>{paper.authors}</span>
                  <span className="text-slate-600 mx-2">—</span>
                  <span className="text-slate-300">{paper.role}</span>
                </div>

                {/* Actions Row: Expand Abstract, Copy BibTeX, PDF */}
                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 font-sans text-xs sm:text-sm">
                  <button
                    onClick={() => togglePaper(paper.id)}
                    className="inline-flex items-center gap-1.5 font-medium text-sky-400 hover:text-sky-300 transition-colors py-1"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? "Hide abstract" : "Read abstract"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => copyBibtex(paper)}
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-100 transition-colors py-1"
                  >
                    {copiedId === paper.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">BibTeX copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy BibTeX</span>
                      </>
                    )}
                  </button>

                  {paper.pdfUrl && (
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors py-1"
                    >
                      <span>Paper (PDF)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Expandable Abstract & Citation Drawer */}
                {isExpanded && (
                  <div className="mt-3 pt-5 border-t border-white/[0.06] grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <div className="font-mono text-[11px] text-slate-400 mb-1.5">
                          Abstract
                        </div>
                        <p className="font-sans text-sm text-slate-300 leading-relaxed max-w-prose">
                          {paper.abstract}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {paper.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2.5 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-white/[0.03] border border-white/[0.06]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="font-mono text-[11px] text-slate-400 mb-1.5">
                        BibTeX entry ({paper.series})
                      </div>
                      <pre className="p-3.5 rounded-xl bg-[#04060a] border border-white/[0.08] font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
                        {paper.bibtex}
                      </pre>
                    </div>
                  </div>
                )}

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
