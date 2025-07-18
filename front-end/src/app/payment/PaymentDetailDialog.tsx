import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentDetailDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  loadingDetail: boolean;
  detail: TransactionDetail | null;
}

// Đầu file, thêm interface cho item nếu chưa có:
export interface TransactionDetail {
  id: string;
  buyer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    fvtBalance: number;
  };
  totalPrice: number;
  type: string;
  transactionHash: string;
  blockNumber: number;
  fromAddress: string;
  toAddress: string;
  items: Array<{
    itemId: string;
    name: string;
    description: string;
    images: string[];
    quantity: number;
    price: number;
    type: string;
    includesIot: boolean;
    startDate: string;
    endDate: string;
  }>;
  timestamp?: string;
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
                {detail.type === "PURCHASE"
                  ? "Mua vật phẩm"
                  : detail.type === "DEPOSIT"
                  ? "Bán vật phẩm"
                  : "Giao dịch"}
              </span>
              <span
                className={`font-bold ${
                  String(detail.totalPrice).startsWith("+")
                    ? "text-green-600"
                    : String(detail.totalPrice).startsWith("-")
                    ? "text-red-600"
                    : "text-black"
                }`}
              >
                {detail.totalPrice} FVT
              </span>
            </div>
            {detail?.items &&
            Array.isArray(detail.items) &&
            detail.items.length > 0 ? (
              <div>
                <span className="font-semibold">Vật phẩm:</span>
                <ul className="list-disc ml-6">
                  {detail.items.map((item) => (
                    <li key={item.itemId}>
                      {item.name} - {item.quantity} x {item.price} FVT
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="text-xs text-gray-500">
              {detail.timestamp
                ? new Date(detail.timestamp).toLocaleString("vi-VN")
                : ""}
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
);
