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
      // 1. Staggered Editorial Entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.15 }
      )
        .fromTo(
          [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
          { opacity: 0, y: 28, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 0.85,
            stagger: 0.14,
          },
          "-=0.35"
        )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.45"
        )
        .fromTo(
          bioRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.4"
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.96, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 0.95, ease: "power2.out" },
          "-=0.75"
        )
        .fromTo(
          ctaRef.current ? ctaRef.current.children : [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          "-=0.6"
        )
        .fromTo(
          statsRef.current ? statsRef.current.children : [],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
          "-=0.45"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.7 },
          "-=0.2"
        );

      // 2. Scroll Parallax synchronized with 3D camera zoom
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
        y: 65,
        opacity: 0.2,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="overview"
      className="relative min-h-[92vh] pt-28 pb-16 sm:pt-36 sm:pb-20 flex flex-col justify-center px-4 sm:px-6 md:px-8 bg-transparent"
    >
      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Identity & Positioning */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            
            {/* Quiet Context Line */}
            <div
              ref={badgeRef}
              className="font-mono text-xs text-slate-400 tracking-wide"
            >
              {personalInfo.name} ({personalInfo.alias}) — {personalInfo.location}
            </div>

            {/* Editorial Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-[-0.025em] text-slate-50 leading-[1.12] min-w-0">
              <span ref={titleLine1Ref} className="inline-block">
                Building secure systems.
              </span>{" "}
              <br className="hidden sm:inline" />
              <span ref={titleLine2Ref} className="inline-block text-sky-400">
                Exploring networks.
              </span>{" "}
              <br className="hidden sm:inline" />
              <span ref={titleLine3Ref} className="inline-block">
                Researching technology.
              </span>
            </h1>

            {/* Subtitle & Academic / Internship Context */}
            <div ref={nameRef} className="flex flex-col gap-1">
              <p className="font-sans text-sm sm:text-base font-medium text-slate-200">
                {personalInfo.subtitle}
              </p>
              <p className="font-mono text-xs text-slate-400">
                {personalInfo.institution} · {personalInfo.status} · Intern at{" "}
                <a
                  href={personalInfo.currentRole.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
                >
                  {personalInfo.currentRole.company}
                </a>
              </p>
            </div>

            {/* Concise Mission Statement */}
            <p
              ref={bioRef}
              className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-sans"
            >
              Undergraduate scholar focused on zero-trust mobile defenses, infrastructure-free mesh communication, and lightweight intrusion detection. Co-author on five peer-reviewed works including accepted Taylor & Francis book chapters.
            </p>

            {/* Clear Action Hierarchy */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg font-sans text-sm font-semibold text-slate-950 bg-slate-100 hover:bg-white transition-colors inline-flex items-center justify-center gap-2 touch-target"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#research"
                className="px-5 py-2.5 rounded-lg font-sans text-sm font-medium text-slate-200 hover:text-white border border-white/[0.14] hover:border-sky-400/50 bg-white/[0.03] transition-colors inline-flex items-center justify-center gap-2 touch-target"
              >
                <span>Research Archive</span>
              </a>

              <a
                href={personalInfo.cvUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-lg font-sans text-sm font-medium text-slate-300 hover:text-sky-300 transition-colors inline-flex items-center justify-center gap-1.5 touch-target"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              {/* Minimalist Inline Social Links */}
              <div className="flex items-center gap-1 sm:ml-auto border-l border-white/[0.08] pl-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg text-slate-400 hover:text-white transition-colors touch-target flex items-center justify-center"
                  title="GitHub"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg text-slate-400 hover:text-sky-400 transition-colors touch-target flex items-center justify-center"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-lg text-slate-400 hover:text-slate-100 transition-colors touch-target flex items-center justify-center"
                  title="Email"
                  aria-label="Email Md. Yousuf Hossain"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Systems Architecture Topology */}
          <div ref={visualRef} className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroTopologyVisual />
          </div>

        </div>

        {/* Open Hairline-Divided Key Figures */}
        <div
          ref={statsRef}
          className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <div className="font-mono text-[11px] text-slate-400">{s.label}</div>
              <div className="font-display text-xl sm:text-2xl font-semibold text-slate-100 tabular-nums">
                {s.value}
              </div>
              <div className="font-sans text-xs text-slate-400">
                {s.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="mt-12 flex items-center justify-center gap-2 font-mono text-[11px] text-slate-500 select-none"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
