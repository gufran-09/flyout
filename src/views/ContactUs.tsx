"use client";
import { Layout } from "@/components/layout/Layout";

export default function ContactUs() {
  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="section-container text-center px-4">
          <h1 className="text-4xl md:text-5xl font-display mb-6">Contact Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            We&apos;d love to hear from you. Reach out to us anytime.
          </p>
        </div>
      </div>
      <div className="section-container py-16 px-4 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Email</h3>
              <a href="mailto:info@flyouttours.com" className="text-flyout-gold hover:underline">info@flyouttours.com</a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Phone / WhatsApp</h3>
              <a href="https://wa.me/971547462902" className="text-flyout-gold hover:underline">+971 54 746 2902</a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Address</h3>
              <p className="text-slate-600">Sharjah Media City, Sharjah, 515000, United Arab Emirates</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Business Hours</h3>
            <p className="text-slate-600">Sunday – Thursday: 9:00 AM – 6:00 PM</p>
            <p className="text-slate-600">Friday – Saturday: 10:00 AM – 4:00 PM</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
