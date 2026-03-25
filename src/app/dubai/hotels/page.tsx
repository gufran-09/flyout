import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function HotelsPage() {
    const products = await getProductsByCategory("hotels");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Hotels"
            subtitle="Find the perfect stay in Dubai's finest hotels"
            tours={tours}
        />
    );
}
