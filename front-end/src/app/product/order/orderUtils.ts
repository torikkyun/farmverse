import { Item } from "../utils/checkoutUtils";

export function getItemsByTypeWithQuantity(
  itemsByType: { tree: Item[]; fertilizer: Item[] },
  selectedItems: { id: string; quantity: number }[]
) {
  return {
    tree: selectedItems
      .map((sel) => {
        const item = itemsByType.tree.find((i) => i.id === sel.id);
        return item ? { ...item, quantity: sel.quantity } : null;
      })
      .filter(Boolean) as Item[],
    fertilizer: selectedItems
      .map((sel) => {
        const item = itemsByType.fertilizer.find((i) => i.id === sel.id);
        return item ? { ...item, quantity: sel.quantity } : null;
      })
      .filter(Boolean) as Item[],
  };
}

export function calcTotal(items: Item[]) {
  return items.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "string"
        ? parseFloat(item.price) * (item.quantity ?? 1)
        : item.price * (item.quantity ?? 1)),
    0
  );
}

export function calcGrandTotal(treeItems: Item[], fertilizerItems: Item[]) {
  const totalTreeQuantity = treeItems.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );
  const totalTreePrice = calcTotal(treeItems);
  const totalFertilizerPrice = calcTotal(fertilizerItems);
  const iotPrice = totalTreeQuantity * 0.05;
  return {
    totalTreeQuantity,
    totalTreePrice,
    totalFertilizerPrice,
    iotPrice,
    grandTotal: totalTreePrice + totalFertilizerPrice + iotPrice,
  };
}

export function formatDate(date: Date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

export function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}
