export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-8 px-6 md:px-12 max-w-4xl mx-auto mb-24">
      <h1 className="font-playfair text-4xl mb-8">Privacy Policy</h1>
      <div className="text-neutral-600 space-y-6">
        <p>Effective Date: {new Date().getFullYear()}</p>
        <p>At Universal Sanitary House, we respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website.</p>
        <h2 className="font-sans font-bold uppercase tracking-widest text-xs mt-8 mb-4">1. Data We Collect</h2>
        <p>We may collect identity data, contact data, and technical data (such as IP addresses) when you fill out enquiry forms or use the WhatsApp integration.</p>
        <h2 className="font-sans font-bold uppercase tracking-widest text-xs mt-8 mb-4">2. How We Use Your Data</h2>
        <p>We will only use your personal data to respond to enquiries, provide architectural resources, and improve our digital showroom experience.</p>
      </div>
    </main>
  );
}
