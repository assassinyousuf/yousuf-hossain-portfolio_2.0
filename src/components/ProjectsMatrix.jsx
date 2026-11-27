import React, { useState, useEffect, useRef } from "react";
import { personalInfo, featuredProjects, secondaryProjects } from "../data/portfolioData";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { ProjectDiagramRenderer } from "./visuals/ProjectDiagrams";
import { gsap } from "gsap";

function ProjectSpecimenPlate({ project, activeMode, setMode, idx, extraFigure }) {
  const modes = [
    { id: "diagram", label: "Interactive Schematic" },
    ...(project.figureUrl ? [{ id: "figure", label: "Manuscript Figure" }] : []),
    ...(extraFigure ? [{ id: "extra", label: extraFigure.label }] : []),
  ];

  const activeImage =
    activeMode === "extra" && extraFigure
      ? extraFigure.url
      : activeMode === "figure"
      ? project.figureUrl
      : null;

  const activeCaption =
    activeMode === "extra" && extraFigure
      ? extraFigure.caption
      : activeMode === "figure"
      ? project.figureCaption
      : project.architecture;

  return (
    <div className="relative surface-panel tech-grid-bg rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3 font-mono text-[11px]">
        <span className="text-[#8A94A6] whitespace-nowrap">
          FIG. 0{idx + 1} // {project.title.split(" / ")[0].toUpperCase()}
        </span>

        {modes.length > 1 && (
          <div className="flex items-center gap-1 bg-[#07090D] p-0.5 rounded-lg border border-[var(--border-subtle)] shrink-0">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`px-2.5 py-1 rounded-md text-[10px] whitespace-nowrap transition-colors ${
                  activeMode === m.id
                    ? m.id === "diagram"
                      ? "bg-[#65D6E7]/18 text-[#65D6E7] font-medium"
                      : "bg-[#A78BFA]/20 text-[#A78BFA] font-medium"
                    : "text-[#8A94A6] hover:text-[#EDE9DF]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeMode === "diagram" || !activeImage ? (
        <div className="rounded-xl surface-recessed p-3 sm:p-4">
          <ProjectDiagramRenderer diagramKey={project.diagramKey} />
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden specimen-plate p-3">
          <img
            src={activeImage}
            alt={activeCaption || `${project.title} research figure`}
            className="w-full h-auto max-h-[290px] object-contain mx-auto"
            loading="lazy"
          />
        </div>
      )}

      <div className="pt-1 border-t border-[var(--border-subtle)]/70 flex flex-col gap-1">
        <div className="font-mono text-[10px] text-[#5A6476] truncate">
          {activeCaption}
        </div>
        <div className="font-sans text-xs text-[#BAC2CF] leading-relaxed">
          <span className="font-mono text-[11px] text-[#65D6E7] mr-2">Measured:</span>
          {project.results}
        </div>
      </div>
    </div>
  );
}

function ProjectMetaAndActions({ project, isExpanded, onToggleExpand }) {
  return (
    <>
      <div>
        <button
          type="button"
          onClick={onToggleExpand}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#65D6E7] hover:text-[#8DE2EF] transition-colors py-1"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Hide problem & contribution" : "Problem & engineering contribution"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="mt-3 pt-4 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm text-[#BAC2CF] leading-relaxed">
            <div>
              <span className="font-mono text-[11px] text-[#8A94A6] block mb-1">Problem Context</span>
              {project.problem}
            </div>
            <div>
              <span className="font-mono text-[11px] text-[#8A94A6] block mb-1">Contribution</span>
              {project.contribution}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-[#BAC2CF] bg-[#07090D]/85 border border-[var(--border-subtle)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1 font-sans text-sm">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-[#EDE9DF] hover:text-[#65D6E7] transition-colors"
        >
          <span>Source code</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>

        <a
          href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`Manuscript Request: ${project.title}`)}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#BAC2CF] hover:text-[#EDE9DF] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[#141923]/70 transition-colors"
        >
          <span>Manuscript on request</span>
        </a>
      </div>
    </>
  );
}

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

      flagshipRowsRef.current.forEach((row, idx) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none reverse",
              onEnter: () => setActiveProjectIndex(idx),
              onEnterBack: () => setActiveProjectIndex(idx),
            },
          }
        );
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

  const visiolock = featuredProjects[0];
  const safelink = featuredProjects[1];
  const mesh = featuredProjects[2];
  const smartcity = featuredProjects[3];
  const nfc = featuredProjects[4];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent"
    >
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Architectural Header + Filter */}
        <div ref={headerRef} className="mb-10 sm:mb-12">
          <div className="flex items-center gap-4 font-mono text-xs mb-4">
            <span className="text-[#65D6E7] tracking-wider">03 / ENGINEERING</span>
            <span className="h-[1px] flex-1 bg-[var(--border-subtle)]" />
            <span className="text-[#8A94A6] hidden sm:inline">SYSTEMS &amp; CASE STUDIES</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-medium tracking-[-0.025em] text-[#EDE9DF]">
                Featured Systems &amp; Architectures
              </h2>
              <p className="font-sans text-sm text-[#8A94A6] mt-2 max-w-xl">
                Five peer-reviewed engineering implementations spanning acoustic cryptography, mobile zero-trust execution, offline mesh routing, edge IDS, and hardware-backed NFC.
              </p>
            </div>

            <div className="flex items-center gap-1.5 font-sans text-xs overflow-x-auto pb-1 max-w-full scrollbar-none">
              {[
                { id: "all", label: `All work (${featuredProjects.length + secondaryProjects.length})` },
                { id: "flagship", label: `Flagship systems (${featuredProjects.length})` },
                { id: "systems", label: `Software & tools (${secondaryProjects.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-full transition-colors whitespace-nowrap border ${
                    activeTab === tab.id
                      ? "bg-[#65D6E7]/15 text-[#65D6E7] border-[#65D6E7]/45 font-medium"
                      : "bg-[#0F131B]/60 text-[#8A94A6] hover:text-[#EDE9DF] border-[var(--border-subtle)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Project Jump Index */}
        {displayFlagships && (
          <div className="hidden lg:flex items-center justify-between gap-4 pb-5 mb-10 border-b border-[var(--border-subtle)] font-mono text-xs overflow-x-auto">
            <span className="text-[#5A6476] shrink-0">JUMP TO CASE STUDY</span>
            <div className="flex items-center gap-6">
              {featuredProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => scrollToProject(idx)}
                  className={`py-1 transition-colors border-b-2 whitespace-nowrap ${
                    activeProjectIndex === idx
                      ? "border-[#65D6E7] text-[#EDE9DF] font-medium"
                      : "border-transparent text-[#8A94A6] hover:text-[#EDE9DF]"
                  }`}
                >
                  0{idx + 1}. {p.title.split(" / ")[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Project-Specific Art-Directed Showcases */}
        {displayFlagships && (
          <div className="space-y-16 sm:space-y-20 mb-20">
            
            {/* 01 // VISIOLOCK — Full-Width Monograph Showcase (Dual Real Figures + Pipeline) */}
            <article
              ref={(el) => (flagshipRowsRef.current[0] = el)}
              className="surface-panel rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                    <span className="text-[#65D6E7]">01 / FLAGSHIP</span>
                    <span className="text-[#5A6476]">·</span>
                    <span className="text-[#8A94A6]">{visiolock.category}</span>
                    <span className="text-[#5A6476]">·</span>
                    <span className="text-[#A78BFA]">{visiolock.coverTag}</span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-[#EDE9DF]">
                    {visiolock.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#65D6E7] leading-snug">
                    {visiolock.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0 border-t lg:border-t-0 lg:border-l border-[var(--border-subtle)] pt-4 lg:pt-0 lg:pl-6 font-mono">
                  <div>
                    <div className="text-[10px] text-[#5A6476]">THRESHOLD</div>
                    <div className="text-sm font-semibold text-[#EDE9DF]">&lt; 0.05 BER</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#5A6476]">RECOVERY SNR</div>
                    <div className="text-sm font-semibold text-[#65D6E7]">≥ 9 dB</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#5A6476]">FEC LAYER</div>
                    <div className="text-sm font-semibold text-[#A78BFA]">RS(255,239)</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <ProjectSpecimenPlate
                    project={visiolock}
                    idx={0}
                    activeMode={visualMode[visiolock.id] || "diagram"}
                    setMode={(m) => setProjectVisualMode(visiolock.id, m)}
                    extraFigure={{
                      label: "BER vs. SNR Plot",
                      url: visiolock.chartUrl,
                      caption: "RS(255, 239) + 3× repetition BER vs. SNR curve across acoustic WAV transmission.",
                    }}
                  />
                </div>
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <p className="font-sans text-sm sm:text-[15px] text-[#BAC2CF] leading-relaxed">
                    {visiolock.solution}
                  </p>
                  <div className="p-3.5 rounded-xl surface-recessed font-mono text-[11px] text-[#8A94A6] leading-relaxed">
                    <span className="text-[#65D6E7] block mb-1">SIGNAL PATH</span>
                    {visiolock.architecture}
                  </div>
                  <ProjectMetaAndActions
                    project={visiolock}
                    isExpanded={!!expandedIds[visiolock.id]}
                    onToggleExpand={() => toggleExpand(visiolock.id)}
                  />
                </div>
              </div>
            </article>

            {/* 02 // SAFELINK+ — Asymmetric 5/7 Sandbox Telemetry Stage */}
            <article
              ref={(el) => (flagshipRowsRef.current[1] = el)}
              className="pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                  <span className="text-[#65D6E7]">02</span>
                  <span className="text-[#5A6476]">/</span>
                  <span className="text-[#8A94A6]">{safelink.category}</span>
                  <span className="text-[#5A6476]">·</span>
                  <span className="text-[#A78BFA]">{safelink.coverTag}</span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#EDE9DF]">
                  {safelink.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#65D6E7] leading-snug">
                  {safelink.subtitle}
                </p>
                <p className="font-sans text-sm sm:text-[15px] text-[#BAC2CF] leading-relaxed">
                  {safelink.solution}
                </p>
                <ProjectMetaAndActions
                  project={safelink}
                  isExpanded={!!expandedIds[safelink.id]}
                  onToggleExpand={() => toggleExpand(safelink.id)}
                />
              </div>

              <div className="lg:col-span-7">
                <ProjectSpecimenPlate
                  project={safelink}
                  idx={1}
                  activeMode={visualMode[safelink.id] || "diagram"}
                  setMode={(m) => setProjectVisualMode(safelink.id, m)}
                />
              </div>
            </article>

            {/* 03 // GETCONNECT OFFLINE MESH — Asymmetric 7/5 Topology & Field Telemetry */}
            <article
              ref={(el) => (flagshipRowsRef.current[2] = el)}
              className="pt-12 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              <div className="lg:col-span-7 lg:order-1 order-2 space-y-4">
                <ProjectSpecimenPlate
                  project={mesh}
                  idx={2}
                  activeMode={visualMode[mesh.id] || "diagram"}
                  setMode={(m) => setProjectVisualMode(mesh.id, m)}
                />
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {[
                    { label: "TEXT DELIVERY", val: "93.2%" },
                    { label: "2-HOP LATENCY", val: "1.8s" },
                    { label: "250-NODE PDR", val: "92.6%" },
                  ].map((m) => (
                    <div key={m.label} className="p-3 rounded-xl surface-recessed font-mono">
                      <div className="text-[9.5px] sm:text-[10px] text-[#5A6476] leading-tight">{m.label}</div>
                      <div className="text-base sm:text-lg font-semibold text-[#EDE9DF] mt-0.5 tabular-nums">
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 lg:order-2 order-1 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                  <span className="text-[#65D6E7]">03</span>
                  <span className="text-[#5A6476]">/</span>
                  <span className="text-[#8A94A6]">{mesh.category}</span>
                  <span className="text-[#5A6476]">·</span>
                  <span className="text-[#65D6E7]">{mesh.coverTag}</span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#EDE9DF]">
                  {mesh.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#65D6E7] leading-snug">
                  {mesh.subtitle}
                </p>
                <p className="font-sans text-sm sm:text-[15px] text-[#BAC2CF] leading-relaxed">
                  {mesh.solution}
                </p>
                <ProjectMetaAndActions
                  project={mesh}
                  isExpanded={!!expandedIds[mesh.id]}
                  onToggleExpand={() => toggleExpand(mesh.id)}
                />
              </div>
            </article>

            {/* 04 // SMART CITY IDS — Architecture + Benchmark Performance Showcase */}
            <article
              ref={(el) => (flagshipRowsRef.current[3] = el)}
              className="pt-12 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                  <span className="text-[#A78BFA]">04</span>
                  <span className="text-[#5A6476]">/</span>
                  <span className="text-[#8A94A6]">{smartcity.category}</span>
                  <span className="text-[#5A6476]">·</span>
                  <span className="text-[#A78BFA]">{smartcity.coverTag}</span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#EDE9DF]">
                  {smartcity.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#A78BFA] leading-snug">
                  {smartcity.subtitle}
                </p>
                <p className="font-sans text-sm sm:text-[15px] text-[#BAC2CF] leading-relaxed">
                  {smartcity.solution}
                </p>

                {/* Concise Benchmark Comparison Table */}
                <div className="rounded-xl surface-recessed p-3.5 font-mono text-xs space-y-2">
                  <div className="text-[10px] text-[#5A6476] border-b border-[var(--border-subtle)] pb-1.5 flex justify-between">
                    <span>BASELINE MODEL</span>
                    <span>ACCURACY / LATENCY</span>
                  </div>
                  <div className="flex justify-between text-[#8A94A6]">
                    <span>SVM / Random Forest</span>
                    <span>~94.1% / ~95.2%</span>
                  </div>
                  <div className="flex justify-between text-[#EDE9DF] font-semibold">
                    <span className="text-[#65D6E7]">Proposed CNN-GRU</span>
                    <span>~98.9% · ~6.5ms</span>
                  </div>
                </div>

                <ProjectMetaAndActions
                  project={smartcity}
                  isExpanded={!!expandedIds[smartcity.id]}
                  onToggleExpand={() => toggleExpand(smartcity.id)}
                />
              </div>

              <div className="lg:col-span-7">
                <ProjectSpecimenPlate
                  project={smartcity}
                  idx={3}
                  activeMode={visualMode[smartcity.id] || "diagram"}
                  setMode={(m) => setProjectVisualMode(smartcity.id, m)}
                  extraFigure={{
                    label: "CNN-GRU Layers",
                    url: "/visuals/fig-smartcity-arch.png",
                    caption: "Sequential 1D-CNN + GRU architecture figure from the Taylor & Francis manuscript.",
                  }}
                />
              </div>
            </article>

            {/* 05 // SECURE NFC HCE TICKETING — Hardware-Backed Contactless Defense */}
            <article
              ref={(el) => (flagshipRowsRef.current[4] = el)}
              className="pt-12 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              <div className="lg:col-span-6 lg:order-1 order-2">
                <ProjectSpecimenPlate
                  project={nfc}
                  idx={4}
                  activeMode={visualMode[nfc.id] || "diagram"}
                  setMode={(m) => setProjectVisualMode(nfc.id, m)}
                />
              </div>

              <div className="lg:col-span-6 lg:order-2 order-1 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                  <span className="text-[#65D6E7]">05</span>
                  <span className="text-[#5A6476]">/</span>
                  <span className="text-[#8A94A6]">{nfc.category}</span>
                  <span className="text-[#5A6476]">·</span>
                  <span className="text-[#65D6E7]">{nfc.coverTag}</span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#EDE9DF]">
                  {nfc.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#65D6E7] leading-snug">
                  {nfc.subtitle}
                </p>
                <p className="font-sans text-sm sm:text-[15px] text-[#BAC2CF] leading-relaxed">
                  {nfc.solution}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                  {[
                    { k: "DEVICES", v: "38" },
                    { k: "WRITE RATE", v: "97.8%" },
                    { k: "REPLAY BLOCK", v: "100%" },
                    { k: "OVERHEAD", v: "6.6ms" },
                  ].map((stat) => (
                    <div key={stat.k} className="p-2.5 rounded-lg surface-recessed">
                      <div className="text-[9.5px] text-[#5A6476]">{stat.k}</div>
                      <div className="text-sm font-semibold text-[#EDE9DF] mt-0.5 tabular-nums">
                        {stat.v}
                      </div>
                    </div>
                  ))}
                </div>

                <ProjectMetaAndActions
                  project={nfc}
                  isExpanded={!!expandedIds[nfc.id]}
                  onToggleExpand={() => toggleExpand(nfc.id)}
                />
              </div>
            </article>

          </div>
        )}

        {/* Secondary Software & Infrastructure Ledger */}
        {displaySecondary && (
          <div className="pt-10 border-t border-[var(--border-subtle)]">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] text-[#5A6476] mb-1">SYSTEMS &amp; TOOLS LEDGER</div>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-[#EDE9DF]">
                  Additional Software &amp; Infrastructure
                </h3>
              </div>
              <a
                href="https://github.com/assassinyousuf"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#8A94A6] hover:text-[#65D6E7] inline-flex items-center gap-1 transition-colors"
              >
                <span>github.com/assassinyousuf</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {secondaryProjects.map((p, idx) => (
                <div
                  key={p.title}
                  className="pt-5 border-t border-[var(--border-subtle)] flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2 font-mono text-[11px]">
                      <span className="text-[#65D6E7]">0{idx + 1} · {p.category}</span>
                      <span className="text-[#5A6476]">{p.status}</span>
                    </div>

                    <h4 className="font-sans text-lg font-bold text-[#EDE9DF] mb-1.5">
                      {p.title}
                    </h4>
                    <p className="font-sans text-sm text-[#8A94A6] leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-[#8A94A6] bg-[#07090D] border border-[var(--border-subtle)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#EDE9DF] hover:text-[#65D6E7] transition-colors"
                    >
                      <span>Repository</span>
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
