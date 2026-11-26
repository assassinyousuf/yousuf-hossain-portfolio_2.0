import React, { useState, useEffect, useRef } from "react";
import { timelineEvents } from "../data/portfolioData";
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

      // Progressive Line Draw
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

      // Milestone Node Activation & Open Entry Reveal
      eventItemsRef.current.forEach((item) => {
        if (!item) return;
        const node = item.querySelector(".timeline-node");
        const content = item.querySelector(".timeline-content");

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, x: 20 },
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
              borderColor: "#38bdf8",
              boxShadow: "0 0 12px rgba(56, 189, 248, 0.7)",
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="font-mono text-xs text-sky-400 mb-2">
              07 · Experience & Leadership
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-100">
              Timeline & Organizational Impact
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 font-sans text-xs self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-2 rounded-lg transition-colors border ${
                filter === "all"
                  ? "bg-sky-500/15 text-sky-300 border-sky-400/40 font-medium"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-white/[0.08]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("leadership")}
              className={`px-3.5 py-2 rounded-lg transition-colors border ${
                filter === "leadership"
                  ? "bg-sky-500/15 text-sky-300 border-sky-400/40 font-medium"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-white/[0.08]"
              }`}
            >
              Leadership
            </button>
            <button
              onClick={() => setFilter("research")}
              className={`px-3.5 py-2 rounded-lg transition-colors border ${
                filter === "research"
                  ? "bg-sky-500/15 text-sky-300 border-sky-400/40 font-medium"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-white/[0.08]"
              }`}
            >
              Research
            </button>
          </div>
        </div>

        {/* Progressive Animated Vertical Timeline */}
        <div ref={timelineTrackRef} className="relative ml-2 sm:ml-4 pl-6 sm:pl-10 space-y-10 sm:space-y-12">
          
          {/* Inactive Rail */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/[0.08]" />

          {/* Active Drawn Line */}
          <div
            ref={progressLineRef}
            className="absolute left-0 top-2 bottom-2 w-[2px] -ml-[0.5px] bg-sky-400 origin-top"
          />

          {filteredEvents.map((event, idx) => (
            <div
              key={`${event.role}-${idx}`}
              ref={(el) => (eventItemsRef.current[idx] = el)}
              className="relative"
            >
              {/* Milestone Node */}
              <div className="timeline-node absolute -left-[29px] sm:-left-[45px] top-1.5 h-3 w-3 rounded-full bg-[#06080c] border-2 border-slate-600 z-10" />

              {/* Open Typographic Entry (No repetitive nested cards) */}
              <div className="timeline-content pb-8 border-b border-white/[0.06] last:border-b-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs mb-2">
                  <span className="text-sky-400 font-medium">{event.period}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{event.type}</span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-semibold text-slate-100">
                  {event.role}
                </h3>
                <div className="font-sans text-sm text-slate-400 mt-0.5 mb-3">
                  {event.organization}
                </div>

                <ul className="space-y-2 font-sans text-sm text-slate-300 leading-relaxed max-w-prose">
                  {event.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500 mt-2 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
