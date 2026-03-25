import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function AjmanPage() {
    const products = await getProductsByCategory("ajman");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Ajman Experiences"
            subtitle="Discover the hidden gem of the UAE"
            tours={tours}
        />
    );
}
