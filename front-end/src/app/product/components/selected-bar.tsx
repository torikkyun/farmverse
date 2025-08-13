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
import { Plus, Trash2, Eye, Package } from "lucide-react";

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

  const hasSelectedItems = selectedItems.length > 0;

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-200 shadow-2xl z-50 transition-all duration-300">
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm"></div>

        {/* Main content */}
        <div className="relative flex items-center justify-between px-4 md:px-8 py-4 gap-4 max-w-7xl mx-auto">
          {/* Left Section: Add Button + Item Preview */}
          <div className="flex items-center gap-4">
            {/* Selected Items Preview */}
            <div className="hidden md:flex items-center gap-3">
              <TooltipProvider>
                {selectedItems.slice(0, 3).map((selected, idx) => {
                  const item = items.find(
                    (i) => String(i.id) === String(selected.id)
                  );
                  if (!item) return null;

                  return (
                    <Tooltip key={`selected-item-${item.id}-${idx}`}>
                      <TooltipTrigger asChild>
                        <div className="relative group/item">
                          <Image
                            src={
                              Array.isArray(item.images) &&
                              item.images.length > 0
                                ? item.images[0]
                                : "/no-image.png"
                            }
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-xl border-2 border-gray-200 object-cover shadow-md group-hover/item:border-black transition-all duration-300"
                          />
                          {/* Quantity badge */}
                          <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                            {selected.quantity ?? 1}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white border border-gray-700 rounded-lg p-3">
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs opacity-80 mt-1">
                          Số lượng: {selected.quantity ?? 1}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>

              {selectedItems.length > 3 && (
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 border-2 border-gray-200 rounded-xl">
                  <span className="text-sm font-bold text-gray-600">
                    +{selectedItems.length - 3}
                  </span>
                </div>
              )}
            </div>

            {/* Add Button */}
            <button
              className="group flex items-center justify-center bg-black hover:bg-gray-800 text-white rounded-2xl px-5 py-3 font-bold transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => setShowAddItems(true)}
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">Thêm</span>
              <span className="sm:hidden">Thêm</span>
            </button>
          </div>

          {/* Center Section: Summary Info */}
          <div className="flex items-center gap-3">
            {/* Items Count */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3 border border-gray-200">
              <Package className="w-5 h-5 text-gray-600" />
              <div className="text-center">
                <div className="font-bold text-gray-900 text-sm">
                  {hasSelectedItems ? totalQuantity : 0}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  sản phẩm
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-black text-white rounded-xl px-4 py-3 border border-gray-300">
              <div className="text-center">
                <div className="text-lg font-black">{totalPrice}</div>
                <div className="text-xs font-bold opacity-80 uppercase tracking-wide">
                  FVT
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Main Action Button */}
            <button
              className="group bg-black hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={() => setShowCheckout(true)}
              disabled={!hasSelectedItems}
            >
              <Eye className="w-5 h-5" />
              <span className="hidden lg:inline">
                {activeTab === 0 ? "Thuê ngay" : "Mua ngay"}
              </span>
              <span className="lg:hidden">
                {activeTab === 0 ? "Thuê" : "Mua"}
              </span>
            </button>

            {/* Clear Button */}
            {hasSelectedItems && (
              <button
                className="group bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl p-3 transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-red-200"
                onClick={() => setSelectedItems([])}
                title="Xóa tất cả"
              >
                <Trash2 className="w-5 h-5 group-hover:animate-bounce" />
              </button>
            )}
          </div>
        </div>
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
