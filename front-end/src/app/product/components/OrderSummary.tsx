import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
// import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "../utils/checkoutUtils";
// import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation"; // Thêm dòng này

// type ItemsByType = {
//   tree: Item[];
//   fertilizer: Item[];
// };

type ContractData = {
  lessorName: string;
  lessorAddress: string;
  lessorPhone: string;
  lessorEmail: string;
  lesseeName: string;
  lesseeAddress: string;
  lesseePhone: string;
  lesseeEmail: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  lateFee: string;
  lessorRights: string;
  lesseeRights: string;
  disputeResolution: string;
};

type OrderSummaryProps = {
  itemsByType: {
    tree: Item[];
    fertilizer: Item[];
  };
  selectedItems: { id: string; quantity: number }[];
  total: number;
  agreeTerms: boolean;
  isLoading: boolean;
  contractData: ContractData;
  handleCheckout: () => Promise<void>;
  farm: Farm; // Thêm dòng này
  includesIot?: boolean;
  setIncludesIot?: (checked: boolean) => void;
};

// Thêm interface Farm nếu chưa có
interface Farm {
  name: string;
  address: {
    houseNumber?: string;
    street?: string;
    commune?: string;
    province?: string;
    city?: string;
  };
  user?: {
    email?: string;
  };
  signatureUrl?: string;
}

