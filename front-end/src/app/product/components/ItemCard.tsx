import Image from "next/image";
import { Item } from "../utils/checkoutUtils";

export default function ItemCard({ item, type }: { item: Item; type: string }) {
  return (
    <div className="flex items-center gap-4 mb-4 bg-white p-4 rounded-lg border border-black">
      <Image
        src={item.image}
        alt={item.name}
        width={60}
        height={60}
        className="w-15 h-15 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="font-bold text-black">{item.name}</div>
        <div className="text-black font-semibold">
          {typeof item.price === "string"
            ? item.price
            : item.price.toLocaleString()}{" "}
          FVT{type === "tree" ? "/năm" : type === "fertilizer" ? "/bao" : ""}
        </div>
        <div className="text-sm text-gray-700">Số lượng: {item.quantity}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-black">
          {(typeof item.price === "string"
            ? parseFloat(item.price) * (item.quantity ?? 1)
            : item.price * (item.quantity ?? 1)
          ).toLocaleString()}{" "}
          FVT
        </div>
      </div>
    </div>
  );
}
