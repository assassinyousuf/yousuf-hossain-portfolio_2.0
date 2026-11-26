import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Cyber3DScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030408, 0.022);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 20);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 4, 60);
    pointLightPurple.position.set(12, 12, 10);
    scene.add(pointLightPurple);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 4, 60);
    pointLightCyan.position.set(-12, -8, 12);
    scene.add(pointLightCyan);

    // 3. Central 3D Cyber Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Wireframe Shield (Icosahedron)
    const icoGeometry = new THREE.IcosahedronGeometry(3.6, 1);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    coreGroup.add(icosahedron);

    // Inner Glowing Core (Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(2.1, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: false,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x083344,
      emissiveIntensity: 0.7,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // Concentric Gyroscopic Rings
    const ring1Geo = new THREE.TorusGeometry(4.8, 0.045, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(5.6, 0.038, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.5;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(6.4, 0.032, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.4 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 3;
    coreGroup.add(ring3);

    // Orbiting Cryptographic Blocks
    const cubesGroup = new THREE.Group();
    coreGroup.add(cubesGroup);
    const cubeGeo = new THREE.BoxGeometry(0.38, 0.38, 0.38);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      wireframe: true,
      emissive: 0x881337,
    });

    const cubeCount = 8;
    const cubes = [];
    for (let i = 0; i < cubeCount; i++) {
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      const angle = (i / cubeCount) * Math.PI * 2;
      const radius = 5.2;
      cube.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius);
      cubesGroup.add(cube);
      cubes.push(cube);
    }

    // 4. Continuous 3D Infinite Cyber Runway Grid
    const gridHelper = new THREE.GridHelper(120, 60, 0xa855f7, 0x1e1b4b);
    gridHelper.position.y = -8;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.35;
    scene.add(gridHelper);

    // Second Ceiling Grid for tunnel perspective depth
    const ceilingGrid = new THREE.GridHelper(120, 60, 0x06b6d4, 0x0f172a);
    ceilingGrid.position.y = 10;
    ceilingGrid.material.transparent = true;
    ceilingGrid.material.opacity = 0.2;
    scene.add(ceilingGrid);

    // 5. Deep Starfield
    const starsCount = 900;
    const starGeo = new THREE.BufferGeometry();
    const starCoords = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      starCoords[i] = (Math.random() - 0.5) * 80;
      starCoords[i + 1] = (Math.random() - 0.5) * 60;
      starCoords[i + 2] = (Math.random() - 0.5) * 60 - 5;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.14,
      transparent: true,
      opacity: 0.75,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 6. Scroll & Mouse Tracking
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
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    // 7. Continuous 3D Fly-Through Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth scroll lerp (with Lenis momentum sync)
      const currentScroll = window.lenis ? window.lenis.scroll : window.scrollY;
      targetScrollY = currentScroll;
      scrollY += (targetScrollY - scrollY) * 0.08;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // --- Continuous 3D Sliding of the Runway Grid ---
      // The grid continuously flows toward the user as you scroll
      gridHelper.position.z = (scrollY * 0.04) % 4;
      ceilingGrid.position.z = (scrollY * 0.04) % 4;

      // --- Continuous 3D Rotation & Camera Travel ---
      coreGroup.rotation.y = elapsed * 0.3 + scrollProgress * Math.PI * 6;
      coreGroup.rotation.x = Math.sin(elapsed * 0.25) * 0.2 + scrollProgress * Math.PI * 3;
      coreGroup.rotation.z = Math.cos(elapsed * 0.2) * 0.15 + scrollProgress * Math.PI * 1.5;

      ring1.rotation.z = elapsed * 0.6 + scrollProgress * 4;
      ring2.rotation.y = -elapsed * 0.7 - scrollProgress * 5;
      ring3.rotation.x = elapsed * 0.5 + scrollProgress * 3;

      cubesGroup.rotation.y = -elapsed * 0.45;
      cubes.forEach((cube, i) => {
        cube.rotation.x = elapsed * (1.2 + i * 0.2);
        cube.rotation.y = elapsed * (1.2 + i * 0.2);
      });

      // Spatial Positioning across sections
      const isMobile = window.innerWidth < 1024;
      const baseXOffset = isMobile ? 0 : 6.0;

      // Continuous 3D camera depth oscillation
      camera.position.z = 19 + Math.sin(scrollProgress * Math.PI * 4) * 2.5;

      // Trajectory of the 3D core moving dynamically left and right across sections
      const waveX = Math.sin(scrollProgress * Math.PI * 3.5) * baseXOffset;
      const waveY = Math.cos(scrollProgress * Math.PI * 2.5) * 1.8;
      
      coreGroup.position.x += (waveX - coreGroup.position.x) * 0.07;
      coreGroup.position.y += (waveY - coreGroup.position.y) * 0.07;
      coreGroup.position.z = Math.sin(scrollProgress * Math.PI * 5) * 1.5;

      // Interactive mouse parallax tilt
      camera.position.x += (mouseX * 1.8 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 1.2 + 1.5 - camera.position.y) * 0.05;
      camera.lookAt(coreGroup.position.x * 0.3, coreGroup.position.y * 0.3, 0);

      // Starfield gentle cosmic flow
      starField.rotation.y = elapsed * 0.02 + scrollProgress * 0.5;

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
      className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen overflow-hidden opacity-90 transition-opacity duration-700"
    />
  );
}
