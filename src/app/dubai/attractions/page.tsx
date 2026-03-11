import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiAttractions } from "@/data/tours";

export default function AttractionsPage() {
    return (
        <CategoryLayout
            title="Dubai Attractions"
            subtitle="Discover the most iconic attractions in Dubai"
            tours={dubaiAttractions}
        />
    );
}
