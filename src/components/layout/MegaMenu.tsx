import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LucideIcon } from "lucide-react";

export interface MenuItem {
    title: string;
    href: string;
    icon?: LucideIcon | React.ComponentType<{ className?: string }>;
    description?: string;
    badge?: string;
    image?: string;
}

interface MegaMenuProps {
    triggerLabel: string;
    items: MenuItem[];
    leftTitle?: string;
    rightTitle?: string;
    type?: "list" | "grid";
    columns?: number;
    showDivider?: boolean;
}

export function MegaMenu({
    triggerLabel,
    items,

    type = "list",
    columns = 4,
    showDivider = true,
}: MegaMenuProps) {
    const isGrid = type === "grid";
    const mid = Math.ceil(items.length / 2);
    const left = items.slice(0, mid);
    const right = items.slice(mid);

    const widthClass = isGrid ? "w-[1100px]" : "w-[760px]";

    return (
        <NavigationMenu delayDuration={0}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-white/90 hover:text-[#B88E2F] data-[state=open]:bg-transparent data-[state=open]:text-[#B88E2F] h-auto py-2 px-3 focus:bg-transparent focus:text-[#B88E2F]">
                        {triggerLabel}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <div
                            className={cn(
                                "relative px-6 pb-6 pt-6 rounded-3xl bg-white shadow-xl border border-gray-100",
                                widthClass
                            )}
                        >
                            {isGrid ? (
                                <div
                                    className="grid gap-4 p-2"
                                    style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
                                >
                                    {items.map((item) => (
                                        <MenuRow key={item.title} item={item} isGrid />
                                    ))}
                                </div>
                            ) : (
                                <div className="relative grid grid-cols-2 gap-x-12">
                                    <div className="space-y-3">

                                        {left.map((item) => (
                                            <MenuRow key={item.title} item={item} />
                                        ))}
                                    </div>

                                    <div className="space-y-3">

                                        {right.map((item) => (
                                            <MenuRow key={item.title} item={item} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

/* ----------------------------- */
/* 🔹 Single Row Component */
/* ----------------------------- */

function MenuRow({ item, isGrid }: { item: MenuItem; isGrid?: boolean }) {
    if (isGrid) {
        return (
            <Link
                to={item.href}
                className="group flex items-center gap-4 p-2 rounded-xl hover:bg-[#0A1F44]/10 transition-colors duration-300"
            >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-100 shadow-sm">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#0A1F44] group-hover:scale-110 transition-transform">
                            {item.icon && <item.icon className="h-5 w-5" />}
                        </div>
                    )}
                </div>

                <span className="font-semibold text-gray-900 group-hover:text-[#0A1F44] transition-colors text-sm">
                    {item.title}
                </span>
            </Link>
        );
    }

    return (
        <Link
            to={item.href}
            className="group flex items-start gap-4 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-[#0A1F44]/10"
        >
            {(item.image || item.icon) && (
                <div
                    className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg overflow-hidden transition-transform group-hover:scale-110",
                        !item.image && "bg-[#0A1F44]/10 text-[#0A1F44]"
                    )}
                >
                    {item.image ? (
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                        item.icon && <item.icon className="h-5 w-5" />
                    )}
                </div>
            )}

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#0A1F44] transition-colors">
                        {item.title}
                    </p>

                    {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-600 border border-yellow-400/30">
                            {item.badge}
                        </span>
                    )}
                </div>

                {item.description && (
                    <p className="text-xs text-gray-500 leading-snug mt-0.5">
                        {item.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
