"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  User,
  Calendar,
  Heart,
  History,
  Settings,
  LogOut,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Shield,
  Mail,
  ChevronRight,
  Star,
  Package,
  Bell,
  Edit3,
  Camera,
  Phone,
  Globe,
  Compass,
  TrendingUp,
  Award,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast } from "sonner";

// ─── TYPES ─────────────────────────────────────────────────────────────────────

interface Profile {
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface Booking {
  id: string;
  booking_date: string;
  guests: number;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  created_at: string;
  product_supplier_id: string;
  product_pricing_id: string | null;
  // joined
  product_supplier?: {
    display_title: string | null;
    thumbnail_url: string | null;
    product?: {
      title: string;
      thumbnail_url: string | null;
      slug: string;
      category?: { slug: string };
      destination?: { slug: string };
    };
  };
  product_pricing?: {
    price: number;
    duration_minutes: number | null;
    label: string | null;
  };
}

interface WishlistItem {
  id: string;
  product_id: string;
  created_at: string;
  product?: {
    title: string;
    thumbnail_url: string | null;
    slug: string;
    rating: number;
    location: string | null;
    category?: { slug: string };
    destination?: { slug: string };
    product_suppliers?: { product_pricing?: { price: number }[] }[];
  };
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-400",
  },
  completed: {
    label: "Completed",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-400",
  },
};

