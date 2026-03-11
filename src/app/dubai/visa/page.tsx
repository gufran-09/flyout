import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiVisaServices } from "@/data/tours";

export default function VisaPage() {
    return (
        <CategoryLayout
            title="Dubai Visa Services"
            subtitle="Hassle-free visa services for your UAE trip"
            tours={dubaiVisaServices}
        />
    );
}
