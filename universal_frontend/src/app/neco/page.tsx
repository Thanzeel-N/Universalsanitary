"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  MessageSquare, Phone, ArrowUpRight, Menu, X, ChevronDown, Award,
  ShieldCheck, Truck, Building2, Plane, Factory, MapPin,
  Footprints, Car, TrendingUp, Sparkles, HelpCircle, Sliders, Shield, Compass, Check
} from "lucide-react";

// ─── Data Types ──────────────────────────────────────────────────────────────

interface LoadClass {
  code: string;
  load: string;
  duty: string;
  vehicle: string;
  icon: React.ReactNode;
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

// ─── Data Records ─────────────────────────────────────────────────────────────

const LOAD_CLASSES: LoadClass[] = [
  {
    code: "Class A15",
    load: "1.5 Tons",
    duty: "Light Duty",
    vehicle: "Pedestrians, Bicycles & Lawn Pits",
    icon: <Footprints size={20} />,
  },
  {
    code: "Class B125",
    load: "12.5 Tons",
    duty: "Medium Duty",
    vehicle: "Residential Cars, SUVs & Parking",
    icon: <Car size={20} />,
  },
  {
    code: "Class C250",
    load: "25.0 Tons",
    duty: "Commercial Duty",
    vehicle: "Service Vans & Road Kerbsides",
    icon: <Truck size={20} />,
  },
  {
    code: "Class D400",
    load: "40.0 Tons",
    duty: "Heavy Duty",
    vehicle: "Freight Trucks, Buses & City Roads",
    icon: <TrendingUp size={20} />,
  },
  {
    code: "Class E600",
    load: "60.0 Tons",
    duty: "Extra Heavy",
    vehicle: "Forklifts & Industrial Freight Depots",
    icon: <Factory size={20} />,
  },
  {
    code: "Class F900",
    load: "90.0 Tons",
    duty: "Extreme Duty",
    vehicle: "Commercial Aircraft & Port Cranes",
    icon: <Plane size={20} />,
  },
];

const PRODUCTS: ProductCard[] = [
  {
    title: "NECO 525DIA Circular Cover & Frame",
    material: "SG Ductile Iron (Grade GGG50)",
    loadClass: "Class D400 · 40.0 Tons",
    applications: ["City Roads", "Expressways", "Bus Terminals"],
    image: "/images/neco/rounded_manhole_cover_nobg.png",
    badge: "Heavy Duty D400",
    badgeColor: "text-orange-600 bg-orange-50 border-orange-200",
  },
  {
    title: "Inspection Cover & Frame (300×600)",
    material: "Grey Cast Iron (CI Grade 20)",
    loadClass: "Class A15 · 1.5 Tons",
    applications: ["Footpaths", "Garden Pits", "Cable Trenches"],
    image: "/images/neco/product_1_transparent.png",
    badge: "Light Duty A15",
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    title: "Driveway Drainage Grating with Frame",
    material: "SG Ductile Iron (Grade GGG50)",
    loadClass: "Class B125 · 12.5 Tons",
    applications: ["Driveways", "Parking Lots", "Courtyards"],
    image: "/images/neco/product_2_transparent.png",
    badge: "Driveway B125",
    badgeColor: "text-sky-700 bg-sky-50 border-sky-200",
  },
  {
    title: "Square Slotted Road Drainage Grating",
    material: "SG Ductile Iron (Grade GGG50)",
    loadClass: "Class C250/D400 · 25 to 40 Tons",
    applications: ["Road Kerbsides", "Commercial Grounds", "Highways"],
    image: "/images/neco/product_3_transparent.png",
    badge: "Commercial C250",
    badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
  },
  {
    title: "600DIA Cover in Square Frame",
    material: "SG Ductile Iron (Hinged Anti-Theft)",
    loadClass: "Class D400 · 40.0 Tons",
    applications: ["Paver Roads", "City Junctions", "Highways"],
    image: "/images/neco/square_manhole_cover_nobg.png",
    badge: "Hinged D400",
    badgeColor: "text-orange-600 bg-orange-50 border-orange-200",
  },
  {
    title: "Heavy Duty Gully Grating Frame",
    material: "SG Ductile Iron (Grade GGG50)",
    loadClass: "Class E600 · 60.0 Tons",
    applications: ["Industrial Plants", "Port Terminals", "Freight Depots"],
    image: "/images/neco/product_5_transparent.png",
    badge: "Industrial E600",
    badgeColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
  },
];

const DEALER_TRUST_PILLARS = [
  {
    icon: <Award size={20} />,
    title: "Kerala Official Distributor",
    desc: "Universal Sanitary House is Kerala's exclusive authorized dealer for authentic NECO castings.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "EN 124 & IS Certified",
    desc: "Every cover batch is 100% load tested to EN 124-2 and IS 1726 structural standards.",
  },
  {
    icon: <Truck size={20} />,
    title: "Ready Warehouse Stock",
    desc: "Warehouse stock in Ernakulam with fast logistics across all 14 Kerala districts.",
  },
  {
    icon: <Building2 size={20} />,
    title: "Direct Factory Pricing",
    desc: "Transparent wholesale prices with zero middleman commissions.",
  },
];

const FAQS = [
  {
    q: "How do I select the right load class (A15, B125, D400) for my site?",
    a: "Base your choice on the heaviest vehicle that will ever drive over the cover. A15 (1.5t) is for footpaths and lawns. B125 (12.5t) is ideal for residential car driveways and parking slots. D400 (40t) is required for public roads and delivery trucks."
  },
  {
    q: "What makes SG Ductile Iron superior to traditional Grey Cast Iron?",
    a: "SG Ductile iron undergoes spherical graphite treatment, making it 3 times stronger, impact flexible, and unbreakable under heavy vehicle wheel loads. NECO ductile covers also feature anti-theft locking hinges."
  },
  {
    q: "Why choose a circular cover instead of a square cover?",
    a: "A circular cover can never fall down into its frame opening, no matter how turned. Square covers are chosen for driveway pavers because their frame aligns cleanly with tiles."
  },
  {
    q: "Are NECO covers protected against rust and sewage corrosion?",
    a: "Yes! All NECO covers feature a factory bitumen protective coating that prevents corrosion from sewage gases, rainwater, and coastal ground moisture."
  },
  {
    q: "Where can I inspect NECO covers in Kerala?",
    a: "You can visit the Universal Sanitary House showroom located at Jew Street, Ernakulam, Kochi for sample inspection and technical guidance."
  },
];

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.q}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-colors hover:border-slate-300"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full p-4 text-left flex items-center justify-between gap-4 font-sans font-bold text-slate-900 text-sm md:text-base"
            >
              <span className="flex items-center gap-3">
                <HelpCircle size={16} className="text-sky-600 shrink-0" />
                {faq.q}
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                  isOpen ? "rotate-180 text-sky-600" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-4 pb-4 pt-1 text-slate-600 text-xs md:text-sm font-light leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Luxury Light Page Component ───────────────────────────────────────

