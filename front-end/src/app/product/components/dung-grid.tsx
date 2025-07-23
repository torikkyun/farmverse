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
    <div className="flex flex-wrap w-full justify-start gap-4">
      {dungs.map((dung) => (
        <div
          key={dung.id}
          className="w-[calc(20%-0.8rem)] min-w-[200px] flex-shrink-0"
        >
          <DungCard
            dungs={dung}
            selected={selectedItems.includes(dung.id)}
            onSelect={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
