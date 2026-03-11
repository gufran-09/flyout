import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { CurrencySymbol } from "@/components/ui/CurrencySymbol";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, updateGuests, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      const cartData = items.map((item) => ({
        tourId: item.tour.id,
        tourName: item.tour.name,
        tourImage: item.tour.image,
        price: item.tour.price,
        quantity: item.quantity,
        guests: item.guests,
      }));

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { items: cartData },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to start checkout");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="section-container py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any tours yet. Explore our amazing experiences!
            </p>
            <Button asChild>
              <Link to="/">
                Browse Tours
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-container py-8 md:py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-4 flex gap-4"
              >
                <img
                  src={item.tour.image}
                  alt={item.tour.name}
                  className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {item.tour.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.tour.location} • {item.tour.duration}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    {/* Guests */}
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Guests:</span>
                      <div className="flex items-center gap-1 border border-border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateGuests(item.id, item.guests - 1)}
                          disabled={item.guests <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.guests}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateGuests(item.id, item.guests + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Qty:</span>
                      <div className="flex items-center gap-1 border border-border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-neutral-900 flex items-center justify-end gap-1">
                        <CurrencySymbol className="w-4 h-4" /> {(item.tour.price * item.quantity * item.guests).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                        <CurrencySymbol className="w-3 h-3 opacity-70" /> {item.tour.price} × {item.quantity} × {item.guests} guest(s)
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 border-b border-border pb-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">
                      {item.tour.name} (×{item.quantity}, {item.guests} guest{item.guests > 1 ? 's' : ''})
                    </span>
                    <span className="font-medium flex items-center gap-1">
                      <CurrencySymbol className="w-3.5 h-3.5" /> {(item.tour.price * item.quantity * item.guests).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-neutral-900 flex items-center gap-1">
                  <CurrencySymbol className="w-6 h-6" /> {totalPrice.toLocaleString()}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
                disabled={loading}
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {!user && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  <Link to="/auth" className="text-primary hover:underline">
                    Sign in
                  </Link>{" "}
                  to save your bookings and access them later
                </p>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="w-full mt-2 text-muted-foreground hover:text-destructive"
              >
                Clear Cart
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
