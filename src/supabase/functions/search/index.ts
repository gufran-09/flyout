import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tour data - same structure as frontend
const allTours = [
  // Theme Parks
  { id: "tp-1", name: "IMG Worlds of Adventure", slug: "img-worlds-of-adventure", location: "Dubai", category: "Theme Parks", categorySlug: "theme-parks", price: 299, originalPrice: 350, rating: 4.8, image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=600&q=80", badge: "Popular", description: "World's largest indoor theme park with Marvel, Cartoon Network zones", highlights: ["Indoor theme park", "Marvel zone", "Cartoon Network"] },
  { id: "tp-2", name: "Dubai Parks and Resorts", slug: "dubai-parks-and-resorts", location: "Dubai", category: "Theme Parks", categorySlug: "theme-parks", price: 349, rating: 4.7, image: "https://images.unsplash.com/photo-1536768139911-e290a59011e4?w=600&q=80", description: "Multi-park destination with Motiongate, Bollywood Parks, LEGOLAND", highlights: ["Multiple parks", "Hollywood movies", "Family fun"] },
  { id: "tp-3", name: "LEGOLAND Dubai", slug: "legoland-dubai", location: "Dubai", category: "Theme Parks", categorySlug: "theme-parks", price: 275, originalPrice: 320, rating: 4.6, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", description: "LEGO-themed park perfect for families with children", highlights: ["LEGO builds", "Miniland", "Kids rides"] },
  { id: "tp-4", name: "Motiongate Dubai", slug: "motiongate-dubai", location: "Dubai", category: "Theme Parks", categorySlug: "theme-parks", price: 289, rating: 4.5, image: "https://images.unsplash.com/photo-1513127684133-14c55a4f9d9e?w=600&q=80", badge: "Family", description: "Hollywood-inspired theme park with thrilling rides", highlights: ["Hollywood studios", "Thrill rides", "Shows"] },
  
  // Water Parks
  { id: "wp-1", name: "Aquaventure Waterpark", slug: "aquaventure-waterpark", location: "Dubai", category: "Water Parks", categorySlug: "water-parks", price: 350, originalPrice: 420, rating: 4.9, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", badge: "Best Seller", description: "UAE's largest waterpark at Atlantis with record-breaking slides", highlights: ["Leap of Faith", "Shark Safari", "Private beach"] },
  { id: "wp-2", name: "Wild Wadi Waterpark", slug: "wild-wadi-waterpark", location: "Dubai", category: "Water Parks", categorySlug: "water-parks", price: 299, rating: 4.7, image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&q=80", description: "Arabian adventure themed waterpark near Burj Al Arab", highlights: ["Jumeirah Sceirah", "Wave pool", "Family slides"] },
  { id: "wp-3", name: "Laguna Waterpark", slug: "laguna-waterpark", location: "Dubai", category: "Water Parks", categorySlug: "water-parks", price: 199, originalPrice: 250, rating: 4.5, image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80", description: "Beachfront waterpark at La Mer with stunning views", highlights: ["Beach access", "Surf machine", "Lazy river"] },
  { id: "wp-4", name: "Splash N Party", slug: "splash-n-party", location: "Dubai", category: "Water Parks", categorySlug: "water-parks", price: 149, rating: 4.4, image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=600&q=80", badge: "Kids", description: "Fun water activities for the whole family", highlights: ["Kids pools", "Water slides", "Party areas"] },
  
  // Attractions
  { id: "at-1", name: "Burj Khalifa At The Top", slug: "burj-khalifa-at-the-top", location: "Dubai", category: "Attractions", categorySlug: "attractions", price: 199, originalPrice: 250, rating: 4.9, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge: "Iconic", description: "Visit the observation deck of the world's tallest building", highlights: ["124th floor", "360° views", "Sunset experience"] },
  { id: "at-2", name: "Dubai Frame", slug: "dubai-frame", location: "Dubai", category: "Attractions", categorySlug: "attractions", price: 75, rating: 4.6, image: "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=600&q=80", description: "Iconic picture frame offering views of old and new Dubai", highlights: ["Glass floor", "Sky deck", "Dubai history"] },
  { id: "at-3", name: "Museum of the Future", slug: "museum-of-the-future", location: "Dubai", category: "Attractions", categorySlug: "attractions", price: 149, rating: 4.8, image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80", badge: "New", description: "Explore cutting-edge technology and future innovations", highlights: ["Immersive exhibits", "Future tech", "Architectural marvel"] },
  { id: "at-4", name: "Dubai Miracle Garden", slug: "dubai-miracle-garden", location: "Dubai", category: "Attractions", categorySlug: "attractions", price: 99, originalPrice: 120, rating: 4.5, image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80", description: "World's largest natural flower garden with 150 million flowers", highlights: ["Flower displays", "Butterfly garden", "Seasonal themes"] },
  
  // Water Sports
  { id: "ws-1", name: "Flyboarding Experience", slug: "flyboarding-experience", location: "Dubai Marina", category: "Water Sports", categorySlug: "water-sports", price: 450, rating: 4.9, image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=600&q=80", badge: "Thrilling", description: "Fly above the water with hydroflight technology", highlights: ["30 min session", "Training included", "Photo package"] },
  { id: "ws-2", name: "Jet Ski Adventure", slug: "jet-ski-adventure", location: "JBR Beach", category: "Water Sports", categorySlug: "water-sports", price: 350, originalPrice: 400, rating: 4.7, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", description: "Thrilling jet ski ride along Dubai's stunning coastline", highlights: ["Guided tour", "Burj Al Arab views", "Safety gear"] },
  { id: "ws-3", name: "Parasailing Dubai", slug: "parasailing-dubai", location: "Dubai Marina", category: "Water Sports", categorySlug: "water-sports", price: 299, rating: 4.6, image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80", description: "Soar above the waters with stunning aerial views", highlights: ["Aerial views", "Safe harness", "Photo service"] },
  { id: "ws-4", name: "Scuba Diving", slug: "scuba-diving", location: "Palm Jumeirah", category: "Water Sports", categorySlug: "water-sports", price: 550, rating: 4.8, image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&q=80", badge: "Adventure", description: "Discover underwater wonders with professional diving", highlights: ["PADI certified", "Equipment provided", "Marine life"] },
  
  // Dinner Cruise
  { id: "dc-1", name: "Dhow Cruise Marina", slug: "dhow-cruise-marina", location: "Dubai Marina", category: "Dinner Cruise", categorySlug: "dinner-cruise", price: 199, originalPrice: 250, rating: 4.7, image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&q=80", badge: "Romantic", description: "Traditional dhow cruise with dinner at Dubai Marina", highlights: ["Buffet dinner", "Live entertainment", "Marina views"] },
  { id: "dc-2", name: "Dhow Cruise Creek", slug: "dhow-cruise-creek", location: "Dubai Creek", category: "Dinner Cruise", categorySlug: "dinner-cruise", price: 149, rating: 4.5, image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80", description: "Scenic dinner cruise through historic Dubai Creek", highlights: ["Heritage views", "International buffet", "Cultural show"] },
  { id: "dc-3", name: "Luxury Catamaran Cruise", slug: "luxury-catamaran-cruise", location: "Dubai Marina", category: "Dinner Cruise", categorySlug: "dinner-cruise", price: 399, rating: 4.9, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", badge: "Premium", description: "Premium catamaran experience with gourmet dining", highlights: ["Premium drinks", "Gourmet menu", "Sunset views"] },
  { id: "dc-4", name: "Sunset Cruise", slug: "sunset-cruise", location: "Palm Jumeirah", category: "Dinner Cruise", categorySlug: "dinner-cruise", price: 249, originalPrice: 299, rating: 4.6, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", description: "Magical sunset cruise around Palm Jumeirah", highlights: ["Golden hour", "Refreshments", "Photo opportunities"] },
  
  // Yacht
  { id: "yt-1", name: "Luxury Yacht 50ft", slug: "luxury-yacht-50ft", location: "Dubai Marina", category: "Yacht", categorySlug: "yacht", price: 799, originalPrice: 999, rating: 4.9, image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80", badge: "Luxury", description: "Private luxury yacht charter for groups", highlights: ["Private charter", "Refreshments", "Swimming stop"] },
  { id: "yt-2", name: "Party Yacht 65ft", slug: "party-yacht-65ft", location: "Dubai Marina", category: "Yacht", categorySlug: "yacht", price: 1299, rating: 4.8, image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80", description: "Perfect for celebrations and parties on water", highlights: ["DJ system", "Large deck", "Catering available"] },
  { id: "yt-3", name: "Fishing Yacht Trip", slug: "fishing-yacht-trip", location: "Dubai Marina", category: "Yacht", categorySlug: "yacht", price: 599, rating: 4.6, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", description: "Deep sea fishing adventure with professional crew", highlights: ["Fishing gear", "Professional crew", "Catch & release"] },
  { id: "yt-4", name: "Private Yacht Charter", slug: "private-yacht-charter", location: "Palm Jumeirah", category: "Yacht", categorySlug: "yacht", price: 1599, rating: 5.0, image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&q=80", badge: "Exclusive", description: "Exclusive private yacht for VIP experience", highlights: ["VIP service", "Full crew", "Gourmet catering"] },
  
  // Abu Dhabi
  { id: "ad-1", name: "Sheikh Zayed Grand Mosque", slug: "sheikh-zayed-grand-mosque", location: "Abu Dhabi", category: "Cultural", categorySlug: "cultural", price: 149, rating: 4.9, image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80", badge: "Must Visit", description: "One of the world's largest and most beautiful mosques", highlights: ["Guided tour", "Photography allowed", "Transport included"] },
  { id: "ad-2", name: "Ferrari World Abu Dhabi", slug: "ferrari-world-abu-dhabi", location: "Abu Dhabi", category: "Theme Parks", categorySlug: "theme-parks", price: 350, originalPrice: 420, rating: 4.8, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", description: "World's first Ferrari-branded theme park", highlights: ["Formula Rossa", "Racing simulators", "Family rides"] },
  { id: "ad-3", name: "Yas Waterworld", slug: "yas-waterworld", location: "Abu Dhabi", category: "Water Parks", categorySlug: "water-parks", price: 299, rating: 4.7, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", description: "World-class waterpark with 40+ rides and attractions", highlights: ["Dawwama", "Liwa Loop", "Wave pool"] },
  { id: "ad-4", name: "Louvre Abu Dhabi", slug: "louvre-abu-dhabi", location: "Abu Dhabi", category: "Museum", categorySlug: "museum", price: 99, rating: 4.8, image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80", badge: "Cultural", description: "World-renowned museum with stunning architecture", highlights: ["Art collections", "Rain of Light", "Guided tours"] },
  
  // Staycations
  { id: "st-1", name: "Atlantis The Palm", slug: "atlantis-the-palm", location: "Palm Jumeirah", category: "5-Star Resort", categorySlug: "staycations", price: 1299, originalPrice: 1599, rating: 4.9, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80", badge: "Iconic", description: "Iconic oceanfront resort with Aquaventure access", highlights: ["Aquaventure included", "Lost Chambers", "Fine dining"] },
  { id: "st-2", name: "Burj Al Arab", slug: "burj-al-arab", location: "Jumeirah", category: "7-Star Hotel", categorySlug: "staycations", price: 2999, rating: 5.0, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge: "Luxury", description: "The world's most luxurious hotel experience", highlights: ["Butler service", "Private beach", "Fine dining"] },
  { id: "st-3", name: "JW Marriott Marquis", slug: "jw-marriott-marquis", location: "Downtown Dubai", category: "5-Star Hotel", categorySlug: "staycations", price: 799, originalPrice: 999, rating: 4.7, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", description: "One of the world's tallest hotels in Downtown Dubai", highlights: ["Pool access", "Spa", "Multiple restaurants"] },
  { id: "st-4", name: "Anantara The Palm", slug: "anantara-the-palm", location: "Palm Jumeirah", category: "Beach Resort", categorySlug: "staycations", price: 999, rating: 4.8, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", badge: "Beach", description: "Thai-inspired beach resort on Palm Jumeirah", highlights: ["Private beach", "Overwater villas", "Spa"] },
];

// Destinations data
const destinations = [
  { id: "dest-1", name: "Dubai", slug: "dubai", type: "destination", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", description: "City of wonders with iconic landmarks and experiences" },
  { id: "dest-2", name: "Abu Dhabi", slug: "abu-dhabi", type: "destination", image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80", description: "Cultural capital with world-class attractions" },
  { id: "dest-3", name: "Sharjah", slug: "sharjah", type: "destination", image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&q=80", description: "Cultural heritage and family attractions" },
  { id: "dest-4", name: "Ras Al Khaimah", slug: "ras-al-khaimah", type: "destination", image: "https://images.unsplash.com/photo-1451440063999-77a8b2960d2b?w=600&q=80", description: "Adventure destination with mountains and beaches" },
];

// Categories data
const categories = [
  { id: "cat-1", name: "Theme Parks", slug: "theme-parks", type: "category", city: "Dubai", image: "https://images.unsplash.com/photo-1536768139911-e290a59011e4?w=600&q=80", description: "Thrilling rides and entertainment for all ages" },
  { id: "cat-2", name: "Water Parks", slug: "water-parks", type: "category", city: "Dubai", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", description: "Splash into fun with exciting water attractions" },
  { id: "cat-3", name: "Attractions", slug: "attractions", type: "category", city: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", description: "Iconic landmarks and must-see destinations" },
  { id: "cat-4", name: "Water Sports", slug: "water-sports", type: "category", city: "Dubai", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", description: "Adventure on the water with thrilling activities" },
  { id: "cat-5", name: "Dinner Cruise", slug: "dinner-cruise", type: "category", city: "Dubai", image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&q=80", description: "Romantic dining experiences on the water" },
  { id: "cat-6", name: "Yacht", slug: "yacht", type: "category", city: "Dubai", image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80", description: "Luxury yacht charters for unforgettable moments" },
  { id: "cat-7", name: "Staycations", slug: "staycations", type: "category", city: "UAE", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80", description: "Luxurious hotel stays and resort packages" },
];

function searchItems(query: string, limit: number = 20) {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return [];
  }
  
  const results: any[] = [];
  
  // Search tours
  allTours.forEach((tour) => {
    const searchableText = [
      tour.name,
      tour.location,
      tour.category,
      tour.description || "",
      ...(tour.highlights || []),
    ].join(" ").toLowerCase();
    
    if (searchableText.includes(normalizedQuery)) {
      const citySlug = tour.location.toLowerCase().replace(/\s+/g, "-");
      results.push({
        id: tour.id,
        title: tour.name,
        slug: tour.slug,
        type: "tour",
        city: tour.location,
        category: tour.category,
        categorySlug: tour.categorySlug,
        image: tour.image,
        price: tour.price,
        originalPrice: tour.originalPrice,
        rating: tour.rating,
        badge: tour.badge,
        description: tour.description,
        redirectUrl: `/tours/${tour.slug}`,
      });
    }
  });
  
  // Search destinations
  destinations.forEach((dest) => {
    const searchableText = [dest.name, dest.description].join(" ").toLowerCase();
    
    if (searchableText.includes(normalizedQuery)) {
      results.push({
        id: dest.id,
        title: dest.name,
        slug: dest.slug,
        type: "destination",
        city: dest.name,
        category: "Destination",
        image: dest.image,
        description: dest.description,
        redirectUrl: dest.slug === "dubai" ? `/dubai/theme-parks` : `/${dest.slug}`,
      });
    }
  });
  
  // Search categories
  categories.forEach((cat) => {
    const searchableText = [cat.name, cat.description, cat.city].join(" ").toLowerCase();
    
    if (searchableText.includes(normalizedQuery)) {
      results.push({
        id: cat.id,
        title: cat.name,
        slug: cat.slug,
        type: "category",
        city: cat.city,
        category: "Category",
        image: cat.image,
        description: cat.description,
        redirectUrl: cat.slug === "staycations" ? `/staycations` : `/dubai/${cat.slug}`,
      });
    }
  });
  
  // Sort by relevance (exact matches first)
  results.sort((a, b) => {
    const aExact = a.title.toLowerCase().includes(normalizedQuery);
    const bExact = b.title.toLowerCase().includes(normalizedQuery);
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    return 0;
  });
  
  return results.slice(0, limit);
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('q') || '';
    const limit = parseInt(url.searchParams.get('limit') || '20');
    
    console.log(`Search request: query="${query}", limit=${limit}`);
    
    const results = searchItems(query, limit);
    
    console.log(`Found ${results.length} results for "${query}"`);
    
    return new Response(JSON.stringify({ 
      results,
      query,
      total: results.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ error: 'Search failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
