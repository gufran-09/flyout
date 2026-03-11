import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiSupercars } from "@/data/tours";

export default function SupercarsPage() {
    return (
        <CategoryLayout
            title="Dubai Supercars"
            subtitle="Drive your dream supercar through Dubai's stunning roads"
            tours={dubaiSupercars}
        />
    );
}
