"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Phone,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Award,
  Zap,
  Shield,
} from "lucide-react";
import SpecTable from "@/components/neco/SpecTable";

/* ─────────────────────────────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─────────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────────── */
const LOAD_CLASSES = [
  {
    code: "LD 400",
    load: "1.5t",
    title: "Light Duty (A15)",
    material: "Grey Iron CI Grade 20",
    use: "Pedestrian walkways, garden areas, residential footpaths, cycle tracks.",
    color: "from-slate-700/30 to-slate-800/10",
    accent: "text-slate-300",
    border: "border-slate-700/50",
  },
  {
    code: "MD 400",
    load: "5.0t",
    title: "Medium Duty (B125)",
    material: "Ductile SG Iron GGG50",
    use: "Car parks, housing society driveways, shopping complex light vehicle zones.",
    color: "from-sky-900/30 to-slate-800/10",
    accent: "text-sky-400",
    border: "border-sky-700/30",
  },
  {
    code: "HD 400",
    load: "25.0t",
    title: "Heavy Duty (D400)",
    material: "Ductile SG Iron GGG50",
    use: "City arterial roads, commercial expressways, bus terminals, heavy traffic.",
    color: "from-blue-900/30 to-slate-800/10",
    accent: "text-blue-400",
    border: "border-blue-700/30",
  },
  {
    code: "EHD 400",
    load: "40.0t",
    title: "Extra Heavy Duty (F900)",
    material: "Ductile SG Iron GGG50",
    use: "International airports, container yards, seaports, industrial plant roads.",
    color: "from-indigo-900/30 to-slate-800/10",
    accent: "text-indigo-400",
    border: "border-indigo-700/30",
  },
];

// Cover types with descriptions and images from the available frame set
const COVER_TYPES = [
  {
    id: "circular",
    label: "Circular Covers",
    subtitle: "Round Manhole Access",
    description:
      "The industry-standard round design eliminates cover displacement under load — no rotational alignment required. Available in 500 mm and 600 mm clear opening diameters across all load classes.",
    specs: ["500 mm & 600 mm ⌀", "LD to EHD load classes", "Hinged & non-hinged", "Anti-theft locking options"],
    images: [
      "/images/neco/ezgif-frame-220.jpg",
      "/images/neco/ezgif-frame-215.jpg",
      "/images/neco/ezgif-frame-200.jpg",
    ],
    badge: "Most Popular",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    aspect: "aspect-square",
    shape: "Circular",
    shapeIcon: "⭕",
  },
  {
    id: "square",
    label: "Square Covers",
    subtitle: "Standard Box Access",
    description:
      "Square frames provide uniform loading in four directions. Ideal for municipal utility access in commercial zones, housing developments, and paved areas requiring a clean, geometric profile.",
    specs: ["450 × 450 mm", "600 × 600 mm", "LD to HD load classes", "Solid & perforated lids"],
    images: [
      "/images/neco/ezgif-frame-120.jpg",
      "/images/neco/ezgif-frame-130.jpg",
      "/images/neco/ezgif-frame-110.jpg",
    ],
    badge: "Heavy Duty",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    aspect: "aspect-square",
    shape: "Square",
    shapeIcon: "⬛",
  },
  {
    id: "rectangular",
    label: "Rectangular Covers",
    subtitle: "Wide-Span Access",
    description:
      "Extended rectangular frames for wide utility corridors, cable trenches, and dual-compartment inspection chambers. Designed for heavy traffic areas requiring greater clearance width.",
    specs: ["900 × 600 mm", "Custom sizes available", "HD (D400) rated", "Hinged double-lid options"],
    images: [
      "/images/neco/ezgif-frame-050.jpg",
      "/images/neco/ezgif-frame-060.jpg",
      "/images/neco/ezgif-frame-040.jpg",
    ],
    badge: "Industrial",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    aspect: "aspect-[4/3]",
    shape: "Rectangular",
    shapeIcon: "▬",
  },
  {
    id: "gratings",
    label: "Gratings & Gullies",
    subtitle: "Drainage & Channel Covers",
    description:
      "Open-grid ductile iron gratings for surface drainage, stormwater channels, and gully pots. Heavy-duty bars resist deformation under continuous vehicular load while maximising hydraulic flow.",
    specs: ["300 × 300 mm to 500 × 500 mm", "MD to EHD load classes", "Channel & inlet grates", "Galvanised option available"],
    images: [
      "/images/neco/ezgif-frame-001.jpg",
      "/images/neco/ezgif-frame-010.jpg",
      "/images/neco/ezgif-frame-020.jpg",
    ],
    badge: "Drainage",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    aspect: "aspect-square",
    shape: "Grating",
    shapeIcon: "⠿",
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "IS 1726 / EN 124 Certified",
    desc: "Every cover is tested and certified to Indian and European standards for load-bearing performance.",
  },
  {
    icon: Zap,
    title: "Ductile SG Iron GGG50",
    desc: "Precision-poured at 1,400°C for superior strength, anti-brittleness, and longevity under impact fatigue.",
  },
  {
    icon: Award,
    title: "Kerala Exclusive Dealer",
    desc: "Universal Sanitary House is the sole authorised NECO distributor in Kerala, ensuring genuine supply.",
  },
];

