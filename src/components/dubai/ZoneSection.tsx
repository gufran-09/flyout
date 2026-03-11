import { ArrowRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface ZoneSectionProps {
    zone: Zone;
}

export default function ZoneSection({ zone }: ZoneSectionProps) {
    return (
        <div className="relative p-8 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/20 shadow-xl my-6 overflow-hidden group hover:bg-white/15 transition-all duration-500">
            {/* Decorative background glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] group-hover:bg-blue-500/30 transition-all duration-500" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] group-hover:bg-purple-500/30 transition-all duration-500" />

            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                            Floor {zone.floors}
                        </div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 filter drop-shadow-sm">
                            {zone.name}
                        </h2>
                    </div>
                    <div className="text-4xl font-black text-white/5">{zone.id.toUpperCase()}</div>
                </div>

                <p className="text-lg text-white/80 font-light leading-relaxed border-l-2 border-primary/50 pl-4">
                    {zone.description}
                </p>

                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-white/90 uppercase tracking-widest mb-3">Experiences</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {zone.experiences.map((exp, i) => (
                            <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,191,25,0.8)]" />
                                {exp}
                            </li>
                        ))}
                    </ul>
                </div>

                {zone.ticketExamples && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-white/90 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-primary" /> Available Tours
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {zone.ticketExamples.map((t, i) => (
                                <Button
                                    key={i}
                                    variant="outline"
                                    className="bg-white/5 border-white/10 text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 rounded-full text-xs h-8"
                                >
                                    {t}
                                </Button>
                            ))}
                            <Button variant="ghost" className="text-xs text-primary hover:text-primary/80 h-8 p-0 hover:bg-transparent">
                                View All <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
