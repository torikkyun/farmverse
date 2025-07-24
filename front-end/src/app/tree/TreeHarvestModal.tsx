import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { TreeItem } from "./types";
import Image from "next/image";
import { DollarSign, Package, ShoppingCart, Warehouse, X } from "lucide-react";

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
      <DialogContent className="w-full max-w-6xl bg-white p-0 rounded-2xl overflow-hidden border-2 border-black shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white border border-black hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-black" />
        </button>

        {/* Header */}
        <div className="bg-black text-white px-8 py-5">
          <h2 className="text-2xl font-bold text-center">Thu hoạch sản phẩm</h2>
          <p className="text-center text-gray-300 text-sm mt-1">
            Chọn phương thức xử lý sản phẩm thu hoạch
          </p>
        </div>

        <div className="p-6">
          {/* Tree Info Card - Compact */}
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-300 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={selectedTree.img}
                    alt={selectedTree.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover border-2 border-black"
                  />
                  <div className="absolute -top-1 -right-1 bg-black text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {selectedTree.age}y
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">
                    {selectedTree.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">
                    Loại: {selectedTree.type}
                  </p>
                </div>
              </div>
              <div className="bg-black text-white px-4 py-2 rounded-lg">
                <div className="text-center">
                  <div className="text-xs text-gray-300">
                    Sản lượng khả dụng
                  </div>
                  <div className="text-lg font-bold">
                    {selectedTree.yield} kg
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Mode Selection */}
            <div className="lg:col-span-1">
              <h3 className="text-base font-bold text-black mb-3 border-b border-gray-300 pb-2">
                Phương thức xử lý
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setHarvestMode("sell")}
                  className={`w-full rounded-lg p-3 border-2 transition-all ${
                    harvestMode === "sell"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-black hover:border-black hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <div className="text-left">
                      <div className="font-bold text-sm">Bán ngay</div>
                      <div
                        className={`text-xs ${
                          harvestMode === "sell"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        Nhận FVT
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setHarvestMode("storage")}
                  className={`w-full rounded-lg p-3 border-2 transition-all ${
                    harvestMode === "storage"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-black hover:border-black hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <div className="text-left">
                      <div className="font-bold text-sm">Lưu kho</div>
                      <div
                        className={`text-xs ${
                          harvestMode === "storage"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        Nhận vật phẩm
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <Label className="block text-sm font-bold text-black mb-2">
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
                  className={`w-full h-11 text-base font-semibold rounded-lg border-2 ${
                    !isFarmer
                      ? "bg-gray-100 border-gray-300 cursor-not-allowed text-gray-500"
                      : "bg-white border-black focus:border-black text-black"
                  }`}
                  disabled={!isFarmer}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tối đa: {selectedTree.yield} kg
                </p>
              </div>

              {harvestMode === "sell" && (
                <div>
                  <Label className="block text-sm font-bold text-black mb-2">
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
                    className={`w-full h-11 text-base font-semibold rounded-lg border-2 ${
                      !isFarmer
                        ? "bg-gray-100 border-gray-300 cursor-not-allowed text-gray-500"
                        : "bg-white border-black focus:border-black text-black"
                    }`}
                    disabled={!isFarmer}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Giá thị trường: {(quantity * 15000).toLocaleString()} FVT
                  </p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-bold text-black mb-3 border-b border-gray-300 pb-2 flex items-center gap-2">
                {harvestMode === "sell" ? (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Tóm tắt giao dịch
                  </>
                ) : (
                  <>
                    <Warehouse className="w-4 h-4" />
                    Tóm tắt lưu trữ
                  </>
                )}
              </h4>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600">Số lượng</span>
                    <span className="font-bold text-sm text-black">
                      {quantity} kg
                    </span>
                  </div>

                  {harvestMode === "sell" ? (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600">Đơn giá</span>
                        <span className="text-xs text-black">
                          {quantity > 0
                            ? Math.round(sellPrice / quantity).toLocaleString()
                            : 0}{" "}
                          FVT/kg
                        </span>
                      </div>
                      <div className="border-t border-gray-300 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-black">
                            Tổng thu:
                          </span>
                          <span className="font-bold text-lg text-black">
                            {sellPrice.toLocaleString()} FVT
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600">
                          Giá trị ước tính
                        </span>
                        <span className="text-xs text-black">
                          15,000 FVT/kg
                        </span>
                      </div>
                      <div className="border-t border-gray-300 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-black">
                            Tổng giá trị:
                          </span>
                          <span className="font-bold text-lg text-black">
                            {(quantity * 15000).toLocaleString()} FVT
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 border-t-2 border-gray-300">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600">
              {!isFarmer && "Chỉ chủ trang trại mới có thể thực hiện thu hoạch"}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setOpen(false)}
                className="px-6 py-2 border-2 border-gray-400 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 hover:border-black transition-colors"
              >
                Hủy bỏ
              </Button>
              <Button
                onClick={handleHarvest}
                disabled={quantity <= 0 || !isFarmer}
                className={`px-6 py-2 font-bold rounded-lg transition-all ${
                  quantity <= 0 || !isFarmer
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-300"
                    : "bg-black text-white hover:bg-gray-800 border-2 border-black"
                }`}
              >
                {harvestMode === "sell" ? "Xác nhận bán" : "Xác nhận lưu kho"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
