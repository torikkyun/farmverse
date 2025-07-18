import { Pencil } from "lucide-react";
import Image from "next/image";
import { FarmItem } from "./useFarmItems";

interface Props {
  item: FarmItem;
  onEdit: (item: FarmItem) => void;
}

export default function FarmItemCard({ item, onEdit }: Props) {
  return (
    <div className="relative group bg-white dark:bg-black border rounded-lg shadow p-4 transition hover:shadow-lg h-full">
      <div className="w-full mb-2">
        <div className="w-full h-44 relative">
          <Image
            src={
              item.images?.[0] ||
              `https://picsum.photos/seed/${item.id}/400/176`
            }
            alt={item.name}
            fill
            className="rounded-lg object-cover bg-gray-100"
            style={{ border: "none" }}
            onError={(e) => {
              (
                e.currentTarget as HTMLImageElement
              ).src = `https://picsum.photos/seed/${item.id}/400/176`;
            }}
          />
          <button
            className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition bg-white dark:bg-black p-2 rounded-full border border-gray-300 dark:border-gray-700 shadow-lg"
            title="Sửa"
            onClick={() => onEdit(item)}
          >
            <Pencil size={28} className="text-black dark:text-white" />
          </button>
        </div>
      </div>
      <div className="font-bold text-lg mb-1">{item.name}</div>
      <div className="text-gray-500 dark:text-gray-400 mb-2">
        {item.description}
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        {item.createdAt && (
          <div>Ngày tạo: {new Date(item.createdAt).toLocaleDateString()}</div>
        )}
        {item.updatedAt && (
          <div>Cập nhật: {new Date(item.updatedAt).toLocaleDateString()}</div>
        )}
      </div>
    </div>
  );
}
