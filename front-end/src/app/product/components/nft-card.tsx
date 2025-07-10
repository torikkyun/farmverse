interface NFTItem {
  id: number;
  image: string;
  name: string;
  rank: string | number;
  price: string | number;
}

interface NFTCardProps {
  item: NFTItem;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function NFTCard({ item, selected, onSelect }: NFTCardProps) {
  return (
    <div
      className={`group bg-white border rounded-2xl p-0 flex flex-col items-stretch text-black relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200
        ${selected ? "border-blue-600 ring-2 ring-blue-400" : "border-black/10"}
      `}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover rounded-t-2xl grayscale border-b border-black/10 transition-all duration-200 group-hover:scale-105"
        />
        <button
          onClick={() => onSelect(String(item.id))}
          className={`absolute top-3 right-3 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200 shadow-lg
            ${
              selected
                ? "bg-blue-600 text-white opacity-100"
                : "bg-black/80 text-white opacity-0 group-hover:opacity-100 hover:bg-black"
            }
          `}
          title={selected ? "Bỏ chọn" : "Thêm vào giỏ hàng"}
          style={{ zIndex: 20, fontSize: 22 }}
        >
          +
        </button>
      </div>
      <div className="flex-1 flex flex-col px-4 py-3">
        <div className="font-bold text-base truncate">{item.name}</div>
        <div className="text-xs text-black/50 mb-1">{item.rank}</div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-lg">{item.price}</span>
        </div>
      </div>
    </div>
  );
}