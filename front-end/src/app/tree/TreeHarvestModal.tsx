import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { TreeHarvestModalProps } from "./harvest/types";
import { HarvestHeader } from "./harvest/HarvestHeader";
import { HarvestModeSelector } from "./harvest/HarvestModeSelector";
import { HarvestInputs } from "./harvest/HarvestInputs";
import { HarvestSummary } from "./harvest/HarvestSummary";
import { useHarvestLogic } from "./harvest/useHarvestLogic";

type TreeHarvestModalPropsWithPrice = TreeHarvestModalProps & {
  initialSellPrice?: number;
};

export function TreeHarvestModal({
  open,
  setOpen,
  selectedTree,
  onHarvest,
  initialSellPrice = 0,
}: TreeHarvestModalPropsWithPrice) {
  const {
    harvestMode,
    quantity,
    sellPrice,
    setHarvestMode,
    setQuantity,
    setSellPrice,
  } = useHarvestLogic(open, selectedTree, initialSellPrice); // truyền vào hook

  const handleHarvest = () => {
    if (!selectedTree || quantity <= 0) return;
    onHarvest?.(
      harvestMode,
      quantity,
      harvestMode === "sell" ? sellPrice : undefined
    );
    setOpen(false);
  };

  if (!selectedTree) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[98vw] w-full max-h-[98vh] p-0 sm:max-w-[95vw] sm:max-h-[95vh]">
        <div className="flex flex-col h-full max-h-[98vh] sm:max-h-[95vh]">
          {/* Header */}
          <HarvestHeader selectedTree={selectedTree} />

          {/* Main Content */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {/* Desktop View */}
            <div className="hidden lg:grid lg:grid-cols-3 h-full">
              {/* Mode Selection - Column 1 */}
              <div className="border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
                <div className="p-6 overflow-y-auto flex-1">
                  <HarvestModeSelector
                    harvestMode={harvestMode}
                    onModeChange={setHarvestMode}
                  />
                </div>
              </div>

              {/* Input Section - Column 3 */}
              <div className="flex flex-col h-full">
                <div className="p-6 pb-3 flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
                  <HarvestInputs
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    sellPrice={sellPrice}
                    onSellPriceChange={setSellPrice}
                    harvestMode={harvestMode}
                    maxQuantity={selectedTree.yield}
                  />
                </div>
              </div>

              {/* Summary Section - Column 2 */}
              <div className="border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden">
                <div className="p-6 pb-3 flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
                  <HarvestSummary
                    harvestMode={harvestMode}
                    quantity={quantity}
                    sellPrice={sellPrice}
                  />
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden p-4 sm:p-6">
              <HarvestModeSelector
                harvestMode={harvestMode}
                onModeChange={setHarvestMode}
              />

              <div className="mt-4">
                <HarvestInputs
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  sellPrice={sellPrice}
                  onSellPriceChange={setSellPrice}
                  harvestMode={harvestMode}
                  maxQuantity={selectedTree.yield}
                />
              </div>

              <div className="mt-4">
                <HarvestSummary
                  harvestMode={harvestMode}
                  quantity={quantity}
                  sellPrice={sellPrice}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end items-center">
              <div className="flex gap-3">
                <Button
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Hủy bỏ
                </Button>
                <Button
                  onClick={handleHarvest}
                  disabled={quantity <= 0}
                  className={`px-6 py-2 font-medium rounded-lg transition-all duration-200 ${
                    quantity <= 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200"
                      : "bg-black text-white hover:bg-gray-800 border border-black"
                  }`}
                >
                  {harvestMode === "sell" ? "Xác nhận bán" : "Xác nhận bán"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
