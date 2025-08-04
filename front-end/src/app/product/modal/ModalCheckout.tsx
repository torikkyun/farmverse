import React, { useState, useEffect } from "react";
import { classifyItems, calculateTotal } from "../utils/checkoutUtils";
import ContractForm from "../components/ContractForm";
import OrderSummary from "../components/OrderSummary";
import LoadingOverlay from "../ui/LoadingOverlay";
import AlertMessage from "../ui/AlertMessage";
import { FarmItem, Farm } from "../[slug]/types";

interface ModalCheckoutProps {
  items: FarmItem[];
  totalQuantity: number;
  onClose: () => void;
  onHideSelectedBar?: () => void;
  farm: Farm;
}

export default function ModalCheckout({
  items,
  onClose,
  totalQuantity,
  onHideSelectedBar,
  farm,
}: ModalCheckoutProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [includesIot, setIncludesIot] = useState<boolean>(true);
  const [lesseeSignature, setLesseeSignature] = useState<string | null>(null);

  const [contractData, setContractData] = useState({
    lessorName: "FarmVerse Co., Ltd",
    lessorAddress: "123 Blockchain Street, Crypto City",
    lessorPhone: "0123-456-789",
    lessorEmail: "contact@farmverse.io",
    lesseeName: "",
    lesseeAddress: "",
    lesseePhone: "",
    lesseeEmail: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0],
    paymentMethod: "FarmVerse Token (FVT)",
    lateFee: "5% giá trị hợp đồng/tháng",
    lessorRights:
      "Yêu cầu thanh toán đúng hạn, Kiểm tra tình trạng cây định kỳ, Thu hồi cây khi hết hạn hợp đồng",
    lesseeRights:
      "Chăm sóc và thu hoạch sản phẩm, Sử dụng thiết bị IoT theo dõi, Được hỗ trợ kỹ thuật từ FarmVerse",
    disputeResolution:
      "Mọi tranh chấp sẽ được giải quyết thông qua trọng tài blockchain hoặc tòa án có thẩm quyền.",
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      if (onHideSelectedBar) onHideSelectedBar(); // Sử dụng destructured prop
      const timer = setTimeout(() => {
        setSuccess(null);
        onClose(); // Sử dụng destructured prop
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose, onHideSelectedBar]);

  const itemsWithType = items.map((item) => ({
    ...item,
    type: item.type || "TREE", // hoặc logic xác định type phù hợp
  }));

  const itemsByType = classifyItems(itemsWithType);
  const total = calculateTotal(
    itemsWithType,
    includesIot,
    itemsByType.tree.length
  );

  const handleCheckout = async () => {
    if (!agreeTerms) {
      setError("Vui lòng đồng ý với điều khoản hợp đồng!");
      return;
    }
    if (
      !contractData.lesseeName ||
      !contractData.lesseeAddress ||
      !contractData.lesseePhone
    ) {
      setError("Vui lòng điền đầy đủ thông tin bên thuê!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setSuccess("Hợp đồng đã được ký thành công!");
      setIsLoading(false);
      if (onHideSelectedBar) {
        // Sử dụng destructured prop
        onHideSelectedBar();
      }
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setContractData((prev) => ({ ...prev, [field]: value }));
  };

  // Tạo selectedItems từ items (chỉ lấy id và quantity)
  const selectedItems = items.map((item) => ({
    id: item.id,
    quantity: item.quantity ?? 1,
  }));

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center w-screen h-screen">
      {isLoading && <LoadingOverlay />}
      <div className="bg-white rounded-xl w-screen max-w-none h-screen relative flex flex-col p-0 border border-black">
        <AlertMessage type="error" message={error} />
        <AlertMessage type="success" message={success} />
        <button
          className="absolute top-6 right-8 text-black text-2xl z-10 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center border border-black"
          onClick={onClose} // Sử dụng destructured prop
        >
          ×
        </button>
        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="flex-[2] p-6 bg-white overflow-y-auto border-r border-black">
            <ContractForm
              farm={farm}
              contractData={contractData}
              handleInputChange={handleInputChange}
              agreeTerms={agreeTerms}
              setAgreeTerms={setAgreeTerms}
              itemsByType={itemsByType}
              total={total}
              totalQuantity={totalQuantity}
              setLesseeSignature={setLesseeSignature}
              lesseeSignature={lesseeSignature}
            />
          </div>
          <OrderSummary
            itemsByType={itemsByType}
            includesIot={includesIot}
            selectedItems={selectedItems}
            setIncludesIot={setIncludesIot}
            total={total}
            agreeTerms={agreeTerms}
            isLoading={isLoading}
            contractData={contractData}
            handleCheckout={handleCheckout}
            lesseeSignature={lesseeSignature ?? undefined}
            farm={farm}
          />
        </div>
      </div>
    </div>
  );
}
