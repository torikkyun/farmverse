import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { TreeItem } from "./TreeDetailModal";
import Image from "next/image";
import { DollarSign, Package, ShoppingCart, Warehouse } from "lucide-react";

type HarvestMode = "sell" | "storage";

type TreeHarvestModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTree: TreeItem | null;
  onHarvest?: (mode: HarvestMode, quantity: number, price?: number) => void;
  userRole: string;
};

export function TreeHarvestModal({
  open,
  setOpen,
  selectedTree,
  onHarvest,
  userRole,
}: TreeHarvestModalProps) {
  const [harvestMode, setHarvestMode] = useState<HarvestMode>("sell");
  const [quantity, setQuantity] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);

  React.useEffect(() => {
    if (open && selectedTree) {
      setQuantity(selectedTree.yield);
      setSellPrice(selectedTree.yield * 15000);
    }
  }, [open, selectedTree]);

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

  const isFarmer = userRole === "FARMER";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-2xl bg-white dark:bg-black p-0 rounded-2xl overflow-hidden">
        <DialogHeader className="border-b px-6 pt-6 pb-3">
          <DialogTitle className="text-xl font-bold text-black dark:text-white text-center">
            Thu hoạch cây trồng
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-6 px-6 py-6">
          {/* Thông tin cây */}
          <Card className="flex-1 bg-white dark:bg-neutral-900 border-none shadow-none rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-base text-black dark:text-white font-semibold">
                Thông tin cây
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-3 mb-4">
                <Image
                  src={selectedTree.img}
                  alt={selectedTree.name}
                  width={50}
                  height={50}
                  className="rounded-lg border border-neutral-300 dark:border-neutral-700 object-cover"
                />
                <div className="text-center">
                  <div className="font-bold text-lg text-black dark:text-white">
                    {selectedTree.name}
                  </div>
                  <div className="text-green-700 dark:text-green-400 font-medium text-sm">
                    {selectedTree.type}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Tuổi: {selectedTree.age} năm
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 text-center">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Sản lượng dự kiến
                </div>
                <div className="text-lg font-bold text-black dark:text-white">
                  {selectedTree.yield} kg
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chế độ thu hoạch */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="font-semibold text-black dark:text-white text-base text-center">
              Chọn chế độ thu hoạch
            </div>
            <div className="flex gap-2">
              <Button
                variant={harvestMode === "sell" ? "default" : "outline"}
                className={`flex-1 flex flex-row items-center justify-center gap-1 py-2 rounded-lg border text-sm font-semibold ${
                  harvestMode === "sell"
                    ? "bg-black text-white"
                    : "bg-white dark:bg-black text-black dark:text-white"
                }`}
                onClick={() => setHarvestMode("sell")}
              >
                <DollarSign className="w-4 h-4" />
                <span>Bán lại</span>
              </Button>
              <Button
                variant={harvestMode === "storage" ? "default" : "outline"}
                className={`flex-1 flex flex-row items-center justify-center gap-1 py-2 rounded-lg border text-sm font-semibold ${
                  harvestMode === "storage"
                    ? "bg-black text-white"
                    : "bg-white dark:bg-black text-black dark:text-white"
                }`}
                onClick={() => setHarvestMode("storage")}
              >
                <Package className="w-4 h-4" />
                <span>Lấy vật phẩm</span>
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="mb-1 text-black dark:text-white text-sm font-semibold">
                  Số lượng thu hoạch (kg)
                </Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={
                    isFarmer
                      ? (e) => setQuantity(Number(e.target.value))
                      : undefined
                  }
                  min={0}
                  max={selectedTree.yield}
                  className={`bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white text-sm rounded-lg px-3 py-2 ${
                    !isFarmer
                      ? "pointer-events-none opacity-60 border-none"
                      : ""
                  }`}
                  disabled={!isFarmer}
                />
                <div className="text-xs text-neutral-500 mt-1 dark:text-neutral-400">
                  Tối đa: {selectedTree.yield} kg
                </div>
              </div>
              {harvestMode === "sell" && (
                <div>
                  <Label className="mb-1 text-black dark:text-white text-sm font-semibold">
                    Giá bán (FVT)
                  </Label>
                  <Input
                    type="number"
                    value={sellPrice}
                    onChange={
                      isFarmer
                        ? (e) => setSellPrice(Number(e.target.value))
                        : undefined
                    }
                    min={0}
                    className={`bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white text-sm rounded-lg px-3 py-2 ${
                      !isFarmer
                        ? "pointer-events-none opacity-60 border-none"
                        : ""
                    }`}
                    disabled={!isFarmer}
                  />
                  <div className="text-xs text-neutral-500 mt-1 dark:text-neutral-400">
                    Giá đề xuất: {quantity * 15000} FVT ({quantity} kg × 15,000
                    FVT/kg)
                  </div>
                </div>
              )}
              <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <div className="font-semibold mb-2 flex items-center gap-2 text-black dark:text-white text-sm">
                  {harvestMode === "sell" ? (
                    <>
                      <ShoppingCart className="w-3 h-3" />
                      Tóm tắt bán hàng
                    </>
                  ) : (
                    <>
                      <Warehouse className="w-3 h-3" />
                      Tóm tắt lưu kho
                    </>
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Số lượng:</span>
                    <span className="font-medium">{quantity} kg</span>
                  </div>
                  {harvestMode === "sell" ? (
                    <>
                      <div className="flex justify-between">
                        <span>Giá bán:</span>
                        <span className="font-medium">
                          {(sellPrice / quantity || 0).toLocaleString()} FVT/kg
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-1">
                        <span className="font-semibold">Tổng tiền:</span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {(quantity * (sellPrice / quantity || 0)).toLocaleString()} FVT
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>Giá trị ước tính:</span>
                        <span className="font-medium">15,000 FVT/kg</span>
                      </div>
                      <div className="flex justify-between border-t pt-1">
                        <span className="font-semibold">Tổng giá trị:</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {(quantity * 15000).toLocaleString()} FVT
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-3 px-6 pb-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Hủy
          </Button>
          <Button
            onClick={handleHarvest}
            disabled={quantity <= 0 || !isFarmer}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              quantity <= 0 || !isFarmer
                ? "bg-neutral-400 text-white cursor-not-allowed"
                : ""
            }`}
          >
            {harvestMode === "sell" ? "Bán ngay" : "Xác nhận"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
