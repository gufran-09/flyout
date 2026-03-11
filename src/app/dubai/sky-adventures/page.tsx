import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiSkyAdventures } from "@/data/tours";

export default function SkyAdventuresPage() {
    return (
        <CategoryLayout
            title="Dubai Sky Adventures"
            subtitle="Take to the skies with thrilling aerial experiences"
            tours={dubaiSkyAdventures}
        />
    );
}
