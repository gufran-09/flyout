"use client";
import { Layout } from "@/components/layout/Layout";

export default function RefundPolicy() {
  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="section-container text-center px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4 text-flyout-gold">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-display mb-6">Refund Policy</h1>
          <p className="text-slate-300 max-w-2xl mx-auto font-light text-lg">
            Our commitment to fair and transparent refund practices.
          </p>
        </div>
      </div>
      <div className="section-container py-16 px-4 max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Refund Eligibility</h2>
          <p className="text-slate-600 leading-relaxed">
            Refund eligibility depends on the specific service booked and the cancellation timeline. Each tour, activity, or staycation may have its own refund terms, which will be clearly stated at the time of booking.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Refund Process</h2>
          <p className="text-slate-600 leading-relaxed">
            To request a refund, please contact us via email at info@flyouttours.com or WhatsApp at +971 54 746 2902. Approved refunds will be processed within 7-14 business days and credited to the original payment method.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Non-Refundable Items</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Visa processing fees once the application has been submitted</li>
            <li>Services that have already been utilized</li>
            <li>No-show bookings</li>
            <li>Last-minute cancellations (within 24 hours of the service)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Partial Refunds</h2>
          <p className="text-slate-600 leading-relaxed">
            For combo or package bookings, cancelling one component may result in a partial refund based on the individual pricing of the remaining services.
          </p>
        </section>
      </div>
    </Layout>
  );
}
