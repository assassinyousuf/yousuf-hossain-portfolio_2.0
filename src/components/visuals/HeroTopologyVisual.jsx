import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const NODES = [
  {
    id: "visiolock",
    code: "PRJ-01",
    label: "VisioLock",
    domain: "Acoustic Steganography",
    spec: "I2A3 · SAIC-ACT · RS(255,239) · FSK WAV",
    metric: "< 0.05 BER ≥ 9 dB SNR",
    x: 94,
    y: 76,
    accent: "violet",
  },
  {
    id: "safelink",
    code: "PRJ-02",
    label: "SafeLink+",
    domain: "Zero-Trust Sandbox",
    spec: "Hidden WebView · JS Probes · RiskEngine",
    metric: "Ephemeral session wipe",
    x: 286,
    y: 76,
    accent: "cyan",
  },
  {
    id: "mesh",
    code: "PRJ-03",
    label: "GetConnect",
    domain: "Offline Hybrid Mesh",
    spec: "BLE Discovery · Wi-Fi Direct TCP:8080",
    metric: "93.2% text · 92.6% PDR",
    x: 94,
    y: 230,
    accent: "cyan",
  },
  {
    id: "ids",
    code: "PRJ-04/05",
    label: "Edge IDS & HCE",
    domain: "IoT DL & NFC Replay",
    spec: "1D-CNN+GRU · AES-256-CBC · 60s Nonce",
    metric: "~98.9% acc · 6.5ms latency",
    x: 286,
    y: 230,
    accent: "violet",
  },
];

export default function HeroTopologyVisual() {
  const [activeId, setActiveId] = useState("visiolock");
  const activeNode = NODES.find((n) => n.id === activeId) || NODES[0];
  const isViolet = activeNode.accent === "violet";

  return (
    <div className="relative surface-panel tech-grid-bg rounded-2xl p-5 sm:p-6 w-full max-w-[430px] mx-auto lg:ml-auto">
      {/* Precision Architectural Corner Registration Ticks */}
      <span aria-hidden="true" className="absolute top-2.5 left-2.5 h-2.5 w-2.5 border-t border-l border-[#65D6E7]/45" />
      <span aria-hidden="true" className="absolute top-2.5 right-2.5 h-2.5 w-2.5 border-t border-r border-[#65D6E7]/45" />
      <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 h-2.5 w-2.5 border-b border-l border-[#65D6E7]/45" />
      <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 h-2.5 w-2.5 border-b border-r border-[#65D6E7]/45" />

      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-3.5 font-mono text-[11px]">
        <span className="text-[#8A94A6] inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#65D6E7]" />
          SYSTEM ARCHITECTURE
        </span>
        <span className="text-[#65D6E7]">05 RESEARCH SYSTEMS</span>
      </div>

      <svg
        viewBox="0 0 380 300"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Interactive network and security system architecture diagram"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(101, 214, 231, 0.22)" />
            <stop offset="100%" stopColor="rgba(101, 214, 231, 0)" />
          </radialGradient>
        </defs>

        <circle cx="190" cy="153" r="114" fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeDasharray="3 5" />
        <circle cx="190" cy="153" r="70" fill="none" stroke="rgba(101, 214, 231, 0.16)" />
        <circle cx="190" cy="153" r="54" fill="url(#hubGlow)" />

        {/* Cross-connect mesh edges */}
        <line x1="94" y1="76" x2="286" y2="76" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
        <line x1="94" y1="230" x2="286" y2="230" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
        <line x1="94" y1="76" x2="94" y2="230" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
        <line x1="286" y1="76" x2="286" y2="230" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />

        {/* Hub-to-node links */}
        {NODES.map((node) => {
          const isActive = node.id === activeId;
          const activeStroke = node.accent === "violet" ? "#A78BFA" : "#65D6E7";
          return (
            <line
              key={`link-${node.id}`}
              x1="190"
              y1="153"
              x2={node.x}
              y2={node.y}
              stroke={isActive ? activeStroke : "rgba(148, 163, 184, 0.22)"}
              strokeWidth={isActive ? "1.6" : "1"}
              strokeDasharray={isActive ? "none" : "3 3"}
            />
          );
        })}

        {/* Central Core Node */}
        <g transform="translate(190,153)">
          <rect
            x="-36"
            y="-22"
            width="72"
            height="44"
            rx="8"
            fill="#07090D"
            stroke="#65D6E7"
            strokeWidth="1.15"
          />
          <text
            x="0"
            y="-3"
            textAnchor="middle"
            className="fill-[#EDE9DF] font-mono text-[10px] font-semibold"
          >
            CORE
          </text>
          <text
            x="0"
            y="10"
            textAnchor="middle"
            className="fill-[#65D6E7] font-mono text-[8px]"
          >
            yousuf.surf
          </text>
        </g>

        {/* Interactive Satellite Nodes */}
        {NODES.map((node) => {
          const isActive = node.id === activeId;
          const accentHex = node.accent === "violet" ? "#A78BFA" : "#65D6E7";
          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => setActiveId(node.id)}
              onMouseEnter={() => setActiveId(node.id)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${node.label}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveId(node.id);
              }}
            >
              <rect
                x="-76"
                y="-26"
                width="152"
                height="52"
                rx="8"
                fill={isActive ? "#141923" : "rgba(7, 9, 13, 0.92)"}
                stroke={isActive ? accentHex : "rgba(148, 163, 184, 0.22)"}
                strokeWidth={isActive ? "1.4" : "1"}
              />
              <circle
                cx="-60"
                cy="0"
                r="3.5"
                fill={isActive ? accentHex : "#5A6476"}
              />
              <text
                x="-48"
                y="-4"
                className="fill-[#EDE9DF] font-sans text-[11px] font-semibold"
              >
                {node.label}
              </text>
              <text
                x="-48"
                y="11"
                className="fill-[#8A94A6] font-mono text-[8px]"
              >
                {node.domain}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active Node Telemetry Readout */}
      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] space-y-1.5">
        <div className="flex items-center justify-between font-mono text-[11px]">
          <span className={isViolet ? "text-[#A78BFA] font-medium" : "text-[#65D6E7] font-medium"}>
            {activeNode.code} · {activeNode.label}
          </span>
          <span className="text-[#EDE9DF]">{activeNode.metric}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-[#8A94A6] truncate">
            {activeNode.spec}
          </span>
          <a
            href="#projects"
            className="font-mono text-[11px] text-[#65D6E7] hover:text-[#8DE2EF] inline-flex items-center gap-0.5 shrink-0"
          >
            <span>Inspect</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
