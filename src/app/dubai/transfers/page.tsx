import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function TransfersPage() {
  const products = await getProductsByCategory("transfers");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai Transfers"
      subtitle="Comfortable airport and city transfers in Dubai"
      tours={tours}
    />
  );
}
