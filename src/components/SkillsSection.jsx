import React, { useState } from "react";
import { categorizedSkills } from "../data/portfolioData";
import { Network, Shield, Cpu, Code, Wrench } from "lucide-react";

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  return (
    <section id="skills" className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-[#04060e] border-t border-purple-900/25">
      
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 // TECHNICAL EXPERTISE & SYSTEM TOOLING</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              CATEGORIZED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300">
                TECHNICAL COMPETENCIES
              </span>
            </h2>
          </div>

          {/* Scannable Category Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                selectedCategory === "all"
                  ? "bg-purple-600 text-white font-semibold"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All (5 Domains)
            </button>
            {categories.map((c) => (
              <button
                key={c.title}
                onClick={() => setSelectedCategory(c.title.toLowerCase())}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  selectedCategory === c.title.toLowerCase()
                    ? "bg-purple-600 text-white font-semibold"
                    : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* 5-Column / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredCategories.map((cat) => {
            const Icon = categoryIcons[cat.title] || Network;
            return (
              <div
                key={cat.title}
                className="rounded-3xl glass-panel p-6 border border-purple-500/20 hover:border-purple-400/40 shadow-[0_6px_25px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="p-3 rounded-2xl w-fit bg-purple-950/40 border border-purple-500/30 mb-4 text-purple-300">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>

                  <h3 className="font-display text-base font-bold text-white mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="font-mono text-[11px] text-slate-400 mb-5 leading-relaxed">
                    {cat.summary}
                  </p>

                  {/* Skills List */}
                  <ul className="space-y-2.5 font-mono text-xs text-slate-300">
                    {cat.prominent.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 font-mono text-[10px] text-purple-400/80 flex items-center justify-between">
                  <span>{cat.prominent.length} proficiencies</span>
                  <span className="text-emerald-400">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
