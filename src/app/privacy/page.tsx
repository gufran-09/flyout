import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, Globe, Users, FileText, Mail, Phone, MapPin } from "lucide-react";

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

export default function PrivacyPolicy() {
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
              <h1 className="text-4xl md:text-5xl font-display mb-6">Privacy Policy</h1>
              <p className="text-slate-300 max-w-2xl mx-auto font-light text-lg">
                At Flyout Tours LLC, we value your privacy. This policy explains how we collect, use, share, and protect your personal information.
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

            <Section title="1. Information We Collect" icon={FileText}>
              <p>We collect only the information necessary to provide and improve our services. This may include:</p>
              <ul className="list-disc pl-5 space-y-1 marker:text-flyout-gold">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number (including WhatsApp)</li>
                <li>Travel Dates and Destination</li>
                <li>Number of Guests</li>
                <li>Booking Preferences</li>
                <li>Information shared through contact forms, inquiries, ads, or chats</li>
                <li>Payment method details (when applicable)</li>
              </ul>
              <p className="text-sm italic mt-2">By submitting your information, you consent to its use as described in this policy.</p>
            </Section>

            <Section title="2. How We Use Your Information" icon={Eye}>
              <p>We may use your information to:</p>
              <ul className="list-disc pl-5 space-y-1 marker:text-flyout-gold">
                <li>Confirm your bookings and send itinerary details</li>
                <li>Respond to inquiries or provide customer support</li>
                <li>Share personalized offers or travel suggestions</li>
                <li>Send important updates related to your trip</li>
                <li>Send promotional emails or newsletters (only if you opt-in)</li>
                <li>Improve our website’s performance and customer experience</li>
              </ul>
            </Section>

            <Section title="3. Sharing of Information" icon={Users}>
              <p>
                We do not sell, trade, or rent your personal information to third parties. However, we may share certain relevant details with trusted suppliers, such as hotels or tour operators, and with technical or service partners, solely for the purpose of processing your bookings and ensuring smooth service delivery.
              </p>
              <p>
                Before sharing any information, we ensure that these third parties comply with strict privacy and security standards aligned with our own policy.
              </p>
            </Section>

            <Section title="4. Legal Disclosure" icon={Shield}>
              <p>
                There may be situations where we are required to disclose your personal information to comply with applicable laws, legal processes, or government requests. We may also disclose data if necessary to protect the rights, safety, or property of Flyout Tours, our users, or others, including for fraud prevention and risk reduction.
              </p>
            </Section>

            <Section title="5. Cookies & Tracking Technologies" icon={Globe}>
              <p>
                Our website may use cookies or similar tracking technologies to analyze site traffic, understand user behavior, enhance your browsing experience, and deliver relevant advertisements (only with your consent). These tools help us improve the functionality and user experience of our website. You can manage or disable cookies at any time through your browser settings.
              </p>
            </Section>

            <Section title="6. Data Security" icon={Server}>
              <p>
                We implement robust technical and organizational measures to safeguard your personal information. These include SSL (Secure Socket Layer) encryption, secure servers, firewalls, and access control systems to prevent unauthorized access.
              </p>
              <p>
                While we do everything possible to protect your data, no online system is entirely immune to security risks. Therefore, we continuously monitor and upgrade our systems to maintain a high standard of security.
              </p>
            </Section>

            <Section title="7. Third-Party Services" icon={Globe}>
              <p>
                We may run online marketing campaigns through platforms such as Facebook, Instagram (Meta), or Google. However, we do not permit these platforms to collect your personal information directly through our website. At this time, we also do not use third-party analytics tools like Google Analytics or external payment gateways. All data remains under the direct management and protection of Flyout Tours LLC.
              </p>
            </Section>

            <Section title="8. Contests & Surveys" icon={FileText}>
              <p>
                From time to time, we may conduct contests, giveaways, or surveys to engage with our customers. Participation in these activities is completely voluntary. If any third-party sponsor is involved, we will inform participants in advance and clearly disclose how their personal information will be used in connection with that third party.
              </p>
            </Section>

            <Section title="9. Your Rights" icon={Lock}>
              <p>
                You have the right to access the personal data we hold about you, request corrections or updates, and ask for your information to be deleted. You can also opt out of receiving marketing or promotional messages from us at any time. To exercise any of these rights, simply contact us using the information provided below.
              </p>
            </Section>

            <Section title="10. Contact Us" icon={Mail}>
              <p className="mb-4">
                If you have any questions, concerns, or requests related to this Privacy Policy or how we handle your personal information, please feel free to get in touch with us:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-flyout-gold mt-1" />
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Email Us</span>
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
                    <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Office Address</span>
                    <span className="text-slate-900 font-medium">Sharjah Media City, Sharjah, 515000, United Arab Emirates</span>
                  </div>
                </div>
              </div>
            </Section>

            <div className="text-center pt-8 border-t border-slate-200">
              <p className="text-slate-500 text-sm font-light italic">
                At Flyout Tours LLC, we remain fully committed to protecting your privacy throughout your travel experience with us.
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
