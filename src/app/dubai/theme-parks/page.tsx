import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { dubaiThemeParks } from "@/data/tours";

export default function ThemeParksPage() {
    return (
        <CategoryLayout
            title="Dubai Theme Parks"
            subtitle="Experience the thrill of world-class theme parks in Dubai"
            tours={dubaiThemeParks}
        />
    );
}
