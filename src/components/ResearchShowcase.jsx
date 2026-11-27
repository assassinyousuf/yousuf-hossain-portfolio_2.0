import React, { useState, useEffect, useRef } from "react";
import { personalInfo, publications } from "../data/portfolioData";
import { ChevronDown, ChevronUp, Copy, Check, Mail } from "lucide-react";
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-[var(--border-subtle)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Clean Editorial Header (Soft Violet accent for Research section) */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs text-[#A78BFA] mb-2">
              04 · Research Archive
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#E8E4DA]">
              Publications & Scholarship
            </h2>
          </div>
          <p className="font-sans text-sm text-[#8C96A8] max-w-md leading-relaxed">
            Peer-reviewed Taylor & Francis book chapters and camera-ready research manuscripts, with cover previews and BibTeX citation records.
          </p>
        </div>

        {/* Visual Research Showcase */}
        <div ref={listRef} className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {publications.map((paper, idx) => {
            const isExpanded = expandedId === paper.id;
            const isAccepted = paper.statusType === "accepted";

            return (
              <article key={paper.id} className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Paper Cover Thumbnail Matted in Warm Ivory */}
                {paper.coverImage && (
                  <div className="md:col-span-3 lg:col-span-2">
                    <div
                      className="rounded-lg overflow-hidden border border-[var(--border-strong)] bg-[#E8E4DA] max-w-[140px] shadow-[var(--shadow-surface)]"
                      title={`Manuscript preview: ${paper.title}`}
                    >
                      <img
                        src={paper.coverImage}
                        alt={`First page preview of ${paper.title}`}
                        className="w-full h-auto aspect-[3/4] object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                <div className={paper.coverImage ? "md:col-span-9 lg:col-span-10 flex flex-col gap-3" : "md:col-span-12 flex flex-col gap-3"}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#8C96A8]">
                      <span className="text-[#5C6575] tabular-nums">0{idx + 1}</span>
                      <span className="text-[#5C6575]">·</span>
                      <span>{paper.year}</span>
                      <span className="text-[#5C6575]">·</span>
                      <span className="text-[#B4BCC9]">{paper.venueType}</span>
                      <span className="text-[#5C6575]">·</span>
                      <span>{paper.publisher}</span>
                    </div>

                    {/* Soft Violet for Book Chapters Accepted, Electric Cyan for Submitted */}
                    <span
                      className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full border ${
                        isAccepted
                          ? "text-[#A78BFA] border-[#A78BFA]/35 bg-[#A78BFA]/10"
                          : "text-[#65D6E7] border-[#65D6E7]/35 bg-[#65D6E7]/10"
                      }`}
                    >
                      {paper.statusBadge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[#E8E4DA] leading-snug max-w-4xl">
                    {paper.title}
                  </h3>

                  <div className="font-sans text-sm text-[#8C96A8] leading-relaxed max-w-4xl">
                    <span>{paper.authors}</span>
                    <span className="text-[#5C6575] mx-2">—</span>
                    <span className="text-[#B4BCC9]">{paper.role}</span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 font-sans text-xs sm:text-sm">
                    <button
                      type="button"
                      onClick={() => togglePaper(paper.id)}
                      className="inline-flex items-center gap-1.5 font-medium text-[#65D6E7] hover:text-[#8CE1EE] transition-colors py-1"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? "Hide abstract" : "Read abstract & graphical view"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => copyBibtex(paper)}
                      className="inline-flex items-center gap-1.5 text-[#8C96A8] hover:text-[#E8E4DA] transition-colors py-1"
                    >
                      {copiedId === paper.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#65D6E7]" />
                          <span className="text-[#65D6E7]">BibTeX copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy BibTeX</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`Manuscript Request: ${paper.title}`)}`}
                      className="inline-flex items-center gap-1.5 text-[#B4BCC9] hover:text-[#65D6E7] transition-colors py-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Request Manuscript</span>
                    </a>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-5 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 space-y-4">
                        <div>
                          <div className="font-mono text-[11px] text-[#8C96A8] mb-1.5">
                            Abstract
                          </div>
                          <p className="font-sans text-sm text-[#B4BCC9] leading-relaxed max-w-prose">
                            {paper.abstract}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {paper.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#8C96A8] bg-[#151922] border border-[var(--border-subtle)]"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-4">
                        {paper.figureImage && (
                          <div>
                            <div className="font-mono text-[11px] text-[#8C96A8] mb-1.5">
                              System Figure (from manuscript)
                            </div>
                            <div className="rounded-xl overflow-hidden border border-[var(--border-strong)] bg-[#E8E4DA] p-2">
                              <img
                                src={paper.figureImage}
                                alt={`Architecture diagram from ${paper.title}`}
                                className="w-full h-auto max-h-[200px] object-contain mx-auto"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="font-mono text-[11px] text-[#8C96A8] mb-1.5">
                            BibTeX ({paper.series})
                          </div>
                          <pre className="p-3.5 rounded-xl surface-recessed font-mono text-[11px] text-[#B4BCC9] overflow-x-auto whitespace-pre leading-relaxed">
                            {paper.bibtex}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
