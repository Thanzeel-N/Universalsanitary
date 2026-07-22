"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { Filter, ShoppingBag } from "lucide-react";
import { apiUrl } from "@/lib/api";

const ProductSkeleton = () => (
  <div className="animate-pulse flex flex-col mb-4">
    <div className="aspect-square bg-neutral-200 rounded-lg w-full mb-4"></div>
    <div className="h-3 bg-neutral-200 rounded w-1/4 mb-2"></div>
    <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-neutral-200 rounded w-full mb-1"></div>
    <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
  </div>
);

const FilterSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-3">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="flex items-center gap-3">
        <div className="w-4 h-4 bg-neutral-200 rounded"></div>
        <div className="h-4 bg-neutral-200 rounded w-24"></div>
      </div>
    ))}
  </div>
);

const STATIC_CATEGORIES = [
  { id: 1, name: "Wash Basin", slug: "Wash Basin" },
  { id: 2, name: "Luxury Faucets", slug: "faucet" },
  { id: 3, name: "Shower Systems", slug: "Shower" },
  { id: 4, name: "Smart Toilets", slug: "Sanitaryware" },
  { id: 5, name: "Bath Accessories", slug: "Bathroom Accessories" },
];

const STATIC_BRANDS = [
  { id: 1, name: "Jaquar" },
  { id: 2, name: "Kohler" },
  { id: 3, name: "TOTO" },
  { id: 4, name: "Grohe" },
  { id: 5, name: "CERA" },
];

const STATIC_PRODUCTS = [
  {
    id: 1,
    slug: "freestanding-bath-tube",
    name: "Freestanding Bath Tube",
    description: "An elegantly contoured freestanding bath that serves as the luxurious centerpiece of the modern bathroom.",
    images: [{ image: "/images/space/bath_tube.webp", is_primary: true }],
    category: { id: 5, name: "Bath Accessories" },
    brand: { id: 1, name: "Jaquar" }
  },
  {
    id: 2,
    slug: "thin-rim-table-top-basin",
    name: "Thin Rim Table Top Basin",
    description: "Solo by Jaquar presents JDS series washbasins with a thin rim table top design.",
    images: [{ image: "/images/space/wash_basin.webp", is_primary: true }],
    category: { id: 1, name: "Wash Basin" },
    brand: { id: 1, name: "Jaquar" }
  },
  {
    id: 3,
    slug: "rimless-wall-hung-wc",
    name: "Rimless Wall-Hung WC",
    description: "Solo by Jaquar presents Rimless WC with hidden installation screws for better aesthetics.",
    images: [{ image: "/images/space/toilet_closet.webp", is_primary: true }],
    category: { id: 4, name: "Smart Toilets" },
    brand: { id: 1, name: "Jaquar" }
  },
  {
    id: 4,
    slug: "beta-l-shaped-shower-enclosure",
    name: "Beta L-Shaped Shower Enclosure",
    description: "Premium L-shaped glass shower enclosure with high-quality hinges and tempered safety glass.",
    images: [{ image: "/images/space/shower_closet.webp", is_primary: true }],
    category: { id: 3, name: "Shower Systems" },
    brand: { id: 1, name: "Jaquar" }
  },
  {
    id: 5,
    slug: "concealed-stop-cocks",
    name: "Concealed Stop Cocks",
    description: "Exposed part kit of two concealed stop cocks in Blush Gold Bright PVD finish.",
    images: [{ image: "/images/space/faucet.webp", is_primary: true }],
    category: { id: 2, name: "Luxury Faucets" },
    brand: { id: 1, name: "Jaquar" }
  },
  {
    id: 6,
    slug: "premium-tabletop-basin",
    name: "Premium Tabletop Basin",
    description: "Modern ceramic countertop wash basin with smooth stain-resistant glaze.",
    images: [{ image: "/images/col_basins.webp", is_primary: true }],
    category: { id: 1, name: "Wash Basin" },
    brand: { id: 2, name: "Kohler" }
  },
  {
    id: 7,
    slug: "designer-brass-faucet",
    name: "Designer Brass Faucet",
    description: "Sleek single-lever basin mixer faucet in brushed gold PVD finish.",
    images: [{ image: "/images/col_faucets.webp", is_primary: true }],
    category: { id: 2, name: "Luxury Faucets" },
    brand: { id: 4, name: "Grohe" }
  },
  {
    id: 8,
    slug: "thermostatic-shower-column",
    name: "Thermostatic Rain Shower Column",
    description: "Multi-function overhead rain shower system with thermostatic control valve.",
    images: [{ image: "/images/col_shower.webp", is_primary: true }],
    category: { id: 3, name: "Shower Systems" },
    brand: { id: 1, name: "Jaquar" }
  },
  {
    id: 9,
    slug: "intelligent-bidet-toilet",
    name: "Intelligent Bidet Toilet",
    description: "Smart wall-hung bidet toilet with heated seat, automatic flush, and remote control.",
    images: [{ image: "/images/col_toilets.webp", is_primary: true }],
    category: { id: 4, name: "Smart Toilets" },
    brand: { id: 3, name: "TOTO" }
  },
  {
    id: 10,
    slug: "luxury-bath-accessories-set",
    name: "Luxury Bath Accessories Suite",
    description: "Comprehensive 5-piece solid brass bathroom hardware and accessories set.",
    images: [{ image: "/images/grid1.webp", is_primary: true }],
    category: { id: 5, name: "Bath Accessories" },
    brand: { id: 5, name: "CERA" }
  }
];

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

