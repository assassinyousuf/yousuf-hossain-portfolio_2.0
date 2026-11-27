import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const PALETTE = {
  obsidian: 0x0b0d12,
  surface: 0x151922,
  coreFill: 0x10141d,
  cyan: 0x65d6e7,
  violet: 0xa78bfa,
  ivory: 0xe8e4da,
  slate: 0x8c96a8,
};

function dedupeVertices(geometry) {
  const pos = geometry.attributes.position;
  const seen = new Set();
  const unique = [];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(x, y, z);
    }
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(unique, 3));
  return out;
}

function addArchitecturalCage(parent, geometry, edgeColor, edgeOpacity, trackDispose, withFill = true) {
  if (withFill) {
    const fillMat = new THREE.MeshStandardMaterial({
      color: PALETTE.coreFill,
      transparent: true,
      opacity: 0.72,
      roughness: 0.3,
      metalness: 0.8,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const fillMesh = new THREE.Mesh(geometry, fillMat);
    parent.add(fillMesh);
    trackDispose(geometry, fillMat);
  } else {
    trackDispose(geometry);
  }

  const edgesGeo = new THREE.EdgesGeometry(geometry, 1);
  const edgesMat = new THREE.LineBasicMaterial({
    color: edgeColor,
    transparent: true,
    opacity: edgeOpacity,
  });
  const edges = new THREE.LineSegments(edgesGeo, edgesMat);
  parent.add(edges);
  trackDispose(edgesGeo, edgesMat);
  return edges;
}

function createProtocolCore(isMobile, trackDispose) {
  const coreGroup = new THREE.Group();
  coreGroup.position.set(isMobile ? 0 : 0.6, isMobile ? 1.8 : 0.65, -2);

  // Inner Cryptographic Seed Core (crisp architectural edges, no noisy diagonal triangulation)
  const seedGroup = new THREE.Group();
  const seedGeo = new THREE.OctahedronGeometry(isMobile ? 1.2 : 1.55, 0);
  addArchitecturalCage(seedGroup, seedGeo, PALETTE.violet, 0.78, trackDispose, true);

  const innerHeartGeo = new THREE.OctahedronGeometry(isMobile ? 0.55 : 0.72, 0);
  const innerHeartMat = new THREE.MeshStandardMaterial({
    color: PALETTE.violet,
    emissive: 0x3b2c6e,
    emissiveIntensity: 0.75,
    roughness: 0.2,
    metalness: 0.85,
    transparent: true,
    opacity: 0.7,
  });
  const innerHeart = new THREE.Mesh(innerHeartGeo, innerHeartMat);
  seedGroup.add(innerHeart);
  trackDispose(innerHeartGeo, innerHeartMat);
  coreGroup.add(seedGroup);

  // Mid Geodesic Shield Lattice + Vertex Relay Pinpoints
  const shieldGeo = new THREE.IcosahedronGeometry(isMobile ? 2.8 : 3.55, 1);
  const shieldEdgesGeo = new THREE.EdgesGeometry(shieldGeo, 1);
  const shieldEdgesMat = new THREE.LineBasicMaterial({
    color: PALETTE.cyan,
    transparent: true,
    opacity: 0.26,
  });
  const shieldLattice = new THREE.LineSegments(shieldEdgesGeo, shieldEdgesMat);
  coreGroup.add(shieldLattice);

  const vertexGeo = dedupeVertices(shieldGeo);
  const vertexMat = new THREE.PointsMaterial({
    color: PALETTE.cyan,
    size: isMobile ? 0.14 : 0.17,
    transparent: true,
    opacity: 0.82,
  });
  const shieldNodes = new THREE.Points(vertexGeo, vertexMat);
  coreGroup.add(shieldNodes);
  trackDispose(shieldGeo, shieldEdgesGeo, shieldEdgesMat, vertexGeo, vertexMat);

  // Dual Gyroscopic Calibration Rings + Outer Segmented Azimuth Frame
  const ring1Geo = new THREE.TorusGeometry(isMobile ? 4.0 : 5.4, 0.032, 12, 96);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: PALETTE.cyan,
    transparent: true,
    opacity: 0.36,
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = 0.42;
  coreGroup.add(ring1);
  trackDispose(ring1Geo, ring1Mat);

  const ring2Geo = new THREE.TorusGeometry(isMobile ? 4.8 : 6.7, 0.028, 12, 96);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: PALETTE.violet,
    transparent: true,
    opacity: 0.3,
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = Math.PI / 2.25;
  ring2.rotation.y = -0.35;
  coreGroup.add(ring2);
  trackDispose(ring2Geo, ring2Mat);

  // Calibrated radial ticks around ring2 perimeter
  const tickCount = isMobile ? 16 : 24;
  const tickRadius = isMobile ? 4.8 : 6.7;
  const tickPts = [];
  for (let i = 0; i < tickCount; i++) {
    const a = (i / tickCount) * Math.PI * 2;
    const len = i % 3 === 0 ? 0.42 : 0.2;
    tickPts.push(
      new THREE.Vector3(Math.cos(a) * (tickRadius - len * 0.5), Math.sin(a) * (tickRadius - len * 0.5), 0),
      new THREE.Vector3(Math.cos(a) * (tickRadius + len * 0.5), Math.sin(a) * (tickRadius + len * 0.5), 0)
    );
  }
  const tickGeo = new THREE.BufferGeometry().setFromPoints(tickPts);
  const tickMat = new THREE.LineBasicMaterial({
    color: PALETTE.slate,
    transparent: true,
    opacity: 0.36,
  });
  const tickLines = new THREE.LineSegments(tickGeo, tickMat);
  ring2.add(tickLines);
  trackDispose(tickGeo, tickMat);

  // Orbiting Encrypted Frame Modules (beveled architectural slabs with edge borders)
  const packetGroup = new THREE.Group();
  coreGroup.add(packetGroup);
  const packetCount = isMobile ? 5 : 8;
  const packetMeshes = [];
  const pOrbitRadius = isMobile ? 4.4 : 6.0;

  for (let i = 0; i < packetCount; i++) {
    const moduleHolder = new THREE.Group();
    const angle = (i / packetCount) * Math.PI * 2;
    moduleHolder.position.set(
      Math.cos(angle) * pOrbitRadius,
      Math.sin(angle * 2) * 1.15,
      Math.sin(angle) * pOrbitRadius
    );
    const frameGeo = new THREE.BoxGeometry(0.52, 0.32, 0.14);
    addArchitecturalCage(
      moduleHolder,
      frameGeo,
      i % 2 === 0 ? PALETTE.cyan : PALETTE.violet,
      0.72,
      trackDispose,
      true
    );
    packetGroup.add(moduleHolder);
    packetMeshes.push(moduleHolder);
  }

  return { coreGroup, seedGroup, ring1, ring2, packetGroup, packetMeshes };
}

function createDataConduit(isMobile, trackDispose) {
  const tunnelGroup = new THREE.Group();
  tunnelGroup.position.set(0, 0, -24);

  const ringCount = isMobile ? 8 : 14;
  const spacing = 3.8;
  const gateRadius = 7.4;
  const tunnelRings = [];

  // Alternating hexagonal aperture gates
  for (let i = 0; i < ringCount; i++) {
    const holder = new THREE.Group();
    holder.position.z = -i * spacing;

    const hexGeo = new THREE.TorusGeometry(gateRadius, 0.03, 4, 6);
    const hexMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? PALETTE.cyan : PALETTE.violet,
      transparent: true,
      opacity: i % 2 === 0 ? 0.26 : 0.2,
    });
    const hexMesh = new THREE.Mesh(hexGeo, hexMat);
    hexMesh.rotation.z = (i * Math.PI) / 18;
    holder.add(hexMesh);
    trackDispose(hexGeo, hexMat);

    if (i % 2 === 0) {
      const innerHexGeo = new THREE.TorusGeometry(gateRadius * 0.86, 0.018, 4, 6);
      const innerHexMat = new THREE.MeshBasicMaterial({
        color: PALETTE.slate,
        transparent: true,
        opacity: 0.16,
      });
      const innerHex = new THREE.Mesh(innerHexGeo, innerHexMat);
      innerHex.rotation.z = Math.PI / 6;
      holder.add(innerHex);
      trackDispose(innerHexGeo, innerHexMat);
    }

    tunnelGroup.add(holder);
    tunnelRings.push(holder);
  }

  // 6 Longitudinal Optical Carrier Rails connecting all hexagonal vertices
  const railCount = 6;
  const conduitDepth = (ringCount - 1) * spacing + 8;
  const railPts = [];
  for (let r = 0; r < railCount; r++) {
    const a = (r / railCount) * Math.PI * 2;
    const rx = Math.cos(a) * gateRadius;
    const ry = Math.sin(a) * gateRadius;
    railPts.push(new THREE.Vector3(rx, ry, 4), new THREE.Vector3(rx, ry, -conduitDepth));
  }
  const railGeo = new THREE.BufferGeometry().setFromPoints(railPts);
  const railMat = new THREE.LineBasicMaterial({
    color: PALETTE.cyan,
    transparent: true,
    opacity: 0.16,
  });
  const rails = new THREE.LineSegments(railGeo, railMat);
  tunnelGroup.add(rails);
  trackDispose(railGeo, railMat);

  // Live Optical Pulse Beads traveling along the 6 carrier rails
  const pulseCount = isMobile ? 8 : 16;
  const pulseGeo = new THREE.BoxGeometry(0.11, 0.11, 1.45);
  const cyanPulseMat = new THREE.MeshBasicMaterial({
    color: PALETTE.cyan,
    transparent: true,
    opacity: 0.72,
  });
  const violetPulseMat = new THREE.MeshBasicMaterial({
    color: PALETTE.violet,
    transparent: true,
    opacity: 0.68,
  });
  trackDispose(pulseGeo, cyanPulseMat, violetPulseMat);

  const pulses = [];
  for (let i = 0; i < pulseCount; i++) {
    const railIdx = i % railCount;
    const a = (railIdx / railCount) * Math.PI * 2;
    const mesh = new THREE.Mesh(pulseGeo, i % 2 === 0 ? cyanPulseMat : violetPulseMat);
    mesh.position.set(Math.cos(a) * gateRadius, Math.sin(a) * gateRadius, 0);
    tunnelGroup.add(mesh);
    pulses.push({
      mesh,
      offset: (i / pulseCount) * conduitDepth,
      speed: 9 + (i % 4) * 2.5,
      depth: conduitDepth,
    });
  }

  return { tunnelGroup, tunnelRings, pulses };
}

