"use client";

interface InstagramFeedProps {
  username: string;
}

function InstagramIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramFeed({ username }: InstagramFeedProps) {
  // Use the handle provided as a prop, falling back to 'universalsanitaryhouse'
  const instagramHandle = username || "universalsanitaryhouse";

  return (
    <section className="bg-background py-16 px-6 md:px-12 border-t border-slate-200/60 text-center font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading & Subheading */}
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <InstagramIcon className="text-primary stroke-[1.5]" size={28} />
          <h2 className="font-playfair text-3xl md:text-4xl text-foreground tracking-wide font-semibold">
            Follow Our Journey
          </h2>
        </div>
        <p className="text-neutral-500 font-medium mb-8 text-sm md:text-base tracking-wide">
          @{instagramHandle} on Instagram
        </p>

        {/* Live Instagram Profile Embed Iframe */}
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-slate-100/80 overflow-hidden h-[600px]">
          <iframe
            src={`https://www.instagram.com/${instagramHandle}/embed`}
            className="w-full h-full border-0"
            scrolling="no"
            title="Instagram Profile Feed"
            width="100%"
            height="600"
          />
        </div>

        {/* Fallback link message in case of browser/adblock restrictions */}
        <p className="mt-6 text-xs md:text-sm text-neutral-500 font-medium tracking-wide">
          Instagram feed not loading?{" "}
          <a
            href={`https://www.instagram.com/${instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1 transition-colors duration-200"
          >
            Visit us at instagram.com/{instagramHandle}
          </a>
        </p>

      </div>
    </section>
  );
}
