import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function CarRentalPage() {
  const products = await getProductsByCategory("car-rental");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai Car Rental"
      subtitle="Rent premium cars for exploring Dubai at your own pace"
      tours={tours}
    />
  );
}
