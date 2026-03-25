import { Layout } from "@/components/layout/Layout";
import { getProductBySlug } from "@backend/api/products";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";

interface ProductPageProps {
    params: {
        destination: string;
        category: string;
        slug: string;
    };
}

export default async function ExperiencePage({ params }: ProductPageProps) {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    // Get first pricing option if available
    const firstSupplier = product.product_suppliers?.[0];
    const firstPricing = firstSupplier?.product_pricing?.[0];
    const price = firstPricing?.price ?? firstSupplier?.price ?? 0;
    const originalPrice = firstPricing?.original_price ?? null;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Product Images */}
                    <div className="mb-8">
                        {product.product_images && product.product_images.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative h-[400px] md:col-span-2">
                                    <Image
                                        src={product.product_images[0].image_url}
                                        alt={product.title}
                                        fill
                                        className="object-cover rounded-xl"
                                    />
                                </div>
                                {product.product_images.slice(1, 5).map((img) => (
                                    <div key={img.id} className="relative h-[200px]">
                                        <Image
                                            src={img.image_url}
                                            alt={product.title}
                                            fill
                                            className="object-cover rounded-xl"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : product.thumbnail_url ? (
                            <div className="relative h-[400px]">
                                <Image
                                    src={product.thumbnail_url}
                                    alt={product.title}
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                        ) : null}
                    </div>

                    {/* Product Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            {product.badge && (
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                    {product.badge}
                                </span>
                            )}
                            {product.category && (
                                <span className="text-muted-foreground text-sm">
                                    {product.category.name}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                        
                        {product.subtitle && (
                            <p className="text-xl text-muted-foreground mb-4">{product.subtitle}</p>
                        )}

                        <div className="flex items-center gap-6 mb-6">
                            {product.location && (
                                <span className="text-muted-foreground flex items-center gap-1">
                                    📍 {product.location}
                                </span>
                            )}
                            {product.destination && (
                                <span className="text-muted-foreground">
                                    {product.destination.name}
                                </span>
                            )}
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span className="font-medium">{product.rating}</span>
                                <span className="text-muted-foreground">
                                    ({product.review_count} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <div className="text-4xl font-bold text-primary">
                                AED {price}
                            </div>
                            {originalPrice && (
                                <div className="text-2xl text-muted-foreground line-through">
                                    AED {originalPrice}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Overview */}
                    {product.overview && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            <p className="text-muted-foreground leading-relaxed">{product.overview}</p>
                        </div>
                    )}

                    {/* Highlights */}
                    {product.highlights && product.highlights.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                            <ul className="space-y-2">
                                {product.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary mt-1">✓</span>
                                        <span className="text-muted-foreground">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* What to Bring */}
                    {product.what_to_bring && product.what_to_bring.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">What to Bring</h2>
                            <ul className="space-y-2">
                                {product.what_to_bring.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Facilities */}
                    {product.facilities && product.facilities.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Facilities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {product.facilities.map((facility, index) => (
                                    <div key={index} className="flex items-center gap-2 text-muted-foreground">
                                        <span>✓</span>
                                        <span>{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cancellation Policy */}
                    {product.cancellation_policy && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
                            <p className="text-muted-foreground">{product.cancellation_policy}</p>
                        </div>
                    )}

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-muted rounded-xl">
                        <div>
                            <div className="font-semibold mb-1">Mobile Ticket</div>
                            <div className="text-muted-foreground">
                                {product.mobile_ticket ? "✓ Accepted" : "✗ Not Available"}
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold mb-1">Refundable</div>
                            <div className="text-muted-foreground">
                                {product.is_refundable ? "✓ Yes" : "✗ No"}
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold mb-1">Confirmation</div>
                            <div className="text-muted-foreground">
                                Within {product.confirmation_hours} hours
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
