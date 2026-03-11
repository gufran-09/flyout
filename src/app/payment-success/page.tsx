import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export default function PaymentSuccess() {
  const { clearCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    // Clear cart after successful payment
    clearCart();
  }, [clearCart]);

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
            className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-14 w-14 text-accent" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your booking! Your payment has been processed successfully.
            You will receive a confirmation email shortly with all the details.
          </p>

          <div className="space-y-3">
            {user ? (
              <Button asChild className="w-full">
                <Link to="/dashboard">
                  View My Bookings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link to="/auth">
                  Sign in to view bookings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button variant="outline" asChild className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Continue Exploring
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
