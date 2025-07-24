import { TreeItem } from "../types";

export type HarvestMode = "sell" | "storage";

export type TreeHarvestModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTree: TreeItem | null;
  onHarvest?: (mode: HarvestMode, quantity: number, price?: number) => void;
};

export type HarvestData = {
  mode: HarvestMode;
  quantity: number;
  sellPrice: number;
  maxQuantity: number;
};
