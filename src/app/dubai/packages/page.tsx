import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiHolidayPackages } from "@/data/tours";

export default function PackagesPage() {
    return (
        <CategoryLayout
            title="Dubai Holiday Packages"
            subtitle="Complete holiday packages for an unforgettable Dubai experience"
            tours={dubaiHolidayPackages}
        />
    );
}
