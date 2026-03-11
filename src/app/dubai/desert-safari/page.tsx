import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiDesertSafari } from "@/data/tours";

export default function DesertSafariPage() {
    return (
        <CategoryLayout
            title="Dubai Desert Safari"
            subtitle="Experience the magic of the Arabian desert"
            tours={dubaiDesertSafari}
        />
    );
}
