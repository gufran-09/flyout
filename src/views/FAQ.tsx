"use client";
import { Layout } from "@/components/layout/Layout";

const faqItems = [
  {
    question: "How do I book a tour?",
    answer: "Simply browse our experiences, select your preferred tour, choose your date and number of guests, and complete the booking with online payment."
  },
  {
    question: "Can I cancel or modify my booking?",
    answer: "Cancellation and modification policies vary by tour. Please check the specific terms at the time of booking. Some services are non-refundable."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit and debit cards including Visa, MasterCard, and American Express."
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes, we offer special rates for group bookings. Please contact us via WhatsApp or email for custom group pricing."
  },
  {
    question: "Is travel insurance included?",
    answer: "Travel insurance is not included in our packages. We strongly recommend purchasing comprehensive travel insurance before your trip."
  },
  {
    question: "What should I bring on a desert safari?",
    answer: "We recommend comfortable clothing, sunglasses, sunscreen, and a camera. Specific requirements will be shared in your booking confirmation."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via email at info@flyouttours.com or WhatsApp at +971 54 746 2902. We are available 24/7."
  },
];

export default function FAQ() {
  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="section-container text-center px-4">
          <h1 className="text-4xl md:text-5xl font-display mb-6">Frequently Asked Questions</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Find answers to the most common questions about our services.
          </p>
        </div>
      </div>
      <div className="section-container py-16 px-4 max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <details
            key={index}
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <summary className="cursor-pointer px-6 py-4 font-medium text-slate-800 hover:text-flyout-gold transition-colors list-none flex justify-between items-center">
              {item.question}
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </Layout>
  );
}
