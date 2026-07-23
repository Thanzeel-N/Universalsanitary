"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mountain, Award, Handshake, MapPin, Building, Home } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
}

const milestones: Milestone[] = [
  {
    id: "1946",
    title: "The Beginning",
    subtitle: "FIRST BRANCH OPENED",
    description: "Opened our first branch in Perumbavoor, marking the start of our legacy in the sanitaryware industry.",
    icon: MapPin,
  },
  {
    id: "1965",
    title: "Expansion",
    subtitle: "ERNAKULAM BROADWAY",
    description: "Expanded our presence with a new shop in the bustling Ernakulam Broadway.",
    icon: Building,
  },
  {
    id: "1968",
    title: "A New Home",
    subtitle: "JEW STREET BUILDING",
    description:"Moved into our current dedicated building on Jew Street, marking a new chapter of growth and progress.",
    icon: Home,
  },
  {
    id: "04",
    title: "Pioneers",
    subtitle: "LEADING DEALERSHIPS",
    description: "Proud to be the first dealership for CERA and JAGUAR in Kerala, and the second dealer for Parryware in the state.",
    icon: Mountain,
  },
  {
    id: "05",
    title: "Certified",
    subtitle: "RECOGNIZED EXCELLENCE",
    description: "Achieved GEM and MSME certifications, reflecting our commitment to quality and standard business practices.",
    icon: Award,
  },
  {
    id: "06",
    title: "Trusted",
    subtitle: "APPROVED SUPPLIERS",
    description: "Became approved suppliers for prestigious organizations including Cochin Shipyard, Naval Base, and CPWD.",
    icon: Handshake,
  },
];

export default function JourneySection() {
  const marqueeItems = [...milestones, ...milestones];

  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border-[1px] border-[#B8985B]/10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border-[1px] border-[#B8985B]/5 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full border-[1px] border-[#B8985B]/10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 mb-16 text-center">
        
        {/* Header Section */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-12 h-[1px] bg-[#B8985B]"></div>
          <span className="text-[#B8985B] uppercase tracking-[0.3em] text-xs font-semibold">Our Journey</span>
          <div className="w-12 h-[1px] bg-[#B8985B]"></div>
        </div>
        <h2 className="font-playfair text-5xl md:text-6xl mb-6">
          <span className="text-white">The </span>
          <span className="text-[#B8985B]">Journey</span>
        </h2>
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-[2px] bg-[#B8985B]"></div>
          <div className="w-2 h-2 rotate-45 bg-[#B8985B] mx-1"></div>
          <div className="w-8 h-[2px] bg-[#B8985B]"></div>
        </div>
        <p className="font-sans text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
          A chronological curation of our most defining moments, partnerships, 
          and milestones over the decades.
        </p>
      </div>

      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scrollMarquee 40s linear infinite;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused !important;
        }
      `}</style>

      <div 
        className="relative z-10 w-full overflow-hidden py-8 marquee-container"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {/* Scrolling Track */}
        <div className="animate-marquee flex space-x-6 px-4 md:px-8 w-max">
          {marqueeItems.map((milestone, idx) => {
            const Icon = milestone.icon;
            return (
              <div 
                key={idx}
                className="shrink-0 w-[300px] md:w-[340px] bg-gradient-to-b from-[#161616] to-[#0a0a0a] border border-[#B8985B]/30 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 hover:border-[#B8985B] hover:-translate-y-2 group/card"
              >
                {/* Subtle curved overlay behind the icon (like in reference) */}
                <div className="absolute top-0 left-0 w-full h-32 bg-[#1a1a1a] rounded-b-[100%] border-b border-[#B8985B]/20 z-0"></div>

                {/* Circular Emblem */}
                <div className="relative w-20 h-20 rounded-full border border-[#B8985B] flex items-center justify-center bg-[#0a0a0a] z-10 mb-8 shadow-[0_0_20px_rgba(184,152,91,0.15)] group-hover/card:shadow-[0_0_30px_rgba(184,152,91,0.3)] transition-shadow duration-500">
                  <Icon className="text-[#B8985B] w-8 h-8" strokeWidth={1.5} />
                </div>

                {/* Background Number */}
                <div className="absolute top-32 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-playfair font-bold text-white opacity-[0.03] pointer-events-none select-none z-0">
                  {milestone.id}
                </div>

                {/* ID small */}
                <span className="text-neutral-500 font-playfair font-bold text-xl mb-2 z-10">{milestone.id}</span>

                {/* Title */}
                <h3 className="font-playfair text-3xl text-white mb-6 z-10">{milestone.title}</h3>
                
                {/* Subtitle */}
                <h4 className="text-[#B8985B] text-xs font-bold uppercase tracking-widest mb-4 z-10">{milestone.subtitle}</h4>
                
                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed z-10 px-2 whitespace-normal">
                  {milestone.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
