import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByCategory } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function CityToursPage() {
  const products = await getProductsByCategory("city-tours");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Dubai City Tours"
      subtitle="Explore the city of gold with guided tours"
      tours={tours}
    />
  );
}
