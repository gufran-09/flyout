import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CartItem {
  tourId: string;
  tourName: string;
  tourImage: string;
  price: number;
  quantity: number;
  guests: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Try to get authenticated user (optional for guest checkout)
    const authHeader = req.headers.get("Authorization");
    let user = null;
    let customerId: string | undefined;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;

      if (user?.email) {
        // Check if Stripe customer exists
        const customers = await stripe.customers.list({ email: user.email, limit: 1 });
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
        }
      }
    }

    const { items } = await req.json() as { items: CartItem[] };

    if (!items || items.length === 0) {
      throw new Error("No items provided");
    }

    // Create line items for Stripe Checkout
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "aed",
        product_data: {
          name: item.tourName,
          images: item.tourImage ? [item.tourImage] : [],
          metadata: {
            tour_id: item.tourId,
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to fils (cents equivalent)
      },
      quantity: item.quantity * item.guests,
    }));

    // Create metadata for the session
    const metadata: Record<string, string> = {
      items: JSON.stringify(items.map(item => ({
        tourId: item.tourId,
        tourName: item.tourName,
        tourImage: item.tourImage,
        price: item.price,
        quantity: item.quantity,
        guests: item.guests,
      }))),
    };

    if (user?.id) {
      metadata.user_id = user.id;
    }

    const origin = req.headers.get("origin") || "https://example.com";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user?.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-canceled`,
      metadata,
      payment_intent_data: {
        metadata,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
