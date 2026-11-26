import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Section3DWrapper({
  children,
  className = "",
  direction = "center", // 'left' | 'right' | 'center'
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth out progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // 3D Perspective Transforms
  // Entering: starts rotated back, scaled down, translated in depth
  // In view: perfectly upright (rotateX: 0, translateZ: 0, scale: 1)
  // Exiting: tilts away into the distance
  const rotateX = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [14, 0, 0, -14]);
  
  const rotateY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    direction === "left"
      ? [-6, 0, 4]
      : direction === "right"
      ? [6, 0, -4]
      : [0, 0, 0]
  );

  const translateZ = useTransform(smoothProgress, [0, 0.5, 1], [-140, 0, -140]);
  const translateX = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    direction === "left" ? [-40, 0, 30] : direction === "right" ? [40, 0, -30] : [0, 0, 0]
  );
  
  const scale = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [0.92, 1, 1, 0.93]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.4]);

  return (
    <div
      ref={ref}
      style={{ perspective: "1400px" }}
      className="w-full overflow-visible"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          translateX,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className={`w-full transition-shadow duration-500 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
