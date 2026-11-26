import React, { useEffect, useRef } from "react";
import { Shield, Network, Users, Award, Compass } from "lucide-react";
import { gsap } from "gsap";

export default function IdentityScene() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const textScrubRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const pillars = [
    {
      title: "Computer Science & Engineering Scholar",
      desc: "7th Semester undergraduate at Dhaka International University (Expected 2027), focusing on distributed networks, zero-trust protocols, and systems engineering.",
      icon: Compass,
      color: "border-cyan-500/30 text-cyan-300 bg-cyan-950/20",
    },
    {
      title: "Cybersecurity & Cryptography Researcher",
      desc: "Lead and co-author on 5 peer-reviewed publications, including accepted Taylor & Francis book chapters on audio-domain steganography and mobile container sandboxing.",
      icon: Shield,
      color: "border-purple-500/30 text-purple-300 bg-purple-950/20",
    },
    {
      title: "Enterprise Network Systems Engineer",
      desc: "Active preparation on the Cisco CCNA 200-301 track; designing VLSM subnet topologies, VLANs, and analyzing packet telemetry via Wireshark and Packet Tracer.",
      icon: Network,
      color: "border-yellow-500/30 text-yellow-300 bg-yellow-950/20",
    },
    {
      title: "Competitive CTF Champion",
      desc: "1st Place Champion at DIU Intra First CTF 2025; Global Rank #72 in BCS ICT Fest CTF, and Global Rank #158 in HiCyberCon international cyber competition.",
      icon: Award,
      color: "border-emerald-500/30 text-emerald-300 bg-emerald-950/20",
    },
    {
      title: "Executive Technical Community Leader",
      desc: "General Secretary of DIU Computer Programming Club (DIU CPC), directing programming contests, technical bootcamps, and developer initiatives.",
      icon: Users,
      color: "border-pink-500/30 text-pink-300 bg-pink-950/20",
    },
  ];

  const missionWords = "I explore networking, cybersecurity, systems engineering, and empirical research — engineering, learning, and evaluating resilient protocols across real-world systems.".split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Word-by-Word Text Scrub Reveal: words illuminate from muted grey to bright white
      if (textScrubRef.current) {
        const words = textScrubRef.current.querySelectorAll(".scrub-word");
        gsap.fromTo(
          words,
          { color: "rgba(100, 116, 139, 0.4)", y: 6 },
          {
            color: "rgba(241, 245, 249, 1)",
            y: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: textScrubRef.current,
              start: "top 80%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          }
        );
      }

      // 3. Staggered 5 Pillars Reveal with subtle 3D lift
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle 3D Tilt on Hover
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <section
      ref={sectionRef}
      id="identity"
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-transparent border-t border-purple-900/25"
    >
      {/* Background Section Glow */}
      <div className="pointer-events-none absolute left-10 top-1/3 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-mono text-xs tracking-widest mb-3">
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>01 // IDENTITY — ENTER THE NETWORK</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Curiosity drives <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
                the connection.
              </span>
            </h2>
          </div>

          {/* Word-by-word Scroll Scrub Reveal Text */}
          <div ref={textScrubRef} className="font-mono text-xs sm:text-sm max-w-md leading-relaxed select-none">
            {missionWords.map((word, idx) => (
              <span key={idx} className="scrub-word inline-block mr-1.5 transition-colors">
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* 5 Identity Chunks Cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`rounded-3xl glass-panel p-5 sm:p-7 border border-purple-500/20 hover:border-cyan-400/50 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between group will-change-transform ${
                  idx === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${item.color} border w-fit shadow-inner`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-slate-500 flex items-center justify-between">
                  <span>IDENTITY PILLAR</span>
                  <span className="text-cyan-400 font-semibold">[VERIFIED]</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
