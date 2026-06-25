
import HomeContent from "@/components/home/HomeContent";
import { apiUrl } from "@/lib/api";

async function getCategories() {
  try {
    const res = await fetch(apiUrl(`/api/v1/categories/`), {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (err) {
    console.error(err);
    // Fallback if API is down
    return [
      { id: 1, name: 'Sanitaryware', slug: 'sanitaryware' },
      { id: 2, name: 'Faucets', slug: 'faucets' },
      { id: 3, name: 'Tiles', slug: 'tiles' },
    ];
  }
}

export default async function Home() {
  const categories = await getCategories();
  return <HomeContent categories={categories} />;
}
