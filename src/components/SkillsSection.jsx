import React, { useState, useEffect, useRef } from "react";
import { categorizedSkills } from "../data/portfolioData";
import { Network, Shield, Cpu, Code, Wrench } from "lucide-react";
import { gsap } from "gsap";

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const categoryIcons = {
    Networking: Network,
    Cybersecurity: Shield,
    Systems: Cpu,
    Programming: Code,
    "Tools & DevOps": Wrench,
  };

  const categories = Object.keys(categorizedSkills).map((k) => categorizedSkills[k]);

  const filteredCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((c) => c.title.toLowerCase().includes(selectedCategory));

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

      // 2. Staggered Grid Cards Entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.75,
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
  }, [selectedCategory]);

  // Subtle 3D Card Hover Tilt
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-transparent border-t border-purple-900/25"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>02 // TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              CATEGORIZED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300">
                TECHNICAL COMPETENCIES
              </span>
            </h2>
          </div>

          {/* Scannable Category Pills - Horizontal swipeable on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs overflow-x-auto pb-1 max-w-full scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === "all"
                  ? "bg-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All (5 Domains)
            </button>
            {categories.map((c) => (
              <button
                key={c.title}
                onClick={() => setSelectedCategory(c.title.toLowerCase())}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === c.title.toLowerCase()
                    ? "bg-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* 5-Column / Responsive Grid with 3D Tilt */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {filteredCategories.map((cat) => {
            const Icon = categoryIcons[cat.title] || Network;
            return (
              <div
                key={cat.title}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="rounded-3xl glass-panel p-5 sm:p-6 border border-purple-500/20 hover:border-cyan-400/50 shadow-[0_6px_25px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between will-change-transform group"
              >
                <div>
                  {/* Category Header */}
                  <div className="p-2.5 sm:p-3 rounded-2xl w-fit bg-purple-950/40 border border-purple-500/30 mb-3 sm:mb-4 text-purple-300 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>

                  <h3 className="font-display text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="font-mono text-[11px] text-slate-400 mb-4 sm:mb-5 leading-relaxed">
                    {cat.summary}
                  </p>

                  {/* Skills List with Staggered Visual Indicator */}
                  <ul className="space-y-2 font-mono text-xs text-slate-300">
                    {cat.prominent.map((item) => (
                      <li key={item} className="flex items-start gap-2 group/item">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 group-hover/item:scale-125 transition-transform" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-purple-400/80 flex items-center justify-between">
                  <span>{cat.prominent.length} proficiencies</span>
                  <span className="text-emerald-400 font-semibold">[VERIFIED]</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
