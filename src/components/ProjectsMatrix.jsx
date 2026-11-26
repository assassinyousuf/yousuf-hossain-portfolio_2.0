import React from "react";
import { projects } from "../data/portfolioData";
import { FolderGit2, ExternalLink, Sparkles, Terminal, Code2 } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function ProjectsMatrix() {
  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 bg-[#04050a] border-t border-purple-900/20">
      
      <div className="pointer-events-none absolute left-10 top-1/2 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 font-mono text-xs tracking-widest mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>ENGINEERING REPOSITORIES & DEPLOYMENTS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              SELECTED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">
                SOFTWARE & SYSTEMS
              </span>
            </h2>
          </div>
          <a
            href="https://github.com/assassinyousuf"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-purple-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>github.com/assassinyousuf</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-500/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between font-mono text-xs text-purple-400 mb-3">
                  <span className="font-bold tracking-wider">PROJECT // 0{idx + 1}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-purple-950/50 text-purple-300 border border-purple-500/30">
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="font-mono text-xs text-cyan-400/90 mt-1 mb-4">
                  {project.category}
                </p>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Pills & Link */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/40 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-white bg-slate-900 hover:bg-purple-900/60 border border-slate-800 hover:border-purple-500/40 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>Code</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
