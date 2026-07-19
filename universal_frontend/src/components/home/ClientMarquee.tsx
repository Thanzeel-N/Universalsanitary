"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CLIENT_LOGOS = [
  '/images/clients/client_14.webp', // Sobha
  '/images/clients/client_15.png', // Prestige Group
  '/images/clients/client_21.jpg', // Skyline Builders
  '/images/clients/client_22.jpg', // SFS Homes
  '/images/clients/client_23.jpg', // Abad Builders
  '/images/clients/client_24.jpg', // Heera Builders
  '/images/clients/client_25.jpg', // Asset Homes
  '/images/clients/client_17.png', // Taj Hotels
  '/images/clients/client_12.jpg', // Crowne Plaza
  '/images/clients/client_13.png', // Le Meridien
];

export default function ClientMarquee() {
  return (
    <section className="py-16 bg-neutral-50 border-t border-neutral-200 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8 flex justify-between items-end">
        <div>
          <h2 className="font-playfair text-2xl md:text-3xl text-foreground">Trusted by Industry Leaders</h2>
        </div>
        <Link href="/clients" className="group flex items-center text-sm font-sans font-bold text-primary hover:text-secondary transition-colors">
          View All Clients <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee whitespace-nowrap min-w-max mask-fade-edges items-center">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center justify-center w-32 h-20 md:w-48 md:h-24 mx-4 md:mx-6 bg-white rounded-lg p-3 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={logo}
                  alt={`Client ${idx}`}
                  fill
                  className="object-contain mix-blend-multiply"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
