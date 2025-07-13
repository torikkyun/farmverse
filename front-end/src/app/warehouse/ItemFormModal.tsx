import React from "react";

export function ItemFormModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  isEdit,
}: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? "Sửa vật phẩm" : "Thêm vật phẩm mới"}
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Tên vật phẩm"
            required
            value={form.name}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, name: e.target.value }))
            }
            className="border px-3 py-2 rounded"
          />
          <select
            required
            value={form.type}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, type: e.target.value }))
            }
            className="border px-3 py-2 rounded"
          >
            <option value="">Chọn loại</option>
            <option value="FERTILIZER">Phân bón</option>
            <option value="TREEROOT">Cây trồng</option>
          </select>
          <input
            type="text"
            placeholder="Mô tả"
            required
            value={form.description}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, description: e.target.value }))
            }
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Ảnh (nhiều link, phẩy)"
            required
            value={form.images}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, images: e.target.value }))
            }
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Giá"
            required
            value={form.price}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, price: e.target.value }))
            }
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Số lượng"
            required
            value={form.quantity}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, quantity: e.target.value }))
            }
            className="border px-3 py-2 rounded"
          />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded font-semibold"
            >
              {isEdit ? "Lưu" : "Thêm"}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded font-semibold"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
