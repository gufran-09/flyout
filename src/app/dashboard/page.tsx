import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  Mail
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  dubaiThemeParks,
  dubaiWaterParks,
  dubaiAttractions,
  dubaiWaterSports,
  dubaiDinnerCruise,
  dubaiYacht,
  abuDhabiExperiences,
  staycations
} from "@/data/tours";

const allTours = [
  ...dubaiThemeParks,
  ...dubaiWaterParks,
  ...dubaiAttractions,
  ...dubaiWaterSports,
  ...dubaiDinnerCruise,
  ...dubaiYacht,
  ...abuDhabiExperiences,
  ...staycations,
];

interface Profile {
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface Booking {
  id: string;
  tour_id: string;
  tour_name: string;
  tour_image: string | null;
  booking_date: string;
  guests: number;
  total_price: number;
  status: string;
  payment_status: string;
  created_at: string;
}

interface WishlistItem {
  id: string;
  tour_id: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      checkAdminRole();
    }
  }, [user]);

  const checkAdminRole = async () => {
    if (!user) return;
    try {
      const { data } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      setIsAdmin(data === true);
    } catch (error) {
      console.error("Error checking admin role:", error);
    }
  };

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const [profileResult, bookingsResult, wishlistResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single(),
        supabase
          .from("bookings")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("wishlist")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
      ]);

      if (profileResult.data) {
        setProfile(profileResult.data);
        setFormData({
          full_name: profileResult.data.full_name || "",
          phone: profileResult.data.phone || "",
        });
      }

      if (bookingsResult.data) {
        setBookings(bookingsResult.data);
      }

      if (wishlistResult.data) {
        setWishlist(wishlistResult.data);
      }

      // Log errors if any, but don't break the whole page
      if (profileResult.error) console.error("Profile fetch error:", profileResult.error);
      if (bookingsResult.error) console.error("Bookings fetch error:", bookingsResult.error);
      if (wishlistResult.error) console.error("Wishlist fetch error:", wishlistResult.error);

    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
      })
      .eq("user_id", user.id);

    setSaving(false);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully!");
      fetchUserData();
    }
  };

  const handleRemoveFromWishlist = async (wishlistId: string) => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("id", wishlistId);

    if (error) {
      toast.error("Failed to remove from wishlist");
    } else {
      toast.success("Removed from wishlist");
      fetchUserData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      case "completed":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getWishlistTour = (tourId: string) => {
    return allTours.find(tour => tour.id === tourId);
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="section-container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {profile?.full_name || user.email}
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">

              <Button
                variant="outline"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
                {bookings.filter(b => b.status !== "completed").length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No active bookings</p>
                    <Button asChild className="mt-4">
                      <Link to="/deals">Explore Tours</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings
                      .filter(b => b.status !== "completed")
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="flex flex-col md:flex-row gap-4 p-4 border border-border rounded-lg"
                        >
                          <img
                            src={booking.tour_image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80"}
                            alt={booking.tour_name}
                            className="w-full md:w-32 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{booking.tour_name}</h3>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(booking.booking_date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {booking.guests} guests
                              </span>
                              <span className="font-medium text-foreground">
                                AED {booking.total_price}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${booking.payment_status === "paid" ? "text-green-600 bg-green-50" : "text-yellow-600 bg-yellow-50"}`}>
                              {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No saved tours</p>
                    <Button asChild className="mt-4">
                      <Link to="/deals">Explore Tours</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((item) => {
                      const tour = getWishlistTour(item.tour_id);
                      if (!tour) return null;
                      return (
                        <div
                          key={item.id}
                          className="border border-border rounded-lg overflow-hidden"
                        >
                          <img
                            src={tour.image}
                            alt={tour.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold line-clamp-1">{tour.name}</h3>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {tour.location}
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <span className="font-bold text-primary">
                                AED {tour.price}
                              </span>
                              <div className="flex gap-2">
                                <Button size="sm" asChild>
                                  <Link to={`/tour/${tour.id}`}>View</Link>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRemoveFromWishlist(item.id)}
                                >
                                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Booking History</h2>
                {bookings.filter(b => b.status === "completed").length === 0 ? (
                  <div className="text-center py-12">
                    <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No completed bookings</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings
                      .filter(b => b.status === "completed")
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="flex flex-col md:flex-row gap-4 p-4 border border-border rounded-lg"
                        >
                          <img
                            src={booking.tour_image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80"}
                            alt={booking.tour_name}
                            className="w-full md:w-32 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{booking.tour_name}</h3>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(booking.booking_date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {booking.guests} guests
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-green-600 font-medium">Completed</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="bg-card border border-border rounded-xl p-6 max-w-xl">
                <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email || ""}
                      disabled
                      className="mt-1 bg-muted"
                    />
                  </div>

                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 54 466 1317"
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
}
