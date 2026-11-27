import React, { useState, useEffect, useRef } from "react";
import { timelineEvents } from "../data/portfolioData";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

export default function TimelineSection() {
  const [filter, setFilter] = useState("all");

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineTrackRef = useRef(null);
  const progressLineRef = useRef(null);
  const eventItemsRef = useRef([]);

  const filteredEvents =
    filter === "all"
      ? timelineEvents
      : timelineEvents.filter((e) => e.type.toLowerCase().includes(filter));

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

      if (progressLineRef.current && timelineTrackRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: "top 72%",
              end: "bottom 68%",
              scrub: 0.4,
            },
          }
        );
      }

      eventItemsRef.current.forEach((item) => {
        if (!item) return;
        const node = item.querySelector(".timeline-node");
        const content = item.querySelector(".timeline-content");

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, x: 18 },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0.85, borderColor: "rgba(148,163,184,0.3)" },
            {
              scale: 1.25,
              borderColor: "#65D6E7",
              boxShadow: "0 0 12px rgba(101, 214, 231, 0.5)",
              duration: 0.35,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 72%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 section-band border-y border-[var(--border-subtle)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Architectural Header */}
        <div ref={headerRef} className="mb-12 sm:mb-14">
          <div className="flex items-center gap-4 font-mono text-xs mb-4">
            <span className="text-[#65D6E7] tracking-wider">06 / TIMELINE</span>
            <span className="h-[1px] flex-1 bg-[var(--border-subtle)]" />
            <span className="text-[#8A94A6] hidden sm:inline">EXPERIENCE &amp; LEADERSHIP</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-2xl sm:text-4xl font-medium tracking-[-0.025em] text-[#EDE9DF]">
              Chronological Ledger
            </h2>

            <div className="flex flex-wrap items-center gap-1.5 font-sans text-xs self-start md:self-auto">
              {[
                { id: "all", label: "All" },
                { id: "industry", label: "Industry" },
                { id: "leadership", label: "Leadership" },
                { id: "research", label: "Research" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={`px-3.5 py-2 rounded-full transition-colors border ${
                    filter === item.id
                      ? "bg-[#65D6E7]/15 text-[#65D6E7] border-[#65D6E7]/45 font-medium"
                      : "bg-[#07090D]/55 text-[#8A94A6] hover:text-[#EDE9DF] border-[var(--border-subtle)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progressive Animated Vertical Timeline */}
        <div ref={timelineTrackRef} className="relative ml-2 sm:ml-4 pl-6 sm:pl-10 space-y-8 sm:space-y-10">

          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-[#8A94A6]/[0.2]" />
          <div
            ref={progressLineRef}
            className="absolute left-0 top-2 bottom-2 w-[2px] -ml-[0.5px] bg-[#65D6E7] origin-top"
          />

          {filteredEvents.map((event, idx) => {
            const isResearch = event.type.toLowerCase().includes("research");
            const isIndustry = event.type.toLowerCase().includes("industry");
            return (
              <div
                key={`${event.role}-${idx}`}
                ref={(el) => (eventItemsRef.current[idx] = el)}
                className="relative"
              >
                <div className="timeline-node absolute -left-[29px] sm:-left-[45px] top-1.5 h-3 w-3 rounded-full bg-[#0B0D12] border-2 border-[#5A6476] z-10" />

                <div className="timeline-content pb-8 border-b border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start">
                  <div className="md:col-span-4 space-y-1">
                    <div className="font-mono text-xs text-[#65D6E7] font-medium">
                      {event.period}
                    </div>
                    <div
                      className={`font-mono text-[11px] ${
                        isResearch
                          ? "text-[#A78BFA]"
                          : isIndustry
                          ? "text-[#EDE9DF]"
                          : "text-[#8A94A6]"
                      }`}
                    >
                      {event.type}
                    </div>
                  </div>

                  <div className="md:col-span-8">
                    <h3 className="font-sans text-lg sm:text-xl font-bold text-[#EDE9DF]">
                      {event.role}
                    </h3>
                    <div className="font-sans text-sm text-[#8A94A6] mt-0.5 mb-3">
                      {event.organizationUrl ? (
                        <a
                          href={event.organizationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[#BAC2CF] hover:text-[#65D6E7] transition-colors"
                        >
                          <span>{event.organization}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        event.organization
                      )}
                    </div>

                    <ul className="space-y-2 font-sans text-sm text-[#BAC2CF] leading-relaxed max-w-prose">
                      {event.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#5A6476] mt-2 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
