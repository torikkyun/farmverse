import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Wallet,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Plus,
  Info,
} from "lucide-react";

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
        {/* Header */}
        <div className="bg-black text-white rounded-t-lg px-3 py-1">
          <div className="flex items-center justify-center mb-2">
            <Wallet className="w-8 h-8" />
            <DialogTitle className="text-2xl uppercase tracking-wide">
              NẠP TIỀN
            </DialogTitle>
          </div>
          <p className="text-center text-gray-300 text-sm">
            Nạp FVT vào tài khoản của bạn
          </p>
        </div>

        <CardContent className="p-6">
          {/* Success Alert */}
          {success && (
            <Alert className="mb-4 border-2 border-green-500 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertTitle className="text-green-800 font-bold">
                Thành công!
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Bạn đã nạp <span className="font-bold">{amount} FVT</span> vào
                tài khoản!
              </AlertDescription>
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert className="mb-4 border-2 border-red-500 bg-red-50">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertTitle className="text-red-800 font-bold">Lỗi!</AlertTitle>
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Amount Input */}
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block font-bold text-black mb-3 uppercase tracking-wide text-sm"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Số tiền cần nạp (FVT)
              </div>
            </label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                min={1}
                placeholder="Nhập số tiền..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-2 border-black text-black bg-white font-semibold text-lg h-12 pl-4 pr-16 focus:ring-2 focus:ring-gray-400"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                FVT
              </div>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Số tiền thông dụng:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[100, 500, 1000].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-black hover:bg-gray-100 text-black font-semibold"
                  onClick={() => setAmount(quickAmount.toString())}
                >
                  {quickAmount} FVT
                </Button>
              ))}
            </div>
          </div>

          {/* Deposit Button */}
          <Button
            className="w-full bg-black text-white font-bold hover:bg-gray-800 transition-colors h-12 text-lg uppercase tracking-wide flex items-center justify-center gap-2"
            onClick={handleDeposit}
            disabled={!amount || parseInt(amount) <= 0}
          >
            <Plus className="w-5 h-5" />
            Nạp tiền ngay
          </Button>

          {/* Info Note */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-300">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <Info className="w-4 h-4 text-blue-600" />
              <span>
                <strong>Lưu ý:</strong> Giao dịch sẽ được xử lý trong vòng 1-2
                phút
              </span>
            </div>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}
