import React, { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRange } from "react-day-picker";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Item = {
  id: string | number;
  name: string;
  image: string;
  price: number | string;
  quantity?: number;
};

type ModalCheckoutProps = {
  items: Item[];
  onClose: () => void;
  action: "buy" | "sell" | string;
  onHideSelectedBar?: () => void; // Thêm prop này
};

export default function ModalCheckout({
  items,
  onClose,
  action,
  onHideSelectedBar, // nhận prop này
}: ModalCheckoutProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Thêm state success
  const [isLoading, setIsLoading] = useState<boolean>(false);

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
        if (onHideSelectedBar) onHideSelectedBar(); // Ẩn selectedBar
        onClose(); // Đóng modal
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose, onHideSelectedBar]);

  const [range, setRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [includesIot, setIncludesIot] = useState<boolean>(true);

  // Hàm gọi API mua hàng
  const handleCheckout = async () => {
    if (action !== "buy") return;
    setIsLoading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? (() => {
              const raw = localStorage.getItem("user");
              if (!raw) return "";
              try {
                const parsed = JSON.parse(raw);
                return parsed.accessToken || "";
              } catch {
                return "";
              }
            })()
          : "";
      const body = {
        items: items.map((item) => ({
          itemId: item.id,
          quantity: item.quantity ?? 1,
          includesIot: includesIot,
          startDate: range.from?.toISOString(),
          endDate: range.to?.toISOString(),
        })),
      };
      const res = await fetch(`${API_URL}/transactions/purchase-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.message || "Lỗi khi mua hàng");
        setIsLoading(false);
        return;
      }
      setSuccess("Mua hàng thành công!"); // Báo thành công
    } catch {
      setError("Có lỗi xảy ra khi mua hàng!");
    } finally {
      setIsLoading(false);
    }
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
          <div className="flex-1 p-12 bg-white">
            <h2 className="text-3xl font-bold text-black mb-8">Checkout</h2>
            <div className="mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-6 mb-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover border border-black/10"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-black text-xl">
                      {item.name}
                    </div>
                    <div className="text-gray-700 text-lg">
                      {item.price} FVT
                    </div>
                  </div>
                  <div className="text-black text-lg font-bold min-w-[70px] text-right">
                    X {item.quantity ?? 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-8">
              <div className="font-bold mb-2">Chọn khoảng thời gian thuê</div>
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                required
                className="rounded border"
              />
              <div className="mt-2 text-sm text-gray-700">
                {range.from && range.to
                  ? `Từ: ${range.from.toLocaleDateString()} đến: ${range.to.toLocaleDateString()}`
                  : "Vui lòng chọn khoảng thời gian"}
              </div>
            </div>
            <div className="mb-8 flex items-center gap-2">
              <Checkbox
                checked={includesIot}
                onCheckedChange={(checked) => setIncludesIot(!!checked)}
                id="iot-checkbox"
              />
              <label
                htmlFor="iot-checkbox"
                className="font-bold text-black cursor-pointer"
              >
                Thuê thiết bị theo dõi cây IOT
              </label>
            </div>
            <div className="font-bold text-black text-xl border-t border-black/10 pt-6">
              Tổng: {items.reduce((sum, i) => sum + Number(i.price), 0)} FVT
            </div>
          </div>
          {/* Right column: Payment method */}
          <div className="flex-1 p-12 border-t md:border-t-0 md:border-l border-black/10 flex flex-col justify-between bg-white">
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
              className="bg-black px-8 py-4 rounded font-bold text-white w-full mt-12 text-xl block hover:bg-gray-900 transition"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {action === "buy"
                ? "Xác nhận mua"
                : action === "sell"
                ? "Xác nhận bán"
                : "Xác nhận"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
