import { useEffect, useState } from "react";

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

// Thêm interface cho API response
interface ApiItem {
  id: string;
  name: string;
  description?: string;
  images?: string[];
  price?: number;
  quantity?: number;
}

interface ApiResponse {
  items?: ApiItem[];
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

    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = type === "Cây trồng" ? "trees" : "fertilizers";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/farms/${farmId}/${endpoint}?page=${page}&pageSize=${pageSize}`
        );

        if (!response.ok) {
          throw new Error(`Không thể tải ${type.toLowerCase()}`);
        }

        const data: ApiResponse = await response.json();

        const transformedItems: FarmItem[] =
          data.items?.map((item: ApiItem) => ({
            id: item.id,
            name: item.name,
            description: item.description || "",
            type: type,
            images: Array.isArray(item.images) ? item.images : [],
            price: item.price || 0,
            quantity: item.quantity || 0,
          })) || [];

        setItems(transformedItems);
      } catch (err) {
        console.error("Error fetching farm items:", err);
        setError(
          err instanceof Error ? err.message : "Có lỗi xảy ra khi tải dữ liệu"
        );
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [farmId, type, page, pageSize]);

  return { items, loading, error };
}
