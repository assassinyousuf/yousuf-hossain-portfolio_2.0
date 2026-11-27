import React from "react";
import { personalInfo } from "../data/portfolioData";
import { Download } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative overflow-hidden pt-16 pb-6 px-4 sm:px-6 md:px-8 bg-[#07090D] border-t border-[var(--border-subtle)]">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="surface-panel rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-3">
            <div className="inline-flex items-center gap-2.5 font-display font-semibold text-base text-[#EDE9DF]">
              <span className="h-2 w-2 rounded-full bg-[#65D6E7]" />
              <span>{personalInfo.name}</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#8A94A6] leading-relaxed max-w-sm">
              Support Engineer Intern at{" "}
              <a
                href={personalInfo.currentRole.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#BAC2CF] hover:text-[#65D6E7] transition-colors"
              >
                {personalInfo.currentRole.company}
              </a>{" "}
              · CSE Undergraduate &amp; Cybersecurity/Network Researcher at Dhaka International University.
            </p>
            <div className="pt-2 font-mono text-[11px] text-[#5A6476]">
              © {currentYear} {personalInfo.name} · All rights reserved.
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono text-[11px] text-[#5A6476] tracking-wider">NAVIGATION</div>
            <div className="flex flex-col gap-2 font-sans text-xs sm:text-sm text-[#8A94A6]">
              <a href="#identity" className="hover:text-[#EDE9DF] transition-colors">Identity</a>
              <a href="#skills" className="hover:text-[#EDE9DF] transition-colors">Capabilities</a>
              <a href="#projects" className="hover:text-[#EDE9DF] transition-colors">Projects</a>
              <a href="#research" className="hover:text-[#EDE9DF] transition-colors">Research</a>
              <a href="#achievements" className="hover:text-[#EDE9DF] transition-colors">Honors</a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <div className="font-mono text-[11px] text-[#5A6476] tracking-wider">CONNECT &amp; DOSSIER</div>
            <div className="flex flex-col gap-2 font-sans text-xs sm:text-sm text-[#8A94A6]">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-[#65D6E7] transition-colors">
                {personalInfo.email}
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-[#EDE9DF] transition-colors">
                GitHub (@{personalInfo.handle})
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#EDE9DF] transition-colors">
                LinkedIn
              </a>
              <a
                href={personalInfo.cvUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#EDE9DF] hover:text-[#65D6E7] font-medium transition-colors pt-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Curriculum Vitae (PDF)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Architectural Signature Wordmark */}
        <div
          aria-hidden="true"
          className="mt-8 select-none text-center font-display font-bold tracking-[-0.04em] text-[clamp(2.5rem,11vw,7.5rem)] leading-[0.82] text-[#EDE9DF]/[0.045] overflow-hidden"
        >
          YOUSUF.SURF
        </div>
      </div>
    </footer>
  );
}
