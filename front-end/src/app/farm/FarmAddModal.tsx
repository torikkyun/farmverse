import React from "react";

export function FarmAddModal({
  showAdd,
  setShowAdd,
  addForm,
  setAddForm,
  handleAddFarm,
  addError,
  addSuccess,
}: any) {
  if (!showAdd) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Thêm nông trại mới</h2>
        <form onSubmit={handleAddFarm} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Tên nông trại"
            className="border px-3 py-2 rounded"
            required
            value={addForm.name}
            onChange={(e) =>
              setAddForm((f: any) => ({ ...f, name: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Mô tả"
            className="border px-3 py-2 rounded"
            required
            value={addForm.description}
            onChange={(e) =>
              setAddForm((f: any) => ({ ...f, description: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            className="border px-3 py-2 rounded"
            required
            value={addForm.location}
            onChange={(e) =>
              setAddForm((f: any) => ({ ...f, location: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="Diện tích (ha)"
            className="border px-3 py-2 rounded"
            required
            value={addForm.size}
            onChange={(e) =>
              setAddForm((f: any) => ({ ...f, size: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Ảnh (dán nhiều link, cách nhau dấu phẩy)"
            className="border px-3 py-2 rounded"
            required
            value={addForm.images}
            onChange={(e) =>
              setAddForm((f: any) => ({ ...f, images: e.target.value }))
            }
          />
          {addError && <div className="text-red-600 text-sm">{addError}</div>}
          {addSuccess && (
            <div className="text-green-600 text-sm">{addSuccess}</div>
          )}
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded font-semibold"
            >
              Thêm
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded font-semibold"
              onClick={() => setShowAdd(false)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