export default function NecoPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "NECO Ductile & Grey Iron Manhole Covers",
            "description": "EN124-certified ductile and grey iron manhole covers available in Kerala through Universal Sanitary House.",
            "brand": { "@type": "Brand", "name": "NECO" },
            "seller": {
              "@type": "Organization",
              "name": "Universal Sanitary House",
              "telephone": "+914842351581",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jew Street, Ernakulam",
                "addressLocality": "Kochi",
                "addressRegion": "Kerala",
                "postalCode": "682035",
                "addressCountry": "IN"
              }
            }
          })
        }}
      />

      <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-sky-500/20 selection:text-slate-900">

        {/* ════════════════════════════════════════════════════════════
            CLEAN FLOATING NAVBAR (BRAND LEFT, CONTACT RIGHT)
        ════════════════════════════════════════════════════════════ */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-md shadow-slate-200/50"
              : "bg-transparent py-5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
            {/* Left Side: Brand Logo & Title */}
            <Link href="/neco" className="flex items-center gap-2.5 group" aria-label="NECO Infrastructure Division">
              <span className="font-oswald text-2xl font-bold tracking-wider text-slate-900 uppercase">NECO</span>
              <span className="w-px h-5 bg-slate-300" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-sky-600 font-bold">
                Kerala Authorized Dealer
              </span>
            </Link>

            {/* Right Side: Contact Button */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917356863985?text=Hello%20Universal%20Sanitary%20House,%20I%20need%20guidance%20on%20NECO%20manhole%20covers."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:brightness-110 text-white font-sans text-xs uppercase tracking-widest transition-all rounded-full font-bold shadow-md shadow-sky-900/20"
              >
                <MessageSquare size={14} />
                <span>Consult Dealer</span>
              </a>
            </div>
          </div>
        </header>

        <main id="main-content">

          {/* ════════════════════════════════════════════════════════════
              1 · ARCHITECTURAL LUXURY HERO SECTION
          ════════════════════════════════════════════════════════════ */}
          <section
            id="hero"
            className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-6 sm:px-10 overflow-hidden"
            aria-label="NECO Manhole Covers Architectural Hero"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-sky-200/40 via-sky-100/20 to-transparent blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">

              {/* Text Area */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="lg:col-span-7 text-left"
              >
                <motion.div variants={fadeUp}>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-50 border border-sky-200 rounded-full text-sky-700 font-sans text-[11px] uppercase tracking-widest font-bold mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
                    Universal Sanitary House · Authorized Kerala Dealer
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="font-oswald text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold uppercase tracking-tight text-slate-900 leading-[0.98] mb-6"
                >
                  Precision Castings.<br />
                  <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">Engineered for Global Infrastructure.</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-slate-600 text-base sm:text-lg leading-relaxed font-light mb-8 max-w-xl"
                >
                  EN 124-certified ductile &amp; grey iron castings trusted across global markets. Distributed in Kerala by Universal Sanitary House, authorized state distributor.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                  <a
                    href="#material-science"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:brightness-110 text-white font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-xl shadow-sky-900/20"
                  >
                    <Compass size={16} />
                    <span>Explore Material Guide</span>
                  </a>
                  <a
                    href="https://wa.me/917356863985?text=Hello%20Universal%20Sanitary%20House,%20I%20need%20selection%20guidance."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-sm"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Consultation</span>
                  </a>
                </motion.div>

                {/* Metrics */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-8 mt-12 pt-8 border-t border-slate-200"
                >
                  <div>
                    <div className="font-oswald text-2xl font-bold text-slate-900">1.5t to 90t</div>
                    <div className="font-sans text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">Load Range</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <div className="font-oswald text-2xl font-bold text-slate-900">EN 124-2</div>
                    <div className="font-sans text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">Tested Standard</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Product Visual Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 flex justify-center"
              >
                <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden group">
                  <div className="flex items-center justify-between z-10 mb-2">
                    <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-sky-700 px-3 py-1 bg-sky-50 border border-sky-200 rounded-full flex items-center gap-1">
                      <Shield size={12} /> Heavy Duty Standard
                    </span>
                    <span className="font-oswald text-xs font-bold text-orange-600 px-2.5 py-0.5 bg-orange-50 border border-orange-200 rounded-full">
                      Class D400 · 40t
                    </span>
                  </div>

                  <div className="w-full aspect-square flex items-center justify-center my-4">
                    <img
                      src="/images/neco/square_manhole_cover_nobg.png"
                      alt="NECO Ductile Iron Manhole Cover"
                      className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="font-sans text-sm font-bold text-slate-900">NECO SG Ductile Cover in Square Frame</div>
                    <div className="font-sans text-xs text-slate-500 font-light mt-0.5">SG500/7 Ductile Iron • Integrated Anti-Theft Hinge</div>
                  </div>
                </div>
              </motion.div>

            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════
              ABOUT SECTION (HIGH CONTRAST & PERFECT SPACING)
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="py-20 md:py-24 px-6 sm:px-10 bg-[#f8fafc] border-y border-slate-200/80 relative z-10"
            aria-label="About NECO and Universal Sanitary House"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5">
                <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-sky-600 uppercase block mb-3">
                  About NECO &amp; Kerala Distributor
                </span>
                <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-slate-900 tracking-tight leading-[1.1]">
                  World-Class Engineering.<br />
                  <span className="text-sky-600">Global Standards. Local Trust.</span>
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <p className="text-slate-700 text-sm md:text-base font-normal leading-relaxed">
                  <strong className="font-bold text-slate-900">NECO</strong> is a premier global manufacturer of EN 124-certified ductile and grey iron castings exported to international markets worldwide. Distributed exclusively in Kerala by <strong className="font-bold text-slate-900">Universal Sanitary House</strong> (Ernakulam, Kochi), we supply home builders, contractors, and municipal projects with heavy-duty manhole covers, inspection lids, and rainwater drainage gratings built to last a lifetime.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-oswald text-xl font-bold text-slate-900 block">50+ Years</span>
                    <span className="text-xs text-slate-600 font-medium block mt-1">Distributor Legacy in Kochi</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-oswald text-xl font-bold text-slate-900 block">IS &amp; EN 124</span>
                    <span className="text-xs text-slate-600 font-medium block mt-1">100% Certified Strength</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>



          {/* ════════════════════════════════════════════════════════════
              3 · MATERIAL SCIENCE COMPARISON (GREY VS DUCTILE IRON)
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="material-science"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="py-20 px-6 sm:px-10 bg-white border-b border-slate-200"
            aria-label="Grey Iron vs Ductile Iron Material Science"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 max-w-2xl">
                <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-sky-600 uppercase block mb-2">
                  Material Science
                </span>
                <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-slate-900 tracking-tight">
                  Grey Cast Iron vs SG Ductile Iron
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-light mt-2">
                  Why modern SG Ductile Iron is replacing traditional cast iron across car driveways and public roads.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Grey Iron Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-oswald text-2xl font-bold uppercase text-slate-900">Grey Cast Iron (CI 20)</h3>
                      <span className="text-[10px] font-bold uppercase text-slate-600 bg-slate-200 px-3 py-1 rounded-full">Traditional</span>
                    </div>
                    <p className="text-slate-600 text-xs font-light leading-relaxed mb-6">
                      Traditional cast iron. Rigid and economical, but brittle under heavy dynamic vehicle impacts. Best suited for static non-traffic garden pits.
                    </p>

                    <div className="space-y-4 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-600 font-medium mb-1">
                          <span>Tensile Strength</span>
                          <span>150–200 N/mm²</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-slate-400" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-600 font-medium mb-1">
                          <span>Impact Resistance</span>
                          <span>Low (Prone to cracking under trucks)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="w-1/4 h-full bg-red-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-600 font-medium">
                    ✔ <strong>Best Use:</strong> Residential lawn inspection pits &amp; footpaths.
                  </div>
                </div>

                {/* SG Ductile Iron Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-oswald text-2xl font-bold uppercase text-white">SG Ductile Iron (GGG50)</h3>
                      <span className="text-[10px] font-bold uppercase text-sky-300 bg-sky-500/20 border border-sky-500/30 px-3 py-1 rounded-full">3x Stronger</span>
                    </div>
                    <p className="text-slate-300 text-xs font-light leading-relaxed mb-6">
                      Spheroidal graphite treated iron. 3 times stronger than grey iron, flexible under dynamic shocks, virtually unbreakable, and features anti-theft hinges.
                    </p>

                    <div className="space-y-4 text-xs">
                      <div>
                        <div className="flex justify-between text-sky-300 font-medium mb-1">
                          <span>Tensile Strength</span>
                          <span>500 N/mm² (3x Higher)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-r from-sky-400 to-indigo-500" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sky-300 font-medium mb-1">
                          <span>Impact Shock Resistance</span>
                          <span>High (Absorbs vehicle impacts)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-11/12 h-full bg-emerald-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-sky-300 font-medium">
                    ✔ <strong>Best Use:</strong> Residential car driveways, parking lots, city roads &amp; highways.
                  </div>
                </div>

              </div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              4 · VISUAL LOAD CLASS GUIDE (A15 TO F900)
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="load-guide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="py-20 px-6 sm:px-10 bg-slate-50 border-b border-slate-200"
            aria-label="EN 124 Load class guide"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                  <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-sky-600 uppercase block mb-2">
                    EN 124 Standard
                  </span>
                  <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-slate-900 tracking-tight">
                    Load Rating Reference
                  </h2>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-light max-w-sm">
                  Quick visual reference mapping EN 124 load classes to vehicle traffic.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {LOAD_CLASSES.map((card) => (
                  <div
                    key={card.code}
                    className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:border-sky-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                          {card.icon}
                        </div>
                        <span className="font-oswald font-bold text-slate-900 text-lg">{card.load}</span>
                      </div>
                      <div className="font-sans text-[10px] uppercase font-bold tracking-widest text-sky-600 mb-1">{card.code}</div>
                      <h3 className="font-oswald text-base font-bold uppercase text-slate-900 mb-2">{card.duty}</h3>
                      <p className="text-xs text-slate-600 font-medium leading-snug">{card.vehicle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              5 · PRODUCT CATALOG GRID
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="products"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="py-20 px-6 sm:px-10 bg-white border-b border-slate-200"
            aria-label="NECO Product Catalog"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                  <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-sky-600 uppercase block mb-2">
                    Product Catalog
                  </span>
                  <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-slate-900 tracking-tight">
                    Essential NECO Models
                  </h2>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-light max-w-sm">
                  Tested and certified to IS 1726 and EN 124-2 standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.map((product) => (
                  <div
                    key={product.title}
                    className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className={`absolute top-4 left-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${product.badgeColor}`}>
                        {product.badge}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">{product.material}</div>
                        <h3 className="font-oswald text-lg font-bold uppercase text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                          {product.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {product.applications.map((app) => (
                            <span key={app} className="text-[10px] px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full font-medium">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/917356863985?text=Hello%20Universal%20Sanitary%20House,%20I%20am%20interested%20in%20learning%20more%20about:%20${encodeURIComponent(product.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs uppercase font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageSquare size={13} /> Consult Dealer Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              6 · KERALA DEALER AUTHORITY & SHOWROOM BANNER
          ════════════════════════════════════════════════════════════ */}
          <motion.section
            id="showroom"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="py-20 px-6 sm:px-10 bg-slate-50 border-b border-slate-200"
            aria-label="Universal Sanitary House Kerala Dealer Authority"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-sky-600 uppercase block">
                  Kerala State Distributor
                </span>
                <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-slate-900 tracking-tight">
                  Universal Sanitary House
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  Kerala&apos;s official authorized dealer for authentic NECO iron castings. Ready warehouse stock at Jew Street, Ernakulam with prompt delivery across all 14 districts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {DEALER_TRUST_PILLARS.map((p) => (
                    <div key={p.title} className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                      <div className="p-2 bg-sky-50 text-sky-600 rounded-xl shrink-0">
                        {p.icon}
                      </div>
                      <div>
                        <div className="font-sans text-xs font-bold text-slate-900 uppercase">{p.title}</div>
                        <div className="text-[11px] text-slate-500 font-light mt-0.5 leading-snug">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showroom Contact Card */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-7 space-y-5 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-sky-600">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-oswald text-xl font-bold uppercase text-slate-900">Ernakulam Showroom</h3>
                    <span className="text-xs text-sky-600 font-medium">Jew Street, Kochi, Kerala</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 font-light leading-relaxed border-t border-b border-slate-100 py-4">
                  <div><strong className="text-slate-900">Address:</strong> Post Box No. 3674, Jew Street, Ernakulam, Kochi - 682035</div>
                  <div><strong className="text-slate-900">Phone:</strong> +91-484-2351581 / +91 7356 863985</div>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    href="https://wa.me/917356863985?text=Hello%20Universal%20Sanitary%20House,%20I%20want%20to%20inquire%20about%20NECO%20stock."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-md shadow-sky-900/20"
                  >
                    <MessageSquare size={15} /> WhatsApp Support
                  </a>
                  <a
                    href="tel:+914842351581"
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2"
                  >
                    <Phone size={15} /> Call: 0484-2351581
                  </a>
                </div>
              </div>

            </div>
          </motion.section>

          {/* ════════════════════════════════════════════════════════════
              7 · FAQ ACCORDION
          ════════════════════════════════════════════════════════════ */}
          <section id="faq" className="py-20 px-6 sm:px-10 bg-white border-b border-slate-200">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-sky-600 uppercase block mb-2">FAQ</span>
                <h2 className="font-oswald text-3xl sm:text-4xl font-bold uppercase text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <FaqAccordion faqs={FAQS} />
            </div>
          </section>

        </main>

        {/* ════════════════════════════════════════════════════════════
            LUXURY FOOTER
        ════════════════════════════════════════════════════════════ */}
        <footer className="bg-slate-900 text-slate-400 py-12 px-6 md:px-10 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <span className="font-oswald text-xl font-bold text-white uppercase tracking-wider">NECO</span>
              <span className="w-px h-4 bg-slate-700" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400">Universal Sanitary House Kerala</span>
            </div>
            <div className="flex items-center gap-6 text-[11px]">
              <a href="#hero" className="hover:text-white transition-colors">Top</a>
              <a href="#material-science" className="hover:text-white transition-colors">Material Guide</a>
              <a href="#products" className="hover:text-white transition-colors">Products</a>
              <a href="#showroom" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-[11px] text-slate-500 font-light">
              © {new Date().getFullYear()} Universal Sanitary House. All rights reserved.
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
