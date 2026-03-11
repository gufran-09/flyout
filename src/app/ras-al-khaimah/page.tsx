import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { rasAlKhaimahExperiences } from "@/data/tours";

export default function RasAlKhaimahPage() {
    return (
        <CategoryLayout
            title="Ras Al Khaimah Experiences"
            subtitle="Adventure and nature in the northernmost emirate"
            tours={rasAlKhaimahExperiences}
        />
    );
}
