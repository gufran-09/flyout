import { Ticket } from "lucide-react";

interface Zone {
    id: string;
    name: string;
    floors: string;
    heightPercent: number;
    type: string;
    description: string;
    experiences: string[];
    ticketExamples?: string[];
}

interface ZoneCardProps {
    zone: Zone;
    side: "left" | "right";
}

export default function ZoneCard({ zone, side }: ZoneCardProps) {
    return (
        <div className={`relative max-w-md ${side === "left" ? "ml-auto" : "mr-auto"}`}>

            {/* CONNECTOR LINE */}
            <span
                className={`hidden lg:block absolute top-1/2 w-24 h-[2px] bg-sky-400/50 ${side === "left" ? "right-[-100px]" : "left-[-100px]"
                    }`}
            >
                <span className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)] ${side === "left" ? "right-0" : "left-0"}`} />
            </span>

            {/* CARD */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl text-white hover:bg-white/10 transition-colors duration-300 group">

                <div className="flex justify-between items-start mb-2">
                    <p className="text-sky-400 text-sm font-semibold tracking-wider uppercase">
                        Floors {zone.floors}
                    </p>
                    <div className="px-2 py-1 rounded bg-white/5 text-[10px] uppercase tracking-widest text-white/50 border border-white/10">
                        {zone.type}
                    </div>
                </div>

                <h3 className="text-2xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    {zone.name}
                </h3>

                <p className="mt-3 text-white/80 leading-relaxed text-sm">
                    {zone.description}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {zone.experiences.map((e, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-sky-400 rounded-full" />
                            {e}
                        </li>
                    ))}
                </ul>

                {zone.ticketExamples && (
                    <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                        {zone.ticketExamples.map((t, i) => (
                            <span key={i} className="px-3 py-1 text-xs rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 flex items-center gap-1 group-hover:bg-sky-500/20 transition-colors">
                                <Ticket className="w-3 h-3" />
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
