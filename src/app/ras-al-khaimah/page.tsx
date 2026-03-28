import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByDestination } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function RasAlKhaimahPage() {
    const products = await getProductsByDestination("ras-al-khaimah");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Ras Al Khaimah Experiences"
            subtitle="Adventure and nature in the northernmost emirate"
            tours={tours}
        />
    );
}
