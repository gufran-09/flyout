import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiTransfers } from "@/data/tours";

export default function TransfersPage() {
    return (
        <CategoryLayout
            title="Dubai Transfers"
            subtitle="Comfortable airport and city transfers in Dubai"
            tours={dubaiTransfers}
        />
    );
}
