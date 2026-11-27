import React from "react";
import { personalInfo } from "../data/portfolioData";
import { Download } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative py-12 px-4 sm:px-6 md:px-8 bg-[#05070b]/90 border-t border-white/[0.08]">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/[0.08]">
          
          <div className="space-y-1.5 max-w-md">
            <div className="font-display font-semibold text-base text-slate-100">
              {personalInfo.name}
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              Support Engineer Intern at{" "}
              <a
                href={personalInfo.currentRole.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-200 hover:text-sky-400 transition-colors"
              >
                {personalInfo.currentRole.company}
              </a>{" "}
              · CSE Undergraduate & Researcher at Dhaka International University.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-sans text-xs sm:text-sm text-slate-400">
            <a href="#identity" className="hover:text-slate-100 transition-colors">About</a>
            <a href="#skills" className="hover:text-slate-100 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-slate-100 transition-colors">Projects</a>
            <a href="#research" className="hover:text-slate-100 transition-colors">Research</a>
            <a href="#timeline" className="hover:text-slate-100 transition-colors">Timeline</a>
            <a
              href={personalInfo.cvUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-sky-400 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV (PDF)</span>
            </a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © {currentYear} {personalInfo.name}
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-slate-100 transition-colors">
              GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-100 transition-colors">
              LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-slate-100 transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
