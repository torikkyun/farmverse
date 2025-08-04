import React from "react";
import { Item } from "../utils/checkoutUtils";

interface Props {
  itemsByTypeWithQuantity: { tree: Item[]; fertilizer: Item[] };
  totalTreeQuantity: number;
  iotPrice: number;
  grandTotal: number;
}

const types = ["tree", "fertilizer"] as const;

export default function PaymentDetails({
  itemsByTypeWithQuantity,
  totalTreeQuantity,
  iotPrice,
  grandTotal,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-black mb-6">
      <div className="font-bold text-lg text-black mb-4">
        Chi tiết thanh toán
      </div>
      {types.map((type) => {
        const typeItems = itemsByTypeWithQuantity[type];
        if (!typeItems.length) return null;
        return (
          <div key={type} className="flex justify-between mb-2">
            <span className="text-gray-700">
              {type === "tree" ? "Cây trồng" : "Phân bón"} (
              {typeItems.reduce((sum, item) => sum + (item.quantity ?? 1), 0)}{" "}
              {type === "tree" ? "cây" : "bao"}):
            </span>
            <span className="font-semibold text-black">
              {typeItems
                .reduce(
                  (sum, item) =>
                    sum +
                    (typeof item.price === "string"
                      ? parseFloat(item.price) * (item.quantity ?? 1)
                      : item.price * (item.quantity ?? 1)),
                  0
                )
                .toLocaleString()}{" "}
              FVT
            </span>
          </div>
        );
      })}
      {itemsByTypeWithQuantity.tree.length > 0 && (
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">
            Thiết bị IOT ({totalTreeQuantity} bộ):
          </span>
          <span className="font-semibold text-black">
            {iotPrice.toLocaleString()} FVT
          </span>
        </div>
      )}
      <div className="border-t border-black pt-3 mt-3">
        <div className="flex justify-between">
          <span className="font-bold text-xl text-black">Tổng cộng:</span>
          <span className="font-bold text-xl text-black">
            {grandTotal.toLocaleString()} FVT
          </span>
        </div>
      </div>
    </div>
  );
}
