import React, { useState, useEffect } from "react";

export default function NetworkHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine current active mission phase
  const getPhaseName = (p) => {
    if (p < 0.15) return "00 // INITIAL CONTACT";
    if (p < 0.30) return "01 // IDENTITY TUNNEL";
    if (p < 0.50) return "02 // CAPABILITIES";
    if (p < 0.70) return "03 // CASE STUDIES";
    if (p < 0.85) return "04 // RESEARCH ARCHIVE";
    if (p < 0.95) return "05 // MILESTONES";
    return "06 // CONNECTION OK";
  };

  const getDepthMeters = (p) => {
    return Math.round(p * 180);
  };

  // Jump to next scene on click
  const advanceScene = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const nextY = Math.min(window.scrollY + window.innerHeight * 0.85, docHeight);
    window.scrollTo({ top: nextY, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-40 pointer-events-none flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-slate-400 select-none">
      
      {/* Active Scene Phase Indicator Pill (Tap to navigate next) */}
      <button
        onClick={advanceScene}
        className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-[#07090d]/85 backdrop-blur-md border border-purple-500/30 text-purple-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center gap-2 pointer-events-auto hover:border-cyan-400/50 transition-colors"
        title="Tap to jump forward in the network journey"
      >
        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
        <span className="font-bold tracking-wider truncate max-w-[170px] xs:max-w-none">
          {getPhaseName(scrollProgress)}
        </span>
      </button>

      {/* Depth Coordinate & Network Ping Telemetry */}
      <div className="flex items-center gap-2 sm:gap-3 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-[#07090d]/85 backdrop-blur-md border border-slate-800 text-slate-400 pointer-events-auto">
        <span className="text-cyan-400 font-semibold">-{getDepthMeters(scrollProgress)}M</span>
        <span className="text-slate-600 hidden sm:inline">•</span>
        <span className="hidden sm:inline">TRAVERSAL: {Math.round(scrollProgress * 100)}%</span>
        <span className="text-slate-600">•</span>
        <span className="text-emerald-400 font-semibold">[200 OK]</span>
      </div>

    </div>
  );
}
