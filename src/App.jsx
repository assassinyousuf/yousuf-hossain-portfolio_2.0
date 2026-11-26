import React from "react";
import SmoothScroll from "./components/SmoothScroll";
import CinematicNetworkScene from "./components/CinematicNetworkScene";
import NetworkMeshCanvas from "./components/NetworkMeshCanvas";
import NetworkHUD from "./components/NetworkHUD";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TechLogosTicker from "./components/TechLogosTicker";
import IdentityScene from "./components/IdentityScene";
import SkillsSection from "./components/SkillsSection";
import ProjectsMatrix from "./components/ProjectsMatrix";
import ResearchShowcase from "./components/ResearchShowcase";
import AchievementsSection from "./components/AchievementsSection";
import TimelineSection from "./components/TimelineSection";
import EducationSection from "./components/EducationSection";
import InteractiveTerminal from "./components/InteractiveTerminal";
import Footer from "./components/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#06080c] text-[#f1f5f9] selection:bg-sky-500/25 selection:text-sky-200 overflow-x-clip">
        
        {/* Cinematic 3D Scroll-Choreographed WebGL Network Scene */}
        <CinematicNetworkScene />

        {/* Dynamic 2D Mesh Network Interactive Canvas */}
        <NetworkMeshCanvas />

        {/* Real-Time Spatial Mission HUD */}
        <NetworkHUD />

        {/* Fixed Navigation Header */}
        <Header />

        {/* 7-Scene Storytelling Journey */}
        <main className="relative z-10 flex flex-col">
          
          {/* Scene 01 — 00:00 INITIAL CONTACT */}
          <Hero />

          {/* Accreditations & Research Partner Marquee */}
          <TechLogosTicker />

          {/* Scene 02 — 01 // IDENTITY: ENTER THE NETWORK */}
          <IdentityScene />

          {/* Scene 03 — 02 // SYSTEM CAPABILITIES */}
          <SkillsSection />

          {/* Scene 04 — 03 // ENGINEERING ARCHIVE (SPATIAL CASE STUDIES) */}
          <ProjectsMatrix />

          {/* Scene 05 — 04 // RESEARCH & PUBLICATIONS (DIGITAL ARCHIVE) */}
          <ResearchShowcase />

          {/* Scene 06 — 05 // SIGNALS OF PROGRESS (MILESTONES & CTF) */}
          <AchievementsSection />

          {/* Connected Growth Timeline */}
          <TimelineSection />

          {/* Academics & CCNA VLSM Subnet Sandbox */}
          <EducationSection />

          {/* Scene 07 — 06 // CONNECTION ESTABLISHED & INTERACTIVE CLI */}
          <InteractiveTerminal />

        </main>

        {/* Grounded Clean Footer */}
        <Footer />

      </div>
    </SmoothScroll>
  );
}
