import React from "react";

export function VisioLockDiagram() {
  return (
    <svg viewBox="0 0 460 250" className="w-full h-auto select-none" role="img" aria-label="VisioLock Sender to Receiver acoustic steganography architecture diagram">
      {/* Sender Layer */}
      <rect x="12" y="12" width="436" height="86" rx="10" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.28)" />
      <text x="24" y="30" className="fill-sky-400 font-mono text-[9.5px] font-semibold">SENDER PIPELINE</text>

      {[
        { x: 24, label: "Image", sub: "Input" },
        { x: 102, label: "I2A3", sub: "Framing" },
        { x: 180, label: "SAIC-ACT", sub: "Key Encrypt" },
        { x: 266, label: "RS(255,239)", sub: "3x FEC" },
        { x: 356, label: "FSK WAV", sub: "Modulate" },
      ].map((b, i) => (
        <g key={b.label}>
          <rect x={b.x} y="42" width="70" height="42" rx="6" fill="#06080c" stroke="rgba(148,163,184,0.28)" />
          <text x={b.x + 35} y="60" textAnchor="middle" className="fill-slate-100 font-mono text-[9px] font-semibold">{b.label}</text>
          <text x={b.x + 35} y="73" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">{b.sub}</text>
          {i < 4 && <path d={`M ${b.x + 71} 63 L ${b.x + 77} 63`} stroke="#38bdf8" strokeWidth="1.5" />}
        </g>
      ))}

      {/* Acoustic Carrier Waveform */}
      <path
        d="M 391 98 L 391 124 L 59 124 L 59 148"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />
      <rect x="155" y="112" width="150" height="22" rx="11" fill="#06080c" stroke="rgba(56,189,248,0.4)" />
      <text x="230" y="126" textAnchor="middle" className="fill-sky-300 font-mono text-[9px]">Acoustic WAV Channel (FSK)</text>

      {/* Receiver Layer */}
      <rect x="12" y="148" width="436" height="86" rx="10" fill="rgba(15,23,42,0.55)" stroke="rgba(148,163,184,0.2)" />
      <text x="24" y="166" className="fill-slate-300 font-mono text-[9.5px] font-semibold">RECEIVER PIPELINE</text>

      {[
        { x: 24, label: "Goertzel", sub: "Demodulate" },
        { x: 112, label: "NRSTS", sub: "FEC Decode" },
        { x: 200, label: "SAIC-ACT", sub: "Decrypt" },
        { x: 288, label: "SHA-256", sub: "Integrity" },
        { x: 374, label: "Image", sub: "Recovered" },
      ].map((b, i) => (
        <g key={b.label}>
          <rect x={b.x} y="178" width="74" height="42" rx="6" fill="#06080c" stroke="rgba(148,163,184,0.28)" />
          <text x={b.x + 37} y="196" textAnchor="middle" className="fill-slate-100 font-mono text-[9px] font-semibold">{b.label}</text>
          <text x={b.x + 37} y="209" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">{b.sub}</text>
          {i < 4 && <path d={`M ${b.x + 75} 199 L ${b.x + 87} 199`} stroke="#94a3b8" strokeWidth="1.5" />}
        </g>
      ))}
    </svg>
  );
}

