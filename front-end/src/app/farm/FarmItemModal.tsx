import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TreeItemProduct, ItemProduct } from "@/data/product";

interface Props {
  open: boolean;
  mode: "edit" | "add";
  item?: TreeItemProduct | ItemProduct;
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
        type: item.type as "Cây trồng" | "Phân bón",
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

  // Lưu dữ liệu vào file tạm thời (state hoặc callback)
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      // Giả lập lưu vào data file (thực tế sẽ cập nhật state cha hoặc context)
      onSave();
      onClose();
      setLoading(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Sửa vật phẩm" : "Thêm vật phẩm"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-2">
          <label className="text-sm font-medium">Tên vật phẩm</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            placeholder="Tên vật phẩm"
          />
          <label className="text-sm font-medium">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            placeholder="Mô tả"
          />
          <label className="text-sm font-medium">Loại</label>
          <select
            name="type"
            value={form.type}
            onChange={handleTypeChange}
            className="border rounded px-2 py-1"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <label className="text-sm font-medium">Giá</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            placeholder="Giá"
          />
          <label className="text-sm font-medium">Số lượng</label>
          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            placeholder="Số lượng"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
