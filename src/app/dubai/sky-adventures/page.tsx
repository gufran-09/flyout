import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function SkyAdventuresPage() {
    const products = await getProductsByCategory("sky-adventures");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Sky Adventures"
            subtitle="Take to the skies with thrilling aerial experiences"
            tours={tours}
        />
    );
}
