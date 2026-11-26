import React from "react";
import { skills } from "../data/portfolioData";
import { Network, Shield, Code, Cpu, CheckCircle } from "lucide-react";

export default function SkillsSection() {
  const categories = [
    {
      name: "Computer Networking",
      icon: Network,
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      bg: "bg-cyan-950/20",
      items: skills.networking
    },
    {
      name: "Cybersecurity & Defense",
      icon: Shield,
      color: "text-purple-400",
      border: "border-purple-500/30",
      bg: "bg-purple-950/20",
      items: skills.security
    },
    {
      name: "Development & Languages",
      icon: Code,
      color: "text-pink-400",
      border: "border-pink-500/30",
      bg: "bg-pink-950/20",
      items: skills.development
    },
    {
      name: "Systems & Infrastructure",
      icon: Cpu,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/20",
      items: skills.infrastructure
    }
  ];

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-8 bg-[#030408]">
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL CAPABILITIES & PROFICIENCIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CORE SKILLS & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300">
              SPECIALIZED TOOLING
            </span>
          </h2>
        </div>

        {/* 4 Category Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className={`glass-panel rounded-3xl p-6 border ${cat.border} flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300`}
              >
                <div>
                  <div className={`p-3 rounded-2xl w-fit ${cat.bg} border ${cat.border} mb-4`}>
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-4">
                    {cat.name}
                  </h3>
                  <ul className="space-y-2.5 font-mono text-xs text-slate-300">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                        <span>{item}</span>
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
