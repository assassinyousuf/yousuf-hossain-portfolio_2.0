import React, { useEffect, useRef } from "react";
import { personalInfo, stats } from "../data/portfolioData";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import HeroTopologyVisual from "./visuals/HeroTopologyVisual";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const titleLine3Ref = useRef(null);
  const nameRef = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const visualRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05 }
      )
        .fromTo(
          [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
          { opacity: 0, y: 18, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 0.55,
            stagger: 0.08,
          },
          "-=0.25"
        )
        .fromTo(
          [nameRef.current, bioRef.current],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 },
          "-=0.35"
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.97, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.45"
        )
        .fromTo(
          ctaRef.current ? ctaRef.current.children : [],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
          "-=0.45"
        )
        .fromTo(
          statsRef.current ? statsRef.current.children : [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 },
          "-=0.35"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.2"
        );

      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
        y: 55,
        opacity: 0.22,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="overview"
      className="relative min-h-[90vh] pt-28 pb-12 sm:pt-32 sm:pb-16 flex flex-col justify-center px-4 sm:px-6 md:px-8 bg-transparent"
    >
      {/* Subtle top-left radial contrast scrim so display type reads sharply over 3D geometry */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_22%_38%,rgba(11,13,18,0.78),transparent_72%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Authoritative Editorial Introduction */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            <div
              ref={badgeRef}
              className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 self-start px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[#0F131B]/80 backdrop-blur-md text-[11px] sm:text-xs font-mono text-[#BAC2CF]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#65D6E7] shrink-0" />
              <span className="text-[#EDE9DF] font-medium">MD. YOUSUF HOSSAIN</span>
              <span className="text-[#5A6476]">|</span>
              <span className="text-[#8A94A6]">Support Intern @ CodencoIT</span>
            </div>

            <h1 className="font-display text-[1.75rem] sm:text-[2.5rem] lg:text-[2.65rem] xl:text-[2.95rem] font-medium tracking-[-0.03em] text-[#EDE9DF] leading-[1.14]">
              <span ref={titleLine1Ref} className="block">
                Building secure systems.
              </span>
              <span ref={titleLine2Ref} className="block text-[#65D6E7]">
                Exploring networks.
              </span>
              <span ref={titleLine3Ref} className="block">
                Researching technology.
              </span>
            </h1>

            <div ref={nameRef} className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#8A94A6]">
              <span>{personalInfo.institution}</span>
              <span className="text-[#5A6476]">·</span>
              <span>{personalInfo.status}</span>
              <span className="text-[#5A6476]">·</span>
              <a
                href={personalInfo.currentRole.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#65D6E7] hover:text-[#8DE2EF] underline underline-offset-4 decoration-[#65D6E7]/40 transition-colors"
              >
                CodencoIT
              </a>
              <span className="text-[#5A6476]">·</span>
              <span>{personalInfo.location}</span>
            </div>

            <p
              ref={bioRef}
              className="text-[#BAC2CF] text-[15px] sm:text-base max-w-xl leading-relaxed font-sans"
            >
              Cybersecurity and network engineering researcher building zero-trust mobile defenses, infrastructure-free mesh communication protocols, and lightweight IoT intrusion detection. Author across five peer-reviewed works including accepted Taylor &amp; Francis book chapters.
            </p>

            {/* Primary & Secondary Actions */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-full font-sans text-sm font-semibold text-[#0B0D12] bg-[#EDE9DF] hover:bg-white transition-colors inline-flex items-center justify-center gap-2 touch-target"
              >
                <span>Explore Systems</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#research"
                className="px-5 py-2.5 rounded-full font-sans text-sm font-medium text-[#EDE9DF] hover:text-[#65D6E7] border border-[var(--border-strong)] hover:border-[#65D6E7]/50 bg-[#141923]/70 transition-colors inline-flex items-center justify-center gap-2 touch-target"
              >
                <span>Research Archive</span>
              </a>

              <a
                href={personalInfo.cvUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-full font-sans text-sm font-medium text-[#8A94A6] hover:text-[#EDE9DF] transition-colors inline-flex items-center justify-center gap-1.5 touch-target"
              >
                <Download className="w-4 h-4" />
                <span>CV</span>
              </a>

              <div className="flex items-center gap-1 sm:ml-auto border-l border-[var(--border-subtle)] pl-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full text-[#8A94A6] hover:text-[#EDE9DF] hover:bg-white/[0.04] transition-colors touch-target flex items-center justify-center"
                  title="GitHub"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full text-[#8A94A6] hover:text-[#65D6E7] hover:bg-white/[0.04] transition-colors touch-target flex items-center justify-center"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-full text-[#8A94A6] hover:text-[#EDE9DF] hover:bg-white/[0.04] transition-colors touch-target flex items-center justify-center"
                  title="Email"
                  aria-label="Email Md. Yousuf Hossain"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Calibrated Systems Topology Instrument */}
          <div ref={visualRef} className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroTopologyVisual />
          </div>

        </div>

        {/* Hairline Key Figures Strip */}
        <div
          ref={statsRef}
          className="mt-12 sm:mt-14 pt-7 border-t border-[var(--border-subtle)] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((s, idx) => (
            <div key={s.label} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#8A94A6]">
                <span className="text-[#5A6476]">0{idx + 1}</span>
                <span>{s.label}</span>
              </div>
              <div className="font-display text-xl sm:text-2xl font-semibold text-[#EDE9DF] tabular-nums tracking-tight">
                {s.value}
              </div>
              <div className="font-sans text-xs text-[#8A94A6]">
                {s.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Scroll Prompt */}
        <div
          ref={scrollIndicatorRef}
          className="mt-9 flex items-center justify-between border-t border-[var(--border-subtle)]/60 pt-4 font-mono text-[11px] text-[#5A6476] select-none"
        >
          <span>SYS.PORTFOLIO // 2026</span>
          <span className="inline-flex items-center gap-2 text-[#8A94A6]">
            <span>Scroll to explore</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#65D6E7] animate-bounce" />
          </span>
        </div>

      </div>
    </section>
  );
}
