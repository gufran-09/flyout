"use client";
import { Layout } from "@/components/layout/Layout";

export default function AboutUs() {
  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="section-container text-center px-4">
          <h1 className="text-4xl md:text-5xl font-display mb-6">About Flyout Tours</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Your trusted partner for unforgettable travel experiences across the UAE.
          </p>
        </div>
      </div>
      <div className="section-container py-16 px-4 max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Who We Are</h2>
          <p className="text-slate-600 leading-relaxed">
            Flyout Tours LLC is a premier travel and tourism company based in Sharjah Media City, UAE. We specialize in curating extraordinary travel experiences — from thrilling desert safaris and luxury yacht cruises to cultural city tours and adrenaline-packed adventures across Dubai and the UAE.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            To make world-class travel experiences accessible, seamless, and memorable for every traveler visiting the UAE.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Why Choose Us</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Curated experiences handpicked by travel experts</li>
            <li>Best price guarantee on all tours and activities</li>
            <li>24/7 customer support via WhatsApp and email</li>
            <li>Secure online booking with instant confirmation</li>
            <li>Trusted by thousands of travelers worldwide</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
