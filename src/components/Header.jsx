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
    { label: "About", href: "#identity" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "#research" },
    { label: "Honors", href: "#achievements" },
    { label: "Timeline", href: "#timeline" },
    { label: "Contact", href: "#terminal" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 md:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <div
          className={`rounded-xl px-4 py-2.5 sm:px-5 flex items-center justify-between border transition-colors duration-300 ${
            scrolled
              ? "bg-[#151922]/90 backdrop-blur-xl border-[var(--border-strong)] shadow-[0_10px_30px_rgba(4,6,10,0.65)]"
              : "bg-[#0B0D12]/70 backdrop-blur-md border-[var(--border-subtle)]"
          }`}
        >
          {/* Wordmark */}
          <a
            href="#overview"
            className="font-display text-sm sm:text-base font-bold tracking-tight text-[#E8E4DA] hover:text-[#65D6E7] transition-colors"
          >
            yousuf<span className="text-[#65D6E7]">.surf</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-sans font-medium text-[#8C96A8]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-1 hover:text-[#E8E4DA] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls: Audio + Resume + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleAudio}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors touch-target ${
                isPlaying
                  ? "border-[#65D6E7]/50 bg-[#65D6E7]/10 text-[#65D6E7]"
                  : "border-[var(--border-subtle)] bg-[#151922]/60 text-[#8C96A8] hover:text-[#E8E4DA] hover:border-[var(--border-strong)]"
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
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold text-[#0B0D12] bg-[#E8E4DA] hover:bg-[#F5F2EB] transition-colors touch-target"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg border border-[var(--border-subtle)] bg-[#151922]/70 text-[#E8E4DA] hover:border-[var(--border-strong)] transition-colors touch-target flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#65D6E7]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-xl bg-[#151922]/95 backdrop-blur-2xl border border-[var(--border-strong)] shadow-[0_18px_46px_rgba(4,6,10,0.85)] flex flex-col gap-1">
            <div className="grid grid-cols-2 gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3 rounded-lg hover:bg-white/[0.04] text-[#E8E4DA] hover:text-[#65D6E7] text-sm font-sans transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-2 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2">
              <a
                href={personalInfo.cvUrl}
                download
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#E8E4DA] hover:bg-[#F5F2EB] text-[#0B0D12] font-semibold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download CV
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-lg border border-[var(--border-strong)] text-[#E8E4DA] hover:text-[#65D6E7] text-xs font-sans transition-colors"
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
