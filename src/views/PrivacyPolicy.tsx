"use client";
import { Layout } from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="section-container text-center px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4 text-flyout-gold">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-display mb-6">Privacy Policy</h1>
          <p className="text-slate-300 max-w-2xl mx-auto font-light text-lg">
            Your privacy is important to us. This policy explains how we collect, use, and protect your data.
          </p>
        </div>
      </div>
      <div className="section-container py-16 px-4 max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed">
            We collect personal information that you provide when booking tours, creating an account, or contacting us. This may include your name, email address, phone number, and payment information.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed">
            Your information is used to process bookings, send confirmations and updates, improve our services, and communicate promotional offers (with your consent).
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Data Protection</h2>
          <p className="text-slate-600 leading-relaxed">
            We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Payment processing is handled through secure, PCI-compliant payment gateways.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Cookies</h2>
          <p className="text-slate-600 leading-relaxed">
            Our website uses cookies to enhance your browsing experience. You can manage your cookie preferences through your browser settings.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            For any privacy-related questions, please contact us at{" "}
            <a href="mailto:info@flyouttours.com" className="text-flyout-gold hover:underline">info@flyouttours.com</a>.
          </p>
        </section>
      </div>
    </Layout>
  );
}
