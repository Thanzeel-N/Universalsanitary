import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Clients | Universal Sanitary',
  description: 'Discover the esteemed organizations that trust Universal Sanitary House.',
};

const CLIENT_CATEGORIES = [
  {
    category: 'Real Estate & Builders',
    clients: [
      { logo: '/images/clients/client_14.webp', name: 'Sobha' },
      { logo: '/images/clients/client_15.png', name: 'Prestige Group' },
      { logo: '/images/clients/client_21.jpg', name: 'Skyline Builders' },
      { logo: '/images/clients/client_22.jpg', name: 'SFS Homes' },
      { logo: '/images/clients/abad-builders.avif', name: 'Abad Builders' },
      { logo: '/images/clients/client_25.jpg', name: 'Asset Homes' },
    ]
  },
  {
    category: 'Hotels, Resorts & Hospitality',
    clients: [
      { logo: '/images/clients/client_17.png', name: 'Taj Hotels' },
      { logo: '/images/clients/taj-malabar.jpg', name: 'Taj Malabar Resort & Spa' },
      { logo: '/images/clients/vivanta.png', name: 'Vivanta' },
      { logo: '/images/clients/holiday-inn.png', name: 'Holiday Inn' },
      { logo: '/images/clients/ramada-kochi.png', name: 'Ramada by Wyndham Kochi' },
      { logo: '/images/clients/novotel-kochi.jpg', name: 'Novotel Kochi Infopark' },
      { logo: '/images/clients/client_12.jpg', name: 'Crowne Plaza' },
      { logo: '/images/clients/client_13.png', name: 'Le Meridien' },
      { logo: '/images/clients/abad-hotels.avif', name: 'Abad Hotels & Resorts' },
      { logo: '/images/clients/cgh-earth.png', name: 'CGH Earth Experience Hotels' },
      { logo: '/images/clients/brunton-boatyard.png', name: 'Brunton Boatyard' },
      { logo: '/images/clients/client_7.png', name: 'Kumarakom Lake Resort' },
      { logo: '/images/clients/client_8.jpg', name: 'Coconut Lagoon' },
      { logo: '/images/clients/client_20.jpg', name: 'Spice Village' },
      { logo: '/images/clients/gokulam-park.webp', name: 'Gokulam Park Convention Centre' },
      { logo: '/images/clients/ktdc-hotels.jpg', name: 'KTDC Hotels & Resorts' },
      { logo: '/images/clients/client_29.png', name: 'Foschia Resorts' },
      { logo: '/images/clients/client_39.jpg', name: 'ARC Adventure Resorts' },
      { logo: '/images/clients/client_41.png', name: 'The Leaf Munnar' },
      { logo: '/images/clients/client_42.png', name: 'Wyte Portico Hotels' },
      { logo: '/images/clients/client_43.webp', name: 'The Tall Trees Munnar' },
      { logo: '/images/clients/client_44.png', name: 'The Wild Trails Munnar' },
    ]
  },
  {
    category: 'Healthcare & Hospitals',
    clients: [
      { logo: '/images/clients/client_9.webp', name: 'Aster Medcity' },
      { logo: '/images/clients/client_10.jpg', name: 'Rajagiri Hospital' },
      { logo: '/images/clients/client_33.jpg', name: 'Amrita Hospital' },
      { logo: '/images/clients/client_34.jpg', name: 'Jubilee Mission Hospital' },
      { logo: '/images/clients/client_35.png', name: 'SNMM Hospital' },
      { logo: '/images/clients/client_36.jpg', name: 'SNIMS Medical College' },
      { logo: '/images/clients/client_37.jpg', name: 'Ernakulam Medical Centre' },
      { logo: '/images/clients/client_38.jpg', name: 'SUN Medical Centre' },
      { logo: '/images/clients/client_40.jpg', name: 'TMM Hospital' },
      { logo: '/images/clients/client_32.png', name: 'Agasthya Ayurvedic Medical Centre' },
    ]
  },
  {
    category: 'Education & Institutions',
    clients: [
      { logo: '/images/clients/client_27.jpg', name: 'Amrita Vidyalayam' },
      { logo: '/images/clients/client_28.png', name: 'Eastern Newton School' },
      { logo: '/images/clients/client_30.jpg', name: 'Greets Public School' },
      { logo: '/images/clients/client_31.webp', name: 'Naipunnya College' },
    ]
  },
  {
    category: 'Government & Public Sector',
    clients: [
      { logo: '/images/clients/client_6.png', name: 'Kerala Livestock Dev. Board' },
      { logo: '/images/clients/client_19.jpg', name: 'CPWD' },
    ]
  },
  {
    category: 'Aviation & Transportation',
    clients: [
      { logo: '/images/clients/client_16.png', name: 'Cochin International Airport' },
    ]
  },
  {
    category: 'IT & Technology Parks',
    clients: [
      { logo: '/images/clients/client_4.jpg', name: 'Infopark' },
    ]
  },
  {
    category: 'Industrial & Manufacturing',
    clients: [
      { logo: '/images/clients/client_1.png', name: 'TATA' },
      { logo: '/images/clients/client_2.jpg', name: 'Harrisons Malayalam' },
    ]
  },
  {
    category: 'Food & Beverage',
    clients: [
      { logo: '/images/clients/client_3.webp', name: 'Kannan Devan' },
    ]
  },
  {
    category: 'Marine & Export',
    clients: [
      { logo: '/images/clients/client_5.png', name: 'Sai Balaji' },
    ]
  }
];

// Helper to determine if a logo has white text / dark theme requiring a black background
const isDarkBackgroundLogo = (logoPath: string) => {
  const darkBgLogos = [
    'client_6.png',
    'ramada-kochi.png'
  ];
  return darkBgLogos.some((name) => logoPath.includes(name));
};

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
            We take immense pride in our long-standing relationships with some of the most esteemed organizations, developers, hospitals, educational institutions, and resorts.
          </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {CLIENT_CATEGORIES.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col md:flex-row gap-10 md:gap-20 items-start border-t border-neutral-200 pt-16 first:border-0 first:pt-0">
              {/* Category Header */}
              <div className="w-full md:w-1/3 md:sticky top-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-[1px] bg-neutral-400"></div>
                  <span className="font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                    Sector {(catIdx + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-neutral-900 font-light leading-tight">
                  {category.category}
                </h2>
              </div>

              {/* Clients Grid */}
              <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {category.clients.map((client, idx) => {
                  const isDarkBg = isDarkBackgroundLogo(client.logo);
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center group bg-neutral-50/50 hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all duration-500 rounded-2xl p-6 md:p-8 cursor-default"
                    >
                      <div className={`relative w-full h-16 md:h-20 mb-6 overflow-hidden rounded-xl ${isDarkBg ? 'bg-neutral-900 p-2.5 shadow-sm' : ''}`}>
                        <Image
                          src={client.logo}
                          alt={client.name}
                          fill
                          className={`object-contain transition-transform duration-700 ease-out group-hover:scale-110 ${isDarkBg ? '' : 'mix-blend-multiply'} opacity-90 group-hover:opacity-100`}
                        />
                      </div>
                      <h3 className="text-center font-sans font-medium text-[10px] md:text-[11px] tracking-widest uppercase text-neutral-500 group-hover:text-neutral-900 transition-colors duration-500">
                        {client.name}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

