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
      setScrolled(window.scrollY > 24);
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
    { label: "Identity", href: "#identity" },
    { label: "Capabilities", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "#research" },
    { label: "Honors", href: "#achievements" },
    { label: "Contact", href: "#terminal" },
  ];

  return (
    <header className="fixed top-3.5 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 pointer-events-none">
      <div className="mx-auto max-w-6xl pointer-events-auto">
        <div
          className={`rounded-full px-4 py-2 sm:px-5 flex items-center justify-between border transition-all duration-300 ${
            scrolled
              ? "bg-[#0F131B]/90 backdrop-blur-xl border-[var(--border-strong)] shadow-[0_14px_38px_rgba(3,5,9,0.72)]"
              : "bg-[#0B0D12]/72 backdrop-blur-md border-[var(--border-subtle)]"
          }`}
        >
          {/* Wordmark + Live Node Dot */}
          <a
            href="#overview"
            className="inline-flex items-center gap-2.5 font-display text-xs sm:text-sm font-semibold tracking-tight text-[#EDE9DF] hover:text-[#65D6E7] transition-colors pl-1"
          >
            <span className="h-2 w-2 rounded-full bg-[#65D6E7]" aria-hidden="true" />
            <span>
              yousuf<span className="text-[#65D6E7]">.surf</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-sans font-medium text-[#8A94A6]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-1 hover:text-[#EDE9DF] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls: Audio + CV + Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors touch-target ${
                isPlaying
                  ? "border-[#65D6E7]/45 bg-[#65D6E7]/10 text-[#65D6E7]"
                  : "border-[var(--border-subtle)] bg-[#141923]/65 text-[#8A94A6] hover:text-[#EDE9DF] hover:border-[var(--border-strong)]"
              }`}
              title={isPlaying ? "Mute ambient audio" : "Play ambient audio"}
              aria-label="Toggle ambient audio"
            >
              {isPlaying ? (
                <div className="flex items-end gap-[2px] h-3 w-3">
                  <span className="w-[2px] bg-[#65D6E7] rounded-sm animate-[eq-1_0.9s_ease-in-out_infinite]" />
                  <span className="w-[2px] bg-[#A78BFA] rounded-sm animate-[eq-2_0.7s_ease-in-out_infinite]" />
                  <span className="w-[2px] bg-[#65D6E7] rounded-sm animate-[eq-3_1.1s_ease-in-out_infinite]" />
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden md:inline text-[11px]">
                {isPlaying ? "Audio" : "Muted"}
              </span>
            </button>

            <a
              href={personalInfo.cvUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold text-[#0B0D12] bg-[#EDE9DF] hover:bg-white transition-colors touch-target"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-full border border-[var(--border-subtle)] bg-[#141923]/75 text-[#EDE9DF] hover:border-[var(--border-strong)] transition-colors touch-target flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#65D6E7]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2.5 p-4 rounded-2xl bg-[#0F131B]/95 backdrop-blur-2xl border border-[var(--border-strong)] shadow-[0_18px_46px_rgba(3,5,9,0.88)] flex flex-col gap-1">
            <div className="grid grid-cols-2 gap-1">
              {navItems.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-white/[0.04] text-[#EDE9DF] hover:text-[#65D6E7] text-sm font-sans transition-colors flex items-center gap-2"
                >
                  <span className="font-mono text-[10px] text-[#5A6476]">0{idx + 1}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-2 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2">
              <a
                href={personalInfo.cvUrl}
                download
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#EDE9DF] hover:bg-white text-[#0B0D12] font-semibold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download CV
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-full border border-[var(--border-strong)] text-[#EDE9DF] hover:text-[#65D6E7] text-xs font-sans transition-colors"
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
