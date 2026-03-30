import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function SupercarsPage() {
  const products = await getProductsByCategory("supercars");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai Supercars"
      subtitle="Drive your dream supercar through Dubai's stunning roads"
      tours={tours}
    />
  );
}
