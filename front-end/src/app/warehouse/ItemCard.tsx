import { MoreHorizontal } from "lucide-react";
import React from "react";
import Image from "next/image";

// Định nghĩa type cho props
type WarehouseItem = {
  id: number;
  name: string;
  type: string;
  images: string[];
  quantity: number;
  price: number;
  // Thêm các trường khác nếu cần
};

type ItemCardProps = {
  item: WarehouseItem;
  onEdit: (item: WarehouseItem) => void;
  onDelete: (id: number) => void;
  showMenu: number | null;
  setShowMenu: (id: number | null) => void;
  onOpenDetail: (item: WarehouseItem) => void;
};

export function ItemCard({
  item,
  onEdit,
  onDelete,
  showMenu,
  setShowMenu,
  onOpenDetail,
}: ItemCardProps) {
  return (
    <div
      className="relative flex flex-col items-center w-full bg-white dark:bg-neutral-800 rounded-2xl border border-blue-100 dark:border-blue-800 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 p-6 cursor-pointer"
      onClick={() => onOpenDetail(item)}
    >
      <Image
        src={item.images?.[0] || ""}
        unoptimized
        alt={item.name}
        width={96}
        height={96}
        className="w-24 h-24 rounded-xl border-2 border-blue-300 dark:border-blue-700 object-cover bg-white dark:bg-black mb-4 shadow group-hover:scale-110 transition"
        priority
      />
      <div className="font-bold text-black dark:text-white text-center text-lg mb-1 truncate w-full">
        {item.name}
      </div>
      <div className="text-xs text-blue-700 dark:text-blue-300 mb-1 text-center w-full font-medium">
        Loại: {item.type}
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-300 mb-1 text-center w-full">
        Số lượng:{" "}
        <span className="font-semibold text-black dark:text-white">
          {item.quantity}
        </span>
      </div>
      <div
        className="absolute top-2 right-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800"
          onClick={() => setShowMenu(showMenu === item.id ? null : item.id)}
          type="button"
        >
          <MoreHorizontal size={18} />
        </button>
        {showMenu === item.id && (
          <div className="absolute right-0 z-10 mt-2 w-28 bg-white dark:bg-neutral-900 border rounded shadow">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
              onMouseDown={() => {
                onEdit(item);
                setShowMenu(null);
              }}
            >
              Sửa
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 text-red-600"
              onMouseDown={() => {
                setShowMenu(null);
                onDelete(item.id);
              }}
            >
              Xóa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
