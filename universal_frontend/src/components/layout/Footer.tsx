import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-neutral-300 py-20 px-6 md:px-12 border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-6">
            <img src="/images/logo/logo.webp" alt="Universal Sanitary" className="h-8 md:h-10 object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
          </Link>
          <p className="font-sans text-sm tracking-wider leading-relaxed max-w-sm mb-8 text-neutral-400">
            Defining luxury spaces since 1968. A premium supplier of sanitaryware, architectural solutions, and the exclusive Kerala dealer for NECO manhole & drainage covers.
          </p>
        </div>
        
        <div>
          <h3 className="font-sans font-bold uppercase tracking-widest text-xs mb-6 text-white">Explore</h3>
          <ul className="flex flex-col gap-4 font-sans text-sm text-neutral-400">
            <li><Link href="/products" className="hover:text-white smooth-hover">Collections</Link></li>
            <li><Link href="/about" className="hover:text-white smooth-hover">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans font-bold uppercase tracking-widest text-xs mb-6 text-white">Contact</h3>
          <ul className="flex flex-col gap-4 font-sans text-sm text-neutral-400">
            <li>Jew Street, Padma Junction</li>
            <li>Ernakulam, Kochi 682035</li>
            <li>0484-2351581</li>
            <li><Link href="mailto:info@universalsanitary.com" className="hover:text-white smooth-hover">info@universalsanitary.com</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-neutral-800 text-xs font-sans text-neutral-500 flex justify-between flex-col md:flex-row gap-4 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Universal Sanitary House.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white smooth-hover">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white smooth-hover">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
