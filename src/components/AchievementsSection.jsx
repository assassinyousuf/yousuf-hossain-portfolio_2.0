import React, { useState, useEffect, useRef } from "react";
import { achievementsList } from "../data/portfolioData";
import { CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { gsap } from "gsap";

export default function AchievementsSection() {
  const [flagInput, setFlagInput] = useState("");
  const [challengeStatus, setChallengeStatus] = useState("idle"); // 'idle' | 'solved' | 'error'
  const [copiedPayload, setCopiedPayload] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctfSandboxRef = useRef(null);

  const competitionHonors = achievementsList.filter((a) => a.category !== "Organizational Leadership");
  const leadershipHonors = achievementsList.filter((a) => a.category === "Organizational Leadership");

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    const clean = flagInput.trim();
    if (clean === "flag{secure_mesh_node_2026}" || clean === "secure_mesh_node_2026") {
      setChallengeStatus("solved");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setChallengeStatus("error");
    }
  };

  const copyPayload = () => {
    navigator.clipboard.writeText("ZmxhZ3tzZWN1cmVfbWVzaF9ub2RlXzIwMjZ9");
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (ctfSandboxRef.current) {
        gsap.fromTo(
          ctfSandboxRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctfSandboxRef.current,
              start: "top 85%",
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
      id="achievements"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Clean Editorial Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs text-sky-400 mb-2">
              05 · Honors & Recognition
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-100">
              Competitions & Leadership
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md leading-relaxed">
            Verified standings in national and international Capture-The-Flag tournaments alongside technical student organization governance.
          </p>
        </div>

        {/* Separated Competition Rankings vs Leadership Appointment */}
        <div ref={gridRef} className="space-y-8 mb-12">
          
          {/* Competition Rankings (3-column restrained surface cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitionHonors.map((item) => (
              <div
                key={item.title}
                className="surface-panel rounded-2xl p-6 flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-3">
                    <span className="text-sky-400 font-medium">{item.badge}</span>
                    <span className="text-slate-500 tabular-nums">{item.year}</span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-slate-100 mb-1.5">
                    {item.title}
                  </h3>
                  <div className="font-mono text-[11px] text-slate-400 mb-3">
                    {item.category}
                  </div>

                  <p className="font-sans text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-slate-400">
                  {item.proof}
                </div>
              </div>
            ))}
          </div>

          {/* Executive Leadership Feature Row (Visually distinct from tournament standings) */}
          {leadershipHonors.map((item) => (
            <div
              key={item.title}
              className="surface-panel rounded-2xl p-6 sm:p-8 border-l-2 border-l-sky-400 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-sky-400 font-medium">{item.category}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{item.year}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-100">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="font-mono text-xs text-slate-400 shrink-0">
                {item.proof}
              </div>
            </div>
          ))}

        </div>

        {/* Restrained Interactive CTF Challenge */}
        <div
          ref={ctfSandboxRef}
          className="surface-panel rounded-2xl p-6 sm:p-7"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/[0.08]">
            <div>
              <h4 className="font-display text-base font-semibold text-slate-100">
                Interactive CTF Challenge · Base64 Recon
              </h4>
              <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                Decode the intercepted packet string to submit the flag.
              </p>
            </div>
            <span className="font-mono text-[11px] text-slate-400 self-start sm:self-auto">
              Format: flag{`{...}`}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#04060a] border border-white/[0.08] font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-sky-300 break-all">
                ZmxhZ3tzZWN1cmVfbWVzaF9ub2RlXzIwMjZ9
              </div>
              <button
                onClick={copyPayload}
                type="button"
                className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.1] bg-white/[0.03] shrink-0 self-start sm:self-auto"
              >
                {copiedPayload ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedPayload ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <form onSubmit={handleFlagSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                placeholder="Enter flag{...}"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                aria-label="CTF Flag Input"
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#04060a] border border-white/[0.1] text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-400"
              />
              <button
                type="button"
                onClick={() => setFlagInput("flag{secure_mesh_node_2026}")}
                className="px-4 py-2.5 rounded-lg border border-white/[0.1] bg-white/[0.03] text-slate-300 hover:text-white font-sans text-xs transition-colors shrink-0 touch-target"
              >
                Auto-fill
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-white text-slate-950 font-sans text-xs font-semibold transition-colors shrink-0 touch-target"
              >
                Verify Flag
              </button>
            </form>

            {challengeStatus === "solved" && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-sans text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Flag verified. Decoded string matches `flag&#123;secure_mesh_node_2026&#125;`.</span>
              </div>
            )}

            {challengeStatus === "error" && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-sans text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Incorrect flag string. Decode the Base64 packet above or use Auto-fill.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
