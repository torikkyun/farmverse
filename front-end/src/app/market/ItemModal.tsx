import { Badge } from "@/components/ui/badge";
import type { Item } from "./ItemList";

export function ItemModal({
  item,
  onClose,
}: {
  item: Item | null;
  onClose: () => void;
}) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-black rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black dark:text-white text-2xl font-bold"
          aria-label="Đóng"
        >
          ×
        </button>
        <img
          src={item.images?.[0] || "/images/default.png"}
          alt={item.name}
          className="rounded-lg w-full h-48 object-cover mb-4"
        />
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">{item.name}</span>
          <Badge
            variant="outline"
            className="text-xs border-green-500 text-green-600"
          >
            {item.type === "FERTILIZER"
              ? "Phân bón"
              : item.type === "TREEROOT"
              ? "Cây trồng"
              : item.type}
          </Badge>
        </div>
        <div className="mb-2 text-sm text-muted-foreground">
          <span className="font-medium">Nông trại:</span> {item.farm?.name}
        </div>
        <div className="mb-2 text-sm text-muted-foreground">
          <span className="font-medium">Mô tả:</span> {item.description || "Không có"}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="text-base">
            <span className="text-muted-foreground">Giá:</span>{" "}
            <span className="font-bold text-primary">{item.price} ETH</span>
          </div>
          <div className="text-base">
            <span className="text-muted-foreground">Số lượng:</span>{" "}
            <span className="font-bold">{item.quantity ?? "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}