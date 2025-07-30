import { useEffect, useState } from "react";
import { DungItem, NFTItem } from "./types";

const PAGE = 1;
const PAGE_SIZE = 10;

interface RawItem {
  id?: string | number;
  _id?: string | number;
  name: string;
  price: number | string;
  images?: string[];
  stock: number;
  type: "FERTILIZER" | "TREE" | "PESTICIDE";
}

export function useFarmItems(API_URL: string, farmId: string) {
  const [items, setItems] = useState<NFTItem[]>([]);
  const [dungs, setDungs] = useState<DungItem[]>([]);

  useEffect(() => {
    if (!farmId) return;
    const url = `${API_URL}/items/farm/${farmId}?type=TREE&page=${PAGE}&pageSize=${PAGE_SIZE}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setItems(
          (json?.data?.items || []).map((item: RawItem) => ({
            id: String(item.id || item._id),
            name: item.name,
            price: Number(item.price),
            images: Array.isArray(item.images) ? item.images : [],
            stock: item.stock || 0,
            type: item.type,
          }))
        );
      })
      .catch(() => setItems([]));
  }, [API_URL, farmId]);

  useEffect(() => {
    if (!farmId) return;
    const url = `${API_URL}/items/farm/${farmId}?type=FERTILIZER&page=${PAGE}&pageSize=${PAGE_SIZE}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log("== API FERTILIZER response ==", json?.data?.items);
        setDungs(
          (json?.data?.items || []).map((item: RawItem) => ({
            id: String(item.id || item._id),
            name: item.name,
            price: Number(item.price),
            images: Array.isArray(item.images) ? item.images : [],
            stock: item.stock || 0,
            type: item.type,
          }))
        );
      })
      .catch(() => setDungs([]));
  }, [API_URL, farmId]);

  return { items, setItems, dungs, setDungs };
}
