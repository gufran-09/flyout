import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function ThemeParksPage() {
    const products = await getProductsByCategory("theme-parks");
    const tours = productsToTours(products);

    return (
        <CategoryLayout
            title="Dubai Theme Parks"
            subtitle="Experience the thrill of world-class theme parks in Dubai"
            tours={tours}
        />
    );
}
