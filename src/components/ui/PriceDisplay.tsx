import React from 'react';
import { CurrencySymbol } from './CurrencySymbol';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
    price: string | number;
    originalPrice?: string | number;
    className?: string;
    currencyClassName?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
    price,
    originalPrice,
    className,
    currencyClassName
}) => {
    // Helper to parse price to number
    const parsePrice = (value: string | number): number => {
        if (typeof value === 'number') return value;
        // Remove non-numeric characters except dot
        const clean = value.replace(/[^0-9.]/g, '');
        return parseFloat(clean) || 0;
    };

    const currentPriceVal = parsePrice(price);
    const originalPriceVal = originalPrice ? parsePrice(originalPrice) : 0;

    // Calculate discount
    let discountPercent = 0;
    if (originalPriceVal > currentPriceVal) {
        discountPercent = Math.round(((originalPriceVal - currentPriceVal) / originalPriceVal) * 100);
    }

    // Helper to format number with commas
    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    return (
        <div className={cn("flex flex-col items-start", className)}>
            {/* Current Price */}
            <div className="flex items-center gap-1 font-bold text-neutral-900 text-lg">
                <CurrencySymbol className={cn("w-4 h-4", currencyClassName)} />
                <span>{formatNumber(currentPriceVal)}</span>
            </div>

            {/* Original Price & Discount */}
            {discountPercent > 0 && (
                <div className="flex items-center gap-2 text-sm mt-0.5">
                    <div className="flex items-center gap-0.5 text-muted-foreground/60 line-through decoration-muted-foreground/60">
                        <CurrencySymbol className="w-3 h-3 opacity-60" />
                        <span>{formatNumber(originalPriceVal)}</span>
                    </div>
                    <span className="text-emerald-600 font-medium">
                        {discountPercent}% OFF
                    </span>
                </div>
            )}
        </div>
    );
};
