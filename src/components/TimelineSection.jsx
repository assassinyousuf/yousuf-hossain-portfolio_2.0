import React, { useState } from "react";
import { timelineEvents } from "../data/portfolioData";
import { Clock } from "lucide-react";

export default function TimelineSection() {
  const [filter, setFilter] = useState("all");

  const filteredEvents =
    filter === "all"
      ? timelineEvents
      : timelineEvents.filter((e) => e.type.toLowerCase().includes(filter));

  return (
    <section id="timeline" className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-[#04060f] border-t border-purple-900/25">
      
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute left-10 top-1/2 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>06 // EXPERIENCE, RESEARCH & LEADERSHIP</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              GROWTH TIMELINE & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300">
                ORGANIZATIONAL IMPACT
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 font-mono text-xs self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                filter === "all"
                  ? "bg-purple-600 text-white font-semibold"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setFilter("leadership")}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                filter === "leadership"
                  ? "bg-purple-600 text-white font-semibold"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Leadership
            </button>
            <button
              onClick={() => setFilter("research")}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                filter === "research"
                  ? "bg-purple-600 text-white font-semibold"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Research
            </button>
          </div>
        </div>

        {/* Chronological Vertical Timeline */}
        <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
          {filteredEvents.map((event, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-[#030408] border-2 border-purple-400 group-hover:border-cyan-400 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.5)] flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Event Card */}
              <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-purple-500/20 hover:border-purple-400/40 shadow-[0_6px_25px_rgba(0,0,0,0.4)] transition-all">
                
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-purple-950/60 text-purple-300 border border-purple-500/30">
                    {event.period}
                  </span>
                  <span className="font-mono text-xs text-cyan-400 font-semibold">
                    {event.type}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
                  {event.role}
                </h3>
                <div className="font-mono text-xs text-slate-400 mb-4">
                  {event.organization}
                </div>

                {/* Accomplishments Bulleted List */}
                <ul className="space-y-2 font-mono text-xs text-slate-300">
                  {event.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
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
