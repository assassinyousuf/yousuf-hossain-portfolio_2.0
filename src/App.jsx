import React from "react";
import SmoothScroll from "./components/SmoothScroll";
import Cyber3DScene from "./components/Cyber3DScene";
import NetworkMeshCanvas from "./components/NetworkMeshCanvas";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TechLogosTicker from "./components/TechLogosTicker";
import ProjectsMatrix from "./components/ProjectsMatrix";
import ResearchShowcase from "./components/ResearchShowcase";
import SkillsSection from "./components/SkillsSection";
import AchievementsSection from "./components/AchievementsSection";
import TimelineSection from "./components/TimelineSection";
import EducationSection from "./components/EducationSection";
import InteractiveTerminal from "./components/InteractiveTerminal";
import Footer from "./components/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#030408] text-[#E4E6F0] selection:bg-purple-600/30 selection:text-purple-300 overflow-x-hidden">
        
        {/* Subtle Ambient 3D Cyber Core & Starfield */}
        <Cyber3DScene />

        {/* Dynamic 2D Mesh Network Interactive Canvas */}
        <NetworkMeshCanvas />

        {/* Fixed Navigation Header with Audio Equalizer & CV Download */}
        <Header />

        {/* Structured 8-Phase Information Narrative */}
        <main className="relative z-10 flex flex-col">
          
          {/* 01 — Hero & Positioning */}
          <Hero />

          {/* Accreditations & Research Partners Marquee */}
          <TechLogosTicker />

          {/* 02 — Featured Work & Flagship Technical Case Studies */}
          <ProjectsMatrix />

          {/* 03 — Peer-Reviewed Research & Publications */}
          <ResearchShowcase />

          {/* 04 — Categorized Technical Competencies */}
          <SkillsSection />

          {/* 05 — Competitive CTF Honors & Interactive Challenge */}
          <AchievementsSection />

          {/* 06 — Growth Timeline & Executive Leadership */}
          <TimelineSection />

          {/* 07 — Academics & Cisco CCNA Telemetry Sandbox */}
          <EducationSection />

          {/* 08 — Interactive CLI & Direct Communication */}
          <InteractiveTerminal />

        </main>

        {/* Grounded Clean Footer */}
        <Footer />

      </div>
    </SmoothScroll>
  );
}
