import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { sharjahExperiences } from "@/data/tours";

export default function SharjahPage() {
    return (
        <CategoryLayout
            title="Sharjah Experiences"
            subtitle="Explore the cultural capital of the UAE"
            tours={sharjahExperiences}
        />
    );
}
