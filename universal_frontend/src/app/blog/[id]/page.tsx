import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blogData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = BLOG_POSTS.find(p => p.id === parseInt(id));
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} | Universal Sanitary Blog` };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = BLOG_POSTS.find(p => p.id === parseInt(id));
  
  if (!post) {
    notFound();
  }

  // Very basic markdown to JSX parser for the blog content
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="font-sans font-bold text-2xl md:text-3xl mt-12 mb-4 text-[#333] tracking-tight">{paragraph.replace('## ', '')}</h2>;
      }
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="font-sans font-extrabold text-3xl md:text-4xl mt-12 mb-6 text-[#222] tracking-tight">{paragraph.replace('# ', '')}</h1>;
      }
      if (paragraph.startsWith('* ')) {
        return (
          <ul key={index} className="list-disc pl-6 mb-6 text-[#555] font-serif leading-loose text-lg">
            {paragraph.split('\n').map((item, i) => (
              <li key={i} className="mb-2 pl-2">{item.replace('* ', '')}</li>
            ))}
          </ul>
        );
      }
      
      // Parse bold text
      const processBold = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-[#222]">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
      };

      return (
        <p key={index} className="mb-6 text-[#555] font-serif leading-loose text-lg md:text-xl">
          {processBold(paragraph)}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#fafafa] pb-32">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] bg-neutral-900 overflow-hidden">
        {post.image && (
          <div className="absolute inset-0">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-60"
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 lg:px-24">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors mb-6 md:mb-8 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4 text-white/90">
              <span className="text-sm font-bold uppercase tracking-widest bg-primary px-3 py-1 rounded-sm">{post.category}</span>
              <span className="text-sm font-medium">{post.date}</span>
            </div>
            <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-7xl text-white mb-4 leading-tight tracking-tight drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 pt-16 md:pt-24 bg-white -mt-8 md:-mt-16 rounded-t-3xl relative shadow-xl z-10">
        <article className="prose prose-lg md:prose-xl max-w-none pb-12 border-b border-neutral-100">
          {post.content ? renderContent(post.content) : (
            <p className="text-[#555] font-serif leading-loose text-xl">
              {post.excerpt}
            </p>
          )}
        </article>
        
        {/* Author / Footer info placeholder */}
        <div className="py-10 flex justify-between items-center text-sm font-medium text-neutral-400">
          <span>Written by Universal Sanitary</span>
          <span>Share this article</span>
        </div>
      </section>
    </main>
  );
}
