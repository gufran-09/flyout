import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiWaterAdventures } from "@/data/tours";

export default function WaterAdventuresPage() {
    return (
        <CategoryLayout
            title="Dubai Water Adventures"
            subtitle="Dive into exciting water adventures across Dubai"
            tours={dubaiWaterAdventures}
        />
    );
}
