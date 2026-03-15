"use client";
import { Layout } from "@/components/layout/Layout";

export default function Partner() {
  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="section-container text-center px-4">
          <h1 className="text-4xl md:text-5xl font-display mb-6">Partner With Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Join the Flyout Tours network and grow your tourism business.
          </p>
        </div>
      </div>
      <div className="section-container py-16 px-4 max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Why Partner With Flyout Tours?</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Access to a growing customer base of international travelers</li>
            <li>Professional marketing and promotion of your services</li>
            <li>Seamless booking and payment integration</li>
            <li>Dedicated partnership support team</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Get In Touch</h2>
          <p className="text-slate-600">
            Interested in becoming a partner? Contact us at{" "}
            <a href="mailto:info@flyouttours.com" className="text-flyout-gold hover:underline">info@flyouttours.com</a>{" "}
            or call us at{" "}
            <a href="https://wa.me/971547462902" className="text-flyout-gold hover:underline">+971 54 746 2902</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
