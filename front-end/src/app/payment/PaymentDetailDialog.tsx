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

export interface TransactionDetail {
  id: string;
  totalPrice: number;
  type: string;
  transactionHash: string;
  blockNumber: number;
  fromAddress: string;
  toAddress: string;
  details: Array<{
    name: string;
    type: string;
    description: string;
    images: string[];
    price: number;
    details: {
      species: string;
      output: string;
      harvestTime: { start: number; end: number };
      soilType: string;
      pests: string[];
    };
    quantity: number;
    startDate: string;
    endDate: string;
    iot: boolean;
  }>;
  createdAt: string;
}

export const PaymentDetailDialog: React.FC<PaymentDetailDialogProps> = ({
  open,
  setOpen,
  loadingDetail,
  detail,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl p-8">
        {" "}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black mb-2">
            Chi tiết giao dịch
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          {loadingDetail ? (
            <div className="text-center text-gray-500 py-8">
              Đang tải chi tiết giao dịch...
            </div>
          ) : detail ? (
            <div className="space-y-6">
              {/* Tổng quan giao dịch */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <span className="font-semibold text-black text-lg">
                    {detail.type === "PURCHASE"
                      ? "Mua vật phẩm"
                      : detail.type === "DEPOSIT"
                      ? "Nạp tiền"
                      : "Giao dịch"}
                  </span>
                </div>
                <span className="font-bold text-black text-2xl sm:text-xl">
                  {detail.totalPrice} <span className="text-base">FVT</span>
                </span>
              </div>

              {/* Vật phẩm */}
              {detail.details &&
              Array.isArray(detail.details) &&
              detail.details.length > 0 ? (
                <div>
                  <div className="font-semibold text-base mb-2">Vật phẩm:</div>
                  <div className="flex flex-col gap-4">
                    {detail.details.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row gap-4 p-3 rounded-lg border bg-gray-50"
                      >
                        {item.images && item.images.length > 0 && (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-40 h-40 object-cover rounded shadow border" // ảnh to hơn
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-bold text-black text-base mb-1">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 mb-2 italic">
                            {item.description}
                          </div>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                            <div>
                              <span className="font-semibold">Giá:</span>{" "}
                              {item.price} FVT
                            </div>
                            <div>
                              <span className="font-semibold">Số lượng:</span>{" "}
                              {item.quantity}
                            </div>
                            <div>
                              <span className="font-semibold">IoT:</span>{" "}
                              {item.iot ? "Có" : "Không"}
                            </div>
                            <div>
                              <span className="font-semibold">Thời gian:</span>{" "}
                              {new Date(item.startDate).toLocaleDateString(
                                "vi-VN"
                              )}{" "}
                              -{" "}
                              {new Date(item.endDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">Năng suất:</span>{" "}
                              {item.details.output}
                            </div>
                            <div>
                              <span className="font-semibold">Thu hoạch:</span>{" "}
                              Tháng {item.details.harvestTime.start} -{" "}
                              {item.details.harvestTime.end}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Thông tin blockchain */}
              <div className="bg-white border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm">
                <div>
                  <span className="font-semibold">Block Number:</span>{" "}
                  <span className="text-gray-700">
                    {detail.blockNumber ?? "-"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Transaction Hash:</span>{" "}
                  <span className="break-all text-blue-700">
                    {detail.transactionHash ?? "-"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">From:</span>{" "}
                  <span className="break-all text-gray-700">
                    {detail.fromAddress ?? "-"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">To:</span>{" "}
                  <span className="break-all text-gray-700">
                    {detail.toAddress ?? "-"}
                  </span>
                </div>
              </div>
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
};
