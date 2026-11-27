import React from "react";
import { personalInfo } from "../data/portfolioData";
import { Download } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative py-12 px-4 sm:px-6 md:px-8 bg-[#080A0F]/95 border-t border-[var(--border-subtle)]">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[var(--border-subtle)]">

          <div className="space-y-1.5 max-w-md">
            <div className="font-display font-semibold text-base text-[#E8E4DA]">
              {personalInfo.name}
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#8C96A8] leading-relaxed">
              Support Engineer Intern at{" "}
              <a
                href={personalInfo.currentRole.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#B4BCC9] hover:text-[#65D6E7] transition-colors"
              >
                {personalInfo.currentRole.company}
              </a>{" "}
              · CSE Undergraduate & Researcher at Dhaka International University.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-sans text-xs sm:text-sm text-[#8C96A8]">
            <a href="#identity" className="hover:text-[#E8E4DA] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#E8E4DA] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#E8E4DA] transition-colors">Projects</a>
            <a href="#research" className="hover:text-[#E8E4DA] transition-colors">Research</a>
            <a href="#timeline" className="hover:text-[#E8E4DA] transition-colors">Timeline</a>
            <a
              href={personalInfo.cvUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#B4BCC9] hover:text-[#65D6E7] font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV (PDF)</span>
            </a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#5C6575]">
          <div>
            © {currentYear} {personalInfo.name}
          </div>

          <div className="flex items-center gap-5 text-[#8C96A8]">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-[#E8E4DA] transition-colors">
              GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#E8E4DA] transition-colors">
              LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-[#E8E4DA] transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
