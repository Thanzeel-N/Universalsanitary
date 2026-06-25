
import { apiUrl } from "@/lib/api";

export default async function BrandsPage() {
  const res = await fetch(apiUrl(`/api/v1/brands/`), { cache: 'no-store' });
  const brands = res.ok ? await res.json() : [];

  return (
    <main className="min-h-screen pt-8 px-6 md:px-12 max-w-7xl mx-auto mb-24">
      <h1 className="font-playfair text-5xl mb-6 text-center">Partner Brands</h1>
      <p className="text-center max-w-2xl mx-auto text-neutral-600 mb-16">
        We collaborate with the world's most prestigious luxury brands to bring you unparalleled quality.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {brands.length > 0 ? brands.map((brand: any) => (
          <div key={brand.id} className="aspect-[3/2] bg-neutral-100 flex flex-col items-center justify-center p-6 text-center">
            <h2 className="font-playfair text-xl">{brand.name}</h2>
          </div>
        )) : (
          <p className="col-span-full text-center text-neutral-500">No brands found.</p>
        )}
      </div>
    </main>
  );
}
