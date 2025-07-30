import { NFTItem, DungItem } from "../[slug]/types";

// Tạo base type cho các functions
export type Item = NFTItem | DungItem; // Thêm export ở đây

export function classifyItems(items: Item[]) {
  console.log(
    "============ Danh sách items truyền vào classifyItems ============"
  );
  items.forEach((item, idx) => {
    console.log(`[${idx}] name: ${item.name}, type: ${item.type}`);
  });
  console.log(items); // Log toàn bộ object
  items.forEach((item) => {
    console.log(item.name, item.type);
  });
  console.log(items); // Log toàn bộ object
  items.forEach((item) => {
    console.log(item.name, item.type);
  });
  items.forEach((item) => {
    console.log(item.name, item.type);
  });

  return {
    tree: items.filter((item) => item.type === "TREE"),
    fertilizer: items.filter((item) => item.type === "FERTILIZER"),
  };
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
