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
    <div
      className="flex flex-wrap gap-0 justify-center items-start py-4"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      {dungs.map((dungs) => (
        <DungCard
          key={dungs.id}
          dungs={dungs}
          selected={selectedItems.includes(dungs.id)}
          onSelect={(id) => onSelect(Number(id))}
        />
      ))}
    </div>
  );
}
