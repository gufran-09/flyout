import React from 'react';
import uaeCurrencySymbol from '../../assets/uae-currency-symbol.png';

interface CurrencySymbolProps {
    className?: string;
    height?: number;
}

export const CurrencySymbol: React.FC<CurrencySymbolProps> = ({ className = '', height = 16 }) => {
    return (
        <img
            src={uaeCurrencySymbol}
            alt="AED"
            className={`inline-block align-middle ${className}`}
            style={{ height: `${height}px`, width: 'auto' }}
        />
    );
};
