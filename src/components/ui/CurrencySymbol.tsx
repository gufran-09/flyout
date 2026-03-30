import React from "react";
import Image from "next/image";

interface CurrencySymbolProps {
  className?: string;
  height?: number;
}

export const CurrencySymbol: React.FC<CurrencySymbolProps> = ({
  className = "",
  height = 16,
}) => {
  return (
    <Image
      src="/currency-symbol.png"
      alt="AED"
      width={height}
      height={height}
      className={`inline-block align-middle ${className}`}
      style={{ height: `${height}px`, width: "auto" }}
    />
  );
};
