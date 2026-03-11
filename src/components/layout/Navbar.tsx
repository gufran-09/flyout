import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Menu,
  X,
  Plane,
  MapPin,
  Building2,
  Palmtree,
  Ship,
  Compass,
  LogOut,
  LayoutDashboard,
  BellRing,
  Store,
  Coins,
  Moon,
  Zap,
  Utensils,
  Car,
  FileText,
  Ticket,
  Package,
  Star
} from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { SearchAutocomplete } from "@/components/search/SearchAutocomplete";
import { NavbarSearch } from "./NavbarSearch";

const dubaiCategories = [
  { name: "Theme Parks", href: "/dubai/theme-parks", icon: Palmtree },
  { name: "Water Parks", href: "/dubai/water-parks", icon: Ship },
  { name: "Attractions", href: "/dubai/attractions", icon: Building2 },
  { name: "Water Sports", href: "/dubai/water-sports", icon: Compass },
  { name: "Water Adventures", href: "/dubai/water-adventures", icon: Ship },
  { name: "Dinner Cruise", href: "/dubai/dinner-cruise", icon: Ship },
  { name: "Yacht", href: "/dubai/yacht", icon: Ship },
  { name: "Limousine", href: "/dubai/limousine", icon: Compass },
];

const destinationsCategories = [
  { name: "Dubai", href: "/dubai", icon: Building2 },
  { name: "Abu Dhabi", href: "/abu-dhabi", icon: MapPin },
  { name: "Sharjah", href: "/sharjah", icon: MapPin },
  { name: "Ras Al Khaimah", href: "/ras-al-khaimah", icon: MapPin },
];

