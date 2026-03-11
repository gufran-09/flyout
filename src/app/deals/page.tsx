import { CategoryLayout } from "@/components/layout/CategoryLayout";
import {
    dubaiThemeParks,
    dubaiWaterParks,
    dubaiAttractions,
    dubaiWaterSports,
    dubaiDinnerCruise,
    dubaiYacht,
    dubaiLimousine,
    abuDhabiExperiences,
    staycations,
} from "@/data/tours";

export default function Deals() {
    // Combine all tours into one array
    const allDeals = [
        ...dubaiThemeParks,
        ...dubaiWaterParks,
        ...dubaiAttractions,
        ...dubaiWaterSports,
        ...dubaiDinnerCruise,
        ...dubaiYacht,
        ...dubaiLimousine,
        ...abuDhabiExperiences,
        ...staycations,
    ];

    return (
        <CategoryLayout
            title="All Deals UAE"
            subtitle="Explore our complete collection of premium experiences and adventures"
            tours={allDeals}
        />
    );
}
