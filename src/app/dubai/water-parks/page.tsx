import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function WaterParksPage() {
  const products = await getProductsByCategory("water-parks");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai Water Parks"
      subtitle="Splash into fun at Dubai's best water parks"
      tours={tours}
    />
  );
}