import { getCategories, Category } from "@/lib/categories";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Deals UAE", href: "/deals" },
  ];

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.25)] font-sans tracking-wide"
      >
        {/* === TOP BAR === */}
        <div className="bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(10,31,68,0.10)]">

          <div className="section-container py-4">

            <div className="flex items-center justify-between gap-4">

              {/* Left: Logo & Tagline */}
              <Link to="/" onClick={handleLogoClick} className="flex-shrink-0 flex items-center -ml-2 group">
                <div className="flex flex-col">
                  <img src="/logo.png" alt="Flyout Tours" className="h-[4.5rem] w-auto object-contain" />
                </div>
              </Link>

              {/* Center: Search Bar */}
              <div className="hidden lg:flex flex-1 justify-center px-8">
                <NavbarSearch />
              </div>

              {/* Right: Actions */}
              <div className="hidden lg:flex items-center gap-6">

                {/* Vertical Stack: Partner & Points */}
                <div className="flex flex-col items-start gap-1">
                  {/* Partner Link */}
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 320, damping: 16 }}
                  >
                    <Link to="/partner" className="flex items-center gap-2 group">
                      <Store className="h-4 w-4 text-[#1A2B47] group-hover:text-[#B88E2F] transition-colors" />
                      <span className="text-[12.5px] font-bold text-[#0A1F44] group-hover:text-[#B88E2F] tracking-wide transition-colors uppercase py-2">
                        Partner With Flyout
                      </span>
                    </Link>
                  </motion.div>

                  {/* Points Link */}
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 320, damping: 16 }}
                  >
                    <Link to="/credit" className="flex items-center gap-2 group">
                      <Coins className="h-4 w-4 text-[#B88E2F] transition-transform" />
                      <span className="text-[12.5px] font-bold text-[#0A1F44] group-hover:text-[#B88E2F] tracking-wide transition-colors uppercase">
                        Flyout CREDITS
                      </span>
                    </Link>
                  </motion.div>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <Button variant="ghost" size="icon" className="rounded-full w-11 h-11 hover:bg-[#0A1F44]/5 hover:shadow-[0_6px_18px_rgba(10,31,68,0.15)] transition-all duration-300">
                    <BellRing className="h-5 w-5 text-[#1A2B47]" />
                  </Button>

                  <Button variant="ghost" size="icon" className="relative rounded-full w-11 h-11 hover:bg-[#0A1F44]/5 hover:shadow-[0_6px_18px_rgba(10,31,68,0.15)] transition-all duration-300" asChild>
                    <Link to="/cart">
                      <Package className="h-5 w-5 text-[#1A2B47]" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#B88E2F] text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                          {totalItems > 99 ? "99+" : totalItems}
                        </span>
                      )}
                    </Link>
                  </Button>

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center outline-none">
                        <div className="relative group">

                          {/* OUTER BORDER RING */}
                          <div className="absolute -inset-[3px] rounded-full 
                  bg-gradient-to-tr from-[#B88E2F] via-[#f5d27a] to-[#1A2B47]
                  opacity-90"></div>

                          {/* SOFT GLOW */}
                          <div className="absolute -inset-[1px] rounded-full 
                  bg-gradient-to-tr from-[#B88E2F]/50 to-[#1A2B47]/40 
                  blur-sm opacity-50 group-hover:opacity-80 transition-all duration-500"></div>

                          {/* AVATAR CONTAINER */}
                          <div className="relative w-12 h-12 rounded-full overflow-hidden 
                  bg-white/70 backdrop-blur-xl
                  border border-white/40
                  shadow-[0_10px_28px_rgba(10,31,68,0.30)]
                  group-hover:scale-105 transition-all duration-300">

                            <img
                              src="/new.png"
                              alt="Profile"
                              className="w-full h-full object-cover scale-[1.6]"
                            />
                          </div>

                        </div>


                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 bg-white border border-white/10 shadow-xl rounded-xl">
                      {user ? (
                        <>
                          <div className="px-3 py-2 border-b border-gray-100">
                            <p className="text-sm font-semibold text-[#1A2B47]">My Account</p>
                          </div>
                          <DropdownMenuItem asChild className="focus:bg-[#1A2B47]/5 focus:text-[#1A2B47] cursor-pointer">
                            <Link to="/dashboard" className="flex items-center gap-2 py-2">
                              <LayoutDashboard className="h-4 w-4" />
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={handleSignOut}
                            className="focus:bg-red-50 focus:text-red-600 text-red-500 cursor-pointer flex items-center gap-2 py-2"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem asChild className="focus:bg-[#1A2B47]/5 focus:text-[#1A2B47] cursor-pointer">
                            <Link to="/sign-in" className="py-2 font-medium">Sign In</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className="focus:bg-[#1A2B47]/5 focus:text-[#1A2B47] cursor-pointer">
                            <Link to="/sign-up" className="py-2 font-medium">Sign Up</Link>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Mobile Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden ml-auto text-[#1A2B47]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

            </div>
          </div>
        </div>

        {/* === BOTTOM BAR === */}
        <div className="relative bg-[#0A1F44] shadow-[0_12px_45px_rgba(0,0,0,0.35)] hidden lg:block">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5"></div>
          <div className="section-container">
            <div className="flex items-center justify-center gap-8 py-3 text-white relative">

              <MegaMenu
                triggerLabel="Categories"
                type="grid"
                columns={4}
                items={categories.map(cat => ({
                  title: cat.name,
                  href: cat.link || '#',
                  icon: cat.icon || Star,
                  image: cat.image_url
                }))}
              />

              <MegaMenu
                triggerLabel="Select Emirate"
                type="list"
                showDivider={false}
                items={[
                  { title: "Dubai", href: "/dubai", badge: "Popular", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/1.jpg" },
                  { title: "Abu Dhabi", href: "/abu-dhabi", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/2.jpg" },
                  { title: "Sharjah", href: "/sharjah", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/3.jpg" },
                  { title: "Ras Al Khaimah", href: "/ras-al-khaimah", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/4.jpg" },
                  { title: "Ajman", href: "/ajman", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                ]}
              />

              <MegaMenu
                triggerLabel="Experiences"
                type="list"
                items={[
                  { title: "Signature Experiences", href: "/experiences/signature", icon: Star, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                  { title: "Sunset & Nightlife", href: "/experiences/sunset", icon: Moon, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                  { title: "Desert & Adventure", href: "/dubai/desert-safari", icon: Compass, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                  { title: "Luxury & Yacht", href: "/dubai/yacht", icon: Ship, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                  { title: "Thrill & Theme Parks", href: "/dubai/theme-parks", icon: Zap, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                  { title: "Dining & Cruises", href: "/dubai/dinner-cruise", icon: Utensils, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                ]}
              />

              <MegaMenu
                triggerLabel="Luxury"
                type="list"
                items={[
                  { title: "Yacht Experiences", href: "/dubai/yacht", icon: Ship, badge: "Exclusive", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                  { title: "Private Tours", href: "/dubai/city-tours", icon: User, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                  { title: "Helicopter Rides", href: "/dubai/sky-adventures", icon: Plane, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                  { title: "VIP Theme Parks", href: "/dubai/theme-parks", icon: Star, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                  { title: "Supercar Drives", href: "/dubai/supercars", icon: Car, image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Emirates/5.avif" },
                ]}
              />

              <Link to="/staycations" className="text-sm font-medium text-white/90 hover:text-[#B88E2F] transition-colors relative group py-2">
                Staycations
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B88E2F] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link to="/blogs" className="text-sm font-medium text-white/90 hover:text-[#B88E2F] transition-colors relative group py-2">
                Journal
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B88E2F] transition-all duration-300 group-hover:w-full"></span>
              </Link>

            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-t border-border overflow-scroll max-h-[90vh]"
            >
              <div className="section-container py-4 space-y-2">
                {/* Mobile Search - Reusing the autocomplete for mobile logic, or can switch to the new search if preferred, but usually Autocomplete is better for mobile details */}
                <div className="mb-4">
                  <SearchAutocomplete onClose={() => setIsMobileMenuOpen(false)} />
                </div>

                <div className="flex flex-col gap-2">
                  <Link to="/" className="px-4 py-3 bg-gray-50 rounded-lg text-sm font-medium">Home</Link>
                </div>

                {/* Mobile Destinations */}
                <div className="border-t border-border pt-4 mt-2">
                  <p className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">Destinations</p>
                  <div className="grid grid-cols-2 gap-2 px-2">
                    {destinationsCategories.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg active:scale-95 transition-transform"
                      >
                        <item.icon className="h-4 w-4 text-[#B88E2F]" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Quick Links */}
                <div className="border-t border-border pt-4 mt-2 px-4 space-y-2">
                  <Link to="/sell" className="flex items-center gap-3 py-2 text-sm font-medium">
                    <Store className="h-4 w-4 text-[#B88E2F]" />
                    Partner With Flyout
                  </Link>
                  <Link to="/credit" className="flex items-center gap-3 py-2 text-sm font-medium">
                    <Coins className="h-4 w-4 text-[#B88E2F]" />
                    Flyout Points
                  </Link>
                  <Link to="/staycations" className="flex items-center gap-3 py-2 text-sm font-medium">
                    <Palmtree className="h-4 w-4 text-[#B88E2F]" />
                    Staycations
                  </Link>
                </div>


                {/* Mobile Auth */}
                <div className="border-t border-border pt-6 mt-4 space-y-3 px-4">
                  {user ? (
                    <>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/dashboard">
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/sign-in">Sign In</Link>
                      </Button>
                      <Button className="w-full bg-[#1A2B47] text-white" asChild>
                        <Link to="/sign-up">Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed navbar and slight offset for cleaner transition */}
      <div className="h-[145px] lg:h-[172px]" />
    </>
  );
}
