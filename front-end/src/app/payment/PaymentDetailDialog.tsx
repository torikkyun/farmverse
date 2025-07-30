import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  X,
  Package,
  Calendar,
  Cpu,
  TrendingUp,
  Hash,
  ArrowRight,
} from "lucide-react";

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
      <DialogContent className="w-[95vw] max-w-none max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="border-b-1 border-black pb-4 mb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-black uppercase tracking-wide">
              CHI TIẾT GIAO DỊCH
            </DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {loadingDetail ? (
            <div className="text-center text-gray-600 py-12 font-medium text-lg">
              <div className="animate-pulse">
                Đang tải chi tiết giao dịch...
              </div>
            </div>
          ) : detail ? (
            <>
              {/* Header thông tin giao dịch */}
              <div className="bg-black text-white p-6 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6" />
                    <span className="font-bold text-xl uppercase tracking-wide">
                      {detail.type === "PURCHASE"
                        ? "MUA VẬT PHẨM"
                        : detail.type === "DEPOSIT"
                        ? "NẠP TIỀN"
                        : "GIAO DỊCH"}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      {detail.totalPrice.toLocaleString()}
                      <span className="text-lg ml-1">FVT</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      {new Date(detail.createdAt).toLocaleString("vi-VN")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Danh sách vật phẩm */}
              {detail.details &&
                Array.isArray(detail.details) &&
                detail.details.length > 0 && (
                  <div>
                    <h3 className="font-bold text-xl text-black mb-4 uppercase tracking-wide border-b-2 border-black pb-2">
                      DANH SÁCH VẬT PHẨM
                    </h3>
                    <div className="space-y-4">
                      {detail.details.map((item, idx) => (
                        <div
                          key={idx}
                          className="border-2 border-black rounded-lg bg-white hover:bg-gray-50 transition-colors overflow-hidden"
                        >
                          <div className="flex flex-col lg:flex-row">
                            {/* Hình ảnh */}
                            {item.images && item.images.length > 0 && (
                              <div className="lg:w-48 flex-shrink-0">
                                <img
                                  src={item.images[0]}
                                  alt={item.name}
                                  className="w-full h-48 lg:h-full object-cover"
                                />
                              </div>
                            )}

                            {/* Thông tin chi tiết */}
                            <div className="flex-1 p-6">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                                <div>
                                  <h4 className="font-bold text-xl text-black mb-2">
                                    {item.name}
                                  </h4>
                                  <p className="text-gray-600 text-sm italic">
                                    {item.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-2xl text-black">
                                    {item.price.toLocaleString()} FVT
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    x{item.quantity}{" "}
                                    {item.type === "tree" ? "cây" : "bao"}
                                  </div>
                                </div>
                              </div>

                              {/* Grid thông tin */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                                  <Cpu className="w-4 h-4 text-black" />
                                  <div>
                                    <div className="text-xs text-gray-600 uppercase">
                                      IoT
                                    </div>
                                    <div className="font-semibold">
                                      {item.iot ? "Có" : "Không"}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                                  <TrendingUp className="w-4 h-4 text-black" />
                                  <div>
                                    <div className="text-xs text-gray-600 uppercase">
                                      Năng suất
                                    </div>
                                    <div className="font-semibold">
                                      {item.details.output}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                                  <Calendar className="w-4 h-4 text-black" />
                                  <div>
                                    <div className="text-xs text-gray-600 uppercase">
                                      Thu hoạch
                                    </div>
                                    <div className="font-semibold">
                                      Tháng {item.details.harvestTime.start} -{" "}
                                      {item.details.harvestTime.end}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Thời gian hợp đồng */}
                              <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                                <div className="flex items-center justify-center gap-2 text-sm">
                                  <span className="font-semibold">
                                    {new Date(
                                      item.startDate
                                    ).toLocaleDateString("vi-VN")}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-gray-600" />
                                  <span className="font-semibold">
                                    {new Date(item.endDate).toLocaleDateString(
                                      "vi-VN"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Thông tin Blockchain */}
              <div className="border-2 border-black rounded-lg bg-gray-50 p-6">
                <h3 className="font-bold text-xl text-black mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  THÔNG TIN BLOCKCHAIN
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 uppercase mb-1">
                        Block Number
                      </div>
                      <div className="font-mono text-sm bg-white p-2 rounded border">
                        {detail.blockNumber ?? "-"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase mb-1">
                        From Address
                      </div>
                      <div className="font-mono text-sm bg-white p-2 rounded border break-all">
                        {detail.fromAddress ?? "-"}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 uppercase mb-1">
                        Transaction Hash
                      </div>
                      <div className="font-mono text-sm bg-white p-2 rounded border break-all text-blue-600">
                        {detail.transactionHash ?? "-"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase mb-1">
                        To Address
                      </div>
                      <div className="font-mono text-sm bg-white p-2 rounded border break-all">
                        {detail.toAddress ?? "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <div className="text-lg font-medium">
                Không tìm thấy thông tin chi tiết giao dịch
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
