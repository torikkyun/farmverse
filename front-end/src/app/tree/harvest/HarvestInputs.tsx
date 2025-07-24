import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, DollarSign, TrendingUp } from "lucide-react";
import { HarvestMode } from "./types";

type HarvestInputsProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  sellPrice: number;
  onSellPriceChange: (price: number) => void;
  harvestMode: HarvestMode;
  maxQuantity: number;
};

export function HarvestInputs({
  quantity,
  onQuantityChange,
  sellPrice,
  onSellPriceChange,
  harvestMode,
  maxQuantity,
}: HarvestInputsProps) {
  return (
    <div>
      {/* Quantity Input */}
      <div className="bg-white rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4 shadow-sm">
        <Label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
          <Package className="w-4 h-4 text-gray-600" />
          Số lượng thu hoạch (kg)
        </Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          min={0}
          max={maxQuantity}
          className="w-full h-10 text-base font-medium rounded-lg border bg-white border-gray-300 focus:border-black text-gray-900 hover:border-gray-400 transition-all"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">Tối đa: {maxQuantity} kg</p>
          <div className="flex gap-2">
            <button
              onClick={() => onQuantityChange(Math.floor(maxQuantity * 0.5))}
              className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              50%
            </button>
            <button
              onClick={() => onQuantityChange(maxQuantity)}
              className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Max
            </button>
          </div>
        </div>
      </div>

      {/* Sell Price Input */}
      {harvestMode === "sell" && (
        <div className="bg-white rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <Label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-600" />
            Giá bán (FVT)
          </Label>
          <Input
            type="number"
            value={sellPrice}
            onChange={(e) => onSellPriceChange(Number(e.target.value))}
            min={0}
            className="w-full h-10 text-base font-medium rounded-lg border bg-white border-gray-300 focus:border-black text-gray-900 hover:border-gray-400 transition-all"
          />
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
            <TrendingUp className="w-3 h-3" />
            Giá thị trường: {(quantity * 15000).toLocaleString()} FVT
          </p>
        </div>
      )}
    </div>
  );
}
