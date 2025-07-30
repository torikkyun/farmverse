import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Wallet, BarChart3, FileText } from "lucide-react";

export interface Transaction {
  id?: string;
  _id?: string;
  type?: string;
  transactionType?: string;
  item?: string;
  totalPrice?: string | number;
  amount: string | number;
  date?: string;
  createdAt?: string;
  details?: Array<{ name: string }>;
  [key: string]: unknown;
}

interface PaymentHistoryProps {
  history: Transaction[];
  loadingHistory: boolean;
  onShowDetail: (transactionId?: string) => void;
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  history,
  loadingHistory,
  onShowDetail,
}) => (
  <Card className="w-full shadow-2xl bg-white">
    <CardHeader className="border-b-1 border-black bg-black text-white">
      <CardTitle className="text-2xl font-bold text-center">
        LỊCH SỬ GIAO DỊCH
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-4">
        {loadingHistory ? (
          <div className="text-center text-gray-600 py-12 font-medium text-lg">
            Đang tải lịch sử giao dịch...
          </div>
        ) : history.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <div className="text-lg font-medium">Chưa có giao dịch nào</div>
            <div className="text-sm text-gray-500 mt-2">
              Giao dịch của bạn sẽ hiển thị tại đây
            </div>
          </div>
        ) : (
          history.map((h) => {
            const firstItemName =
              Array.isArray(h.details) && h.details.length > 0
                ? h.details[0].name
                : undefined;

            const isPurchase =
              h.type === "PURCHASE" || h.transactionType === "PURCHASE";
            const isDeposit =
              h.type === "DEPOSIT" || h.transactionType === "DEPOSIT";

            return (
              <div
                key={h.id || h._id}
                className="border-2 border-black rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 p-5 shadow-lg hover:shadow-xl"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isPurchase ? (
                        <ShoppingCart className="w-6 h-6 text-black" />
                      ) : isDeposit ? (
                        <Wallet className="w-6 h-6 text-black" />
                      ) : (
                        <BarChart3 className="w-6 h-6 text-black" />
                      )}
                      <span className="font-bold text-black text-lg uppercase tracking-wide">
                        {isPurchase
                          ? "MUA VẬT PHẨM"
                          : isDeposit
                          ? "NẠP TIỀN"
                          : "GIAO DỊCH"}
                      </span>
                    </div>
                    {firstItemName && (
                      <div className="text-gray-700 mb-2">
                        <span className="font-semibold">Sản phẩm:</span>{" "}
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {firstItemName}
                        </span>
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      {h.date ||
                        (typeof h.createdAt === "string"
                          ? new Date(h.createdAt).toLocaleString("vi-VN")
                          : "")}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-bold text-2xl mb-2 ${
                        isPurchase
                          ? "text-red-600"
                          : isDeposit
                          ? "text-green-600"
                          : "text-black"
                      }`}
                    >
                      {isPurchase ? "-" : isDeposit ? "+" : ""}
                      {h.totalPrice !== undefined ? h.totalPrice : h.amount} FVT
                    </div>

                    <Button
                      variant="outline"
                      className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200 font-semibold"
                      onClick={() => onShowDetail(h.id || h._id)}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </CardContent>
  </Card>
);
