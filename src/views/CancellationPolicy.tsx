"use client";
import { Layout } from "@/components/layout/Layout";

export default function CancellationPolicy() {
  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="section-container text-center px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4 text-flyout-gold">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-display mb-6">Cancellation Policy</h1>
          <p className="text-slate-300 max-w-2xl mx-auto font-light text-lg">
            Please review our cancellation guidelines before booking.
          </p>
        </div>
      </div>
      <div className="section-container py-16 px-4 max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">General Cancellation Policy</h2>
          <p className="text-slate-600 leading-relaxed">
            Each service, staycation, or tour may have a different cancellation policy. Please review the specific terms provided at the time of booking. Cancellations must be submitted in writing via email or WhatsApp.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Cancellation Timelines</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>48+ hours before:</strong> Full refund (where applicable)</li>
            <li><strong>24-48 hours before:</strong> Partial refund may apply</li>
            <li><strong>Less than 24 hours:</strong> No refund</li>
            <li><strong>No-show:</strong> No refund</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">How to Cancel</h2>
          <p className="text-slate-600 leading-relaxed">
            To cancel your booking, contact us at{" "}
            <a href="mailto:info@flyouttours.com" className="text-flyout-gold hover:underline">info@flyouttours.com</a>{" "}
            or WhatsApp at{" "}
            <a href="https://wa.me/971547462902" className="text-flyout-gold hover:underline">+971 54 746 2902</a>.
            Cancellations are valid only upon written confirmation from Flyout Tours.
          </p>
        </section>
      </div>
    </Layout>
  );
}
