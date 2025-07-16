import { useEffect, useState } from "react";

export interface FarmItem {
  id: string;
  name: string;
  description?: string;
  type: "FERTILIZER" | "TREEROOT";
  createdAt?: string;
  updatedAt?: string;
  images: string[];
  price: number;
  quantity: number;
}

interface UseFarmItemsProps {
  farmId: string | number;
  type: "FERTILIZER" | "TREEROOT";
  page?: number;
  pageSize?: number;
  reload?: number;
}

export function useFarmItems({ farmId, type, page = 1, pageSize = 10 }: UseFarmItemsProps) {
  const [items, setItems] = useState<FarmItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!farmId) return;
    setLoading(true);
    setError(null);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/farm/${farmId}?page=${page}&pageSize=${pageSize}&type=${type}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data?.data?.items || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể lấy dữ liệu vật phẩm");
        setLoading(false);
      });
  }, [farmId, type, page, pageSize]);

  return { items, loading, error };
}