/* ─────────────────────────────────────────────────────────────────────
   Cover Type Card (interactive)
───────────────────────────────────────────────────────────────────── */
function CoverTypeCard({ cover, index }: { cover: (typeof COVER_TYPES)[0]; index: number }) {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      variants={fadeUp}
      className="group relative bg-[#0d1628] border border-slate-800/80 rounded-3xl overflow-hidden hover:border-slate-700 transition-all duration-500 shadow-2xl"
    >
      {/* Image carousel area */}
      <div className={`relative w-full ${cover.aspect} overflow-hidden bg-slate-950`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={cover.images[active]}
            alt={`${cover.label} - view ${active + 1}`}
            className="w-full h-full object-cover opacity-90"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1628] via-[#0d1628]/20 to-transparent" />

        {/* Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${cover.badgeColor}`}>
          {cover.badge}
        </div>

        {/* Shape label top-right */}
        <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/60 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
          <span className="text-xs">{cover.shapeIcon}</span>
          <span className="font-mono text-[10px] text-slate-300 font-bold uppercase tracking-wider">{cover.shape}</span>
        </div>

        {/* Thumbnail switcher dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {cover.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "bg-white scale-125" : "bg-slate-500 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Thumbnail strip (hover) */}
        <div className="absolute bottom-10 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {cover.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-1 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                i === active ? "border-sky-400" : "border-slate-700 hover:border-slate-500"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-400 block mb-1">
            {cover.subtitle}
          </span>
          <h3 className="font-playfair text-2xl sm:text-3xl text-white font-medium leading-tight">
            {cover.label}
          </h3>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5 font-light">
          {cover.description}
        </p>

        {/* Spec tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {cover.specs.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-slate-800/70 border border-slate-700/60 px-2.5 py-1 rounded-md"
            >
              <ChevronRight size={9} className="text-sky-400" />
              {s}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20NECO%20${encodeURIComponent(cover.label)}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-400 hover:text-sky-300 transition-colors group/link"
        >
          <MessageSquare size={13} />
          Enquire about {cover.shape}
          <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────── */
export default function NecoPage() {
  return (
    <div className="bg-[#0b1120] text-slate-100 min-h-screen font-sans selection:bg-sky-500/30 selection:text-white">

      {/* ━━━ NAVBAR ━━━ */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0b1120]/90 backdrop-blur-md border-b border-slate-800/80 py-3.5 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/neco" className="flex items-center gap-3">
            <span className="font-oswald text-2xl font-bold tracking-wider text-white uppercase">NECO</span>
            <span className="w-px h-5 bg-slate-700" />
            <span className="font-sans text-[10px] uppercase tracking-widest text-sky-400 font-bold hidden sm:inline-block">
              Infrastructure Division
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 font-sans text-xs uppercase tracking-widest text-slate-300 font-medium">
            <a href="#overview" className="hover:text-sky-400 transition-colors">Overview</a>
            <a href="#cover-types" className="hover:text-sky-400 transition-colors">Cover Types</a>
            <a href="#load-guide" className="hover:text-sky-400 transition-colors">Load Ratings</a>
            <a href="#spec-table" className="hover:text-sky-400 transition-colors">Specifications</a>
            <Link href="/" className="text-slate-500 hover:text-white transition-colors flex items-center gap-1">
              Main Site <ArrowUpRight size={11} />
            </Link>
          </nav>

          <a
            href="https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20NECO%20cast%20iron%20manhole%20covers."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:brightness-110 text-white font-sans text-xs uppercase tracking-wider transition-all shadow-md rounded-full font-bold"
          >
            <MessageSquare size={13} />
            <span className="hidden sm:inline">Get Factory Quote</span>
            <span className="sm:hidden">Quote</span>
          </a>
        </div>
      </header>

      {/* ━━━ 1 · HERO ━━━ */}
      <section id="overview" className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 bg-[#0b1120] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_rgba(14,165,233,0.10)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Top tag line */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
                Kerala&apos;s Exclusive NECO Dealer
              </span>
            </div>
          </div>

          {/* Giant headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16">
            <div className="lg:col-span-8">
              <h1 className="font-oswald text-6xl sm:text-8xl md:text-[110px] lg:text-[120px] font-bold uppercase tracking-tight text-white leading-[0.88]">
                NECO
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400">
                  COVER
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-slate-300 text-base md:text-lg leading-[1.75] font-light max-w-sm">
                Authorised Kerala supplier of high-strength grey and ductile iron manhole covers, drainage gratings, and gully frames — engineered to IS 1726 & EN 124.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-7">
                <a
                  href="https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20NECO%20cast%20iron%20manhole%20covers."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold rounded-full hover:brightness-110 transition-all shadow-lg"
                >
                  <MessageSquare size={14} />
                  Enquire on WhatsApp
                </a>
                <a href="#cover-types"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all"
                >
                  View Cover Types
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Hero image strip + stat cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main product image */}
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[16/8] bg-slate-950 border border-slate-800 shadow-2xl group">
              <img
                src="/images/neco/ezgif-frame-220.jpg"
                alt="NECO Cast Iron Manhole Cover — Heavy Duty"
                className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120]/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 bg-slate-950/80 backdrop-blur-md border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="font-sans text-[10px] uppercase tracking-widest text-white font-bold">IS 1726 / EN 124 Certified</span>
              </div>
              <div className="absolute top-5 right-5 bg-slate-950/80 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-xl">
                <span className="font-mono text-xs text-sky-400 font-bold">NECO 525DIA 75KG</span>
              </div>
            </div>

            {/* Right stat column */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 bg-[#0d1628] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-400">Max Load Rating</span>
                <div>
                  <div className="font-playfair text-7xl text-white font-light leading-none">
                    40<span className="text-sky-400">t</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-2 font-light">Extra Heavy Duty (F900) — Airport & Container Yard grade.</p>
                </div>
              </div>
              <div className="flex-1 bg-[#0d1628] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Load Spectrum</span>
                <div>
                  <div className="font-playfair text-4xl text-white font-light leading-none">1.5t – 40t</div>
                  <p className="text-slate-400 text-xs mt-2 font-light">LD to EHD — complete range for every application.</p>
                </div>
              </div>
              <div className="flex-1 bg-[#0d1628] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Cover Types</span>
                <div>
                  <div className="font-playfair text-4xl text-sky-400 font-light leading-none">4+</div>
                  <p className="text-slate-400 text-xs mt-2 font-light">Circular · Square · Rectangular · Gratings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 2 · FEATURES STRIP ━━━ */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="py-10 px-6 md:px-12 bg-slate-950 border-y border-slate-800/60"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={fadeUp} className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <f.icon size={18} className="text-sky-400" />
              </div>
              <div>
                <h3 className="font-sans text-sm font-bold text-white mb-1">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ━━━ 3 · COVER TYPES GALLERY ━━━ */}
      <motion.section
        id="cover-types"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="py-24 md:py-36 px-6 md:px-12 bg-[#0b1120] border-b border-slate-800/80"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-sky-400 uppercase mb-3 block">
                Product Range
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
                Cover types for every<br />
                <span className="italic text-sky-400 font-normal">infrastructure need.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-xs mt-6 md:mt-0 font-light leading-relaxed md:text-right">
              From pedestrian walkways to international airports — NECO manufactures the right cover for every load, shape, and application.
            </p>
          </motion.div>

          {/* Cover type cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {COVER_TYPES.map((cover, i) => (
              <CoverTypeCard key={cover.id} cover={cover} index={i} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ━━━ 4 · METALLURGY SECTION ━━━ */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="py-24 md:py-36 px-6 md:px-12 bg-[#0d1424] border-b border-slate-800/80"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 text-left">
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-sky-400 uppercase mb-3 block">
              Foundry Metallurgy
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white font-light leading-tight mb-6">
              Precision-cast for<br />
              <span className="italic font-normal text-sky-400">continuous heavy fatigue.</span>
            </h2>
            <p className="text-slate-300 text-base leading-[1.8] font-light mb-8">
              Poured at 1,400°C into high-density SG ductile iron (Grade GGG50) and grey iron (Grade CI 20). Formulated to resist impact, wear, and dynamic traffic load without cracking or displacement.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Matched Frame & Cover Seating",
                "Non-Rocking Silent Gasket Fit",
                "Anti-Theft Lockable Hinges",
                "Bitumen Protection Coating",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-sans font-medium text-slate-200">
                  <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-950 border border-slate-800 shadow-2xl group col-span-1">
              <img src="/images/neco/ezgif-frame-120.jpg" alt="NECO Foundry Detail"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-slate-800 shadow-xl group">
                <img src="/images/neco/ezgif-frame-200.jpg" alt="NECO Cover Close-up"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-slate-800 shadow-xl group">
                <img src="/images/neco/ezgif-frame-050.jpg" alt="NECO Cover Detail"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-sm border border-slate-700/60 px-2.5 py-1 rounded-lg">
                  <span className="font-sans text-[9px] uppercase tracking-widest text-sky-400 font-bold">IS 1726 / EN 124</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ━━━ 5 · LOAD RATING CARDS ━━━ */}
      <motion.section
        id="load-guide"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-24 md:py-36 px-6 md:px-12 bg-[#0b1120] border-b border-slate-800/80"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-sky-400 uppercase mb-3 block">
                Load Rating Spectrum
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl text-white font-light">
                Engineered for every traffic load.
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
              Select covers based on location traffic ratings to ensure maximum safety and zero structural failure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LOAD_CLASSES.map((card) => (
              <motion.div
                key={card.code}
                variants={fadeUp}
                className={`relative bg-gradient-to-br ${card.color} border ${card.border} p-7 rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-slate-800/20 -translate-y-20 translate-x-20 blur-2xl" />
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-slate-400">{card.code}</span>
                    <span className={`font-playfair text-4xl font-light ${card.accent}`}>{card.load}</span>
                  </div>
                  <h3 className="font-playfair text-xl text-white font-medium mb-3">{card.title}</h3>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed font-light mb-6">{card.use}</p>
                </div>
                <div className="pt-4 border-t border-slate-700/50">
                  <span className={`font-sans text-[10px] uppercase tracking-wider font-bold block ${card.accent}`}>
                    {card.material}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ━━━ 6 · TECHNICAL SPECIFICATIONS TABLE ━━━ */}
      <motion.section
        id="spec-table"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="py-24 md:py-36 px-6 md:px-12 bg-[#0d1424] border-b border-slate-800/80"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14 max-w-2xl">
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-sky-400 uppercase mb-3 block">
              Technical Specifications
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white font-light mb-4">
              Exact dimensions for specification.
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
              Clear opening sizes, frame depths, and load ratings across circular, square, rectangular, and grating configurations.
            </p>
          </div>
          <SpecTable darkTheme={true} />
        </div>
      </motion.section>

      {/* ━━━ 7 · QUOTE CTA ━━━ */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="py-24 md:py-36 px-6 md:px-12 bg-[#0b1120]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="relative bg-gradient-to-br from-[#0d1628] via-[#0b1120] to-[#0d1628] border border-slate-800 rounded-3xl p-10 sm:p-16 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(14,165,233,0.07)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-sky-400 uppercase mb-3 block">
                  Direct Dealer Pricing
                </span>
                <h2 className="font-playfair text-4xl md:text-5xl text-white font-light mb-6 leading-tight">
                  Get an instant factory quote<br />
                  <span className="italic text-sky-400">for your project.</span>
                </h2>
                <p className="text-slate-300 text-base leading-relaxed font-light mb-8 max-w-lg">
                  Send us your project drawings or clear opening requirements — our team will recommend the exact load class and cover type, and provide competitive dealer pricing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20NECO%20cast%20iron%20manhole%20covers."
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold rounded-full hover:brightness-110 transition-all shadow-lg"
                  >
                    <MessageSquare size={15} />
                    Enquire on WhatsApp
                  </a>
                  <a
                    href="tel:+917356863985"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all"
                  >
                    <Phone size={15} />
                    Call +91 7356 863985
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-slate-800 shadow-xl group">
                  <img src="/images/neco/ezgif-frame-220.jpg" alt="NECO Cover"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-sky-400 block">Circular</span>
                    <span className="text-[10px] font-mono text-white">D400 · 600mm</span>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-slate-800 shadow-xl group mt-6">
                  <img src="/images/neco/ezgif-frame-120.jpg" alt="NECO Square Cover"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-sky-400 block">Square</span>
                    <span className="text-[10px] font-mono text-white">B125 · 600×600</span>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-slate-800 shadow-xl group">
                  <img src="/images/neco/ezgif-frame-050.jpg" alt="NECO Rectangular Cover"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-sky-400 block">Rectangular</span>
                    <span className="text-[10px] font-mono text-white">D400 · 900×600</span>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-slate-800 shadow-xl group mt-6">
                  <img src="/images/neco/ezgif-frame-001.jpg" alt="NECO Grating"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-sky-400 block">Grating</span>
                    <span className="text-[10px] font-mono text-white">E600 · 450×450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16 px-6 sm:px-12 font-sans text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <span className="font-oswald text-2xl font-bold text-white uppercase tracking-wider block mb-2">
              NECO INFRASTRUCTURE
            </span>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-light mb-4">
              Kerala&apos;s exclusive distributor for NECO ductile and grey iron manhole covers, gully gratings, and municipal drainage solutions.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 text-[10px] text-sky-400 uppercase tracking-wider font-bold rounded-md">
              IS 1726 / EN 124 Certified Supply
            </div>
          </div>

          <div>
            <span className="font-bold text-white uppercase tracking-widest block mb-4">Dealer Hub</span>
            <p className="text-slate-400 leading-relaxed font-light mb-2">
              Universal Sanitary House<br />
              NH Bypass, Edappally, Kochi<br />
              Kerala 682024
            </p>
            <p className="text-slate-300 font-mono">Ph: +91 7356 863985</p>
          </div>

          <div>
            <span className="font-bold text-white uppercase tracking-widest block mb-4">Quick Links</span>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#cover-types" className="hover:text-white transition-colors">Cover Types</a></li>
              <li><a href="#load-guide" className="hover:text-white transition-colors">Load Classes</a></li>
              <li><a href="#spec-table" className="hover:text-white transition-colors">Spec Tables</a></li>
              <li><Link href="/" className="hover:text-white transition-colors">Universal Main Site</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
          <span>© {new Date().getFullYear()} NECO Infrastructure Division · Universal Sanitary House. All rights reserved.</span>
          <span>Kerala Sole Authorised Dealer</span>
        </div>
      </footer>
    </div>
  );
}
