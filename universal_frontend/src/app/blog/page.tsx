import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog & Insights | Universal Sanitary",
};

const BLOG_POSTS = [
  {
    id: 1,
    title: "Choosing the Right Sanitaryware for Your Master Bathroom",
    excerpt: "Discover the perfect balance of luxury and functionality with our comprehensive guide to selecting premium sanitaryware.",
    date: "July 15, 2026",
    category: "Design Tips",
    image: "/images/about/exterior.webp",
  },
  {
    id: 2,
    title: "The Evolution of Bathroom Aesthetics Since 1968",
    excerpt: "Take a journey through the changing trends in bathroom design and how Universal Sanitary has adapted to modern luxury.",
    date: "June 22, 2026",
    category: "Our Legacy",
    image: "/images/about/interior_1968.webp",
  },
  {
    id: 3,
    title: "Water Conservation in Modern Luxury Fittings",
    excerpt: "Learn how the latest premium fittings combine eco-friendly water saving technology with uncompromising luxury.",
    date: "May 10, 2026",
    category: "Sustainability",
    image: "/images/about/exterior.webp",
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 text-center border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="font-playfair text-5xl md:text-6xl text-foreground mb-6">Blog & Insights</h1>
        <p className="font-sans text-lg text-neutral-500 max-w-2xl mx-auto">
          Explore our latest thoughts on luxury living, interior design trends, and the legacy of Universal Sanitary.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-neutral-200 overflow-hidden mb-6 relative rounded-sm">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{post.category}</span>
                <span className="text-sm text-neutral-400">{post.date}</span>
              </div>
              <h2 className="font-playfair text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-neutral-500 mb-6 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors">
                Read More <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
