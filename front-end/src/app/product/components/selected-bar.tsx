import { useEffect, useState } from "react";
import Image from "next/image";
import ModalCheckout from "./ModalCheckout";
import { NFTItem } from "../[slug]/types";

interface SelectedBarProps {
  items: NFTItem[]; // Sửa từ Item[] thành NFTItem[]
  selectedItems: number[];
  setSelectedItems: (ids: number[]) => void;
  activeTab: number;
  onCheckout: () => void;
}

function formatPrice(price: number): string {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

export default function SelectedBar({
  items,
  selectedItems,
  setSelectedItems,
  activeTab,
}: SelectedBarProps) {
  const [visible, setVisible] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    setVisible(activeTab === 0 || activeTab === 1);
  }, [activeTab]);

  if (!visible) return null;

  const selectedItemObjects = items.filter((i) => selectedItems.includes(i.id));
  const totalQuantity = selectedItemObjects.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );
  const totalPrice = formatPrice(
    selectedItemObjects.reduce(
      (sum, item) => sum + item.price * (item.quantity ?? 1),
      0
    )
  );

  // Xác định loại sản phẩm đang thuê
  let rentLabel = "Thuê";
  if (selectedItems.length > 0) {
    if (activeTab === 0) {
      rentLabel = `Thuê ${selectedItems.length} cây trồng`;
    } else if (activeTab === 1) {
      rentLabel = `Mua ${selectedItems.length} bao phân bón`;
    }
  } else {
    if (activeTab === 0) {
      rentLabel = "Thuê cây trồng";
    } else if (activeTab === 1) {
      rentLabel = "Mua bao phân bón";
    }
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-black via-neutral-900 to-black text-white flex items-center px-3 md:px-8 py-3 md:py-4 z-50 shadow-2xl border-t border-white/10 transition-all duration-300">
        {/* Desktop: avatar, clear */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 mx-5 overflow-x-auto max-w-[220px] scrollbar-thin scrollbar-thumb-white/30">
            {items
              .filter((i) => selectedItems.includes(i.id))
              .slice(0, 4)
              .map((i, index) => (
                <Image
                  key={`selected-item-${i.id}-${index}`}
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
          {totalQuantity}
        </span>
        {/* Nút thuê */}
        <button
          className="flex-1 md:flex-none cursor-pointer bg-white text-black font-bold px-4 md:px-7 py-2 rounded-full text-base transition-all duration-200 mr-2 md:mr-5 whitespace-nowrap shadow-md border border-white"
          onClick={() => setShowCheckout(true)}
        >
          {rentLabel}
        </button>
        {/* Tổng số FVT */}
        <span className="font-semibold text-base md:text-lg mr-2 md:mr-5 whitespace-nowrap bg-white/10 px-3 py-1 rounded-full border border-white/20">
          {Number(totalPrice).toLocaleString()} FVT
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
          items={selectedItemObjects.map((item, index) => ({
            ...item,
            id: item.id || `temp-${index}`, // Đảm bảo mỗi item có id hợp lệ
          }))}
          onClose={() => setShowCheckout(false)}
          onHideSelectedBar={() => setVisible(false)}
        />
      )}
    </>
  );
}
