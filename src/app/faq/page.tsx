import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronDown, ChevronUp, HelpCircle, FileText, CreditCard, MapPin, Calendar } from "lucide-react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: "Booking & Reservations",
            items: [
                {
                    question: "How do I make a booking?",
                    answer: "You can book directly through our website by selecting your desired tour, choosing your dates, and proceeding to checkout. Alternatively, you can contact our concierge team via WhatsApp for personalized assistance."
                },
                {
                    question: "Can I cancel or modify my reservation?",
                    answer: "Yes, cancellations and modifications are possible depending on the specific tour's policy. Generally, full refunds are available for cancellations made 24-48 hours in advance. Please check the specific terms of your booking."
                },
                {
                    question: "Do I need to print my ticket?",
                    answer: "No, we are 100% digital! You will receive an e-ticket via email, which you can show on your mobile device upon arrival."
                }
            ]
        },
        {
            category: "Payments & Pricing",
            items: [
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as Apple Pay and Google Pay for secure online transactions."
                },
                {
                    question: "Are there any hidden fees?",
                    answer: "No, the price you see is the final price. All taxes and service charges are included in the displayed amount unless explicitly stated otherwise."
                }
            ]
        },
        {
            category: "Tours & Experiences",
            items: [
                {
                    question: "Are pick-up and drop-off included?",
                    answer: "Many of our experiences, such as desert safaris and city tours, include hotel transfers. Please check the 'Inclusions' section of each specific activity for details."
                },
                {
                    question: "What languages are the tours conducted in?",
                    answer: "Our standard tours are conducted in English. However, we can arrange private guides in French, German, Spanish, Russian, and other languages upon request."
                },
                {
                    question: "Is travel insurance included?",
                    answer: "We recommend all guests hav their own travel insurance. While our operators maintain high safety standards and insurance for vehicles/activities, personal travel insurance is advisable."
                }
            ]
        }
    ];

    const handleToggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar />

            <main className="pt-28 pb-20">
                <div className="section-container px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-display text-slate-900 mb-6">
                            Frequently Asked <span className="text-flyout-gold">Questions</span>
                        </h1>
                        <p className="text-slate-500 max-w-xl mx-auto text-lg font-light leading-relaxed">
                            Everything you need to know about booking your premium Dubai experiences with Flyout Tours.
                        </p>
                    </div>

                    {/* FAQ Sections */}
                    <div className="space-y-12">
                        {faqs.map((section, sectionIdx) => (
                            <div key={sectionIdx} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-flyout-gold rounded-full"></span>
                                    {section.category}
                                </h3>

                                <div className="space-y-4">
                                    {section.items.map((item, itemIdx) => {
                                        const globalIdx = sectionIdx * 10 + itemIdx;
                                        const isOpen = openIndex === globalIdx;

                                        return (
                                            <div
                                                key={itemIdx}
                                                className={`border rounded-xl transition-all duration-300 ${isOpen ? 'border-flyout-gold/30 bg-flyout-gold/5' : 'border-slate-100 hover:border-slate-200'}`}
                                            >
                                                <button
                                                    onClick={() => handleToggle(globalIdx)}
                                                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                                                >
                                                    <span className={`text-base font-medium ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>
                                                        {item.question}
                                                    </span>
                                                    {isOpen ? <ChevronUp className="text-flyout-gold w-5 h-5 shrink-0" /> : <ChevronDown className="text-slate-400 w-5 h-5 shrink-0" />}
                                                </button>

                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                                >
                                                    <p className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Support CTA */}
                    <div className="mt-16 bg-[#0A1F44] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-display mb-4">Still have questions?</h3>
                            <p className="text-slate-300 mb-8 max-w-md mx-auto font-light">
                                Our concierge support team is available 24/7 to assist you with any inquiries or special requests.
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-flyout-gold text-black px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-white transition-colors"
                            >
                                Contact Concierge
                            </a>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