function createMeshTopology(isMobile, trackDispose) {
  const clusterGroup = new THREE.Group();
  clusterGroup.position.set(0, 0, -86);

  // Central Mesh Coordinator + 4 Architectural System Nodes
  const hubConfigs = [
    { name: "Coordinator", color: PALETTE.cyan, pos: [0, 0.4, -7], size: 1.5, type: "oct" },
    { name: "Networking", color: PALETTE.cyan, pos: [-7.2, 3.2, 0], size: 1.85, type: "oct" },
    { name: "Cybersecurity", color: PALETTE.violet, pos: [7.2, 3.0, -5], size: 2.0, type: "ico" },
    { name: "Systems", color: PALETTE.slate, pos: [-6.4, -3.8, -11], size: 1.8, type: "box" },
    { name: "Research", color: PALETTE.ivory, pos: [6.6, -3.6, -15], size: 1.75, type: "dod" },
  ];

  const clusterMeshes = [];
  hubConfigs.forEach((cfg, idx) => {
    const hub = new THREE.Group();
    hub.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

    let geo;
    if (cfg.type === "oct") geo = new THREE.OctahedronGeometry(cfg.size, 0);
    else if (cfg.type === "ico") geo = new THREE.IcosahedronGeometry(cfg.size, 0);
    else if (cfg.type === "box") geo = new THREE.BoxGeometry(cfg.size * 1.45, cfg.size * 1.45, cfg.size * 1.45);
    else geo = new THREE.DodecahedronGeometry(cfg.size * 0.9, 0);

    addArchitecturalCage(hub, geo, cfg.color, idx === 0 ? 0.65 : 0.48, trackDispose, true);

    // Equatorial orbital ring around each node
    const haloGeo = new THREE.TorusGeometry(cfg.size * 1.38, 0.022, 8, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.3,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2.6 + idx * 0.35;
    hub.add(halo);
    trackDispose(haloGeo, haloMat);

    // Glowing inner telemetry beacon
    const coreDotGeo = new THREE.OctahedronGeometry(0.32, 0);
    const coreDotMat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.85,
    });
    const coreDot = new THREE.Mesh(coreDotGeo, coreDotMat);
    hub.add(coreDot);
    trackDispose(coreDotGeo, coreDotMat);

    clusterGroup.add(hub);
    clusterMeshes.push(hub);
  });

  // Full Multi-Hop Routing Edges (Outer perimeter + star links through Coordinator)
  const edges = [
    [1, 2],
    [2, 4],
    [4, 3],
    [3, 1],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 4],
    [2, 3],
  ];

  const routePts = [];
  const routeSegments = [];
  edges.forEach(([aIdx, bIdx]) => {
    const a = new THREE.Vector3(...hubConfigs[aIdx].pos);
    const b = new THREE.Vector3(...hubConfigs[bIdx].pos);
    routePts.push(a, b);
    routeSegments.push({ a, b });
  });

  const routeGeo = new THREE.BufferGeometry().setFromPoints(routePts);
  const routeMat = new THREE.LineBasicMaterial({
    color: PALETTE.cyan,
    transparent: true,
    opacity: 0.24,
  });
  const routeLines = new THREE.LineSegments(routeGeo, routeMat);
  clusterGroup.add(routeLines);
  trackDispose(routeGeo, routeMat);

  // Traveling Signal Packets gliding between hubs
  const signalCount = isMobile ? 5 : 10;
  const signalGeo = new THREE.SphereGeometry(0.14, 10, 10);
  const signalMatCyan = new THREE.MeshBasicMaterial({ color: PALETTE.cyan });
  const signalMatViolet = new THREE.MeshBasicMaterial({ color: PALETTE.violet });
  trackDispose(signalGeo, signalMatCyan, signalMatViolet);

  const meshSignals = [];
  for (let i = 0; i < signalCount; i++) {
    const mesh = new THREE.Mesh(signalGeo, i % 2 === 0 ? signalMatCyan : signalMatViolet);
    clusterGroup.add(mesh);
    meshSignals.push({
      mesh,
      seg: routeSegments[i % routeSegments.length],
      speed: 0.28 + (i % 3) * 0.1,
      phase: (i / signalCount) * 1.0,
    });
  }

  return { clusterGroup, clusterMeshes, meshSignals };
}

