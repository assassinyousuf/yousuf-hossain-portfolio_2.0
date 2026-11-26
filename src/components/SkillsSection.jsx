import React, { useState, useEffect, useRef } from "react";
import { categorizedSkills } from "../data/portfolioData";
import { gsap } from "gsap";

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const categories = Object.keys(categorizedSkills).map((k) => categorizedSkills[k]);

  const filteredCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((c) => c.title.toLowerCase().includes(selectedCategory));

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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.09,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  // Subtle perspective tilt on pointer devices
  const handleMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Clean Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs text-sky-400 mb-2">
              02 · Capabilities
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-100">
              Technical Competencies
            </h2>
          </div>

          {/* Restrained Category Filter Bar */}
          <div className="flex items-center gap-1.5 font-sans text-xs overflow-x-auto pb-1 max-w-full scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 border ${
                selectedCategory === "all"
                  ? "bg-sky-500/15 text-sky-300 border-sky-400/40 font-medium"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-white/[0.08]"
              }`}
            >
              All domains
            </button>
            {categories.map((c) => (
              <button
                key={c.title}
                onClick={() => setSelectedCategory(c.title.toLowerCase())}
                className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 border ${
                  selectedCategory === c.title.toLowerCase()
                    ? "bg-sky-500/15 text-sky-300 border-sky-400/40 font-medium"
                    : "bg-transparent text-slate-400 hover:text-slate-200 border-white/[0.08]"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Balanced 2 + 3 Priority Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >
          {filteredCategories.map((cat, idx) => {
            // Prioritize Networking and Cybersecurity across wider 3-column spans on a 6-col grid when viewing all
            const spanClass =
              selectedCategory === "all" && idx < 2
                ? "md:col-span-3"
                : selectedCategory === "all"
                ? "md:col-span-2"
                : "md:col-span-6";

            return (
              <div
                key={cat.title}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`surface-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between will-change-transform ${spanClass}`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-display text-lg font-semibold text-slate-100">
                      {cat.title}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                    {cat.summary}
                  </p>

                  {/* Clean Weighted Skill List (Top 3 highlighted, rest subdued) */}
                  <ul className="space-y-2.5 font-sans text-sm">
                    {cat.prominent.map((item, sIdx) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full mt-2 shrink-0 ${
                            sIdx < 3 ? "bg-sky-400" : "bg-slate-600"
                          }`}
                        />
                        <span
                          className={
                            sIdx < 3
                              ? "text-slate-100 font-medium leading-snug"
                              : "text-slate-400 leading-snug"
                          }
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
