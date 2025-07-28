import NFTCard from "./nft-card";
import { NFTItem } from "../[slug]/types";

interface NFTGridProps {
  items: NFTItem[];
  selectedItems: string[]; // Đã có rồi
  onSelect: (id: string) => void; // Đã có rồi
}

console.log("NFTGrid component loaded");

export default function NFTGrid({
  items,
  selectedItems,
  onSelect,
}: NFTGridProps) {
  return (
    <div className="flex flex-wrap w-full justify-start gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="w-[calc(20%-0.8rem)] min-w-[200px] flex-shrink-0"
        >
          <NFTCard
            item={item}
            selected={selectedItems.includes(item.id)}
            onSelect={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
