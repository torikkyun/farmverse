import {
  Pencil,
  Image as ImageIcon,
  DollarSign,
  Package,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { FarmItem } from "./useFarmItems";

interface Props {
  item: FarmItem;
  onEdit: (item: FarmItem) => void;
}

export default function FarmItemCard({ item, onEdit }: Props) {
  return (
    <div className="relative group bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-400 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        {item.images?.[0] ? (
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            priority
            onError={(e) => {
              (
                e.currentTarget as HTMLImageElement
              ).src = `https://picsum.photos/seed/${item.id}/400/176`;
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-900">
            <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-700" />
          </div>
        )}

        {/* Edit Button */}
        <button
          className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-black/90 backdrop-blur-sm p-2.5 rounded-full border border-gray-300 dark:border-gray-700 shadow-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          title="Chỉnh sửa sản phẩm"
          onClick={() => onEdit(item)}
        >
          <Pencil size={18} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white dark:bg-black">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Tag className="w-5 h-5 text-black dark:text-white mt-0.5 flex-shrink-0" />
            <h3 className="font-bold text-lg text-black dark:text-white line-clamp-2 leading-tight">
              {item.name}
            </h3>
          </div>

          {item.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-sm">
              {item.price?.toLocaleString() ?? "0"}
              {""} FVT
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
            <Package className="w-4 h-4" />
            <span className="font-semibold text-sm">
              SL: {item.quantity ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
