import React, { useState, useEffect } from "react";
import { classifyItems, calculateTotal } from "../utils/checkoutUtils";
import ContractForm from "./ContractForm";
import OrderSummary from "./OrderSummary";
import LoadingOverlay from "./LoadingOverlay";
import AlertMessage from "./AlertMessage";

type Item = {
  id: string | number;
  name: string;
  image: string;
  price: number | string;
  quantity?: number;
  type?: string;
};

type ModalCheckoutProps = {
  items: Item[];
  onClose: () => void;
  onHideSelectedBar?: () => void;
};

export default function ModalCheckout({ items, ...props }: ModalCheckoutProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [includesIot, setIncludesIot] = useState<boolean>(true);

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
      if (props.onHideSelectedBar) props.onHideSelectedBar();
      const timer = setTimeout(() => {
        setSuccess(null);
        props.onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, props.onClose, props.onHideSelectedBar]);

  const itemsByType = classifyItems(items);
  const total = calculateTotal(items, includesIot, itemsByType.caytrong.length);

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
      if (props.onHideSelectedBar) {
        props.onHideSelectedBar();
      }
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setContractData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center w-screen h-screen">
      {isLoading && <LoadingOverlay />}
      <div className="bg-white rounded-xl w-screen max-w-none h-screen relative flex flex-col p-0 border border-black">
        <AlertMessage type="error" message={error} />
        <AlertMessage type="success" message={success} />
        <button
          className="absolute top-6 right-8 text-black text-2xl z-10 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center border border-black"
          onClick={props.onClose}
        >
          ×
        </button>
        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="flex-[2] p-6 bg-white overflow-y-auto border-r border-black">
            <ContractForm
              contractData={contractData}
              handleInputChange={handleInputChange}
              agreeTerms={agreeTerms}
              setAgreeTerms={setAgreeTerms}
              itemsByType={itemsByType}
              total={total}
            />
          </div>
          <OrderSummary
            itemsByType={itemsByType}
            includesIot={includesIot}
            setIncludesIot={setIncludesIot}
            total={total}
            agreeTerms={agreeTerms}
            isLoading={isLoading}
            contractData={contractData}
            handleCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
