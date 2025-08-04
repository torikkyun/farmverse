import React, { useState, useEffect } from "react";
import ItemCard from "../items/ItemCard";
import PaymentDetails from "../order/PaymentDetails";
import { Item } from "../utils/checkoutUtils";
import LoadingOverlay from "../ui/LoadingOverlay";
import AlertMessage from "../ui/AlertMessage";
import {
  getItemsByTypeWithQuantity,
  calcGrandTotal,
} from "../order/orderUtils";
import { useCheckout } from "../order/useCheckout";

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
  itemsByType: { tree: Item[]; fertilizer: Item[] };
  selectedItems: { id: string; quantity: number }[];
  total: number;
  agreeTerms: boolean;
  isLoading: boolean;
  contractData: ContractData;
  handleCheckout: () => Promise<void>;
  farm: Farm;
  includesIot?: boolean;
  setIncludesIot?: (checked: boolean) => void;
  lesseeSignature?: string;
};

interface Farm {
  name: string;
  address: {
    houseNumber?: string;
    street?: string;
    commune?: string;
    province?: string;
    city?: string;
  };
  user?: { email?: string };
  signatureUrl?: string;
}

export default function OrderSummary({
  itemsByType,
  selectedItems,
  agreeTerms,
  contractData,
  lesseeSignature,
  farm,
}: OrderSummaryProps) {
  const [iotSelections, setIotSelections] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIotSelections((prev) => {
      const newSelections: { [id: string]: boolean } = {};
      itemsByType.tree.forEach((item) => {
        newSelections[item.id] = prev[item.id] ?? false;
      });
      return newSelections;
    });
  }, [itemsByType.tree]);

  const itemsByTypeWithQuantity = getItemsByTypeWithQuantity(
    itemsByType,
    selectedItems
  );
  const { totalTreeQuantity, iotPrice, grandTotal } = calcGrandTotal(
    itemsByTypeWithQuantity.tree,
    itemsByTypeWithQuantity.fertilizer
  );

  const handleCheckoutAndRedirect = useCheckout({
    itemsByTypeWithQuantity,
    totalTreeQuantity,
    grandTotal,
    iotSelections,
    contractData,
    lesseeSignature,
    farm,
    setAlert,
    setLoading,
  });

  const handleIotChange = (id: string, checked: boolean) => {
    setIotSelections((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="flex-[1] p-8 bg-gray-100 overflow-y-auto min-w-[400px] max-w-[500px] border-l border-black">
      {loading && <LoadingOverlay />}
      <AlertMessage
        type={alert?.type ?? "success"}
        message={alert?.message ?? null}
      />
      <h2 className="text-2xl font-bold text-black mb-6">Chi tiết đơn hàng</h2>
      {/* Cây trồng */}
      {itemsByType.tree.length > 0 && (
        <div className="mb-6">
          {itemsByTypeWithQuantity.tree.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              type="tree"
              quantity={item.quantity ?? 1}
              includesIot={!!iotSelections[item.id]}
              setIncludesIot={(checked) => handleIotChange(item.id, checked)}
            />
          ))}
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
            />
          ))}
        </div>
      )}
      {/* Chi tiết thanh toán */}
      <PaymentDetails
        itemsByTypeWithQuantity={itemsByTypeWithQuantity}
        totalTreeQuantity={totalTreeQuantity}
        iotPrice={iotPrice}
        grandTotal={grandTotal}
      />
      {/* Nút xác nhận */}
      {itemsByType.tree.length > 0 && (
        <button
          className={`px-6 py-4 rounded-lg font-bold text-white w-full text-lg transition ${
            !agreeTerms ||
            loading ||
            !contractData.lesseeName ||
            !contractData.lesseeAddress ||
            !contractData.lesseePhone
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
          onClick={handleCheckoutAndRedirect}
          disabled={
            loading ||
            !agreeTerms ||
            !contractData.lesseeName ||
            !contractData.lesseeAddress ||
            !contractData.lesseePhone
          }
        >
          {loading ? "Đang xử lý..." : "Xác nhận"}
        </button>
      )}
      {itemsByType.tree.length === 0 && itemsByType.fertilizer.length > 0 && (
        <button className="px-6 py-4 rounded-lg font-bold text-white w-full text-lg bg-black hover:bg-gray-800 transition">
          Thanh toán
        </button>
      )}
    </div>
  );
}
