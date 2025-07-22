import { useEffect, useState } from "react";
import { TREE_ITEMS, ITEMS } from "@/data/product";

export interface FarmItem {
  id: string;
  name: string;
  description?: string;
  type: "Phân bón" | "Cây trồng";
  images: string[];
  price: number;
  quantity: number;
}

interface UseFarmItemsProps {
  farmId: string;
  type: "Phân bón" | "Cây trồng";
  page?: number;
  pageSize?: number;
}

export function useFarmItems({
  farmId = "farm1",
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

    console.log("farmId:", farmId); // kiểm tra farmId
    console.log("TREE_ITEMS:", TREE_ITEMS); // kiểm tra dữ liệu cây trồng
    console.log("ITEMS:", ITEMS); // kiểm tra dữ liệu vật phẩm

    let data: FarmItem[] = [];
    if (type === "Cây trồng") {
      data = TREE_ITEMS.filter(
        (item) => String(item.farm) === String(farmId)
      ).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? "",
        type: "Cây trồng",
        images: item.images,
        price: item.price,
        quantity: item.quantity,
      }));
    } else if (type === "Phân bón") {
      data = ITEMS.filter(
        (item) =>
          String(item.farm) === String(farmId) && item.type === "Phân bón"
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

    const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

    setItems(pagedData);
    setLoading(false);
  }, [farmId, type, page, pageSize]);

  return { items, loading, error };
}
