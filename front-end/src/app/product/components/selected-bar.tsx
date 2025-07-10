interface Item {
  id: number;
  price: string;
  image: string;
  name: string;
}

interface SelectedBarProps {
  items: Item[];
  selectedItems: number[];
  action: "buy" | "sell";
  setAction: (a: "buy" | "sell") => void;
  setSelectedItems: (ids: number[]) => void;
}

export default function SelectedBar({
  items,
  selectedItems,
  action,
  setAction,
  setSelectedItems,
}: SelectedBarProps) {
  const totalPrice = (
    selectedItems.length * (parseFloat(items[0].price) || 0)
  ).toFixed(3);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#18191A] text-white flex items-center px-2 md:px-6 py-2 md:py-3 z-50 shadow-2xl border-t border-black/30">
      {/* Desktop: Buy/Sell, avatar, clear */}
      <div className="hidden md:flex items-center gap-2">
        <button
          className={`px-4 py-2 rounded-full font-bold transition ${
            action === "buy"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-white"
          }`}
          onClick={() => setAction("buy")}
        >
          Mua
        </button>
        <button
          className={`px-4 py-2 rounded-full font-bold transition ${
            action === "sell"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-white/60 hover:text-white"
          }`}
          onClick={() => setAction("sell")}
        >
          Bán
        </button>
        <div className="flex items-center gap-1 mx-4 overflow-x-auto max-w-[240px] scrollbar-thin scrollbar-thumb-white/30">
          {items
            .filter((i) => selectedItems.includes(i.id))
            .slice(0, 4)
            .map((i) => (
              <img
                key={i.id}
                src={i.image}
                alt={i.name}
                className="w-8 h-8 rounded border-2 border-white object-cover shadow"
              />
            ))}
          {selectedItems.length > 10 && (
            <span className="ml-1 text-xs text-white/80 min-w-[32px]">
              +{selectedItems.length - 10}
            </span>
          )}
        </div>
      </div>
      {/* Số lượng (mobile) */}
      <span className="font-semibold text-base md:hidden mr-2">
        {selectedItems.length}
      </span>
      {/* Nút mua */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 md:px-6 py-2 rounded-full text-base transition mr-2 md:mr-4 whitespace-nowrap"
        onClick={() => alert(`${action === "buy" ? "Mua" : "Bán"} `)}
      >
        {action === "buy" ? "Mua" : "Bán"} {selectedItems.length}
      </button>
      {/* Tổng số ETH */}
      <span className="font-semibold text-base md:text-lg mr-2 md:mr-4 whitespace-nowrap">
        {totalPrice} ETH
      </span>
      {/* Clear (desktop) */}
      <button
        className="hidden md:inline text-white/70 hover:text-white underline ml-auto"
        onClick={() => setSelectedItems([])}
      >
        Xoá lọc
      </button>
    </div>
  );
}
