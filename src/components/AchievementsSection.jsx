import React, { useState, useEffect, useRef } from "react";
import { achievementsList } from "../data/portfolioData";
import { CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { gsap } from "gsap";

export default function AchievementsSection() {
  const [flagInput, setFlagInput] = useState("");
  const [challengeStatus, setChallengeStatus] = useState("idle");
  const [copiedPayload, setCopiedPayload] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctfSandboxRef = useRef(null);

  const competitionHonors = achievementsList.filter((a) => a.category !== "Organizational Leadership");
  const leadershipHonors = achievementsList.filter((a) => a.category === "Organizational Leadership");

  const getRankLabel = (title) => {
    if (title.includes("Intra")) return { num: "01", display: "#1", scope: "Champion" };
    if (title.includes("BCS")) return { num: "02", display: "#72", scope: "National Team" };
    return { num: "03", display: "#158", scope: "Global Standing" };
  };

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    const clean = flagInput.trim();
    if (clean === "flag{secure_mesh_node_2026}" || clean === "secure_mesh_node_2026") {
      setChallengeStatus("solved");
      confetti({
        particleCount: 90,
        spread: 65,
        colors: ["#65D6E7", "#A78BFA", "#EDE9DF"],
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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
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
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent"
    >
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Architectural Header */}
        <div ref={headerRef} className="mb-12 sm:mb-14">
          <div className="flex items-center gap-4 font-mono text-xs mb-4">
            <span className="text-[#65D6E7] tracking-wider">05 / HONORS</span>
            <span className="h-[1px] flex-1 bg-[var(--border-subtle)]" />
            <span className="text-[#8A94A6] hidden sm:inline">COMPETITIONS &amp; GOVERNANCE</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-2xl sm:text-4xl font-medium tracking-[-0.025em] text-[#EDE9DF]">
              Standings &amp; Leadership
            </h2>
            <p className="font-sans text-sm text-[#8A94A6] max-w-md leading-relaxed">
              Verified Capture-The-Flag leaderboard standings alongside elected student engineering governance.
            </p>
          </div>
        </div>

        {/* Leaderboard Rows */}
        <div ref={gridRef} className="space-y-10 mb-12">
          <div className="border-y border-[var(--border-subtle)]">
            <div className="py-3 border-b border-[var(--border-subtle)] grid grid-cols-12 font-mono text-[10.5px] text-[#5A6476] tracking-wider">
              <span className="col-span-4 md:col-span-3">STANDING</span>
              <span className="col-span-8 md:col-span-6">COMPETITION &amp; SCOPE</span>
              <span className="hidden md:block md:col-span-3 md:text-right">VERIFICATION</span>
            </div>

            <div className="divide-y divide-[var(--border-subtle)]">
              {competitionHonors.map((item) => {
                const rank = getRankLabel(item.title);
                const isFirst = rank.display === "#1";
                return (
                  <div
                    key={item.title}
                    className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start md:items-center"
                  >
                    <div className="md:col-span-3 flex items-baseline gap-3.5">
                      <span
                        className={`font-display text-3xl sm:text-4xl font-semibold tabular-nums leading-none ${
                          isFirst ? "text-[#65D6E7]" : "text-[#EDE9DF]"
                        }`}
                      >
                        {rank.display}
                      </span>
                      <div>
                        <div className="font-mono text-xs text-[#EDE9DF]">{rank.scope}</div>
                        <div className="font-mono text-[11px] text-[#5A6476]">{item.year}</div>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-1">
                      <h3 className="font-sans text-lg font-bold text-[#EDE9DF]">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm text-[#8A94A6] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="md:col-span-3 md:text-right font-mono text-[11px]">
                      <span className="block text-[#BAC2CF]">{item.category}</span>
                      <span className="block mt-0.5 text-[#5A6476]">{item.proof}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lower Asymmetric Split: Executive Governance + Interactive CTF Recon */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Executive Governance Highlight */}
            {leadershipHonors.map((item) => (
              <div
                key={item.title}
                className="lg:col-span-6 surface-panel rounded-2xl p-6 sm:p-7 border-l-2 border-l-[#65D6E7] flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#65D6E7] font-medium">{item.category.toUpperCase()}</span>
                    <span className="text-[#8A94A6]">{item.year}</span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#EDE9DF]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-[#BAC2CF] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-[11px] text-[#8A94A6]">
                  <span>{item.proof}</span>
                  <span className="text-[#65D6E7]">ACTIVE TERM</span>
                </div>
              </div>
            ))}

            {/* Interactive CTF Challenge */}
            <div
              ref={ctfSandboxRef}
              className="lg:col-span-6 surface-panel tech-grid-bg rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5"
            >
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="font-mono text-[11px] text-[#A78BFA] mb-1">INTERACTIVE RECON</div>
                  <h4 className="font-sans text-base sm:text-lg font-bold text-[#EDE9DF]">
                    Base64 Packet Challenge
                  </h4>
                </div>
                <span className="font-mono text-[11px] text-[#5A6476] shrink-0">
                  flag{`{...}`}
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="p-3 rounded-xl surface-recessed font-mono text-xs flex items-center justify-between gap-3">
                  <div className="text-[#65D6E7] break-all">
                    ZmxhZ3tzZWN1cmVfbWVzaF9ub2RlXzIwMjZ9
                  </div>
                  <button
                    onClick={copyPayload}
                    type="button"
                    className="text-xs text-[#BAC2CF] hover:text-[#EDE9DF] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[#141923] shrink-0 transition-colors"
                  >
                    {copiedPayload ? <Check className="w-3.5 h-3.5 text-[#65D6E7]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPayload ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <form onSubmit={handleFlagSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Enter decoded flag{...}"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    aria-label="CTF Flag Input"
                    className="flex-1 px-3.5 py-2.5 rounded-lg surface-recessed text-[#EDE9DF] placeholder-[#5A6476] font-mono text-xs focus:outline-none focus:border-[#65D6E7]/60"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFlagInput("flag{secure_mesh_node_2026}")}
                      className="px-3.5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[#141923]/75 text-[#BAC2CF] hover:text-[#EDE9DF] font-sans text-xs transition-colors shrink-0 touch-target"
                    >
                      Auto-fill
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-lg bg-[#EDE9DF] hover:bg-white text-[#0B0D12] font-sans text-xs font-semibold transition-colors shrink-0 touch-target"
                    >
                      Verify
                    </button>
                  </div>
                </form>

                {challengeStatus === "solved" && (
                  <div className="p-3 rounded-lg bg-[#65D6E7]/10 border border-[#65D6E7]/30 text-[#EDE9DF] font-sans text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#65D6E7] shrink-0" />
                    <span>Flag verified: `flag&#123;secure_mesh_node_2026&#125;`.</span>
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
        </div>

      </div>
    </section>
  );
}
