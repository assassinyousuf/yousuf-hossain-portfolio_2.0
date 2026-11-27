import React, { useEffect, useRef } from "react";
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
      title: "Network & Systems Engineering",
      detail:
        "Hands-on routing, switching, VLSM subnetting, and Linux environment administration on the Cisco CCNA 200-301 track, backed by Wireshark telemetry analysis.",
    },
    {
      title: "Applied Security Research",
      detail:
        "Co-author across five peer-reviewed works—including Taylor & Francis book chapters covering audio-domain steganography, zero-trust sandboxing, and lightweight IoT IDS.",
    },
    {
      title: "Competitive CTF & Leadership",
      detail:
        "1st Place Champion at DIU Intra First CTF 2025 alongside top national and international finishes, while serving as General Secretary of DIU Computer Programming Club.",
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
          { color: "rgba(140, 150, 168, 0.35)" },
          {
            color: "rgba(232, 228, 218, 1)",
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
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.75,
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
        
        <div ref={headerRef} className="mb-10 sm:mb-12">
          <div className="font-mono text-xs text-[#65D6E7] mb-2">
            01 · Identity
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#E8E4DA]">
            Curiosity drives the connection.
          </h2>
        </div>

        <div
          ref={visualPairRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-16"
        >
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-center">
            <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[#151922] aspect-[4/3] max-w-[340px] mx-auto lg:mx-0 shadow-[var(--shadow-surface)]">
              <img
                src="/profile.jpeg"
                alt="Md. Yousuf Hossain portrait"
                className="w-full h-full object-cover object-top grayscale-[12%] contrast-[1.04]"
                loading="lazy"
              />
            </div>
            <IdentityDomainVisual />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              ref={textScrubRef}
              className="font-sans text-xl sm:text-2xl lg:text-[1.65rem] font-normal leading-[1.45]"
            >
              {missionWords.map((word, idx) => (
                <span key={idx} className="scrub-word inline-block mr-1.5 sm:mr-2">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {focusAreas.map((area, idx) => (
            <div
              key={area.title}
              className="pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-2.5"
            >
              <span className="font-mono text-[11px] text-[#5C6575]">
                0{idx + 1}
              </span>
              <h3 className="font-display text-base sm:text-lg font-semibold text-[#E8E4DA]">
                {area.title}
              </h3>
              <p className="font-sans text-sm text-[#8C96A8] leading-relaxed max-w-prose">
                {area.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
