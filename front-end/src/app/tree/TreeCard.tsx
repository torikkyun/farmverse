import React from "react";

export interface TreeItem {
  name: string;
  type: string;
  age: number;
  yield: number;
  status: string;
  img: string;
}

export function TreeCard({ item, onClick }: { item: TreeItem; onClick: () => void }) {
  return (
    <div
      className="flex flex-col items-center w-full dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 rounded-2xl border shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 p-4 cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={item.img}
        alt={item.name}
        className="w-24 h-24 rounded-2xl border-2 border-green-300 dark:border-green-700 object-cover bg-white dark:bg-black mb-4 shadow group-hover:scale-110 transition"
      />
      <div className="font-bold text-black dark:text-white text-center text-base mb-1 truncate w-full">
        {item.name}
      </div>
      <div className="text-base text-green-700 dark:text-green-300 mb-1 text-center w-full font-medium">
        {item.type}
      </div>
      <div className="font-semibold text-base text-black dark:text-gray-300 mb-1 text-center w-full">
        Tuổi: {item.age} năm
      </div>
      <div className="font-semibold text-base text-black dark:text-gray-300 mb-1 text-center w-full">
        Sản lượng: {item.yield} kg/năm
      </div>
      <div className="mt-2">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow bg-opacity-90 whitespace-nowrap
            ${
              item.status === "Đang phát triển"
                ? "bg-green-600 text-white"
                : item.status === "Đã thu hoạch"
                ? "bg-yellow-400 text-black"
                : "bg-gray-300 text-black dark:bg-neutral-700 dark:text-white"
            }
          `}
        >
          {item.status}
        </span>
      </div>
    </div>
  );
}