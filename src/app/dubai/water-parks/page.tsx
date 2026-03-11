import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiWaterParks } from "@/data/tours";

export default function WaterParksPage() {
    return (
        <CategoryLayout
            title="Dubai Water Parks"
            subtitle="Splash into fun at Dubai's best water parks"
            tours={dubaiWaterParks}
        />
    );
}
