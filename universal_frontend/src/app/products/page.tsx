"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Layers } from "lucide-react";
import { apiUrl } from "@/lib/api";

const CategorySkeleton = () => (
  <div className="animate-pulse h-[400px] bg-neutral-200 rounded-2xl w-full"></div>
);

export default function ProductsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch(apiUrl(`/api/v1/categories/`)).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(apiUrl(`/api/v1/products/`)).then(r => r.ok ? r.json() : []).catch(() => [])
    ]).then(([cats, prods]) => {
      const activeCats = cats && cats.length > 0 ? cats : [];
      setCategories(activeCats);
      setProducts(prods && prods.length > 0 ? prods : []);
      setLoading(false);

      // Seamless backwards compatibility: if someone navigated to /products?category=faucets
      // automatically send them to the dedicated luxury category page!
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam && activeCats.length > 0) {
        const norm = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const target = norm(catParam);
        const matched = activeCats.find((c: any) => {
          const cSlug = norm(c.slug);
          const cName = norm(c.name);
          return cSlug === target || cName === target || cSlug.includes(target) || cName.includes(target) || target.includes(cSlug) || target.includes(cName);
        });
        if (matched && matched.slug) {
          router.replace(`/categories/${matched.slug}`);
        }
      }
    });
  }, [router]);

  // Count products in each category
  const getProductCount = (catId: number, catSlug: string) => {
    return products.filter((p: any) => {
      const cats = p.categories || [];
      return cats.some((c: any) => {
        const cId = c.id ?? c;
        const cSlug = c.slug;
        return String(cId) === String(catId) || cSlug === catSlug;
      });
    }).length;
  };

  return (
    <main className="min-h-screen bg-background pb-32">
      {/* Hero Section */}
      <section className="relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden mb-16 bg-neutral-900">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/images/products/hero.webp" 
            alt="Our Collections" 
            className="w-full h-full object-cover blur-[1px] scale-105 opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="font-playfair text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">Our Collections</h1>
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-neutral-300 drop-shadow-md">
            Explore our premium range of products
          </p>
        </div>
      </section>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-neutral-200 pb-6">
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl text-foreground font-semibold">
              Browse by Collection
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Select a collection below to view specialized product catalogs and brand offerings.
            </p>
          </div>
          <div className="flex items-center gap-2 text-neutral-400 text-sm font-bold uppercase tracking-widest">
            <Layers size={16} />
            <span>{categories.length} Collection{categories.length !== 1 && "s"}</span>
          </div>
        </div>

        {/* Categories Showcase Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[...Array(6)].map((_, i) => <CategorySkeleton key={i} />)}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {categories.map((category: any) => {
              const count = getProductCount(category.id, category.slug);
              const heroImage = category.hero_image || "/images/products/hero.webp";

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group relative h-[460px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 block cursor-pointer bg-neutral-950 border border-neutral-200/10 hover:border-white/30"
                >
                  {/* Category Image */}
                  <img
                    src={heroImage}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-85 group-hover:opacity-100"
                  />
                  
                  {/* Two Layer Monochrome Luxury Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-70" />

                  {/* Top Bar Badge (Frosted Monochrome Glass) */}
                  <div className="absolute top-0 inset-x-0 p-7 flex items-center justify-between z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono tracking-[0.2em] uppercase font-semibold shadow-lg group-hover:bg-white/20 transition-all duration-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>{count} PRODUCT{count !== 1 ? "S" : ""}</span>
                    </div>
                  </div>

                  {/* Bottom Interactive Content */}
                  <div className="absolute bottom-0 inset-x-0 p-7 flex flex-col justify-end z-10">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                      <span className="text-neutral-400 text-[10px] font-mono uppercase tracking-[0.3em] mb-2 block group-hover:text-neutral-200 transition-colors">
                        COLLECTION SERIES
                      </span>
                      
                      <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md mb-6 transition-all duration-500">
                        {category.name}
                      </h3>
                    </div>

                    {/* Sleek Interactive Footer Bar */}
                    <div className="pt-5 border-t border-white/15 group-hover:border-white/40 transition-colors duration-500 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.25em] text-neutral-300 group-hover:text-white transition-colors">
                        <span>EXPLORE COLLECTION</span>
                      </div>
                      
                      <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-neutral-950 group-hover:border-white transition-all duration-500 group-hover:scale-110 shadow-lg shrink-0">
                        <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-72 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200 p-8 text-center">
            <Layers size={48} className="text-neutral-300 mb-4 stroke-[1]" />
            <p className="text-neutral-600 font-playfair text-xl mb-2">No collections found.</p>
            <p className="text-neutral-400 text-sm max-w-md">
              Our catalogs are currently being updated with premium inventory. Please check back shortly.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
