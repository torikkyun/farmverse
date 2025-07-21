import React, { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
  const [showTermsModal, setShowTermsModal] = useState(false);

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
        if (onHideSelectedBar) onHideSelectedBar();
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose, onHideSelectedBar]);

  // Mặc định thuê 1 năm
  const now = new Date();
  const nextYear = new Date(now);
  nextYear.setFullYear(now.getFullYear() + 1);

  const [range] = useState<DateRange>({
    from: now,
    to: nextYear,
  });
  const [includesIot, setIncludesIot] = useState<boolean>(true);

  // Hàm gọi API thuê
  const handleCheckout = async () => {
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
      const res = await fetch(`${API_URL}/transactions/rent-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.message || "Lỗi khi thuê");
        setIsLoading(false);
        return;
      }
      setSuccess("Thuê thành công!");
    } catch {
      setError("Có lỗi xảy ra khi thuê!");
    } finally {
      setIsLoading(false);
    }
  };

  // Phân loại vật phẩm và cây trồng
  const itemsByType = {
    vatpham: items.filter((item) => item.type === "vatpham"),
    caytrong: items.filter((item) => item.type === "caytrong"),
    khac: items.filter((item) => !item.type),
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
              Thuê vật phẩm & cây trồng
            </h2>
            {/* Hiển thị vật phẩm */}
            {itemsByType.vatpham.length > 0 && (
              <div className="mb-8">
                <div className="font-bold text-lg mb-2">Vật phẩm</div>
                {itemsByType.vatpham.map((item) => (
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
            )}
            {/* Hiển thị cây trồng */}
            {itemsByType.caytrong.length > 0 && (
              <div className="mb-8">
                <div className="font-bold text-lg mb-2">Cây trồng</div>
                {itemsByType.caytrong.map((item) => (
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
            )}
            {/* Hiển thị các loại khác nếu có */}
            {itemsByType.khac.length > 0 && (
              <div className="mb-8">
                <div className="font-bold text-lg mb-2">Khác</div>
                {itemsByType.khac.map((item) => (
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
            )}
            <div className="mb-8">
              <div className="flex flex-row items-center gap-4">
                <div className="font-bold">
                  Thời gian thuê:{" "}
                  <p className="text-base text-gray-700 font-semibold bg-gray-100 rounded px-4 py-2 inline-block">
                    Từ: {now.toLocaleDateString()} đến:{" "}
                    {nextYear.toLocaleDateString()} (1 năm)
                  </p>
                </div>
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
                Tôi xác nhận đã đọc và đồng ý với
                <div
                  style={{ display: "inline-block", position: "relative" }}
                  onMouseEnter={() => setShowTermsModal(true)}
                  onMouseLeave={() => setShowTermsModal(false)}
                >
                  <span
                    className="underline text-black px-2 py-1 rounded transition-colors font-bold"
                    style={{ cursor: "pointer" }}
                  >
                    điều khoản thuê
                  </span>
                  {showTermsModal && (
                    <div
                      className="absolute left-full top-0 md:top-1/2 md:-translate-y-1/2 ml-6 z-[999999] bg-white text-black rounded-2xl shadow-2xl p-8 w-[400px] border border-black flex flex-col"
                      style={{ minHeight: 0 }}
                    >
                      <h3 className="font-bold text-2xl mb-6 text-center tracking-wide">
                        Bảng điều khoản thuê cây
                      </h3>
                      <table className="w-full text-left border-separate border-spacing-y-2 text-[16px] mb-6">
                        <thead>
                          <tr>
                            <th className="pb-2 font-semibold w-1/3 text-black">
                              Điều khoản
                            </th>
                            <th className="pb-2 font-semibold w-2/3 text-black">
                              Chi tiết
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="font-semibold align-top">
                              Thời gian thuê
                            </td>
                            <td className="font-bold text-black align-top">
                              Tối thiểu 1 năm
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold align-top">
                              Quyền chăm sóc
                            </td>
                            <td className="font-bold text-black align-top">
                              Người thuê được chăm sóc và theo dõi cây trồng
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold align-top">
                              Thiết bị IOT
                            </td>
                            <td className="font-bold text-black align-top">
                              Có thể thuê kèm thiết bị giám sát thông minh
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold align-top">
                              Thanh toán
                            </td>
                            <td className="font-bold text-black align-top">
                              Thanh toán bằng FVT, không hoàn lại
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold align-top">Cam kết</td>
                            <td className="font-bold text-black align-top">
                              Tuân thủ quy định FarmVerse, bảo vệ và không phá
                              hoại cây
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="text-base text-black mt-2 text-center font-semibold">
                        Vui lòng đọc kỹ bảng điều khoản trước khi xác nhận thuê
                        cây trồng.
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
            <div className="font-bold text-black text-xl border-t border-black/10 pt-6">
              Tổng: {items.reduce((sum, i) => sum + Number(i.price), 0)} FVT
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
              className="bg-black px-8 py-4 rounded font-bold text-white w-full mt-12 text-xl block hover:bg-gray-900 transition"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              Xác nhận thuê
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
