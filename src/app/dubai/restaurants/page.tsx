import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function RestaurantsPage() {
  const products = await getProductsByCategory("restaurants");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai Restaurants"
      subtitle="Dine at Dubai's most exquisite restaurants"
      tours={tours}
    />
  );
}
