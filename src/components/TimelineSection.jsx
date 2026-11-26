import React, { useState, useEffect, useRef } from "react";
import { timelineEvents } from "../data/portfolioData";
import { Clock } from "lucide-react";
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
      // 1. Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Progressive Glowing Timeline Line Draw
      if (progressLineRef.current && timelineTrackRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: "top 70%",
              end: "bottom 65%",
              scrub: 0.4,
            },
          }
        );
      }

      // 3. Staggered Milestone Cards & Node Glow Activation
      eventItemsRef.current.forEach((item) => {
        if (!item) return;
        const node = item.querySelector(".timeline-node");
        const card = item.querySelector(".timeline-card");

        gsap.fromTo(
          card,
          { opacity: 0, x: 30, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0.8, borderColor: "#a855f7" },
            {
              scale: 1.25,
              borderColor: "#38bdf8",
              boxShadow: "0 0 16px rgba(56, 189, 248, 0.8)",
              duration: 0.4,
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
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-transparent border-t border-purple-900/25"
    >
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute left-10 top-1/2 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>07 // GROWTH PATH & CHRONOLOGY</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              GROWTH TIMELINE & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300">
                ORGANIZATIONAL IMPACT
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === "all"
                  ? "bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("leadership")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === "leadership"
                  ? "bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Leadership
            </button>
            <button
              onClick={() => setFilter("research")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === "research"
                  ? "bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Research
            </button>
          </div>
        </div>

        {/* Chronological Vertical Timeline with Progressive Animated Line */}
        <div ref={timelineTrackRef} className="relative ml-2.5 sm:ml-6 pl-5 sm:pl-8 space-y-8 sm:space-y-10">
          
          {/* Base Inactive Track Line */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-slate-800/80" />

          {/* Progressive Dynamic Glowing Fill Line */}
          <div
            ref={progressLineRef}
            className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 origin-top shadow-[0_0_10px_rgba(56,189,248,0.7)]"
          />

          {filteredEvents.map((event, idx) => (
            <div
              key={idx}
              ref={(el) => (eventItemsRef.current[idx] = el)}
              className="relative group"
            >
              {/* Timeline Glowing Node */}
              <div className="timeline-node absolute -left-[26px] sm:-left-[38px] top-2 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-[#030408] border-2 border-purple-400 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.5)] flex items-center justify-center z-10">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Event Card */}
              <div className="timeline-card rounded-3xl glass-panel p-5 sm:p-7 border border-purple-500/20 hover:border-cyan-400/40 shadow-[0_6px_25px_rgba(0,0,0,0.4)] transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-purple-950/60 text-purple-300 border border-purple-500/30">
                    {event.period}
                  </span>
                  <span className="font-mono text-xs text-cyan-400 font-semibold">
                    {event.type}
                  </span>
                </div>

                <h3 className="font-display text-base sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {event.role}
                </h3>
                <div className="font-mono text-xs text-slate-400 mb-3 sm:mb-4">
                  {event.organization}
                </div>

                {/* Accomplishments Bulleted List */}
                <ul className="space-y-2 font-mono text-xs text-slate-300">
                  {event.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{resp}</span>
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
