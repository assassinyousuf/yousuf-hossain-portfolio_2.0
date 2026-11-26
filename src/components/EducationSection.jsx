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

      if (degreeColRef.current) {
        gsap.fromTo(
          degreeColRef.current,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
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
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-12">
          <div className="font-mono text-xs text-sky-400 mb-2">
            06 · Academics & Certifications
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-100">
            Education & Credential Tracks
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Academic Standing & Memberships (Open Editorial Layout) */}
          <div ref={degreeColRef} className="lg:col-span-7 space-y-6">
            <div>
              <div className="font-mono text-xs text-slate-400 mb-1.5">
                2023 – 2027 · {educationData.institution}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-100 mb-2">
                {educationData.degree}
              </h3>
              <p className="font-sans text-sm text-slate-300">
                7th Semester Undergraduate · {educationData.location}
              </p>
            </div>

            <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans text-sm">
              <span className="text-slate-400">{educationData.hsc.exam} ({educationData.hsc.group})</span>
              <span className="font-mono text-slate-100 font-medium">GPA {educationData.hsc.gpa}</span>
            </div>

            <div className="pt-5 border-t border-white/[0.08] space-y-4">
              <div className="font-mono text-xs text-slate-400">
                Professional & Technical Tracks
              </div>
              {educationData.certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/[0.06] last:border-b-0 last:pb-0"
                >
                  <div>
                    <div className="font-sans text-sm font-semibold text-slate-100">
                      {cert.title}
                    </div>
                    <div className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5 max-w-lg leading-relaxed">
                      {cert.focus}
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-sky-400 shrink-0">
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive CCNA VLSM Subnet Sandbox */}
          <div ref={subnetColRef} className="lg:col-span-5">
            <div className="surface-panel rounded-2xl p-6 flex flex-col gap-5">
              <div>
                <h3 className="font-display text-base font-semibold text-slate-100">
                  CCNA Subnet Calculator
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                  Interactive IPv4 VLSM breakdown for 192.168.1.0/x.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                {Object.keys(subnets).map((cidr) => (
                  <button
                    key={cidr}
                    onClick={() => setSelectedCidr(cidr)}
                    className={`py-2 rounded-lg transition-colors border text-center touch-target ${
                      selectedCidr === cidr
                        ? "bg-sky-500/15 text-sky-300 font-semibold border-sky-400/40"
                        : "bg-white/[0.02] text-slate-400 border-white/[0.08] hover:text-slate-200"
                    }`}
                  >
                    {cidr}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#04060a] border border-white/[0.08] font-mono text-xs space-y-2.5">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-400">Subnet mask</span>
                  <span className="text-slate-100 font-medium">{currentSubnet.mask}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-400">Usable hosts</span>
                  <span className="text-sky-300 font-medium">{currentSubnet.hosts}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-400">Host range</span>
                  <span className="text-slate-200">{currentSubnet.range}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-400">Broadcast</span>
                  <span className="text-slate-300">{currentSubnet.bcast}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
