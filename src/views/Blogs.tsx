"use client";
import { Layout } from "@/components/layout/Layout";

export default function Blogs() {
  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="section-container text-center px-4">
          <h1 className="text-4xl md:text-5xl font-display mb-6">Flyout Tours Blog</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Travel tips, destination guides, and the latest from the UAE.
          </p>
        </div>
      </div>
      <div className="section-container py-16 px-4 max-w-4xl mx-auto">
        <p className="text-slate-500 text-center text-lg">Coming soon — stay tuned for our latest travel stories and guides.</p>
      </div>
    </Layout>
  );
}
