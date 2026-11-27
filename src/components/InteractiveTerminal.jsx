import React, { useState, useRef, useEffect } from "react";
import { personalInfo } from "../data/portfolioData";
import { Send, Mail, Check, Copy, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "yousuf.surf CLI — Type 'help' or select a command below.",
    },
  ]);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const terminalBoxRef = useRef(null);
  const logContainerRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // Scroll only inside the terminal log box (never hijack window scroll on load)
  useEffect(() => {
    if (!hasInteractedRef.current) return;
    const container = logContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [history]);

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

      if (terminalBoxRef.current) {
        gsap.fromTo(
          terminalBoxRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: terminalBoxRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;
    hasInteractedRef.current = true;

    const newHistory = [...history, { type: "user", text: `yousuf:~$ ${cmdStr}` }];

    switch (trimmed) {
      case "help":
        newHistory.push({
          type: "output",
          text: `Commands:
  whoami    Researcher dossier & affiliations
  papers    List 5 publications
  ctf       Competition honors
  projects  Featured case studies
  contact   Email, GitHub, LinkedIn
  clear     Clear output`,
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          text: `Md. Yousuf Hossain (Mehrab)
Support Engineer (Intern) @ CodencoIT (https://codencoit.com/)
CSE Undergraduate (7th Sem) · Dhaka International University
General Secretary, DIU Computer Programming Club
IEEE & IEEE Computer Society Student Member`,
        });
        break;

      case "papers":
        newHistory.push({
          type: "output",
          text: `[1] VisioLock (Taylor & Francis, Accepted)
[2] SafeLink+ (Taylor & Francis, Accepted)
[3] Smart City IoT IDS (Taylor & Francis, Accepted)
[4] Offline Emergency Mesh Networking (Camera-Ready Submitted)
[5] Secure NFC HCE Ticketing (Camera-Ready Submitted)`,
        });
        break;

      case "ctf":
        newHistory.push({
          type: "output",
          text: `1st Place Champion — DIU Intra First CTF (2025)
Global Rank #72 — BCS ICT Fest CTF (2026)
Global Rank #158 — HiCyberCon CTF (2026)`,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: `VisioLock · SafeLink+ · GetConnect Mesh · Smart City IDS · Secure NFC HCE`,
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: `Email:    ${personalInfo.email}
Phone:    ${personalInfo.phone}
GitHub:   ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          type: "error",
          text: `Command not found: '${trimmed}'. Type 'help' to list commands.`,
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
    <section
      ref={sectionRef}
      id="terminal"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Closing Header & Direct Contact */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-6">
            <div className="font-mono text-xs text-sky-400 mb-2">
              08 · Contact & Console
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-100 mb-3">
              Let's connect.
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed">
              Open to research collaborations, cybersecurity internships, and network engineering roles.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-2.5">
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-white text-slate-950 font-sans text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors touch-target"
            >
              <Mail className="w-4 h-4" />
              <span>Email me</span>
            </a>

            <button
              onClick={copyEmail}
              className="px-4 py-2.5 rounded-lg border border-white/[0.12] bg-white/[0.03] hover:border-sky-400/50 text-slate-200 font-sans text-xs sm:text-sm inline-flex items-center gap-2 transition-colors touch-target"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? "Copied email" : "Copy email"}</span>
            </button>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-lg border border-white/[0.12] hover:border-white/25 text-slate-300 hover:text-white font-sans text-xs sm:text-sm inline-flex items-center gap-1 transition-colors touch-target"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-lg border border-white/[0.12] hover:border-white/25 text-slate-300 hover:text-white font-sans text-xs sm:text-sm inline-flex items-center gap-1 transition-colors touch-target"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Visual Node Routing Schematic + Interactive Shell Split */}
        <div
          ref={terminalBoxRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Endpoint Routing Graphic */}
          <div className="lg:col-span-4 surface-panel rounded-2xl p-5 flex flex-col justify-between">
            <div className="font-mono text-[11px] text-slate-400 border-b border-white/[0.08] pb-3 mb-3">
              Endpoint Routing Map
            </div>

            <svg
              viewBox="0 0 280 185"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Network endpoint diagram connecting yousuf.surf to Email, GitHub, LinkedIn, and CodencoIT"
            >
              <line x1="65" y1="92" x2="145" y2="30" stroke="rgba(56,189,248,0.45)" strokeWidth="1.2" />
              <line x1="65" y1="92" x2="145" y2="72" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
              <line x1="65" y1="92" x2="145" y2="114" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
              <line x1="65" y1="92" x2="145" y2="156" stroke="rgba(56,189,248,0.45)" strokeWidth="1.2" />

              <circle cx="42" cy="92" r="24" fill="#06080c" stroke="#38bdf8" strokeWidth="1.3" />
              <text x="42" y="90" textAnchor="middle" className="fill-slate-100 font-mono text-[8.5px] font-semibold">
                NODE
              </text>
              <text x="42" y="100" textAnchor="middle" className="fill-sky-400 font-mono text-[7px]">
                yousuf
              </text>

              {[
                { y: 16, label: "Direct Mail", val: "itsmemehrab369" },
                { y: 58, label: "GitHub", val: "@assassinyousuf" },
                { y: 100, label: "LinkedIn", val: "mdyousufhossainmehrab" },
                { y: 142, label: "Internship", val: "CodencoIT" },
              ].map((ep) => (
                <g key={ep.label} transform={`translate(145, ${ep.y})`}>
                  <rect width="124" height="28" rx="6" fill="#04060a" stroke="rgba(148,163,184,0.22)" />
                  <text x="10" y="12" className="fill-sky-400 font-mono text-[7.5px]">{ep.label}</text>
                  <text x="10" y="22" className="fill-slate-200 font-mono text-[8px]">{ep.val}</text>
                </g>
              ))}
            </svg>

            <div className="pt-3 border-t border-white/[0.08] font-mono text-[11px] text-slate-400 flex justify-between">
              <span>Location</span>
              <span className="text-slate-200">{personalInfo.location}</span>
            </div>
          </div>

          {/* Interactive Shell Console */}
          <div className="lg:col-span-8 surface-panel rounded-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-[#04060a]/90 border-b border-white/[0.08] flex items-center justify-between font-mono text-xs text-slate-400">
              <span>yousuf.surf — shell</span>
              <span className="text-[11px] text-slate-500">interactive console</span>
            </div>

            <div
              ref={logContainerRef}
              className="p-4 sm:p-5 h-[210px] sm:h-[230px] overflow-y-auto font-mono text-xs leading-relaxed space-y-2 bg-[#04060a]/80 flex-1"
            >
              {history.map((line, idx) => (
                <div key={idx}>
                  {line.type === "system" && (
                    <div className="text-sky-400">{line.text}</div>
                  )}
                  {line.type === "user" && (
                    <div className="text-slate-100 font-medium">{line.text}</div>
                  )}
                  {line.type === "output" && (
                    <div className="text-slate-300 whitespace-pre-wrap pl-3 border-l border-white/[0.1] my-1">
                      {line.text}
                    </div>
                  )}
                  {line.type === "error" && (
                    <div className="text-rose-400 pl-3 border-l border-rose-500/30">
                      {line.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-3 sm:px-4 py-2 bg-[#06080c] border-t border-white/[0.08] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {shortcuts.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-sky-500/15 text-slate-300 hover:text-sky-300 border border-white/[0.06] font-mono text-[11px] transition-colors whitespace-nowrap shrink-0"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <div className="p-3 bg-[#04060a] border-t border-white/[0.08] flex items-center gap-2 sm:gap-3">
              <span className="text-sky-400 font-mono text-xs pl-1 shrink-0">
                yousuf:~$
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command (e.g. help, papers)..."
                aria-label="Terminal Command Input"
                className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder:text-slate-600 min-w-0"
              />
              <button
                onClick={() => executeCommand(inputVal)}
                className="p-2 rounded-lg bg-white/[0.08] hover:bg-sky-500 hover:text-slate-950 text-slate-200 transition-colors shrink-0 touch-target flex items-center justify-center"
                aria-label="Execute command"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
