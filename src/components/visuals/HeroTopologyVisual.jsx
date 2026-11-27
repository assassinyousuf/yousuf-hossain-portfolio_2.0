import React, { useState } from "react";

const NODES = [
  {
    id: "visiolock",
    label: "VisioLock",
    domain: "Acoustic Stego",
    spec: "I2A3 · SAIC-ACT · RS(255,239) · FSK WAV",
    x: 92,
    y: 78,
    accent: "cyan",
  },
  {
    id: "safelink",
    label: "SafeLink+",
    domain: "Zero-Trust Sandbox",
    spec: "Hidden WebView · JS Probes · RiskEngine",
    x: 288,
    y: 78,
    accent: "violet",
  },
  {
    id: "mesh",
    label: "GetConnect",
    domain: "Offline Mesh",
    spec: "BLE Discovery · Wi-Fi Direct TCP:8080",
    x: 92,
    y: 238,
    accent: "cyan",
  },
  {
    id: "ids",
    label: "Edge IDS & HCE",
    domain: "Telemetry & NFC",
    spec: "1D-CNN+GRU · AES-256-CBC · 60s Nonce",
    x: 288,
    y: 238,
    accent: "violet",
  },
];

export default function HeroTopologyVisual() {
  const [activeId, setActiveId] = useState("visiolock");
  const activeNode = NODES.find((n) => n.id === activeId) || NODES[0];

  return (
    <div className="surface-panel rounded-2xl p-5 sm:p-6 w-full max-w-[400px] mx-auto lg:ml-auto">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4 font-mono text-[11px]">
        <span className="text-[#8C96A8]">Systems Architecture</span>
        <span className="text-[#65D6E7]">4 Core Tracks</span>
      </div>

      <svg
        viewBox="0 0 380 310"
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

        <circle cx="190" cy="158" r="118" fill="none" stroke="rgba(140, 150, 168, 0.1)" strokeDasharray="3 5" />
        <circle cx="190" cy="158" r="72" fill="none" stroke="rgba(101, 214, 231, 0.15)" />
        <circle cx="190" cy="158" r="56" fill="url(#hubGlow)" />

        {/* Cross-connect mesh edges */}
        <line x1="92" y1="78" x2="288" y2="78" stroke="rgba(140, 150, 168, 0.14)" strokeWidth="1" />
        <line x1="92" y1="238" x2="288" y2="238" stroke="rgba(140, 150, 168, 0.14)" strokeWidth="1" />
        <line x1="92" y1="78" x2="92" y2="238" stroke="rgba(140, 150, 168, 0.14)" strokeWidth="1" />
        <line x1="288" y1="78" x2="288" y2="238" stroke="rgba(140, 150, 168, 0.14)" strokeWidth="1" />

        {/* Hub-to-node links */}
        {NODES.map((node) => {
          const isActive = node.id === activeId;
          const activeStroke = node.accent === "violet" ? "#A78BFA" : "#65D6E7";
          return (
            <line
              key={`link-${node.id}`}
              x1="190"
              y1="158"
              x2={node.x}
              y2={node.y}
              stroke={isActive ? activeStroke : "rgba(140, 150, 168, 0.22)"}
              strokeWidth={isActive ? "1.7" : "1"}
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
            fill="#0B0D12"
            stroke="#65D6E7"
            strokeWidth="1.2"
          />
          <text
            x="0"
            y="-3"
            textAnchor="middle"
            className="fill-[#E8E4DA] font-mono text-[10px] font-semibold"
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
                x="-73"
                y="-26"
                width="146"
                height="52"
                rx="10"
                fill={isActive ? "#151922" : "rgba(11, 13, 18, 0.92)"}
                stroke={isActive ? accentHex : "rgba(140, 150, 168, 0.24)"}
                strokeWidth={isActive ? "1.5" : "1"}
              />
              <circle
                cx="-58"
                cy="0"
                r="3.8"
                fill={isActive ? accentHex : "#5C6575"}
              />
              <text
                x="-46"
                y="-4"
                className="fill-[#E8E4DA] font-sans text-[11px] font-semibold"
              >
                {node.label}
              </text>
              <text
                x="-46"
                y="11"
                className="fill-[#8C96A8] font-mono text-[8px]"
              >
                {node.domain}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active Route Spec Readout */}
      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex flex-col gap-1">
        <div className="flex items-center justify-between font-mono text-[11px]">
          <span className={activeNode.accent === "violet" ? "text-[#A78BFA] font-medium" : "text-[#65D6E7] font-medium"}>
            {activeNode.label}
          </span>
          <span className="text-[#8C96A8]">{activeNode.domain}</span>
        </div>
        <div className="font-mono text-[11px] text-[#B4BCC9] truncate">
          {activeNode.spec}
        </div>
      </div>
    </div>
  );
}
