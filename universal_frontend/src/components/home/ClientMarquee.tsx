"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CLIENT_LOGOS = [
  { logo: '/images/clients/client_14.webp', name: 'Sobha' },
  { logo: '/images/clients/client_15.png', name: 'Prestige Group' },
  { logo: '/images/clients/client_17.png', name: 'Taj Hotels' },
  { logo: '/images/clients/taj-malabar.jpg', name: 'Taj Malabar Resort & Spa' },
  { logo: '/images/clients/holiday-inn.png', name: 'Holiday Inn' },
  { logo: '/images/clients/ramada-kochi.png', name: 'Ramada by Wyndham Kochi' },
  { logo: '/images/clients/client_12.jpg', name: 'Crowne Plaza' },
  { logo: '/images/clients/client_9.webp', name: 'Aster Medcity' },
  { logo: '/images/clients/client_33.jpg', name: 'Amrita Hospital' },
  { logo: '/images/clients/client_16.png', name: 'Cochin International Airport' },
  { logo: '/images/clients/client_32.png', name: 'Agasthya Ayurvedic Medical Centre' },
  { logo: '/images/clients/client_41.png', name: 'The Leaf Munnar' },
  { logo: '/images/clients/client_1.png', name: 'TATA' },
  { logo: '/images/clients/client_21.jpg', name: 'Skyline Builders' },
  { logo: '/images/clients/client_43.webp', name: 'The Tall Trees Munnar' },
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
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => {
            const isDark = client.logo.includes('ramada-kochi.png') || client.logo.includes('client_6.png');
            return (
              <div 
                key={idx} 
                className="inline-flex items-center justify-center w-32 h-20 md:w-48 md:h-24 mx-4 md:mx-6 bg-white rounded-lg p-3 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className={`relative w-full h-full rounded-md ${isDark ? 'bg-neutral-900 p-1.5' : ''}`}>
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className={`object-contain ${isDark ? '' : 'mix-blend-multiply'}`}
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

