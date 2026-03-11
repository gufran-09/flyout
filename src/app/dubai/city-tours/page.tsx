import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiCityTours } from "@/data/tours";

export default function CityToursPage() {
    return (
        <CategoryLayout
            title="Dubai City Tours"
            subtitle="Explore the city of gold with guided tours"
            tours={dubaiCityTours}
        />
    );
}
