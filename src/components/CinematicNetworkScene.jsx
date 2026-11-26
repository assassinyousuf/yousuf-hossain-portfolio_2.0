import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CinematicNetworkScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090d, isMobile ? 0.018 : 0.022);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x1a2e48, 1.4);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 5, 90);
    cyanPointLight.position.set(-10, 8, 15);
    scene.add(cyanPointLight);

    const violetPointLight = new THREE.PointLight(0xc084fc, 5.5, 90);
    violetPointLight.position.set(10, -8, 12);
    scene.add(violetPointLight);

    const headlight = new THREE.PointLight(0xffffff, 1.6, 45);
    camera.add(headlight);
    scene.add(camera);

    // 3. SCENE OBJECT GROUPS

    // ----------------------------------------------------
    // A. SCENE 01: THE NETWORK CORE
    // ----------------------------------------------------
    const coreGroup = new THREE.Group();
    // On mobile, keep the core centered; on desktop, position on the right side
    coreGroup.position.set(isMobile ? 0 : 3.8, isMobile ? 0 : 0.5, 0);
    scene.add(coreGroup);

    // Outer Wireframe Icosahedron
    const icoRadius = isMobile ? 2.8 : 4.0;
    const icoGeo = new THREE.IcosahedronGeometry(icoRadius, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreIcosahedron = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(coreIcosahedron);

    // Inner Glowing Octahedron
    const octRadius = isMobile ? 1.6 : 2.4;
    const octGeo = new THREE.OctahedronGeometry(octRadius, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.9,
    });
    const innerOct = new THREE.Mesh(octGeo, octMat);
    coreGroup.add(innerOct);

    // Gyroscopic Orbital Toruses
    const ring1Geo = new THREE.TorusGeometry(isMobile ? 3.8 : 5.4, 0.04, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(isMobile ? 4.4 : 6.2, 0.035, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.5 });
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
      color: 0x38bdf8,
      emissive: 0x0284c7,
      wireframe: true,
    });

    for (let i = 0; i < packetCount; i++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat);
      const angle = (i / packetCount) * Math.PI * 2;
      const radius = isMobile ? 3.9 : 5.8;
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
      const tGeo = new THREE.TorusGeometry(isMobile ? 5.0 : 7.0, 0.035, 8, 48);
      const tMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0xc084fc,
        transparent: true,
        opacity: 0.35,
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

    // 4 Nodes: Networking (Cyan), Security (Purple), Systems (Emerald), Dev (Amber)
    const clusterConfigs = [
      { name: "Networking", color: 0x38bdf8, pos: [isMobile ? -3 : -7, 3, 0], geo: new THREE.OctahedronGeometry(isMobile ? 1.5 : 2.0, 1) },
      { name: "Cybersecurity", color: 0xc084fc, pos: [isMobile ? 3 : 7, 3, -5], geo: new THREE.IcosahedronGeometry(isMobile ? 1.6 : 2.2, 0) },
      { name: "Systems", color: 0x34d399, pos: [isMobile ? -3 : -6, -3, -10], geo: new THREE.DodecahedronGeometry(isMobile ? 1.5 : 2.0, 0) },
      { name: "Development", color: 0xfbbf24, pos: [isMobile ? 3 : 6, -3, -15], geo: new THREE.TetrahedronGeometry(isMobile ? 1.8 : 2.4, 1) },
    ];

    const clusterMeshes = [];
    clusterConfigs.forEach((cfg) => {
      const cMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        roughness: 0.3,
      });
      const cMesh = new THREE.Mesh(cfg.geo, cMat);
      cMesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

      // Inner glowing core dot
      const dotGeo = new THREE.SphereGeometry(0.45, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: cfg.color });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      cMesh.add(dot);

      clusterGroup.add(cMesh);
      clusterMeshes.push(cMesh);
    });

    // Connecting laser lines between clusters
    const clusterLineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 });
    const clusterLinePoints = clusterConfigs.map(c => new THREE.Vector3(...c.pos));
    clusterLinePoints.push(new THREE.Vector3(...clusterConfigs[0].pos));
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
      const pGeo = new THREE.PlaneGeometry(2.6, 3.6);
      const pMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0xc084fc,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      const angle = (i / panelCount) * Math.PI * 2;
      const rad = isMobile ? 5.5 : 7.5;
      pMesh.position.set(Math.cos(angle) * rad, Math.sin(angle) * 2.5, -i * 4);
      pMesh.rotation.y = angle + Math.PI / 2;
      archiveGroup.add(pMesh);
      archivePanels.push(pMesh);
    }

    // ----------------------------------------------------
    // E. CONTINUOUS PERSPECTIVE RUNWAY & STARFIELD
    // ----------------------------------------------------
    const floorGrid = new THREE.GridHelper(180, 60, 0x38bdf8, 0x111827);
    floorGrid.position.y = -7.5;
    floorGrid.material.transparent = true;
    floorGrid.material.opacity = 0.3;
    scene.add(floorGrid);

    // Deep cosmic starfield
    const starCount = isMobile ? 300 : 800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 90;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = (Math.random() - 0.5) * 220 - 40;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isMobile ? 0.15 : 0.18,
      transparent: true,
      opacity: 0.75,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. INTERACTIVE DYNAMIC CONTROLS & TOUCH GESTURES
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let pointerX = 0;
    let pointerY = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Mobile touch interaction: allows finger swipes to dynamically tilt the 3D scene
    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        pointerX = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.4)));
        pointerY = Math.max(-1, Math.min(1, -dy / (window.innerHeight * 0.4)));
      }
    };

    const onTouchEnd = () => {
      // Smoothly return pointer to center when touch releases
      pointerX *= 0.5;
      pointerY *= 0.5;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize);

    // 5. ANIMATION LOOP
    const clock = new THREE.Clock();
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
        targetCamX = Math.sin(t * Math.PI) * (isMobile ? 1.5 : 2.5);
        targetCamY = Math.cos(t * Math.PI) * 1.5;
        targetLookZ = targetCamZ - 15;
      } else if (progress < 0.50) {
        // Scene 03: 3D System Capability Nodes
        const t = (progress - 0.30) / 0.20;
        targetCamZ = -27 - t * 50; // -27 to -77
        targetCamX = Math.sin(t * Math.PI * 2) * (isMobile ? 2.5 : 5.0);
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
        targetCamX = Math.cos(t * Math.PI) * 2.5;
        targetCamY = Math.sin(t * Math.PI) * 1.5;
        targetLookZ = -145;
      } else {
        // Scene 06 & 07: Milestones & Connection Settles
        const t = (progress - 0.85) / 0.15;
        targetCamZ = -157 - (1 - t) * 15 + t * 5;
        targetCamX = 0;
        targetCamY = 0;
        targetLookZ = -150;
      }

      // Parallax mouse & mobile touch damping + organic idle breathing
      const idleBreathingX = Math.sin(elapsed * 0.8) * 0.35;
      const idleBreathingY = Math.cos(elapsed * 0.6) * 0.25;
      const pointerParallaxX = pointerX * (isMobile ? 1.0 : 1.4);
      const pointerParallaxY = pointerY * (isMobile ? 0.8 : 1.0);

      camera.position.x += (targetCamX + pointerParallaxX + idleBreathingX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY + pointerParallaxY + idleBreathingY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      camera.lookAt(targetCamX * 0.2, targetCamY * 0.2, targetLookZ);

      // --- Object Rotations & Pulses ---
      // Core continuous rotation
      coreGroup.rotation.y = elapsed * 0.28;
      coreGroup.rotation.x = Math.sin(elapsed * 0.22) * 0.18;
      ring1.rotation.z = elapsed * 0.48;
      ring2.rotation.y = -elapsed * 0.52;

      packetGroup.rotation.y = -elapsed * 0.38;
      packetMeshes.forEach((p, idx) => {
        p.rotation.x = elapsed * (1.2 + idx * 0.2);
        p.rotation.y = elapsed * (1.2 + idx * 0.2);
      });

      // Tunnel rings pulse
      tunnelRings.forEach((ring, idx) => {
        ring.rotation.z = elapsed * 0.25 * (idx % 2 === 0 ? 1 : -1);
      });

      // Cluster nodes rotation
      clusterMeshes.forEach((mesh, idx) => {
        mesh.rotation.x = elapsed * (0.35 + idx * 0.1);
        mesh.rotation.y = elapsed * (0.45 + idx * 0.1);
      });

      // Archive floating panels oscillation
      archivePanels.forEach((panel, idx) => {
        panel.rotation.z = Math.sin(elapsed * 0.9 + idx) * 0.18;
      });

      // Continuous runway flow
      floorGrid.position.z = (scrollY * 0.035) % 3;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
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
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden opacity-90"
    />
  );
}
