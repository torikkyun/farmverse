import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "./PaymentHistory";

interface PaymentDetailDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  loadingDetail: boolean;
  detail: Transaction | null;
}

export const PaymentDetailDialog: React.FC<PaymentDetailDialogProps> = ({
  open,
  setOpen,
  loadingDetail,
  detail,
}) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-2xl p-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-black">
          Chi tiết giao dịch
        </DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        {loadingDetail ? (
          <div className="text-center text-gray-500 py-8">
            Đang tải chi tiết giao dịch...
          </div>
        ) : detail ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-black">
                {detail.type || detail.transactionType || "Giao dịch"}
              </span>
              <span
                className={`font-bold ${
                  String(detail.amount).startsWith("+")
                    ? "text-green-600"
                    : String(detail.amount).startsWith("-")
                    ? "text-red-600"
                    : "text-black"
                }`}
              >
                {detail.amount} FVT
              </span>
            </div>
            {detail.item && (
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Vật phẩm:</span>{" "}
                {detail.item}
              </div>
            )}
            <div className="text-xs text-gray-500">
              {detail.date ||
                (typeof detail.createdAt === "string"
                  ? detail.createdAt.slice(0, 16).replace("T", " ")
                  : "")}
            </div>
            {/* Thêm thông tin chi tiết khác ở đây nếu cần */}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Không tìm thấy thông tin chi tiết giao dịch.
          </div>
        )}
      </div>
    </DialogContent>
  </Dialog>
)