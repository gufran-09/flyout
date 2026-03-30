import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function WaterSportsPage() {
  const products = await getProductsByCategory("water-sports");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai Water Sports"
      subtitle="Experience thrilling water sports adventures in Dubai"
      tours={tours}
    />
  );
}