function createProtocolVault(isMobile, trackDispose) {
  const archiveGroup = new THREE.Group();
  archiveGroup.position.set(0, 0, -138);

  const slabCount = isMobile ? 6 : 10;
  const slabs = [];

  // Double-helix corridor of crisp architectural ledger plates (zero diagonal triangles)
  for (let i = 0; i < slabCount; i++) {
    const slab = new THREE.Group();
    const angle = (i / slabCount) * Math.PI * 2;
    const rad = 7.4;
    slab.position.set(
      Math.cos(angle) * rad,
      Math.sin(angle * 1.5) * 2.6,
      -i * 3.1
    );
    slab.rotation.y = angle + Math.PI / 2;

    const accent = i % 2 === 0 ? PALETTE.violet : PALETTE.cyan;
    const plateGeo = new THREE.BoxGeometry(2.6, 3.4, 0.08);
    addArchitecturalCage(slab, plateGeo, accent, 0.42, trackDispose, true);

    // Subtle schematic trace lines etched inside each plate
    const tracePts = [
      new THREE.Vector3(-0.95, 1.15, 0.055),
      new THREE.Vector3(0.45, 1.15, 0.055),
      new THREE.Vector3(-0.95, 0.85, 0.055),
      new THREE.Vector3(0.95, 0.85, 0.055),
      new THREE.Vector3(-0.95, -0.95, 0.055),
      new THREE.Vector3(0.95, -0.95, 0.055),
    ];
    const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePts);
    const traceMat = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.34,
    });
    const traces = new THREE.LineSegments(traceGeo, traceMat);
    slab.add(traces);
    trackDispose(traceGeo, traceMat);

    archiveGroup.add(slab);
    slabs.push(slab);
  }

  // Closing Horizon Concentric Radar Array at end of journey (Timeline & Terminal)
  const closingGroup = new THREE.Group();
  closingGroup.position.set(0, 0, -34);
  closingGroup.rotation.x = 0.18;

  [4.5, 8.2, 12.0].forEach((r, idx) => {
    const cGeo = new THREE.TorusGeometry(r, 0.025, 8, 96);
    const cMat = new THREE.MeshBasicMaterial({
      color: idx === 1 ? PALETTE.violet : PALETTE.cyan,
      transparent: true,
      opacity: 0.24 - idx * 0.04,
    });
    const cMesh = new THREE.Mesh(cGeo, cMat);
    closingGroup.add(cMesh);
    trackDispose(cGeo, cMat);
  });

  const spokePts = [];
  for (let s = 0; s < 12; s++) {
    const a = (s / 12) * Math.PI * 2;
    spokePts.push(
      new THREE.Vector3(Math.cos(a) * 4.5, Math.sin(a) * 4.5, 0),
      new THREE.Vector3(Math.cos(a) * 12.0, Math.sin(a) * 12.0, 0)
    );
  }
  const spokeGeo = new THREE.BufferGeometry().setFromPoints(spokePts);
  const spokeMat = new THREE.LineBasicMaterial({
    color: PALETTE.slate,
    transparent: true,
    opacity: 0.16,
  });
  const spokes = new THREE.LineSegments(spokeGeo, spokeMat);
  closingGroup.add(spokes);
  trackDispose(spokeGeo, spokeMat);

  archiveGroup.add(closingGroup);

  return { archiveGroup, slabs, closingGroup };
}

