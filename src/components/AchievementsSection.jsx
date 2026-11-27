import React, { useState, useEffect, useRef } from "react";
import { achievementsList } from "../data/portfolioData";
import { CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { gsap } from "gsap";

function TrophyEmblem({ rank }) {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10 shrink-0" aria-hidden="true">
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="rgba(101,214,231,0.06)"
        stroke="rgba(101,214,231,0.32)"
        strokeWidth="1"
      />
      <path
        d="M16 15h16v6c0 5-3.5 8.5-8 8.5S16 26 16 21v-6z"
        fill="none"
        stroke="#65D6E7"
        strokeWidth="1.4"
      />
      <path
        d="M16 17h-3.5c0 4 1.5 5.5 3.5 5.5M32 17h3.5c0 4-1.5 5.5-3.5 5.5"
        fill="none"
        stroke="rgba(140,150,168,0.65)"
        strokeWidth="1.2"
      />
      <path d="M24 29.5v4.5M19 34h10" stroke="#65D6E7" strokeWidth="1.4" strokeLinecap="round" />
      {rank === "1" && <circle cx="24" cy="21" r="2.2" fill="#A78BFA" />}
    </svg>
  );
}

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

  const getRankLabel = (title) => {
    if (title.includes("Intra")) return { num: "#1", scope: "Champion" };
    if (title.includes("BCS")) return { num: "#72", scope: "National Team" };
    return { num: "#158", scope: "Global Standing" };
  };

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    const clean = flagInput.trim();
    if (clean === "flag{secure_mesh_node_2026}" || clean === "secure_mesh_node_2026") {
      setChallengeStatus("solved");
      confetti({
        particleCount: 90,
        spread: 65,
        colors: ["#65D6E7", "#A78BFA", "#E8E4DA"],
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-[var(--border-subtle)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Clean Editorial Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs text-[#65D6E7] mb-2">
              05 · Honors & Recognition
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#E8E4DA]">
              Competitions & Leadership
            </h2>
          </div>
          <p className="font-sans text-sm text-[#8C96A8] max-w-md leading-relaxed">
            Verified Capture-The-Flag leaderboard standings and elected student governance roles.
          </p>
        </div>

        {/* Visual CTF Leaderboard Composition + Governance Feature */}
        <div ref={gridRef} className="space-y-8 mb-12">

          {/* Scoreboard Visual Rows */}
          <div className="surface-panel rounded-2xl overflow-hidden">
            <div className="px-5 sm:px-6 py-3 border-b border-[var(--border-subtle)] surface-recessed flex items-center justify-between font-mono text-[11px] text-[#8C96A8]">
              <span>CTF COMPETITION STANDINGS</span>
              <span>VERIFIED SCOREBOARDS</span>
            </div>

            <div className="divide-y divide-[var(--border-subtle)]">
              {competitionHonors.map((item) => {
                const rank = getRankLabel(item.title);
                return (
                  <div
                    key={item.title}
                    className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center"
                  >
                    {/* Visual Rank + Trophy Emblem */}
                    <div className="md:col-span-3 flex items-center gap-4">
                      <TrophyEmblem rank={rank.num === "#1" ? "1" : "0"} />
                      <div>
                        <div className="font-display text-2xl sm:text-3xl font-semibold text-[#E8E4DA] tabular-nums leading-none">
                          {rank.num}
                        </div>
                        <div className="font-mono text-[11px] text-[#65D6E7] mt-1">
                          {rank.scope} · {item.year}
                        </div>
                      </div>
                    </div>

                    {/* Tournament Details */}
                    <div className="md:col-span-6 space-y-1">
                      <h3 className="font-display text-base sm:text-lg font-semibold text-[#E8E4DA]">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#B4BCC9] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Verification Note */}
                    <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#8C96A8]">
                      <span className="block text-[#B4BCC9]">{item.category}</span>
                      <span className="block mt-0.5 text-[#5C6575]">{item.proof}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Executive Leadership Feature Row */}
          {leadershipHonors.map((item) => (
            <div
              key={item.title}
              className="surface-panel rounded-2xl p-6 sm:p-8 border-l-2 border-l-[#65D6E7] flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-[#65D6E7] font-medium">{item.category}</span>
                  <span className="text-[#5C6575]">·</span>
                  <span className="text-[#8C96A8]">{item.year}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#E8E4DA]">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-[#B4BCC9] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="font-mono text-xs text-[#8C96A8] shrink-0">
                {item.proof}
              </div>
            </div>
          ))}

        </div>

        {/* Compact Interactive CTF Challenge */}
        <div
          ref={ctfSandboxRef}
          className="surface-panel rounded-2xl p-6 sm:p-7"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[var(--border-subtle)]">
            <div>
              <h4 className="font-display text-base font-semibold text-[#E8E4DA]">
                Interactive CTF Challenge · Base64 Recon
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#8C96A8] mt-0.5">
                Decode the intercepted packet string to submit the flag.
              </p>
            </div>
            <span className="font-mono text-[11px] text-[#8C96A8] self-start sm:self-auto">
              Format: flag{`{...}`}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 rounded-xl surface-recessed font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[#65D6E7] break-all">
                ZmxhZ3tzZWN1cmVfbWVzaF9ub2RlXzIwMjZ9
              </div>
              <button
                onClick={copyPayload}
                type="button"
                className="text-xs text-[#B4BCC9] hover:text-[#E8E4DA] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[#151922]/70 shrink-0 self-start sm:self-auto transition-colors"
              >
                {copiedPayload ? (
                  <Check className="w-3.5 h-3.5 text-[#65D6E7]" />
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
                className="flex-1 px-3.5 py-2.5 rounded-lg surface-recessed text-[#E8E4DA] placeholder-[#5C6575] font-mono text-xs focus:outline-none focus:border-[#65D6E7]/60"
              />
              <button
                type="button"
                onClick={() => setFlagInput("flag{secure_mesh_node_2026}")}
                className="px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[#151922]/70 text-[#B4BCC9] hover:text-[#E8E4DA] hover:border-[var(--border-strong)] font-sans text-xs transition-colors shrink-0 touch-target"
              >
                Auto-fill
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#E8E4DA] hover:bg-[#F5F2EB] text-[#0B0D12] font-sans text-xs font-semibold transition-colors shrink-0 touch-target"
              >
                Verify Flag
              </button>
            </form>

            {challengeStatus === "solved" && (
              <div className="p-3 rounded-lg bg-[#65D6E7]/10 border border-[#65D6E7]/30 text-[#E8E4DA] font-sans text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#65D6E7] shrink-0" />
                <span>Flag verified. Decoded string matches `flag&#123;secure_mesh_node_2026&#125;`.</span>
              </div>
            )}

            {challengeStatus === "error" && (
              <div className="p-3 rounded-lg bg-rose-400/10 border border-rose-400/30 text-rose-200 font-sans text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
                <span>Incorrect flag string. Decode the Base64 packet above or use Auto-fill.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
