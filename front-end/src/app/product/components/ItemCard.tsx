import Image from "next/image";
import { Item } from "../utils/checkoutUtils";

export default function ItemCard({
  item,
  type,
  quantity,
  onQuantityChange,
}: // includesIot,
// setIncludesIot,
{
  item: Item;
  type: string;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  includesIot?: boolean;
  setIncludesIot?: (checked: boolean) => void;
}) {
  const handleIncrease = () => onQuantityChange(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  return (
    <div className="flex items-center gap-4 mb-4 bg-white p-4 rounded-lg border border-black">
      <Image
        src={item.images[0]}
        alt={item.name}
        width={60}
        height={60}
        className="w-15 h-15 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="font-bold text-black">{item.name}</div>
        <div className="text-black font-semibold">
          {typeof item.price === "string"
            ? item.price
            : item.price.toLocaleString()}{" "}
          FVT{type === "tree" ? "/năm" : type === "fertilizer" ? "/bao" : ""}
        </div>
        {/* Nút tăng/giảm số lượng đặt ngay dưới giá */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-700">Số lượng:</span>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={handleDecrease}
              className="px-2 py-1 hover:bg-gray-100 text-gray-600"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-3 py-1 min-w-[40px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 hover:bg-gray-100 text-gray-600"
            >
              +
            </button>
          </div>
        </div>
        {/* {type === "tree" &&
          typeof includesIot === "boolean" &&
          setIncludesIot && (
            <div className="mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includesIot}
                  onChange={(e) => setIncludesIot(e.target.checked)}
                  className="accent-black"
                />
                <span className="font-semibold text-black">
                  📡 Thêm thiết bị theo dõi IOT (+500 FVT)
                </span>
              </label>
              <div className="text-xs text-gray-600 ml-7">
                ✓ Theo dõi độ ẩm đất 24/7
                <br />
                ✓ Cảnh báo nhiệt độ và ánh sáng
                <br />
                ✓ Thông báo tự động qua app
                <br />✓ Lịch sử dữ liệu chi tiết
              </div>
            </div>
          )} */}
      </div>
      <div className="text-right">
        <div className="font-semibold text-black">
          {(typeof item.price === "string"
            ? parseFloat(item.price) * quantity
            : item.price * quantity
          ).toLocaleString()}{" "}
          FVT
        </div>
      </div>
    </div>
  );
}
