import { Button } from "@/components/ui/button";
import FarmItemCard from "../FarmItemCard";
import { Plus } from "lucide-react";
import { FarmItem } from "../useFarmItems";

interface Props {
  title: string;
  items: FarmItem[];
  loading: boolean;
  error: string | null;
  onAdd: () => void;
  onEdit: (item: FarmItem) => void;
}

export default function FarmItemSection({
  title,
  items,
  loading,
  error,
  onAdd,
  onEdit,
}: Props) {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white rounded">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button
          variant="outline"
          className="font-semibold flex items-center gap-2"
          onClick={onAdd}
        >
          <Plus size={18} /> Tạo vật phẩm
        </Button>
      </div>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : items.length === 0 ? (
        <div>Không có vật phẩm nào.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {items.map((item) => (
            <FarmItemCard key={item.id} item={item} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
