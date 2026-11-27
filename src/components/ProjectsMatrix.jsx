import React, { useState, useEffect, useRef } from "react";
import { personalInfo, featuredProjects, secondaryProjects } from "../data/portfolioData";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { ProjectDiagramRenderer } from "./visuals/ProjectDiagrams";
import { gsap } from "gsap";

export default function ProjectsMatrix() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [expandedIds, setExpandedIds] = useState({});
  const [visualMode, setVisualMode] = useState({});

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const flagshipRowsRef = useRef([]);

  const displayFlagships = activeTab === "all" || activeTab === "flagship";
  const displaySecondary = activeTab === "all" || activeTab === "systems";

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setProjectVisualMode = (id, mode) => {
    setVisualMode((prev) => ({ ...prev, [id]: mode }));
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
        const visualCol = row.querySelector(".case-visual-col");
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

        if (visualCol) {
          tl.fromTo(
            visualCol,
            { opacity: 0, x: isEven ? 24 : -24, scale: 0.98 },
            { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: "power2.out" }
          );
        }

        if (textCol) {
          tl.fromTo(
            textCol,
            { opacity: 0, x: isEven ? -24 : 24 },
            { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" },
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-[var(--border-subtle)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="font-mono text-xs text-[#65D6E7] mb-2">
              03 · Selected Engineering Work
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#E8E4DA]">
              Featured Systems & Case Studies
            </h2>
          </div>

          <div className="flex items-center gap-1.5 font-sans text-xs overflow-x-auto pb-1 max-w-full scrollbar-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap border ${
                activeTab === "all"
                  ? "bg-[#65D6E7]/15 text-[#65D6E7] border-[#65D6E7]/40 font-medium"
                  : "bg-transparent text-[#8C96A8] hover:text-[#E8E4DA] border-[var(--border-subtle)]"
              }`}
            >
              All work ({featuredProjects.length + secondaryProjects.length})
            </button>
            <button
              onClick={() => setActiveTab("flagship")}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap border ${
                activeTab === "flagship"
                  ? "bg-[#65D6E7]/15 text-[#65D6E7] border-[#65D6E7]/40 font-medium"
                  : "bg-transparent text-[#8C96A8] hover:text-[#E8E4DA] border-[var(--border-subtle)]"
              }`}
            >
              Flagship systems ({featuredProjects.length})
            </button>
            <button
              onClick={() => setActiveTab("systems")}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap border ${
                activeTab === "systems"
                  ? "bg-[#65D6E7]/15 text-[#65D6E7] border-[#65D6E7]/40 font-medium"
                  : "bg-transparent text-[#8C96A8] hover:text-[#E8E4DA] border-[var(--border-subtle)]"
              }`}
            >
              Software & tools ({secondaryProjects.length})
            </button>
          </div>
        </div>

        {/* Desktop Index */}
        {displayFlagships && (
          <div className="hidden lg:flex items-center justify-between gap-4 pb-6 mb-4 border-b border-[var(--border-subtle)] font-mono text-xs overflow-x-auto">
            <span className="text-[#5C6575] shrink-0">Index</span>
            <div className="flex items-center gap-5">
              {featuredProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => scrollToProject(idx)}
                  className={`py-1 transition-colors border-b-2 whitespace-nowrap ${
                    activeProjectIndex === idx
                      ? "border-[#65D6E7] text-[#E8E4DA] font-medium"
                      : "border-transparent text-[#8C96A8] hover:text-[#E8E4DA]"
                  }`}
                >
                  0{idx + 1}. {p.title.split(" / ")[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Alternating Visual Case Studies */}
        {displayFlagships && (
          <div className="flex flex-col divide-y divide-[var(--border-subtle)] mb-16">
            {featuredProjects.map((project, idx) => {
              const isReversed = idx % 2 === 1;
              const isExpanded = !!expandedIds[project.id];
              const currentMode = visualMode[project.id] || "diagram";

              return (
                <article
                  key={project.id}
                  ref={(el) => (flagshipRowsRef.current[idx] = el)}
                  className="py-12 sm:py-16 first:pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
                >
                  {/* Visual Panel */}
                  <div
                    className={`case-visual-col lg:col-span-6 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="surface-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3 font-mono text-[11px]">
                        <span className="text-[#8C96A8] whitespace-nowrap">
                          0{idx + 1} · Architecture
                        </span>
                        {project.figureUrl && (
                          <div className="flex items-center gap-1 bg-[#0B0D12]/80 p-0.5 rounded-md border border-[var(--border-subtle)] shrink-0">
                            <button
                              type="button"
                              onClick={() => setProjectVisualMode(project.id, "diagram")}
                              className={`px-2 py-0.5 rounded text-[10px] whitespace-nowrap transition-colors ${
                                currentMode === "diagram"
                                  ? "bg-[#65D6E7]/20 text-[#65D6E7]"
                                  : "text-[#8C96A8] hover:text-[#E8E4DA]"
                              }`}
                            >
                              Schematic
                            </button>
                            <button
                              type="button"
                              onClick={() => setProjectVisualMode(project.id, "figure")}
                              className={`px-2 py-0.5 rounded text-[10px] whitespace-nowrap transition-colors ${
                                currentMode === "figure"
                                  ? "bg-[#A78BFA]/20 text-[#A78BFA]"
                                  : "text-[#8C96A8] hover:text-[#E8E4DA]"
                              }`}
                            >
                              Paper Figure
                            </button>
                          </div>
                        )}
                      </div>

                      {currentMode === "diagram" ? (
                        <div className="rounded-xl surface-recessed p-3">
                          <ProjectDiagramRenderer diagramKey={project.diagramKey} />
                        </div>
                      ) : (
                        <div className="rounded-xl overflow-hidden border border-[var(--border-strong)] bg-[#E8E4DA] p-2">
                          <img
                            src={project.figureUrl}
                            alt={project.figureCaption || `${project.title} research figure`}
                            className="w-full h-auto max-h-[260px] object-contain mx-auto"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="font-sans text-xs text-[#B4BCC9] leading-relaxed pt-1">
                        <span className="font-mono text-[11px] text-[#65D6E7] mr-2">
                          Measured:
                        </span>
                        {project.results}
                      </div>
                    </div>
                  </div>

                  {/* Concise Narrative Column */}
                  <div
                    className={`case-text-col lg:col-span-6 flex flex-col gap-4 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#8C96A8]">
                      <span className="text-[#65D6E7]">0{idx + 1}</span>
                      <span className="text-[#5C6575]">/</span>
                      <span>{project.category}</span>
                      <span className="text-[#5C6575]">·</span>
                      <span className="text-[#A78BFA]">{project.coverTag}</span>
                    </div>

                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#E8E4DA] leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-[#65D6E7] mt-1.5 leading-snug">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-sm sm:text-[15px] text-[#B4BCC9] leading-relaxed max-w-prose">
                      {project.solution}
                    </p>

                    <div>
                      <button
                        type="button"
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#65D6E7] hover:text-[#8CE1EE] transition-colors py-1"
                        aria-expanded={isExpanded}
                      >
                        <span>
                          {isExpanded ? "Hide problem & contribution" : "Read problem & contribution"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 pt-4 border-t border-[var(--border-subtle)] space-y-3 font-sans text-sm text-[#B4BCC9] leading-relaxed max-w-prose">
                          <div>
                            <span className="font-mono text-[11px] text-[#8C96A8] block mb-1">
                              Problem Context
                            </span>
                            {project.problem}
                          </div>
                          <div>
                            <span className="font-mono text-[11px] text-[#8C96A8] block mb-1">
                              My Contribution
                            </span>
                            {project.contribution}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[#B4BCC9] bg-[#151922] border border-[var(--border-subtle)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2 font-sans text-sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-[#E8E4DA] hover:text-[#65D6E7] transition-colors"
                      >
                        <span>Source code</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`Manuscript Request: ${project.title}`)}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#8C96A8] hover:text-[#E8E4DA] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[#151922]/70 transition-colors"
                      >
                        <span>Manuscript on request</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Secondary Software & Infrastructure */}
        {displaySecondary && (
          <div className="pt-8 border-t border-[var(--border-subtle)]">
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#E8E4DA]">
                Additional Software & Infrastructure
              </h3>
              <a
                href="https://github.com/assassinyousuf"
                target="_blank"
                rel="noreferrer"
                className="font-sans text-xs sm:text-sm text-[#8C96A8] hover:text-[#65D6E7] inline-flex items-center gap-1 transition-colors"
              >
                <span>All repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {secondaryProjects.map((p) => (
                <div
                  key={p.title}
                  className="pt-5 border-t border-[var(--border-subtle)] flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-1.5 font-mono text-[11px]">
                      <span className="text-[#65D6E7]">{p.category}</span>
                      <span className="text-[#5C6575]">{p.status}</span>
                    </div>

                    <h4 className="font-display text-lg font-semibold text-[#E8E4DA] mb-2">
                      {p.title}
                    </h4>
                    <p className="font-sans text-sm text-[#8C96A8] leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-[#8C96A8] bg-[#151922] border border-[var(--border-subtle)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#E8E4DA] hover:text-[#65D6E7] transition-colors"
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
