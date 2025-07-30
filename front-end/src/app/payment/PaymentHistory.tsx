import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  <Card className="w-full border-black/10 shadow-xl bg-white p-7">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-black text-center mb-2">
        Lịch sử giao dịch
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {loadingHistory ? (
          <div className="text-center text-gray-500 py-8">
            Đang tải lịch sử...
          </div>
        ) : history.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Chưa có giao dịch nào.
          </div>
        ) : (
          history.map((h) => {
            const firstItemName =
              Array.isArray(h.details) && h.details.length > 0
                ? h.details[0].name
                : undefined;
            return (
              <div
                key={h.id || h._id}
                className="flex flex-col gap-1 rounded-xl border border-black/5 bg-gray-50 hover:bg-gray-100 transition p-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="font-semibold text-black text-base uppercase tracking-wide">
                    {h.type === "PURCHASE" || h.transactionType === "PURCHASE"
                      ? "Mua vật phẩm"
                      : h.type === "DEPOSIT" || h.transactionType === "DEPOSIT"
                      ? "Nạp tiền"
                      : h.type || h.transactionType || "Giao dịch"}
                  </span>
                  <span
                    className={`font-bold text-lg ${
                      h.type === "PURCHASE" || h.transactionType === "PURCHASE"
                        ? "text-red-600"
                        : h.type === "DEPOSIT" ||
                          h.transactionType === "DEPOSIT"
                        ? "text-green-600"
                        : String(h.amount ?? h.totalPrice ?? "").startsWith("+")
                        ? "text-green-600"
                        : String(h.amount ?? h.totalPrice ?? "").startsWith("-")
                        ? "text-red-600"
                        : "text-black"
                    }`}
                  >
                    {h.totalPrice !== undefined ? `${h.totalPrice} ` : ""}
                    {h.amount !== undefined ? h.amount : ""} FVT
                  </span>
                </div>
                {firstItemName && (
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">Vật phẩm:</span>{" "}
                    {firstItemName}
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  {h.date ||
                    (typeof h.createdAt === "string"
                      ? new Date(h.createdAt).toLocaleString("vi-VN")
                      : "")}
                </div>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    className="px-3 py-1 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-900 transition rounded"
                    onClick={() => onShowDetail(h.id || h._id)}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </CardContent>
  </Card>
);
