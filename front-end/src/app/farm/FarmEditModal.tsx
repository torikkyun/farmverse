import React from "react";

export function FarmEditModal({
  editFarm,
  setEditFarm,
  handleEditFarm,
  editError,
  editSuccess,
}: any) {
  if (!editFarm) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Sửa nông trại</h2>
        <form onSubmit={handleEditFarm} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Tên nông trại"
            className="border px-3 py-2 rounded"
            required
            value={editFarm.name}
            onChange={(e) =>
              setEditFarm((f: any) => ({ ...f, name: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Mô tả"
            className="border px-3 py-2 rounded"
            required
            value={editFarm.description}
            onChange={(e) =>
              setEditFarm((f: any) => ({ ...f, description: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            className="border px-3 py-2 rounded"
            required
            value={editFarm.location}
            onChange={(e) =>
              setEditFarm((f: any) => ({ ...f, location: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="Diện tích (ha)"
            className="border px-3 py-2 rounded"
            required
            value={editFarm.size}
            onChange={(e) =>
              setEditFarm((f: any) => ({ ...f, size: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Ảnh (dán nhiều link, cách nhau dấu phẩy)"
            className="border px-3 py-2 rounded"
            required
            value={editFarm.images}
            onChange={(e) =>
              setEditFarm((f: any) => ({ ...f, images: e.target.value }))
            }
          />
          {editError && <div className="text-red-600 text-sm">{editError}</div>}
          {editSuccess && (
            <div className="text-green-600 text-sm">{editSuccess}</div>
          )}
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded font-semibold"
            >
              Lưu
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded font-semibold"
              onClick={() => setEditFarm(null)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
