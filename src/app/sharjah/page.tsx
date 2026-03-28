import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByDestination } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function SharjahPage() {
    const products = await getProductsByDestination("sharjah");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Sharjah Experiences"
            subtitle="Explore cultural heritage and family-friendly attractions in Sharjah"
            tours={tours}
        />
    );
}