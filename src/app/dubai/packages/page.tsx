import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function PackagesPage() {
    const products = await getProductsByCategory("holiday-packages");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Holiday Packages"
            subtitle="Complete holiday packages for an unforgettable Dubai experience"
            tours={tours}
        />
    );
}
