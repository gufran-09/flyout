import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function LimousinePage() {
    const products = await getProductsByCategory("limousine");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Limousine Services"
            subtitle="Travel in style with Dubai's premium limousine services"
            tours={tours}
        />
    );
}
