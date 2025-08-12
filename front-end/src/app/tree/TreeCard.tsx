import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Eye, Leaf, DollarSign } from "lucide-react";
import { TreeItem } from "./types";

type Props = {
  item: TreeItem;
  onDetail: (item: TreeItem) => void;
  onHarvest: (item: TreeItem) => void;
  role?: string | null;
  onOpenSellPriceModal?: (item: TreeItem) => void; // Truyền item vào
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
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Xử lý click chuột phải
  const handleRightClick = (e: React.MouseEvent) => {
    if (role === "FARMER") {
      e.preventDefault();
      setContextMenuPosition({ x: e.clientX, y: e.clientY });
      setShowContextMenu(true);
    }
  };

  // Đóng context menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
      }
    };

    if (showContextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContextMenu]);

  const handleSetPrice = () => {
    setShowContextMenu(false);
    onOpenSellPriceModal?.(item);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-200"
        onContextMenu={handleRightClick}
      >
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
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => onDetail(item)}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-800 py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Eye className="w-4 h-4" />
              Chi tiết
            </button>
            {item.status === "READY_TO_HARVEST" && (
              <button
                onClick={() => onHarvest(item)}
                className="flex-1 bg-black text-white py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg whitespace-nowrap"
              >
                <Leaf className="w-4 h-4" />
                Thu hoạch
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {showContextMenu && role === "FARMER" && (
        <div
          ref={contextMenuRef}
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[160px]"
          style={{
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
          }}
        >
          <button
            onClick={handleSetPrice}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Đặt giá bán
          </button>
        </div>
      )}
    </>
  );
}
