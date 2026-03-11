import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

export default function CancellationPolicy() {
  return (
    <Layout>
      <div className="section-container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-foreground mb-8">Cancellation Policy</h1>
          <p className="text-muted-foreground mb-6">Last updated: January 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Cancellation by Customer</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We understand that plans can change. You may cancel your booking at any time, subject to the
                following conditions and fees:
              </p>
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b border-border pb-3">
                  <span className="text-foreground font-medium">Time Before Tour</span>
                  <span className="text-foreground font-medium">Cancellation Fee</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-foreground/80">More than 7 days</span>
                  <span className="text-primary font-semibold">Free cancellation</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-foreground/80">3-7 days</span>
                  <span className="text-foreground/80">25% of booking value</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-foreground/80">24-72 hours</span>
                  <span className="text-foreground/80">50% of booking value</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-foreground/80">Less than 24 hours</span>
                  <span className="text-destructive font-semibold">100% (no refund)</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How to Cancel</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                To cancel your booking, you may use any of the following methods:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Log into your account and cancel through the dashboard</li>
                <li>Email us at bookings@flyouttours.com with your booking reference</li>
                <li>Call our customer service at +971 54 466 1317</li>
                <li>Use WhatsApp to reach our support team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cancellation by Flyout Tours</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We reserve the right to cancel bookings under the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Minimum participant requirements not met</li>
                <li>Adverse weather conditions affecting safety</li>
                <li>Unforeseen operational issues</li>
                <li>Government advisories or restrictions</li>
                <li>Force majeure events</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                In such cases, you will be offered a full refund or the option to reschedule at no additional cost.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Rescheduling</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                As an alternative to cancellation, you may reschedule your booking:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Free rescheduling if done 48+ hours before the tour</li>
                <li>Rescheduling within 24-48 hours may incur a 15% fee</li>
                <li>Subject to availability for the new date</li>
                <li>One free reschedule per booking is allowed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. No-Show Policy</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you fail to arrive at the designated meeting point without prior cancellation or notification,
                it will be considered a no-show. No refunds will be provided for no-shows, and the full booking
                amount will be forfeited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Group Bookings</h2>
              <p className="text-foreground/80 leading-relaxed">
                For group bookings of 10 or more participants, special cancellation terms may apply.
                Please contact our group sales team for specific terms and conditions related to your booking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Special Packages</h2>
              <p className="text-foreground/80 leading-relaxed">
                Some promotional packages, flash sales, or special offers may have different cancellation
                terms. These will be clearly stated at the time of booking. Please review the specific terms
                before completing your purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                For cancellation requests or questions about this policy:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-foreground/80">Email: bookings@flyouttours.com</p>
                <p className="text-foreground/80">Phone: +971 54 466 1317</p>
                <p className="text-foreground/80">WhatsApp: +971 54 466 1317</p>
                <p className="text-foreground/80">Available 24/7 for urgent cancellations</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
