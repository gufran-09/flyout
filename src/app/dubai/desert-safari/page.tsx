import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function DesertSafariPage() {
    const products = await getProductsByCategory("desert-safari");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Desert Safari"
            subtitle="Experience the magic of the Arabian desert"
            tours={tours}
        />
    );
}
