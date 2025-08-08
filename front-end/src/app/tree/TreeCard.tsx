import React from "react";
import Image from "next/image";
import { TreeItem } from "./types";

type Props = {
  item: TreeItem;
  onDetail: (item: TreeItem) => void;
  onHarvest: (item: TreeItem) => void;
  role?: string | null; // Thêm role
  onOpenSellPriceModal?: () => void; // Thêm hàm mở modal
};

// Function chuyển đổi status sang tiếng Việt
const getStatusText = (status: string) => {
  switch (status) {
    case "READY_TO_HARVEST":
      return "Sẵn sàng thu hoạch";
    case "GROWING":
      return "Đang phát triển";
    case "READY_TO_HARVEST":
      return "Sẵn sàng thu hoạch";
    case "HARVESTING":
      return "Đang thu hoạch";
    case "HARVESTED":
      return "Đã thu hoạch";
    default:
      return status;
  }
};

// Function để lấy màu badge theo status
const getStatusColor = (status: string) => {
  switch (status) {
    case "READY_TO_HARVEST":
      return "bg-yellow-600 text-white";
    case "GROWING":
      return "bg-green-600 text-white";
    case "HARVESTING":
      return "bg-blue-600 text-white";
    case "HARVESTED":
      return "bg-gray-600 text-white";
    default:
      return "bg-orange-600 text-white";
  }
};

export function TreeCard({
  item,
  onDetail,
  onHarvest,
  role,
  onOpenSellPriceModal,
}: Props) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-2xl hover:border border-black transition-all duration-200">
      {/* Hình ảnh cây */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.img}
          alt={item.name}
          width={192}
          height={192}
          className="w-full h-full object-cover"
        />
        {/* Badge trạng thái */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
              item.status
            )}`}
          >
            {getStatusText(item.status)}
          </span>
        </div>
      </div>

      {/* Thông tin cây */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-black mb-2">{item.name}</h3>

        {/* Thông tin cơ bản */}
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          {/* <div className="flex justify-between">
            <span>Chủ vườn:</span>
            <span className="font-semibold text-black">{item.ownerName}</span>
          </div>
          <div className="flex justify-between">
            <span>Năng suất:</span>
            <span className="font-semibold text-black">{item.yield}kg/năm</span>
          </div>
          <div className="flex justify-between">
            <span>Phí thuê:</span>
            <span className="font-semibold text-black">
              {item.monthlyRent} FVT/tháng
            </span>
          </div>
          <div className="flex justify-between">
            <span>Còn lại:</span>
            <span className="font-semibold text-black">
              {item.remainingMonths} tháng
            </span>
          </div> */}
        </div>

        {/* Thông tin hợp đồng */}
        <div
          className={`p-3 rounded-lg border mb-4 ${
            item.status === "READY_TO_HARVEST"
              ? "bg-yellow-50 border-yellow-200"
              : item.status === "GROWING"
              ? "bg-green-50 border-green-200"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div
            className={`text-sm text-center font-semibold ${
              item.status === "READY_TO_HARVEST"
                ? "text-yellow-700"
                : item.status === "GROWING"
                ? "text-green-700"
                : "text-gray-700"
            }`}
          >
            <div>Thời gian thuê</div>
            <div className="text-xs mt-1">
              {new Date(item.rentStartDate).toLocaleDateString("vi-VN")} -{" "}
              {new Date(item.rentEndDate).toLocaleDateString("vi-VN")}
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex gap-2">
          <button
            onClick={() => onDetail(item)}
            className="flex-1 bg-black text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
          >
            Chi tiết
          </button>
          {item.status === "READY_TO_HARVEST" && (
            <button
              onClick={() => onHarvest(item)}
              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
            >
              Thu hoạch
            </button>
          )}
          {/* Nút đặt giá bán vật phẩm chỉ cho FARMER */}
          {role === "FARMER" && (
            <button
              onClick={onOpenSellPriceModal}
              className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition"
            >
              Đặt giá bán vật phẩm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
