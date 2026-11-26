import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Cyber3DScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030408, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    container.appendChild(renderer.domElement);

    // 2. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 3, 50);
    pointLightPurple.position.set(10, 10, 10);
    scene.add(pointLightPurple);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLightCyan.position.set(-10, -6, 10);
    scene.add(pointLightCyan);

    // 3. Central 3D Cyber Core Group (Grounded in Hero background)
    const coreGroup = new THREE.Group();
    // Offset on desktop to sit gracefully behind hero without blocking text
    coreGroup.position.set(isMobile ? 0 : 5, isMobile ? 2 : 1, 0);
    scene.add(coreGroup);

    // Wireframe Shield
    const icoGeo = new THREE.IcosahedronGeometry(isMobile ? 2.8 : 3.5, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      roughness: 0.2,
      metalness: 0.8,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icosahedron);

    // Inner Glowing Core
    const innerGeo = new THREE.OctahedronGeometry(isMobile ? 1.6 : 2.0, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.5,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x083344,
      emissiveIntensity: 0.5,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // Concentric Orbit Rings
    const ring1Geo = new THREE.TorusGeometry(isMobile ? 3.8 : 4.8, 0.035, 12, 60);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.45 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(isMobile ? 4.5 : 5.6, 0.03, 12, 60);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.5;
    coreGroup.add(ring2);

    // 4. Ground Grid Runway
    const gridHelper = new THREE.GridHelper(100, 40, 0xa855f7, 0x14102c);
    gridHelper.position.y = -7;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.25;
    scene.add(gridHelper);

    // 5. Starfield
    const starsCount = isMobile ? 150 : 450;
    const starGeo = new THREE.BufferGeometry();
    const starCoords = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      starCoords[i] = (Math.random() - 0.5) * 60;
      starCoords[i + 1] = (Math.random() - 0.5) * 50;
      starCoords[i + 2] = (Math.random() - 0.5) * 50 - 5;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.12,
      transparent: true,
      opacity: 0.55,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Gentle, calm rotation (not dizzying)
      coreGroup.rotation.y = elapsed * 0.25;
      coreGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15;
      ring1.rotation.z = elapsed * 0.4;
      ring2.rotation.y = -elapsed * 0.45;

      // Parallax look
      if (!isMobile) {
        camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04;
        camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.04;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
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
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden opacity-60"
    />
  );
}
