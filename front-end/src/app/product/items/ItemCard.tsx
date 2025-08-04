import Image from "next/image";
import { Item } from "../utils/checkoutUtils";

export default function ItemCard({
  item,
  type,
  quantity,
}: {
  item: Item;
  type: string;
  quantity: number;
  // onQuantityChange: (newQuantity: number) => void;
  includesIot?: boolean;
  setIncludesIot?: (checked: boolean) => void;
}) {
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
        {/* Hiển thị số lượng, không có nút tăng/giảm */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-700">Số lượng: {quantity}</span>
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
          {typeof item.price === "string"
            ? item.price
            : item.price.toLocaleString()}{" "}
          FVT{type === "tree" ? "/năm" : type === "fertilizer" ? "/bao" : ""}
        </div>
      </div>
    </div>
  );
}
