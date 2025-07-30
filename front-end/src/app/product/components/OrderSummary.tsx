import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
// import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "../utils/checkoutUtils";
import { useRouter } from "next/navigation";

// type ItemsByType = {
//   tree: Item[];
//   fertilizer: Item[];
// };

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
  itemsByType: {
    tree: Item[];
    fertilizer: Item[];
  };
  selectedItems: { id: string; quantity: number }[]; // <-- thêm dòng này
  total: number;
  agreeTerms: boolean;
  isLoading: boolean;
  contractData: ContractData;
  handleCheckout: () => Promise<void>;
  // Thêm 2 dòng dưới nếu bạn truyền props này từ ModalCheckout
  includesIot?: boolean;
  setIncludesIot?: (checked: boolean) => void;
};

export default function OrderSummary({
  itemsByType,
  selectedItems,
  agreeTerms,
  isLoading,
  contractData,
  handleCheckout,
}: OrderSummaryProps) {
  const router = useRouter();

  // State lưu trạng thái IOT cho từng cây
  const [iotSelections, setIotSelections] = useState<{ [id: string]: boolean }>(
    {}
  );

  // Khi danh sách cây thay đổi, tự động cập nhật iotSelections
  useEffect(() => {
    setIotSelections((prev) => {
      const newSelections: { [id: string]: boolean } = {};
      itemsByType.tree.forEach((item) => {
        newSelections[item.id] = prev[item.id] ?? false;
      });
      return newSelections;
    });
  }, [itemsByType.tree]);

  // Tạo state lưu danh sách cây với quantity
  // const [treeItems, setTreeItems] = useState<Item[]>(itemsByType.tree);

  // Hàm cập nhật số lượng
  // const handleQuantityChange = (id: string, newQuantity: number) => {
  //   setTreeItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  const handleIotChange = (id: string, checked: boolean) => {
    setIotSelections((prev) => ({ ...prev, [id]: checked }));
  };

  const handleCheckoutAndRedirect = () => {
    handleCheckout();
    router.push("/tree");
  };

  // Tạo lại object itemsByType nhưng quantity đúng
  const itemsByTypeWithQuantity = {
    tree: selectedItems
      .map((sel) => {
        const item = itemsByType.tree.find((i) => i.id === sel.id);
        return item ? { ...item, quantity: sel.quantity } : null;
      })
      .filter(Boolean) as Item[],
    fertilizer: selectedItems
      .map((sel) => {
        const item = itemsByType.fertilizer.find((i) => i.id === sel.id);
        return item ? { ...item, quantity: sel.quantity } : null;
      })
      .filter(Boolean) as Item[],
  };

  const totalTreeQuantity = itemsByTypeWithQuantity.tree.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  // Tính tổng giá trị của cây trồng và phân bón
  const totalTreePrice = itemsByTypeWithQuantity.tree.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "string"
        ? parseFloat(item.price) * (item.quantity ?? 1)
        : item.price * (item.quantity ?? 1)),
    0
  );

  const totalFertilizerPrice = itemsByTypeWithQuantity.fertilizer.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "string"
        ? parseFloat(item.price) * (item.quantity ?? 1)
        : item.price * (item.quantity ?? 1)),
    0
  );

  const iotPrice = totalTreeQuantity * 500;

  const grandTotal = totalTreePrice + totalFertilizerPrice + iotPrice;

  // console.log("selectedItems:", selectedItems);
  // console.log("itemsByType:", itemsByType);
  // console.log("itemsByTypeWithQuantity:", itemsByTypeWithQuantity);

  return (
    <div className="flex-[1] p-8 bg-gray-100 overflow-y-auto min-w-[400px] max-w-[500px] border-l border-black">
      <h2 className="text-2xl font-bold text-black mb-6">Chi tiết đơn hàng</h2>
      {/* Cây trồng */}
      {itemsByType.tree.length > 0 && (
        <div className="mb-6">
          {itemsByTypeWithQuantity.tree.map((item) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                type="tree"
                quantity={item.quantity ?? 1}
                includesIot={!!iotSelections[item.id]}
                setIncludesIot={(checked) => handleIotChange(item.id, checked)}
              />
            );
          })}
        </div>
      )}
      {/* Phân bón */}
      {itemsByType.fertilizer.length > 0 && (
        <div className="mb-6">
          {itemsByTypeWithQuantity.fertilizer.map((item) => (
            <ItemCard
              key={`fertilizer-${item.id}`}
              item={item}
              type="fertilizer"
              quantity={item.quantity ?? 1}
              // onQuantityChange={(newQuantity) =>
              //   handleQuantityChange(item.id, newQuantity)
              // }
            />
          ))}
        </div>
      )}
      {/* IOT checkbox */}
      {/* {itemsByType.tree.length > 0 && (
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
                  +{(itemsByType.tree.length * 500).toLocaleString()} FVT
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
      )} */}
      {/* Chi tiết thanh toán */}
      <div className="bg-white p-6 rounded-lg border-2 border-black mb-6">
        <div className="font-bold text-lg text-black mb-4">
          Chi tiết thanh toán
        </div>
        {Object.entries(itemsByTypeWithQuantity).map(
          ([type, typeItems]: [string, Item[]]) =>
            typeItems.length > 0 && (
              <div key={type} className="flex justify-between mb-2">
                <span className="text-gray-700">
                  {type === "tree"
                    ? "Cây trồng"
                    : type === "fertilizer"
                    ? "Phân bón"
                    : "Sản phẩm khác"}{" "}
                  (
                  {typeItems.reduce(
                    (sum, item) => sum + (item.quantity ?? 1),
                    0
                  )}{" "}
                  {type === "tree"
                    ? "cây"
                    : type === "fertilizer"
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
        {itemsByType.tree.length > 0 && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">
              Thiết bị IOT ({totalTreeQuantity} bộ):
            </span>
            <span className="font-semibold text-black">
              {(totalTreeQuantity * 500).toLocaleString()} FVT
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
        {isLoading ? "Đang xử lý..." : "Xác nhận"}
      </button>
    </div>
  );
}
