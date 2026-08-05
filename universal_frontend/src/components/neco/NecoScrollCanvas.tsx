"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useSpring, motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 240;
const KEYFRAME_STEP = 4;

const NARRATIVE_STEPS = [
  {
    range: [1, 60],
    phase: "01 · FOUNDRY CASTING PROCESS",
    title: "High-Density Iron Alloy",
    description: "Cast from SG ductile iron and grade 20 grey iron at 1,400°C into high-density precision moulds.",
    position: "left",
  },
  {
    range: [61, 120],
    phase: "02 · STRUCTURAL RIB MATRIX",
    title: "Load-Bearing Radial Geometry",
    description: "Interlocking underside rib design distributes heavy point loads evenly across the frame seat.",
    position: "right",
  },
  {
    range: [121, 180],
    phase: "03 · NON-ROCKING SILENT FIT",
    title: "Machined Seating & Gaskets",
    description: "Flawlessly machined mating surfaces prevent rattling noise and tilt failure under continuous vehicular traffic.",
    position: "left",
  },
  {
    range: [181, 240],
    phase: "04 · EMBOSSED PROOF & RATING",
    title: "Certified IS 1726 / EN 124",
    description: "Embossed anti-skid surface patterns with clear load ratings up to 40 tonnes airport extra heavy duty.",
    position: "right",
  },
];

export default function NecoScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const currentFrameRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.0005,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

  const getFrameUrl = useCallback((i: number) => {
    return `/images/neco/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
  }, []);

  useEffect(() => {
    let loadedCount = 0;

    const loadImage = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[idx]) { resolve(); return; }
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          imagesRef.current[idx] = img;
          loadedCount++;
          if (loadedCount >= 10 && !ready) setReady(true);
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const keyFrames: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += KEYFRAME_STEP) keyFrames.push(i);
    const fillFrames: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (!keyFrames.includes(i)) fillFrames.push(i);
    }

    const loadSequential = async (indices: number[]) => {
      for (const idx of indices) {
        await loadImage(idx);
      }
    };

    loadSequential(keyFrames).then(() => loadSequential(fillFrames));
  }, [getFrameUrl, ready]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const render = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameNum];
    if (!img) {
      for (let d = 1; d <= KEYFRAME_STEP + 1; d++) {
        img = imagesRef.current[frameNum - d] || imagesRef.current[frameNum + d] || null;
        if (img) break;
      }
    }
    if (!img || !img.complete) return;

    const w = canvas.width, h = canvas.height;
    const imgR = img.naturalWidth / img.naturalHeight;
    const canR = w / h;
    let dw: number, dh: number, dx: number, dy: number;
    if (canR > imgR) {
      dw = w; dh = w / imgR; dx = 0; dy = (h - dh) / 2;
    } else {
      dh = h; dw = h * imgR; dy = 0; dx = (w - dw) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  useEffect(() => {
    const unsub = frameIndex.on("change", (v) => {
      const f = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(v)));
      if (f === currentFrameRef.current) return;
      currentFrameRef.current = f;
      setCurrentFrameNum(f);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => render(f));
    });
    return () => { unsub(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [frameIndex, render]);

  useEffect(() => {
    if (ready) render(currentFrameRef.current);
  }, [ready, render]);

  // Active step finder
  const activeStep = NARRATIVE_STEPS.find(
    (s) => currentFrameNum >= s.range[0] && currentFrameNum <= s.range[1]
  );

  const rotationAngle = Math.round((currentFrameNum / TOTAL_FRAMES) * 360);

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] bg-[#070708]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#070708]">
        {/* Subtle Ember Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,87,34,0.08)_0%,_transparent_70%)] pointer-events-none" />

        {/* Top Fade Gradient */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#08090a] to-transparent z-20 pointer-events-none" />
        
        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#08090a] to-transparent z-20 pointer-events-none" />

        {/* Top Rotation HUD Status */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 px-5 py-2 rounded-full shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse" />
          <span className="font-mono-spec text-[11px] uppercase tracking-widest text-neutral-300 font-semibold">
            360° INSPECTION · {rotationAngle}° ROTATION
          </span>
        </div>

        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-5xl mx-auto z-10 opacity-95"
          style={{ imageRendering: "auto" }}
        />

        {/* Floating Narrative Cards Overlaid in Between Frames */}
        <div className="absolute inset-0 z-20 pointer-events-none max-w-6xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {activeStep && (
              <motion.div
                key={activeStep.phase}
                initial={{ opacity: 0, x: activeStep.position === "left" ? -40 : 40, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: activeStep.position === "left" ? -40 : 40, y: -10 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] as const }}
                className={`max-w-xs sm:max-w-sm bg-neutral-950/90 backdrop-blur-xl border border-neutral-800 p-6 rounded-2xl shadow-2xl pointer-events-auto ${
                  activeStep.position === "left" ? "mr-auto" : "ml-auto"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
                  <span className="font-mono-spec text-[10px] font-bold uppercase tracking-widest text-[#ff5722]">
                    {activeStep.phase}
                  </span>
                </div>
                <h4 className="font-oswald text-xl uppercase tracking-wide text-white mb-2 font-bold">
                  {activeStep.title}
                </h4>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                  {activeStep.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!ready && (
          <div className="absolute inset-0 bg-[#070708] flex items-center justify-center z-30">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#ff5722] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono-spec text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
                Loading 360° Sequence...
              </span>
            </div>
          </div>
        )}

        {/* Scroll Progress Bar & Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none">
          <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700/50">
            <div
              className="h-full bg-[#ff5722] transition-all duration-150"
              style={{ width: `${(currentFrameNum / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
          <span className="font-mono-spec text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
            Scroll to rotate casting view
          </span>
        </div>
      </div>
    </div>
  );
}
