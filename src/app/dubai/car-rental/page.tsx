import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiCarRental } from "@/data/tours";

export default function CarRentalPage() {
    return (
        <CategoryLayout
            title="Dubai Car Rental"
            subtitle="Rent premium cars for exploring Dubai at your own pace"
            tours={dubaiCarRental}
        />
    );
}
