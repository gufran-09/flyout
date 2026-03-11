import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { abuDhabiExperiences } from "@/data/tours";

export default function AbuDhabiPage() {
    return (
        <CategoryLayout
            title="Abu Dhabi Experiences"
            subtitle="Discover the capital's finest attractions and experiences"
            tours={abuDhabiExperiences}
        />
    );
}
