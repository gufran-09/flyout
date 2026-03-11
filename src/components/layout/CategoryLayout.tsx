import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Star, Clock, ShoppingCart, SlidersHorizontal, X, Heart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tour } from "@/components/home/ExperienceSection";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CurrencySymbol } from "@/components/ui/CurrencySymbol";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { PremiumCard } from "@/components/ui/PremiumCard";

interface CategoryLayoutProps {
    title: string;
    subtitle: string;
    tours: Tour[];
    backgroundImage?: string;
    featuredSection?: React.ReactNode;
}

// TourCard logic moved to ProductCard component, but we need to map the Tour type to ProductCardProps inside the render loop
// However, the existing code defines TourCard component. Let's replace the TourCard usage in the main component.

export function CategoryLayout({ title, subtitle, tours, backgroundImage, featuredSection }: CategoryLayoutProps) {
    const [sortBy, setSortBy] = useState("popular");
    const [priceRange, setPriceRange] = useState([0, 3000]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

    // Filter and sort tours
    let filteredTours = [...tours];

    // Price filter
    filteredTours = filteredTours.filter(
        (tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1]
    );

    // Rating filter
    if (selectedRatings.length > 0) {
        filteredTours = filteredTours.filter((tour) =>
            selectedRatings.some((rating) => tour.rating >= rating)
        );
    }

    // Sort
    switch (sortBy) {
        case "price-low":
            filteredTours.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filteredTours.sort((a, b) => b.price - a.price);
            break;
        case "rating":
            filteredTours.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredTours.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    const toggleRating = (rating: number) => {
        setSelectedRatings((prev) =>
            prev.includes(rating)
                ? prev.filter((r) => r !== rating)
                : [...prev, rating]
        );
    };

    return (
        <Layout>
            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-primary/20 to-accent/20">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url('${backgroundImage || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80"}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="section-container relative h-full flex flex-col justify-end pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            {title}
                        </h1>
                        <p className="text-muted-foreground max-w-2xl">
                            {subtitle}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Featured Section */}
            {featuredSection && featuredSection}

            {/* Main Content */}
            <div className="section-container py-8">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <p className="text-muted-foreground">
                        Showing {filteredTours.length} experiences
                    </p>

                    <div className="flex items-center gap-3">
                        {/* Mobile Filter */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="sm:hidden">
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 space-y-6">
                                    {/* Price Range */}
                                    <div>
                                        <Label className="text-sm font-medium">Price Range (AED)</Label>
                                        <div className="mt-4 px-2">
                                            <Slider
                                                value={priceRange}
                                                onValueChange={setPriceRange}
                                                min={0}
                                                max={3000}
                                                step={50}
                                            />
                                            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                                <span>{priceRange[0]}</span>
                                                <span>{priceRange[1]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating Filter */}
                                    <div>
                                        <Label className="text-sm font-medium">Minimum Rating</Label>
                                        <div className="mt-3 space-y-2">
                                            {[4.5, 4.0, 3.5].map((rating) => (
                                                <div key={rating} className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={`rating-${rating}`}
                                                        checked={selectedRatings.includes(rating)}
                                                        onCheckedChange={() => toggleRating(rating)}
                                                    />
                                                    <label
                                                        htmlFor={`rating-${rating}`}
                                                        className="flex items-center gap-1 text-sm cursor-pointer"
                                                    >
                                                        <Star className="h-4 w-4 fill-gold text-gold" />
                                                        {rating}+
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="popular">Most Popular</SelectItem>
                                <SelectItem value="rating">Highest Rated</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden sm:block w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-card border border-border rounded-xl p-4">
                                <h3 className="font-semibold mb-4">Filters</h3>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <Label className="text-sm font-medium">Price Range (AED)</Label>
                                    <div className="mt-4 px-2">
                                        <Slider
                                            value={priceRange}
                                            onValueChange={setPriceRange}
                                            min={0}
                                            max={3000}
                                            step={50}
                                        />
                                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                            <span>{priceRange[0]}</span>
                                            <span>{priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating Filter */}
                                <div>
                                    <Label className="text-sm font-medium">Minimum Rating</Label>
                                    <div className="mt-3 space-y-2">
                                        {[4.5, 4.0, 3.5].map((rating) => (
                                            <div key={rating} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`desktop-rating-${rating}`}
                                                    checked={selectedRatings.includes(rating)}
                                                    onCheckedChange={() => toggleRating(rating)}
                                                />
                                                <label
                                                    htmlFor={`desktop-rating-${rating}`}
                                                    className="flex items-center gap-1 text-sm cursor-pointer"
                                                >
                                                    <Star className="h-4 w-4 fill-gold text-gold" />
                                                    {rating}+
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                {(selectedRatings.length > 0 || priceRange[0] > 0 || priceRange[1] < 3000) && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedRatings([]);
                                            setPriceRange([0, 3000]);
                                        }}
                                        className="w-full mt-4"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Clear Filters
                                    </Button>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Tours Grid */}
                    <div className="flex-1">
                        {filteredTours.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">
                                    No tours found matching your filters.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedRatings([]);
                                        setPriceRange([0, 3000]);
                                    }}
                                    className="mt-4"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTours.map((tour, index) => (
                                    <motion.div
                                        key={tour.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <PremiumCard
                                            id={tour.id}
                                            title={tour.name}
                                            image={tour.image}
                                            price={tour.price}
                                            originalPrice={tour.originalPrice}
                                            rating={tour.rating}
                                            subtitle={tour.duration} // Using duration as subtitle similar to CategoryPage
                                            location={tour.location}
                                            link={tour.link || `/tour/${tour.id}`}
                                            badge={tour.badge}
                                            category={tour.category}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
