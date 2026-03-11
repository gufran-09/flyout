import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

export default function RefundPolicy() {
  return (
    <Layout>
      <div className="section-container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
          <p className="text-muted-foreground mb-6">Last updated: January 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Overview</h2>
              <p className="text-foreground/80 leading-relaxed">
                At Flyout Tours, we strive to provide exceptional travel experiences. We understand that
                circumstances may change, and we have established this refund policy to ensure transparency
                and fairness in our dealings with customers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Refund Eligibility</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">Refunds may be issued under the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Tour cancellation by Flyout Tours</li>
                <li>Service not delivered as described</li>
                <li>Significant changes to the tour itinerary</li>
                <li>Weather-related cancellations (where applicable)</li>
                <li>Customer cancellation within the eligible timeframe</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Refund Timeline</h2>
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="text-foreground font-medium">Cancellation Period</span>
                  <span className="text-foreground font-medium">Refund Amount</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">7+ days before tour</span>
                  <span className="text-primary font-semibold">100% refund</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">3-6 days before tour</span>
                  <span className="text-primary font-semibold">75% refund</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">1-2 days before tour</span>
                  <span className="text-primary font-semibold">50% refund</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Less than 24 hours</span>
                  <span className="text-destructive font-semibold">No refund</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Refund Process</h2>
              <ol className="list-decimal pl-6 space-y-2 text-foreground/80">
                <li>Submit a refund request via email or through your account dashboard</li>
                <li>Include your booking reference number and reason for refund</li>
                <li>Our team will review your request within 2-3 business days</li>
                <li>Approved refunds will be processed within 7-14 business days</li>
                <li>Refunds will be credited to the original payment method</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Non-Refundable Items</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Third-party fees (visa processing, transportation add-ons)</li>
                <li>No-show without prior cancellation</li>
                <li>Special promotions or discounted packages (unless otherwise stated)</li>
                <li>Processing fees and service charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Partial Refunds</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you participated in part of a tour and wish to claim a partial refund for unused services,
                please contact our support team. Each case will be evaluated individually based on the
                circumstances and remaining services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Credit Option</h2>
              <p className="text-foreground/80 leading-relaxed">
                Instead of a refund, you may opt to receive a credit for future bookings. Credits are valid
                for 12 months from the date of issue and can be applied to any Flyout Tours service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                For refund requests or questions about this policy, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-foreground/80">Email: refunds@flyouttours.com</p>
                <p className="text-foreground/80">Phone: +971 54 466 1317</p>
                <p className="text-foreground/80">Available: Sunday - Thursday, 9 AM - 6 PM GST</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
