import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiWaterSports } from "@/data/tours";

export default function WaterSportsPage() {
    return (
        <CategoryLayout
            title="Dubai Water Sports"
            subtitle="Experience thrilling water sports adventures in Dubai"
            tours={dubaiWaterSports}
        />
    );
}
