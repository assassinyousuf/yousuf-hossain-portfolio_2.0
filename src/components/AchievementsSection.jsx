import React, { useState } from "react";
import { achievementsList } from "../data/portfolioData";
import { Trophy, Award, ShieldAlert, Users, CheckCircle2, Terminal, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function AchievementsSection() {
  const [flagInput, setFlagInput] = useState("");
  const [challengeStatus, setChallengeStatus] = useState("idle"); // 'idle' | 'solved' | 'error'

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    const clean = flagInput.trim();
    if (clean === "flag{secure_mesh_node_2026}" || clean === "secure_mesh_node_2026") {
      setChallengeStatus("solved");
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      setChallengeStatus("error");
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Trophy":
        return Trophy;
      case "Award":
        return Award;
      case "ShieldAlert":
        return ShieldAlert;
      case "Users":
        return Users;
      default:
        return Trophy;
    }
  };

  return (
    <section id="achievements" className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-[#03040a] border-t border-purple-900/25">
      
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 w-[420px] h-[420px] rounded-full bg-yellow-600/10 blur-[160px]" />
      <div className="pointer-events-none absolute left-10 bottom-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-950/25 text-yellow-300 font-mono text-xs tracking-widest mb-3">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>05 // COMPETITIVE HONORS & ACHIEVEMENTS</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              CYBERSECURITY CTF & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-300 to-cyan-300">
                COMPETITIVE TRIUMPHS
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-md">
            Verified competitive honors from national ICT championships, international red-teaming CTFs, and leadership appointments.
          </p>
        </div>

        {/* 4 Honors Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {achievementsList.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.title}
                className={`rounded-3xl glass-panel p-6 sm:p-8 border ${item.border} shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group hover:border-yellow-400/60 relative overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-yellow-400" />
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-semibold">{item.year}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <div className="font-mono text-xs text-cyan-400 mb-3">
                    {item.category}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-5">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 font-mono text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item.proof}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Mini CTF Sandbox */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-purple-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  INTERACTIVE CTF CHALLENGE // CIPHER RECON
                </h4>
                <p className="font-mono text-xs text-slate-400">
                  Test your security skills live in the browser. Intercept and decode the secret flag payload.
                </p>
              </div>
            </div>

            <div className="font-mono text-xs text-purple-400 px-3 py-1 rounded-xl bg-purple-950/30 border border-purple-500/20 self-start md:self-auto">
              DIFFICULTY: NOVICE // 100 PTS
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 font-mono text-xs text-slate-300">
              <div className="text-slate-500 mb-1">// INTERCEPTED TRANSMISSION PACKET:</div>
              <div className="text-cyan-300 text-sm font-bold tracking-wider">
                PAYLOAD (Base64): ZmxhZ3tzZWN1cmVfbWVzaF9ub2RlXzIwMjZ9
              </div>
              <div className="text-slate-500 text-[11px] mt-2">
                HINT: Decode the Base64 ASCII packet above to reveal the flag in <code className="text-purple-300">flag{`{...}`}</code> format.
              </div>
            </div>

            <form onSubmit={handleFlagSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="flag{...}"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setFlagInput("flag{secure_mesh_node_2026}")}
                className="px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white font-mono text-xs transition-colors"
              >
                Auto-Fill Flag
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono text-xs font-semibold hover:from-purple-500 hover:to-indigo-500 transition-colors"
              >
                Submit Flag
              </button>
            </form>

            {challengeStatus === "solved" && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>[SUCCESS // 200 OK] — Congratulations! CTF Challenge Solved. Flag confirmed authentic!</span>
              </div>
            )}

            {challengeStatus === "error" && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>[ERROR // 403] — Invalid flag string. Decode the base64 string or click 'Auto-Fill Flag' to test.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
