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
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-transparent border-t border-[var(--border-subtle)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Closing Header & Direct Contact */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-6">
            <div className="font-mono text-xs text-[#65D6E7] mb-2">
              08 · Contact & Console
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#E8E4DA] mb-3">
              Let's connect.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#8C96A8] max-w-lg leading-relaxed">
              Open to research collaborations, cybersecurity internships, and network engineering roles.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-2.5">
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-4 py-2.5 rounded-lg bg-[#E8E4DA] hover:bg-[#F5F2EB] text-[#0B0D12] font-sans text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors touch-target"
            >
              <Mail className="w-4 h-4" />
              <span>Email me</span>
            </a>

            <button
              onClick={copyEmail}
              className="px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[#151922]/75 hover:border-[#65D6E7]/45 text-[#E8E4DA] font-sans text-xs sm:text-sm inline-flex items-center gap-2 transition-colors touch-target"
            >
              {copied ? <Check className="w-4 h-4 text-[#65D6E7]" /> : <Copy className="w-4 h-4 text-[#8C96A8]" />}
              <span>{copied ? "Copied email" : "Copy email"}</span>
            </button>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[#151922]/45 hover:border-[var(--border-strong)] text-[#B4BCC9] hover:text-[#E8E4DA] font-sans text-xs sm:text-sm inline-flex items-center gap-1 transition-colors touch-target"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[#151922]/45 hover:border-[var(--border-strong)] text-[#B4BCC9] hover:text-[#E8E4DA] font-sans text-xs sm:text-sm inline-flex items-center gap-1 transition-colors touch-target"
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
            <div className="font-mono text-[11px] text-[#8C96A8] border-b border-[var(--border-subtle)] pb-3 mb-3">
              Endpoint Routing Map
            </div>

            <svg
              viewBox="0 0 280 185"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Network endpoint diagram connecting yousuf.surf to Email, GitHub, LinkedIn, and CodencoIT"
            >
              <line x1="65" y1="92" x2="145" y2="30" stroke="rgba(101,214,231,0.45)" strokeWidth="1.2" />
              <line x1="65" y1="92" x2="145" y2="72" stroke="rgba(140,150,168,0.32)" strokeWidth="1" />
              <line x1="65" y1="92" x2="145" y2="114" stroke="rgba(140,150,168,0.32)" strokeWidth="1" />
              <line x1="65" y1="92" x2="145" y2="156" stroke="rgba(167,139,250,0.45)" strokeWidth="1.2" />

              <circle cx="42" cy="92" r="24" fill="#0B0D12" stroke="#65D6E7" strokeWidth="1.3" />
              <text x="42" y="90" textAnchor="middle" className="fill-[#E8E4DA] font-mono text-[8.5px] font-semibold">
                NODE
              </text>
              <text x="42" y="100" textAnchor="middle" className="fill-[#65D6E7] font-mono text-[7px]">
                yousuf
              </text>

              {[
                { y: 16, label: "Direct Mail", val: "itsmemehrab369", accent: "fill-[#65D6E7]" },
                { y: 58, label: "GitHub", val: "@assassinyousuf", accent: "fill-[#8C96A8]" },
                { y: 100, label: "LinkedIn", val: "mdyousufhossainmehrab", accent: "fill-[#8C96A8]" },
                { y: 142, label: "Internship", val: "CodencoIT", accent: "fill-[#A78BFA]" },
              ].map((ep) => (
                <g key={ep.label} transform={`translate(145, ${ep.y})`}>
                  <rect width="124" height="28" rx="6" fill="#080A0F" stroke="rgba(140,150,168,0.22)" />
                  <text x="10" y="12" className={`${ep.accent} font-mono text-[7.5px]`}>{ep.label}</text>
                  <text x="10" y="22" className="fill-[#E8E4DA] font-mono text-[8px]">{ep.val}</text>
                </g>
              ))}
            </svg>

            <div className="pt-3 border-t border-[var(--border-subtle)] font-mono text-[11px] text-[#8C96A8] flex justify-between">
              <span>Location</span>
              <span className="text-[#E8E4DA]">{personalInfo.location}</span>
            </div>
          </div>

          {/* Interactive Shell Console */}
          <div className="lg:col-span-8 surface-panel rounded-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-[#080A0F]/90 border-b border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs text-[#8C96A8]">
              <span>yousuf.surf — shell</span>
              <span className="text-[11px] text-[#5C6575]">interactive console</span>
            </div>

            <div
              ref={logContainerRef}
              className="p-4 sm:p-5 h-[210px] sm:h-[230px] overflow-y-auto font-mono text-xs leading-relaxed space-y-2 bg-[#080A0F]/85 flex-1"
            >
              {history.map((line, idx) => (
                <div key={idx}>
                  {line.type === "system" && (
                    <div className="text-[#65D6E7]">{line.text}</div>
                  )}
                  {line.type === "user" && (
                    <div className="text-[#E8E4DA] font-medium">{line.text}</div>
                  )}
                  {line.type === "output" && (
                    <div className="text-[#B4BCC9] whitespace-pre-wrap pl-3 border-l border-[var(--border-strong)] my-1">
                      {line.text}
                    </div>
                  )}
                  {line.type === "error" && (
                    <div className="text-rose-300 pl-3 border-l border-rose-400/35">
                      {line.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-3 sm:px-4 py-2 bg-[#0B0D12] border-t border-[var(--border-subtle)] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {shortcuts.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="px-2.5 py-1 rounded bg-[#151922]/85 hover:bg-[#65D6E7]/12 text-[#B4BCC9] hover:text-[#65D6E7] border border-[var(--border-subtle)] font-mono text-[11px] transition-colors whitespace-nowrap shrink-0"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <div className="p-3 bg-[#080A0F] border-t border-[var(--border-subtle)] flex items-center gap-2 sm:gap-3">
              <span className="text-[#65D6E7] font-mono text-xs pl-1 shrink-0">
                yousuf:~$
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command (e.g. help, papers)..."
                aria-label="Terminal Command Input"
                className="flex-1 bg-transparent text-[#E8E4DA] font-mono text-xs focus:outline-none placeholder:text-[#5C6575] min-w-0"
              />
              <button
                onClick={() => executeCommand(inputVal)}
                className="p-2 rounded-lg bg-[#151922] hover:bg-[#65D6E7] hover:text-[#0B0D12] text-[#E8E4DA] border border-[var(--border-subtle)] transition-colors shrink-0 touch-target flex items-center justify-center"
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
