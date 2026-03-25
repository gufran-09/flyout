import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function AttractionsPage() {
    const products = await getProductsByCategory("attractions");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Attractions"
            subtitle="Discover the most iconic attractions in Dubai"
            tours={tours}
        />
    );
}
