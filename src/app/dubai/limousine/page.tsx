import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiLimousine } from "@/data/tours";

export default function LimousinePage() {
    return (
        <CategoryLayout
            title="Dubai Limousine Services"
            subtitle="Travel in style with Dubai's premium limousine services"
            tours={dubaiLimousine}
        />
    );
}
