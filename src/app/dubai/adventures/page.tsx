import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiAdventures } from "@/data/tours";

export default function AdventuresPage() {
    return (
        <CategoryLayout
            title="Dubai Adventures"
            subtitle="Adrenaline-pumping adventures in the heart of Dubai"
            tours={dubaiAdventures}
        />
    );
}
