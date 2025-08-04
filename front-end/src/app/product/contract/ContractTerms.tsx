import React from "react";
import { Item } from "../utils/checkoutUtils";

interface Props {
  itemsByType: { tree: Item[]; fertilizer: Item[] };
  totalQuantity: number;
  contractData: Record<string, string>;
  contractTotal: number;
  startDate: string;
  endDate: string;
}

export default function ContractTerms({
  itemsByType,
  totalQuantity,
  contractData,
  contractTotal,
  startDate,
  endDate,
}: Props) {
  return (
    <>
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
              {new Date(startDate).toLocaleDateString("vi-VN")}
            </span>
          </li>
          <li>
            Ngày kết thúc:{" "}
            <span className="font-semibold">
              {new Date(endDate).toLocaleDateString("vi-VN")}
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
    </>
  );
}
