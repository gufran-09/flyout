import { Layout } from "@/components/layout/Layout";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@backend/api/categories";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">All Categories</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/categories/${cat.slug}`}
                            className="flex flex-col items-center gap-2 p-6 border rounded-xl hover:shadow-lg transition-shadow overflow-hidden"
                        >
                            {cat.image_url && (
                                <div className="relative w-16 h-16">
                                    <Image
                                        src={cat.image_url}
                                        alt={cat.name}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            <span className="font-medium text-center">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