const ProductCard = ({ product }: { product: any }) => {
  const primaryImg = product.images?.find((img: any) => img.is_primary)?.image || product.images?.[0]?.image;
  const imgSrc = primaryImg ? resolveImageUrl(primaryImg) : '/images/col_basins.webp';

  return (
    <Link href={`/products/${product.slug}`} className="group block cursor-pointer">
      <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4 relative">
        <img src={imgSrc} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
      </div>
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">{product.category?.name || "Sanitary"}</p>
      <h3 className="font-playfair text-lg text-foreground mb-1">{product.name}</h3>
      <p className="text-sm text-neutral-500 line-clamp-2">{product.description}</p>
    </Link>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(apiUrl(`/api/v1/products/`)).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(apiUrl(`/api/v1/categories/`)).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(apiUrl(`/api/v1/brands/`)).then(r => r.ok ? r.json() : []).catch(() => [])
    ]).then(([prods, cats, brs]) => {
      const activeCategories = (cats && cats.length > 0) ? cats : STATIC_CATEGORIES;
      const activeBrands = (brs && brs.length > 0) ? brs : STATIC_BRANDS;
      let activeProducts = (prods && prods.length > 0) ? prods : STATIC_PRODUCTS;

      // Ensure all products have valid images from public images folder
      activeProducts = activeProducts.map((p: any, idx: number) => {
        if (!p.images || p.images.length === 0 || !p.images[0]?.image) {
          const fallback = STATIC_PRODUCTS[idx % STATIC_PRODUCTS.length];
          return { ...p, images: fallback.images };
        }
        return p;
      });

      setProducts(activeProducts);
      setCategories(activeCategories);
      setBrands(activeBrands);
      setLoading(false);

      // Check for category filter in URL query parameter
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) {
        const norm = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const target = norm(catParam);
        const matched = activeCategories.find((c: any) => {
          const cSlug = norm(c.slug);
          const cName = norm(c.name);
          return cSlug === target || cName === target || cSlug.includes(target) || cName.includes(target) || target.includes(cSlug) || target.includes(cName);
        });
        if (matched) {
          setSelectedCategories([String(matched.id)]);
        }
      }
    });
  }, []);

  const handleCategoryToggle = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) ? prev.filter(id => id !== brandId) : [...prev, brandId]
    );
  };

  const filteredProducts = products.filter(p => {
    // Backend returns nested objects due to serializer relations
    const catId = p.category?.id ?? p.category;
    const brandId = p.brand?.id ?? p.brand;
    const catMatch = selectedCategories.length === 0 || selectedCategories.includes(String(catId));
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(String(brandId));
    return catMatch && brandMatch;
  });

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/products/hero.webp" alt="Our Collections" className="w-full h-full object-cover blur-[2px] scale-105" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="font-playfair text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">Our Collections</h1>
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-neutral-300 drop-shadow-md">
            Explore our premium range of products
          </p>
        </div>
      </section>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-end items-end mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">
            {filteredProducts.length} Product{filteredProducts.length !== 1 && 's'}
          </p>
        </div>
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-8 self-start max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div 
            className="flex items-center justify-between gap-2 mb-4 md:mb-6 text-foreground font-playfair text-xl border-b border-neutral-200 pb-4 cursor-pointer md:cursor-default"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <div className="flex items-center gap-2">
              <Filter size={20} />
              <h2>Filters</h2>
            </div>
            <button className="md:hidden text-xs uppercase tracking-widest font-bold text-neutral-500">
              {isMobileFilterOpen ? "Hide" : "Show"}
            </button>
          </div>

          <div className={`md:block ${isMobileFilterOpen ? 'block mb-8' : 'hidden'}`}>
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-500 mb-4">Categories</h3>
              {loading ? <FilterSkeleton /> : (
                <div className="flex flex-col gap-3">
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="accent-primary w-4 h-4"
                        checked={selectedCategories.includes(String(cat.id))}
                        onChange={() => handleCategoryToggle(String(cat.id))}
                      />
                      <span className="text-sm text-neutral-600 group-hover:text-black transition-colors">{cat.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-500 mb-4">Brands</h3>
              {loading ? <FilterSkeleton /> : (
                <div className="flex flex-col gap-3">
                  {brands.map(brand => (
                    <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="accent-primary w-4 h-4"
                        checked={selectedBrands.includes(String(brand.id))}
                        onChange={() => handleBrandToggle(String(brand.id))}
                      />
                      <span className="text-sm text-neutral-600 group-hover:text-black transition-colors">{brand.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : filteredProducts.length > 0 ? (
            selectedCategories.length === 0 && selectedBrands.length === 0 ? (
              <div className="flex flex-col gap-12">
                {categories.map(category => {
                  const categoryProducts = filteredProducts.filter(p => (p.category?.id ?? p.category) === category.id);
                  if (categoryProducts.length === 0) return null;
                  return (
                    <div key={category.id}>
                      <div className="flex items-center gap-4 mb-6">
                        <h2 className="font-playfair text-2xl text-foreground">{category.name}</h2>
                        <div className="h-px bg-neutral-200 flex-1"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryProducts.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
              <p className="text-neutral-500 mb-2">No products match your selected filters.</p>
              <button 
                onClick={() => { setSelectedCategories([]); setSelectedBrands([]); }}
                className="text-xs uppercase tracking-widest font-bold text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </main>
  );
}
