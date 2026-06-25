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
      fetch(apiUrl(`/api/v1/products/`)).then(r => r.json()),
      fetch(apiUrl(`/api/v1/categories/`)).then(r => r.json()),
      fetch(apiUrl(`/api/v1/brands/`)).then(r => r.json())
    ]).then(([prods, cats, brs]) => {
      setProducts(prods);
      setCategories(cats);
      setBrands(brs);
      setLoading(false);

      // Check for category filter in URL query parameter
      const params = new URLSearchParams(window.location.search);
      const catSlug = params.get("category");
      if (catSlug) {
        const matched = cats.find((c: any) => c.slug === catSlug);
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
        <aside className="w-full md:w-64 shrink-0">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group block cursor-pointer">
                  <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4 relative">
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0].image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                        <ShoppingBag size={48} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">{product.category?.name || "Sanitary"}</p>
                  <h3 className="font-playfair text-lg text-foreground mb-1">{product.name}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2">{product.description}</p>
                </Link>
              ))}
            </div>
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
