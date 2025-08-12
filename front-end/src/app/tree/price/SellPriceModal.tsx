import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, DollarSign } from "lucide-react";

interface SellPriceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (price: number) => void;
  defaultPrice?: number;
  marketPrice?: number; // thêm prop giá thị trường
  treeName?: string; // thêm tên cây để hiển thị
}

const SellPriceModal: React.FC<SellPriceModalProps> = ({
  open,
  onClose,
  onSubmit,
  defaultPrice = 0,
  marketPrice = 0,
  treeName = "sản phẩm",
}) => {
  const [price, setPrice] = useState<number>(defaultPrice);

  // Đồng bộ lại khi defaultPrice thay đổi
  useEffect(() => {
    setPrice(defaultPrice);
  }, [defaultPrice, open]);

  const handleSubmit = () => {
    onSubmit(price);
    onClose();
  };

  // Tính phần trăm so với giá thị trường
  const getPriceComparison = () => {
    if (marketPrice === 0) return null;
    const percentage = ((price - marketPrice) / marketPrice) * 100;
    return percentage;
  };

  const priceComparison = getPriceComparison();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Đặt giá bán {treeName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Giá thị trường - hiển thị luôn */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">
                Giá thị trường hiện tại
              </span>
            </div>
            <div className="text-lg font-bold text-blue-900">
              {marketPrice > 0
                ? marketPrice.toLocaleString()
                : "Chưa có dữ liệu"}{" "}
              FVT
            </div>
          </div>

          {/* Input giá bán */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Giá bán của bạn (FVT)
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Nhập giá bán (FVT)"
              min={0}
              className="text-lg"
            />
          </div>

          {/* So sánh giá */}
          {priceComparison !== null && marketPrice > 0 && (
            <div
              className={`p-3 rounded-lg border ${
                priceComparison > 0
                  ? "bg-red-50 border-red-200"
                  : priceComparison < 0
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="text-sm">
                <span className="font-medium">So với thị trường: </span>
                <span
                  className={`font-bold ${
                    priceComparison > 0
                      ? "text-red-600"
                      : priceComparison < 0
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {priceComparison > 0 ? "+" : ""}
                  {priceComparison.toFixed(1)}%
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {priceComparison > 0
                  ? "Cao hơn giá thị trường"
                  : priceComparison < 0
                  ? "Thấp hơn giá thị trường"
                  : "Bằng giá thị trường"}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={onClose}>
              Hủy
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SellPriceModal;
