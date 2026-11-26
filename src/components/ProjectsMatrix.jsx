import React, { useState, useEffect, useRef } from "react";
import { featuredProjects, secondaryProjects } from "../data/portfolioData";
import { ArrowUpRight, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { gsap } from "gsap";

export default function ProjectsMatrix() {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'flagship' | 'systems'
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [expandedIds, setExpandedIds] = useState({});

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const flagshipRowsRef = useRef([]);

  const displayFlagships = activeTab === "all" || activeTab === "flagship";
  const displaySecondary = activeTab === "all" || activeTab === "systems";

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
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

      flagshipRowsRef.current.forEach((row, idx) => {
        if (!row) return;
        const textCol = row.querySelector(".case-text-col");
        const blueprintCol = row.querySelector(".case-blueprint-col");
        const isEven = idx % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveProjectIndex(idx),
            onEnterBack: () => setActiveProjectIndex(idx),
          },
        });

        if (textCol) {
          tl.fromTo(
            textCol,
            { opacity: 0, x: isEven ? -28 : 28 },
            { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" }
          );
        }

        if (blueprintCol) {
          tl.fromTo(
            blueprintCol,
            { opacity: 0, x: isEven ? 28 : -28, scale: 0.98 },
            { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: "power2.out" },
            "-=0.55"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [displayFlagships]);

  const scrollToProject = (idx) => {
    const el = flagshipRowsRef.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="font-mono text-xs text-sky-400 mb-2">
              03 · Selected Engineering Work
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-100">
              Featured Case Studies
            </h2>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex items-center gap-1.5 font-sans text-xs overflow-x-auto pb-1 max-w-full scrollbar-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap border ${
                activeTab === "all"
                  ? "bg-sky-500/15 text-sky-300 border-sky-400/40 font-medium"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-white/[0.08]"
              }`}
            >
              All work ({featuredProjects.length + secondaryProjects.length})
            </button>
            <button
              onClick={() => setActiveTab("flagship")}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap border ${
                activeTab === "flagship"
                  ? "bg-sky-500/15 text-sky-300 border-sky-400/40 font-medium"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-white/[0.08]"
              }`}
            >
              Case studies ({featuredProjects.length})
            </button>
            <button
              onClick={() => setActiveTab("systems")}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap border ${
                activeTab === "systems"
                  ? "bg-sky-500/15 text-sky-300 border-sky-400/40 font-medium"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-white/[0.08]"
              }`}
            >
              Systems & tools ({secondaryProjects.length})
            </button>
          </div>
        </div>

        {/* Quiet Case Study Jump Index on Desktop */}
        {displayFlagships && (
          <div className="hidden lg:flex items-center justify-between gap-4 pb-6 mb-4 border-b border-white/[0.08] font-mono text-xs">
            <span className="text-slate-500 shrink-0">Case study index</span>
            <div className="flex items-center gap-6">
              {featuredProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => scrollToProject(idx)}
                  className={`py-1 transition-colors border-b-2 ${
                    activeProjectIndex === idx
                      ? "border-sky-400 text-slate-100 font-medium"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  0{idx + 1}. {p.title.split(" / ")[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Alternating Asymmetric Editorial Flagship Case Studies */}
        {displayFlagships && (
          <div className="flex flex-col divide-y divide-white/[0.08] mb-16">
            {featuredProjects.map((project, idx) => {
              const isReversed = idx % 2 === 1;
              const isExpanded = !!expandedIds[project.id];
              const archStages = project.architecture.split("→").map((s) => s.trim());

              return (
                <article
                  key={project.id}
                  ref={(el) => (flagshipRowsRef.current[idx] = el)}
                  className="py-12 sm:py-16 first:pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                >
                  {/* Narrative & Details Column */}
                  <div
                    className={`case-text-col lg:col-span-7 flex flex-col gap-5 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Metadata separated from title */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-slate-400">
                      <span className="text-sky-400">0{idx + 1}</span>
                      <span className="text-slate-600">/</span>
                      <span>{project.category}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-300">{project.coverTag}</span>
                    </div>

                    {/* Prominent Title & Subtitle */}
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-semibold tracking-tight text-slate-50 leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-sky-400/90 mt-1.5 leading-snug max-w-xl">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Concise Editorial Overview (Problem + Solution) */}
                    <div className="space-y-3 font-sans text-sm sm:text-[15px] text-slate-300 leading-relaxed max-w-prose">
                      <p>{project.problem}</p>
                      <p className="text-slate-200">{project.solution}</p>
                    </div>

                    {/* Expandable Deep Technical Contribution */}
                    <div>
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-sky-400 hover:text-sky-300 transition-colors py-1"
                        aria-expanded={isExpanded}
                      >
                        <span>
                          {isExpanded ? "Hide technical contribution" : "Read contribution & outcome"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 pt-4 border-t border-white/[0.08] space-y-3 font-sans text-sm text-slate-300 leading-relaxed max-w-prose">
                          <div>
                            <span className="font-mono text-[11px] text-slate-400 block mb-1">
                              Contribution
                            </span>
                            {project.contribution}
                          </div>
                          <div>
                            <span className="font-mono text-[11px] text-slate-400 block mb-1">
                              Verifiable Outcome
                            </span>
                            <span className="text-slate-100">{project.results}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Consistent Subtle Technology Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/[0.07]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Distinct Action Links */}
                    <div className="flex flex-wrap items-center gap-4 pt-2 font-sans text-sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-slate-100 hover:text-sky-400 transition-colors"
                      >
                        <span>Source code</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      {project.pdfUrl && (
                        <a
                          href={project.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white border border-white/[0.12] hover:border-sky-400/50 bg-white/[0.03] transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-sky-400" />
                          <span>Read Paper (PDF)</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Visual Architecture Blueprint Column */}
                  <div
                    className={`case-blueprint-col lg:col-span-5 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="surface-panel rounded-2xl p-6 sm:p-7 flex flex-col gap-5">
                      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                        <span className="font-mono text-[11px] text-slate-400">
                          System pipeline
                        </span>
                        <span className="font-mono text-[11px] text-sky-400">
                          {archStages.length} stages
                        </span>
                      </div>

                      {/* Vertical Stepped Pipeline Blueprint */}
                      <ol className="space-y-3 font-mono text-xs">
                        {archStages.map((stage, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-3">
                            <span className="text-[11px] text-slate-500 tabular-nums mt-0.5 shrink-0">
                              0{sIdx + 1}
                            </span>
                            <span className="text-slate-200 leading-snug">
                              {stage}
                            </span>
                          </li>
                        ))}
                      </ol>

                      <div className="pt-4 border-t border-white/[0.08]">
                        <div className="font-mono text-[11px] text-slate-400 mb-1">
                          Measured result
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {project.results}
                        </p>
                      </div>
                    </div>
                  </div>

                </article>
              );
            })}
          </div>
        )}

        {/* Secondary Software & Infrastructure — Clean Open Editorial Index */}
        {displaySecondary && (
          <div className="pt-8 border-t border-white/[0.08]">
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-100">
                Additional Software & Infrastructure
              </h3>
              <a
                href="https://github.com/assassinyousuf"
                target="_blank"
                rel="noreferrer"
                className="font-sans text-xs sm:text-sm text-slate-400 hover:text-sky-400 inline-flex items-center gap-1 transition-colors"
              >
                <span>All repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {secondaryProjects.map((p) => (
                <div
                  key={p.title}
                  className="pt-5 border-t border-white/[0.08] flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-1.5 font-mono text-[11px]">
                      <span className="text-sky-400">{p.category}</span>
                      <span className="text-slate-500">{p.status}</span>
                    </div>

                    <h4 className="font-display text-lg font-semibold text-slate-100 mb-2">
                      {p.title}
                    </h4>
                    <p className="font-sans text-sm text-slate-400 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-white/[0.03] border border-white/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-sans font-medium text-slate-200 hover:text-sky-400 transition-colors"
                    >
                      <span>Source</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
