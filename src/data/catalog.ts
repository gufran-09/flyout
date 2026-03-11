// src/data/products.ts

export type DurationOption = {
    label: string;
    minutes: number;
    price: number;
    originalPrice?: number;
    discountPercent?: number; // Optional, can be calculated
};

export type Product = {
    id: string;
    slug: string;
    title: string;
    subtitle: string;

    category: string;
    destination: string;
    location: string;

    rating: number;
    reviewCount: number;

    // Pricing moved to durationOptions
    durationOptions: DurationOption[];

    // ADD NEW IMAGE URLS HERE in this array
    images: string[];

    // Marketing badges only (Best Seller, Popular, Premium)
    badges: string[];

    overview: string;
    highlights: string[];
    whatToBring: string[];
    facilities: string[];
    cancellationPolicy: string;

    // Booking rules
    confirmationHours: number;
    mobileTicket: boolean;
    refundable: boolean; // false if conditions apply
    maxPeople?: number;
    Supplier_Code: string;
};

export const PRODUCTS: Product[] = [
    /* ---------------------------------------------------
       JUMEIRAH LUXURY JET SKI
    --------------------------------------------------- */
    {
        id: "jet-ski-jumeirah",
        Supplier_Code: "DOJOIN",
        slug: "jumeirah-luxury-jet-ski",
        title: "Jumeirah Luxury Jet Ski",
        subtitle: "Experience the thrill of the sea with premium jet skis",

        category: "water-sports",
        destination: "dubai",
        location: "Jumeirah, Dubai",

        rating: 4.8,
        reviewCount: 1500,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 225, originalPrice: 250, discountPercent: 10 },
            { label: "1 Hour", minutes: 60, price: 450, originalPrice: 480, discountPercent: 7 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski/jetski-1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski/jetski-2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski/jetski-3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski/jetski-4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski/jetski-5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski/jetski-6.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski/jetski-7.webp",
        ],

        badges: ["Best Seller"],

        overview:
            "Get ready for an adrenaline-pumping experience as you ride the waves on our top-of-the-line jet skis. Enjoy stunning views of the Dubai skyline, including the Burj Al Arab and Palm Jumeirah.",

        highlights: [
            "Ride the latest model Yamaha Jet Skis",
            "Stunning views of Burj Al Arab & Palm Jumeirah",
            "Professional instructors & safety briefing",
            "Free photos & videos of your ride",
        ],

        whatToBring: [
            "Passport or Emirates ID",
            "Swimwear",
            "Towel",
            "Sunscreen",
        ],

        facilities: [
            "Changing Rooms",
            "Showers",
            "Free Parking",
            "Lockers",
            "Refreshments",
        ],

        cancellationPolicy:
            "Cancel up to 24 hours in advance for a full refund. No-shows will be charged fully.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: false,
        maxPeople: 2,
    },
    {
        id: "banana-boat-dubai",
        Supplier_Code: "DOJOIN",
        slug: "banana-boat-ride-dubai",
        title: "Banana Boat Ride",
        subtitle: "Fun-filled group water ride with thrilling speed",

        category: "water-sports",
        destination: "dubai",
        location: "Dubai Marina",

        rating: 4.6,
        reviewCount: 980,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 300, originalPrice: 350, discountPercent: 14 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/banana-boat/banana-boat-1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/banana-boat/banana-boat-2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/banana-boat/banana-boat-3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/banana-boat/banana-boat-4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/banana-boat/banana-boat-5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/banana-boat/banana-boat-6.webp",
        ],

        badges: ["Family Friendly"],

        overview:
            "Enjoy a fun-filled banana boat ride over the Arabian Sea as you are pulled at thrilling speeds by a speedboat. Perfect for families, friends, and group adventures.",

        highlights: [
            "Group ride for up to 6 people",
            "High-speed adventure over waves",
            "Professional safety briefing",
            "Life jackets provided",
        ],

        whatToBring: ["Swimwear", "Towel", "Sunscreen"],

        facilities: ["Changing Rooms", "Lockers", "Free Parking"],

        cancellationPolicy:
            "Cancel up to 24 hours in advance for a full refund.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: false,
        maxPeople: 6,
    },

    {
        id: "flyboard-dubai",
        Supplier_Code: "DOJOIN",
        slug: "flyboard-experience-dubai",
        title: "Flyboard Experience",
        subtitle: "Fly above the sea using high-powered water jets",

        category: "water-sports",
        destination: "dubai",
        location: "JBR Beach",

        rating: 4.7,
        reviewCount: 640,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 330, originalPrice: 350, discountPercent: 6 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard/flyboard-1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard/flyboard-2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard/flyboard-3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard/flyboard-4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard/flyboard-5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard/flyboard-6.webp",
        ],

        badges: ["Thrilling"],

        overview:
            "Experience the thrill of flying above water using powerful jet propulsion. Learn to hover, dive, and perform tricks under expert supervision.",

        highlights: [
            "Fly up to 10 meters above water",
            "Professional instructor guidance",
            "Safety gear included",
            "Photo & video assistance available",
        ],

        whatToBring: ["Swimwear", "Towel", "Extra clothes"],

        facilities: ["Changing Rooms", "Showers", "Lockers"],

        cancellationPolicy:
            "Cancel at least 24 hours prior for a full refund.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: false,
    },

    {
        id: "jet-car-dubai",
        Supplier_Code: "DOJOIN",
        slug: "jet-car-experience-dubai",
        title: "Jet Car Experience ",
        subtitle: "Luxury supercar-style water adventure",

        category: "water-sports",
        destination: "dubai",
        location: "Dubai Harbor",

        rating: 4.9,
        reviewCount: 420,

        durationOptions: [
            { label: "20 Minutes", minutes: 20, price: 499, originalPrice: 550, discountPercent: 6 },
            { label: "30 Minutes", minutes: 30, price: 599, originalPrice: 650, discountPercent: 6 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-car/Jet%20Car-1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-car/Jet%20Car-2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-car/Jet%20Car-4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-car/Jet%20Car-5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-car/Jet%20Car-6.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-car/Jet%20Car-8.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-car/Jet%20Car-9.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-car/Jet%20Car-10.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-car/Jet%20Car-11.webp",
        ],

        badges: ["Luxury"],

        overview:
            "Drive a luxury supercar-shaped watercraft on the sea while enjoying stunning views of Dubai’s skyline. A perfect blend of speed, style, and comfort.",

        highlights: [
            "Luxury sports car design",
            "Easy-to-drive water vehicle",
            "Perfect for photos & couples",
            "Scenic skyline views",
        ],

        whatToBring: ["Passport or Emirates ID", "Sunglasses", "Sunscreen"],

        facilities: ["Valet Parking", "Lounge Access", "Changing Rooms"],

        cancellationPolicy:
            "Non-refundable once booked.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: false,
    },
    {
        id: "speed-boat-dubai",
        Supplier_Code: "DOJOIN",
        slug: "speed-boat-tour-dubai",
        title: "Speed Boat Tour ",
        subtitle: "High-speed sightseeing on the Arabian Sea",

        category: "water-sports",
        destination: "dubai",
        location: "Dubai Marina",

        rating: 4.6,
        reviewCount: 690,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 300, originalPrice: 330, discountPercent: 6 },
            { label: "1 Hour", minutes: 60, price: 400, originalPrice: 450, discountPercent: 6 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/Red%20JetBoat-1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/Red%20JetBoat-2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/Red%20JetBoat-3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/Red%20JetBoat-4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/Red%20JetBoat-5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/Red%20JetBoat-6.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/Red%20JetBoat-7.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/Red%20JetBoat-8.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/speedboat-1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/speedboat-2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/speedboat-3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/speedboat-4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/speedboat-5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/speed-boat/speedboat-6.webp",

        ],

        badges: ["Sightseeing"],

        overview:
            "Take a high-speed sightseeing tour while cruising past Dubai’s iconic landmarks on water.",

        highlights: [
            "High-speed coastal cruise",
            "Photo stops included",
            "Group & private options",
            "Safety equipment provided",
        ],

        whatToBring: ["Sunglasses", "Light jacket", "Sunscreen"],

        facilities: ["Seating Area", "Safety Gear", "Parking"],

        cancellationPolicy:
            "Cancel 24 hours in advance for a full refund.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: false,
        maxPeople: 5,
    },
    {
        id: "wakeboard-dubai",
        Supplier_Code: "DOJOIN",
        slug: "wakeboard-experience-dubai",
        title: "Wakeboard Experience",
        subtitle: "Surf, ski, and ride the waves with professional guidance",

        category: "water-sports",
        destination: "dubai",
        location: "Dubai Marina",

        rating: 4.6,
        reviewCount: 540,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 280, originalPrice: 350, discountPercent: 6 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard/wakeboard-1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard/wakeboard-2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard/wakeboard-3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard/wakeboard-4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard/wakeboard-5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard/wakeboard-6.webp",
        ],

        badges: ["Sporty"],

        overview:
            "Wakeboarding combines surfing, snowboarding, and water skiing for an exciting water sport adventure.",

        highlights: [
            "Beginner-friendly instructions",
            "High-quality wakeboard equipment",
            "Safe & supervised activity",
            "Skill progression possible",
        ],

        whatToBring: ["Swimwear", "Towel", "Water shoes (optional)"],

        facilities: ["Changing Rooms", "Lockers", "Showers"],

        cancellationPolicy:
            "Free cancellation up to 24 hours before the session.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: false,
    },

    /* ---------------------------------------------------
       DONUT BOAT RIDE
    --------------------------------------------------- */
    {
        id: "donut-boat-dubai",
        Supplier_Code: "DOJOIN",
        slug: "donut-boat-ride-dubai",
        title: "Donut Boat Ride ",
        subtitle: "Fun-filled water activity for friends and family",

        category: "water-sports",
        destination: "dubai",
        location: "Dubai Marina",

        rating: 4.6,
        reviewCount: 350,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 300, originalPrice: 350, discountPercent: 14 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/donut-boat/dount-boat-1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/donut-boat/dount-boat-2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/donut-boat/dount-boat-3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/donut-boat/dount-boat-4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/donut-boat/dount-boat-5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/donut-boat/dount-boat-6.webp",
        ],

        badges: ["Group Fun"],

        overview:
            "Hold on tight as you glide across the water on an inflatable donut-shaped tube being pulled by a high-speed boat. A thrilling experience perfect for groups!",

        highlights: [
            "Thrilling tube ride",
            "Safe for children & adults",
            "Life jackets provided",
            "Professional crew",
        ],

        whatToBring: ["Swimwear", "Towel", "Sunscreen"],

        facilities: ["Changing Rooms", "Lockers", "Showers"],

        cancellationPolicy:
            "Cancel up to 24 hours in advance for a full refund.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: true,
        maxPeople: 4,
    },

    /* ---------------------------------------------------
       PARASAILING ADVENTURE
    --------------------------------------------------- */
    {
        id: "parasailing-dubai",
        Supplier_Code: "DOJOIN",
        slug: "parasailing-adventure-dubai",
        title: "Parasailing Adventure",
        subtitle: "Soar high above the JBR beach and enjoy panoramic views",

        category: "water-sports",
        destination: "dubai",
        location: "JBR Beach",

        rating: 4.7,
        reviewCount: 890,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 250, originalPrice: 280, discountPercent: 10 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing/parasailing-1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing/parasailing-2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing/parasailing-3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing/parasailing-4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing/parasailing-5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing/parasailing-6.webp",
        ],

        badges: ["Sky High"],

        overview:
            "Experience the thrill of flying 150 meters above the Arabian Gulf while being towed by a boat. Enjoy breathtaking views of JBR, Dubai Marina, and Palm Jumeirah.",

        highlights: [
            "Fly up to 150m high",
            "Single, double, or triple flights",
            "Take off & land on the boat",
            "Spectacular aerial views",
        ],

        whatToBring: ["Passport or Emirates ID", "Comfortable Clothes", "Sunscreen"],

        facilities: ["Lockers", "Safety Gear", "Changing Rooms"],

        cancellationPolicy:
            "Cancel up to 24 hours in advance for a full refund.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: true,
    },
    {
        id: "parasailing-nemo-dubai",
        Supplier_Code: "NEMST",
        slug: "parasailing-dubai-nemo",
        title: "Parasailing Adventure",
        subtitle: "Soar 40–50 meters above the Arabian Gulf",

        category: "water-sports",
        destination: "dubai",
        location: "Umm Suqeim 2, Jumeirah Road",

        rating: 4.8,
        reviewCount: 0,

        durationOptions: [
            { label: "15 Minutes", minutes: 15, price: 380, originalPrice: 400, discountPercent: 5 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing11.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing22.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing5.webp",
        ],

        badges: ["Sky Adventure"],

        overview:
            "Enjoy breathtaking aerial views of Dubai while parasailing high above the Arabian Gulf. Supervised by fully trained captain and instructor for maximum safety.",

        highlights: [
            "Fly 40–50 meters above water",
            "150m rope length",
            "Professional captain & instructor",
            "Locker & changing room facilities",
        ],

        whatToBring: [
            "Original Emirates ID or Passport",
            "Comfortable clothes",
            "Sunscreen",
        ],

        facilities: [
            "Lockers",
            "Changing Rooms",
            "Instructor",
            "Life Jackets",
        ],

        cancellationPolicy:
            "Cancel 24 hours before activity for full refund. Late cancellations and no-shows are non-refundable.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: true,
        maxPeople: 2,
    },
    {
        id: "parasailing-nemo-dubai",
        Supplier_Code: "NEMST",
        slug: "parasailing-dubai-nemo",
        title: "Parasailing Adventure",
        subtitle: "Soar 40–50 meters above the Arabian Gulf",

        category: "water-sports",
        destination: "dubai",
        location: "Umm Suqeim 2, Jumeirah Road",

        rating: 4.8,
        reviewCount: 150,

        durationOptions: [
            { label: "15 Minutes", minutes: 15, price: 650, originalPrice: 700, discountPercent: 5 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing11.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing22.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/parasailing2/parasailing5.webp",
        ],

        badges: ["Sky Adventure"],

        overview:
            "Enjoy breathtaking aerial views of Dubai while parasailing high above the Arabian Gulf. Supervised by fully trained captain and instructor for maximum safety.",

        highlights: [
            "Fly 40–50 meters above water",
            "150m rope length",
            "Professional captain & instructor",
            "Locker & changing room facilities",
        ],

        whatToBring: [
            "Original Emirates ID or Passport",
            "Comfortable clothes",
            "Sunscreen",
        ],

        facilities: [
            "Lockers",
            "Changing Rooms",
            "Instructor",
            "Life Jackets",
        ],

        cancellationPolicy:
            "Cancel 24 hours before activity for full refund. Late cancellations and no-shows are non-refundable.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: true,
    },
    {
        id: "jet-ski-30-nemo",
        Supplier_Code: "NEMST",
        slug: "30-min-jet-ski-burj-al-arab-nemo",
        title: "Jet Ski Tour - Burj Al Arab",
        subtitle: "Guided tour to Dubai’s iconic 7-star hotel",

        category: "water-sports",
        destination: "dubai",
        location: "Umm Suqeim 2, Jumeirah Road",

        rating: 4.9,
        reviewCount: 0,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 280, originalPrice: 300, discountPercent: 7 },
            { label: "60 Minutes", minutes: 60, price: 450, originalPrice: 500, discountPercent: 10 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski2/jet-ski1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski2/jet-ski2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski2/jet-ski3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski2/jet-ski4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski2/jet-ski5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski2/jet-ski6.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski2/jet-ski7.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski2/jet-ski8.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/jet-ski2/jet-ski9.webp",
        ],

        badges: ["Guided Tour"],

        overview:
            "Ride your jet ski from the marina to the iconic Burj Al Arab with a professional instructor guiding the group. Includes photo opportunities at the landmark.",

        highlights: [
            "Burj Al Arab photo stop",
            "Guided group tour",
            "Up to 2 riders per jet ski",
            "Complimentary photos & videos",
        ],

        whatToBring: [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel",
        ],

        facilities: [
            "Changing Rooms",
            "Lockers",
            "Life Jackets",
            "Instructor",
        ],

        cancellationPolicy:
            "Cancel 24 hours before activity for full refund. Late cancellations and no-shows are non-refundable.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: true,
        maxPeople: 2,
    },
    {
        id: "tubing-nemo-dubai",
        Supplier_Code: "NEMST",
        slug: "tubing-dubai-nemo",
        title: "Tubing Experience ",
        subtitle: "High-speed inflatable sofa ride on the sea",

        category: "water-sports",
        destination: "dubai",
        location: "Umm Suqeim 2, Jumeirah Road",

        rating: 4.7,
        reviewCount: 0,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 550, originalPrice: 600, discountPercent: 8 },
        ],

        images: ["https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Tubing/Tubing.webp"],

        badges: ["Group Fun"],

        overview:
            "Ride a sofa-shaped inflatable tube pulled by a high-speed boat while enjoying the scenic Dubai coastline in an exciting way.",

        highlights: [
            "Up to 4 people per tube",
            "Private session only",
            "High-speed thrill ride",
            "Instructor supervised",
        ],

        whatToBring: [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel",
        ],

        facilities: [
            "Changing Rooms",
            "Lockers",
            "Instructor",
            "Life Jackets",
        ],

        cancellationPolicy:
            "Cancel 24 hours before activity for full refund.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: true,
        maxPeople: 4,
    },
    {
        id: "wakeboard-nemo-dubai",
        Supplier_Code: "NEMST",
        slug: "wakeboard-dubai-nemo",
        title: "Wakeboard Experience ",
        subtitle: "Extreme water sport near Burj Al Arab",

        category: "water-sports",
        destination: "dubai",
        location: "Umm Suqeim 2, Jumeirah Road",

        rating: 4.7,
        reviewCount: 0,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 500, originalPrice: 550, discountPercent: 9 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard2/wakeboard1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard2/wakeboard2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard2/wakeboard3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard2/wakeboard4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard2/wakeboard5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard2/wakeboard6.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/wakeboard2/wakeboard7.webp",
        ],

        badges: ["Extreme Sport"],

        overview:
            "Ride behind a speedboat at 50 km/h and experience the thrill of wakeboarding near Burj Al Arab. Suitable for beginners and experienced riders.",

        highlights: [
            "50 KM/H towing speed",
            "Beginner-friendly",
            "Instructor supervised",
            "Photo opportunities",
        ],

        whatToBring: [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel",
        ],

        facilities: [
            "Changing Rooms",
            "Lockers",
            "Instructor",
            "Life Jackets",
        ],

        cancellationPolicy:
            "Cancel 24 hours before activity for full refund.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: true,
    },
    {
        id: "flyboard-nemo-dubai",
        Supplier_Code: "NEMST",
        slug: "flyboard-dubai-nemo",
        title: "Flyboard ",
        subtitle: "Adrenaline-packed hover experience over water",

        category: "water-sports",
        destination: "dubai",
        location: "Umm Suqeim 2, Jumeirah Road",

        rating: 4.8,
        reviewCount: 0,

        durationOptions: [
            { label: "30 Minutes", minutes: 30, price: 320, originalPrice: 350, discountPercent: 8 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard2/FlyBoard2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard2/FlyBoard3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard2/FlyBoard5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard2/FlyBoard6.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard2/FlyBoard7.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/flyboard2/FlyBoard8.webp",
        ],

        badges: ["Adrenaline"],

        overview:
            "Experience flyboarding 50 meters from the beach with professional instruction. Hover, dive, and enjoy a thrilling water-powered adventure.",

        highlights: [
            "Beginner-friendly",
            "Minimum weight 45kg",
            "Instructor supervised",
            "Photo opportunities",
        ],

        whatToBring: [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel",
        ],

        facilities: [
            "Changing Rooms",
            "Lockers",
            "Instructor",
            "Life Jackets",
        ],

        cancellationPolicy:
            "Cancel 24 hours before activity for full refund.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: true,
    },
    {
        id: "seabob-dubai-dojoin",
        Supplier_Code: "DOJOIN",
        slug: "renting-seabob-dubai",
        title: "Renting SeaBob In Dubai",
        subtitle: "Rent and get it delivered to your location",

        category: "water-sports",
        destination: "dubai",
        location: "Al Nahda Park, Dubai",

        rating: 5.0,
        reviewCount: 1,

        durationOptions: [
            { label: "1 Hour", minutes: 60, price: 500, originalPrice: 600, discountPercent: 17 },
        ],

        images: [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Renting%20SeaBob/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Renting%20SeaBob/2.jpeg",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Renting%20SeaBob/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Renting%20SeaBob/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Renting%20SeaBob/5.webp",
        ],

        badges: ["Luxury"],

        overview:
            "If you want to have the ultimate water sports, now DoJoin is renting SeaBob in Dubai for one hour. Wherever you want to experience a great sea activity and see the underwater world, just make a phone call, and the DoJoin team will deliver SeaBob to you. Along with our Seabob, you can have a safety life jacket. You should order your rental Seabob at least 12 hours before delivery, but in emergencies, we also accept last-minute orders.",

        highlights: [
            "A thrilling underwater and surface riding experience",
            "Perfect for explorers, adventure lovers, and anyone curious about the sea.",
            "Cruise on the surface or dive below with full control of your SeaBob unit, ideal for both beginners and experienced riders.",
            "Enjoy a 1-hour rental with delivery directly to your location without any need to transportation",
            "Your rental includes safety gear (life jackets) for a secure and comfortable ride.",
        ],

        whatToBring: [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel",
        ],

        facilities: [
            "Life Jacket",
            "Delivery Service",
        ],

        cancellationPolicy:
            "Cancel 24 hours before activity for full refund.",

        confirmationHours: 24,
        mobileTicket: true,
        refundable: true,
    },
    {
        "id": "deep-dive-dubai-sunken-city-walk",
        "Supplier_Code": "DOJOIN",
        "slug": "deep-dive-dubai-sunken-city-walk-experience",
        "title": "Deep Dive Dubai Sunken City Walk Experience",
        "subtitle": "Underwater walking adventure in the world’s deepest pool",

        "category": "water-sports",
        "destination": "dubai",
        "location": "Deep Dive Dubai, Nad Al Sheba",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "Standard Experience",
                "minutes": 30,
                "price": 600,
                "originalPrice": 600,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Sunken%20City%20Walk/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Sunken%20City%20Walk/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Sunken%20City%20Walk/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Sunken%20City%20Walk/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Sunken%20City%20Walk/5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Sunken%20City%20Walk/6.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Sunken%20City%20Walk/7.webp",
        ],

        "badges": ["Luxury"],

        "overview": "The Sunken City Walk at Deep Dive Dubai is a fun and easy way to experience the magic of being underwater — no swimming skills or certification required. In just 30 minutes, you'll gear up and step onto a balcony-style platform 4 meters below the surface, where expert guides will help you explore a unique underwater world. Whether you're taking in the views, posing with a vintage motorcycle, flipping a parking meter, or sitting at a coffee table, this immersive experience offers unforgettable moments beneath the surface.",

        "highlights": [
            "No swimming skills required",
            "Guided underwater walk",
            "Explore the sunken city",
            "Unique underwater photo opportunities"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Comfortable swimwear",
            "Towel"
        ],

        "facilities": [
            "Professional Instructor",
            "Safety Equipment",
            "Changing Rooms",
            "Lockers"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 0,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "palm-jumeirah-splish-splash-inflatable-park",
        "Supplier_Code": "DOJOIN",
        "slug": "palm-jumeirah-splish-splash-inflatable-park",
        "title": "Palm Jumeirah Splish Splash Inflatable Park",
        "subtitle": "Fun-filled floating water park adventure for all ages",

        "category": "water-sports",
        "destination": "dubai",
        "location": "Palm Jumeirah, Dubai",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "Standard Entry",
                "minutes": 60,
                "price": 150,
                "originalPrice": 150,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Splish%20Splash%20Inflatable%20Park/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Splish%20Splash%20Inflatable%20Park/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Splish%20Splash%20Inflatable%20Park/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Splish%20Splash%20Inflatable%20Park/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Splish%20Splash%20Inflatable%20Park/5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Splish%20Splash%20Inflatable%20Park/6.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "Seawake Water Sports Inflatable Park is more than just a water attraction; it's a paradise where memories are made. Laughter is shared, and the allure of the ocean's depths is brought to life. Come join us and experience the magic of this aquatic haven, where every moment is an opportunity to create cherished memories and embark on an aquatic adventure like no other. Dive in, let your cares float away, and make a splash at Seawake Water Sports Inflatable Park.",

        "highlights": [
            "Exciting inflatable water park",
            "Family-friendly activity",
            "Perfect for groups and kids",
            "Safe and supervised environment"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel"
        ],

        "facilities": [
            "Life Jackets",
            "Safety Staff",
            "Changing Rooms",
            "Lockers"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "palm-jumeirah-flyfish-ride",
        "Supplier_Code": "DOJOIN",
        "slug": "palm-jumeirah-flyfish-ride",
        "title": "Palm Jumeirah Flyfish Ride",
        "subtitle": "Seawake Water Sports",

        "category": "water-sports",
        "destination": "dubai",
        "location": "Palm Jumeirah, Dubai",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "Standard Ride",
                "minutes": 15,
                "price": 200,
                "originalPrice": 200,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Flyfish%20Ride/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Flyfish%20Ride/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Flyfish%20Ride/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Flyfish%20Ride/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Flyfish%20Ride/5.webp",
        ],

        "badges": [
            "Luxury"
        ],

        "overview": "Get ready for an exhilarating adventure like no other as you hop on board the thrilling Flyfish! It's not just a water sled; it's an aerial inflatable water sled that's towed by a powerful boat. As you hold on tight, you'll experience the rush of high speeds that the Flyfish can achieve, and here's the twist: these incredible speeds cause this wide watercraft to literally take flight!",

        "highlights": [
            "High-speed inflatable ride",
            "Towed by powerful speedboat",
            "Adrenaline-filled water activity",
            "Perfect for thrill seekers"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel"
        ],

        "facilities": [
            "Life Jackets",
            "Professional Staff",
            "Safety Briefing"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "fujairah-snorkeling-adventure",
        "Supplier_Code": "DOJOIN",
        "slug": "fujairah-snorkeling-adventure",
        "title": "Fujairah Snorkeling Adventure",
        "subtitle": "Seawake Water Sports",

        "category": "water-sports",
        "destination": "fujairah",
        "location": "Snoopy Island, Fujairah",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "Standard Experience",
                "minutes": 120,
                "price": 350,
                "originalPrice": 350,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Snorkeling%20Experience/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Snorkeling%20Experience/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Snorkeling%20Experience/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Snorkeling%20Experience/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Snorkeling%20Experience/5.webp",
        ],

        "badges": [
            "Luxury"
        ],

        "overview": "Fujairah is one of the parts of the UAE that still needs to be correctly discovered by many tourists. The underwater world of Fujairah is so pristine that many tourists consider it one of the best areas for snorkeling. Now we at Dojoin have decided to provide conditions in cooperation with Sea Wake entertainment company so that you can experience snorkeling in the best way in the waters of Fujairah. Fujairah Snorkeling Adventure gives you the opportunity to swim and explore vibrant marine life in crystal-clear waters.",

        "highlights": [
            "Snorkel in pristine Fujairah waters",
            "Explore vibrant marine life",
            "Guided snorkeling experience",
            "Suitable for beginners"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel",
            "Sunscreen"
        ],

        "facilities": [
            "Snorkeling Gear",
            "Professional Guide",
            "Life Jackets",
            "Boat Support"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "cha-cha-boats-rental",
        "Supplier_Code": "DOJOIN",
        "slug": "cha-cha-boats-rental",
        "title": "Cha Cha Boats Rental",
        "subtitle": "Luxury modern gozzo boat experience in Dubai waters",

        "category": "water-adventures",
        "destination": "dubai",
        "location": "Dubai Creek, Dubai",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "1 Hour",
                "minutes": 60,
                "price": 400,
                "originalPrice": 459,
                "discountPercent": 13
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Cha%20Cha%20Boats%20Rental/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Cha%20Cha%20Boats%20Rental/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Cha%20Cha%20Boats%20Rental/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Cha%20Cha%20Boats%20Rental/4.webp",
        ],

        "badges": [
            "Luxury"
        ],

        "overview": "Explore Dubai's waterways in style aboard our modern gozzos, seamlessly blending cityscapes with cultural heritage. Indulge in leisure on water or step ashore for immersive experiences, all while enjoying the freedom and opulence our gozzos offer. Book now for a Dubai odyssey like no other! Ready to make a splash? Embrace the thrill of water adventure with Cha Cha Boats — where the sea meets unforgettable experiences! Book your voyage now and dive into luxury on the water.",

        "highlights": [
            "Luxury modern gozzo boat",
            "Scenic Dubai water cruise",
            "Private and comfortable ride",
            "Perfect for couples and groups"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Sunglasses",
            "Camera"
        ],

        "facilities": [
            "Professional Captain",
            "Comfortable Seating",
            "Safety Equipment",
            "Life Jackets"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "deep-dive-dubai-snorkeling-experience",
        "Supplier_Code": "DOJOIN",
        "slug": "deep-dive-dubai-snorkeling-experience",
        "title": "Deep Dive Dubai Snorkeling Experience",
        "subtitle": "Explore the world's deepest pool snorkeling adventure",

        "category": "water-sports",
        "destination": "dubai",
        "location": "Deep Dive Dubai, Nad Al Sheba",

        "rating": 5.0,
        "reviewCount": 2,

        "durationOptions": [
            {
                "label": "Standard Experience",
                "minutes": 60,
                "price": 400,
                "originalPrice": 400,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Deep%20Dive%20Dubai%20Snorkeling%20Experience/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Deep%20Dive%20Dubai%20Snorkeling%20Experience/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Deep%20Dive%20Dubai%20Snorkeling%20Experience/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Deep%20Dive%20Dubai%20Snorkeling%20Experience/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Deep%20Dive%20Dubai%20Snorkeling%20Experience/5.webp",
        ],

        "badges": [
            "Luxury"
        ],

        "overview": "An exciting new world of opportunities is accessible to thrill seekers at Deep Dive Dubai. Everyone can explore an underwater world full of adventure and wonder thanks to the world's deepest pool, which is 60 meters deep. Deep Dive Dubai's 1,500 square meter facility is situated in the Nad Al Sheba district of Dubai and offers the most cutting-edge equipment for filming, as well as an amazing 'sunken city' for divers to explore.",

        "highlights": [
            "Snorkel in the world's deepest pool",
            "Explore the unique sunken city",
            "State-of-the-art diving facility",
            "Suitable for beginners"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel"
        ],

        "facilities": [
            "Professional Instructor",
            "Snorkeling Gear",
            "Changing Rooms",
            "Lockers"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 0,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "jumeirah-3-jet-car-rentals",
        "Supplier_Code": "DOJOIN",
        "slug": "jumeirah-3-jet-car-rentals",
        "title": "Jumeirah 3 Jet Car Rentals",
        "subtitle": "Luxury jet car driving experience on Dubai waters",

        "category": "water-sports",
        "destination": "dubai",
        "location": "Jumeirah 3, Umm Suqeim Beach, Dubai",

        "rating": 4.5,
        "reviewCount": 2,

        "durationOptions": [
            {
                "label": "20 Minutes",
                "minutes": 20,
                "price": 499,
                "originalPrice": 499,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Jet%20Car%20Rentals/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Jet%20Car%20Rentals/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Jet%20Car%20Rentals/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Jet%20Car%20Rentals/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Jet%20Car%20Rentals/5.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "If you are looking for a memorable experience in Dubai, you may want to consider renting a jet car. With a jet car, you can explore the city in a way that is both thrilling and unique. Whether you want to drive alone or share the experience with friends or family, there are options available. One of the main advantages of renting a jet car in Dubai is that you can experience driving a luxury car on water for a truly unforgettable adventure.",

        "highlights": [
            "Drive a luxury jet car on water",
            "Unique high-speed water experience",
            "Perfect for thrill seekers",
            "Great for friends and families"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Sunglasses"
        ],

        "facilities": [
            "Life Jackets",
            "Safety Briefing",
            "Professional Staff"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "deep-dive-dubai-scuba-dive-experience",
        "Supplier_Code": "DOJOIN",
        "slug": "deep-dive-dubai-scuba-dive-experience",
        "title": "Deep Dive Dubai Scuba Dive Experience",
        "subtitle": "Diving inside the world's deepest pool",

        "category": "water-sports",
        "destination": "dubai",
        "location": "Deep Dive Dubai, Nad Al Sheba",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "Standard Experience",
                "minutes": 60,
                "price": 1800,
                "originalPrice": 1800,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Scuba%20Dive%20Experience/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Scuba%20Dive%20Experience/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Scuba%20Dive%20Experience/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Scuba%20Dive%20Experience/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Scuba%20Dive%20Experience/5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Scuba%20Dive%20Experience/6.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Scuba%20Dive%20Experience/7.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Scuba%20Dive%20Experience/8.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Scuba%20Dive%20Experience/9.webp",
        ],

        "badges": [
            "Instant Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "Deep Dive Dubai is the ultimate destination for adventure seekers ready to explore the world's deepest pool. Located within the NAS Sports Complex, this record-breaking facility invites you to dive into an incredible underwater experience. Whether you're a beginner or just curious, you'll be guided by professional instructors who will walk you through everything you need to know — no prior experience required.",

        "highlights": [
            "Dive in the world's deepest pool",
            "Explore the unique sunken city",
            "Professional instructor guidance",
            "Suitable for beginners"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel"
        ],

        "facilities": [
            "Professional Instructor",
            "Scuba Equipment",
            "Changing Rooms",
            "Lockers"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 0,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "marina-love-boats",
        "Supplier_Code": "DOJOIN",
        "slug": "marina-love-boats",
        "title": "Marina Love Boats",
        "subtitle": "Exciting Dubai Marina speed boat sightseeing experience",

        "category": "water-adventures",
        "destination": "dubai",
        "location": "Dubai Marina, Dubai",

        "rating": 4.8,
        "reviewCount": 8,

        "durationOptions": [
            {
                "label": "Standard Experience",
                "minutes": 60,
                "price": 99,
                "originalPrice": 150,
                "discountPercent": 34
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Marina%20Love%20Boats/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Marina%20Love%20Boats/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Marina%20Love%20Boats/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Marina%20Love%20Boats/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Marina%20Love%20Boats/5.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "This amazing journey, which starts from Dubai Marina, will provide a chance to see Palm Jumeirah, Atlantis, and Burj Al Arab. These boats may not be the most luxurious offers in the market; however, they will provide you with the opportunity to see all the best parts of the city. This company offers you four distinct ways to visit different parts of the city.",

        "highlights": [
            "Speed boat sightseeing tour",
            "Views of Palm Jumeirah and Atlantis",
            "See Burj Al Arab from the water",
            "Fun group boat experience"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Sunglasses",
            "Camera"
        ],

        "facilities": [
            "Professional Captain",
            "Life Jackets",
            "Safety Briefing",
            "Comfortable Seating"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "luxury-dibba-fujairah-yacht-escape",
        "Supplier_Code": "DOJOIN",
        "slug": "luxury-dibba-fujairah-yacht-escape",
        "title": "Luxury Dibba Fujairah Yacht Escape",
        "subtitle": "A premium 5-hour yacht experience filled with adventure, relaxation, and unforgettable coastal moments.",

        "category": "water-adventures",
        "destination": "fujairah",
        "location": "Dibba, Fujairah",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "5 Hours",
                "minutes": 300,
                "price": 169,
                "originalPrice": 169,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/6.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/7.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/8.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/9.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Luxury%20Dibba%20Fujeirah%20Yacht%20Escape/10.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "All great moments begin by the sea and this luxury yacht experience in Dibba, Fujairah is crafted to create memories that last a lifetime. Sail across breathtaking waters surrounded by rugged mountain views while enjoying top-tier hospitality, delicious cuisine, and a complete range of exciting water activities. Whether you're celebrating a birthday, gathering with friends, enjoying a corporate outing, or simply taking a day off, this premium yacht escape promises relaxation and adventure in equal measure.",

        "highlights": [
            "Premium 5-hour yacht cruise",
            "Scenic Dibba Fujairah coastline",
            "Water activities and swimming",
            "Ideal for groups and celebrations"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Sunscreen",
            "Towel"
        ],

        "facilities": [
            "Professional Crew",
            "Life Jackets",
            "Comfortable Seating",
            "Onboard Amenities"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "palm-jumeirah-stand-up-paddle",
        "Supplier_Code": "DOJOIN",
        "slug": "palm-jumeirah-stand-up-paddle",
        "title": "Palm Jumeirah Stand Up Paddle",
        "subtitle": "Hydro Water Sports",

        "category": "water-sports",
        "destination": "dubai",
        "location": "Palm Jumeirah, Dubai",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "Standard Experience",
                "minutes": 60,
                "price": 99,
                "originalPrice": 198,
                "discountPercent": 50
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Stand%20Up%20Paddle/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Stand%20Up%20Paddle/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Stand%20Up%20Paddle/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Stand%20Up%20Paddle/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Stand%20Up%20Paddle/5.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "Picture yourself gliding effortlessly across the glassy surface of pristine waters, the world around you painted in the soft hues of a rising sun or the gentle glow of a setting one. As you stand tall on your paddleboard, you become one with the tranquil rhythm of the water, feeling the gentle sway beneath your feet and basking in the serenity that only stand-up paddleboarding can offer. Our boards are your magic carpets to explore hidden coves and winding waterways.",

        "highlights": [
            "Relaxing stand-up paddle experience",
            "Scenic Palm Jumeirah waters",
            "Suitable for beginners",
            "Great solo or group activity"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Sunscreen",
            "Towel"
        ],

        "facilities": [
            "Paddle Board",
            "Life Jacket",
            "Safety Briefing",
            "Professional Staff"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "jbr-stand-up-paddle-board",
        "Supplier_Code": "DOJOIN",
        "slug": "jbr-stand-up-paddle-board",
        "title": "JBR Stand Up Paddle Board",
        "subtitle": "Stand-up paddleboarding experience at JBR Beach",

        "category": "water-sports",
        "destination": "dubai",
        "location": "JBR Beach, Dubai",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "60 Minutes",
                "minutes": 60,
                "price": 100,
                "originalPrice": 100,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/JBR%20Stand%20Up%20Paddle%20Board/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/JBR%20Stand%20Up%20Paddle%20Board/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/JBR%20Stand%20Up%20Paddle%20Board/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/JBR%20Stand%20Up%20Paddle%20Board/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/JBR%20Stand%20Up%20Paddle%20Board/5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/JBR%20Stand%20Up%20Paddle%20Board/6.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "Stand up paddle boarding (SUP) is the ultimate way to experience the beauty of the great outdoors while also getting an incredible full-body workout. Imagine gliding along the crystal-clear water with the wind in your hair, the sun on your skin, and the peaceful sound of water lapping against your board. Stand up paddle boarding is the perfect activity for anyone who loves adventure, relaxation, and the great outdoors.",

        "highlights": [
            "Full-body paddleboarding workout",
            "Scenic JBR Beach experience",
            "Suitable for beginners",
            "Relaxing water activity"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Sunscreen",
            "Towel"
        ],

        "facilities": [
            "Paddle Board",
            "Life Jacket",
            "Safety Briefing",
            "Professional Staff"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "dubai-harbour-signature-boat-tour",
        "Supplier_Code": "DOJOIN",
        "slug": "dubai-harbour-signature-boat-tour",
        "title": "Dubai Harbour Signature Boat Tour",
        "subtitle": "Self-drive inflatable boat adventure in Dubai waters",

        "category": "water-adventures",
        "destination": "dubai",
        "location": "Dubai Harbour, Dubai",

        "rating": 0,
        "reviewCount": 0,

        "durationOptions": [
            {
                "label": "Standard Tour",
                "minutes": 60,
                "price": 695,
                "originalPrice": 695,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Dubai%20Harbour%20Signature%20Boat%20Tour/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Dubai%20Harbour%20Signature%20Boat%20Tour/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Dubai%20Harbour%20Signature%20Boat%20Tour/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Dubai%20Harbour%20Signature%20Boat%20Tour/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Dubai%20Harbour%20Signature%20Boat%20Tour/5.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Dubai%20Harbour%20Signature%20Boat%20Tour/6.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "Have you ever imagined riding an inflatable boat with your loved ones? Undoubtedly, driving a boat on the blue shores of the Arabian Gulf is one of the entertainments that not only you but many tourists who have traveled to Dubai have not had such a special experience yet. Dubai Harbour Signature Boat Tour is a one-time opportunity where you can ride on inflatable boats without any guide and enjoy a unique new entertainer in Dubai.",

        "highlights": [
            "Self-drive inflatable boat experience",
            "Cruise along Dubai Harbour waters",
            "Perfect for couples and families",
            "Unique sightseeing adventure"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Sunglasses",
            "Camera"
        ],

        "facilities": [
            "Safety Briefing",
            "Life Jackets",
            "Professional Support Staff"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "escape-to-musandam",
        "Supplier_Code": "DOJOIN",
        "slug": "escape-to-musandam",
        "title": "Escape to Musandam",
        "subtitle": "Scenic Musandam coastal cruise and adventure experience",

        "category": "water-adventures",
        "destination": "musandam",
        "location": "Musandam, Oman",

        "rating": 4.6,
        "reviewCount": 105,

        "durationOptions": [
            {
                "label": "Standard Experience",
                "minutes": 600,
                "price": 195,
                "originalPrice": 195,
                "discountPercent": 0
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Escape%20to%20Musandam/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Escape%20to%20Musandam/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Escape%20to%20Musandam/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Escape%20to%20Musandam/4.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "All the parts around the Arabian Gulf are unique places to spend free time. But when we speak of Musandam, it is a piece of heaven where you can find all the interesting watery activities all at once. This heaven is placed inside the borders of Oman, and whoever wants to escape from crowded metropolises can choose it as an ideal place. Whether you want to experience the ski jet or see wild dolphins in the water, Musandam is what you are looking for.",

        "highlights": [
            "Scenic Musandam dhow cruise",
            "Crystal-clear waters and mountains",
            "Chance to spot dolphins",
            "Perfect day escape from the city"
        ],

        "whatToBring": [
            "Original Passport",
            "Swimwear",
            "Sunscreen",
            "Towel"
        ],

        "facilities": [
            "Traditional Dhow Boat",
            "Life Jackets",
            "Professional Crew",
            "Onboard Refreshments"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "palm-jumeirah-kayak-experience",
        "Supplier_Code": "DOJOIN",
        "slug": "palm-jumeirah-kayak-experience",
        "title": "Palm Jumeirah Kayak Experience",
        "subtitle": "Hydro Water Sports",

        "category": "water-sports",
        "destination": "dubai",
        "location": "Palm Jumeirah, Dubai",

        "rating": 5.0,
        "reviewCount": 2,

        "durationOptions": [
            {
                "label": "Standard Experience",
                "minutes": 60,
                "price": 99,
                "originalPrice": 198,
                "discountPercent": 50
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Kayak%20Experience/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Kayak%20Experience/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Kayak%20Experience/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Kayak%20Experience/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Palm%20Jumeirah%20Kayak%20Experience/5.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "Imagine the excitement of Olympic-style paddling, where a solo or duo of paddlers navigates the challenging river. Now, in Dubai, you can have a similar experience, but with a twist—it's not a competition; it's pure entertainment. Thanks to the inventive concept from Hydro Water Sports Corporation, you can paddle single or double kayaks on the Arabian Gulf and bask in the radiant sun. Picture yourself paddling around Palm Jumeirah with the stunning skyline as your backdrop.",

        "highlights": [
            "Single or double kayak options",
            "Scenic Palm Jumeirah views",
            "Beginner-friendly activity",
            "Great outdoor water workout"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Sunscreen",
            "Towel"
        ],

        "facilities": [
            "Kayak Equipment",
            "Life Jacket",
            "Safety Briefing",
            "Professional Staff"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "jumeirah-3-bermuda-scuba-diving",
        "Supplier_Code": "DOJOIN",
        "slug": "jumeirah-3-bermuda-scuba-diving",
        "title": "Jumeirah 3 Bermuda Scuba Diving",
        "subtitle": "Try Scuba Diving in Dubai",

        "category": "water-sports",
        "destination": "dubai",
        "location": "Jumeirah 3, Dubai",

        "rating": 4.7,
        "reviewCount": 6,

        "durationOptions": [
            {
                "label": "Standard Experience",
                "minutes": 60,
                "price": 284,
                "originalPrice": 356,
                "discountPercent": 20
            }
        ],

        "images": [
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Bermuda%20Scuba%20Diving/1.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Bermuda%20Scuba%20Diving/2.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Bermuda%20Scuba%20Diving/3.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Bermuda%20Scuba%20Diving/4.webp",
            "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/products/Water-Sports/Jumeirah%203%20Bermuda%20Scuba%20Diving/5.webp",
        ],

        "badges": [
            "24-Hour Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "Dubai is one of those places where visitors can enjoy all types of activities. While most inland entertainment is well-advertised, one specific place, Bermuda Diving Center, remains unknown, and it can allow you to see the city's underwater world. Bermuda Diving Center, established in 2017, is one of the rarest places to explore the deepest part of the Arabian Gulf and see its biodiversity. At Bermuda Diving Center, you may scuba dive and feed fish under professional supervision.",

        "highlights": [
            "Try scuba diving in Dubai waters",
            "Professional instructor guidance",
            "Explore Arabian Gulf marine life",
            "Suitable for beginners"
        ],

        "whatToBring": [
            "Original Emirates ID or Passport",
            "Swimwear",
            "Towel"
        ],

        "facilities": [
            "Scuba Equipment",
            "Professional Instructor",
            "Safety Briefing",
            "Changing Rooms"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 24,
        "mobileTicket": true,
        "refundable": false
    },
    {
        "id": "global-village-dubai",
        "Supplier_Code": "DOJOIN",
        "slug": "global-village-dubai",
        "title": "Global Village Dubai",
        "subtitle": "Season 30",

        "category": "attraction",
        "destination": "dubai",
        "location": "Global Village, Dubai",

        "rating": 4.7,
        "reviewCount": 1567,

        "durationOptions": [
            {
                "label": "General Admission",
                "minutes": 240,
                "price": 25,
                "originalPrice": 30,
                "discountPercent": 17
            }
        ],

        "images": [
            // Image URLs not visible in screenshot
        ],

        "badges": [
            "Instant Confirmation",
            "Mobile Tickets Accepted",
            "Non-refundable"
        ],

        "overview": "For many centuries, India has been nicknamed the center of all cultures; now Dubai claims the name Global Village. If you want to know about different cultures in the world, Global Village of Dubai is the right place for you. In this unique destination, you have the chance to become familiar with more than 90 different cultures. At Global Village, you can taste the cuisine of different countries, buy their handicrafts, and enjoy live music and shows.",

        "highlights": [
            "Explore pavilions from 90+ cultures",
            "International street food and cuisine",
            "Live performances and entertainment",
            "Family-friendly attraction"
        ],

        "whatToBring": [
            "Valid ID or Passport",
            "Comfortable walking shoes",
            "Camera"
        ],

        "facilities": [
            "Food Courts",
            "Shopping Pavilions",
            "Live Entertainment",
            "Parking"
        ],

        "cancellationPolicy": "Non-refundable.",

        "confirmationHours": 0,
        "mobileTicket": true,
        "refundable": false
    },
];


