import React from "react";
import Image from "next/image";

interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

const milestones: Milestone[] = [
  {
    year: "1968",
    title: "The Inception",
    description: "Universal Sanitary House was founded, starting its journey as a trusted provider of quality building materials in Kerala.",
    image: "/images/about/interior_1968.webp",
  },
  {
    year: "1978",
    title: "Kerala's First Pioneers",
    description: "Secured the historic distinction of becoming the first authorized dealership in Kerala for legendary brands Cera and Parryware.",
    image: "/images/space/classic_elegance.webp",
  },
  {
    year: "1990",
    title: "Showroom Expansion",
    description: "Transformed into a premier sanitary and tile concept showroom, showcasing complete bathroom designs for architects and builders.",
    image: "/images/space/bathroom.webp",
  },
  {
    year: "2005",
    title: "Visionary Luxury Pivot",
    description: "Under the leadership of Mr. T. E. Azad and Mr. T. E. Akbar, pivoted to curating top-tier international luxury bathroom collections.",
    image: "/images/space/modern_luxury.webp",
  },
  {
    year: "2015",
    title: "The NECO Partnership",
    description: "Appointed as the exclusive dealer for NECO in Kerala, reinforcing our footprint in commercial and municipal infrastructure.",
    image: "/images/space/shower_closet.webp",
  },
  {
    year: "2023 & Beyond",
    title: "Defining Luxury Spaces",
    description: "Having served over 10,000 families, we continue to bring the world's most premium sanitaryware and wellness designs to life.",
    image: "/images/space/minimal_zen.webp",
  },
];

export default function JourneySection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Minimal Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <div>
            <h2 className="font-sans font-light text-5xl md:text-7xl tracking-tighter text-neutral-900 dark:text-neutral-100">
              Our Journey.
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-sm">
            <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
              A chronological curation of our most defining moments, 
              partnerships, and architectural expansions over the decades.
            </p>
          </div>
        </div>

        {/* Minimalist List */}
        <div className="flex flex-col">
          {milestones.map((milestone, idx) => {
            const displayYear = milestone.year.split(' ')[0];
            const hasBeyond = milestone.year.includes('&');

            return (
              <div 
                key={idx} 
                className="group flex flex-col md:flex-row items-stretch py-12 md:py-20 border-b border-neutral-100 dark:border-neutral-900 last:border-0"
              >
                {/* Text Content (Left) */}
                <div className="w-full md:w-5/12 flex flex-col justify-between pr-0 md:pr-12 mb-10 md:mb-0">
                  <div>
                    <span className="font-sans font-light text-7xl md:text-8xl lg:text-9xl tracking-tighter text-neutral-900 dark:text-neutral-100 leading-none">
                      {displayYear}
                    </span>
                    {hasBeyond && (
                      <span className="block mt-3 font-sans text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
                        & Beyond
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-12 md:mt-auto">
                    <h3 className="font-sans font-medium text-xl md:text-2xl text-neutral-900 dark:text-neutral-100 mb-4 tracking-wide">
                      {milestone.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Image (Right) */}
                <div className="w-full md:w-7/12 relative h-[300px] md:h-[500px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-sm">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    fill
                    className="object-cover grayscale transition-all duration-[1s] ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
