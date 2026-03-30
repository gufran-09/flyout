import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function AdventuresPage() {
  const products = await getProductsByCategory("adventures");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai Adventures"
      subtitle="Adrenaline-pumping adventures in the heart of Dubai"
      tours={tours}
    />
  );
}
