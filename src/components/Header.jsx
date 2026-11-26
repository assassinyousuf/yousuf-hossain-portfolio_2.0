import React, { useState, useEffect, useRef } from "react";
import { personalInfo } from "../data/portfolioData";
import { VolumeX, Download, Menu, X } from "lucide-react";

export default function Header() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const audio = new Audio("/f1-theme.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback gesture needed:", err);
        });
    }
  };

  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "Identity", href: "#identity" },
    { label: "Capabilities", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "#research" },
    { label: "Honors", href: "#achievements" },
    { label: "Timeline", href: "#timeline" },
    { label: "Terminal", href: "#terminal" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2.5 sm:px-6 md:px-8 transition-all duration-300">
      <div className="mx-auto max-w-7xl">
        <div
          className={`rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 transition-all duration-300 flex items-center justify-between border ${
            scrolled
              ? "bg-[#060814]/90 backdrop-blur-xl border-purple-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
              : "bg-[#080b18]/75 backdrop-blur-lg border-purple-500/15 shadow-[0_6px_25px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Logo & Identity */}
          <a href="#overview" className="flex items-center gap-2.5 group">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-extrabold tracking-wide text-white group-hover:text-purple-300 transition-colors">
                YOUSUF<span className="text-cyan-400">.SURF</span>
              </span>
              <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase hidden xs:inline">
                CSE // CYBER & NETWORKS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-mono text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-1 text-slate-300 hover:text-white transition-colors relative group"
              >
                <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">/ </span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls: Audio + CV Download + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-mono transition-all duration-200 touch-target ${
                isPlaying
                  ? "border-purple-400/80 bg-purple-950/50 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                  : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
              title={isPlaying ? "Mute audio" : "Play ambient sound"}
              aria-label="Toggle ambient cyber audio"
            >
              {isPlaying ? (
                <div className="flex items-end gap-[2px] h-3 w-3.5">
                  <span className="w-[2.5px] bg-purple-400 rounded-sm animate-[eq-1_0.9s_ease-in-out_infinite]" />
                  <span className="w-[2.5px] bg-cyan-400 rounded-sm animate-[eq-2_0.7s_ease-in-out_infinite]" />
                  <span className="w-[2.5px] bg-purple-300 rounded-sm animate-[eq-3_1.1s_ease-in-out_infinite]" />
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline text-[10px] uppercase tracking-wider font-semibold">
                {isPlaying ? "AUDIO: ON" : "AUDIO"}
              </span>
            </button>

            {/* Direct CV Download Button */}
            <a
              href={personalInfo.cvUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-xs font-mono font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98] touch-target"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">CV.PDF</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 xl:hidden rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-purple-500/40 transition-colors touch-target flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-2 p-5 rounded-2xl bg-[#090d20]/95 backdrop-blur-2xl border border-purple-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.8)] flex flex-col gap-2 font-mono text-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs text-slate-400">
              <span className="text-purple-300 font-bold">NAVIGATION MENU</span>
              <span className="text-emerald-400 text-[10px]">[SYS: ACTIVE]</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-xl hover:bg-purple-900/30 text-slate-200 hover:text-purple-300 text-xs transition-colors border border-transparent hover:border-purple-500/20"
                >
                  <span className="text-purple-400 font-bold">/</span> {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <a
                href={personalInfo.cvUrl}
                download
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
              >
                <Download className="w-4 h-4" /> Download Official CV
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
