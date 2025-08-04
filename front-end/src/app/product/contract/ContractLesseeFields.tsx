import React from "react";

interface Props {
  contractData: Record<string, string>;
  handleInputChange: (field: string, value: string) => void;
}

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

export default function ContractLesseeFields({
  contractData,
  handleInputChange,
}: Props) {
  return (
    <div className="space-y-3">
      {inputFields.map(({ field, label, type, placeholder }) => (
        <div key={field} className="flex items-center gap-2">
          <span className="text-base min-w-[100px] text-black">{label}:</span>
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
  );
}