export function SafeLinkDiagram() {
  return (
    <svg viewBox="0 0 460 250" className="w-full h-auto select-none" role="img" aria-label="SafeLink+ zero-trust isolated WebView inspection pipeline diagram">
      {/* Intercept */}
      <rect x="16" y="20" width="120" height="48" rx="8" fill="#06080c" stroke="rgba(148,163,184,0.3)" />
      <text x="76" y="40" textAnchor="middle" className="fill-slate-100 font-mono text-[9.5px] font-semibold">1. Link Intercept</text>
      <text x="76" y="54" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">UrlInputService</text>

      <line x1="136" y1="44" x2="168" y2="44" stroke="#38bdf8" strokeWidth="1.5" />

      {/* Ephemeral Sandbox Container */}
      <rect x="168" y="12" width="276" height="148" rx="10" fill="rgba(56,189,248,0.06)" stroke="rgba(56,189,248,0.4)" strokeDasharray="4 3" />
      <text x="182" y="30" className="fill-sky-400 font-mono text-[9.5px] font-semibold">ISOLATED EPHEMERAL SANDBOX</text>

      <rect x="182" y="42" width="116" height="44" rx="6" fill="#06080c" stroke="rgba(148,163,184,0.28)" />
      <text x="240" y="61" textAnchor="middle" className="fill-slate-100 font-mono text-[9px]">Hidden WebView</text>
      <text x="240" y="74" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">NavigationDelegate</text>

      <line x1="298" y1="64" x2="316" y2="64" stroke="#38bdf8" strokeWidth="1.4" />

      <rect x="316" y="42" width="114" height="44" rx="6" fill="#06080c" stroke="rgba(148,163,184,0.28)" />
      <text x="373" y="61" textAnchor="middle" className="fill-slate-100 font-mono text-[9px]">JS DOM Probes</text>
      <text x="373" y="74" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">Redirects & Forms</text>

      <line x1="373" y1="86" x2="373" y2="104" stroke="#38bdf8" strokeWidth="1.4" />

      <rect x="182" y="104" width="248" height="42" rx="6" fill="#0b111c" stroke="rgba(56,189,248,0.35)" />
      <text x="306" y="122" textAnchor="middle" className="fill-sky-300 font-mono text-[9.5px] font-semibold">RiskEngine Scoring + Explainability</text>
      <text x="306" y="135" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">Evaluates URI patterns, redirects & credential fields</text>

      {/* Bottom Gate & Ephemeral Cleanup */}
      <line x1="306" y1="160" x2="306" y2="184" stroke="#94a3b8" strokeWidth="1.5" />

      <rect x="16" y="184" width="206" height="48" rx="8" fill="#06080c" stroke="rgba(52,211,153,0.35)" />
      <text x="119" y="204" textAnchor="middle" className="fill-emerald-300 font-mono text-[9.5px] font-semibold">ResultScreen Gate</text>
      <text x="119" y="218" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">Open in Browser / Cancel</text>

      <rect x="238" y="184" width="206" height="48" rx="8" fill="#06080c" stroke="rgba(148,163,184,0.28)" />
      <text x="341" y="204" textAnchor="middle" className="fill-slate-100 font-mono text-[9.5px] font-semibold">EphemeralSessionService</text>
      <text x="341" y="218" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">Clears cache & cookies automatically</text>
    </svg>
  );
}

export function MeshTopologyDiagram() {
  return (
    <svg viewBox="0 0 460 250" className="w-full h-auto select-none" role="img" aria-label="GetConnect multi-hop BLE discovery and Wi-Fi Direct TCP:8080 mesh topology diagram">
      {/* Infrastructure Offline Banner */}
      <rect x="14" y="12" width="432" height="26" rx="6" fill="rgba(15,23,42,0.5)" stroke="rgba(148,163,184,0.18)" />
      <text x="230" y="28" textAnchor="middle" className="fill-slate-400 font-mono text-[9px]">
        0% CELLULAR / INTERNET · MULTI-HOP STORE-AND-FORWARD MESH
      </text>

      {/* Mesh links */}
      <line x1="74" y1="110" x2="178" y2="82" stroke="#38bdf8" strokeWidth="1.6" />
      <line x1="74" y1="110" x2="178" y2="178" stroke="rgba(148,163,184,0.3)" strokeDasharray="3 3" />
      <line x1="178" y1="82" x2="294" y2="128" stroke="#38bdf8" strokeWidth="1.6" />
      <line x1="178" y1="178" x2="294" y2="128" stroke="rgba(56,189,248,0.45)" strokeWidth="1.2" />
      <line x1="294" y1="128" x2="394" y2="128" stroke="#38bdf8" strokeWidth="1.8" />

      {/* BLE range pulse */}
      <circle cx="74" cy="110" r="42" fill="none" stroke="rgba(56,189,248,0.22)" strokeDasharray="3 3" />

      {/* Nodes */}
      {[
        { x: 74, y: 110, label: "Sender", sub: "BLE Advert", active: true },
        { x: 178, y: 82, label: "Relay 1", sub: "TCP:8080", active: true },
        { x: 178, y: 178, label: "Peer 2", sub: "BLE Cache", active: false },
        { x: 294, y: 128, label: "Relay 3", sub: "AES-256-GCM", active: true },
        { x: 394, y: 128, label: "Target", sub: "ACK Delivered", active: true },
      ].map((n) => (
        <g key={n.label} transform={`translate(${n.x}, ${n.y})`}>
          <circle
            r="24"
            fill="#06080c"
            stroke={n.active ? "#38bdf8" : "rgba(148,163,184,0.3)"}
            strokeWidth={n.active ? "1.5" : "1"}
          />
          <text y="-2" textAnchor="middle" className="fill-slate-100 font-mono text-[9px] font-semibold">
            {n.label}
          </text>
          <text y="10" textAnchor="middle" className="fill-sky-400 font-mono text-[7.5px]">
            {n.sub}
          </text>
        </g>
      ))}

      {/* Verified Metrics Footer */}
      <rect x="14" y="212" width="432" height="28" rx="6" fill="#06080c" stroke="rgba(56,189,248,0.25)" />
      <text x="230" y="229" textAnchor="middle" className="fill-slate-200 font-mono text-[9px]">
        25 Devices: 93.2% Text · 90.7% Voice · 250-Node Emulation: 92.6% PDR
      </text>
    </svg>
  );
}

