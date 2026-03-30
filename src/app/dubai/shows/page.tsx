import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function ShowsPage() {
  const products = await getProductsByCategory("shows");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai Shows & Entertainment"
      subtitle="Experience world-class shows and entertainment in Dubai"
      tours={tours}
    />
  );
}
