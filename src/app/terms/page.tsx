import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
  CreditCard, CheckCircle, XCircle, Mail, Map, Building,
  ShieldAlert, FileText, Lock, Send, Scale, Phone, Tag, MapPin
} from "lucide-react";

const Section = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon?: any }) => (
  <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center gap-3 mb-4">
      {Icon && <div className="p-2 bg-flyout-gold/10 rounded-lg"><Icon className="w-5 h-5 text-flyout-gold" /></div>}
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    </div>
    <div className="text-slate-600 leading-relaxed font-light space-y-4">
      {children}
    </div>
  </section>
);

export default function TermsConditions() {
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen">
        {/* Header */}
        <div className="relative bg-[#0A1F44] text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none"></div>
          <div className="section-container relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4 text-flyout-gold">
                Legal
              </span>
              <h1 className="text-4xl md:text-5xl font-display mb-6">Terms & Conditions</h1>
              <p className="text-slate-300 max-w-2xl mx-auto font-light text-lg">
                Thank you for choosing Flyout Tours LLC. Please read these terms carefully to ensure a smooth travel experience.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="section-container py-16 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >

            <Section title="1. Pricing" icon={Tag}>
              <p>
                All prices listed on our website are per person unless stated otherwise. Prices include only the services explicitly mentioned in the booking (such as transfers, attractions, or accommodation).
              </p>
              <p>
                Prices do not include tips, visa fees, travel insurance, food/drinks, hotel services (e.g. laundry, room service), or personal expenses. Rates are subject to change without prior notice due to external factors such as airline changes, hotel revisions, or unforeseen circumstances.
              </p>
            </Section>

            <Section title="2. Payment Methods" icon={CreditCard}>
              <p>
                We accept major credit and debit cards including Visa, MasterCard, and American Express. Payment must be made in full at the time of booking. Your card will be charged once the booking is confirmed, and a confirmation will be sent via email or WhatsApp.
              </p>
            </Section>

            <Section title="3. Booking Confirmation" icon={CheckCircle}>
              <p>
                Once payment is received, a confirmation slip will be sent to your registered email or phone. This confirmation is your proof of booking and must be presented when using the service. Please ensure all information provided during booking is accurate and complete.
              </p>
            </Section>

            <Section title="4. Cancellation & No-Show Policy" icon={XCircle}>
              <h4 className="font-semibold text-slate-800">4.1 Cancellation</h4>
              <p>
                Each service, staycation, or tour may have a different cancellation policy. Please read the specific terms at the time of booking. Some services are non-refundable. For combo packages: cancelling one service may affect the package price. Only the individual tour price may be refunded. Visa and entry permits are non-refundable once issued.
              </p>
              <h4 className="font-semibold text-slate-800 mt-2">4.2 No-Show</h4>
              <p>
                If you fail to appear at the scheduled time or location, no refund will be provided. This includes missed airport transfers, unused tickets, or no-show for hotel check-ins.
              </p>
            </Section>

            <Section title="5. Cancellation Process" icon={Mail}>
              <p>
                To cancel your booking, you must notify Flyout Tours in writing via email or WhatsApp. Cancellations are valid only upon written confirmation from us. Verbal or unacknowledged cancellations will not be honored.
              </p>
            </Section>

            <Section title="6. Itinerary & Service Amendments" icon={Map}>
              <p>
                Flyout Tours reserves the right to adjust routings, timings, or services due to weather, airline schedules, or force majeure events. In such cases, we will offer a suitable alternative of equal or greater value, subject to availability. No refund will be issued for minor itinerary changes or disruptions caused by natural calamities (e.g., flood, storm, earthquake).
              </p>
            </Section>

            <Section title="7. Hotel Accommodation & Check-in/Check-out" icon={Building}>
              <p>
                In the rare case that your preferred hotel is not available, we will arrange accommodation of a similar category. Hotel check-in/check-out policies vary and are subject to each hotel’s internal policy. Flyout Tours is not responsible for early check-in or late check-out denials.
              </p>
            </Section>

            <Section title="8. Travel Insurance" icon={ShieldAlert}>
              <p>
                Flyout Tours is not responsible for any injury, illness, accident, trip cancellation, or loss of baggage. We strongly recommend travelers purchase comprehensive travel insurance for full protection.
              </p>
            </Section>

            <Section title="9. Travel Documents" icon={FileText}>
              <p>
                Guests are responsible for holding a valid passport, visa, or any travel documentation required for their destination. No refund will be given for failure to travel due to missing or invalid documents. Travelers are advised to check entry and health requirements with the respective embassy or consulate before departure.
              </p>
            </Section>

            <Section title="10. Website Usage Restrictions" icon={Lock}>
              <p>
                All website content, including text, images, logos, and package details, is owned by Flyout Tours LLC. You may not reproduce, republish, or exploit our website or its content for any commercial, non-personal, or unlawful purpose.
              </p>
            </Section>

            <Section title="11. Delivery & Shipping Policy" icon={Send}>
              <p>
                Flyout Tours does not provide any physical goods. All confirmations and itineraries are sent digitally via email or WhatsApp. Flyout Tours will NOT deal with or provide any services to any OFAC-sanctioned countries in accordance with UAE law.
              </p>
            </Section>

            <Section title="12. Governing Law & Jurisdiction" icon={Scale}>
              <p>
                All purchases, bookings, and disputes arising from use of this website shall be governed and construed in accordance with the laws of the United Arab Emirates.
              </p>
            </Section>

            <Section title="Contact Information" icon={Phone}>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-flyout-gold mt-1" />
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Email</span>
                    <a href="mailto:info@flyouttours.com" className="text-slate-900 font-medium hover:text-flyout-gold transition-colors">info@flyouttours.com</a>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                  <Phone className="w-5 h-5 text-flyout-gold mt-1" />
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Phone / WhatsApp</span>
                    <a href="https://wa.me/971547462902" className="text-slate-900 font-medium hover:text-flyout-gold transition-colors">+971 54 746 2902</a>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3 md:col-span-2">
                  <MapPin className="w-5 h-5 text-flyout-gold mt-1" />
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Address</span>
                    <span className="text-slate-900 font-medium">Sharjah Media City, Sharjah, 515000, United Arab Emirates</span>
                  </div>
                </div>
              </div>
            </Section>

            <div className="text-center pt-8 border-t border-slate-200">
              <p className="text-slate-500 text-sm font-light italic">
                By booking a trip through our website, you agree to these terms and conditions.
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
