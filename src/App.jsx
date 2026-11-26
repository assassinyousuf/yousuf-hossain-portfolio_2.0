import React from "react";
import SmoothScroll from "./components/SmoothScroll";
import Section3DWrapper from "./components/Section3DWrapper";
import Cyber3DScene from "./components/Cyber3DScene";
import NetworkMeshCanvas from "./components/NetworkMeshCanvas";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TechLogosTicker from "./components/TechLogosTicker";
import Interactive3DShowcase from "./components/Interactive3DShowcase";
import ResearchShowcase from "./components/ResearchShowcase";
import SecurityBento from "./components/SecurityBento";
import ProjectsMatrix from "./components/ProjectsMatrix";
import SkillsSection from "./components/SkillsSection";
import InteractiveTerminal from "./components/InteractiveTerminal";
import Footer from "./components/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#030408] text-[#E4E6F0] selection:bg-purple-600/30 selection:text-purple-300 overflow-x-hidden">
        
        {/* Continuous 3D WebGL Scene & Infinite Runway */}
        <Cyber3DScene />

        {/* Dynamic 2D Mesh Network Canvas */}
        <NetworkMeshCanvas />

        {/* Top Header with Equalizer & F1 Audio */}
        <Header />

        {/* Continuous 3D Sliding Content Runway */}
        <main className="relative z-10 flex flex-col gap-10 sm:gap-14">
          <Section3DWrapper direction="center">
            <Hero />
          </Section3DWrapper>

          <Section3DWrapper direction="left">
            <TechLogosTicker />
          </Section3DWrapper>

          <Section3DWrapper direction="center">
            <Interactive3DShowcase />
          </Section3DWrapper>

          <Section3DWrapper direction="right">
            <ResearchShowcase />
          </Section3DWrapper>

          <Section3DWrapper direction="left">
            <SecurityBento />
          </Section3DWrapper>

          <Section3DWrapper direction="right">
            <ProjectsMatrix />
          </Section3DWrapper>

          <Section3DWrapper direction="left">
            <SkillsSection />
          </Section3DWrapper>

          <Section3DWrapper direction="center">
            <InteractiveTerminal />
          </Section3DWrapper>
        </main>

        <Footer />

      </div>
    </SmoothScroll>
  );
}
