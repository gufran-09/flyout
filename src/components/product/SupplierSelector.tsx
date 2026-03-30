"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductSupplier, formatDuration } from "@backend/types";

type SupplierSelectorProps = {
  suppliers: ProductSupplier[];
  onSelectionChange?: (supplierId: string, pricingId: string) => void;
};

export default function SupplierSelector({
  suppliers,
  onSelectionChange,
}: SupplierSelectorProps) {
  const activeSuppliers = useMemo(
    () => suppliers.filter((s) => s.is_active),
    [suppliers],
  );
  const [selectedSupplierId, setSelectedSupplierId] = useState(
    activeSuppliers[0]?.id ?? "",
  );

  const selectedSupplier = activeSuppliers.find(
    (s) => s.id === selectedSupplierId,
  );
  const activePricing =
    selectedSupplier?.product_pricing.filter((p) => p.is_active) ?? [];
  const [selectedPricingId, setSelectedPricingId] = useState(
    activePricing[0]?.id ?? "",
  );

  useEffect(() => {
    if (activeSuppliers.length > 0 && !selectedSupplierId) {
      setSelectedSupplierId(activeSuppliers[0].id);
    }
  }, [activeSuppliers, selectedSupplierId]);

  useEffect(() => {
    if (!selectedSupplier) return;
    const firstPricing = selectedSupplier.product_pricing.find(
      (p) => p.is_active,
    );
    if (
      firstPricing &&
      !selectedSupplier.product_pricing.some(
        (p) => p.id === selectedPricingId && p.is_active,
      )
    ) {
      setSelectedPricingId(firstPricing.id);
    }
  }, [selectedSupplier, selectedPricingId]);

  useEffect(() => {
    if (selectedSupplierId && selectedPricingId && onSelectionChange) {
      onSelectionChange(selectedSupplierId, selectedPricingId);
    }
  }, [onSelectionChange, selectedPricingId, selectedSupplierId]);

  if (activeSuppliers.length <= 1) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Choose Your Operator</h2>
      <p className="text-sm text-gray-500 mt-1">
        {activeSuppliers.length} operators available for this experience
      </p>

      <div className="grid grid-cols-1 gap-3 mt-3">
        {activeSuppliers.map((supplier) => {
          const supplierPrices = supplier.product_pricing
            .filter((p) => p.is_active)
            .map((p) => p.price);
          const lowestPrice =
            supplierPrices.length > 0
              ? Math.min(...supplierPrices)
              : supplier.price;
          const isSelectedSupplier = selectedSupplierId === supplier.id;

          return (
            <div
              key={supplier.id}
              onClick={() => setSelectedSupplierId(supplier.id)}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                isSelectedSupplier
                  ? "border-[#dea318] bg-amber-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold">
                    {supplier.display_title ?? supplier.supplier?.name}
                  </p>
                  {supplier.variant_description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {supplier.variant_description}
                    </p>
                  )}
                  {supplier.location && (
                    <p className="text-xs text-gray-400 mt-1">
                      {supplier.location}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#1A2B47]">
                    From AED {lowestPrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">per person</p>
                </div>
              </div>

              <div className="flex gap-2 mt-3 flex-wrap">
                {supplier.product_pricing
                  .filter((p) => p.is_active)
                  .map((pricing) => (
                    <button
                      key={pricing.id}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedSupplierId(supplier.id);
                        setSelectedPricingId(pricing.id);
                      }}
                      className={`text-xs px-2 py-1 rounded-full border transition ${
                        selectedPricingId === pricing.id && isSelectedSupplier
                          ? "border-[#dea318] bg-[#dea318]/15 text-[#1A2B47]"
                          : "border-gray-200 bg-gray-100 text-gray-600"
                      }`}
                    >
                      {formatDuration(pricing.duration_minutes)} - AED{" "}
                      {pricing.price.toLocaleString()}
                    </button>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
