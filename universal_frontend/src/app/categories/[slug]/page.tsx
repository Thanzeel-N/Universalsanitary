
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiUrl } from "@/lib/api";

async function getCategory(slug: string) {
  const res = await fetch(apiUrl(`/api/v1/categories/${slug}/`), { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Not Found" };
  return { title: `${category.name} | Universal Sanitary` };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": category.description
  };

  return (
    <main className="min-h-screen pt-8 px-6 md:px-12 max-w-7xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-playfair text-5xl mb-12">{category.name}</h1>
      {category.description && <p className="mb-12 max-w-2xl text-neutral-600">{category.description}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-24">
        <div className="col-span-full text-neutral-500 py-12 border-t border-b border-neutral-200 text-center">
          Products coming soon to the {category.name} collection.
        </div>
      </div>
    </main>
  );
}
