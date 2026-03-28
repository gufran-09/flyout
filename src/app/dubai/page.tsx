import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByDestination } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function DubaiPage() {
    const products = await getProductsByDestination("dubai");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Experiences"
            subtitle="Discover luxury experiences, desert adventures, and iconic attractions in Dubai"
            tours={tours}
        />
    );
}
