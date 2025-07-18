import { useEffect, useState } from "react";
import Image from "next/image";
import ModalCheckout from "./ModalCheckout"; // import thêm

interface Item {
  id: number;
  price: number;
  image: string;
  name: string;
}

interface SelectedBarProps {
  items: Item[];
  selectedItems: number[];
  action: "buy" | "sell";
  setAction: (a: "buy" | "sell") => void;
  setSelectedItems: (ids: number[]) => void;
  activeTab: number;
  onCheckout?: () => void;
}

export default function SelectedBar({
  items,
  selectedItems,
  action,
  setAction,
  setSelectedItems,
  activeTab,
}: SelectedBarProps) {
  const [visible, setVisible] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false); // thêm state

  useEffect(() => {
    setVisible(activeTab === 0 || activeTab === 1);
  }, [activeTab]);

  if (!visible) return null;

  const selectedItemObjects = items.filter((i) => selectedItems.includes(i.id));
  const totalPrice = (selectedItems.length * (items[0]?.price || 0)).toFixed(3);

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-black via-neutral-900 to-black text-white flex items-center px-3 md:px-8 py-3 md:py-4 z-50 shadow-2xl border-t border-white/10 transition-all duration-300">
        {/* Desktop: Buy/Sell, avatar, clear */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className={`px-5 py-2 rounded-full font-bold transition-all duration-200 shadow-sm border ${
              action === "buy"
                ? "bg-white text-black border-white scale-105"
                : "bg-black text-white border-white/30 hover:bg-white/10"
            }`}
            onClick={() => setAction("buy")}
          >
            Mua
          </button>
          <button
            className={`px-5 py-2 rounded-full font-bold transition-all duration-200 shadow-sm border ${
              action === "sell"
                ? "bg-white text-black border-white scale-105"
                : "bg-black text-white border-white/30 hover:bg-white/10"
            }`}
            onClick={() => setAction("sell")}
          >
            Bán
          </button>
          <div className="flex items-center gap-2 mx-5 overflow-x-auto max-w-[220px] scrollbar-thin scrollbar-thumb-white/30">
            {items
              .filter((i) => selectedItems.includes(i.id))
              .slice(0, 4)
              .map((i) => (
                <Image
                  key={i.id}
                  src={i.image}
                  alt={i.name}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-md"
                />
              ))}
            {selectedItems.length > 10 && (
              <span className="ml-2 text-xs text-white/80 min-w-[32px] font-semibold">
                +{selectedItems.length - 10}
              </span>
            )}
          </div>
        </div>
        {/* Số lượng (mobile) */}
        <span className="font-semibold text-base md:hidden mr-3 bg-white/10 px-2 py-1 rounded-full">
          {selectedItems.length}
        </span>
        {/* Nút mua/bán */}
        <button
          className={`flex-1 md:flex-none cursor-pointer bg-white text-black font-bold px-4 md:px-7 py-2 rounded-full text-base transition-all duration-200 mr-2 md:mr-5 whitespace-nowrap shadow-md border border-white`}
          onClick={() => setShowCheckout(true)}
        >
          {action === "buy" ? "Mua" : "Bán"} {selectedItems.length}
        </button>
        {/* Tổng số ETH */}
        <span className="font-semibold text-base md:text-lg mr-2 md:mr-5 whitespace-nowrap bg-white/10 px-3 py-1 rounded-full border border-white/20">
          {totalPrice} ETH
        </span>
        {/* Clear (desktop) */}
        <button
          className="hidden md:inline text-white ml-auto transition-all duration-200 cursor-pointer"
          onClick={() => setSelectedItems([])}
        >
          Xoá
        </button>
        
      </div>
      {showCheckout && (
        <ModalCheckout
          items={selectedItemObjects}
          action={action}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}
