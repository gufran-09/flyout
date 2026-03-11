import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiDinnerCruise } from "@/data/tours";

export default function DinnerCruisePage() {
    return (
        <CategoryLayout
            title="Dubai Dinner Cruises"
            subtitle="Enjoy luxurious dinner cruises along Dubai's stunning waterways"
            tours={dubaiDinnerCruise}
        />
    );
}
