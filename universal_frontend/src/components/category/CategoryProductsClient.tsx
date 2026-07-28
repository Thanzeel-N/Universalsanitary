"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Filter, ShoppingBag, ArrowLeft, ChevronRight } from "lucide-react";
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

const ProductCard = ({ product }: { product: any }) => (
  <Link href={`/products/${product.slug}`} className="group block cursor-pointer">
    <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4 relative shadow-sm hover:shadow-md transition-shadow">
      {product.images && product.images.length > 0 ? (
        <img 
          src={product.images[0].image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
          <ShoppingBag size={48} strokeWidth={1} />
        </div>
      )}
    </div>
    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">
      {product.brand?.name || "Universal Sanitary"}
    </p>
    <h3 className="font-playfair text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
      {product.name}
    </h3>
    <p className="text-sm text-neutral-500 line-clamp-2">{product.description}</p>
  </Link>
);

export default function CategoryProductsClient({ category }: { category: any }) {
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(apiUrl(`/api/v1/products/`)).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(apiUrl(`/api/v1/brands/`)).then(r => r.ok ? r.json() : []).catch(() => [])
    ]).then(([allProds, allBrands]) => {
      // Filter products belonging to this category (by id or slug)
      const catProds = (allProds && allProds.length > 0 ? allProds : []).filter((p: any) => {
        const pCatId = p.category?.id ?? p.category;
        const pCatSlug = p.category?.slug;
        return String(pCatId) === String(category.id) || pCatSlug === category.slug;
      });
      setProducts(catProds);

      // Extract brands relevant to the available products in this category
      const activeBrandIds = new Set(catProds.map((p: any) => String(p.brand?.id ?? p.brand)));
      const relevantBrands = (allBrands && allBrands.length > 0 ? allBrands : []).filter((b: any) => 
        activeBrandIds.has(String(b.id))
      );
      
      // If relevantBrands is non-empty use it, otherwise fallback to all brands
      setBrands(relevantBrands.length > 0 ? relevantBrands : allBrands);
      setLoading(false);
    });
  }, [category.id, category.slug]);

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) ? prev.filter(id => id !== brandId) : [...prev, brandId]
    );
  };

  const filteredProducts = products.filter(p => {
    const brandId = p.brand?.id ?? p.brand;
    return selectedBrands.length === 0 || selectedBrands.includes(String(brandId));
  });

  const heroImage = category.hero_image || "/images/products/hero.webp";

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Category Custom Hero Banner */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden mb-12 bg-neutral-900">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={heroImage} 
            alt={category.name} 
            className="w-full h-full object-cover blur-[1px] scale-105 opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-widest text-neutral-300 mb-4 drop-shadow">
            <Link href="/products" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              Collections
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-semibold">{category.name}</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl text-white mb-4 drop-shadow-lg font-bold">
            {category.name}
          </h1>
          {category.description && (
            <p className="font-sans text-sm md:text-base text-neutral-200 drop-shadow-md max-w-2xl mx-auto line-clamp-3">
              {category.description}
            </p>
          )}
        </div>
      </section>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        {/* Navigation & Counter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-neutral-200 pb-6">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to All Collections
          </Link>
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">
            {filteredProducts.length} Product{filteredProducts.length !== 1 && 's'} in {category.name}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar - Brands Filter Only */}
          <aside className="w-full md:w-64 shrink-0 md:sticky md:top-8 self-start max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div 
              className="flex items-center justify-between gap-2 mb-4 md:mb-6 text-foreground font-playfair text-xl border-b border-neutral-200 pb-4 cursor-pointer md:cursor-default"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <div className="flex items-center gap-2">
                <Filter size={20} />
                <h2>Filter by Brand</h2>
              </div>
              <button className="md:hidden text-xs uppercase tracking-widest font-bold text-neutral-500">
                {isMobileFilterOpen ? "Hide" : "Show"}
              </button>
            </div>

            <div className={`md:block ${isMobileFilterOpen ? 'block mb-8' : 'hidden'}`}>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-500 mb-4">Brands</h3>
                {loading ? <FilterSkeleton /> : brands.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {brands.map(brand => (
                      <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="accent-primary w-4 h-4"
                          checked={selectedBrands.includes(String(brand.id))}
                          onChange={() => handleBrandToggle(String(brand.id))}
                        />
                        <span className="text-sm text-neutral-600 group-hover:text-black transition-colors">
                          {brand.name}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-400 italic">No brand filters available.</p>
                )}
              </div>
              
              {selectedBrands.length > 0 && (
                <button 
                  onClick={() => setSelectedBrands([])}
                  className="mt-6 w-full text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-foreground py-2 border border-neutral-200 rounded transition-colors"
                >
                  Clear Brand Filter
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-neutral-50 rounded-lg border border-dashed border-neutral-200 p-6 text-center">
                <p className="text-neutral-600 font-playfair text-xl mb-2">
                  {products.length === 0 ? `No products added to ${category.name} yet.` : "No products match your selected brand filters."}
                </p>
                <p className="text-neutral-400 text-sm mb-6">
                  {products.length === 0 ? "We are actively curating our luxurious inventory. Please check back soon." : "Try clearing your brand filters to view all products in this collection."}
                </p>
                {selectedBrands.length > 0 ? (
                  <button 
                    onClick={() => setSelectedBrands([])}
                    className="text-xs uppercase tracking-widest font-bold text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
                  >
                    Clear Brand Filters
                  </button>
                ) : (
                  <Link
                    href="/products"
                    className="text-xs uppercase tracking-widest font-bold text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
                  >
                    Explore Other Collections
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
