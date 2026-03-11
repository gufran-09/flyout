import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function PaymentCanceled() {
  return (
    <Layout>
      <div className="section-container py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="h-14 w-14 text-destructive" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
          <p className="text-muted-foreground mb-8">
            Your payment was not completed. Don't worry - your items are still in your cart.
            Feel free to try again when you're ready.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/cart">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Return to Cart
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
