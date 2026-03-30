import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function WaterAdventuresPage() {
  const products = await getProductsByCategory("water-adventures");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai Water Adventures"
      subtitle="Dive into exciting water adventures across Dubai"
      tours={tours}
    />
  );
}
