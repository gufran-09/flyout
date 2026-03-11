import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiShows } from "@/data/tours";

export default function ShowsPage() {
    return (
        <CategoryLayout
            title="Dubai Shows & Entertainment"
            subtitle="Experience world-class shows and entertainment in Dubai"
            tours={dubaiShows}
        />
    );
}
