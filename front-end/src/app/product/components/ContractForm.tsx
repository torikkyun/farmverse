import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "../utils/checkoutUtils";
import { Farm } from "../[slug]/types";
import ContractLesseeFields from "../contract/ContractLesseeFields";
import ContractTerms from "../contract/ContractTerms";
import ContractSignature from "../contract/ContractSignature";

type ItemsByType = { tree: Item[]; fertilizer: Item[] };
type ContractData = { [key: string]: string };

interface ContractFormProps {
  farm: Farm;
  contractData: ContractData;
  handleInputChange: (field: string, value: string) => void;
  agreeTerms: boolean;
  setAgreeTerms: (v: boolean) => void;
  itemsByType: ItemsByType;
  totalQuantity: number;
  total: number;
  setLesseeSignature: React.Dispatch<React.SetStateAction<string | null>>;
  lesseeSignature?: string | null;
}

export default function ContractForm({
  farm,
  contractData,
  handleInputChange,
  agreeTerms,
  setAgreeTerms,
  itemsByType,
  // totalQuantity,
  total,
  setLesseeSignature,
  lesseeSignature,
}: ContractFormProps) {
  const itemsByTypeWithQuantity = {
    tree: Array.isArray(itemsByType.tree)
      ? itemsByType.tree.filter((item) => (item.quantity ?? 0) > 0)
      : [],
    fertilizer: Array.isArray(itemsByType.fertilizer)
      ? itemsByType.fertilizer.filter((item) => (item.quantity ?? 0) > 0)
      : [],
  };

  const totalTreeQuantity = itemsByTypeWithQuantity.tree.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );
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
  const contractTotal = totalTreePrice + totalFertilizerPrice + iotPrice;

  const hasTree =
    Array.isArray(itemsByType.tree) &&
    itemsByType.tree.some((item) => (item.quantity ?? 0) > 0);

  if (!hasTree) {
    return (
      <div className="w-full px-2 overflow-x-hidden">
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase text-black">
            MUA VẬT PHẨM
          </h1>
          <p className="text-base mt-2 text-black">
            Bạn đang mua các vật phẩm sau:
          </p>
        </div>
        <ul className="text-base space-y-1 list-disc list-inside text-black mb-6">
          {itemsByType.fertilizer.map((item) => (
            <li key={item.id}>
              {item.name} - Số lượng: {item.quantity ?? 1} - Giá:{" "}
              {item.price.toLocaleString()} FVT
            </li>
          ))}
        </ul>
        <div className="mb-6">
          <span className="font-semibold text-lg">
            Tổng: {total.toLocaleString()} FVT
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 overflow-x-hidden">
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase text-black">
          HỢP ĐỒNG THUÊ CÂY
        </h1>
        <p className="text-base mt-2 text-black">
          Căn cứ Bộ luật Dân sự năm 2015 và các văn bản pháp luật có liên quan,
          hai bên cùng thỏa thuận ký kết hợp đồng như sau:
        </p>
      </div>
      {/* Bên cho thuê */}
      <div className="mb-6">
        <h3 className="font-bold text-black mb-3 text-lg">
          BÊN CHO THUÊ (BÊN A):
        </h3>
        <div className="space-y-2 text-base text-black">
          <div>
            Tên nông trại: <span className="font-semibold">{farm.name}</span>
          </div>
          <div>
            Địa chỉ:{" "}
            <span className="font-semibold">
              {[
                farm.address.houseNumber,
                farm.address.street,
                farm.address.commune,
                farm.address.province,
                farm.address.city,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
          <div>
            Email: <span className="font-semibold">{farm.user?.email}</span>
          </div>
        </div>
      </div>
      {/* Bên thuê */}
      <div className="mb-6">
        <h3 className="font-bold text-black mb-3 text-lg">BÊN THUÊ (BÊN B):</h3>
        <ContractLesseeFields
          contractData={contractData}
          handleInputChange={handleInputChange}
        />
      </div>
      {/* Điều khoản hợp đồng */}
      <ContractTerms
        itemsByType={itemsByTypeWithQuantity}
        totalQuantity={totalTreeQuantity}
        contractData={contractData}
        contractTotal={contractTotal}
        startDate={contractData.startDate}
        endDate={contractData.endDate}
      />
      {/* Chữ ký */}
      <ContractSignature
        farmSignatureUrl={farm.signatureUrl || "/signature-a.png"}
        lesseeSignature={lesseeSignature}
        farmName={farm.name}
        setLesseeSignature={setLesseeSignature}
        lesseeName={contractData.lesseeName}
      />
      {/* Checkbox xác nhận */}
      <div className="mb-6 flex items-start gap-3 p-4 bg-gray-100 border-l-4 border-black">
        <Checkbox
          checked={agreeTerms}
          onCheckedChange={(checked) => setAgreeTerms(!!checked)}
          id="terms-checkbox"
          className="mt-1"
        />
        <label
          htmlFor="terms-checkbox"
          className="font-bold text-black cursor-pointer text-base"
        >
          Tôi xác nhận đã đọc, hiểu rõ và đồng ý với tất cả các điều khoản trong
          hợp đồng thuê cây này. <br />
          Tôi cam kết thực hiện đúng nghĩa vụ và quyền lợi đã được quy định.
        </label>
      </div>
    </div>
  );
}
