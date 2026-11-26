import React, { useState, useRef, useEffect } from "react";
import { personalInfo } from "../data/portfolioData";
import { Terminal as TerminalIcon, Send, Copy, Check, CornerDownLeft, Sparkles } from "lucide-react";

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "AETHERMIND CORE INTERFACE [v2.6.4] — SECURE TERMINAL INITIALIZED.",
    },
    {
      type: "system",
      text: "Type 'help' to inspect available system operations or click quick command pills below.",
    },
  ]);

  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { type: "user", text: `yousuf@mesh:~$ ${cmdStr}` }];

    switch (trimmed) {
      case "help":
        newHistory.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  • whoami     - Display researcher dossier and current affiliations
  • papers     - List 5 Taylor & Francis / Camera Ready publications
  • ctf        - Output cybersecurity competition victories
  • ccna       - Display Cisco CCNA 200-301 progress status
  • skills     - Print core networking & systems capabilities
  • contact    - Display verified communication endpoints
  • clear      - Flush terminal history`,
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          text: `IDENTITY: Md. Yousuf Hossain (Mehrab)
ROLE:     Cybersecurity & Network Systems Researcher
AFFIL:    General Secretary @ DIU Computer Programming Club (DIU CPC)
MEMBER:   IEEE & IEEE Computer Society (Valid through 2026)
CAMPUS:   Dhaka International University (CSE, 7th Semester)`,
        });
        break;

      case "papers":
        newHistory.push({
          type: "output",
          text: `ACCEPTED RESEARCH WORKS:
  [1] VisioLock: Audio-Domain Steganography & Crypto (Taylor & Francis)
  [2] SafeLink+: Zero-Trust Mobile Link Execution (Taylor & Francis)
  [3] Smart City IoT Lightweight Deep Learning IDS (Taylor & Francis)
  [4] Multimodal Offline Emergency Mesh Networking (Camera Ready)
  [5] Secure NFC Host Card Emulation Ticketing System (Camera Ready)`,
        });
        break;

      case "ctf":
        newHistory.push({
          type: "output",
          text: `CYBERSECURITY ACHIEVEMENTS:
  ★ CHAMPION - DIU Intra First CTF (2025)
  ★ GLOBAL RANK #72 - BCS ICT Fest CTF (2026)
  ★ GLOBAL RANK #158 - HiCyberCon CTF (2026)`,
        });
        break;

      case "ccna":
        newHistory.push({
          type: "output",
          text: `CERTIFICATION TRACK:
  Target: Cisco CCNA (200-301)
  Focus: IPv4/IPv6 VLSM Subnetting, OSPF/EIGRP Routing, VLANs, Wireshark Packet Telemetry.
  Status: Active Preparation via Jeremy's IT Lab.`,
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          text: `LANGUAGES: Python, Java, C, SQL, Dart, JavaScript
NETWORKING: Cisco CCNA, OSI, TCP/IP, Router/Switch, Packet Tracer, Wireshark
SYSTEMS:    Kali Linux, Ubuntu, VirtualBox, Windows 11`,
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: `ENDPOINTS:
  Email:    ${personalInfo.email}
  Phone:    ${personalInfo.phone}
  GitHub:   ${personalInfo.github}
  LinkedIn: ${personalInfo.linkedin}
  Website:  ${personalInfo.website}`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          type: "error",
          text: `Command not recognized: '${trimmed}'. Type 'help' to view available system routines.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="relative py-28 px-4 sm:px-8 bg-[#030408] border-t border-purple-900/20">
      
      <div className="pointer-events-none absolute right-1/4 top-1/3 w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-mono text-xs tracking-widest mb-3">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE SHELL INTERACTION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DIRECT SYSTEM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
              CONSOLE & CONTACT
            </span>
          </h2>
        </div>

        {/* Terminal Window */}
        <div className="rounded-3xl glass-panel border border-cyan-500/30 shadow-[0_12px_48px_rgba(0,0,0,0.7)] overflow-hidden font-mono text-xs sm:text-sm">
          
          {/* Top Titlebar */}
          <div className="px-5 py-3.5 bg-black/70 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs text-slate-400 font-mono">yousuf@aether-mesh:~</span>
            </div>
            <div className="text-[11px] text-purple-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TLS ENCRYPTED</span>
            </div>
          </div>

          {/* Quick Command Pills */}
          <div className="px-5 py-2.5 bg-black/40 border-b border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 text-[11px]">Quick exec:</span>
            {["whoami", "papers", "ctf", "ccna", "skills", "contact", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-purple-900/40 text-purple-300 hover:text-white border border-slate-800 hover:border-purple-500/50 transition-colors"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Output Display Buffer */}
          <div className="p-6 max-h-[380px] overflow-y-auto space-y-3 bg-[#03050c]/90">
            {history.map((line, idx) => (
              <div key={idx} className="leading-relaxed">
                {line.type === "user" && (
                  <span className="text-cyan-300 font-bold">{line.text}</span>
                )}
                {line.type === "system" && (
                  <span className="text-purple-400/90">{line.text}</span>
                )}
                {line.type === "output" && (
                  <pre className="text-slate-200 whitespace-pre-wrap font-mono mt-1 text-xs">
                    {line.text}
                  </pre>
                )}
                {line.type === "error" && (
                  <span className="text-rose-400 font-semibold">{line.text}</span>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Prompt Input Line */}
          <div className="p-4 bg-black/60 border-t border-slate-800 flex items-center gap-2">
            <span className="text-cyan-400 font-bold">yousuf@mesh:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help' or command..."
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-slate-600 focus:ring-0"
              autoFocus
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs flex items-center gap-1 transition-colors"
            >
              <span>RUN</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Quick Direct Email Connect Card */}
        <div className="mt-8 p-6 rounded-2xl glass-panel border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-white font-display">
              Ready for Networking & Cybersecurity Collaboration?
            </div>
            <div className="text-xs font-mono text-slate-400 mt-0.5">
              Open to IT Networking Internships, Research Projects & Collaborative CTF Challenges.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={copyEmail}
              className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:border-purple-500/40 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
              <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
            </button>
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-xs font-mono font-bold text-white flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SEND DISPATCH</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
