import React, { useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "../utils/checkoutUtils";
import { Farm } from "../[slug]/types";
import SignaturePad from "react-signature-canvas"; // Cài: npm i react-signature-canvas
import Image from "next/image";

type ItemsByType = {
  tree: Item[];
  fertilizer: Item[];
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
  [key: string]: string;
};

interface ContractFormProps {
  farm: Farm;
  contractData: ContractData;
  handleInputChange: (field: string, value: string) => void;
  agreeTerms: boolean;
  setAgreeTerms: (v: boolean) => void;
  itemsByType: ItemsByType;
  totalQuantity: number;
  total: number;
  setLesseeSignature: React.Dispatch<React.SetStateAction<string | null>>; // <-- thêm dòng này
  lesseeSignature?: string | null;
}

export default function ContractForm({
  farm,
  contractData,
  handleInputChange,
  agreeTerms,
  setAgreeTerms,
  itemsByType,
  totalQuantity,
  total,
  setLesseeSignature,
  lesseeSignature,
}: ContractFormProps) {
  const sigPadRef = useRef<SignaturePad | null>(null);

  const inputFields = [
    {
      field: "lesseeName",
      label: "Họ tên",
      type: "text",
      placeholder: "Nhập họ tên đầy đủ",
    },
    {
      field: "lesseeAddress",
      label: "Địa chỉ",
      type: "text",
      placeholder: "Nhập địa chỉ thường trú",
    },
    {
      field: "lesseePhone",
      label: "Số điện thoại",
      type: "text",
      placeholder: "Nhập số điện thoại",
    },
    {
      field: "lesseeEmail",
      label: "Email",
      type: "email",
      placeholder: "Nhập email liên hệ",
    },
  ];

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

  // Nếu không có cây trồng, chỉ hiển thị phần mua vật phẩm
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

  const handleSignatureEnd = () => {
    const dataUrl = sigPadRef.current?.toDataURL();
    if (dataUrl) setLesseeSignature(dataUrl); // dùng prop từ cha
  };

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
        <div className="space-y-3">
          {inputFields.map(({ field, label, type, placeholder }) => (
            <div key={field} className="flex items-center gap-2">
              <span className="text-base min-w-[100px] text-black">
                {label}:
              </span>
              <input
                type={type}
                className="flex-1 border-b border-dotted border-black pb-1 bg-transparent text-base text-black"
                value={contractData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Điều khoản hợp đồng */}
      <div className="mb-6">
        <h3 className="font-bold text-black mb-3 text-lg">
          ĐIỀU 1: THÔNG TIN CÂY CHO THUÊ
        </h3>
        <ul className="text-base space-y-1 list-disc list-inside text-black">
          <li>
            Loại cây:{" "}
            {itemsByType.tree.map((item: Item) => item.name).join(", ")}
          </li>
          <li>Số lượng: {totalQuantity} cây</li>
          <li>Tuổi cây: 2-3 năm</li>
          <li>Tình trạng: Khỏe mạnh, phát triển tốt</li>
          <li>Vị trí trồng: Trấn Biên, Đồng Nai</li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-black mb-3 text-lg">
          ĐIỀU 2: THỜI GIAN THUÊ
        </h3>
        <ul className="text-base space-y-1 list-disc list-inside text-black">
          <li>
            Ngày bắt đầu:{" "}
            <span className="font-semibold">
              {new Date(contractData.startDate).toLocaleDateString("vi-VN")}
            </span>
          </li>
          <li>
            Ngày kết thúc:{" "}
            <span className="font-semibold">
              {new Date(contractData.endDate).toLocaleDateString("vi-VN")}
            </span>
          </li>
          <li>Thời hạn: 1 năm</li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-black mb-3 text-lg">
          ĐIỀU 3: GIÁ THUÊ & THANH TOÁN
        </h3>
        <ul className="text-base space-y-1 list-disc list-inside text-black">
          <li>
            Giá thuê:{" "}
            <span className="font-semibold">
              {contractTotal.toLocaleString()} FVT
            </span>
          </li>
          <li>Phương thức thanh toán: {contractData.paymentMethod}</li>
          <li>Thời hạn thanh toán: Trả trước 100%</li>
          <li>Phí chậm trả: {contractData.lateFee}</li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-black mb-3 text-lg">
          ĐIỀU 4: QUYỀN VÀ NGHĨA VỤ
        </h3>
        <div className="text-base space-y-3 text-black">
          <div>
            <span className="font-semibold">Bên A có quyền:</span>
            <p className="ml-4">• {contractData.lessorRights}</p>
          </div>
          <div>
            <span className="font-semibold">Bên B có quyền:</span>
            <p className="ml-4">• {contractData.lesseeRights}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-black mb-3 text-lg">
          ĐIỀU 5: GIẢI QUYẾT TRANH CHẤP
        </h3>
        <p className="text-base text-black">{contractData.disputeResolution}</p>
      </div>
      <div className="mb-8">
        <h3 className="font-bold text-black mb-3 text-lg">
          ĐIỀU 6: HIỆU LỰC HỢP ĐỒNG
        </h3>
        <p className="text-base text-black">
          Hợp đồng có hiệu lực kể từ ngày ký và có đầy đủ chữ ký của hai bên.
        </p>
        <p className="text-base italic text-center mt-4 text-black">
          {(() => {
            const today = new Date();
            return (
              <>
                <span className="font-bold">Ngày {today.getDate()} </span>
                <span className="font-bold">tháng {today.getMonth() + 1} </span>
                <span className="font-bold">năm {today.getFullYear()}</span>
              </>
            );
          })()}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="text-center">
          <div className="font-bold mb-4 text-base text-black">
            ĐẠI DIỆN BÊN A
          </div>
          <div className="h-16 flex items-center justify-center">
            <Image
              src={farm.signatureUrl || "/signature-a.png"}
              alt="Chữ ký bên A"
              width={120}
              height={64}
              className="h-16 object-contain"
            />
          </div>
          <div className="font-semibold text-base text-black">{farm.name}</div>
        </div>
        <div className="text-center">
          <div className="font-bold mb-4 text-base text-black">
            ĐẠI DIỆN BÊN B
          </div>
          <div className="h-16 flex items-center justify-center">
            {lesseeSignature ? (
              <Image
                src={lesseeSignature}
                alt="Chữ ký bên B"
                width={200}
                height={64}
                className="h-16 object-contain"
              />
            ) : (
              <SignaturePad
                ref={sigPadRef}
                onEnd={handleSignatureEnd}
                penColor="black"
                canvasProps={{
                  width: 200,
                  height: 64,
                  className: "border",
                }}
              />
            )}
          </div>
          <div className="font-semibold text-base text-black">
            {contractData.lesseeName || "_________________"}
          </div>
        </div>
      </div>
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
