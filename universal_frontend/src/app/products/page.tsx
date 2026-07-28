"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
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
      const pCatId = p.category?.id ?? p.category;
      const pCatSlug = p.category?.slug;
      return String(pCatId) === String(catId) || pCatSlug === catSlug;
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
                  className="group relative h-[420px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 block cursor-pointer bg-neutral-900 border border-neutral-200/20"
                >
                  {/* Category Image */}
                  <img
                    src={heroImage}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors duration-500" />

                  {/* Card Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    <div className="mb-auto">
                      <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-300 border border-amber-300/30 text-[10px] uppercase font-bold tracking-widest shadow-sm">
                        {count} Product{count !== 1 ? "s" : ""} Available
                      </span>
                    </div>

                    <h3 className="font-playfair text-3xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300 drop-shadow">
                      {category.name}
                    </h3>

                    {category.description ? (
                      <p className="text-sm text-neutral-300 line-clamp-2 mb-6 font-normal leading-relaxed">
                        {category.description}
                      </p>
                    ) : (
                      <p className="text-sm text-neutral-400 italic mb-6">
                        Explore premium architectural solutions in this collection.
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white group-hover:text-amber-400 transition-colors">
                      <span>Explore Collection</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
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
