export default function TermsPage() {
  return (
    <main className="min-h-screen pt-8 px-6 md:px-12 max-w-4xl mx-auto mb-24">
      <h1 className="font-playfair text-4xl mb-8">Terms of Service</h1>
      <div className="text-neutral-600 space-y-6">
        <p>Effective Date: {new Date().getFullYear()}</p>
        <p>Welcome to Universal Sanitary House. By accessing this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
        <h2 className="font-sans font-bold uppercase tracking-widest text-xs mt-8 mb-4">1. Intellectual Property</h2>
        <p>The content, layout, design, data, databases and graphics on this website are protected by intellectual property laws and are owned by Universal Sanitary House.</p>
        <h2 className="font-sans font-bold uppercase tracking-widest text-xs mt-8 mb-4">2. Website Use</h2>
        <p>You may not reproduce, download, transmit or re-publish any part of this website without our prior written consent, except for downloading Architect Resources which are explicitly provided for professional use.</p>
      </div>
    </main>
  );
}
