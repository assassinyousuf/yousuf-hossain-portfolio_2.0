import React, { useState, useEffect, useRef } from "react";
import { educationData } from "../data/portfolioData";
import { gsap } from "gsap";

export default function EducationSection() {
  const [selectedCidr, setSelectedCidr] = useState("/26");

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const degreeColRef = useRef(null);
  const subnetColRef = useRef(null);

  const subnets = {
    "/24": { mask: "255.255.255.0", hosts: 254, range: "192.168.1.1 - 192.168.1.254", bcast: "192.168.1.255" },
    "/26": { mask: "255.255.255.192", hosts: 62, range: "192.168.1.1 - 192.168.1.62", bcast: "192.168.1.63" },
    "/28": { mask: "255.255.255.240", hosts: 14, range: "192.168.1.1 - 192.168.1.14", bcast: "192.168.1.15" },
    "/30": { mask: "255.255.255.252", hosts: 2, range: "192.168.1.1 - 192.168.1.2", bcast: "192.168.1.3" },
  };

  const currentSubnet = subnets[selectedCidr];

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

      if (degreeColRef.current) {
        gsap.fromTo(
          degreeColRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: degreeColRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (subnetColRef.current) {
        gsap.fromTo(
          subnetColRef.current,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subnetColRef.current,
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
      id="education"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent"
    >
      <div className="relative z-10 mx-auto max-w-6xl">

        <div ref={headerRef} className="mb-12 sm:mb-14">
          <div className="flex items-center gap-4 font-mono text-xs mb-4">
            <span className="text-[#65D6E7] tracking-wider">07 / CREDENTIALS</span>
            <span className="h-[1px] flex-1 bg-[var(--border-subtle)]" />
            <span className="text-[#8A94A6] hidden sm:inline">ACADEMICS &amp; NETWORK TRACKS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-medium tracking-[-0.025em] text-[#EDE9DF]">
            Education &amp; Certification Tracks
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          <div ref={degreeColRef} className="lg:col-span-7 space-y-6">
            <div>
              <div className="font-mono text-xs text-[#65D6E7] mb-1.5">
                {educationData.timeline} · {educationData.institution}
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#EDE9DF] mb-1.5">
                {educationData.degree}
              </h3>
              <p className="font-sans text-sm text-[#BAC2CF]">
                {educationData.location}
              </p>
            </div>

            <div className="pt-5 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans text-sm">
              <span className="text-[#8A94A6]">{educationData.hsc.exam} ({educationData.hsc.group})</span>
              <span className="font-mono text-[#EDE9DF] font-medium">GPA {educationData.hsc.gpa}</span>
            </div>

            <div className="pt-5 border-t border-[var(--border-subtle)] space-y-4">
              <div className="font-mono text-[11px] text-[#5A6476] tracking-wider">
                PROFESSIONAL &amp; TECHNICAL TRACKS
              </div>
              {educationData.certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[var(--border-subtle)] last:border-b-0 last:pb-0"
                >
                  <div>
                    <div className="font-sans text-sm sm:text-base font-semibold text-[#EDE9DF]">
                      {cert.title}
                    </div>
                    <div className="font-sans text-xs sm:text-sm text-[#8A94A6] mt-0.5 max-w-lg leading-relaxed">
                      {cert.focus}
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-[#65D6E7] shrink-0">
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div ref={subnetColRef} className="lg:col-span-5">
            <div className="relative surface-panel tech-grid-bg rounded-2xl p-6 flex flex-col gap-5">
              <span aria-hidden="true" className="absolute top-2.5 left-2.5 h-2.5 w-2.5 border-t border-l border-[#65D6E7]/40" />
              <span aria-hidden="true" className="absolute top-2.5 right-2.5 h-2.5 w-2.5 border-t border-r border-[#65D6E7]/40" />
              <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 h-2.5 w-2.5 border-b border-l border-[#65D6E7]/40" />
              <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 h-2.5 w-2.5 border-b border-r border-[#65D6E7]/40" />

              <div className="border-b border-[var(--border-subtle)] pb-3">
                <div className="font-mono text-[11px] text-[#65D6E7] mb-1">VLSM SANDBOX</div>
                <h3 className="font-sans text-base font-bold text-[#EDE9DF]">
                  CCNA IPv4 Subnet Inspector
                </h3>
                <p className="font-sans text-xs text-[#8A94A6] mt-0.5">
                  Interactive CIDR breakdown for 192.168.1.0/x.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                {Object.keys(subnets).map((cidr) => (
                  <button
                    key={cidr}
                    onClick={() => setSelectedCidr(cidr)}
                    className={`py-2 rounded-lg transition-colors border text-center touch-target ${
                      selectedCidr === cidr
                        ? "bg-[#65D6E7]/15 text-[#65D6E7] font-semibold border-[#65D6E7]/45"
                        : "bg-[#07090D]/80 text-[#8A94A6] border-[var(--border-subtle)] hover:text-[#EDE9DF]"
                    }`}
                  >
                    {cidr}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl surface-recessed font-mono text-xs space-y-2.5">
                <div className="flex justify-between gap-2">
                  <span className="text-[#8A94A6]">Subnet mask</span>
                  <span className="text-[#EDE9DF] font-medium">{currentSubnet.mask}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#8A94A6]">Usable hosts</span>
                  <span className="text-[#65D6E7] font-medium">{currentSubnet.hosts}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#8A94A6]">Host range</span>
                  <span className="text-[#BAC2CF]">{currentSubnet.range}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#8A94A6]">Broadcast</span>
                  <span className="text-[#8A94A6]">{currentSubnet.bcast}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
