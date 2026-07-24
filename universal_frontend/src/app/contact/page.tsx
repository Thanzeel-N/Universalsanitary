import { MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us | Universal Sanitary",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-8 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
      <div>
        <h1 className="font-playfair text-5xl mb-6">Get in Touch</h1>
        <p className="text-neutral-600 mb-12 text-base leading-[1.7]">Visit our luxury showroom or reach out directly for project enquiries.</p>
        
        <div className="mb-8">
          <h2 className="font-sans font-bold uppercase tracking-widest text-xs mb-2">Showroom Location</h2>
          <p className="text-lg leading-[1.7]">Post box No. 3674, Jew street<br/>Ernakulam, Kerala, India - 682035</p>
        </div>

        <div className="mb-12">
          <h2 className="font-sans font-bold uppercase tracking-widest text-xs mb-2">Direct Contact</h2>
          <p className="text-lg leading-[1.7]">+91- 484- 2351581, 2360931, 2366939<br/>universalsanitary@yahoo.com</p>
        </div>

        <a 
          href="https://wa.me/917356863985" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 hover:bg-[#128C7E] smooth-hover"
        >
          <MessageCircle size={24} />
          <span className="uppercase tracking-widest text-sm font-bold">Chat on WhatsApp</span>
        </a>
      </div>

      <div className="bg-neutral-50 p-8 md:p-12">
        <h2 className="font-playfair text-3xl mb-8">Send an Enquiry</h2>
        <form className="flex flex-col gap-6">
          <input type="text" placeholder="Your Name" className="border-b border-neutral-300 bg-transparent py-4 focus:outline-none focus:border-primary" />
          <input type="email" placeholder="Email Address" className="border-b border-neutral-300 bg-transparent py-4 focus:outline-none focus:border-primary" />
          <textarea placeholder="Message / Project Details" rows={4} className="border-b border-neutral-300 bg-transparent py-4 focus:outline-none focus:border-primary resize-none"></textarea>
          <button type="button" className="bg-primary text-white py-4 hover:bg-neutral-800 smooth-hover uppercase tracking-widest text-sm mt-4">Submit</button>
        </form>
      </div>
    </main>
  );
}
