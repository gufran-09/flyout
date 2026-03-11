import { motion } from "framer-motion";

export function SectionTitle() {
  return (
    <section className="py-16 bg-white">
      <div className="section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4 text-neutral-900">
            Explore UAE's{" "}
            <span className="text-flyout-gold">Top Destinations</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Start your journey today — discover untold stories, breathtaking places,
            and adventures that stay with you forever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
