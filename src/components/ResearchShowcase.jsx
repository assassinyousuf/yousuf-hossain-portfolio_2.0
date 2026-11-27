import React, { useState, useEffect, useRef } from "react";
import { personalInfo, publications } from "../data/portfolioData";
import { ChevronDown, ChevronUp, Copy, Check, Mail, Maximize2, X } from "lucide-react";
import { gsap } from "gsap";

function highlightAuthor(authorsStr) {
  const target = "Md. Yousuf Hossain";
  const parts = authorsStr.split(target);
  if (parts.length === 1) return authorsStr;
  return (
    <>
      {parts[0]}
      <span className="text-[#EDE9DF] font-semibold underline decoration-[#A78BFA]/50 underline-offset-4">
        {target}
      </span>
      {parts[1]}
    </>
  );
}

export default function ResearchShowcase() {
  const [expandedId, setExpandedId] = useState("pub-1");
  const [copiedId, setCopiedId] = useState(null);
  const [previewPlate, setPreviewPlate] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  const bookChapters = publications.filter((p) => p.statusType === "accepted");
  const conferencePapers = publications.filter((p) => p.statusType !== "accepted");

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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
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
          { opacity: 0, y: 20 },
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 section-band border-y border-[var(--border-subtle)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Architectural Academic Header */}
        <div ref={headerRef} className="mb-12 sm:mb-14">
          <div className="flex items-center gap-4 font-mono text-xs mb-4">
            <span className="text-[#A78BFA] tracking-wider">04 / RESEARCH</span>
            <span className="h-[1px] flex-1 bg-[var(--border-subtle)]" />
            <span className="text-[#8A94A6] hidden sm:inline">5 PEER-REVIEWED WORKS · 2026</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-medium tracking-[-0.025em] text-[#EDE9DF]">
                Publications &amp; Scholarship
              </h2>
              <p className="font-sans text-sm text-[#8A94A6] mt-2 max-w-2xl leading-relaxed">
                Accepted Taylor &amp; Francis / CRC Press book chapters and camera-ready research manuscripts, complete with manuscript plates, methodology figures, and BibTeX citation records.
              </p>
            </div>

            <div className="flex items-center gap-5 font-mono text-xs shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-[var(--border-subtle)]">
              <div>
                <span className="text-[#A78BFA] font-semibold">03</span>{" "}
                <span className="text-[#8A94A6]">Taylor &amp; Francis</span>
              </div>
              <span className="text-[#5A6476]">/</span>
              <div>
                <span className="text-[#65D6E7] font-semibold">02</span>{" "}
                <span className="text-[#8A94A6]">Camera-Ready</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={listRef} className="space-y-14">
          
          {/* Tier 1: Accepted Book Chapters (Taylor & Francis) */}
          <div className="space-y-6">
            <div className="font-mono text-[11px] text-[#A78BFA] tracking-wider">
              ACCEPTED BOOK CHAPTERS · TAYLOR &amp; FRANCIS / CRC PRESS
            </div>

            <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
              {bookChapters.map((paper, idx) => {
                const isExpanded = expandedId === paper.id;

                return (
                  <article key={paper.id} className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    
                    {/* Left: Uncropped Archival Cover Plate */}
                    <div className="lg:col-span-3 flex items-start gap-4">
                      {paper.coverImage && (
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewPlate({
                              src: paper.coverImage,
                              title: paper.title,
                              subtitle: `${paper.publisher} · ${paper.year}`,
                            })
                          }
                          className="group relative rounded-lg overflow-hidden specimen-plate p-1.5 w-[132px] sm:w-[148px] shrink-0 text-left transition-transform hover:-translate-y-0.5"
                          title="Inspect manuscript plate"
                        >
                          <img
                            src={paper.coverImage}
                            alt={`Manuscript preview of ${paper.title}`}
                            className="w-full h-auto aspect-[3/4] object-contain bg-white"
                            loading="lazy"
                          />
                          <span className="absolute bottom-2 right-2 p-1 rounded bg-[#0B0D12]/80 text-[#EDE9DF] opacity-80 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3 h-3" />
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Right: Editorial Citation & Graphical Abstract */}
                    <div className="lg:col-span-9 flex flex-col gap-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-[#8A94A6]">
                          <span className="text-[#A78BFA] tabular-nums">CH. 0{idx + 1}</span>
                          <span className="text-[#5A6476]">·</span>
                          <span>{paper.year}</span>
                          <span className="text-[#5A6476]">·</span>
                          <span className="text-[#EDE9DF]">{paper.publisher}</span>
                          <span className="text-[#5A6476]">·</span>
                          <span>{paper.venueType}</span>
                        </div>

                        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full border text-[#A78BFA] border-[#A78BFA]/35 bg-[#A78BFA]/10">
                          {paper.statusBadge}
                        </span>
                      </div>

                      <h3 className="font-sans text-lg sm:text-xl font-bold text-[#EDE9DF] leading-snug max-w-4xl">
                        {paper.title}
                      </h3>

                      <div className="font-sans text-sm text-[#8A94A6] leading-relaxed max-w-4xl">
                        {highlightAuthor(paper.authors)}
                        <span className="text-[#5A6476] mx-2">—</span>
                        <span className="text-[#BAC2CF]">{paper.role}</span>
                      </div>

                      <p className="font-sans text-sm text-[#BAC2CF] leading-relaxed max-w-3xl">
                        {paper.summary}
                      </p>

                      <div className="pt-1 flex flex-wrap items-center gap-4 sm:gap-6 font-sans text-xs sm:text-sm">
                        <button
                          type="button"
                          onClick={() => togglePaper(paper.id)}
                          className="inline-flex items-center gap-1.5 font-medium text-[#65D6E7] hover:text-[#8DE2EF] transition-colors py-1"
                          aria-expanded={isExpanded}
                        >
                          <span>{isExpanded ? "Hide abstract & figure" : "Abstract, figure & BibTeX"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => copyBibtex(paper)}
                          className="inline-flex items-center gap-1.5 text-[#8A94A6] hover:text-[#EDE9DF] transition-colors py-1"
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
                          className="inline-flex items-center gap-1.5 text-[#BAC2CF] hover:text-[#65D6E7] transition-colors py-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Request Manuscript</span>
                        </a>
                      </div>

                      {isExpanded && (
                        <div className="mt-3 pt-5 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-6">
                          <div className="lg:col-span-7 space-y-4">
                            <div>
                              <div className="font-mono text-[11px] text-[#8A94A6] mb-1.5">
                                ABSTRACT
                              </div>
                              <p className="font-sans text-sm text-[#BAC2CF] leading-relaxed">
                                {paper.abstract}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {paper.keywords.map((kw) => (
                                <span
                                  key={kw}
                                  className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#8A94A6] bg-[#07090D] border border-[var(--border-subtle)]"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="lg:col-span-5 space-y-4">
                            {paper.figureImage && (
                              <div>
                                <div className="font-mono text-[11px] text-[#8A94A6] mb-1.5">
                                  METHODOLOGY FIGURE
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPreviewPlate({
                                      src: paper.figureImage,
                                      title: paper.title,
                                      subtitle: "System Architecture Figure",
                                    })
                                  }
                                  className="w-full rounded-xl overflow-hidden specimen-plate p-2 block hover:opacity-95 transition-opacity"
                                >
                                  <img
                                    src={paper.figureImage}
                                    alt={`Architecture diagram from ${paper.title}`}
                                    className="w-full h-auto max-h-[190px] object-contain mx-auto"
                                    loading="lazy"
                                  />
                                </button>
                              </div>
                            )}

                            <div>
                              <div className="font-mono text-[11px] text-[#8A94A6] mb-1.5">
                                BIBTEX ({paper.series})
                              </div>
                              <pre className="p-3.5 rounded-xl surface-recessed font-mono text-[11px] text-[#BAC2CF] overflow-x-auto whitespace-pre leading-relaxed">
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

          {/* Tier 2: Camera-Ready Conference Manuscripts */}
          <div className="space-y-6">
            <div className="font-mono text-[11px] text-[#65D6E7] tracking-wider">
              CAMERA-READY CONFERENCE MANUSCRIPTS
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {conferencePapers.map((paper, idx) => {
                const isExpanded = expandedId === paper.id;

                return (
                  <article
                    key={paper.id}
                    className="surface-panel rounded-2xl p-6 flex flex-col justify-between gap-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 font-mono text-[11px]">
                        <span className="text-[#65D6E7]">
                          PAPER 0{bookChapters.length + idx + 1} · {paper.year}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full border text-[#65D6E7] border-[#65D6E7]/35 bg-[#65D6E7]/10">
                          {paper.statusBadge}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        {paper.coverImage && (
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewPlate({
                                src: paper.coverImage,
                                title: paper.title,
                                subtitle: `${paper.venueType} · ${paper.year}`,
                              })
                            }
                            className="group relative rounded-lg overflow-hidden specimen-plate p-1.5 w-[116px] shrink-0 transition-transform hover:-translate-y-0.5"
                            title="Inspect manuscript first page"
                          >
                            <img
                              src={paper.coverImage}
                              alt={`First page preview of ${paper.title}`}
                              className="w-full h-auto aspect-[3/4] object-contain bg-white"
                              loading="lazy"
                            />
                            <span className="absolute bottom-1.5 right-1.5 p-1 rounded bg-[#0B0D12]/80 text-[#EDE9DF] opacity-80 group-hover:opacity-100">
                              <Maximize2 className="w-2.5 h-2.5" />
                            </span>
                          </button>
                        )}

                        <div className="space-y-2 min-w-0">
                          <h3 className="font-sans text-base sm:text-lg font-bold text-[#EDE9DF] leading-snug">
                            {paper.title}
                          </h3>
                          <p className="font-sans text-xs sm:text-sm text-[#8A94A6] leading-relaxed">
                            {highlightAuthor(paper.authors)}
                          </p>
                          <p className="font-mono text-[11px] text-[#BAC2CF]">
                            Role: {paper.role}
                          </p>
                        </div>
                      </div>

                      <p className="font-sans text-sm text-[#BAC2CF] leading-relaxed">
                        {paper.summary}
                      </p>
                    </div>

                    <div className="space-y-4 pt-3 border-t border-[var(--border-subtle)]">
                      <div className="flex flex-wrap items-center gap-4 font-sans text-xs">
                        <button
                          type="button"
                          onClick={() => togglePaper(paper.id)}
                          className="inline-flex items-center gap-1 font-medium text-[#65D6E7] hover:text-[#8DE2EF] transition-colors"
                          aria-expanded={isExpanded}
                        >
                          <span>{isExpanded ? "Hide abstract" : "Abstract & BibTeX"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => copyBibtex(paper)}
                          className="inline-flex items-center gap-1 text-[#8A94A6] hover:text-[#EDE9DF] transition-colors"
                        >
                          {copiedId === paper.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#65D6E7]" />
                              <span className="text-[#65D6E7]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>BibTeX</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`Manuscript Request: ${paper.title}`)}`}
                          className="inline-flex items-center gap-1 text-[#BAC2CF] hover:text-[#65D6E7] transition-colors ml-auto"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Request</span>
                        </a>
                      </div>

                      {isExpanded && (
                        <div className="space-y-3 pt-3 border-t border-[var(--border-subtle)]">
                          <p className="font-sans text-xs sm:text-sm text-[#BAC2CF] leading-relaxed">
                            {paper.abstract}
                          </p>
                          <pre className="p-3 rounded-xl surface-recessed font-mono text-[10.5px] text-[#BAC2CF] overflow-x-auto whitespace-pre leading-relaxed">
                            {paper.bibtex}
                          </pre>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for Inspecting Manuscript Covers & Figures */}
      {previewPlate && (
        <div
          className="fixed inset-0 z-50 bg-[#07090D]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setPreviewPlate(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Manuscript plate preview"
        >
          <div
            className="relative max-w-3xl w-full surface-panel rounded-2xl p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
              <div>
                <div className="font-mono text-[11px] text-[#A78BFA]">{previewPlate.subtitle}</div>
                <div className="font-sans text-sm sm:text-base font-semibold text-[#EDE9DF] mt-0.5">
                  {previewPlate.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPlate(null)}
                className="p-2 rounded-full border border-[var(--border-subtle)] text-[#8A94A6] hover:text-[#EDE9DF] hover:border-[var(--border-strong)] transition-colors"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-xl specimen-plate p-3 max-h-[75vh] overflow-auto">
              <img
                src={previewPlate.src}
                alt={previewPlate.title}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
