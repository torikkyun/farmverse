import NFTCard from "./nft-card";

interface NFTItem {
  id: number;
  image: string;
  name: string;
}

interface NFTGridProps {
  items: NFTItem[];
  selectedItems: number[];
  onSelect: (id: number) => void;
}

export default function NFTGrid({ items, selectedItems, onSelect }: NFTGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item) => (
        <NFTCard
          key={item.id}
          item={item}
          selected={selectedItems.includes(item.id)}
          onSelect={(id) => onSelect(Number(id))}
        />
      ))}
    </div>
  );
}