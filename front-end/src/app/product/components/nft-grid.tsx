import NFTCard from "./nft-card";

interface NFTItem {
  id: number;
  image: string;
  name: string;
  price: number;
}

interface NFTGridProps {
  items: NFTItem[];
  selectedItems: number[];
  onSelect: (id: number) => void;
}

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
