import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiYacht } from "@/data/tours";

export default function YachtPage() {
    return (
        <CategoryLayout
            title="Dubai Yacht Experiences"
            subtitle="Sail the Arabian Gulf on a luxury yacht"
            tours={dubaiYacht}
        />
    );
}
