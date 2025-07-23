import React from "react";
import ItemCard from "./ItemCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "../utils/checkoutUtils";
import { useRouter } from "next/navigation";

type ItemsByType = {
  caytrong: Item[];
  phanbon: Item[];
  other: Item[];
};

type ContractData = {
  lessorName: string;
  lessorAddress: string;
  lessorPhone: string;
  lessorEmail: string;
  lesseeName: string;
  lesseeAddress: string;
  lesseePhone: string;
  lesseeEmail: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  lateFee: string;
  lessorRights: string;
  lesseeRights: string;
  disputeResolution: string;
};

type OrderSummaryProps = {
  itemsByType: ItemsByType;
  includesIot: boolean;
  setIncludesIot: (checked: boolean) => void;
  total: number;
  agreeTerms: boolean;
  isLoading: boolean;
  contractData: ContractData;
  handleCheckout: () => void;
};

export default function OrderSummary({
  itemsByType,
  includesIot,
  setIncludesIot,
  total,
  agreeTerms,
  isLoading,
  contractData,
  handleCheckout,
}: OrderSummaryProps) {
  const router = useRouter();

  const handleCheckoutAndRedirect = () => {
    handleCheckout();
    router.push("/tree");
  };

  return (
    <div className="flex-[1] p-8 bg-gray-100 overflow-y-auto min-w-[400px] max-w-[500px] border-l border-black">
      <h2 className="text-2xl font-bold text-black mb-6">Chi tiết đơn hàng</h2>
      {/* Cây trồng */}
      {itemsByType.caytrong.length > 0 && (
        <div className="mb-6">
          <div className="font-bold text-lg mb-4 text-black bg-gray-200 px-4 py-2 rounded-lg border border-black">
            🌱 Cây trồng (Thuê 1 năm)
          </div>
          {itemsByType.caytrong.map((item: Item) => (
            <ItemCard key={`tree-${item.id}`} item={item} type="tree" />
          ))}
        </div>
      )}
      {/* Phân bón */}
      {itemsByType.phanbon.length > 0 && (
        <div className="mb-6">
          <div className="font-bold text-lg mb-4 text-black bg-gray-200 px-4 py-2 rounded-lg border border-black">
            🌾 Phân bón (Mua)
          </div>
          {itemsByType.phanbon.map((item: Item) => (
            <ItemCard
              key={`fertilizer-${item.id}`}
              item={item}
              type="fertilizer"
            />
          ))}
        </div>
      )}
      {/* Sản phẩm khác */}
      {itemsByType.other.length > 0 && (
        <div className="mb-6">
          <div className="font-bold text-lg mb-4 text-black bg-gray-200 px-4 py-2 rounded-lg border border-black">
            🛒 Sản phẩm khác
          </div>
          {itemsByType.other.map((item: Item) => (
            <ItemCard key={`other-${item.id}`} item={item} type="other" />
          ))}
        </div>
      )}
      {/* IOT checkbox */}
      {itemsByType.caytrong.length > 0 && (
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg border border-black">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={includesIot}
                onCheckedChange={(checked) => setIncludesIot(!!checked)}
                id="iot-checkbox"
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor="iot-checkbox"
                  className="font-bold text-black cursor-pointer mb-2 block"
                >
                  📡 Thiết bị theo dõi IOT
                </label>
                <div className="text-black font-semibold mb-2">
                  +{(itemsByType.caytrong.length * 500).toLocaleString()} FVT
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <div>✓ Theo dõi độ ẩm đất 24/7</div>
                  <div>✓ Cảnh báo nhiệt độ và ánh sáng</div>
                  <div>✓ Thông báo tự động qua app</div>
                  <div>✓ Lịch sử dữ liệu chi tiết</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Chi tiết thanh toán */}
      <div className="bg-white p-6 rounded-lg border-2 border-black mb-6">
        <div className="font-bold text-lg text-black mb-4">
          Chi tiết thanh toán
        </div>
        {Object.entries(itemsByType).map(
          ([type, typeItems]: [string, Item[]]) =>
            typeItems.length > 0 && (
              <div key={type} className="flex justify-between mb-2">
                <span className="text-gray-700">
                  {type === "caytrong"
                    ? "Cây trồng"
                    : type === "phanbon"
                    ? "Phân bón"
                    : "Sản phẩm khác"}{" "}
                  ({typeItems.length}{" "}
                  {type === "caytrong"
                    ? "cây"
                    : type === "phanbon"
                    ? "bao"
                    : "sản phẩm"}
                  ):
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
            )
        )}
        {includesIot && itemsByType.caytrong.length > 0 && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">
              Thiết bị IOT ({itemsByType.caytrong.length} bộ):
            </span>
            <span className="font-semibold text-black">
              {(itemsByType.caytrong.length * 500).toLocaleString()} FVT
            </span>
          </div>
        )}
        <div className="border-t border-black pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-bold text-xl text-black">Tổng cộng:</span>
            <span className="font-bold text-xl text-black">
              {total.toLocaleString()} FVT
            </span>
          </div>
        </div>
      </div>
      {/* Nút xác nhận */}
      <button
        className={`px-6 py-4 rounded-lg font-bold text-white w-full text-lg transition ${
          !agreeTerms ||
          isLoading ||
          !contractData.lesseeName ||
          !contractData.lesseeAddress ||
          !contractData.lesseePhone
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
        onClick={handleCheckoutAndRedirect}
        disabled={
          isLoading ||
          !agreeTerms ||
          !contractData.lesseeName ||
          !contractData.lesseeAddress ||
          !contractData.lesseePhone
        }
      >
        {isLoading ? "Đang xử lý..." : "Ký hợp đồng & Thanh toán"}
      </button>
    </div>
  );
}
