export default function ArchitectPage() {
  return (
    <main className="min-h-screen pt-8 px-6 md:px-12 max-w-7xl mx-auto mb-24 text-center">
      <h1 className="font-playfair text-5xl mb-6">Architect Resource Center</h1>
      <p className="text-neutral-600 max-w-2xl mx-auto mb-16">
        Exclusive access to 3D models, technical catalogs, dwg files, and dedicated B2B project support for interior designers and architects.
      </p>
      
      <div className="border border-neutral-200 p-12 max-w-lg mx-auto">
        <h2 className="font-playfair text-2xl mb-6">Request Access</h2>
        <form className="flex flex-col gap-6 text-left">
          <input type="text" placeholder="Firm Name" className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-primary" />
          <input type="email" placeholder="Professional Email" className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-primary" />
          <button type="button" className="bg-primary text-white py-4 mt-6 hover:bg-neutral-800 smooth-hover uppercase tracking-widest text-sm">Apply for Access</button>
        </form>
      </div>
    </main>
  );
}
