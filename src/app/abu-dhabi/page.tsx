import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { getProductsByDestination } from "@backend/api/products";
import { productsToTours } from "@/lib/product-adapters";

export default async function AbuDhabiPage() {
  const products = await getProductsByDestination("abu-dhabi");
  const tours = productsToTours(products);

  return (
    <CategoryLayout
      title="Abu Dhabi Experiences"
      subtitle="Discover the capital's finest attractions and experiences"
      tours={tours}
    />
  );
}
