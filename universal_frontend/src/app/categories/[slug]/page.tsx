import { notFound } from "next/navigation";
import { apiUrl } from "@/lib/api";
import CategoryProductsClient from "@/components/category/CategoryProductsClient";

async function getCategory(slug: string) {
  const res = await fetch(apiUrl(`/api/v1/categories/${slug}/`), { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Not Found" };
  return { 
    title: `${category.name} | Universal Sanitary Collections`,
    description: category.description || `Explore our high-end luxury collection of ${category.name} products.`
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": category.description || `Explore our premium range of ${category.name}`,
    "image": category.hero_image || "/images/products/hero.webp"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryProductsClient category={category} />
    </>
  );
}
