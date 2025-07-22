import React, { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

type Item = {
  id: string | number;
  name: string;
  image: string;
  price: number | string;
  quantity?: number;
  type?: string; // Thêm type để phân biệt vật phẩm/cây trồng
};

type ModalCheckoutProps = {
  items: Item[];
  onClose: () => void;
  onHideSelectedBar?: () => void;
};

export default function ModalCheckout({
  items,
  onClose,
  onHideSelectedBar,
}: ModalCheckoutProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  React.useEffect(() => {
    if (success) {
      // Đóng SelectedBar ngay lập tức khi thành công
      if (onHideSelectedBar) onHideSelectedBar();

      const timer = setTimeout(() => {
        setSuccess(null);
        onClose(); // Đóng modal sau 1 giây
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose, onHideSelectedBar]);

  // Mặc định thuê 1 năm
  const now = new Date();
  const nextYear = new Date(now);
  nextYear.setFullYear(now.getFullYear() + 1);

  const [includesIot, setIncludesIot] = useState<boolean>(true);

  // Hàm xử lý checkout đơn giản
  const handleCheckout = async () => {
    if (!agreeTerms) {
      setError("Vui lòng đồng ý với điều khoản!");
      return;
    }

    setIsLoading(true);

    // Simulate processing time: 20 - 30s (random)
    const randomDelay = 10000; // 10000 ms = 10s
    setTimeout(() => {
      setSuccess("Đơn hàng đã được xác nhận thành công!");
      setIsLoading(false);
    }, randomDelay);
  };

  // Phân loại vật phẩm và cây trồng theo type mới với quantity mặc định là 1
  const itemsByType = {
    caytrong: items
      .filter((item) => item.type === "tree" || item.type === "caytrong")
      .map((item) => ({ ...item, quantity: item.quantity || 1 })),
    phanbon: items
      .filter((item) => item.type === "fertilizer" || item.type === "phanbon")
      .map((item) => ({ ...item, quantity: item.quantity || 1 })),
    khac: items
      .filter(
        (item) =>
          !item.type ||
          (item.type !== "tree" &&
            item.type !== "fertilizer" &&
            item.type !== "caytrong" &&
            item.type !== "phanbon")
      )
      .map((item) => ({ ...item, quantity: item.quantity || 1 })),
  };

  // Tính tổng tiền bao gồm cả IOT
  const calculateTotal = () => {
    const baseTotal = items.reduce((sum, item) => {
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price) || 0
          : item.price || 0;
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);

    return baseTotal;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center w-screen h-screen">
      {/* Overlay loading toàn màn hình */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white mb-8"></div>
          <div className="text-white text-2xl font-bold mb-2">
            Đang xử lý giao dịch...
          </div>
          <div className="text-white text-lg">
            Vui lòng đợi trong giây lát, FarmVerse đang xác nhận đơn hàng của
            bạn 🌱
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl w-screen max-w-none h-screen relative flex flex-col p-0">
        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
            <Alert variant="destructive">
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
        {success && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
            <Alert variant="default">
              <AlertTitle>Thành công</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          </div>
        )}
        <button
          className="absolute top-6 right-8 text-black text-2xl z-10"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left column: Product info & chọn ngày/IOT */}
          <div className="flex-[2] p-12 bg-white overflow-y-auto">
            <h2 className="text-3xl font-bold text-black mb-8">
              Thuê cây trồng & mua phân bón
            </h2>

            {/* Hiển thị cây trồng */}
            {itemsByType.caytrong.length > 0 && (
              <div className="mb-8">
                <div className="font-bold text-lg mb-4 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                  🌱 Cây trồng (Thuê)
                </div>
                {itemsByType.caytrong.map((item) => (
                  <div
                    key={`tree-${item.id}`}
                    className="flex items-center gap-6 mb-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-500"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover border border-green-200"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-black text-xl">
                        {item.name}
                      </div>
                      <div className="text-green-700 text-lg font-semibold">
                        {typeof item.price === "string"
                          ? item.price
                          : item.price.toLocaleString()}{" "}
                        FVT/năm
                      </div>
                      <div className="text-sm text-gray-600">
                        Thời hạn thuê: 1 năm
                      </div>
                    </div>
                    <div className="text-black text-lg font-bold min-w-[70px] text-right">
                      SL: 1
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Hiển thị các loại khác nếu có */}
            {itemsByType.khac.length > 0 && (
              <div className="mb-8">
                {itemsByType.khac.map((item) => (
                  <div
                    key={`other-${item.id}`}
                    className="flex items-center gap-6 mb-6 bg-gray-50 p-4 rounded-lg "
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-black text-xl">
                        {item.name}
                      </div>
                      <div className="text-gray-700 text-lg">
                        {typeof item.price === "string"
                          ? item.price
                          : item.price.toLocaleString()}{" "}
                        FVT
                      </div>
                    </div>
                    <div className="text-black text-lg font-bold min-w-[70px] text-right">
                      SL: 1
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Hiển thị phân bón */}
            {itemsByType.phanbon.length > 0 && (
              <div className="mb-8">
                <div className="font-bold text-lg mb-4 text-amber-700 bg-amber-50 px-4 py-2 rounded-lg">
                  🌾 Phân bón (Mua)
                </div>
                {itemsByType.phanbon.map((item) => (
                  <div
                    key={`fertilizer-${item.id}`}
                    className="flex items-center gap-6 mb-6 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover border border-amber-200"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-black text-xl">
                        {item.name}
                      </div>
                      <div className="text-amber-700 text-lg font-semibold">
                        {typeof item.price === "string"
                          ? item.price
                          : item.price.toLocaleString()}{" "}
                        FVT/bao
                      </div>
                      <div className="text-sm text-gray-600">
                        Mua sở hữu vĩnh viễn
                      </div>
                    </div>
                    <div className="text-black text-lg font-bold min-w-[70px] text-right">
                      SL: 1
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Thông tin thời gian thuê - chỉ hiển thị nếu có cây trồng */}
            {itemsByType.caytrong.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-row items-center gap-4">
                  <div className="font-bold">
                    Thời gian thuê cây trồng:{" "}
                    <p className="text-base text-gray-700 font-semibold bg-gray-100 rounded px-4 py-2 inline-block">
                      Từ: {now.toLocaleDateString()} đến:{" "}
                      {nextYear.toLocaleDateString()} (1 năm)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* IOT checkbox - chỉ hiển thị nếu có cây trồng */}
            {itemsByType.caytrong.length > 0 && (
              <div className="mb-8">
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={includesIot}
                      onCheckedChange={(checked) => setIncludesIot(!!checked)}
                      id="iot-checkbox"
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="iot-checkbox"
                        className="font-bold text-black cursor-pointer text-lg mb-2 block"
                      >
                        📡 Thiết bị theo dõi IOT
                      </label>
                      <div className="text-gray-700 font-semibold mb-2">
                        +{(itemsByType.caytrong.length * 500).toLocaleString()}{" "}
                        FVT ({itemsByType.caytrong.length} thiết bị × 500 FVT)
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>✓ Theo dõi độ ẩm đất 24/7</div>
                        <div>✓ Cảnh báo nhiệt độ và ánh sáng</div>
                        <div>✓ Thông báo tự động qua app</div>
                        <div>✓ Lịch sử dữ liệu chi tiết</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Terms checkbox */}
            <div className="mb-8 flex items-center gap-2">
              <Checkbox
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                id="terms-checkbox"
              />
              <label
                htmlFor="terms-checkbox"
                className="font-bold text-black cursor-pointer"
              >
                Tôi xác nhận đã đọc và đồng ý với điều khoản
              </label>
            </div>

            {/* Tổng tiền */}
            <div className="font-bold text-black text-xl border-t border-black/10 pt-6">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                <div className="text-2xl">
                  Tổng thanh toán: {calculateTotal().toLocaleString()} FVT
                </div>
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  {itemsByType.caytrong.length > 0 && (
                    <div>
                      • {itemsByType.caytrong.length} cây trồng (thuê 1 năm)
                    </div>
                  )}
                  {itemsByType.phanbon.length > 0 && (
                    <div>• {itemsByType.phanbon.length} bao phân bón (mua)</div>
                  )}
                  {includesIot && itemsByType.caytrong.length > 0 && (
                    <div>
                      • {itemsByType.caytrong.length} thiết bị IOT (thuê kèm)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Payment method */}
          <div className="flex-[1] p-12 border-t md:border-t-0 md:border-l border-black/10 flex flex-col justify-between bg-white min-w-[440px] max-w-[540px]">
            <div>
              <div className="font-bold text-black mb-6 text-xl">
                PHƯƠNG THỨC THANH TOÁN
              </div>
              <div className="flex flex-col gap-6 mb-8">
                <button className="bg-black text-white px-6 py-4 rounded flex items-center gap-4 text-lg hover:bg-gray-900 transition shadow">
                  <span className="text-3xl">🦊</span> MetaMask
                </button>
              </div>
            </div>

            <button
              className={`px-8 py-4 rounded font-bold text-white w-full mt-12 text-xl block transition ${
                !agreeTerms || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900"
              }`}
              onClick={handleCheckout}
              disabled={isLoading || !agreeTerms}
            >
              {isLoading ? "Đang xử lý..." : "Xác nhận đơn hàng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
