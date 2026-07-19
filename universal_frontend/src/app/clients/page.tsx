import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Clients | Universal Sanitary',
  description: 'Discover the esteemed organizations that trust Universal Sanitary House.',
};

const CLIENTS = [
  { logo: '/images/clients/client_14.jpg', name: 'Sobha' },
  { logo: '/images/clients/client_15.jpg', name: 'Prestige Group' },
  { logo: '/images/clients/client_21.jpg', name: 'Skyline Builders' },
  { logo: '/images/clients/client_22.jpg', name: 'SFS Homes' },
  { logo: '/images/clients/client_23.jpg', name: 'Abad Builders' },
  { logo: '/images/clients/client_24.jpg', name: 'Heera Builders' },
  { logo: '/images/clients/client_25.jpg', name: 'Asset Homes' },
  { logo: '/images/clients/client_17.png', name: 'Taj Hotels' },
  { logo: '/images/clients/client_12.jpg', name: 'Crowne Plaza' },
  { logo: '/images/clients/client_13.png', name: 'Le Meridien' },
  { logo: '/images/clients/client_18.jpg', name: 'Casino Group of Hotels' },
  { logo: '/images/clients/client_7.jpg', name: 'Kumarakom Lake Resort' },
  { logo: '/images/clients/client_8.jpg', name: 'Coconut Lagoon' },
  { logo: '/images/clients/client_20.jpg', name: 'Spice Village' },
  { logo: '/images/clients/client_16.jpg', name: 'Cochin International Airport' },
  { logo: '/images/clients/client_9.jpg', name: 'Aster Medcity' },
  { logo: '/images/clients/client_10.jpg', name: 'Rajagiri Hospital' },
  { logo: '/images/clients/client_4.jpg', name: 'Infopark' },
  { logo: '/images/clients/client_6.jpg', name: 'Kerala Livestock Development Board' },
  { logo: '/images/clients/client_19.jpg', name: 'CPWD' },
  { logo: '/images/clients/client_1.jpg', name: 'TATA' },
  { logo: '/images/clients/client_2.jpg', name: 'Harrisons Malayalam' },
  { logo: '/images/clients/client_3.jpg', name: 'Kannan Devan' },
  { logo: '/images/clients/client_5.png', name: 'Sai Balaji' },
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-24">
          <span className="font-sans font-medium uppercase tracking-[0.2em] text-xs text-neutral-400 mb-6 block">
            Partners in Excellence
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-8 font-light">
            Our Trusted Clients
          </h1>
          <div className="w-12 h-[1px] bg-neutral-300 mx-auto mb-8"></div>
          <p className="text-neutral-500 font-sans text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
            We take immense pride in our long-standing relationships with some of the most esteemed organizations, developers, and architects.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-12 md:gap-y-24 md:gap-x-16">
          {CLIENTS.map((client, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center group">
              <div className="relative w-full h-16 md:h-20 lg:h-24 mb-6">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="text-center font-sans font-medium text-[11px] md:text-xs tracking-widest uppercase text-neutral-400 group-hover:text-neutral-900 transition-colors duration-500">
                {client.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