const PAYMENT_CONFIG = {
  pending: {
    label: "Awaiting Payment",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  paid: { label: "Paid", bg: "bg-emerald-50", text: "text-emerald-700" },
  failed: { label: "Failed", bg: "bg-red-50", text: "text-red-600" },
  refunded: { label: "Refunded", bg: "bg-gray-100", text: "text-gray-600" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getLowestPrice(product: WishlistItem["product"]): number {
  if (!product?.product_suppliers) return 0;
  const prices = product.product_suppliers.flatMap((s) =>
    (s.product_pricing ?? []).map((p) => p.price),
  );
  return prices.length > 0 ? Math.min(...prices) : 0;
}

// ─── NAV TABS ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "history", label: "History", icon: History },
  { id: "profile", label: "Profile", icon: User },
];

// ─── STAT CARD ──────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-[#1A2B47]">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

// ─── BOOKING CARD ──────────────────────────────────────────────────────────────

function BookingCard({ booking }: { booking: Booking }) {
  const status = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending;
  const payment =
    PAYMENT_CONFIG[booking.payment_status] ?? PAYMENT_CONFIG.pending;
  const productTitle = booking.product_supplier?.product?.title ?? "Experience";
  const thumbnail =
    booking.product_supplier?.thumbnail_url ??
    booking.product_supplier?.product?.thumbnail_url ??
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80";
  const dest = booking.product_supplier?.product?.destination?.slug ?? "dubai";
  const cat = booking.product_supplier?.product?.category?.slug ?? "experience";
  const slug = booking.product_supplier?.product?.slug ?? "";
  const href = slug ? `/experiences/${dest}/${cat}/${slug}` : "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
    >
      {/* Image */}
      <div className="relative w-full sm:w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={thumbnail}
          alt={productTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className={`absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#1A2B47] truncate">
          {productTitle}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(booking.booking_date)}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {booking.guests} guest{booking.guests > 1 ? "s" : ""}
          </span>
          {booking.product_pricing?.label && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {booking.product_pricing.label}
            </span>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 flex-shrink-0">
        <p className="font-bold text-[#1A2B47]">
          AED {Number(booking.total_price).toLocaleString()}
        </p>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${payment.bg} ${payment.text}`}
        >
          {payment.label}
        </span>
        {slug && (
          <Link
            href={href}
            className="text-xs text-[#D4A853] hover:underline flex items-center gap-0.5 mt-1"
          >
            View <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── WISHLIST CARD ──────────────────────────────────────────────────────────────

function WishlistCard({
  item,
  onRemove,
}: {
  item: WishlistItem;
  onRemove: (id: string) => void;
}) {
  const product = item.product;
  if (!product) return null;
  const price = getLowestPrice(product);
  const dest = product.destination?.slug ?? "dubai";
  const cat = product.category?.slug ?? "experience";
  const href = `/experiences/${dest}/${cat}/${product.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={
            product.thumbnail_url ??
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"
          }
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors shadow-sm"
        >
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
        </button>
        {product.rating > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {product.rating}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#1A2B47] line-clamp-1 text-sm">
          {product.title}
        </h3>
        {product.location && (
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" />
            {product.location}
          </p>
        )}
        <div className="flex items-center justify-between mt-3">
          {price > 0 && (
            <p className="font-bold text-[#1A2B47] text-sm">
              <span className="text-xs font-normal text-gray-400">From </span>
              AED {price.toLocaleString()}
            </p>
          )}
          <Link
            href={href}
            className="text-xs bg-[#1A2B47] text-white px-3 py-1.5 rounded-full hover:bg-[#D4A853] transition-colors font-medium ml-auto"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── EMPTY STATE ───────────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  title,
  message,
  href,
  cta,
}: {
  icon: any;
  title: string;
  message: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-gray-300" />
      </div>
      <h3 className="font-semibold text-[#1A2B47] mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-5">{message}</p>
      {href && cta && (
        <Link href={href}>
          <Button className="bg-[#1A2B47] hover:bg-[#D4A853] text-white rounded-full px-6 transition-colors">
            {cta}
          </Button>
        </Link>
      )}
    </div>
  );
}

// ─── MAIN DASHBOARD ─────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [formData, setFormData] = useState({ full_name: "", phone: "" });

  useEffect(() => {
    if (!authLoading && !user) router.push("/sign-in");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    setLoading(true);

    const [profileRes, bookingsRes, wishlistRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", user.id).single(),
      supabase
        .from("bookings")
        .select(
          `
          *,
          product_supplier:product_suppliers(
            display_title, thumbnail_url,
            product:products(
              title, thumbnail_url, slug,
              category:categories(slug),
              destination:destinations(slug)
            )
          ),
          product_pricing:product_pricing(price, duration_minutes, label)
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("wishlist")
        .select(
          `
          *,
          product:products(
            title, thumbnail_url, slug, rating, location,
            category:categories(slug),
            destination:destinations(slug),
            product_suppliers(
              product_pricing(price)
            )
          )
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

    if (profileRes.data) {
      setProfile(profileRes.data);
      setFormData({
        full_name: profileRes.data.full_name || "",
        phone: profileRes.data.phone || "",
      });
    }
    if (bookingsRes.data) setBookings(bookingsRes.data as Booking[]);
    if (wishlistRes.data) setWishlist(wishlistRes.data as WishlistItem[]);
    setLoading(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: formData.full_name, phone: formData.phone })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) toast.error("Failed to update profile");
    else {
      toast.success("Profile updated!");
      fetchUserData();
    }
  };

  const handleRemoveWishlist = async (id: string) => {
    const { error } = await supabase.from("wishlist").delete().eq("id", id);
    if (error) toast.error("Failed to remove");
    else {
      toast.success("Removed from wishlist");
      fetchUserData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    toast.success("Signed out");
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-400">Loading your dashboard…</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  const activeBookings = bookings.filter((b) => b.status !== "completed");
  const completedBookings = bookings.filter((b) => b.status === "completed");
  const totalSpent = bookings
    .filter((b) => b.payment_status === "paid")
    .reduce((sum, b) => sum + Number(b.total_price), 0);
  const displayName =
    profile?.full_name || user.email?.split("@")[0] || "Traveler";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <Layout>
      <div className="min-h-screen bg-[#F8F9FB]">
        {/* ── HERO HEADER ── */}
        <div className="bg-[#1A2B47] relative overflow-hidden">
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #D4A853 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4A90D9 0%, transparent 40%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent" />

          <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* User info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={displayName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4A853]/50"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#B8832A] flex items-center justify-center border-2 border-[#D4A853]/30">
                      <span className="text-xl font-bold text-white">
                        {initials}
                      </span>
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-[#1A2B47]" />
                </div>
                <div>
                  <p className="text-[#D4A853] text-xs font-medium tracking-widest uppercase mb-0.5">
                    Welcome back
                  </p>
                  <h1 className="text-2xl font-bold text-white">
                    {displayName}
                  </h1>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3" />
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-full transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {[
                {
                  label: "Active Bookings",
                  value: activeBookings.length,
                  icon: Calendar,
                  color: "text-blue-300",
                },
                {
                  label: "Saved Experiences",
                  value: wishlist.length,
                  icon: Heart,
                  color: "text-rose-300",
                },
                {
                  label: "Trips Completed",
                  value: completedBookings.length,
                  icon: CheckCircle,
                  color: "text-emerald-300",
                },
                {
                  label: "Total Spent",
                  value: `AED ${totalSpent.toLocaleString()}`,
                  icon: CreditCard,
                  color: "text-[#D4A853]",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <stat.icon className={`w-4 h-4 mb-2 ${stat.color}`} />
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TAB NAV ── */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-[#D4A853] text-[#1A2B47]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === "bookings" && activeBookings.length > 0 && (
                    <span className="w-5 h-5 bg-[#D4A853] text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {activeBookings.length}
                    </span>
                  )}
                  {tab.id === "wishlist" && wishlist.length > 0 && (
                    <span className="w-5 h-5 bg-rose-100 text-rose-600 text-xs rounded-full flex items-center justify-center font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {/* BOOKINGS */}
            {activeTab === "bookings" && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1A2B47]">
                    Active Bookings
                  </h2>
                  {activeBookings.length > 0 && (
                    <span className="text-sm text-gray-400">
                      {activeBookings.length} booking
                      {activeBookings.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                {activeBookings.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <EmptyState
                      icon={Compass}
                      title="No active bookings"
                      message="Start exploring and book your next UAE adventure"
                      href="/dubai/desert-safari"
                      cta="Explore Experiences"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeBookings.map((b) => (
                      <BookingCard key={b.id} booking={b} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* WISHLIST */}
            {activeTab === "wishlist" && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1A2B47]">
                    Saved Experiences
                  </h2>
                  {wishlist.length > 0 && (
                    <span className="text-sm text-gray-400">
                      {wishlist.length} saved
                    </span>
                  )}
                </div>
                {wishlist.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <EmptyState
                      icon={Heart}
                      title="Nothing saved yet"
                      message="Tap the heart icon on any experience to save it here"
                      href="/dubai/attractions"
                      cta="Discover Experiences"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                      {wishlist.map((item) => (
                        <WishlistCard
                          key={item.id}
                          item={item}
                          onRemove={handleRemoveWishlist}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* HISTORY */}
            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1A2B47]">
                    Booking History
                  </h2>
                  {completedBookings.length > 0 && (
                    <span className="text-sm text-gray-400">
                      {completedBookings.length} completed
                    </span>
                  )}
                </div>
                {completedBookings.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <EmptyState
                      icon={Award}
                      title="No completed trips yet"
                      message="Your completed adventures will appear here"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {completedBookings.map((b) => (
                      <BookingCard key={b.id} booking={b} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* PROFILE */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-bold text-[#1A2B47] mb-6">
                  Profile Settings
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Avatar card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center lg:col-span-1">
                    <div className="relative inline-block mb-4">
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={displayName}
                          className="w-24 h-24 rounded-2xl object-cover mx-auto"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A2B47] to-[#2C4A7C] flex items-center justify-center mx-auto">
                          <span className="text-3xl font-bold text-[#D4A853]">
                            {initials}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-[#1A2B47] text-lg">
                      {displayName}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{user.email}</p>

                    <div className="mt-6 space-y-2 text-left">
                      <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
                        <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        Email verified
                      </div>
                      {profile?.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
                          <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          {profile.phone}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
                        <TrendingUp className="w-4 h-4 text-[#D4A853] flex-shrink-0" />
                        {bookings.length} total booking
                        {bookings.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>

                  {/* Form card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
                    <h3 className="font-semibold text-[#1A2B47] mb-5 flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-[#D4A853]" />
                      Edit Profile
                    </h3>
                    <form onSubmit={handleUpdateProfile} className="space-y-5">
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-600"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email || ""}
                          disabled
                          className="mt-1.5 bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed rounded-xl"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Email cannot be changed
                        </p>
                      </div>

                      <div>
                        <Label
                          htmlFor="full_name"
                          className="text-sm font-medium text-gray-600"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="full_name"
                          type="text"
                          value={formData.full_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              full_name: e.target.value,
                            })
                          }
                          placeholder="Your full name"
                          className="mt-1.5 border-gray-200 focus:border-[#D4A853] focus:ring-[#D4A853] rounded-xl"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-600"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+971 54 466 1317"
                          className="mt-1.5 border-gray-200 focus:border-[#D4A853] focus:ring-[#D4A853] rounded-xl"
                        />
                      </div>

                      <div className="pt-2 flex gap-3">
                        <Button
                          type="submit"
                          disabled={saving}
                          className="bg-[#1A2B47] hover:bg-[#D4A853] text-white rounded-full px-8 transition-colors"
                        >
                          {saving ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving…
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </form>

                    {/* Danger zone */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Account Actions
                      </h4>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out of all devices
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
