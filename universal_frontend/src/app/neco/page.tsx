"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Phone, ArrowRight, CheckCircle2, ShieldCheck, Layers, Scale, Truck, FileText, ArrowUpRight } from "lucide-react";
import SpecTable from "@/components/neco/SpecTable";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const LOAD_CLASSES = [
  {
    code: "LD 400",
    load: "1.5t",
    title: "Light Duty (A15)",
    material: "Grey Iron CI Grade 20",
    use: "Pedestrian walkways, garden areas, residential footpaths, cycle tracks.",
  },
  {
    code: "MD 400",
    load: "5.0t",
    title: "Medium Duty (B125)",
    material: "Ductile SG Iron GGG50",
    use: "Car parks, housing society driveways, shopping complex light vehicle zones.",
  },
  {
    code: "HD 400",
    load: "25.0t",
    title: "Heavy Duty (D400)",
    material: "Ductile SG Iron GGG50",
    use: "City arterial roads, commercial expressways, bus terminals, heavy traffic.",
  },
  {
    code: "EHD 400",
    load: "40.0t",
    title: "Extra Heavy Duty (F900)",
    material: "Ductile SG Iron GGG50",
    use: "International airports, container yards, seaports, industrial plant roads.",
  },
];

export default function NecoPage() {
  return (
    <div className="bg-[#0b1120] text-slate-100 min-h-screen font-sans selection:bg-sky-500/30 selection:text-white">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          0 · DEDICATED DARK STANDALONE NECO BRAND NAVBAR
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800/80 py-4 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/neco" className="flex items-center gap-2.5">
              <span className="font-oswald text-2xl font-bold tracking-wider text-white uppercase">NECO</span>
              <span className="w-px h-5 bg-slate-700" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-sky-400 font-bold hidden sm:inline-block">
                Infrastructure Division
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest text-slate-300 font-medium">
            <a href="#overview" className="hover:text-sky-400 transition-colors">Overview</a>
            <a href="#load-guide" className="hover:text-sky-400 transition-colors">Load Ratings</a>
            <a href="#spec-table" className="hover:text-sky-400 transition-colors">Specifications</a>
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              Universal Main Site <ArrowUpRight size={12} />
            </Link>
          </nav>

          {/* Action Button */}
          <a
            href="https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20NECO%20cast%20iron%20manhole%20covers."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:brightness-110 text-white font-sans text-xs uppercase tracking-wider transition-all shadow-md rounded-full font-bold"
          >
            <MessageSquare size={14} />
            Get Factory Quote
          </a>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1 · HERO SHOWCASE (REFERENCE LAYOUT: TOP GIANT HEADLINE, CENTER STAGE, SIDE STATS & BOTTOM CARD)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="overview" className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 bg-[#0b1120] border-b border-slate-800/80 relative overflow-hidden">
        {/* Subtle Slate Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(10,128,190,0.12)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Top Editorial Headline */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16">
            <h1 className="font-oswald text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-white leading-[0.9]">
              NECO COVER
            </h1>
            <span className="font-sans text-xs uppercase font-bold tracking-[0.25em] text-sky-400 mt-4 md:mt-0">
              Authorised Dealer · Kerala Infrastructure
            </span>
          </div>

          {/* Central Showcase Grid: Left Detail | Center Stage | Right 40t Stat */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Description & CTAs */}
            <div className="lg:col-span-4 flex flex-col items-start text-left">
              <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-slate-400 uppercase mb-3 block">
                Exclusive Kerala Dealership
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl text-white font-light leading-tight mb-4">
                Cast to carry the weight<br />
                <span className="italic font-normal text-sky-400">of everything above it.</span>
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 font-light max-w-sm">
                Authorised Kerala supplier of high-strength grey and ductile iron manhole covers, drainage gratings, and gully frames engineered to IS 1726 & EN 124 standards.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href="https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20NECO%20cast%20iron%20manhole%20covers."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold rounded-full hover:brightness-110 transition-all shadow-md"
                >
                  <MessageSquare size={16} />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Center Column: Industrial Product Showcase Stage */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-6 lg:py-0">
              <div className="relative z-10 w-full max-w-sm sm:max-w-md aspect-square bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950 rounded-3xl p-6 border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden group flex flex-col justify-between">

                {/* Top Badge */}
                <div className="flex justify-between items-center z-10">
                  <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-slate-200">
                      IS 1726 / EN 124
                    </span>
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Ductile SG Iron
                  </span>
                </div>

                {/* Product Cover Display Frame */}
                <div className="relative w-full h-52 sm:h-64 my-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-700">
                  <img
                    src="/images/neco/ezgif-frame-220.jpg"
                    alt="NECO Cast Iron Manhole Cover"
                    className="w-full h-full object-cover opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>

                {/* Bottom Caption */}
                <div className="flex justify-between items-end z-10 border-t border-slate-800/80 pt-3">
                  <div>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-slate-400 font-bold block">Model Code</span>
                    <span className="font-playfair text-sm text-white font-medium">NECO 525DIA 75KG</span>
                  </div>
                  <span className="font-sans text-xs text-sky-400 font-bold tracking-wider uppercase">Heavy Duty</span>
                </div>
              </div>
            </div>

            {/* Right Column: Giant 40t Stat Callout */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right">
              <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-sky-400 uppercase mb-2">
                Maximum Load Rating
              </span>
              <div className="font-playfair text-7xl sm:text-8xl md:text-9xl font-light text-white leading-none mb-3">
                40<span className="text-sky-400 font-normal">t</span>
              </div>
              <h4 className="font-playfair text-xl text-slate-200 font-medium mb-3">
                Extra Heavy Duty (EHD 400)
              </h4>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xs font-light">
                Tested and certified for airport runways, container terminals, seaports, and heavy freight corridors across Kerala.
              </p>
            </div>
          </div>

          {/* Bottom Dark Metric Card (2-Column Stat Bar) */}
          <div className="bg-slate-900/90 text-white rounded-3xl p-8 sm:p-10 shadow-2xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-center border border-slate-800 relative z-10">
            <div className="flex flex-col items-center justify-center">
              <span className="font-playfair text-3xl sm:text-4xl text-white font-light mb-1">1.5t – 40t</span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-bold">Complete Load Spectrum (LD to EHD)</span>
            </div>
            <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 pl-0 md:pl-4">
              <span className="font-playfair text-3xl sm:text-4xl text-sky-400 font-light mb-1">IS 1726 / EN 124</span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-bold">100% Certified Bureau Standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 2 · FOUNDRY METALLURGY & HERITAGE ━━━ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-24 md:py-36 px-6 md:px-12 bg-[#0d1424] border-b border-slate-800/80"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 text-left">
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-sky-400 uppercase mb-3 block">
              Foundry Metallurgy
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
              Precision-cast for continuous,<br />
              <span className="italic font-normal text-sky-400">heavy traffic fatigue.</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-[1.8] font-light mb-8">
              Poured at 1,400°C into high-density SG ductile iron (Grade GGG50) and grey iron (Grade CI 20). Formulated to resist impact, wear, and dynamic traffic load without cracking or displacement.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Matched Frame & Cover Seating",
                "Non-Rocking Silent Gasket Fit",
                "Anti-Theft Lockable Hinges",
                "Bitumen Protection Coating",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs font-sans font-medium text-slate-200">
                  <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative group">
            <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="/images/neco/ezgif-frame-120.jpg"
                alt="NECO Foundry Detail"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-200 font-bold">
                IS 1726 / EN 124 Certified
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ━━━ 3 · LOAD RATING SPECTRUM CARDS ━━━ */}
      <motion.section
        id="load-guide"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-24 md:py-36 px-6 md:px-12 bg-[#0b1120] border-b border-slate-800/80"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOAD_CLASSES.map((card) => (
              <div
                key={card.code}
                className="bg-slate-900/90 border border-slate-800 p-8 rounded-2xl shadow-xl hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-slate-400">{card.code}</span>
                    <span className="font-playfair text-4xl text-sky-400 font-light">{card.load}</span>
                  </div>
                  <h3 className="font-playfair text-xl text-white font-medium mb-3">{card.title}</h3>
                  <p className="font-sans text-xs text-slate-300 leading-relaxed font-light mb-6">{card.use}</p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    {card.material}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ━━━ 4 · TECHNICAL SPECIFICATIONS TABLE ━━━ */}
      <motion.section
        id="spec-table"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-24 md:py-36 px-6 md:px-12 bg-[#0d1424] border-b border-slate-800/80"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
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

      {/* ━━━ 5 · DIRECT FACTORY QUOTE CTA ━━━ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-24 md:py-36 px-6 md:px-12 bg-[#0b1120]"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-sky-400 uppercase mb-3 block">
              Direct Dealer Pricing
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white font-light mb-6">
              Get an instant factory quote<br />
              <span className="italic text-sky-400">for your project.</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed font-light mb-8 max-w-lg">
              Send us your project drawings or clear opening requirements — our team will recommend the exact load class and provide competitive dealer pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20NECO%20cast%20iron%20manhole%20covers."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold rounded-full hover:brightness-110 transition-all shadow-md"
              >
                <MessageSquare size={16} />
                <span>Enquire on WhatsApp</span>
              </a>
              <a
                href="tel:+917356863985"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-md"
              >
                <Phone size={16} />
                <span>Call +91 7356 863985</span>
              </a>
            </div>
          </div>

          <div className="relative group">
            <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="/images/neco/ezgif-frame-220.jpg"
                alt="NECO Cast Iron Cover"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ━━━ 6 · STANDALONE DARK NECO FOOTER ━━━ */}
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
