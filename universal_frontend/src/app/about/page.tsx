import { ShieldCheck, PenTool, HeartHandshake, MapPin } from "lucide-react";
import JourneySection from "@/components/about/JourneySection";

export const metadata = {
  title: "About Us | Universal Sanitary",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/about/exterior.webp" alt="Universal Sanitary House Exterior" className="w-full h-full object-cover blur-[2px] scale-105" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="font-playfair text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">Our Legacy</h1>
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-neutral-300 drop-shadow-md">
            Defining Luxury Spaces Since 1968
          </p>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="font-playfair text-3xl md:text-4xl text-foreground mb-8">A Tradition of Excellence</h2>
        <p className="text-lg md:text-xl text-neutral-600 leading-[1.7] font-sans mb-8">
          <strong className="text-foreground">Universal Sanitary House</strong> was established in the year 1968 in Ernakulam, the business capital of Kerala. Since then, it has been one of the leading Sanitary ware and Water Supply Materials business houses in Ernakulam.
        </p>
        <p className="text-lg md:text-xl text-neutral-600 leading-[1.7] font-sans mb-8">
          We have a strong and satisfied customer base and the expertise to guide customers for cost-efficient procurement of a wide range of quality Sanitary ware, Tiles, and Water Supply materials. Over the years, we have established a reputation as a trustworthy dealer in Sanitary ware and allied building materials.
        </p>
        <p className="text-lg md:text-xl text-neutral-600 leading-[1.7] font-sans mb-8">
          Our core strength, apart from our immense industry expertise, lies in the quality of our products, the fair pricing we have established, and the unmatched service we render to our esteemed clientele.
        </p>
      </section>

      {/* The Journey Section */}
      <JourneySection />

      {/* The Founders Section */}
      <section className="py-24 bg-neutral-100 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full aspect-[4/5] bg-neutral-200 rounded-xl overflow-hidden relative shadow-lg">
            <img src="/images/about/interior_1968.webp" alt="Showroom Legacy" className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-1000" />
          </div>
          <div className="flex-1">
            <h3 className="font-sans font-bold uppercase tracking-widest text-xs text-neutral-400 mb-4">Our Roots</h3>
            <h2 className="font-playfair text-4xl md:text-5xl text-foreground mb-8">The Pillars of Our Success</h2>
            <div className="relative">
              <span className="absolute -top-10 -left-6 text-9xl text-primary/10 font-serif">"</span>
              <p className="text-xl text-neutral-700 leading-[1.7] italic font-playfair relative z-10 mb-8">
                The company is a division of M/s. T. H. Ebrahim Kareem & Co., Muvattupuzha, which was founded way back in 1946 as a wholesale and retail business in General Hardware, Iron and Steel and allied items.
              </p>
            </div>
            <p className="text-neutral-500 leading-relaxed mb-4">
              Mr. T. H. Ebrahim Kareem, the founder of M/s. T. H. Ebrahim Kareem & Co., masterminded the formation of Universal Sanitary House.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              At present, his sons, <strong className="text-neutral-700">Mr. T. E. Azad</strong> and <strong className="text-neutral-700">Mr. T. E. Akbar</strong>, are leading the company on the growth track based on the principles and vision of its mentor.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-foreground mb-4">Our Philosophy</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">We believe that a space is more than just walls and fittings; it is a canvas for life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-20 h-20 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500 text-primary">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-playfair text-2xl text-foreground mb-4">Uncompromising Quality</h3>
            <p className="text-neutral-500 leading-[1.7]">We source only the finest materials and partner with globally recognized brands to ensure every product stands the test of time.</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500 text-primary">
              <PenTool size={32} />
            </div>
            <h3 className="font-playfair text-2xl text-foreground mb-4">Curated Design</h3>
            <p className="text-neutral-500 leading-[1.7]">Our collections are meticulously chosen not just for their utility, but for their ability to inspire and elevate the aesthetics of any room.</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500 text-primary">
              <HeartHandshake size={32} />
            </div>
            <h3 className="font-playfair text-2xl text-foreground mb-4">Customer Excellence</h3>
            <p className="text-neutral-500 leading-[1.7]">From expert consultation to seamless delivery, our dedicated team ensures your experience is as luxurious as our products.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-foreground text-background text-center">
        <div className="max-w-3xl mx-auto">
          <MapPin size={48} className="mx-auto text-primary mb-8 opacity-80" />
          <h2 className="font-playfair text-4xl md:text-5xl mb-6">Experience It In Person</h2>
          <p className="text-neutral-400 mb-10 text-lg leading-[1.7]">
            Words and pictures can only say so much. We invite you to visit our expansive showroom to touch, feel, and truly appreciate the quality of our curated collections.
          </p>
          <a
            href="https://maps.google.com/?q=Universal+Sanitary+House,+Jew+Street,+Padma+Junction,+Ernakulam,+Kochi+682035"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white px-10 py-4 uppercase tracking-widest text-sm font-bold hover:brightness-110 smooth-hover"
          >
            Get Directions
          </a>
          <div className="mt-12 pt-8 border-t border-neutral-850 flex flex-col md:flex-row justify-center items-center gap-8 text-neutral-400 text-sm tracking-wide font-sans">
            <a href="tel:0484-2351581" className="hover:text-white transition-colors flex items-center gap-2">
              <span>Phone:</span> <strong className="text-white">0484-2351581</strong>
            </a>
            <span className="hidden md:inline text-neutral-800">|</span>
            <a href="mailto:universalsanitaryhouse@yahoo.com" className="hover:text-white transition-colors flex items-center gap-2">
              <span>Email:</span> <strong className="text-white">universalsanitaryhouse@yahoo.com</strong>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
