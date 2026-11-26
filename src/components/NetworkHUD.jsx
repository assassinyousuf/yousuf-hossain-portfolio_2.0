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
    if (p < 0.15) return "00:00 // INITIAL CONTACT";
    if (p < 0.30) return "01 // IDENTITY TUNNEL";
    if (p < 0.50) return "02 // SYSTEM CAPABILITIES";
    if (p < 0.70) return "03 // ENGINEERING ARCHIVE";
    if (p < 0.85) return "04 // DIGITAL ARCHIVE";
    if (p < 0.95) return "05 // SIGNALS OF PROGRESS";
    return "06 // CONNECTION ESTABLISHED";
  };

  const getDepthMeters = (p) => {
    return Math.round(p * 180);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-slate-400 select-none">
      
      {/* Active Scene Phase Indicator Pill */}
      <div className="px-3 py-1.5 rounded-xl bg-[#07090d]/80 backdrop-blur-md border border-purple-500/25 text-purple-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] flex items-center gap-2 pointer-events-auto">
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-bold tracking-wider">{getPhaseName(scrollProgress)}</span>
      </div>

      {/* Depth Coordinate & Network Ping Telemetry */}
      <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#07090d]/80 backdrop-blur-md border border-slate-800 text-slate-400 pointer-events-auto">
        <span>Z-DEPTH: -{getDepthMeters(scrollProgress)}M</span>
        <span className="text-slate-600">•</span>
        <span>TRAVERSAL: {Math.round(scrollProgress * 100)}%</span>
        <span className="text-slate-600">•</span>
        <span className="text-emerald-400 font-semibold">[SYS: 200 OK]</span>
      </div>

    </div>
  );
}

