import Image from "next/image";

interface DungItem {
  id: number;
  image: string;
  name: string;
  price: number;
  description?: string;
  type?: string;
  quantity?: number;
}

interface DungCardProps {
  dungs: DungItem;
  selected: boolean;
  onSelect: (id: number) => void;
}

export default function DungCard({ dungs, selected, onSelect }: DungCardProps) {
  console.log(`DungCard - Item ${dungs.id} (${dungs.name}):`, {
    selected,
    itemId: dungs.id,
  });

  return (
    <div
      className={`group bg-white border rounded-2xl p-0 flex flex-col items-stretch text-black relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200
        ${selected ? "border-black ring-2 ring-black" : "border-black/10"}
        h-full
        w-[260px] min-w-[260px] max-w-[260px]`}
      style={{ minWidth: "0" }}
    >
      <div className="relative">
        <Image
          src={dungs.image}
          alt={dungs.name}
          width={230}
          height={230}
          className="w-full aspect-[1/1] object-cover rounded-t-2xl border-b border-black/10 transition-all duration-200 group-hover:scale-105 bg-black"
          priority
        />
        <button
          onClick={() => onSelect(dungs.id)}
          className={`absolute top-5 right-5 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 shadow-lg
            ${
              selected
                ? "bg-black text-white opacity-100"
                : "bg-black/80 text-white opacity-0 group-hover:opacity-100 hover:bg-black"
            }
          `}
          title={selected ? "Bỏ chọn" : "Thêm vào giỏ hàng"}
          style={{ zIndex: 20, fontSize: 32 }}
        >
          +
        </button>
      </div>
      <div className="flex-1 flex flex-col px-6 py-4 gap-3">
        <div className="font-bold text-base">{dungs.name}</div>
        <div className="text-black text-base">
          Số lượng: {dungs.quantity ?? 1}
        </div>
        <div className="font-bold text-xl">Giá: {dungs.price} FVT</div>
      </div>
    </div>
  );
}
