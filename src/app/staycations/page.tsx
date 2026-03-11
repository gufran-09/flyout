import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { staycations } from "@/data/tours";

export default function Staycations() {
    return (
        <CategoryLayout
            title="Staycations"
            subtitle="Luxurious getaways and resort experiences in the UAE"
            tours={staycations}
        />
    );
}
