import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavbarSearch() {
    return (
        <div className="relative w-full max-w-2xl mx-auto group">
            <div className="relative flex items-center w-full h-12 rounded-full bg-[#0A1F44] border-2 border-[#B88E2F] shadow-[0_0_15px_rgba(184,142,47,0.15)] overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,142,47,0.3)]">

                {/* Search Icon */}
                <div className="pl-5 pr-3">
                    <Search className="w-5 h-5 text-[#B88E2F] group-focus-within:text-white transition-colors" />
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Search tours, destinations, activities"
                    className="flex-1 w-full h-full bg-transparent text-white  placeholder:text-gray-400  focus:outline-none text-sm font-medium tracking-wide pl-1 pr-4"
                />

                {/* Search Button */}
                <div className="p-1.5">
                    <Button
                        className="rounded-full bg-gradient-to-r from-[#1A2B47] to-[#ad7103] border border-[#B88E2F] text-white hover:from-[#ffa500] hover:to-[#ffa500] hover:border-[#ffa500]px-8 h-9 font-bold tracking-wide transition-all duration-300 shadow-md transform active:scale-95"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}
