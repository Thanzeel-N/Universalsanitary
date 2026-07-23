import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blogData";

export const metadata = {
  title: "Blog & Insights | Universal Sanitary",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background pb-24 font-sans">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/hero-blog.jpg" alt="Blog & Insights" className="w-full h-full object-cover blur-[2px] scale-105" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="font-playfair text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">Blog & Insights</h1>
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-neutral-300 drop-shadow-md">
            Explore our latest thoughts on luxury living
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="flex flex-col w-full">
        {BLOG_POSTS.map((post, index) => (
          <article 
            key={post.id} 
            className={`w-full py-16 px-6 md:px-12 flex justify-center ${index % 2 === 0 ? 'bg-secondary' : 'bg-slate-50'}`}
          >
            <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              {/* Image */}
              <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shrink-0 shadow-sm">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="w-full md:w-2/3 flex flex-col h-full pt-2">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 leading-snug">
                  {post.title}
                </h3>
                <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="inline-block font-bold text-primary border-b-2 border-primary pb-0.5 hover:text-foreground hover:border-foreground transition-colors"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
