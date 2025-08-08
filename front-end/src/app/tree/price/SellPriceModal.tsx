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

interface SellPriceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (price: number) => void;
  defaultPrice?: number;
}

const SellPriceModal: React.FC<SellPriceModalProps> = ({
  open,
  onClose,
  onSubmit,
  defaultPrice = 0,
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

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nhập giá bán (FVT)</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Nhập giá bán (FVT)"
            min={0}
          />
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
