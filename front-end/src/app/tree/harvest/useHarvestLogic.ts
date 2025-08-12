import { useState, useEffect } from "react";
import { TreeItem } from "../types";
import { HarvestMode } from "./types";

export function useHarvestLogic(
  open: boolean,
  selectedTree: TreeItem | null,
  initialSellPrice: number = 0 // thêm tham số này
) {
  const [harvestMode, setHarvestMode] = useState<HarvestMode>("sell");
  const [quantity, setQuantity] = useState(0);
  const [sellPrice, setSellPrice] = useState(initialSellPrice);

  useEffect(() => {
    if (open && selectedTree) {
      setQuantity(selectedTree.yield);
      setSellPrice(initialSellPrice || selectedTree.yield * 15000); // ưu tiên giá từ ngoài vào
    }
  }, [open, selectedTree, initialSellPrice]);

  const handleQuantityChange = (newQuantity: number) => {
    if (!selectedTree) return;
    const clampedQuantity = Math.min(
      Math.max(0, newQuantity),
      selectedTree.yield
    );
    setQuantity(clampedQuantity);

    if (harvestMode === "sell") {
      setSellPrice(clampedQuantity * 15000);
    }
  };

  const handleModeChange = (mode: HarvestMode) => {
    setHarvestMode(mode);
    if (mode === "sell") {
      setSellPrice(quantity * 15000);
    }
  };

  return {
    harvestMode,
    quantity,
    sellPrice,
    setHarvestMode: handleModeChange,
    setQuantity: handleQuantityChange,
    setSellPrice,
  };
}
