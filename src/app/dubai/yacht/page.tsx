import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function YachtPage() {
    const products = await getProductsByCategory("yacht");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Yacht Experiences"
            subtitle="Sail the Arabian Gulf on a luxury yacht"
            tours={tours}
        />
    );
}