export function SmartCityIdsDiagram() {
  return (
    <svg viewBox="0 0 460 250" className="w-full h-auto select-none" role="img" aria-label="Smart City Lightweight CNN-GRU Intrusion Detection architecture diagram">
      <text x="16" y="24" className="fill-sky-400 font-mono text-[9.5px] font-semibold">CNN-GRU EDGE DETECTION PIPELINE</text>

      {[
        { y: 36, label: "IoT Traffic Features", sub: "Normalized Packet Stream" },
        { y: 74, label: "1D-Convolution + Max Pooling", sub: "Spatial Feature Compression" },
        { y: 112, label: "Gated Recurrent Unit (GRU)", sub: "Temporal Attack Sequences" },
        { y: 150, label: "Dense + Softmax Classifier", sub: "Normal vs. Attack Verdict" },
      ].map((layer, idx) => (
        <g key={layer.label}>
          <rect x="16" y={layer.y} width="248" height="30" rx="6" fill="#06080c" stroke={idx === 2 ? "#38bdf8" : "rgba(148,163,184,0.28)"} />
          <text x="28" y={layer.y + 13} className="fill-slate-100 font-mono text-[9px] font-semibold">{layer.label}</text>
          <text x="28" y={layer.y + 24} className="fill-slate-400 font-mono text-[7.5px]">{layer.sub}</text>
          {idx < 3 && <line x1="140" y1={layer.y + 30} x2="140" y2={layer.y + 38} stroke="#38bdf8" strokeWidth="1.2" />}
        </g>
      ))}

      {/* Benchmark Side Panel from Paper Figure */}
      <rect x="280" y="36" width="166" height="144" rx="8" fill="rgba(15,23,42,0.55)" stroke="rgba(148,163,184,0.22)" />
      <text x="292" y="54" className="fill-slate-200 font-mono text-[9px] font-semibold">PAPER BENCHMARK</text>
      {[
        { name: "SVM", acc: "94.1%", w: 94, color: "#475569" },
        { name: "RF", acc: "95.2%", w: 102, color: "#64748b" },
        { name: "CNN-LSTM", acc: "98.4%", w: 118, color: "#94a3b8" },
        { name: "CNN-GRU", acc: "~98.9%", w: 126, color: "#38bdf8" },
      ].map((m, i) => (
        <g key={m.name} transform={`translate(292, ${72 + i * 26})`}>
          <text y="0" className="fill-slate-300 font-mono text-[8.5px]">{m.name}</text>
          <text x="142" y="0" textAnchor="end" className="fill-slate-200 font-mono text-[8.5px]">{m.acc}</text>
          <rect y="5" width="142" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
          <rect y="5" width={m.w} height="6" rx="3" fill={m.color} />
        </g>
      ))}

      <rect x="16" y="198" width="430" height="36" rx="6" fill="#06080c" stroke="rgba(56,189,248,0.25)" />
      <text x="231" y="219" textAnchor="middle" className="fill-sky-300 font-mono text-[9.5px]">
        Proposed CNN-GRU: Highest Accuracy (~98.9%) with Lowest Inference Latency (~6.5ms)
      </text>
    </svg>
  );
}

