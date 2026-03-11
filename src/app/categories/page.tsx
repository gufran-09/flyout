import { Layout } from "@/components/layout/Layout";
import Link from "next/link";

const categories = [
    { name: "Theme Parks", href: "/dubai/theme-parks", icon: "🎢" },
    { name: "Water Parks", href: "/dubai/water-parks", icon: "🏊" },
    { name: "Attractions", href: "/dubai/attractions", icon: "🏛️" },
    { name: "Water Sports", href: "/dubai/water-sports", icon: "🏄" },
    { name: "Desert Safari", href: "/dubai/desert-safari", icon: "🐪" },
    { name: "Dinner Cruise", href: "/dubai/dinner-cruise", icon: "🚢" },
    { name: "City Tours", href: "/dubai/city-tours", icon: "🏙️" },
    { name: "Yacht", href: "/dubai/yacht", icon: "⛵" },
    { name: "Sky Adventures", href: "/dubai/sky-adventures", icon: "🪂" },
    { name: "Limousine", href: "/dubai/limousine", icon: "🚗" },
    { name: "Abu Dhabi", href: "/abu-dhabi", icon: "🕌" },
    { name: "Sharjah", href: "/sharjah", icon: "🎨" },
    { name: "Staycations", href: "/staycations", icon: "🏨" },
];

export default function CategoriesPage() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">All Categories</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={cat.href}
                            className="flex flex-col items-center gap-2 p-6 border rounded-xl hover:shadow-lg transition-shadow"
                        >
                            <span className="text-4xl">{cat.icon}</span>
                            <span className="font-medium text-center">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
