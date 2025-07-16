import { Pencil } from "lucide-react";
import { FarmItem } from "./useFarmItems";

interface Props {
  item: FarmItem;
  onEdit: (item: FarmItem) => void;
}

export default function FarmItemCard({ item, onEdit }: Props) {
  return (
    <div
      className="relative group bg-white dark:bg-black border rounded-lg shadow p-4 transition hover:shadow-lg"
    >
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-gray-100 dark:bg-gray-800 p-1 rounded-full"
        title="Sửa"
        onClick={() => onEdit(item)}
      >
        <Pencil size={20} className="text-gray-600 dark:text-gray-300" />
      </button>
      {item.images && item.images.length > 0 && (
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-32 object-cover rounded mb-2"
        />
      )}
      <div className="font-bold text-lg mb-1">{item.name}</div>
      <div className="text-gray-500 dark:text-gray-400 mb-2">{item.description}</div>
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