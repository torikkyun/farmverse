import { ShoppingCart, Warehouse } from "lucide-react";
import { HarvestMode } from "./types";

type HarvestSummaryProps = {
  harvestMode: HarvestMode;
  quantity: number;
  sellPrice: number;
};

export function HarvestSummary({
  harvestMode,
  quantity,
  sellPrice,
}: HarvestSummaryProps) {
  const marketPrice = quantity * 15000;
  const unitPrice =
    harvestMode === "sell" && quantity > 0
      ? Math.round(sellPrice / quantity)
      : 15000;

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-black text-white p-3">
        <h4 className="font-bold text-sm flex items-center gap-2">
          {harvestMode === "sell" ? (
            <>
              <ShoppingCart className="w-4 h-4" />
              Giao dịch
            </>
          ) : (
            <>
              <Warehouse className="w-4 h-4" />
              Lưu trữ
            </>
          )}
        </h4>
      </div>

      <div className="p-3 space-y-3">
        <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Số lượng
          </span>
          <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
            {quantity} kg
          </span>
        </div>

        <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Đơn giá
          </span>
          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
            {unitPrice.toLocaleString()} FVT/kg
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-xs text-gray-700">
              {harvestMode === "sell" ? "Tổng thu:" : "Tổng giá trị:"}
            </span>
            <span className="font-bold text-base text-black">
              {harvestMode === "sell"
                ? sellPrice.toLocaleString()
                : marketPrice.toLocaleString()}{" "}
              FVT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