export function NfcHceDiagram() {
  return (
    <svg viewBox="0 0 460 250" className="w-full h-auto select-none" role="img" aria-label="Secure NFC Host Card Emulation anti-replay architecture diagram">
      {/* Smartphone HCE Stack */}
      <rect x="16" y="16" width="176" height="176" rx="12" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.35)" />
      <text x="104" y="36" textAnchor="middle" className="fill-sky-400 font-mono text-[9.5px] font-semibold">ANDROID HCE DEVICE</text>

      {[
        { y: 48, t: "Presentation (Riverpod UI)" },
        { y: 82, t: "NFCService (NDEF / APDU)" },
        { y: 116, t: "AES-256-CBC + 128-bit IV" },
        { y: 150, t: "HMAC-SHA256 + Keystore" },
      ].map((layer) => (
        <g key={layer.t}>
          <rect x="28" y={layer.y} width="152" height="26" rx="5" fill="#06080c" stroke="rgba(148,163,184,0.26)" />
          <text x="104" y={layer.y + 16} textAnchor="middle" className="fill-slate-100 font-mono text-[8.5px]">{layer.t}</text>
        </g>
      ))}

      {/* Contactless 13.56MHz Field */}
      <path d="M 196 104 L 266 104" stroke="#38bdf8" strokeWidth="1.6" strokeDasharray="4 3" />
      <circle cx="231" cy="104" r="18" fill="none" stroke="rgba(56,189,248,0.4)" />
      <text x="231" y="76" textAnchor="middle" className="fill-sky-300 font-mono text-[8.5px]">13.56 MHz</text>
      <text x="231" y="138" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">60s Window</text>

      {/* Reader Gate Verification */}
      <rect x="270" y="36" width="174" height="136" rx="12" fill="rgba(15,23,42,0.55)" stroke="rgba(148,163,184,0.28)" />
      <text x="357" y="56" textAnchor="middle" className="fill-slate-200 font-mono text-[9.5px] font-semibold">VERIFICATION GATE</text>

      <rect x="284" y="70" width="146" height="36" rx="6" fill="#06080c" stroke="rgba(56,189,248,0.3)" />
      <text x="357" y="86" textAnchor="middle" className="fill-slate-100 font-mono text-[8.5px]">Timestamp Freshness Check</text>
      <text x="357" y="98" textAnchor="middle" className="fill-sky-400 font-mono text-[8px]">|t_current - t_gen| ≤ 60s</text>

      <rect x="284" y="118" width="146" height="36" rx="6" fill="#06080c" stroke="rgba(52,211,153,0.35)" />
      <text x="357" y="134" textAnchor="middle" className="fill-emerald-300 font-mono text-[8.5px]">Single-Use Ticket State</text>
      <text x="357" y="146" textAnchor="middle" className="fill-slate-400 font-mono text-[8px]">100% Replay Detection</text>

      {/* Evaluation Bar */}
      <rect x="16" y="206" width="428" height="30" rx="6" fill="#06080c" stroke="rgba(56,189,248,0.25)" />
      <text x="230" y="224" textAnchor="middle" className="fill-slate-200 font-mono text-[9px]">
        38 Android Devices (API 21–34) · 97.8% Write Success · 6.6ms Crypto Overhead
      </text>
    </svg>
  );
}

export function ProjectDiagramRenderer({ diagramKey }) {
  switch (diagramKey) {
    case "visiolock":
      return <VisioLockDiagram />;
    case "safelink":
      return <SafeLinkDiagram />;
    case "mesh":
      return <MeshTopologyDiagram />;
    case "smartcity":
      return <SmartCityIdsDiagram />;
    case "nfc":
      return <NfcHceDiagram />;
    default:
      return null;
  }
}
