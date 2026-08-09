"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  MessageSquare, Phone, ArrowRight, CheckCircle2, ShieldCheck, Layers, Scale,
  Truck, FileText, ArrowUpRight, Menu, X, ChevronDown, Award, Zap, Droplets,
  Clock, Target, Building2, Plane, Ship, Factory, MapPin, LayoutGrid, Cpu,
  Footprints, Car, TrendingUp, Star, Plus, Minus, Play
} from "lucide-react";
import SpecTable from "@/components/neco/SpecTable";

// ─── Types ──────────────────────────────────────────────────────────────────

interface LoadClass {
  code: string;
  en124: string;
  load: string;
  loadNum: string;
  title: string;
  duty: string;
  material: string;
  use: string;
  icon: React.ReactNode;
  color: string;
}

interface ProductCard {
  title: string;
  material: string;
  loadClass: string;
  applications: string[];
  image: string;
  badge: string;
  badgeColor: string;
}

interface FaqItem {
  q: string;
  a: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const LOAD_CLASSES: LoadClass[] = [
  {
    code: "CLASS A15",
    en124: "A15",
    load: "15 kN (1.5t)",
    loadNum: "15",
    title: "Light Duty",
    duty: "Pedestrian & Garden",
    material: "Grey Iron CI Grade 20 / Ductile Iron",
    use: "Pedestrian walkways, garden areas, residential footpaths, cycle tracks.",
    icon: <Footprints size={24} />,
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    code: "CLASS B125",
    en124: "B125",
    load: "125 kN (12.5t)",
    loadNum: "125",
    title: "Medium Duty",
    duty: "Light Vehicle Traffic",
    material: "Ductile Iron SG500/7 (GGG50)",
    use: "Car parks, housing society driveways, shopping complex light vehicle zones, footways.",
    icon: <Car size={24} />,
    color: "from-sky-500/20 to-sky-500/5",
  },
  {
    code: "CLASS C250",
    en124: "C250",
    load: "250 kN (25.0t)",
    loadNum: "250",
    title: "Medium Heavy Duty",
    duty: "Kerbside & Channels",
    material: "Ductile Iron SG500/7 (GGG50)",
    use: "Service station forecourts, kerbside drainage channels, roadside parking spaces.",
    icon: <Truck size={24} />,
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    code: "CLASS D400",
    en124: "D400",
    load: "400 kN (40.0t)",
    loadNum: "400",
    title: "Heavy Duty",
    duty: "Main Carriageways",
    material: "Ductile Iron SG500/7 (GGG50)",
    use: "City arterial roads, commercial expressways, bus terminals, heavy traffic loading.",
    icon: <TrendingUp size={24} />,
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    code: "CLASS E600",
    en124: "E600",
    load: "600 kN (60.0t)",
    loadNum: "600",
    title: "Extra Heavy Duty",
    duty: "Industrial & Freight",
    material: "Ductile Iron SG500/7 (GGG50)",
    use: "Industrial plant roads, high wheel load areas, docks, container freight yards.",
    icon: <Factory size={24} />,
    color: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    code: "CLASS F900",
    en124: "F900",
    load: "900 kN (90.0t)",
    loadNum: "900",
    title: "Extreme Duty",
    duty: "Aviation & Seaports",
    material: "Ductile Iron SG500/7 (GGG50)",
    use: "International airport taxiways & pavements, container ports, extreme load docks.",
    icon: <Plane size={24} />,
    color: "from-rose-500/20 to-rose-500/5",
  },
];

const PRODUCTS: ProductCard[] = [
  {
    title: "NECO 525DIA Circular Cover in Frame",
    material: "Ductile SG Iron SG500/7 (75kg)",
    loadClass: "Class D400 · 400 kN (40t)",
    applications: ["Arterial Roads", "Expressways", "Bus Terminals"],
    image: "/images/neco/rounded_manhole_cover_nobg.png",
    badge: "D400",
    badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/30",
  },
  {
    title: "Inspection Cover (300×600)",
    material: "Grey Cast Iron CI Grade 20 (25kg)",
    loadClass: "Class A15 · 15 kN (1.5t)",
    applications: ["Footpaths", "Residential Pits", "Cable Trenches"],
    image: "/images/neco/product_1_transparent.png",
    badge: "A15",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    title: "Grating with Frame",
    material: "Ductile SG Iron SG500/7",
    loadClass: "Class B125 · 125 kN (12.5t)",
    applications: ["Parking Lots", "Driveways", "Pedestrian Plazas"],
    image: "/images/neco/product_2_transparent.png",
    badge: "B125",
    badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
  },
  {
    title: "Square Slotted Drainage Grating",
    material: "Ductile SG Iron SG500/7",
    loadClass: "Class C250 · 250 kN (25t)",
    applications: ["Kerbside Channels", "Commercial Grounds", "Pathways"],
    image: "/images/neco/product_3_transparent.png",
    badge: "C250",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
  {
    title: "600DIA Cover in Square Frame",
    material: "Ductile SG Iron SG500/7 (95kg)",
    loadClass: "Class D400 · 400 kN (40t)",
    applications: ["Heavy Freight Roads", "City Junctions", "Highways"],
    image: "/images/neco/square_manhole_cover_nobg.png",
    badge: "D400",
    badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/30",
  },
  {
    title: "Heavy Duty Road Gully Grating",
    material: "Ductile SG Iron SG500/7",
    loadClass: "Class E600 · 600 kN (60t)",
    applications: ["Highways", "Industrial Plants", "Port Corridors"],
    image: "/images/neco/product_5_transparent.png",
    badge: "E600",
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
  },
];

const BENEFITS = [
  { icon: <Award size={28} />, title: "EN 124-2 Certified", desc: "Fully compliant with EN 124-2, IS 1726, IS 1865, and ISO 1083 standards." },
  { icon: <Scale size={28} />, title: "High Load Capacity", desc: "Engineered for load classes A15 (15kN) to F900 (900kN) for light to extreme duty." },
  { icon: <ShieldCheck size={28} />, title: "Anti-Theft Hinge Design", desc: "Hinged captive construction eliminates theft risks and accidental displacement." },
  { icon: <Clock size={28} />, title: "High Ductility & Safety", desc: "500 N/mm² tensile strength prevents sudden brittle fracture under heavy dynamic loads." },
  { icon: <Target size={28} />, title: "Precision Seating & Anti-Skid", desc: "Raised checker design gives superior grip, while machined seating eliminates rattling." },
  { icon: <Building2 size={28} />, title: "Lightweight & Cost-Effective", desc: "High strength-to-weight ratio cuts transport, installation, and lifecycle maintenance costs." },
];


const APPLICATIONS = [
  { icon: <TrendingUp size={32} />, label: "Arterial Roads", color: "text-sky-400" },
  { icon: <Building2 size={32} />, label: "Municipal Infrastructure", color: "text-emerald-400" },
  { icon: <Plane size={32} />, label: "Airports", color: "text-violet-400" },
  { icon: <Ship size={32} />, label: "Ports & Harbours", color: "text-orange-400" },
  { icon: <Factory size={32} />, label: "Industrial Plants", color: "text-rose-400" },
  { icon: <LayoutGrid size={32} />, label: "Commercial Buildings", color: "text-cyan-400" },
  { icon: <MapPin size={32} />, label: "Highways", color: "text-amber-400" },
  { icon: <Cpu size={32} />, label: "Smart Cities", color: "text-teal-400" },
];

const FAQS: FaqItem[] = [
  { q: "What is the difference between EN124 classes A15, B125, D400, and F900?", a: "EN124 classifies manhole covers by the maximum load they can sustain. A15 (1.5 tonnes) is for pedestrian areas, B125 (12.5 tonnes) for car parks and light vehicles, D400 (40 tonnes) for roads and urban traffic, and F900 (90 tonnes) for airports and container terminals. NECO covers are available across all four classes." },
  { q: "What is the difference between Grey Cast Iron and Ductile Iron?", a: "Grey cast iron (CI Grade 20) is a traditional iron alloy used for light duty applications. Ductile iron (SG Iron GGG50) has higher tensile strength, improved impact resistance, and superior fatigue life, making it ideal for heavy-duty and extra-heavy-duty applications. NECO's heavy and extra heavy duty covers use GGG50 ductile iron." },
  { q: "How do I select the correct load class for my project?", a: "Load class selection depends on the installation zone and expected traffic. Use A15 for footpaths, B125 for residential and parking zones, D400 for public roads and commercial areas, and F900 for airports, ports, and industrial heavy freight zones. Our technical team can guide you based on your project specifications." },
  { q: "Are NECO covers lockable to prevent theft and unauthorized access?", a: "Yes. NECO offers anti-theft locking hinges and captive cover designs that prevent unauthorized removal. The locking mechanism is accessed with a standard manhole key, making routine maintenance easy while securing against theft." },
  { q: "What is the bitumen coating for and is it standard?", a: "The bitumen protection coating is applied to all NECO covers and frames as a standard feature. It provides additional corrosion resistance in chemically aggressive environments such as sewage, stormwater, and coastal areas, significantly extending service life." },
  { q: "Can NECO supply custom clear opening sizes?", a: "Yes. Beyond the standard 500 mm and 600 mm circular openings, NECO can manufacture custom clear openings, double-seal designs, square and rectangular formats, and hinged access frames to exact project specifications. Contact our team with drawings for a customised quotation." },
  { q: "What is a non-rocking silent fit and why does it matter?", a: "A non-rocking silent fit means the cover is precision-machined to seat perfectly within its frame without any movement under vehicle loads. Poorly fitted covers rock, create noise, and ultimately fail prematurely. NECO's machined mating surfaces and rubber gasket options eliminate movement and extend product life significantly." },
  { q: "What are the lead times and delivery areas for NECO covers?", a: "NECO covers are available for immediate dispatch from our Kerala dealer stock for standard sizes. Custom orders typically require 2–4 weeks. We supply across Kerala and can coordinate pan-India delivery. Contact us on WhatsApp or phone for exact stock availability and delivery timelines." },
];

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) {
      motionValue.set(target);
    }
  }, [inView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplay(Math.round(v).toString());
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Particle System ─────────────────────────────────────────────────────────

function HeroParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 6 + 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-sky-400/30"
          style={{
            left: `${p.x}%`,
            bottom: "0%",
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, typeof window !== "undefined" ? -window.innerHeight : -800],
            opacity: [0, 0.7, 0.7, 0],
            x: [0, (Math.random() - 0.5) * 80],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}


// ─── FAQ Accordion ───────────────────────────────────────────────────────────

function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? "border-sky-500/40 bg-sky-500/5" : "border-slate-800 bg-slate-900/60 hover:border-slate-700"}`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
            aria-expanded={open === i}
          >
            <span className="font-sans text-sm sm:text-base font-semibold text-slate-100 group-hover:text-white transition-colors leading-snug">
              {faq.q}
            </span>
            <span className={`shrink-0 p-1 rounded-full border transition-all duration-300 ${open === i ? "bg-sky-500/20 border-sky-500/40 text-sky-400 rotate-0" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
              {open === i ? <Minus size={16} /> : <Plus size={16} />}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed font-light border-t border-slate-800/80 pt-4">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Section Label ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-sans font-bold tracking-[0.25em] text-sky-400 uppercase mb-3">
      <span className="w-4 h-px bg-sky-400/60" />
      {children}
      <span className="w-4 h-px bg-sky-400/60" />
    </span>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function NecoPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ──────────────── JSON-LD Structured Data ──────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "NECO Ductile & Grey Iron Manhole Covers",
            "description": "EN124-certified ductile and grey iron manhole covers for roads, airports, ports, and municipal infrastructure. Available in A15, B125, D400, F900 load classes.",
            "brand": { "@type": "Brand", "name": "NECO" },
            "seller": {
              "@type": "Organization",
              "name": "Universal Sanitary House",
              "telephone": "+914842351581",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Post Box No. 3674, Jew Street",
                "addressLocality": "Ernakulam, Kochi",
                "addressRegion": "Kerala",
                "postalCode": "682035",
                "addressCountry": "IN"
              }
            }
          })
        }}
      />

      <div className="bg-[#0b1120] text-slate-100 min-h-screen font-sans selection:bg-sky-500/30 selection:text-white">

        {/* Skip to content */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[300] bg-sky-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
          Skip to main content
        </a>

        {/* ════════════════════════════════════════════════════════════
            NAVBAR
        ════════════════════════════════════════════════════════════ */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
            ? "bg-[#0b1120]/95 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl shadow-black/40"
            : "bg-transparent py-5"
            }`}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
            {/* Logo */}
            <Link href="/neco" className="flex items-center gap-3 group" aria-label="NECO Infrastructure Division">
              <div className="flex items-center gap-2.5">
                <span className="font-oswald text-2xl font-bold tracking-wider text-white uppercase">NECO</span>
                <span className="w-px h-6 bg-slate-700" />
                <span className="font-sans text-[10px] uppercase tracking-widest text-sky-400 font-bold hidden sm:inline-block">
                  Infrastructure Division
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest text-slate-400 font-semibold" aria-label="Page navigation">
              {[
                { label: "Overview", href: "#hero" },
                { label: "Products", href: "#products" },
                { label: "Load Guide", href: "#load-guide" },
                { label: "Specifications", href: "#spec-table" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover:text-sky-400 transition-colors duration-200 hover:tracking-[0.3em]"
                >
                  {item.label}
                </a>
              ))}
              <Link href="/" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                Universal <ArrowUpRight size={11} />
              </Link>
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20NECO%20cast%20iron%20manhole%20covers."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:brightness-110 text-white font-sans text-[11px] uppercase tracking-widest transition-all shadow-lg rounded-full font-bold"
              >
                <MessageSquare size={13} />
                Get Quote
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-[#0d1424]/98 backdrop-blur-xl border-t border-slate-800 px-6 py-6 space-y-4"
              >
                {[
                  { label: "Overview", href: "#hero" },
                  { label: "Products", href: "#products" },
                  { label: "Load Guide", href: "#load-guide" },
                  { label: "Specifications", href: "#spec-table" },
                  { label: "FAQ", href: "#faq" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-sans text-sm font-semibold text-slate-300 hover:text-sky-400 uppercase tracking-widest transition-colors py-2 border-b border-slate-800/60"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20NECO%20cast%20iron%20manhole%20covers."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl mt-4"
                >
                  <MessageSquare size={15} /> Get Factory Quote
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main id="main-content">

          {/* ════════════════════════════════════════════════════════════
              1 · HERO SECTION
          ════════════════════════════════════════════════════════════ */}
          <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="NECO Ductile and Grey Iron Manhole Covers Hero"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/neco/hero-bg.png')" }}
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-[#0b1120]/75" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120]/30 via-transparent to-[#0b1120]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,128,190,0.18)_0%,transparent_60%)]" />

            {/* Particle System */}
            <HeroParticles />

            {/* Grid Lines */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-32 md:py-40 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left: Text Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-left"
              >
                <motion.div variants={fadeUp}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/10 border border-sky-500/30 rounded-full text-sky-400 font-sans text-[11px] uppercase tracking-widest font-bold mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    Authorised Kerala Dealer · IS 1726 / EN 124
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="font-oswald text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-white leading-[0.9] mb-6"
                >
                  NECO Ductile<br />
                  <span className="neco-gradient-text">&amp; Grey Iron</span><br />
                  Manhole Covers
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-slate-300 text-base md:text-lg leading-[1.85] font-light mb-8 max-w-lg"
                >
                  EN124-certified cast iron manhole covers engineered for Kerala's roads, airports, ports, and smart city infrastructure. Available across all four load classes from 1.5t to 40t.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#products"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:brightness-110 text-white font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-xl shadow-sky-900/30 group"
                  >
                    <span>Explore Products</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20request%20a%20quote%20for%20NECO%20manhole%20covers."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-500 text-slate-200 font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all backdrop-blur-sm"
                  >
                    <MessageSquare size={16} />
                    Request Quote
                  </a>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-slate-800/60"
                >
                  {[
                    { label: "Max Load Rating", value: "40", suffix: "t" },
                    { label: "Load Classes", value: "4", suffix: "" },
                    { label: "Years Experience", value: "50", suffix: "+" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="font-oswald text-3xl font-bold text-white">
                        <AnimatedCounter target={parseInt(stat.value)} suffix={stat.suffix} />
                      </div>
                      <div className="font-sans text-[10px] uppercase tracking-widest text-slate-400 mt-0.5 font-semibold">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: Floating Product Showcase (Single Clean Card) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-md">
                  {/* Glow ring background */}
                  <div className="absolute inset-0 rounded-3xl bg-sky-500/15 animate-neco-glow blur-3xl scale-105" />

                  {/* ── SINGLE MAIN HERO CARD ── */}
                  <div className="animate-neco-float relative z-20 w-full aspect-square bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden group">
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 animate-neco-shimmer z-20 pointer-events-none" />
                    {/* Product Image */}
                    <div className="w-full h-full flex items-center justify-center p-6">
                      <img
                        src="/images/neco/square_manhole_cover_nobg.png"
                        alt="NECO Square Frame Ductile Iron Manhole Cover D400"
                        className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    {/* Top Badge */}
                    <div className="absolute top-5 left-5 flex items-center gap-2 neco-glass px-3 py-1.5 rounded-full z-30">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-sky-300">IS 1726 / EN 124-2</span>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-slate-700/60 bg-slate-950/80 backdrop-blur-md z-30">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="font-sans text-[9px] uppercase tracking-widest text-slate-400 font-bold block mb-0.5">Model</span>
                          <span className="font-sans text-sm text-white font-bold">NECO 525DIA Class D400</span>
                        </div>
                        <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider rounded-full">D400 · 400 kN</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge card - Top Right */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -right-6 top-8 neco-glass rounded-2xl px-4 py-2.5 shadow-2xl border border-slate-700/70 hidden sm:flex items-center gap-3 z-30"
                  >
                    <div className="text-right">
                      <div className="text-white font-oswald text-xl font-bold leading-none">900<span className="text-sky-400 text-sm">kN</span></div>
                      <div className="text-slate-400 text-[8px] uppercase tracking-widest font-bold mt-0.5">Max Load</div>
                    </div>
                  </motion.div>

                  {/* Floating badge card - Bottom Left */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="absolute -left-6 bottom-16 neco-glass rounded-2xl px-4 py-2.5 shadow-2xl border border-slate-700/70 hidden sm:flex items-center gap-2.5 z-30"
                  >
                    <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold leading-none">EN 124-2 Certified</div>
                      <div className="text-slate-400 text-[8px] uppercase tracking-widest font-bold mt-0.5">IS 1726 / IS 1865</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
              <span className="font-sans text-[10px] uppercase tracking-widest">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </motion.div>
          </section>

          {/* ════════════════════════════════════════════════════════════
              2 · ABOUT NECO
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="py-24 md:py-36 px-6 md:px-10 bg-[#0d1424] border-b border-slate-800/60"
            aria-label="About NECO"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              <div>
                <SectionLabel>About NECO</SectionLabel>
                <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white leading-[1.0] mb-6 tracking-tight">
                  Precision-cast for<br />
                  <span className="text-sky-400">the weight of</span><br />
                  everything above it.
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-[1.85] font-light mb-8">
                  NECO is India's leading manufacturer of high-strength ductile and grey iron manhole covers, drainage grating frames, and gully frames. Poured at 1,400°C into high-density SG ductile iron (Grade GGG50) and grey iron (Grade CI 20), every cover is formulated to resist impact, wear, and dynamic traffic load without cracking or displacement.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed font-light mb-10">
                  Universal Sanitary House is Kerala's exclusive authorised dealer for NECO Infrastructure products — bringing factory-direct pricing and technical expertise to civil and infrastructure projects across the region.
                </p>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <ShieldCheck size={18} />, label: "EN124 Compliant", sub: "IS 1726 Certified" },
                    { icon: <Layers size={18} />, label: "High-Strength Iron", sub: "GGG50 & CI Grade 20" },
                    { icon: <Building2 size={18} />, label: "Infrastructure Grade", sub: "Roads, Ports, Airports" },
                    { icon: <Award size={18} />, label: "50+ Years", sub: "Manufacturing Excellence" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-sky-500/30 transition-colors">
                      <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-sans font-bold text-white text-xs">{item.label}</div>
                        <div className="font-sans text-[10px] text-slate-400 tracking-wide mt-0.5">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Foundry Image */}
              <div className="relative group">
                <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                  <img
                    src="/images/neco/foundry.png"
                    alt="NECO iron foundry precision casting process at 1400 degrees celsius"
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-transparent" />
                </div>

                {/* Floating Certification Badge */}
                <div className="absolute bottom-6 left-6 neco-glass border border-slate-700/60 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="font-sans text-[10px] uppercase tracking-widest text-sky-300 font-bold">IS 1726 / EN 124 Certified Production</span>
                </div>

                {/* Casting Temp Badge */}
                <div className="absolute top-6 right-6 neco-glass border border-orange-500/30 px-4 py-2.5 rounded-2xl shadow-xl">
                  <div className="text-orange-400 font-oswald text-xl font-bold">1,400°C</div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-widest font-bold">Cast Temperature</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              3 · WHY CHOOSE NECO
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="why-neco"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="py-24 md:py-36 px-6 md:px-10 bg-[#0b1120] border-b border-slate-800/60"
            aria-label="Why choose NECO"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div variants={fadeUp} className="text-center mb-16">
                <SectionLabel>Why Choose NECO</SectionLabel>
                <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-tight">
                  Built for infrastructure.<br />
                  <span className="text-sky-400">Engineered to last.</span>
                </h2>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {BENEFITS.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    variants={fadeUp}
                    className="neco-card-hover bg-slate-900/70 border border-slate-800 p-8 rounded-3xl group relative overflow-hidden"
                  >
                    {/* Background shimmer on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-sky-500/5 to-transparent rounded-3xl" />

                    <div className="relative z-10">
                      <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-sky-400 w-fit mb-5 group-hover:bg-sky-500/20 group-hover:border-sky-500/40 transition-all duration-300">
                        {benefit.icon}
                      </div>
                      <h3 className="font-oswald text-xl font-bold uppercase tracking-wide text-white mb-3 group-hover:text-sky-100 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="font-sans text-sm text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors">
                        {benefit.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              4 · PRODUCT CATEGORIES
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="products"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="py-24 md:py-36 px-6 md:px-10 bg-[#0d1424] border-b border-slate-800/60"
            aria-label="NECO product categories"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                  <SectionLabel>Product Categories</SectionLabel>
                  <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-tight">
                    Every load.<br />
                    <span className="text-sky-400">Every application.</span>
                  </h2>
                </div>
                <p className="text-slate-400 text-sm max-w-sm font-light leading-relaxed">
                  Four product lines engineered to the exact EN124 standard for each traffic and duty environment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {PRODUCTS.map((product, i) => (
                  <motion.div
                    key={product.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="neco-card-hover bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden flex flex-col group"
                  >
                    {/* Image Container with Dark Theme Backdrop */}
                    <div className="relative aspect-square overflow-hidden bg-[#0a0f1d] flex items-center justify-center p-4">
                      <img
                        src={product.image}
                        alt={`${product.title} - ${product.material}`}
                        className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent pointer-events-none" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">{product.material}</div>
                      <h3 className="font-oswald text-lg font-bold uppercase tracking-wide text-white mb-2 group-hover:text-sky-100 transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <Scale size={13} className="text-sky-400 shrink-0" />
                        <span className="font-sans text-xs text-sky-400 font-bold">{product.loadClass}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 font-sans">
                        {product.applications.map((app) => (
                          <span key={app} className="text-[10px] px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-full font-sans font-medium">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              5 · LOAD CLASS GUIDE
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="load-guide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="py-24 md:py-36 px-6 md:px-10 bg-[#0b1120] border-b border-slate-800/60"
            aria-label="EN124 load class guide"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                  <SectionLabel>EN124 Load Class Guide</SectionLabel>
                  <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-tight">
                    Engineered for<br />
                    <span className="text-sky-400">every traffic load.</span>
                  </h2>
                </div>
                <p className="text-slate-400 text-sm max-w-sm font-light leading-relaxed">
                  Select covers based on location traffic ratings to ensure maximum safety and zero structural failure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                {LOAD_CLASSES.map((card, i) => (
                  <motion.div
                    key={card.code}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="neco-card-hover bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-full"
                  >
                    {/* Header */}
                    <div className="bg-slate-950/80 border-b border-slate-800/80 px-5 pt-6 pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400">
                          {card.icon}
                        </div>
                        <div className="text-right">
                          <div className="font-oswald text-2xl font-bold text-white leading-none">{card.loadNum}</div>
                          <div className="font-sans text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">kN</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-800 border border-slate-700 rounded-full">
                          <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-slate-300">EN124 {card.en124}</span>
                        </div>
                        <h3 className="font-oswald text-lg font-bold uppercase tracking-wide text-white">
                          {card.title}
                        </h3>
                        <p className="font-sans text-[10px] text-slate-400 font-semibold tracking-wider uppercase">{card.duty}</p>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-4 flex flex-col flex-1">
                      <p className="font-sans text-xs text-slate-300 leading-relaxed font-light mb-4 flex-1">
                        {card.use}
                      </p>

                      <div className="pt-3 border-t border-slate-800">
                        <div className="font-sans text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1">Material Grade</div>
                        <div className="font-sans text-[11px] text-slate-300 font-medium">{card.material}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              6 · TECHNICAL COMPARISON TABLE
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="comparison"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="py-24 md:py-36 px-6 md:px-10 bg-[#0d1424] border-b border-slate-800/60"
            aria-label="Material comparison: Grey Cast Iron vs Ductile Iron"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-14">
                <SectionLabel>Technical Comparison</SectionLabel>
                <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white tracking-tight mb-4">
                  Grey Iron vs <span className="text-sky-400">Ductile Iron</span>
                </h2>
                <p className="text-slate-400 text-sm font-light max-w-2xl leading-relaxed">
                  Understanding the material difference helps engineers and specifiers select the correct product for each installation environment.
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-800 shadow-2xl">
                <table className="w-full text-left font-sans text-sm" aria-label="Comparison of Grey Cast Iron and Ductile Iron properties">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80">
                      <th className="py-5 px-6 font-bold text-slate-400 uppercase tracking-widest text-[10px] w-1/3">Property</th>
                      <th className="py-5 px-6 font-bold text-slate-300 uppercase tracking-widest text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-slate-400" />
                          Grey Cast Iron (CI 20)
                        </div>
                      </th>
                      <th className="py-5 px-6 font-bold text-sky-400 uppercase tracking-widest text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-400" />
                          Ductile Iron (SG500/7)
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {[
                      { prop: "Tensile Strength", grey: "150–200 N/mm²", ductile: "500 N/mm² (Min) ✓" },
                      { prop: "Elongation Percentage", grey: "~0% (brittle)", ductile: "7% Min (High Ductility) ✓" },
                      { prop: "Brinell Hardness (HBS)", grey: "180–220 HBS", ductile: "160 to 240 HBS ✓" },
                      { prop: "Impact Resistance", grey: "Low — prone to cracking", ductile: "High — absorbs heavy shocks ✓" },
                      { prop: "Skid Resistance", grey: "Plain / Standard", ductile: "Raised Checker Pattern ✓" },
                      { prop: "Theft Protection", grey: "Standard loose lid", ductile: "Integrated Hinge Anti-Theft ✓" },
                      { prop: "Reaction to Fire", grey: "Class A1", ductile: "Class A1 (Non-combustible) ✓" },
                      { prop: "EN 124-2 Classes", grey: "A15 (Light Duty)", ductile: "A15 to F900 (Up to 900 kN) ✓" },
                    ].map((row, i) => (
                      <tr key={row.prop} className={`transition-colors hover:bg-slate-800/40 ${i % 2 === 0 ? "bg-slate-900/40" : ""}`}>
                        <td className="py-4 px-6 text-slate-400 font-semibold text-xs uppercase tracking-wide">{row.prop}</td>
                        <td className="py-4 px-6 text-slate-300 text-sm">{row.grey}</td>
                        <td className="py-4 px-6 text-sky-300 text-sm font-medium">{row.ductile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              7 · TECHNICAL SPECIFICATIONS TABLE & DATA SHEET
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="spec-table"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="py-24 md:py-36 px-6 md:px-10 bg-[#0b1120] border-b border-slate-800/60"
            aria-label="Technical specifications table"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 max-w-2xl">
                <SectionLabel>Technical Specifications</SectionLabel>
                <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white tracking-tight mb-4">
                  Exact dimensions &amp;<br />
                  <span className="text-sky-400">Technical Data Sheet.</span>
                </h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                  Official 11-point EN 124-2 data sheet and clear opening dimensions across circular, square, recessed, and grating configurations.
                </p>
              </div>
              <SpecTable darkTheme={true} />
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              8 · INSTALLATION INSTRUCTIONS (EN 124-2)
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="installation"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="py-24 md:py-36 px-6 md:px-10 bg-[#0d1424] border-b border-slate-800/60"
            aria-label="EN 124-2 Installation Instructions"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-14">
                <SectionLabel>EN 124-2 Guidelines</SectionLabel>
                <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-tight mb-4">
                  Installation Instructions &amp;<br />
                  <span className="text-sky-400">Best Practices</span>
                </h2>
                <p className="text-slate-300 text-sm md:text-base font-light max-w-2xl leading-relaxed">
                  Proper installation ensures full load transfer, eliminates cover rattling, and guarantees long operational service.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Location & Load Class */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-sky-500/10 border border-sky-500/30 rounded-2xl text-sky-400">
                      <Target size={24} />
                    </div>
                    <div>
                      <h3 className="font-oswald text-xl font-bold uppercase text-white">1. Location &amp; Load Class</h3>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">EN 124-2 Standard</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed font-light mb-4">
                    The procedure for installing manhole covers depends on site location, traffic loads, and planned surface layer.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-400 font-light flex-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>Assigned to classes A15 through F900 as per EN 124-2.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>Manhole structure must be suitable for planned traffic load.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>Planner / Engineer responsible for load class, mortar quality &amp; orientation.</span>
                    </li>
                  </ul>
                </div>

                {/* Preparation Before Installation */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h3 className="font-oswald text-xl font-bold uppercase text-white">2. Pre-Installation Checklist</h3>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Verification Steps</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300 font-light flex-1">
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span>Check size correctness with chamber / Gully opening.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span>Verify appropriate load class for location.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span>Inspect working order — <strong>Never install damaged parts!</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                      <span>Use lifting gear to prevent seating edge damage.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">5</span>
                      <span>Clean bearing surfaces &amp; setting area prior to insertion.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">6</span>
                      <span>Clean and wet underside of frame before placement.</span>
                    </li>
                  </ul>
                </div>

                {/* Mortar Bed & Frame Installation */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
                      <Layers size={24} />
                    </div>
                    <div>
                      <h3 className="font-oswald text-xl font-bold uppercase text-white">3. Mortar Bed &amp; Frame</h3>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Bearing Execution</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300 font-light flex-1">
                    <li className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                      <strong className="text-emerald-400 block mb-1">Full Mortar Contact:</strong>
                      Frame must be in 100% full contact with mortar bed. Poor substructure causes traffic loosening, premature wear, rattling, or frame destruction.
                    </li>
                    <li className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                      <strong className="text-emerald-400 block mb-1">Thin-Walled Frames:</strong>
                      When installing thin-walled non-torsion-free frames, keep cover fitted inside frame during setting.
                    </li>
                    <li className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                      <strong className="text-emerald-400 block mb-1">Height Adjustments:</strong>
                      Always execute a complete new mortar bed throughout for any height adjustments.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              9 · APPLICATIONS
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="applications"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="py-24 md:py-36 px-6 md:px-10 bg-[#0b1120] border-b border-slate-800/60"
            aria-label="Applications for NECO manhole covers"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <SectionLabel>Applications</SectionLabel>
                <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-tight mb-4">
                  Built for every<br />
                  <span className="text-sky-400">infrastructure environment.</span>
                </h2>
                <p className="text-slate-400 text-sm font-light max-w-xl mx-auto leading-relaxed">
                  From pedestrian footpaths to international airports — NECO covers perform flawlessly across all mission-critical applications.
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
              >
                {APPLICATIONS.map((app, i) => (
                  <motion.div
                    key={app.label}
                    variants={fadeUp}
                    className="neco-card-hover flex flex-col items-center gap-4 p-8 bg-slate-900/70 border border-slate-800 rounded-3xl text-center group"
                  >
                    <div className={`p-4 rounded-2xl bg-slate-800 group-hover:bg-slate-700 transition-colors duration-300 ${app.color}`}>
                      {app.icon}
                    </div>
                    <span className="font-sans text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-snug">
                      {app.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>




          {/* ════════════════════════════════════════════════════════════
              10 · FAQ
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="faq"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="py-24 md:py-36 px-6 md:px-10 bg-[#0d1424] border-b border-slate-800/60"
            aria-label="Frequently asked questions"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <SectionLabel>Frequently Asked Questions</SectionLabel>
                <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white tracking-tight">
                  Technical answers.<br />
                  <span className="text-sky-400">Expert guidance.</span>
                </h2>
              </div>

              <FaqAccordion faqs={FAQS} />
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              10.5 · MANUFACTURER & DISTRIBUTOR DIRECTORY
          ════════════════════════════════════════════════════════════ */}
          <section className="py-20 px-6 md:px-10 bg-[#080d19] border-b border-slate-800/80">
            <div className="max-w-7xl mx-auto">
              <div className="p-8 md:p-12 bg-slate-900/90 border border-slate-800 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-oswald text-2xl font-bold text-white uppercase tracking-wider">JAYASWAL NECO INDUSTRIES LTD.</span>
                    <span className="px-2.5 py-0.5 bg-sky-500/20 text-sky-400 text-[10px] font-bold uppercase rounded-full border border-sky-500/30">Official Manufacturer</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">
                    Corporate Office: F-8, MIDC, Industrial Area Hingna Road, Nagpur-440016 M.S. (INDIA)<br />
                    Phone: (07104) 237471, 237461, 235002 | Fax: (07104) 237583, 236255<br />
                    Email: contact@necoindia.com, b.praveen@necoindia.com | Website: www.necoindia.com
                  </p>
                  <div className="font-sans text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-3">National Branch Offices Network</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-300 font-medium">
                    <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-sky-400" /> Cochin: 09349277907</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-sky-400" /> Chennai: 09382722422</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-sky-400" /> Bangalore: (080) 26743718</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-sky-400" /> Mumbai: 07219107564</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-sky-400" /> Delhi: 09350614245</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-sky-400" /> Hyderabad: (040) 24658000</div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 bg-slate-950/80 border border-slate-800 rounded-2xl text-center lg:text-left flex flex-col justify-between h-full">
                  <div>
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-1">Authorised Distributor in Kerala</div>
                    <div className="font-oswald text-2xl text-white font-bold mb-2">Universal Sanitary House</div>
                    <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                      Post Box No. 3674, Jew Street, Ernakulam, Kochi, Kerala – 682035<br />
                      Ph: +91-484-2351581, 2360931, 2366939 | Mob: +91 7356863985<br />
                      Email: universalsanitary@yahoo.com
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="tel:+914842351581"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-lg shadow-sky-500/20 flex-1"
                    >
                      <Phone size={14} /> Call Showroom
                    </a>
                    <a
                      href="https://wa.me/917356863985?text=Hello%20Universal%20Sanitary,%20I%20would%20like%20to%20enquire%20about%20NECO%20covers."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-lg flex-1"
                    >
                      <MessageSquare size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* ════════════════════════════════════════════════════════════
              11 · CTA SECTION
          ════════════════════════════════════════════════════════════ */}
          <section
            id="contact"
            className="py-24 md:py-40 px-6 md:px-10 relative overflow-hidden bg-[#0b1120]"
            aria-label="Get in touch"
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(10,128,190,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center relative z-10"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Get In Touch</SectionLabel>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-oswald text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[1.0] mb-6"
              >
                Need Help Choosing<br />
                <span className="text-sky-400">the Right</span><br />
                Manhole Cover?
              </motion.h2>

              <motion.p variants={fadeUp} className="text-slate-300 text-base md:text-lg leading-[1.85] font-light mb-12 max-w-2xl mx-auto">
                Send us your project drawings or clear opening requirements. Our technical team will recommend the exact load class and provide competitive dealer pricing — fast.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center"
              >
                <a
                  href="tel:+917356863985"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all"
                >
                  <Phone size={16} />
                  Call Now
                </a>

                <a
                  href="https://wa.me/917356863985"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 hover:border-[#25D366]/60 text-[#25D366] font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all"
                >
                  <MessageSquare size={16} />
                  WhatsApp
                </a>
              </motion.div>

              {/* Contact Details */}
              <motion.div
                variants={fadeUp}
                className="mt-16 pt-12 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
              >
                {[
                  { icon: <MapPin size={18} />, label: "Showroom Location", val: "P.B. No. 3674, Jew Street, Ernakulam, Kochi 682035" },
                  { icon: <Phone size={18} />, label: "Phone & WhatsApp", val: "+91 484 2351581 / +91 7356863985" },
                  { icon: <Star size={18} />, label: "Dealership", val: "Universal Sanitary House · Kerala Distributor" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-3">
                    <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400">{item.icon}</div>
                    <div className="font-sans text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</div>
                    <div className="font-sans text-xs text-slate-300 leading-relaxed max-w-[180px]">{item.val}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </section>

        </main>

        {/* ════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════ */}
        <footer className="bg-slate-950 border-t border-slate-800/60 text-slate-400 py-16 px-6 sm:px-10 font-sans text-xs" aria-label="Footer">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

            {/* Brand Column */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="font-oswald text-2xl font-bold text-white uppercase tracking-wider">NECO</span>
                <span className="w-px h-5 bg-slate-700" />
                <span className="text-[10px] uppercase tracking-widest text-sky-400 font-bold">Infrastructure Division</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light mb-5">
                Kerala&apos;s exclusive authorised distributor for NECO ductile and grey iron manhole covers, gully gratings, and municipal drainage solutions. Factory-direct pricing, expert technical support.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 text-[10px] text-sky-400 uppercase tracking-wider font-bold rounded-lg">
                  <CheckCircle2 size={10} /> IS 1726 Certified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 text-[10px] text-sky-400 uppercase tracking-wider font-bold rounded-lg">
                  <CheckCircle2 size={10} /> EN 124 Compliant
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 md:col-start-7">
              <span className="font-bold text-white uppercase tracking-widest block mb-4 text-[11px]">Quick Links</span>
              <ul className="space-y-2.5">
                {[
                  { label: "Overview", href: "#hero" },
                  { label: "Products", href: "#products" },
                  { label: "Load Guide", href: "#load-guide" },
                  { label: "Specifications", href: "#spec-table" },
                  { label: "Applications", href: "#applications" },
                  { label: "FAQ", href: "#faq" },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-sky-400 transition-colors duration-200">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="md:col-span-3">
              <span className="font-bold text-white uppercase tracking-widest block mb-4 text-[11px]">Contact</span>
              <address className="not-italic space-y-3">
                <div>
                  <div className="text-slate-300 font-medium text-[11px] mb-0.5">Universal Sanitary House</div>
                  <div className="text-slate-500 leading-relaxed text-[11px]">Post Box No. 3674, Jew Street<br />Ernakulam, Kochi, Kerala – 682035</div>
                </div>
                <a href="tel:+914842351581" className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors font-mono text-[11px]">
                  <Phone size={11} /> +91-484-2351581 / +91 7356 863985
                </a>
                <a
                  href="https://wa.me/917356863985"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 rounded-lg transition-colors text-[10px] font-bold uppercase tracking-wider"
                >
                  <MessageSquare size={11} /> WhatsApp
                </a>
              </address>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-600">
            <span>© {new Date().getFullYear()} NECO Infrastructure Division · Universal Sanitary House. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>Kerala Sole Authorised Dealer</span>
              <Link href="/" className="hover:text-slate-400 transition-colors flex items-center gap-1">
                Universal Main Site <ArrowUpRight size={9} />
              </Link>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
