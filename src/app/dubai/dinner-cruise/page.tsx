import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function DinnerCruisePage() {
    const products = await getProductsByCategory("dinner-cruise");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Dinner Cruises"
            subtitle="Enjoy luxurious dinner cruises along Dubai's stunning waterways"
            tours={tours}
        />
    );
}
