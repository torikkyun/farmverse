import { NFTItem, DungItem } from "../[slug]/types";

// Tạo base type cho các functions
export type Item = NFTItem | DungItem; // Thêm export ở đây

export function classifyItems(items: Item[]) {
  const caytrong: Item[] = [];
  const phanbon: Item[] = [];

  items.forEach((item) => {
    if (item.type === "caytrong") {
      caytrong.push(item);
    } else if (item.type === "phanbon") {
      phanbon.push(item);
    }
  });

  return { caytrong, phanbon };
}

export function calculateTotal(
  items: Item[],
  includesIot: boolean,
  caytrongCount: number
): number {
  const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
  const iotCost = includesIot ? caytrongCount * 50 : 0; // 50 FVT per cây trồng for IoT
  return itemsTotal + iotCost;
}
