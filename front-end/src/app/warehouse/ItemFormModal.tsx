import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type WarehouseItemForm = {
  name: string;
  type: string;
  description: string;
  images: string;
  price: number;
  quantity: number;
};

export function ItemFormModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  isEdit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: WarehouseItemForm;
  setForm: React.Dispatch<React.SetStateAction<WarehouseItemForm>>;
  isEdit: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-white text-black rounded-2xl shadow-2xl p-5 max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl m-4 font-bold text-black">
            {isEdit ? "Sửa vật phẩm" : "Thông tin vật phẩm"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow"
        >
          <input
            type="text"
            placeholder="Tên vật phẩm"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
            disabled={!isEdit}
          />
          <select
            required
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
            disabled={!isEdit}
          >
            <option value="">Chọn loại</option>
            <option value="FERTILIZER">Phân bón</option>
            <option value="TREEROOT">Cây trồng</option>
          </select>
          <input
            type="text"
            placeholder="Ảnh (nhiều link, phẩy)"
            required
            value={form.images}
            onChange={(e) =>
              setForm((f) => ({ ...f, images: e.target.value }))
            }
            className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
            disabled={!isEdit}
          />
          <input
            type="number"
            placeholder="Giá"
            required
            value={form.price}
            onChange={(e) =>
              setForm((f) => ({ ...f, price: Number(e.target.value) }))
            }
            className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
            disabled={!isEdit}
          />
          <input
            type="number"
            placeholder="Số lượng"
            required
            value={form.quantity}
            onChange={(e) =>
              setForm((f) => ({ ...f, quantity: Number(e.target.value) }))
            }
            className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
            disabled={!isEdit}
          />
          <DialogFooter className="flex gap-2 mt-2">
            {isEdit && (
              <button
                type="submit"
                className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-neutral-900 transition"
              >
                Lưu
              </button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
