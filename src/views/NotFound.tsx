"use client";
import { Layout } from "@/components/layout/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-7xl font-bold text-flyout-gold mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-slate-500 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-flyout-gold text-white rounded-lg font-medium hover:bg-flyout-gold/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </Layout>
  );
}
