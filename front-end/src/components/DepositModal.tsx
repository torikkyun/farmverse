import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function DepositModal({
  open,
  onOpenChange,
  amount,
  setAmount,
  success,
  error,
  handleDeposit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  setAmount: (v: string) => void;
  success: boolean;
  error: string;
  handleDeposit: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">
        <DialogTitle className="text-2xl font-bold text-black text-center">
          Nạp tiền vào tài khoản
        </DialogTitle>
        <CardContent>
          {success && (
            <Alert
              variant="default"
              className="mb-4 border border-black bg-white text-black"
            >
              <AlertTitle>Thành công</AlertTitle>
              <AlertDescription>
                Bạn đã nạp {amount} FVT vào tài khoản!
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert
              variant="destructive"
              className="mb-4 border border-black bg-white text-black"
            >
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block font-semibold text-black mb-2"
            >
              Số tiền cần nạp (FVT)
            </label>
            <Input
              id="amount"
              type="number"
              min={1}
              placeholder="Nhập số tiền..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-black text-black bg-white"
            />
          </div>
          <Button
            className="w-full bg-black text-white font-bold hover:bg-gray-900 transition"
            onClick={handleDeposit}
          >
            Nạp tiền
          </Button>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}
