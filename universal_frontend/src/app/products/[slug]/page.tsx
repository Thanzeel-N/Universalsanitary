
import { notFound } from "next/navigation";
import { apiUrl } from "@/lib/api";

async function getProduct(slug: string) {
  const res = await fetch(apiUrl(`/api/v1/products/${slug}/`), { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.name} | Universal Sanitary House` };
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
      <div className="aspect-square bg-neutral-100 flex items-center justify-center overflow-hidden rounded-lg">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images.find((img: any) => img.is_primary)?.image || product.images[0].image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <p className="text-neutral-400">No Image Available</p>
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
          href={`https://wa.me/919995340034?text=Hello,%20I%20would%20like%20to%20enquire%20about%20the%20product:%20${encodeURIComponent(product.name)}`}
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