function createBackboneAndStars(isMobile, trackDispose) {
  // Subtle Perspective Telemetry Floor Grid (no harsh central crossbars)
  const floorGrid = new THREE.GridHelper(180, 45, PALETTE.cyan, PALETTE.surface);
  floorGrid.position.y = -8.6;
  floorGrid.material.transparent = true;
  floorGrid.material.opacity = 0.15;
  trackDispose(floorGrid.geometry, floorGrid.material);

  // Twin Optical Trunk Spine running continuously under the camera path
  const spinePts = [
    new THREE.Vector3(-1.8, -7.2, 20),
    new THREE.Vector3(-1.8, -7.2, -185),
    new THREE.Vector3(1.8, -7.2, 20),
    new THREE.Vector3(1.8, -7.2, -185),
  ];
  const spineGeo = new THREE.BufferGeometry().setFromPoints(spinePts);
  const spineMat = new THREE.LineBasicMaterial({
    color: PALETTE.cyan,
    transparent: true,
    opacity: 0.18,
  });
  const spineLines = new THREE.LineSegments(spineGeo, spineMat);
  trackDispose(spineGeo, spineMat);

  // Two-tone Deep Starfield (Cyan & Soft Violet)
  const buildStarLayer = (count, color, size, opacity) => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 90;
      pos[i + 1] = (Math.random() - 0.5) * 75;
      pos[i + 2] = (Math.random() - 0.5) * 220 - 65;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity });
    trackDispose(geo, mat);
    return new THREE.Points(geo, mat);
  };

  const cyanStars = buildStarLayer(isMobile ? 160 : 460, PALETTE.cyan, 0.11, 0.48);
  const violetStars = buildStarLayer(isMobile ? 90 : 240, PALETTE.violet, 0.13, 0.42);

  return { floorGrid, spineLines, cyanStars, violetStars };
}

