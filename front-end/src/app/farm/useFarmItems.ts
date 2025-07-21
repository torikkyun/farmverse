import { useEffect, useState } from "react";
// Import dữ liệu từ file product
import { TREE_ITEMS, ITEMS } from "@/data/product";

export interface FarmItem {
  id: string;
  name: string;
  description?: string;
  type: "Phân bón" | "Cây trồng";
  createdAt?: string;
  updatedAt?: string;
  images: string[];
  price: number;
  quantity: number;
}

interface UseFarmItemsProps {
  farmId: string | number;
  type: "Phân bón" | "Cây trồng";
  page?: number;
  pageSize?: number;
  reload?: number;
}

export function useFarmItems({
  farmId,
  type,
  page = 1,
  pageSize = 10,
}: UseFarmItemsProps) {
  const [items, setItems] = useState<FarmItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!farmId) return;
    setLoading(true);
    setError(null);

    // Lấy dữ liệu từ file product thay vì gọi API
    let data: FarmItem[] = [];
    if (type === "Cây trồng") {
      // Lấy cây trồng từ TREE_ITEMS
      data = TREE_ITEMS.filter((item) => item.farm === farmId).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? "",
        type: "Cây trồng",
        images: item.images,
        price: item.price,
        quantity: item.quantity,
      }));
    } else if (type === "Phân bón") {
      // Lấy phân bón từ ITEMS
      data = ITEMS.filter(
        (item) => item.farm === farmId && item.type === "Phân bón"
      ).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? "",
        type: "Phân bón",
        images: item.images,
        price: item.price,
        quantity: item.quantity,
      }));
    }

    // Phân trang nếu cần
    const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

    setItems(pagedData);
    setLoading(false);
  }, [farmId, type, page, pageSize]);

  return { items, loading, error };
}
