import Image from "next/image";
import { TreeItem } from "../types";

type HarvestHeaderProps = {
  selectedTree: TreeItem;
};

export function HarvestHeader({ selectedTree }: HarvestHeaderProps) {
  return (
    <div className="p-4 sm:p-6 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="relative group flex-shrink-0">
          <Image
            src={selectedTree.img}
            alt={selectedTree.name}
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-gray-200 dark:border-gray-600 object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute -top-1 -right-1 bg-black text-white text-xs px-2 py-0.5 rounded-full font-medium">
            {selectedTree.age}y
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
            Thu hoạch: {selectedTree.name}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium mb-2">
            {selectedTree.type}
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-black text-white px-3 py-1 rounded-lg text-sm font-medium">
              {selectedTree.yield} kg khả dụng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
