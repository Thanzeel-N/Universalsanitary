
import { notFound } from "next/navigation";
import { apiUrl } from "@/lib/api";

const STATIC_PRODUCTS: Record<string, any> = {
  "freestanding-bath-tube": {
    name: "Freestanding Bath Tube",
    brand: { name: "Jaquar" },
    description: "An elegantly contoured freestanding bath that serves as the luxurious centerpiece of the modern bathroom.",
    technical_specs: "Dimensions: 1700 x 800 x 600 mm | Material: Premium Lucite Acrylic | Finish: Glossy White",
    images: [{ image: "/images/space/bath_tube.webp", is_primary: true }]
  },
  "thin-rim-table-top-basin": {
    name: "Thin Rim Table Top Basin",
    brand: { name: "Jaquar" },
    description: "Solo by Jaquar presents JDS series washbasins with a thin rim table top design.",
    technical_specs: "Dimensions: 600 x 400 x 150 mm | Material: High Grade Ceramic | Finish: Pure White",
    images: [{ image: "/images/space/wash_basin.webp", is_primary: true }]
  },
  "rimless-wall-hung-wc": {
    name: "Rimless Wall-Hung WC",
    brand: { name: "Jaquar" },
    description: "Solo by Jaquar presents Rimless WC with hidden installation screws for better aesthetics.",
    technical_specs: "Dimensions: 540 x 360 x 400 mm | Flushing: Rimless Hygienic Dual Flush | Soft-close Slim Seat",
    images: [{ image: "/images/space/toilet_closet.webp", is_primary: true }]
  },
  "beta-l-shaped-shower-enclosure": {
    name: "Beta L-Shaped Shower Enclosure",
    brand: { name: "Jaquar" },
    description: "Premium L-shaped glass shower enclosure with high-quality hinges and tempered safety glass.",
    technical_specs: "Dimensions: 1200 x 900 x 1950 mm | Glass: 8mm Toughened Safety Glass | Hardware: Chrome Finish",
    images: [{ image: "/images/space/shower_closet.webp", is_primary: true }]
  },
  "concealed-stop-cocks": {
    name: "Concealed Stop Cocks",
    brand: { name: "Jaquar" },
    description: "Exposed part kit of two concealed stop cocks in Blush Gold Bright PVD finish.",
    technical_specs: "Finish: Blush Gold PVD | Material: Forged Brass Body | Operation: Quarter Turn",
    images: [{ image: "/images/space/faucet.webp", is_primary: true }]
  },
  "Wash Basin": {
    name: "Premium Wash Basin Collection",
    brand: { name: "Universal Sanitary" },
    description: "Explore our collection of contemporary tabletop, wall-hung, and pedestal wash basins.",
    technical_specs: "Multiple sizes and finishes available in store.",
    images: [{ image: "/images/col_basins.webp", is_primary: true }]
  },
  "faucet": {
    name: "Luxury Faucets Collection",
    brand: { name: "Universal Sanitary" },
    description: "Engineered for smooth flow and lasting brilliance, our luxury faucet range defines modern bathroom elegance.",
    technical_specs: "Solid brass construction with multi-layer PVD finish options.",
    images: [{ image: "/images/col_faucets.webp", is_primary: true }]
  },
  "Shower": {
    name: "Shower Systems Collection",
    brand: { name: "Universal Sanitary" },
    description: "Immerse yourself in wellness with our rain showers, body jets, and smart thermostatic mixers.",
    technical_specs: "High pressure air-injection technology.",
    images: [{ image: "/images/col_shower.webp", is_primary: true }]
  },
  "Sanitaryware": {
    name: "Smart Toilets & Sanitaryware",
    brand: { name: "Universal Sanitary" },
    description: "Ergonomic designs engineered for maximum hygiene, water conservation, and comfort.",
    technical_specs: "Rimless flushing technology & nano-glaze antibac coating.",
    images: [{ image: "/images/col_toilets.webp", is_primary: true }]
  },
  "Bathroom Accessories": {
    name: "Bath Accessories Suite",
    brand: { name: "Universal Sanitary" },
    description: "Towel rails, robe hooks, soap dispensers, and accessories crafted to complete your dream bathroom.",
    technical_specs: "Rust-resistant SS304 & brass accessories.",
    images: [{ image: "/images/grid1.webp", is_primary: true }]
  }
};

function resolveImageUrl(url: string): string {
  if (!url) return '';
  if (url.includes('/media/images/')) {
    return url.substring(url.indexOf('/media/images/') + 6);
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
}

async function getProduct(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  const staticFallback = STATIC_PRODUCTS[slug] || STATIC_PRODUCTS[decodedSlug];

  try {
    const res = await fetch(apiUrl(`/api/v1/products/${slug}/`), { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data) {
        // If API product has no images or empty images array, use static fallback images
        if ((!data.images || data.images.length === 0) && staticFallback?.images) {
          data.images = staticFallback.images;
        }
        return data;
      }
    }
  } catch (err) {
    // Ignore API error and fallback to static frontend products
  }

  return staticFallback || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.name} | Universal Sanitary` };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand?.name || "Universal Sanitary"
    }
  };

  return (
    <main className="min-h-screen pt-8 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="aspect-square bg-neutral-100 flex items-center justify-center overflow-hidden rounded-lg group cursor-zoom-in">
        {product.images && product.images.length > 0 ? (
          (() => {
            const rawImg = product.images.find((img: any) => img.is_primary)?.image || product.images[0].image;
            const imageSrc = resolveImageUrl(rawImg);
            return (
              <img 
                src={imageSrc} 
                alt={product.name} 
                className="max-w-[90%] max-h-[90%] object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-150 origin-center" 
              />
            );
          })()
        ) : (<p className="text-neutral-400">No Image Available</p>
        )}
      </div>
      <div>
        <h1 className="font-playfair text-4xl mb-4">{product.name}</h1>
        <p className="uppercase tracking-widest text-xs text-neutral-500 mb-8">{product.brand?.name}</p>
        <p className="font-sans text-lg mb-12 text-foreground/80">{product.description}</p>

        <div className="border-t border-neutral-200 pt-8 mb-12">
          <h2 className="font-sans font-bold uppercase tracking-widest text-xs mb-4">Technical Specs</h2>
          <p className="text-sm text-neutral-600">{product.technical_specs || 'N/A'}</p>
        </div>

        <a
          href={`https://wa.me/917356863985?text=Hello,%20I%20would%20like%20to%20enquire%20about%20the%20product:%20${encodeURIComponent(product.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center w-full bg-primary text-white py-4 hover:brightness-110 smooth-hover uppercase tracking-widest text-sm"
        >
          Enquire About Product
        </a>
      </div>
    </main>
  );
}
