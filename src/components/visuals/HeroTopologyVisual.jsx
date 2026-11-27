import React, { useState } from "react";

const NODES = [
  {
    id: "visiolock",
    label: "VisioLock",
    domain: "Acoustic Steganography",
    spec: "I2A3 · SAIC-ACT · RS(255,239) · FSK WAV",
    x: 90,
    y: 78,
  },
  {
    id: "safelink",
    label: "SafeLink+",
    domain: "Zero-Trust Sandbox",
    spec: "Hidden WebView · JS Probes · RiskEngine",
    x: 290,
    y: 78,
  },
  {
    id: "mesh",
    label: "GetConnect",
    domain: "Offline Hybrid Mesh",
    spec: "BLE Discovery · Wi-Fi Direct TCP:8080",
    x: 90,
    y: 238,
  },
  {
    id: "ids",
    label: "Edge IDS & HCE",
    domain: "Telemetry & NFC",
    spec: "1D-CNN+GRU · AES-256-CBC · 60s Nonce",
    x: 290,
    y: 238,
  },
];

export default function HeroTopologyVisual() {
  const [activeId, setActiveId] = useState("visiolock");
  const activeNode = NODES.find((n) => n.id === activeId) || NODES[0];

  return (
    <div className="surface-panel rounded-2xl p-5 sm:p-6 w-full max-w-[400px] mx-auto lg:ml-auto">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4 font-mono text-[11px]">
        <span className="text-slate-400">Systems Architecture</span>
        <span className="text-sky-400">4 Core Tracks</span>
      </div>

      <svg
        viewBox="0 0 380 310"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Interactive network and security system architecture diagram"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.28)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </radialGradient>
        </defs>

        {/* Subtle architectural grid rings */}
        <circle cx="190" cy="158" r="118" fill="none" stroke="rgba(148,163,184,0.08)" strokeDasharray="3 5" />
        <circle cx="190" cy="158" r="72" fill="none" stroke="rgba(56,189,248,0.14)" />
        <circle cx="190" cy="158" r="56" fill="url(#hubGlow)" />

        {/* Cross-connect mesh edges */}
        <line x1="90" y1="78" x2="290" y2="78" stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
        <line x1="90" y1="238" x2="290" y2="238" stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
        <line x1="90" y1="78" x2="90" y2="238" stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
        <line x1="290" y1="78" x2="290" y2="238" stroke="rgba(148,163,184,0.12)" strokeWidth="1" />

        {/* Hub-to-node links */}
        {NODES.map((node) => {
          const isActive = node.id === activeId;
          return (
            <line
              key={`link-${node.id}`}
              x1="190"
              y1="158"
              x2={node.x}
              y2={node.y}
              stroke={isActive ? "#38bdf8" : "rgba(148,163,184,0.22)"}
              strokeWidth={isActive ? "1.8" : "1"}
              strokeDasharray={isActive ? "none" : "3 3"}
            />
          );
        })}

        {/* Central Core Node */}
        <g transform="translate(190,158)">
          <rect
            x="-34"
            y="-22"
            width="68"
            height="44"
            rx="10"
            fill="#0b111c"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />
          <text
            x="0"
            y="-3"
            textAnchor="middle"
            className="fill-slate-100 font-mono text-[10px] font-semibold"
          >
            CORE
          </text>
          <text
            x="0"
            y="10"
            textAnchor="middle"
            className="fill-sky-400 font-mono text-[8px]"
          >
            yousuf.surf
          </text>
        </g>

        {/* Interactive Satellite Nodes */}
        {NODES.map((node) => {
          const isActive = node.id === activeId;
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
                x="-73"
                y="-26"
                width="146"
                height="52"
                rx="10"
                fill={isActive ? "rgba(14, 30, 48, 0.95)" : "rgba(10, 14, 22, 0.9)"}
                stroke={isActive ? "#38bdf8" : "rgba(148,163,184,0.22)"}
                strokeWidth={isActive ? "1.5" : "1"}
              />
              <circle
                cx="-58"
                cy="0"
                r="4"
                fill={isActive ? "#38bdf8" : "#475569"}
              />
              <text
                x="-46"
                y="-4"
                className="fill-slate-100 font-sans text-[11px] font-semibold"
              >
                {node.label}
              </text>
              <text
                x="-46"
                y="11"
                className="fill-slate-400 font-mono text-[8px]"
              >
                {node.domain}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active Route Spec Readout */}
      <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-1">
        <div className="flex items-center justify-between font-mono text-[11px]">
          <span className="text-sky-400 font-medium">{activeNode.label}</span>
          <span className="text-slate-500">{activeNode.domain}</span>
        </div>
        <div className="font-mono text-[11px] text-slate-300 truncate">
          {activeNode.spec}
        </div>
      </div>
    </div>
  );
}
