import { useState, useEffect } from "react";
import Image from "next/image";
import { NFTItem, DungItem } from "../[slug]/types";

interface SelectedItem {
  id: string;
  quantity: number;
}

interface ModalAddItemsProps {
  items: NFTItem[] | DungItem[];
  selectedItems: SelectedItem[];
  setSelectedItems: (items: SelectedItem[]) => void;
  activeTab: number;
  onClose: () => void;
}

export default function ModalAddItems({
  items,
  selectedItems,
  setSelectedItems,
  activeTab,
  onClose,
}: ModalAddItemsProps) {
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>(
    {}
  );
  const [normalizedSelectedItems, setNormalizedSelectedItems] = useState<
    SelectedItem[]
  >([]);

  useEffect(() => {
    let normalized: SelectedItem[] = [];
    if (
      selectedItems.length > 0 &&
      typeof (selectedItems as unknown[])[0] === "string"
    ) {
      normalized = (selectedItems as unknown[]).map((id) => ({
        id: id as string,
        quantity: 1,
      }));
    } else {
      normalized = selectedItems as SelectedItem[];
    }
    setNormalizedSelectedItems(normalized);

    const initialQuantities: Record<string, number> = {};
    normalized
      .filter(
        (item) => !!item && !!item.id && typeof item.quantity === "number"
      )
      .forEach(({ id, quantity }) => {
        initialQuantities[id] = quantity;
      });
    setItemQuantities(initialQuantities);

    console.log("selectedItems in useEffect", selectedItems);
    console.log("normalized", normalized);
    console.log("initialQuantities in useEffect", initialQuantities);
  }, [selectedItems]);

  // Lấy danh sách vật phẩm đang mua dựa trên normalizedSelectedItems
  const buyingItems = normalizedSelectedItems
    .map((selectedItem) => {
      const item = items.find((i) => i.id === selectedItem.id);
      return item
        ? {
            ...item,
            quantity: itemQuantities[item.id] || selectedItem.quantity,
          }
        : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  console.log("==================================================");
  console.log("itemQuantities", itemQuantities);
  console.log("selectedItems", selectedItems);
  console.log("items", items);
  console.log("buyingItems", buyingItems);
  console.log("==================================================");

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      const newQuantities = { ...itemQuantities };
      delete newQuantities[itemId];
      setItemQuantities(newQuantities);
    } else {
      setItemQuantities((prev) => ({
        ...prev,
        [itemId]: quantity,
      }));
    }
  };

  const handleConfirm = () => {
    const selected = Object.entries(itemQuantities)
      .filter(([, qty]) => qty > 0)
      .map(([id, quantity]) => ({ id, quantity }));
    setSelectedItems(selected);
    onClose();
  };

  const getTotalPrice = () => {
    return Object.keys(itemQuantities).reduce((total, itemId) => {
      const item = items.find((i) => i.id === itemId);
      if (item) {
        return total + item.price * itemQuantities[itemId];
      }
      return total;
    }, 0);
  };

  const getTotalQuantity = () => {
    return Object.values(itemQuantities).reduce((total, qty) => total + qty, 0);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-black text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {activeTab === 0 ? "Thêm cây trồng" : "Thêm phân bón"}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-3xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] bg-white">
          <div className="flex flex-col gap-4">
            {buyingItems.length > 0 ? (
              buyingItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white flex items-center gap-4"
                >
                  <Image
                    src={
                      Array.isArray(item.images) && item.images.length > 0
                        ? item.images[0]
                        : "/no-image.png"
                    }
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base mb-1">
                      {item.name}
                    </h3>
                    <p className="text-black font-bold text-base">
                      {item.price.toLocaleString()} FVT
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          Math.max(0, (itemQuantities[item.id] || 0) - 1)
                        )
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-black"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-lg text-black">
                      {itemQuantities[item.id] || 0}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          (itemQuantities[item.id] || 0) + 1
                        )
                      }
                      className="w-8 h-8 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Không có vật phẩm nào đang mua
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="text-black">
              <span className="font-semibold text-lg">
                Tổng: {getTotalQuantity()} sản phẩm
              </span>
              <span className="ml-6 font-bold text-black text-xl">
                {getTotalPrice().toLocaleString()} FVT
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              disabled={getTotalQuantity() === 0}
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Xác nhận ({getTotalQuantity()})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
