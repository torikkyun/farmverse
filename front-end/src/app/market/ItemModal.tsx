import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { X, Store, Package, DollarSign } from "lucide-react";
import { Item } from "./types/market";

interface ItemModalProps {
  item: Item | null;
  onClose: () => void;
  onPurchase?: (item: Item) => void;
}

export function ItemModal({ item, onClose, onPurchase }: ItemModalProps) {
  if (!item) return null;

  const getItemTypeLabel = (type: string): string => {
    const typeLabels: Record<string, string> = {
      FERTILIZER: "Phân bón",
      TREEROOT: "Cây giống",
      SEED: "Hạt giống",
      FRUIT: "Trái cây",
    };
    return typeLabels[type] || type;
  };

  const handlePurchase = () => {
    onPurchase?.(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-4xl lg:max-w-5xl overflow-hidden border my-4 sm:my-0">
        {/* Header */}
        <div className="bg-black text-white px-4 sm:px-6 py-3 sm:py-4 relative">
          <h2 className="text-lg sm:text-xl font-bold text-center">
            Chi tiết sản phẩm
          </h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Đóng modal"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Main Content - Scrollable */}
        <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] sm:max-h-none overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Image Section */}
            <div className="order-1 lg:order-1">
              <div className="relative">
                <Image
                  src={item.images?.[0] || "/images/default.png"}
                  alt={item.name}
                  width={500}
                  height={400}
                  className="rounded-lg sm:rounded-xl w-full h-48 sm:h-64 lg:h-80 object-contain bg-gray-50 border"
                  priority
                />
                {/* Item Type Badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <Badge className="bg-white text-black border border-black font-bold text-xs sm:text-sm">
                    {getItemTypeLabel(item.type)}
                  </Badge>
                </div>
              </div>

              {/* Additional Images */}
              {item.images && item.images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                  {item.images.slice(1, 4).map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${item.name} ${index + 2}`}
                      width={80}
                      height={80}
                      className="rounded-lg w-16 h-16 sm:w-20 sm:h-20 object-cover border border-black flex-shrink-0"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="order-2 lg:order-2 space-y-3 sm:space-y-4">
              {/* Product Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-black leading-tight">
                {item.name}
              </h3>

              {/* Farm Info */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="w-4 h-4 text-black flex-shrink-0" />
                  <span className="font-bold text-black text-sm sm:text-base">
                    Nông trại
                  </span>
                </div>
                <p className="text-gray-700 font-medium text-sm sm:text-base">
                  {item.farm?.name || "Không xác định"}
                </p>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black">
                <h4 className="font-bold text-black mb-2 text-sm sm:text-base">
                  Mô tả sản phẩm
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {item.description ||
                    "Chưa có mô tả chi tiết cho sản phẩm này."}
                </p>
              </div>

              {/* Price and Quantity */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 border border-black">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                    <span className="text-xs sm:text-sm font-bold text-black">
                      Giá bán
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-black">
                    {item.price?.toLocaleString()} FVT
                  </p>
                </div>

                <div className="bg-gray-100 rounded-lg p-3 sm:p-4 border border-black">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                    <span className="text-xs sm:text-sm font-bold text-black">
                      Số lượng
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-black">
                    {item.quantity ?? "∞"}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black">
                <h4 className="font-bold text-black mb-2 sm:mb-3 text-sm sm:text-base">
                  Thông tin bổ sung
                </h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mã sản phẩm:</span>
                    <span className="font-bold text-black">#{item.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span className="font-bold text-black">
                      {item.quantity && item.quantity > 0
                        ? "Còn hàng"
                        : "Hết hàng"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Loại sản phẩm:</span>
                    <span className="font-bold text-black">
                      {getItemTypeLabel(item.type)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="bg-gray-100 px-4 sm:px-6 py-3 sm:py-4 border-t border-black">
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-black bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base order-2 sm:order-1"
            >
              Đóng
            </button>
            <button
              onClick={handlePurchase}
              disabled={item.quantity === 0}
              className={`w-full sm:w-auto px-4 sm:px-6 py-2 font-bold rounded-lg transition-colors text-sm sm:text-base order-1 sm:order-2 ${
                item.quantity === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 border border-black"
              }`}
            >
              {item.quantity === 0 ? "Hết hàng" : "Mua ngay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
