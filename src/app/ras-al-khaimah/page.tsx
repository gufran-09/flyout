import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function RasAlKhaimahPage() {
    const products = await getProductsByCategory("ras-al-khaimah");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Ras Al Khaimah Experiences"
            subtitle="Adventure and nature in the northernmost emirate"
            tours={tours}
        />
    );
}
