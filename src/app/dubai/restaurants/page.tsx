import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiRestaurants } from "@/data/tours";

export default function RestaurantsPage() {
    return (
        <CategoryLayout
            title="Dubai Restaurants"
            subtitle="Dine at Dubai's most exquisite restaurants"
            tours={dubaiRestaurants}
        />
    );
}
