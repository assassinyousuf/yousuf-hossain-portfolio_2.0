import React, { useEffect, useRef } from "react";
import { personalInfo } from "../data/portfolioData";
import IdentityDomainVisual from "./visuals/IdentityDomainVisual";
import { gsap } from "gsap";

export default function IdentityScene() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const visualPairRef = useRef(null);
  const textScrubRef = useRef(null);
  const columnsRef = useRef(null);

  const missionWords =
    "I work at the intersection of network infrastructure, applied cybersecurity, and systems research — designing zero-trust mobile defenses, offline mesh protocols, and packet-level instrumentation across real hardware and simulated topologies.".split(
      " "
    );

  const focusAreas = [
    {
      code: "01",
      tag: "INFRASTRUCTURE",
      title: "Network & Systems Engineering",
      detail:
        "Hands-on routing, switching, VLSM subnetting, and Linux environment administration on the Cisco CCNA 200-301 track, backed by Wireshark telemetry analysis.",
    },
    {
      code: "02",
      tag: "PUBLICATIONS",
      title: "Applied Security Research",
      detail:
        "Co-author across five peer-reviewed works—including Taylor & Francis book chapters covering audio-domain steganography, zero-trust sandboxing, and lightweight IoT IDS.",
    },
    {
      code: "03",
      tag: "COMPETITIONS",
      title: "Competitive CTF & Leadership",
      detail:
        "1st Place Champion at DIU Intra First CTF 2025 alongside top national and international finishes, while serving as General Secretary of DIU Computer Programming Club.",
    },
  ];

  const profileSpecs = [
    { label: "Current Role", value: `${personalInfo.currentRole.title} · ${personalInfo.currentRole.company}` },
    { label: "Academic Track", value: `${personalInfo.degree} (${personalInfo.status})` },
    { label: "Governance", value: "General Secretary · DIU Computer Programming Club" },
    { label: "Membership", value: "IEEE & IEEE Computer Society Student Member" },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (visualPairRef.current) {
        gsap.fromTo(
          visualPairRef.current,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualPairRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (textScrubRef.current) {
        const words = textScrubRef.current.querySelectorAll(".scrub-word");
        gsap.fromTo(
          words,
          { color: "rgba(138, 148, 166, 0.35)" },
          {
            color: "rgba(237, 233, 223, 1)",
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: textScrubRef.current,
              start: "top 80%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          }
        );
      }

      if (columnsRef.current) {
        gsap.fromTo(
          columnsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="identity"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Architectural Index Rule */}
        <div ref={headerRef} className="mb-12 sm:mb-14">
          <div className="flex items-center gap-4 font-mono text-xs mb-4">
            <span className="text-[#65D6E7] tracking-wider">01 / IDENTITY</span>
            <span className="h-[1px] flex-1 bg-[var(--border-subtle)]" />
            <span className="text-[#5A6476] hidden sm:inline">ENGINEERING POSTURE</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-medium tracking-[-0.025em] text-[#EDE9DF] max-w-2xl">
            Curiosity drives the connection.
          </h2>
        </div>

        {/* Row 1: Portrait Plate + Editorial Statement & Specs */}
        <div
          ref={visualPairRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14 sm:mb-16"
        >
          <div className="lg:col-span-4">
            <div className="surface-panel rounded-2xl p-3 max-w-[340px]">
              <div className="rounded-xl overflow-hidden bg-[#07090D] aspect-[4/4.3]">
                <img
                  src="/profile.jpeg"
                  alt="Md. Yousuf Hossain portrait"
                  className="w-full h-full object-cover object-top grayscale-[10%] contrast-[1.04]"
                  loading="lazy"
                />
              </div>
              <div className="pt-3 px-1.5 pb-1 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#EDE9DF]">{personalInfo.name}</span>
                <span className="text-[#65D6E7]">@{personalInfo.handle}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8">
            <div
              ref={textScrubRef}
              className="font-sans text-xl sm:text-2xl lg:text-[1.68rem] font-normal leading-[1.45]"
            >
              {missionWords.map((word, idx) => (
                <span key={idx} className="scrub-word inline-block mr-1.5 sm:mr-2">
                  {word}
                </span>
              ))}
            </div>

            {/* Structured Engineering Posture Dossier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-[var(--border-subtle)]">
              {profileSpecs.map((spec) => (
                <div key={spec.label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-[11px] text-[#5A6476] uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <span className="font-sans text-sm text-[#EDE9DF]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Domain Convergence Visual + Numbered Editorial Pillars */}
        <div className="pt-10 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <IdentityDomainVisual />
          </div>

          <div ref={columnsRef} className="lg:col-span-7 divide-y divide-[var(--border-subtle)]">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
              >
                <div className="sm:col-span-4 flex items-center gap-2.5 font-mono text-[11px]">
                  <span className="text-[#65D6E7]">{area.code}</span>
                  <span className="text-[#5A6476]">/</span>
                  <span className="text-[#8A94A6]">{area.tag}</span>
                </div>
                <div className="sm:col-span-8 space-y-1">
                  <h3 className="font-sans text-base sm:text-lg font-semibold text-[#EDE9DF]">
                    {area.title}
                  </h3>
                  <p className="font-sans text-sm text-[#8A94A6] leading-relaxed">
                    {area.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
