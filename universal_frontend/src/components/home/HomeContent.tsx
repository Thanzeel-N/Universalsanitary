"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useScroll, animate } from "framer-motion";
import { ShoppingBag, ArrowRight, Quote, Star, ShieldCheck, Truck, Clock, Headset } from "lucide-react";
import InstagramFeed from "@/components/layout/InstagramFeed";

function Counter({ from, to, formatter }: { from: number, to: number, formatter?: (v: number) => string }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => formatter ? formatter(latest) : Math.round(latest).toString());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1]
    }
  }
} as const;

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.15
    }
  }
} as const;

const heroItemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1]
    }
  }
} as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
} as const;

import { apiUrl } from "@/lib/api";

export default function HomeContent({ categories }: { categories: any[] }) {
  const [activeTab, setActiveTab] = useState("Jaquar Signature");
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  useEffect(() => {
    fetch(apiUrl(`/api/v1/products/`))
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.reverse().slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Hero section parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "45%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  // Legacy section parallax
  const legacyRef = useRef(null);
  const { scrollYProgress: legacyScroll } = useScroll({
    target: legacyRef,
    offset: ["start end", "end start"]
  });
  const legacyImgY = useTransform(legacyScroll, [0, 1], ["-12%", "12%"]);
  const legacyBadgeY = useTransform(legacyScroll, [0, 1], ["20px", "-20px"]);

  // Why Choose Us section parallax
  const chooseRef = useRef(null);
  const { scrollYProgress: chooseScroll } = useScroll({
    target: chooseRef,
    offset: ["start end", "end start"]
  });
  const chooseBgY1 = useTransform(chooseScroll, [0, 1], ["-150px", "150px"]);
  const chooseBgY2 = useTransform(chooseScroll, [0, 1], ["100px", "-100px"]);

  // Shop the look section parallax
  const lookRef = useRef(null);
  const { scrollYProgress: lookScroll } = useScroll({
    target: lookRef,
    offset: ["start end", "end start"]
  });
  const lookImgY = useTransform(lookScroll, [0, 1], ["-8%", "8%"]);

  const looks = [
    {
      id: "Jaquar Signature",
      image: "/images/space/bathroom.webp",
      hotspots: [
        {
          id: 1, x: 47.3, y: 65.5,
          title: "Freestanding Bath Tube",
          brand: "Jaquar",
          desc: "An elegantly contoured freestanding bath that serves as the luxurious centerpiece of the modern bathroom.",
          price: "₹82,500",
          image: "/images/space/bath_tube.webp",
          slug: "freestanding-bath-tube"
        },
        {
          id: 2, x: 24.5, y: 70,
          title: "Thin Rim Table Top Basin",
          brand: "Jaquar",
          desc: "Solo by Jaquar presents JDS series washbasins with a thin rim table top design.",
          price: "₹8,900",
          image: "/images/space/wash_basin.webp",
          slug: "thin-rim-table-top-basin"
        },
        {
          id: 3, x: 87, y: 83,
          title: "Rimless Wall-Hung WC",
          brand: "Jaquar",
          desc: "Solo by Jaquar presents Rimless WC with hidden installation screws for better aesthetics.",
          price: "₹15,700",
          image: "/images/space/toilet_closet.webp",
          slug: "rimless-wall-hung-wc"
        },
        {
          id: 4, x: 63.5, y: 56.5,
          title: "Beta L-Shaped Shower Enclosure",
          brand: "Jaquar",
          desc: "Premium L-shaped glass shower enclosure with high-quality hinges and tempered safety glass.",
          price: "₹1,06,000",
          image: "/images/space/shower_closet.webp",
          slug: "beta-l-shaped-shower-enclosure"
        },
        {
          id: 5, x: 14.5, y: 63.5,
          title: "Concealed Stop Cocks",
          brand: "Jaquar",
          desc: "Exposed part kit of two concealed stop cocks in Blush Gold Bright PVD finish.",
          price: "₹17,300",
          image: "/images/space/faucet.webp",
          slug: "concealed-stop-cocks"
        }
      ]
    }
  ];

  const currentLook = looks.find(l => l.id === activeTab) || looks[0];

  const collections = [
    { id: 1, name: "Premium Basins", img: "/images/col_basins.webp", slug: "premium-basin-accessory" },
    { id: 2, name: "Luxury Faucets", img: "/images/col_faucets.webp", slug: "luxury-faucet-accessory" },
    { id: 3, name: "Shower Systems", img: "/images/col_shower.webp", slug: "shower-system-accessory" },
    { id: 4, name: "Smart Toilets", img: "/images/col_toilets.webp", slug: "smart-toilet-accessory" },
    { id: 5, name: "Bath Accessories", img: "/images/grid1.webp", slug: "bath-accessory-suite" },
  ];

  const reviews = [
    {
      id: 1,
      text: "Good Service. Competitive Pricing. The premium faucets and shower enclosures were delivered to the site twice without any delay or followup. Excellent sanitaryware collections!",
      author: "Aravind N",
      location: "Kochi",
      rating: 5
    },
    {
      id: 2,
      text: "Had a good visit, they have a sea of collection in sanitary items and the behaviour of staffs is also superb. Their selection of luxury bathroom fittings is unmatched.",
      author: "Sudeep Sundaram",
      location: "Trivandrum",
      rating: 5
    },
    {
      id: 3,
      text: "My experience with Universal Sanitary House was excellent The staff were experienced, polite and professionals who helped me choose from their variety of durable products. They have a reliable delivery partner that ensures timely delivery. I also appreciate their easy returns policy and the availability of discounts.",
      author: "Subaida Ismail",
      location: "Kozhikode",
      rating: 5
    },
    {
      id: 4,
      text: "Outstanding range of luxury sanitary products. The quality of the products is top-notch, and the price is very competitive. Outstanding customer service and elegant showroom design!",
      author: "Ranjith Kumar",
      location: "Thrissur",
      rating: 5
    },
    {
      id: 5,
      text: "Beautifully curated luxury bathroom fittings. The freestanding bathtub we purchased has become the highlight of our home. Truly a five-star experience from start to finish!",
      author: "Meera Nair",
      location: "Kottayam",
      rating: 5
    }
  ];

  return (
    <main className="min-h-screen bg-background" onClick={() => setActiveHotspot(null)}>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-primary text-background overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <motion.img 
            style={{ y: heroImgY }}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="/images/hero.webp" 
            alt="Luxury Sanitaryware" 
            className="w-full h-full object-cover blur-[2px]" 
          />
          {/* Layered overlay for premium text legibility and vignetting */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.4)_100%)]" />
        </div>
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Top Tagline */}
          <motion.span 
            variants={heroItemVariants}
            className="text-[10px] md:text-xs font-sans font-bold tracking-[0.35em] text-sky-400 uppercase mb-4 block"
          >
            Universal Sanitary House
          </motion.span>
          
          {/* Large Editorial Headline */}
          <motion.h1 
            variants={heroItemVariants}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-6 leading-tight drop-shadow-lg"
          >
            Defining <span className="italic font-normal text-sky-100">Luxury Spaces</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={heroItemVariants}
            className="font-sans text-xs md:text-sm text-neutral-300 tracking-[0.25em] uppercase max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-md"
          >
            Kerala's Premier Destination for Luxury Sanitaryware Since 1968
          </motion.p>
          
          {/* Custom Slide-Fill Button */}
          <motion.div variants={heroItemVariants}>
            <Link 
              href="/products"
              className="group relative inline-block overflow-hidden border border-white/30 hover:border-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-500 ease-out shadow-lg"
            >
              <span className="relative z-10 text-white transition-colors duration-500 group-hover:text-neutral-900">
                Explore the Collection
              </span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <motion.section 
        ref={legacyRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="py-16 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
      >
        <div className="flex-1 w-full relative group">
          {/* Background decorative offset frame */}
          <div className="absolute inset-4 -right-2 -bottom-2 border border-primary/20 rounded-2xl group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
          
          {/* Main image container */}
          <div className="relative w-full aspect-[4/5] bg-neutral-100 rounded-2xl overflow-hidden shadow-lg border border-neutral-200/50">
            <motion.img 
              style={{ y: legacyImgY, scale: 1.15 }}
              src="/images/about/interior_1968.webp" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-120" 
              alt="Legacy Showroom" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
          </div>

          {/* Floating detail badge */}
          <motion.div 
            style={{ y: legacyBadgeY }}
            className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-neutral-200/50 py-3 px-5 rounded-xl shadow-md flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-neutral-800">Est. 1968</span>
          </motion.div>
        </div>

        <div className="flex-1 text-left">
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
            Our Heritage
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-neutral-900 font-light leading-tight">
            Defining Luxury <br/>Since <span className="italic font-normal text-primary">1968</span>
          </h2>
          <p className="text-neutral-500 mb-10 max-w-lg leading-[1.8] text-base md:text-lg font-light">
            For over five decades, Universal Sanitary House has been the premier destination for homeowners, architects, and designers seeking unparalleled elegance. We don't just sell sanitaryware; we curate experiences that transform everyday rituals into moments of luxury.
          </p>

          <div className="grid grid-cols-2 gap-6 md:gap-8 mb-10 max-w-md bg-stone-50/50 border border-stone-100/80 p-6 rounded-2xl">
            <div className="text-left">
              <div className="font-playfair text-4xl md:text-5xl text-primary font-light mb-2 flex items-center">
                <Counter from={0} to={55} />+
              </div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Years of Experience</p>
            </div>
            <div className="text-left border-l border-neutral-200 pl-6 md:pl-8">
              <div className="font-playfair text-4xl md:text-5xl text-primary font-light mb-2 flex items-center">
                <Counter
                  from={0}
                  to={10000}
                  formatter={(v) => {
                    if (v >= 10000) return "10k+";
                    return `${(v / 1000).toFixed(1)}k+`;
                  }}
                />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Happy Families</p>
            </div>
          </div>

          <Link 
            href="/about" 
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary hover:text-blue-800 transition-colors duration-300"
          >
            <span>Discover Our Story</span>
            <span className="w-8 h-[1px] bg-primary group-hover:w-12 transition-all duration-300" />
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.section>

      {/* Premium Partners */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="py-20 border-b border-neutral-200 bg-white overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 text-center mb-10">
          <p className="font-sans text-xs uppercase tracking-widest text-neutral-400 font-bold">In Partnership With Global Leaders</p>
        </div>
        <div className="flex justify-center items-center gap-12 md:gap-24 lg:gap-32 flex-wrap opacity-40 grayscale">
          <h3 className="font-playfair text-3xl">Jaquar</h3>
          <h3 className="font-playfair text-3xl font-bold italic">Artize</h3>
          <h3 className="font-playfair text-3xl tracking-widest">CERA</h3>
          <h3 className="font-playfair text-3xl">KOHLER</h3>
          <h3 className="font-playfair text-3xl font-bold">Parryware</h3>
          <h3 className="font-playfair text-3xl tracking-wider text-neutral-800">NECO</h3>
        </div>
      </motion.section>

      <motion.section 
        ref={chooseRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="py-16 md:py-28 px-6 md:px-12 bg-[#FCFAF9] border-b border-neutral-200 relative overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(circle at top, #ffffff 0%, #FAF9F6 100%)' }}
      >
        {/* Subtle background decorative shapes for luxury branding */}
        <motion.div 
          style={{ y: chooseBgY1 }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-50/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" 
        />
        <motion.div 
          style={{ y: chooseBgY2 }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-50/20 rounded-full blur-3xl pointer-events-none translate-y-1/2" 
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
              The Universal Standard
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-neutral-900 mb-6 tracking-wide font-light">
              Why Thousands of Families <span className="italic font-normal text-primary">Trust Us</span>
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-sky-200 via-primary to-sky-200 mx-auto mb-6" />
            <p className="text-neutral-500 max-w-2xl mx-auto text-base md:text-lg leading-[1.7] font-light">
              Kerala's most trusted sanitaryware destination since 1968
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {/* Pillar 1 */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-12px_rgba(10,128,190,0.12)] hover:border-primary/25 hover:bg-white transition-all duration-500 flex flex-col items-start overflow-hidden group cursor-default"
            >
              {/* Elegant Luxury Numbering */}
              <span className="absolute top-4 right-6 md:right-8 font-playfair text-6xl md:text-7xl text-neutral-100/80 font-bold select-none group-hover:text-sky-50/50 transition-colors duration-500 pointer-events-none">
                01
              </span>

              {/* Glowing ring and Icon Container */}
              <div className="relative mb-8 shrink-0">
                <div className="absolute inset-[-6px] rounded-full border border-primary/0 group-hover:border-primary/20 group-hover:scale-105 transition-all duration-500 ease-out" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-neutral-200 bg-neutral-50/80 flex items-center justify-center text-primary group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 group-hover:border-transparent transition-all duration-500 ease-out shadow-sm relative z-10">
                  <ShieldCheck size={26} strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="font-playfair text-lg md:text-xl font-bold text-neutral-900 mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
                Authorised & Exclusive Dealer
              </h3>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light">
                Official dealer for Jaquar, Kohler, Grohe, TOTO, Artize, and the one and only exclusive dealership in Kerala for NECO manhole & drainage covers.
              </p>

              {/* Expanding Blue Hover Indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-sky-400 via-primary to-blue-600 group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-12px_rgba(10,128,190,0.12)] hover:border-primary/25 hover:bg-white transition-all duration-500 flex flex-col items-start overflow-hidden group cursor-default"
            >
              {/* Elegant Luxury Numbering */}
              <span className="absolute top-4 right-6 md:right-8 font-playfair text-6xl md:text-7xl text-neutral-100/80 font-bold select-none group-hover:text-sky-50/50 transition-colors duration-500 pointer-events-none">
                02
              </span>

              {/* Glowing ring and Icon Container */}
              <div className="relative mb-8 shrink-0">
                <div className="absolute inset-[-6px] rounded-full border border-primary/0 group-hover:border-primary/20 group-hover:scale-105 transition-all duration-500 ease-out" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-neutral-200 bg-neutral-50/80 flex items-center justify-center text-primary group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 group-hover:border-transparent transition-all duration-500 ease-out shadow-sm relative z-10">
                  <Truck size={26} strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="font-playfair text-lg md:text-xl font-bold text-neutral-900 mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
                Delivery Across Kerala
              </h3>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light">
                Free delivery and installation support to all major cities including Kochi, Thrissur, Calicut and Trivandrum.
              </p>

              {/* Expanding Blue Hover Indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-sky-400 via-primary to-blue-600 group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-12px_rgba(10,128,190,0.12)] hover:border-primary/25 hover:bg-white transition-all duration-500 flex flex-col items-start overflow-hidden group cursor-default"
            >
              {/* Elegant Luxury Numbering */}
              <span className="absolute top-4 right-6 md:right-8 font-playfair text-6xl md:text-7xl text-neutral-100/80 font-bold select-none group-hover:text-sky-50/50 transition-colors duration-500 pointer-events-none">
                03
              </span>

              {/* Glowing ring and Icon Container */}
              <div className="relative mb-8 shrink-0">
                <div className="absolute inset-[-6px] rounded-full border border-primary/0 group-hover:border-primary/20 group-hover:scale-105 transition-all duration-500 ease-out" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-neutral-200 bg-neutral-50/80 flex items-center justify-center text-primary group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 group-hover:border-transparent transition-all duration-500 ease-out shadow-sm relative z-10">
                  <Clock size={26} strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="font-playfair text-lg md:text-xl font-bold text-neutral-900 mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
                55 Years of Expertise
              </h3>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light">
                Since 1968, we have helped over 10,000 families build their dream bathrooms with premium products.
              </p>

              {/* Expanding Blue Hover Indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-sky-400 via-primary to-blue-600 group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>

            {/* Pillar 4 */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-12px_rgba(10,128,190,0.12)] hover:border-primary/25 hover:bg-white transition-all duration-500 flex flex-col items-start overflow-hidden group cursor-default"
            >
              {/* Elegant Luxury Numbering */}
              <span className="absolute top-4 right-6 md:right-8 font-playfair text-6xl md:text-7xl text-neutral-100/80 font-bold select-none group-hover:text-sky-50/50 transition-colors duration-500 pointer-events-none">
                04
              </span>

              {/* Glowing ring and Icon Container */}
              <div className="relative mb-8 shrink-0">
                <div className="absolute inset-[-6px] rounded-full border border-primary/0 group-hover:border-primary/20 group-hover:scale-105 transition-all duration-500 ease-out" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-neutral-200 bg-neutral-50/80 flex items-center justify-center text-primary group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 group-hover:border-transparent transition-all duration-500 ease-out shadow-sm relative z-10">
                  <Headset size={26} strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="font-playfair text-lg md:text-xl font-bold text-neutral-900 mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
                After-Sales Support
              </h3>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light">
                Dedicated support team available 6 days a week. We stand behind every product we sell.
              </p>

              {/* Expanding Blue Hover Indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-sky-400 via-primary to-blue-600 group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="py-16 md:py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-neutral-200"
      >
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-playfair text-4xl text-foreground">Featured Showcase</h2>
          <Link href="/products" className="text-sm font-bold uppercase tracking-widest hover:text-neutral-500 transition-colors">
            View All
          </Link>
        </div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.div variants={cardVariants} key={product.id} className="group block cursor-pointer">
              <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4 relative">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images.find((img: any) => img.is_primary)?.image || product.images[0].image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                    <ShoppingBag size={48} strokeWidth={1} />
                  </div>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">{product.category?.name || "Sanitary"}</p>
              <h3 className="font-playfair text-lg text-foreground mb-1">{product.name}</h3>
              <p className="text-base text-neutral-500 line-clamp-2 leading-[1.7]">{product.description}</p>
            </motion.div>
          ))}
          {featuredProducts.length === 0 && (
            <div className="col-span-full text-center py-20 text-neutral-500">
              New arrivals coming soon.
            </div>
          )}
        </motion.div>
      </motion.section>

      <motion.section 
        ref={lookRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="py-16 md:py-24 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl mb-4 text-foreground">Shop The <span className="text-neutral-400">Look</span></h2>
          </div>
          <div className="text-left md:text-right mt-6 md:mt-0">
            <p className="text-neutral-500 mb-6 max-w-sm ml-auto text-base leading-[1.7]">Recreate this setting effortlessly with our pre-curated combo of matching pieces.</p>
            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
              {looks.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveHotspot(null);
                  }}
                  className={`px-6 py-2 rounded-md text-sm transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                >
                  {tab.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Increased image size with min-h and dynamic aspect ratio */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/10] min-h-[300px] md:min-h-[500px] lg:min-h-[700px] bg-neutral-200 rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              style={{ y: lookImgY, scale: 1.1 }}
              key={currentLook.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={currentLook.image} 
              alt={currentLook.id} 
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </AnimatePresence>
          
          {currentLook.hotspots.map((spot) => {
            // Dynamic placement logic: Ensures the card opens inward, staying within the bounds of the image container.
            const isRightSide = spot.x > 50;
            const isBottomSide = spot.y > 50;
            
            const posX = isRightSide ? "right-4" : "left-4";
            const posY = isBottomSide ? "bottom-4" : "top-4";
            const animY = isBottomSide ? 10 : -10;

            return (
            <div 
              key={spot.id}
              className="absolute z-10"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
              }}
            >
              <div className="relative flex items-center justify-center cursor-pointer -translate-x-1/2 -translate-y-1/2">
                <div className="absolute w-8 h-8 bg-white/50 rounded-full animate-ping duration-1000"></div>
                <div className="relative w-4 h-4 bg-white rounded-full shadow-lg border border-neutral-200"></div>
              </div>

              <AnimatePresence>
                {activeHotspot === spot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: animY, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: animY, scale: 0.95 }}
                    className={`absolute z-20 ${posY} ${posX} w-52 bg-white rounded-xl shadow-2xl overflow-hidden p-2 hidden md:block`}
                  >
                    <Link href={`/products/${spot.slug}`} className="block group/card">
                      <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-2 bg-neutral-100">
                        <img src={spot.image} alt={spot.title} className="w-full h-full object-contain p-2 group-hover/card:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="px-1 pb-1">
                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-1">{spot.brand}</p>
                        <h4 className="font-playfair text-sm text-foreground leading-tight mb-1 group-hover/card:text-primary transition-colors">{spot.title}</h4>
                        <p className="font-sans text-[10px] text-neutral-500 mb-2 line-clamp-2 leading-tight">{spot.desc}</p>
                        <div className="flex justify-between items-center border-t border-neutral-100 pt-2 mt-1">
                           <p className="font-sans font-bold text-xs">{spot.price}</p>
                          <span className="bg-primary text-white text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md group-hover/card:brightness-110 transition-colors">
                            View
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )})}
        </div>

        {/* Mobile Hotspot Info Card */}
        <AnimatePresence>
          {activeHotspot !== null && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-6 md:hidden w-full bg-white rounded-xl border border-neutral-200 p-4 shadow-md flex gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const spot = currentLook.hotspots.find(s => s.id === activeHotspot);
                if (!spot) return null;
                return (
                  <Link href={`/products/${spot.slug}`} className="flex gap-4 w-full items-center">
                    <div className="w-20 h-20 bg-neutral-50 rounded-lg overflow-hidden shrink-0 border border-neutral-100 p-2">
                      <img src={spot.image} alt={spot.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">{spot.brand}</p>
                      <h4 className="font-playfair text-sm text-foreground font-bold truncate mb-0.5">{spot.title}</h4>
                      <p className="font-sans text-[11px] text-neutral-500 line-clamp-1 mb-1.5">{spot.desc}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-xs">{spot.price}</span>
                        <span className="text-[10px] text-primary uppercase font-bold tracking-widest border-b border-primary pb-0.5">View Details</span>
                      </div>
                    </div>
                  </Link>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>



      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="py-16 md:py-24 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl text-foreground">Curated Collections</h2>
          </div>
          <div className="max-w-md mt-6 md:mt-0">
            <p className="text-neutral-500 text-base leading-[1.7]">Thoughtfully designed bathroom accessories tailored to enhance every room with timeless style.</p>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          className="flex flex-col md:flex-row h-auto md:h-[600px] w-full gap-4 md:gap-6"
        >
          {collections.map((col) => (
            <motion.div 
              variants={cardVariants}
              key={col.id}
              className="group relative w-full md:w-auto md:flex-1 md:hover:flex-[4] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl overflow-hidden cursor-pointer h-[200px] md:h-full bg-neutral-200 block shrink-0"
            >
              <Link href={`/products?category=${col.slug}`} className="absolute inset-0 block">
                <img 
                  src={col.img} 
                  alt={col.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 md:opacity-60 md:group-hover:opacity-80 transition-opacity duration-700" />
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <h3 className="text-white font-playfair text-2xl lg:text-3xl font-bold opacity-100 md:opacity-0 transform md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-out">
                    {col.name}
                  </h3>
                  <div className="text-white opacity-100 md:opacity-0 transform md:translate-x-[-10px] md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-out delay-100 bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <Link href="/products" className="bg-primary text-white px-8 py-4 rounded-md font-sans hover:brightness-110 transition-colors smooth-hover">
            Explore Collections
          </Link>
        </div>
      </motion.section>

      <InstagramFeed username="universalsanitaryhouse" />

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="py-16 md:py-24 px-6 md:px-12 bg-neutral-100 border-t border-neutral-200"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-foreground mb-4">Client Testimonials</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-base leading-[1.7]">What our customers are saying about their experience with Universal Sanitary House.</p>
          </div>
          <div className="relative flex justify-center min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-3xl flex flex-col"
              >
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center text-center flex-1">
                  <Quote className="text-primary opacity-20 mb-6" size={40} />
                  <div className="flex gap-1 mb-4">
                    {[...Array(reviews[activeReviewIndex].rating || 5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-neutral-600 italic mb-8 flex-1 leading-[1.7] text-lg md:text-xl">"{reviews[activeReviewIndex].text}"</p>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-playfair font-bold text-xl uppercase mb-2">
                      {reviews[activeReviewIndex].author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-foreground">{reviews[activeReviewIndex].author}</h4>
                      <p className="text-xs text-neutral-400">Verified Customer, {reviews[activeReviewIndex].location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReviewIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeReviewIndex === idx ? 'bg-primary' : 'bg-neutral-300 hover:bg-neutral-400'}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="py-16 md:py-24 px-6 md:px-12 bg-white border-t border-neutral-200"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl text-foreground mb-6">Visit Our Showroom</h2>
            <p className="text-neutral-500 mb-8 max-w-lg text-base leading-[1.7]">
              Experience our luxury collections firsthand. Visit our premier showroom in Ernakulam to explore a curated range of luxury sanitaryware, premium faucets, and modern shower systems with the help of our expert design consultants.
            </p>
            <div className="space-y-6 mb-8">
              <div>
                <h4 className="font-sans font-bold uppercase tracking-widest text-xs text-neutral-400 mb-1">Showroom Hours</h4>
                <p className="text-base text-neutral-700 leading-[1.7]">Monday to Saturday, 9am to 7pm</p>
              </div>
              <div>
                <h4 className="font-sans font-bold uppercase tracking-widest text-xs text-neutral-400 mb-1">Address</h4>
                <p className="text-base text-neutral-700 leading-[1.7]">Jew Street, Padma Junction, Ernakulam, Kochi 682035</p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Universal+Sanitary+House,+Jew+Street,+Padma+Junction,+Ernakulam,+Kochi+682035"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white px-8 py-4 rounded-md font-sans uppercase tracking-widest text-sm font-bold hover:brightness-110 smooth-hover transition-all duration-300"
            >
              Get Directions
            </a>
          </div>
          <div className="w-full h-[400px] md:h-[450px] bg-neutral-100 rounded-2xl overflow-hidden shadow-lg border border-neutral-200/50">
            <iframe
              src="https://maps.google.com/maps?q=Universal%20Sanitary%20House,%20Jew%20Street,%20Padma%20Junction,%20Ernakulam,%20Kochi%20682035&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Universal Sanitary House Showroom Location"
            ></iframe>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
