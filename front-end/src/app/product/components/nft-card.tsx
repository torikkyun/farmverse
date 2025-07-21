import Image from "next/image";

interface NFTItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity?: number; // Thêm dòng này
}

interface NFTCardProps {
  item: NFTItem;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function NFTCard({ item, selected, onSelect }: NFTCardProps) {
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
          src={item.image}
          alt={item.name}
          width={230}
          height={230}
          className="w-full aspect-[1/1] object-cover rounded-t-2xl border-b border-black/10 transition-all duration-200 group-hover:scale-105 bg-black"
          priority
        />
        <button
          onClick={() => onSelect(String(item.id))}
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
        <div className="font-bold text-base">Tên cây: {item.name}</div>
        <div className="text-black text-base">
          Số lượng: {item.quantity ?? 1}
        </div>
        <div className="font-bold text-xl">Giá: {item.price} FVT</div>
      </div>
    </div>
  );
}
