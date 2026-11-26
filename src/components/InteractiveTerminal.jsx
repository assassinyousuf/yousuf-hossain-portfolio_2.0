import React, { useState, useRef, useEffect } from "react";
import { personalInfo } from "../data/portfolioData";
import { Terminal as TerminalIcon, Send, Mail, Check } from "lucide-react";

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "YOUSUF.SURF SECURE CLI [v3.1.0] — ACTIVE NODE INITIALIZED.",
    },
    {
      type: "system",
      text: "Type a command or tap quick command shortcuts below to inspect technical records.",
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

    const newHistory = [...history, { type: "user", text: `yousuf:~$ ${cmdStr}` }];

    switch (trimmed) {
      case "help":
        newHistory.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  • whoami     - Display researcher dossier and current affiliations
  • papers     - List 5 Taylor & Francis / Camera Ready publications
  • ctf        - Output cybersecurity competition victories
  • projects   - Display flagship technical case studies
  • contact    - Display verified communication endpoints
  • clear      - Flush terminal history`,
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          text: `IDENTITY: Md. Yousuf Hossain (Mehrab)
POSITION: CSE Student | Cybersecurity & Network Engineering | Researcher
CAMPUS:   Dhaka International University (7th Semester, Expected 2027)
AFFIL:    General Secretary @ DIU Computer Programming Club (DIU CPC)
MEMBER:   IEEE & IEEE Computer Society (CS Valid 2026)`,
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
  ★ 1ST PLACE CHAMPION - DIU Intra First CTF (2025)
  ★ GLOBAL RANK #72 - BCS ICT Fest CTF (2026)
  ★ GLOBAL RANK #158 - HiCyberCon CTF (2026)`,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: `FLAGSHIP CASE STUDIES:
  • VisioLock (Cross-Media Steganography & Hardware-Bound Crypto)
  • GetConnect (Offline Infrastructure-Free Emergency Mesh Relay)
  • SafeLink+ (Zero-Trust Mobile Sandboxing & Phishing Defense)
  • Secure NFC Ticketing (Host Card Emulation & Replay Prevention)`,
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: `VERIFIED ENDPOINTS:
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

  const shortcuts = ["whoami", "papers", "projects", "ctf", "contact", "help"];

  return (
    <section id="terminal" className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-transparent border-t border-purple-900/25">
      
      {/* Background Section Glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>08 // CONNECTION ESTABLISHED</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              INTERACTIVE CLI // <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300">
                DIRECT COMMUNICATION
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs self-start md:self-auto">
            <button
              onClick={copyEmail}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Mail className="w-4 h-4" />}
              <span>{copied ? "Email Copied!" : "Copy Email"}</span>
            </button>
          </div>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-3xl glass-panel border border-purple-500/30 shadow-[0_12px_45px_rgba(0,0,0,0.7)] overflow-hidden">
          
          {/* Mac/Linux Title Bar */}
          <div className="px-4 sm:px-5 py-3 bg-[#060815] border-b border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="ml-2 text-slate-300 font-bold hidden sm:inline">yousuf@mesh-terminal: ~</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>RESEARCH NODE // 200 OK</span>
            </div>
          </div>

          {/* Terminal Output Log Area */}
          <div className="p-3.5 sm:p-6 h-[260px] sm:h-[320px] overflow-y-auto font-mono text-xs leading-relaxed space-y-2 bg-[#020308]/90">
            {history.map((line, idx) => (
              <div key={idx}>
                {line.type === "system" && (
                  <div className="text-cyan-400/90 font-semibold">[SYS] {line.text}</div>
                )}
                {line.type === "user" && (
                  <div className="text-purple-300 font-bold">{line.text}</div>
                )}
                {line.type === "output" && (
                  <div className="text-slate-200 whitespace-pre-wrap pl-2 border-l border-purple-500/30 my-1">{line.text}</div>
                )}
                {line.type === "error" && (
                  <div className="text-rose-400 font-semibold pl-2 border-l border-rose-500/40">{line.text}</div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Command Pills for Mobile / Fast Interaction - Swipeable on mobile */}
          <div className="px-3 sm:px-4 py-2 bg-[#060814] border-t border-slate-800/80 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider hidden sm:inline shrink-0">
              Quick:
            </span>
            {shortcuts.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-purple-950/60 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/30 font-mono text-[11px] transition-colors whitespace-nowrap shrink-0"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Command Input Bar */}
          <div className="p-2.5 sm:p-4 bg-[#050713] border-t border-slate-800 flex items-center gap-2 sm:gap-3">
            <span className="text-purple-400 font-mono text-xs font-bold pl-1 sm:pl-2 shrink-0">
              <span className="sm:hidden">yousuf:~$</span>
              <span className="hidden sm:inline">guest@yousuf.surf:~$</span>
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command (e.g. 'help', 'whoami')..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600 min-w-0"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors shrink-0 touch-target flex items-center justify-center"
              title="Run Command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
