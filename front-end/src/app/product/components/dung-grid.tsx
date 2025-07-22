import DungCard from "./dung-card";

interface DungItem {
  id: number;
  image: string;
  name: string;
  price: number;
}

interface DungGridProps {
  dungs: DungItem[];
  selectedItems: number[];
  onSelect: (id: number) => void;
}

export default function DungGrid({
  dungs,
  selectedItems,
  onSelect,
}: DungGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
      {dungs.map((dungs) => (
        <DungCard
          key={dungs.id}
          dungs={dungs}
          selected={selectedItems.includes(dungs.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
