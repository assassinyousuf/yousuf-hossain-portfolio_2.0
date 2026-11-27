import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CinematicNetworkScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // 1. Scene & Camera Setup (Obsidian Fog & Calibrated Lighting)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d12, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Initial camera position (Scene 01: Initial Contact)
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x151922, 1.3);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x65d6e7, 3.2, 85);
    cyanPointLight.position.set(-12, 8, 15);
    scene.add(cyanPointLight);

    const violetPointLight = new THREE.PointLight(0xa78bfa, 3.4, 85);
    violetPointLight.position.set(12, -8, 12);
    scene.add(violetPointLight);

    const headlight = new THREE.PointLight(0xe8e4da, 1.2, 40);
    camera.add(headlight);
    scene.add(camera);

    // 3. SCENE OBJECT GROUPS

    // ----------------------------------------------------
    // A. SCENE 01: THE NETWORK CORE
    // ----------------------------------------------------
    const coreGroup = new THREE.Group();
    coreGroup.position.set(isMobile ? 0 : 4, isMobile ? 1.5 : 0.5, 0);
    scene.add(coreGroup);

    // Outer Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(isMobile ? 3.0 : 4.0, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x65d6e7,
      wireframe: true,
      transparent: true,
      opacity: 0.34,
      roughness: 0.25,
      metalness: 0.75,
    });
    const coreIcosahedron = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(coreIcosahedron);

    // Inner Glowing Octahedron
    const octGeo = new THREE.OctahedronGeometry(isMobile ? 1.8 : 2.4, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.58,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x3b2c6e,
      emissiveIntensity: 0.55,
    });
    const innerOct = new THREE.Mesh(octGeo, octMat);
    coreGroup.add(innerOct);

    // Gyroscopic Orbital Toruses
    const ring1Geo = new THREE.TorusGeometry(isMobile ? 4.2 : 5.4, 0.04, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x65d6e7, transparent: true, opacity: 0.42 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(isMobile ? 4.9 : 6.2, 0.035, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.34 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.3;
    coreGroup.add(ring2);

    // Orbiting Data Packets
    const packetGroup = new THREE.Group();
    coreGroup.add(packetGroup);
    const packetCount = isMobile ? 6 : 10;
    const packetMeshes = [];
    const packetGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const packetMat = new THREE.MeshStandardMaterial({
      color: 0x65d6e7,
      emissive: 0x266c7a,
      wireframe: true,
    });

    for (let i = 0; i < packetCount; i++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat);
      const angle = (i / packetCount) * Math.PI * 2;
      const radius = isMobile ? 4.5 : 5.8;
      pMesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius);
      packetGroup.add(pMesh);
      packetMeshes.push(pMesh);
    }

    // ----------------------------------------------------
    // B. SCENE 02: THE DATA TUNNEL (Travel Through Network)
    // ----------------------------------------------------
    const tunnelGroup = new THREE.Group();
    tunnelGroup.position.set(0, 0, -30);
    scene.add(tunnelGroup);

    const tunnelRings = [];
    const tunnelRingCount = isMobile ? 8 : 16;
    for (let i = 0; i < tunnelRingCount; i++) {
      const tGeo = new THREE.TorusGeometry(7.0, 0.03, 8, 48);
      const tMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x65d6e7 : 0xa78bfa,
        transparent: true,
        opacity: 0.22,
      });
      const tMesh = new THREE.Mesh(tGeo, tMat);
      tMesh.position.z = -i * 5;
      tunnelGroup.add(tMesh);
      tunnelRings.push(tMesh);
    }

    // ----------------------------------------------------
    // C. SCENE 03: 4 3D SYSTEM CAPABILITY NODES
    // ----------------------------------------------------
    const clusterGroup = new THREE.Group();
    clusterGroup.position.set(0, 0, -85);
    scene.add(clusterGroup);

    // 4 Nodes harmonized strictly with Obsidian / Cyan / Violet / Ivory palette
    const clusterConfigs = [
      { name: "Networking", color: 0x65d6e7, pos: [-7, 3, 0], geo: new THREE.OctahedronGeometry(2.0, 1) },
      { name: "Cybersecurity", color: 0xa78bfa, pos: [7, 3, -5], geo: new THREE.IcosahedronGeometry(2.2, 0) },
      { name: "Systems", color: 0x8c96a8, pos: [-6, -4, -10], geo: new THREE.DodecahedronGeometry(2.0, 0) },
      { name: "Development", color: 0xe8e4da, pos: [6, -4, -15], geo: new THREE.TetrahedronGeometry(2.4, 1) },
    ];

    const clusterMeshes = [];
    clusterConfigs.forEach((cfg) => {
      const cMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.36,
        roughness: 0.35,
      });
      const cMesh = new THREE.Mesh(cfg.geo, cMat);
      cMesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

      // Subtle inner anchor core
      const dotGeo = new THREE.SphereGeometry(0.38, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.72 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      cMesh.add(dot);

      clusterGroup.add(cMesh);
      clusterMeshes.push(cMesh);
    });

    // Connecting laser lines between clusters
    const clusterLineMat = new THREE.LineBasicMaterial({ color: 0x65d6e7, transparent: true, opacity: 0.2 });
    const clusterLinePoints = [
      new THREE.Vector3(-7, 3, 0),
      new THREE.Vector3(7, 3, -5),
      new THREE.Vector3(6, -4, -15),
      new THREE.Vector3(-6, -4, -10),
      new THREE.Vector3(-7, 3, 0),
    ];
    const clusterLineGeo = new THREE.BufferGeometry().setFromPoints(clusterLinePoints);
    const clusterLine = new THREE.Line(clusterLineGeo, clusterLineMat);
    clusterGroup.add(clusterLine);

    // ----------------------------------------------------
    // D. SCENE 05 & 06: ARCHIVE FLOATING PANELS & TIMELINE
    // ----------------------------------------------------
    const archiveGroup = new THREE.Group();
    archiveGroup.position.set(0, 0, -145);
    scene.add(archiveGroup);

    const archivePanels = [];
    const panelCount = isMobile ? 4 : 8;
    for (let i = 0; i < panelCount; i++) {
      const pGeo = new THREE.PlaneGeometry(2.8, 3.8);
      const pMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xa78bfa : 0x65d6e7,
        wireframe: true,
        transparent: true,
        opacity: 0.24,
        side: THREE.DoubleSide,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      const angle = (i / panelCount) * Math.PI * 2;
      const rad = 7.5;
      pMesh.position.set(Math.cos(angle) * rad, Math.sin(angle) * 3, -i * 4);
      pMesh.rotation.y = angle + Math.PI / 2;
      archiveGroup.add(pMesh);
      archivePanels.push(pMesh);
    }

    // ----------------------------------------------------
    // E. CONTINUOUS PERSPECTIVE RUNWAY & STARFIELD
    // ----------------------------------------------------
    const floorGrid = new THREE.GridHelper(160, 50, 0x65d6e7, 0x151922);
    floorGrid.position.y = -8;
    floorGrid.material.transparent = true;
    floorGrid.material.opacity = 0.2;
    scene.add(floorGrid);

    // Deep starfield harmonized with cool slate & electric cyan
    const starCount = isMobile ? 250 : 700;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 70;
      starPositions[i + 2] = (Math.random() - 0.5) * 200 - 40;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x65d6e7,
      size: 0.12,
      transparent: true,
      opacity: 0.52,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. SCROLL TRAVERSAL & CHOREOGRAPHY MATH
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    window.addEventListener("resize", onResize);

    // 5. ANIMATION LOOP
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth scroll interpolation (momentum sync)
      const currentScroll = window.lenis ? window.lenis.scroll : window.scrollY;
      targetScrollY = currentScroll;
      scrollY += (targetScrollY - scrollY) * 0.08;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // ----------------------------------------------------
      // CAMERA CHOREOGRAPHY: 7 DISTINCT ZONES OF NAVIGATION
      // ----------------------------------------------------
      // P1 (0.00 - 0.15): Entrance / Approach Core (Z: 28 -> 18)
      // P2 (0.15 - 0.30): Travel through Data Tunnel (Z: 18 -> -25)
      // P3 (0.30 - 0.50): Orbit System Capabilities Clusters (Z: -25 -> -75, X/Y Pan)
      // P4 (0.50 - 0.70): Spatial Project Archive Traversal (Z: -75 -> -120)
      // P5 (0.70 - 0.85): Research Digital Archive Floating Panels (Z: -120 -> -155)
      // P6 (0.85 - 0.95): Milestones & Signals Progress (Z: -155 -> -170)
      // P7 (0.95 - 1.00): Pull Back & Connection Settles (Z: -170 -> -160, Wide Look)

      let targetCamZ = 28;
      let targetCamX = 0;
      let targetCamY = 0;
      let targetLookZ = 0;

      if (progress < 0.15) {
        // Scene 01: Entrance
        const t = progress / 0.15;
        targetCamZ = 28 - t * 10;
        targetCamX = isMobile ? 0 : 2 * (1 - t);
        targetCamY = 0;
        targetLookZ = 0;
      } else if (progress < 0.30) {
        // Scene 02: Enter the Network Tunnel
        const t = (progress - 0.15) / 0.15;
        targetCamZ = 18 - t * 45; // zooms from 18 to -27
        targetCamX = Math.sin(t * Math.PI) * 2.5;
        targetCamY = Math.cos(t * Math.PI) * 1.5;
        targetLookZ = targetCamZ - 15;
      } else if (progress < 0.50) {
        // Scene 03: 3D System Capability Nodes
        const t = (progress - 0.30) / 0.20;
        targetCamZ = -27 - t * 50; // -27 to -77
        targetCamX = Math.sin(t * Math.PI * 2) * 5.0;
        targetCamY = Math.cos(t * Math.PI * 2) * 2.5;
        targetLookZ = -85;
      } else if (progress < 0.70) {
        // Scene 04: Engineering Archive
        const t = (progress - 0.50) / 0.20;
        targetCamZ = -77 - t * 50; // -77 to -127
        targetCamX = (isMobile ? 0 : -3.5) + Math.sin(t * Math.PI) * 2.0;
        targetCamY = Math.sin(t * Math.PI * 2) * 1.5;
        targetLookZ = targetCamZ - 20;
      } else if (progress < 0.85) {
        // Scene 05: Research Archive
        const t = (progress - 0.70) / 0.15;
        targetCamZ = -127 - t * 30; // -127 to -157
        targetCamX = Math.cos(t * Math.PI) * 3.0;
        targetCamY = Math.sin(t * Math.PI) * 1.5;
        targetLookZ = -145;
      } else {
        // Scene 06 & 07: Milestones & Connection Settles
        const t = (progress - 0.85) / 0.15;
        targetCamZ = -157 - (1 - t) * 15 + t * 5; // pulls back gracefully
        targetCamX = 0;
        targetCamY = 0;
        targetLookZ = -150;
      }

      // Parallax mouse damping
      const mouseParallaxX = isMobile ? 0 : mouseX * 1.2;
      const mouseParallaxY = isMobile ? 0 : mouseY * 0.8;

      camera.position.x += (targetCamX + mouseParallaxX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY + mouseParallaxY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      camera.lookAt(targetCamX * 0.2, targetCamY * 0.2, targetLookZ);

      // --- Object Rotations ---
      // Core continuous rotation
      coreGroup.rotation.y = elapsed * 0.25;
      coreGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15;
      ring1.rotation.z = elapsed * 0.45;
      ring2.rotation.y = -elapsed * 0.5;

      packetGroup.rotation.y = -elapsed * 0.35;
      packetMeshes.forEach((p, idx) => {
        p.rotation.x = elapsed * (1.2 + idx * 0.2);
        p.rotation.y = elapsed * (1.2 + idx * 0.2);
      });

      // Tunnel rings pulse
      tunnelRings.forEach((ring, idx) => {
        ring.rotation.z = elapsed * 0.2 * (idx % 2 === 0 ? 1 : -1);
      });

      // Cluster nodes rotation
      clusterMeshes.forEach((mesh, idx) => {
        mesh.rotation.x = elapsed * (0.3 + idx * 0.1);
        mesh.rotation.y = elapsed * (0.4 + idx * 0.1);
      });

      // Archive floating panels gentle oscillation
      archivePanels.forEach((panel, idx) => {
        panel.rotation.z = Math.sin(elapsed * 0.8 + idx) * 0.15;
      });

      // Infinite runway flow
      floorGrid.position.z = (scrollY * 0.03) % 4;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden opacity-45 md:opacity-70"
    />
  );
}

