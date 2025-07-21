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
      className="flex flex-wrap gap-2 justify-center" // giảm gap từ 4 xuống 2
      style={{ maxWidth: "1000px", margin: "0 auto" }} // tăng maxWidth nếu cần
    >
      {dungs.map((dungs) => (
        <div key={dungs.id} style={{ flex: "0 0 190px" }}>
          {" "}
          {/* tăng chiều rộng card */}
          <DungCard
            dungs={dungs}
            selected={selectedItems.includes(dungs.id)}
            onSelect={(id) => onSelect(Number(id))}
          />
        </div>
      ))}
    </div>
  );
}
