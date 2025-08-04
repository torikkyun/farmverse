import { useEffect, useState } from "react";
import Image from "next/image";
import ModalCheckout from "../modal/ModalCheckout";
import ModalAddItems from "../modal/ModalAddItems";
import { NFTItem, DungItem, Farm } from "../[slug]/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SelectedBarProps {
  items: NFTItem[] | DungItem[];
  selectedItems: { id: string; quantity: number }[];
  setSelectedItems: (items: { id: string; quantity: number }[]) => void;
  activeTab: number;
  farm: Farm;
}

const formatPrice = (price: number) =>
  price.toLocaleString("en-US", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

export default function SelectedBar({
  items,
  selectedItems,
  setSelectedItems,
  activeTab,
  farm,
}: SelectedBarProps) {
  const [visible, setVisible] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAddItems, setShowAddItems] = useState(false);

  useEffect(() => {
    setVisible(activeTab === 0 || activeTab === 1);
  }, [activeTab]);
  if (!visible) return null;

  const selectedItemObjects = items
    .filter((i) =>
      selectedItems.some((sel) => sel.id === i.id && sel.quantity > 0)
    )
    .map((i) => ({
      ...i,
      quantity: selectedItems.find((sel) => sel.id === i.id)?.quantity ?? 0,
    }));

  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );
  const totalPriceNumber = selectedItems.reduce((sum, item) => {
    const found = items.find((i) => i.id === item.id);
    return sum + (found ? found.price * (item.quantity ?? 1) : 0);
  }, 0);
  const totalPrice = formatPrice(totalPriceNumber);

  const rentLabel =
    selectedItems.length > 0
      ? activeTab === 0
        ? `Thuê ${totalQuantity} cây trồng`
        : `Mua ${selectedItems.length} bao phân bón`
      : activeTab === 0
      ? "Thuê cây trồng"
      : "Mua bao phân bón";

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-black via-neutral-900 to-black text-white flex items-center px-3 md:px-8 py-3 md:py-4 z-50 shadow-2xl border-t border-white/10 transition-all duration-300">
        {/* Nút thêm sản phẩm */}
        <button
          className="flex items-center justify-center bg-black/60 border border-white/20 rounded-full px-4 py-2 mr-3 font-semibold hover:bg-white/10 transition-all"
          onClick={() => setShowAddItems(true)}
        >
          + Thêm
        </button>
        {/* Desktop: avatar, clear */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 mx-5 overflow-x-auto max-w-[220px] scrollbar-thin scrollbar-thumb-white/30">
            <TooltipProvider>
              {selectedItems.slice(0, 4).map((selected, idx) => {
                const selectedId = selected.id;
                const quantity = selected.quantity ?? 1;
                const item = items.find(
                  (i) => String(i.id) === String(selectedId)
                );
                if (!item)
                  return (
                    <span
                      key={`notfound-${selectedId}-${idx}`}
                      className="text-red-500"
                    >
                      Không tìm thấy: {selectedId}
                    </span>
                  );
                return (
                  <Tooltip key={`selected-item-${item.id}-${idx}`}>
                    <TooltipTrigger asChild>
                      <div className="relative flex items-center">
                        <Image
                          src={
                            Array.isArray(item.images) && item.images.length > 0
                              ? item.images[0]
                              : "/no-image.png"
                          }
                          alt={item.name}
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-md"
                        />
                        <span className="ml-1 text-white font-bold text-base">
                          x {quantity}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-black border border-gray-200">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
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
        {/* Nút thuê/mua */}
        <button
          className="flex-1 md:flex-none cursor-pointer bg-white text-black font-bold px-4 md:px-7 py-2 rounded-full text-base transition-all duration-200 mr-2 md:mr-5 whitespace-nowrap shadow-md border border-white"
          onClick={() => setShowCheckout(true)}
        >
          {rentLabel}
        </button>
        {/* Tổng số FVT */}
        <span className="font-semibold text-base md:text-lg mr-2 md:mr-5 whitespace-nowrap bg-white/10 px-3 py-1 rounded-full border border-white/20">
          {totalPrice} FVT
        </span>
        {/* Clear (desktop) */}
        <button
          className="hidden md:inline text-white ml-auto transition-all duration-200 cursor-pointer"
          onClick={() => setSelectedItems([])}
        >
          Xoá
        </button>
      </div>
      {/* Modal Add Items */}
      {showAddItems && (
        <ModalAddItems
          items={items}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          activeTab={activeTab}
          onClose={() => setShowAddItems(false)}
        />
      )}
      {/* Modal Checkout */}
      {showCheckout && (
        <ModalCheckout
          items={selectedItemObjects.map((item, idx) => ({
            ...item,
            id: item.id || `temp-${idx}`,
          }))}
          totalQuantity={totalQuantity}
          onClose={() => setShowCheckout(false)}
          onHideSelectedBar={() => {
            setSelectedItems([]);
            setShowCheckout(false);
          }}
          farm={farm}
        />
      )}
    </>
  );
}
