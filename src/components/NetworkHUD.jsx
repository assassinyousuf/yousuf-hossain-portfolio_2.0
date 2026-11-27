import React, { useState, useEffect } from "react";

const SECTIONS = [
  { id: "overview", code: "00", label: "OVERVIEW" },
  { id: "identity", code: "01", label: "IDENTITY" },
  { id: "skills", code: "02", label: "CAPABILITIES" },
  { id: "projects", code: "03", label: "ENGINEERING" },
  { id: "research", code: "04", label: "RESEARCH" },
  { id: "achievements", code: "05", label: "HONORS" },
  { id: "timeline", code: "06", label: "TIMELINE" },
  { id: "education", code: "07", label: "CREDENTIALS" },
  { id: "terminal", code: "08", label: "CONTACT" },
];

export default function NetworkHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);

      const triggerY = window.innerHeight * 0.42;
      let current = SECTIONS[0];
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top <= triggerY) {
          current = sec;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 pointer-events-none hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0F131B]/88 backdrop-blur-md border border-[var(--border-subtle)] font-mono text-[11px] text-[#8A94A6] select-none shadow-[0_10px_28px_rgba(3,5,9,0.55)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#65D6E7]" />
      <span className="text-[#65D6E7]">{activeSection.code}</span>
      <span className="text-[#5A6476]">/</span>
      <span className="text-[#EDE9DF]">{activeSection.label}</span>
      <span className="text-[#5A6476]">·</span>
      <span className="tabular-nums">{Math.round(scrollProgress * 100)}%</span>
    </div>
  );
}
