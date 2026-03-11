import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiHotels } from "@/data/tours";

export default function HotelsPage() {
    return (
        <CategoryLayout
            title="Dubai Hotels"
            subtitle="Find the perfect stay in Dubai's finest hotels"
            tours={dubaiHotels}
        />
    );
}
