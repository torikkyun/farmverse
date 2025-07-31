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
  search?: string;
}

type ApiItemType = "FERTILIZER" | "TREE";
type ApiItem = {
  id: string;
  name: string;
  description?: string;
  type: ApiItemType;
  images?: string[];
  price?: number;
  stock?: number;
};

const mapApiTypeToVN = (type: ApiItemType) =>
  type === "FERTILIZER" ? "Phân bón" : "Cây trồng";

export function useFarmItems({
  farmId,
  type,
  page = 1,
  pageSize = 10,
  search = "",
}: UseFarmItemsProps) {
  const [items, setItems] = useState<FarmItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!farmId) return;
    setLoading(true);
    setError(null);

    const apiType = type === "Phân bón" ? "FERTILIZER" : "TREE";
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(search ? { search } : {}),
      type: apiType,
    });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/farm/${farmId}?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Không thể tải ${type.toLowerCase()}`);
        return res.json();
      })
      .then((data) => {
        setItems(
          data?.data?.items?.map((item: ApiItem) => ({
            id: item.id,
            name: item.name,
            description: item.description || "",
            type: mapApiTypeToVN(item.type),
            images: item.images || [],
            price: item.price || 0,
            quantity: item.stock || 0,
          })) || []
        );
      })
      .catch((err) => {
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu");
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [farmId, type, page, pageSize, search]);

  return { items, loading, error };
}
