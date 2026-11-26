import React, { useState, useEffect } from "react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "identity", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "achievements", label: "Honors" },
  { id: "education", label: "Education" },
  { id: "timeline", label: "Timeline" },
  { id: "terminal", label: "Contact" },
];

export default function NetworkHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLabel, setActiveLabel] = useState("Overview");

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);

      const triggerY = window.innerHeight * 0.4;
      let current = "Overview";
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top <= triggerY) {
          current = sec.label;
        }
      }
      setActiveLabel(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 pointer-events-none hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#06080c]/85 backdrop-blur-md border border-white/[0.08] font-mono text-[11px] text-slate-400 select-none">
      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
      <span className="text-slate-200">{activeLabel}</span>
      <span className="text-slate-600">·</span>
      <span className="tabular-nums">{Math.round(scrollProgress * 100)}%</span>
    </div>
  );
}
