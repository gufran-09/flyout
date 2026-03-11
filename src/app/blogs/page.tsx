import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: "1",
    title: "Top 10 Must-Visit Attractions in Dubai for 2026",
    excerpt: "Discover the most breathtaking destinations in Dubai that every traveler should experience. From the iconic Burj Khalifa to hidden gems...",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    author: "Ahmed Al Maktoum",
    date: "January 10, 2026",
    readTime: "5 min read",
    category: "Destinations",
  },
  {
    id: "2",
    title: "Ultimate Guide to Desert Safari Adventures",
    excerpt: "Everything you need to know about experiencing the Arabian desert. Tips for choosing the best safari package and what to expect...",
    image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800",
    author: "Sarah Johnson",
    date: "January 8, 2026",
    readTime: "7 min read",
    category: "Adventures",
  },
  {
    id: "3",
    title: "Best Water Parks in UAE: Complete Comparison",
    excerpt: "A detailed comparison of Atlantis Aquaventure, Wild Wadi, and Yas Waterworld. Find out which water park suits your family best...",
    image: "https://images.unsplash.com/photo-1582467029665-d4b0775057de?w=800",
    author: "Mike Thompson",
    date: "January 5, 2026",
    readTime: "6 min read",
    category: "Water Parks",
  },
  {
    id: "4",
    title: "Luxury Yacht Experience in Dubai Marina",
    excerpt: "What to expect from a private yacht tour in Dubai. From sunset cruises to overnight stays, discover the ultimate maritime luxury...",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    author: "Fatima Al Rashid",
    date: "January 3, 2026",
    readTime: "4 min read",
    category: "Luxury",
  },
  {
    id: "5",
    title: "Abu Dhabi vs Dubai: Which City Should You Visit?",
    excerpt: "A comprehensive comparison of UAE's two major cities. Culture, attractions, costs, and experiences - we cover it all...",
    image: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=800",
    author: "David Chen",
    date: "December 28, 2025",
    readTime: "8 min read",
    category: "Travel Tips",
  },
  {
    id: "6",
    title: "Family-Friendly Activities in the UAE",
    excerpt: "Planning a family vacation? Here are the best kid-friendly attractions, theme parks, and activities across the Emirates...",
    image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800",
    author: "Lisa Park",
    date: "December 25, 2025",
    readTime: "6 min read",
    category: "Family Travel",
  },
];

const categories = ["All", "Destinations", "Adventures", "Water Parks", "Luxury", "Travel Tips", "Family Travel"];

export default function Blogs() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Travel <span className="text-primary">Insights</span> & Stories
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover travel tips, destination guides, and inspiring stories from our adventures across the UAE
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="section-container py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="section-container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{post.author}</span>
                  </div>
                  
                  <Link 
                    to={`/blogs/${post.id}`}
                    className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </Layout>
  );
}
