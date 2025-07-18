import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Transaction {
  id?: string;
  _id?: string;
  type?: string;
  transactionType?: string;
  item?: string;
  amount: string | number;
  date?: string;
  createdAt?: string;
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
  <Card className="w-full max-w-md border-black/10 shadow-xl bg-white p-7">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-black text-center">
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
          history.map((h) => (
            <div
              key={h.id || h._id}
              className="flex flex-col border-b border-black/10 pb-3 last:border-b-0"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-black">
                  {h.type || h.transactionType || "Giao dịch"}
                </span>
                <span
                  className={`font-bold ${
                    String(h.amount).startsWith("+")
                      ? "text-green-600"
                      : String(h.amount).startsWith("-")
                      ? "text-red-600"
                      : "text-black"
                  }`}
                >
                  {h.amount} FVT
                </span>
              </div>
              {h.item && (
                <div className="text-sm text-gray-700 mb-1">
                  Vật phẩm: {h.item}
                </div>
              )}
              <div className="text-xs text-gray-500">
                {h.date ||
                  (typeof h.createdAt === "string"
                    ? h.createdAt.slice(0, 16).replace("T", " ")
                    : "")}
              </div>
              <Button
                variant="link"
                className="px-0 text-blue-600 hover:underline"
                onClick={() => onShowDetail(h.id || h._id)}
              >
                Xem chi tiết
              </Button>
            </div>
          ))
        )}
      </div>
    </CardContent>
  </Card>
)