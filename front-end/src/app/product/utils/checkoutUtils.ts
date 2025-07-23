export type Item = {
  id: string | number;
  name: string;
  image: string;
  price: number | string;
  quantity?: number;
  type?: string;
};

export const classifyItems = (items: Item[]) => ({
  caytrong: items
    .filter((item) => item.type === "tree" || item.type === "caytrong")
    .map((item) => ({ ...item, quantity: item.quantity || 1 })),
  phanbon: items
    .filter((item) => item.type === "fertilizer" || item.type === "phanbon")
    .map((item) => ({ ...item, quantity: item.quantity || 1 })),
  other: items
    .filter(
      (item) =>
        item.type !== "tree" &&
        item.type !== "caytrong" &&
        item.type !== "fertilizer" &&
        item.type !== "phanbon"
    )
    .map((item) => ({ ...item, quantity: item.quantity || 1 })),
});

export const calculateTotal = (
  items: Item[],
  includesIot: boolean,
  caytrongCount: number
) => {
  const baseTotal = items.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "string"
        ? parseFloat(item.price) || 0
        : item.price || 0) *
        (item.quantity || 1),
    0
  );
  const iotCost = includesIot && caytrongCount > 0 ? caytrongCount * 500 : 0;
  return baseTotal + iotCost;
};
