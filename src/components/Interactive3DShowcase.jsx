import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, Network, Lock, Radio, Cpu, ArrowRight, Layers } from "lucide-react";

export default function Interactive3DShowcase() {
  const containerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  const stages = [
    {
      id: "stage-1",
      step: "01 // ZERO-TRUST DEFENSE",
      title: "SafeLink+: Preemptive Mobile Sandboxing",
      subtitle: "Published in Taylor & Francis Book Series",
      desc: "Architected a zero-trust mobile container that isolates untrusted URIs within an ephemeral sandbox, executing behavioral heuristics before any packet touches host memory.",
      metrics: [
        { label: "Execution Latency", val: "< 14ms" },
        { label: "Phishing Neutralization", val: "99.8%" },
        { label: "Host Inspection Mode", val: "Ring-0 Isolated" }
      ],
      icon: Lock,
      color: "from-purple-500 to-indigo-600",
      border: "border-purple-500/40",
      accent: "text-purple-400"
    },
    {
      id: "stage-2",
      step: "02 // AD-HOC MESH NETWORKS",
      title: "Disaster-Resilient Offline Hybrid Mesh",
      subtitle: "Camera-Ready National Research",
      desc: "Engineered an infrastructure-independent peer-to-peer relay network using opportunistic Wi-Fi Direct and BLE hops, maintaining critical communications when cell towers collapse.",
      metrics: [
        { label: "Cellular Dependency", val: "0% (Fully Offline)" },
        { label: "Hop Propagation", val: "Multi-tier Mesh" },
        { label: "Ad-hoc Protocol", val: "Adaptive Hybrid" }
      ],
      icon: Radio,
      color: "from-cyan-500 to-blue-600",
      border: "border-cyan-500/40",
      accent: "text-cyan-400"
    },
    {
      id: "stage-3",
      step: "03 // CROSS-MEDIA CRYPTO",
      title: "VisioLock: Audio-Domain Steganography",
      subtitle: "Published in Taylor & Francis Book Series",
      desc: "Engineered a dual-layered information security pipeline that transforms visual payloads into acoustic spectrum frequencies paired with device-bound hardware cryptographic keys.",
      metrics: [
        { label: "Acoustic Encoding", val: "Multi-carrier FSK" },
        { label: "Key Derivation", val: "Hardware Fingerprinted" },
        { label: "Spectral Tamper Detection", val: "Real-Time CRC" }
      ],
      icon: Cpu,
      color: "from-pink-500 to-purple-600",
      border: "border-pink-500/40",
      accent: "text-pink-400"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.scrollHeight - window.innerHeight;
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      setScrollPercent(progress);

      if (progress < 0.33) {
        setActiveStage(0);
      } else if (progress < 0.66) {
        setActiveStage(1);
      } else {
        setActiveStage(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = stages[activeStage];
  const IconComponent = current.icon;

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] w-full bg-[#020306] select-none"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8 overflow-hidden">
        
        {/* Background Radial Glow aligned with active step */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/10 via-cyan-600/10 to-transparent blur-[140px] transition-all duration-700" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>SCROLL-DRIVEN ARCHITECTURAL DEEP DIVE</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                RESEARCH ARCHITECTURE //{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                  SYSTEM BREAKDOWN
                </span>
              </h2>
            </div>

            {/* Scroll Indicator Bar */}
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span>PROGRESS: {Math.round(scrollPercent * 100)}%</span>
              <div className="w-28 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-150"
                  style={{ width: `${scrollPercent * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Stage Step Tabs */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {stages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => {
                  const el = containerRef.current;
                  if (!el) return;
                  const targetY =
                    el.offsetTop + (idx / (stages.length - 1)) * (el.scrollHeight - window.innerHeight);
                  window.scrollTo({ top: targetY, behavior: "smooth" });
                }}
                className={`text-left p-3.5 rounded-2xl border transition-all duration-300 font-mono text-xs ${
                  activeStage === idx
                    ? "glass-panel border-purple-400 bg-purple-950/40 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    : "border-slate-800/80 bg-slate-900/30 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] text-purple-400 font-bold mb-1">
                  STAGE 0{idx + 1}
                </div>
                <div className="font-semibold truncate">
                  {stage.title.split(":")[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Featured Stage Showcase Card with 3D Depth */}
          <div className="relative rounded-3xl glass-panel p-6 sm:p-12 border border-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Ambient Background Gradient Splash */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {current.step}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {current.subtitle}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {current.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
                  {current.desc}
                </p>

                {/* Performance & Security Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
                  {current.metrics.map((m) => (
                    <div key={m.label} className="p-3.5 rounded-2xl bg-black/40 border border-purple-500/15">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        {m.label}
                      </div>
                      <div className="font-display font-bold text-sm sm:text-lg text-white mt-1">
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Holographic 3D Icon Graphic */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl glass-panel border border-purple-500/30 flex items-center justify-center p-8 group shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                  
                  {/* Rotating Concentric Rings */}
                  <div className="absolute inset-2 rounded-2xl border border-purple-400/20 animate-spin [animation-duration:20s]" />
                  <div className="absolute inset-5 rounded-xl border border-cyan-400/20 animate-spin [animation-duration:15s] [animation-direction:reverse]" />
                  
                  {/* Glowing Icon */}
                  <IconComponent className={`w-20 h-20 ${current.accent} drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]`} />
                  
                  <div className="absolute bottom-2 font-mono text-[9px] text-purple-300/80 tracking-widest uppercase">
                    SYS_MODULE_ACTIVE
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
