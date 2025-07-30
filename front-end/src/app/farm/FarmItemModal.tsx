import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FarmItem } from "./useFarmItems";

interface Props {
  open: boolean;
  mode: "edit" | "add";
  item?: FarmItem | null;
  onClose: () => void;
  onSave: () => void;
}

const TYPE_OPTIONS = [
  { value: "Cây trồng", label: "Cây trồng" },
  { value: "Phân bón", label: "Phân bón" },
];

export default function FarmItemModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<{
    name: string;
    type: "Cây trồng" | "Phân bón";
    description: string;
    images: string[];
    price: number;
    quantity: number;
  }>({
    name: "",
    type: "Cây trồng",
    description: "",
    images: [],
    price: 0,
    quantity: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fill dữ liệu khi sửa
  useEffect(() => {
    if (mode === "edit" && item) {
      setForm({
        name: item.name || "",
        type: item.type,
        description: item.description || "",
        images: item.images || [],
        price: item.price || 0,
        quantity: item.quantity || 0,
      });
    } else if (mode === "add") {
      setForm({
        name: "",
        type: "Cây trồng",
        description: "",
        images: [],
        price: 0,
        quantity: 0,
      });
    }
  }, [mode, item, open]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, type: e.target.value as "Cây trồng" | "Phân bón" });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const endpoint = mode === "edit" ? `items/${item?.id}` : "items";
      const method = mode === "edit" ? "PUT" : "POST";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/farms/${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Không thể lưu dữ liệu");
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving item:", error);
      // Có thể thêm toast notification ở đây
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto border-2 border-black bg-white">
        <DialogHeader className="pb-4 border-b border-gray-200">
          <DialogTitle className="text-xl font-bold text-black uppercase tracking-wide">
            {mode === "edit" ? "SỬA VẬT PHẨM" : "THÊM VẬT PHẨM"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div>
            <label className="text-sm font-bold text-black uppercase tracking-wide mb-2 block">
              Tên vật phẩm
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-black focus:outline-none"
              placeholder="Nhập tên vật phẩm..."
            />
          </div>

          <div>
            <label className="text-sm font-bold text-black uppercase tracking-wide mb-2 block">
              Mô tả
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-black focus:outline-none"
              placeholder="Nhập mô tả..."
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-black uppercase tracking-wide mb-2 block">
              Loại
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleTypeChange}
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-black focus:outline-none"
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-black uppercase tracking-wide mb-2 block">
                Giá (VNĐ)
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-black focus:outline-none"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-black uppercase tracking-wide mb-2 block">
                Số lượng
              </label>
              <input
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-black focus:outline-none"
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t border-gray-200 gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="border-2 border-gray-300 hover:border-black"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white hover:bg-gray-800 font-bold uppercase tracking-wide"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