export default function CinematicNetworkScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const disposableAssets = [];
    const trackDispose = (...items) => {
      items.forEach((item) => {
        if (item) disposableAssets.push(item);
      });
    };

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(PALETTE.obsidian, 0.022);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.15 : 1.6));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 2. Calibrated Lighting
    const ambientLight = new THREE.AmbientLight(PALETTE.surface, 1.45);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(PALETTE.cyan, 3.4, 90);
    cyanPointLight.position.set(-12, 8, 15);
    scene.add(cyanPointLight);

    const violetPointLight = new THREE.PointLight(PALETTE.violet, 3.6, 90);
    violetPointLight.position.set(12, -8, 12);
    scene.add(violetPointLight);

    const headlight = new THREE.PointLight(PALETTE.ivory, 1.35, 45);
    camera.add(headlight);
    scene.add(camera);

    // 3. Build Structured Architectural Assemblies
    const { coreGroup, seedGroup, ring1, ring2, packetGroup, packetMeshes } = createProtocolCore(
      isMobile,
      trackDispose
    );
    scene.add(coreGroup);

    const { tunnelGroup, tunnelRings, pulses } = createDataConduit(isMobile, trackDispose);
    scene.add(tunnelGroup);

    const { clusterGroup, clusterMeshes, meshSignals } = createMeshTopology(isMobile, trackDispose);
    scene.add(clusterGroup);

    const { archiveGroup, slabs, closingGroup } = createProtocolVault(isMobile, trackDispose);
    scene.add(archiveGroup);

    const { floorGrid, spineLines, cyanStars, violetStars } = createBackboneAndStars(
      isMobile,
      trackDispose
    );
    scene.add(floorGrid);
    scene.add(spineLines);
    scene.add(cyanStars);
    scene.add(violetStars);

    // 4. Scroll Traversal & Mouse Parallax
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

    // 5. Animation Loop
    const clock = new THREE.Clock();
    const tmpVec = new THREE.Vector3();
    let animId;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      const currentScroll = window.lenis ? window.lenis.scroll : window.scrollY;
      targetScrollY = currentScroll;
      scrollY += (targetScrollY - scrollY) * 0.08;

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // 7-Zone Scroll Camera Choreography
      let targetCamZ = 28;
      let targetCamX = 0;
      let targetCamY = 0;
      let targetLookZ = -2;

      if (progress < 0.15) {
        const t = progress / 0.15;
        targetCamZ = 28 - t * 10;
        targetCamX = isMobile ? 0 : 1.4 * (1 - t);
        targetCamY = 0;
        targetLookZ = -2;
      } else if (progress < 0.30) {
        const t = (progress - 0.15) / 0.15;
        targetCamZ = 18 - t * 44;
        targetCamX = Math.sin(t * Math.PI) * 2.2;
        targetCamY = Math.cos(t * Math.PI) * 1.2;
        targetLookZ = targetCamZ - 16;
      } else if (progress < 0.50) {
        const t = (progress - 0.30) / 0.20;
        targetCamZ = -26 - t * 50;
        targetCamX = Math.sin(t * Math.PI * 2) * 4.8;
        targetCamY = Math.cos(t * Math.PI * 2) * 2.2;
        targetLookZ = -86;
      } else if (progress < 0.70) {
        const t = (progress - 0.50) / 0.20;
        targetCamZ = -76 - t * 50;
        targetCamX = (isMobile ? 0 : -3.2) + Math.sin(t * Math.PI) * 2.0;
        targetCamY = Math.sin(t * Math.PI * 2) * 1.4;
        targetLookZ = targetCamZ - 20;
      } else if (progress < 0.85) {
        const t = (progress - 0.70) / 0.15;
        targetCamZ = -126 - t * 30;
        targetCamX = Math.cos(t * Math.PI) * 2.8;
        targetCamY = Math.sin(t * Math.PI) * 1.4;
        targetLookZ = -148;
      } else {
        const t = (progress - 0.85) / 0.15;
        targetCamZ = -156 - (1 - t) * 12 + t * 8;
        targetCamX = 0;
        targetCamY = 0.4;
        targetLookZ = -172;
      }

      const mouseParallaxX = isMobile ? 0 : mouseX * 1.1;
      const mouseParallaxY = isMobile ? 0 : mouseY * 0.75;

      camera.position.x += (targetCamX + mouseParallaxX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY + mouseParallaxY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.lookAt(targetCamX * 0.2, targetCamY * 0.2, targetLookZ);

      // Core Assembly Rotation
      coreGroup.rotation.y = elapsed * 0.18;
      coreGroup.rotation.x = Math.sin(elapsed * 0.18) * 0.12;
      seedGroup.rotation.y = -elapsed * 0.42;
      seedGroup.rotation.z = elapsed * 0.28;
      ring1.rotation.z = elapsed * 0.35;
      ring2.rotation.y = -elapsed * 0.32;

      packetGroup.rotation.y = -elapsed * 0.25;
      packetMeshes.forEach((p, idx) => {
        p.rotation.y = elapsed * (0.7 + idx * 0.12);
        p.rotation.z = Math.sin(elapsed + idx) * 0.22;
      });

      // Hexagonal Conduit Rotation & Optical Pulses
      tunnelRings.forEach((ring, idx) => {
        ring.rotation.z = elapsed * 0.14 * (idx % 2 === 0 ? 1 : -1);
      });
      pulses.forEach((p) => {
        const zPos = ((elapsed * p.speed + p.offset) % p.depth) * -1;
        p.mesh.position.z = zPos;
      });

      // Cluster Hub Rotations & Multi-Hop Signal Transfer
      clusterMeshes.forEach((hub, idx) => {
        hub.rotation.y = elapsed * (0.28 + idx * 0.06);
        hub.rotation.x = Math.sin(elapsed * 0.35 + idx) * 0.18;
      });
      meshSignals.forEach((s) => {
        const u = (elapsed * s.speed + s.phase) % 1;
        tmpVec.lerpVectors(s.seg.a, s.seg.b, u);
        s.mesh.position.copy(tmpVec);
      });

      // Archive Plates Subtle Floating + Closing Radar Array
      slabs.forEach((slab, idx) => {
        slab.rotation.z = Math.sin(elapsed * 0.65 + idx * 0.7) * 0.08;
      });
      closingGroup.rotation.z = elapsed * 0.08;

      // Infinite Perspective Runway Sync
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
      disposableAssets.forEach((asset) => {
        if (typeof asset.dispose === "function") asset.dispose();
      });
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden opacity-45 md:opacity-72"
    />
  );
}
