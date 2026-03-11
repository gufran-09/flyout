import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { ajmanExperiences } from "@/data/tours";

export default function AjmanPage() {
    return (
        <CategoryLayout
            title="Ajman Experiences"
            subtitle="Discover the hidden gem of the UAE"
            tours={ajmanExperiences}
        />
    );
}
