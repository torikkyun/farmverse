import Image from "next/image";

interface NFTItem {
  id: number;
  image: string;
  name: string;
  price: number;
}

interface NFTCardProps {
  item: NFTItem;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function NFTCard({ item, selected, onSelect }: NFTCardProps) {
  return (
    <div className="relative group bg-white dark:bg-black border rounded-lg shadow p-4 transition hover:shadow-lg">
      <button
        className={`absolute top-2 right-2 transition p-1 rounded-full shadow-lg
          ${
            selected
              ? "bg-blue-600 text-white opacity-100"
              : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:text-white"
          }`}
        title={selected ? "Bỏ chọn" : "Thêm vào giỏ hàng"}
        style={{ zIndex: 20, fontSize: 22 }}
        onClick={() => onSelect(String(item.id))}
      >
        +
      </button>
      {item.image && (
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={128}
          className="w-full h-32 object-cover rounded mb-2 bg-black"
          priority
        />
      )}
      <div className="font-bold text-lg mb-1 line-clamp-1">{item.name}</div>
      <div className="text-blue-600 font-semibold mb-1">Giá: {item.price} FVT</div>
    </div>
  );
}