export default function OrderSummary({
  itemsByType,
  selectedItems,
  agreeTerms,
  contractData,
  lesseeSignature,
  farm, // Thêm dòng này
}: OrderSummaryProps & { lesseeSignature?: string }) {
  const router = useRouter(); // Thêm dòng này

  // State lưu trạng thái IOT cho từng cây
  const [iotSelections, setIotSelections] = useState<{ [id: string]: boolean }>(
    {}
  );

  // Khi danh sách cây thay đổi, tự động cập nhật iotSelections
  useEffect(() => {
    setIotSelections((prev) => {
      const newSelections: { [id: string]: boolean } = {};
      itemsByType.tree.forEach((item) => {
        newSelections[item.id] = prev[item.id] ?? false;
      });
      return newSelections;
    });
  }, [itemsByType.tree]);

  // Tạo state lưu danh sách cây với quantity
  // const [treeItems, setTreeItems] = useState<Item[]>(itemsByType.tree);

  // Hàm cập nhật số lượng
  // const handleQuantityChange = (id: string, newQuantity: number) => {
  //   setTreeItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  const handleIotChange = (id: string, checked: boolean) => {
    setIotSelections((prev) => ({ ...prev, [id]: checked }));
  };

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Hàm chuyển dataURL sang File
  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  }

  function formatDate(date: Date) {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  }

  // Thêm overlay loading
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div className="bg-white px-8 py-6 rounded-xl shadow-2xl flex flex-col items-center border border-gray-200">
        <span className="loader mb-4"></span>
        <span className="font-semibold text-black text-lg">
          Hợp đồng của bạn đang được xác nhận. Cảm ơn bạn đã đồng hành cùng
          FarmVerse!
        </span>
      </div>
      <style jsx>{`
        .loader {
          border: 4px solid #e5e7eb;
          border-top: 4px solid #38bdf8;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );

  const handleCheckoutAndRedirect = async () => {
    setAlert(null);
    setLoading(true);
    try {
      // Lấy accessToken từ localStorage
      const userStr = localStorage.getItem("user");
      const token =
        userStr && JSON.parse(userStr)?.accessToken
          ? JSON.parse(userStr).accessToken
          : null;
      if (!token) throw new Error("Không tìm thấy token đăng nhập!");

      // 1. Gửi chữ ký trước
      if (!lesseeSignature) throw new Error("Bạn chưa ký tên!");
      if (lesseeSignature === "data:image/png;base64,")
        throw new Error("Bạn chưa ký tên!");
      if (lesseeSignature.trim() === "") throw new Error("Bạn chưa ký tên!");

      const file = dataURLtoFile(lesseeSignature, "signature.png");
      const formData = new FormData();
      formData.append("signatureImage", file);

      console.log("lesseeSignature:", lesseeSignature);

      const signRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/contract/signature`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!signRes.ok) {
        const err = await signRes.json().catch(() => ({}));
        throw new Error(err.message || "Lưu chữ ký thất bại!");
      }

      const signData = await signRes.json();
      const signatureFileName = signData?.data?.signatureFileName;
      if (!signatureFileName)
        throw new Error("Không lấy được tên file chữ ký!");

      // 2. Chuẩn bị dữ liệu
      const today = new Date();
      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);

      // Chuẩn bị items theo format mới
      const items = itemsByTypeWithQuantity.tree.map((item) => ({
        itemId: item.id,
        quantity: item.quantity ?? 1,
        iot: !!iotSelections[item.id],
      }));

      // Chuẩn bị contract data theo format mới
      const contractPayload = {
        items,
        contract: {
          lessorName: farm.name,
          lessorAddress: [
            farm.address.houseNumber,
            farm.address.street,
            farm.address.commune,
            farm.address.province,
            farm.address.city,
          ]
            .filter(Boolean)
            .join(", "),
          lessorEmail: farm.user?.email || "",
          lesseeName: contractData.lesseeName,
          lesseeAddress: contractData.lesseeAddress,
          lesseeEmail: contractData.lesseeEmail,
          treeNames: itemsByTypeWithQuantity.tree.map((item) => item.name),
          totalTree: totalTreeQuantity,
          farmAddress: [
            farm.address.houseNumber,
            farm.address.street,
            farm.address.commune,
            farm.address.province,
            farm.address.city,
          ]
            .filter(Boolean)
            .join(", "),
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          totalPrice: grandTotal,
          currentDate: today.getDate(),
          currentMonth: today.getMonth() + 1,
          currentYear: today.getFullYear(),
          lessorSignature: signatureFileName,
          lesseeSignature: signatureFileName,
        },
      };

      const contractRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/contract`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(contractPayload),
        }
      );

      if (!contractRes.ok) {
        const err = await contractRes.json().catch(() => ({}));
        throw new Error(err.message || "Gửi hợp đồng thất bại!");
      }

      setAlert({
        type: "success",
        message: "Ký hợp đồng thành công! Đang chuyển trang...",
      });

      // Chờ 2s cho người dùng thấy thông báo, sau đó chuyển trang
      setTimeout(() => {
        router.push("/tree");
      }, 2000);
    } catch (err: unknown) {
      setAlert({
        type: "error",
        message: (err as Error)?.message || "Có lỗi xảy ra!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Tạo lại object itemsByType nhưng quantity đúng
  const itemsByTypeWithQuantity = {
    tree: selectedItems
      .map((sel) => {
        const item = itemsByType.tree.find((i) => i.id === sel.id);
        return item ? { ...item, quantity: sel.quantity } : null;
      })
      .filter(Boolean) as Item[],
    fertilizer: selectedItems
      .map((sel) => {
        const item = itemsByType.fertilizer.find((i) => i.id === sel.id);
        return item ? { ...item, quantity: sel.quantity } : null;
      })
      .filter(Boolean) as Item[],
  };

  const totalTreeQuantity = itemsByTypeWithQuantity.tree.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  // Tính tổng giá trị của cây trồng và phân bón
  const totalTreePrice = itemsByTypeWithQuantity.tree.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "string"
        ? parseFloat(item.price) * (item.quantity ?? 1)
        : item.price * (item.quantity ?? 1)),
    0
  );

  const totalFertilizerPrice = itemsByTypeWithQuantity.fertilizer.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "string"
        ? parseFloat(item.price) * (item.quantity ?? 1)
        : item.price * (item.quantity ?? 1)),
    0
  );

  const iotPrice = totalTreeQuantity * 500;

  const grandTotal = totalTreePrice + totalFertilizerPrice + iotPrice;

  // console.log("selectedItems:", selectedItems);
  // console.log("itemsByType:", itemsByType);
  // console.log("itemsByTypeWithQuantity:", itemsByTypeWithQuantity);

  return (
    <div className="flex-[1] p-8 bg-gray-100 overflow-y-auto min-w-[400px] max-w-[500px] border-l border-black">
      {loading && <LoadingOverlay />}
      <h2 className="text-2xl font-bold text-black mb-6">Chi tiết đơn hàng</h2>
      {/* Cây trồng */}
      {itemsByType.tree.length > 0 && (
        <div className="mb-6">
          {itemsByTypeWithQuantity.tree.map((item) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                type="tree"
                quantity={item.quantity ?? 1}
                includesIot={!!iotSelections[item.id]}
                setIncludesIot={(checked) => handleIotChange(item.id, checked)}
              />
            );
          })}
        </div>
      )}
      {/* Phân bón */}
      {itemsByType.fertilizer.length > 0 && (
        <div className="mb-6">
          {itemsByTypeWithQuantity.fertilizer.map((item) => (
            <ItemCard
              key={`fertilizer-${item.id}`}
              item={item}
              type="fertilizer"
              quantity={item.quantity ?? 1}
              // onQuantityChange={(newQuantity) =>
              //   handleQuantityChange(item.id, newQuantity)
              // }
            />
          ))}
        </div>
      )}
      {/* IOT checkbox */}
      {/* {itemsByType.tree.length > 0 && (
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg border border-black">
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
                  className="font-bold text-black cursor-pointer mb-2 block"
                >
                  📡 Thiết bị theo dõi IOT
                </label>
                <div className="text-black font-semibold mb-2">
                  +{(itemsByType.tree.length * 500).toLocaleString()} FVT
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <div>✓ Theo dõi độ ẩm đất 24/7</div>
                  <div>✓ Cảnh báo nhiệt độ và ánh sáng</div>
                  <div>✓ Thông báo tự động qua app</div>
                  <div>✓ Lịch sử dữ liệu chi tiết</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {/* Chi tiết thanh toán */}
      <div className="bg-white p-6 rounded-lg border-2 border-black mb-6">
        <div className="font-bold text-lg text-black mb-4">
          Chi tiết thanh toán
        </div>
        {Object.entries(itemsByTypeWithQuantity).map(
          ([type, typeItems]: [string, Item[]]) =>
            typeItems.length > 0 && (
              <div key={type} className="flex justify-between mb-2">
                <span className="text-gray-700">
                  {type === "tree"
                    ? "Cây trồng"
                    : type === "fertilizer"
                    ? "Phân bón"
                    : "Sản phẩm khác"}{" "}
                  (
                  {typeItems.reduce(
                    (sum, item) => sum + (item.quantity ?? 1),
                    0
                  )}{" "}
                  {type === "tree"
                    ? "cây"
                    : type === "fertilizer"
                    ? "bao"
                    : "sản phẩm"}
                  ):
                </span>
                <span className="font-semibold text-black">
                  {typeItems
                    .reduce(
                      (sum, item) =>
                        sum +
                        (typeof item.price === "string"
                          ? parseFloat(item.price) * (item.quantity ?? 1)
                          : item.price * (item.quantity ?? 1)),
                      0
                    )
                    .toLocaleString()}{" "}
                  FVT
                </span>
              </div>
            )
        )}
        {itemsByType.tree.length > 0 && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">
              Thiết bị IOT ({totalTreeQuantity} bộ):
            </span>
            <span className="font-semibold text-black">
              {(totalTreeQuantity * 500).toLocaleString()} FVT
            </span>
          </div>
        )}
        <div className="border-t border-black pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-bold text-xl text-black">Tổng cộng:</span>
            <span className="font-bold text-xl text-black">
              {grandTotal.toLocaleString()} FVT
            </span>
          </div>
        </div>
      </div>
      {/* Thông báo */}
      {alert && (
        <Alert
          variant={alert.type === "success" ? "default" : "destructive"}
          className="mb-4"
        >
          <AlertTitle>
            {alert.type === "success" ? "Thành công" : "Lỗi"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      {/* Nút xác nhận */}
      {itemsByType.tree.length > 0 && (
        <button
          className={`px-6 py-4 rounded-lg font-bold text-white w-full text-lg transition ${
            !agreeTerms ||
            loading ||
            !contractData.lesseeName ||
            !contractData.lesseeAddress ||
            !contractData.lesseePhone
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
          onClick={handleCheckoutAndRedirect}
          disabled={
            loading ||
            !agreeTerms ||
            !contractData.lesseeName ||
            !contractData.lesseeAddress ||
            !contractData.lesseePhone
          }
        >
          {loading ? "Đang xử lý..." : "Xác nhận"}
        </button>
      )}
      {itemsByType.tree.length === 0 && itemsByType.fertilizer.length > 0 && (
        <button
          className="px-6 py-4 rounded-lg font-bold text-white w-full text-lg bg-black hover:bg-gray-800 transition"
          // onClick={handleFertilizerCheckout} // Bạn cần viết hàm này để xử lý thanh toán vật phẩm
        >
          Thanh toán
        </button>
      )}
    </div>
  );
}
