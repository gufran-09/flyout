import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function VisaPage() {
    const products = await getProductsByCategory("visa");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Visa Services"
            subtitle="Hassle-free visa services for your UAE trip"
            tours={tours}
        />
    );
}
