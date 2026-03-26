import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function CruisePage() {
    const products = await getProductsByCategory("cruise");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Cruises"
            subtitle="Discover scenic and luxury cruise experiences in Dubai"
            tours={tours}
        />
    );
}
