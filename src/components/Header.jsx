import React, { useState, useEffect, useRef } from "react";
import { personalInfo } from "../data/portfolioData";
import { Volume2, VolumeX, Terminal, Download, Menu, X, Shield, Globe } from "lucide-react";

export default function Header() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/f1-theme.mp3");
    audio.loop = true;
    audio.volume = 0.45;
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
          console.warn("Audio playback requires user gesture:", err);
        });
    }
  };

  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "Research", href: "#research" },
    { label: "Security & CTF", href: "#ctf" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Terminal", href: "#terminal" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-purple-500/20 flex items-center justify-between">

          {/* Logo & Online Status */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-bold tracking-wider text-white group-hover:text-purple-300 transition-colors">
                YOUSUF<span className="text-purple-400">.SURF</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-emerald-400/90 uppercase">
                [ SYS: NOMINAL // 200 OK ]
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-mono tracking-wide text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-1 text-xs hover:text-purple-300 transition-colors group"
              >
                <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">/ </span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Hub (Audio Toggle + CV + Mobile Menu) */}
          <div className="flex items-center gap-3">
            {/* Audio Equalizer Button */}
            <button
              onClick={toggleAudio}
              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-300 ${isPlaying
                  ? "border-purple-400/80 bg-purple-950/40 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              title={isPlaying ? "Mute ambient audio" : "Play ambient cyber audio"}
            >
              {isPlaying ? (
                <div className="flex items-end gap-[3px] h-3.5 w-4">
                  <span className="w-[3px] bg-purple-400 rounded-sm animate-[eq-1_1s_ease-in-out_infinite]" />
                  <span className="w-[3px] bg-purple-300 rounded-sm animate-[eq-2_0.8s_ease-in-out_infinite]" />
                  <span className="w-[3px] bg-cyan-400 rounded-sm animate-[eq-3_1.2s_ease-in-out_infinite]" />
                  <span className="w-[3px] bg-purple-400 rounded-sm animate-[eq-4_0.9s_ease-in-out_infinite]" />
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-bold">
                {isPlaying ? "LOSE MY MIND: ON" : "LOSE MY MIND"}
              </span>
            </button>

            {/* Resume Button */}
            <a
              href={personalInfo.cvUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="relative hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-mono font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 shadow-[0_0_18px_rgba(147,51,234,0.35)] transition-all transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV.PDF</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl glass-panel border border-purple-500/30 flex flex-col gap-3 font-mono text-sm animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-purple-900/30 text-slate-200 hover:text-purple-300"
              >
                / {item.label}
              </a>
            ))}
            <a
              href={personalInfo.cvUrl}
              download
              className="mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs"
            >
              <Download className="w-4 h-4" /> Download Official CV
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
