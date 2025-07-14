import React from "react";

export default function FarmModal({
  open,
  setOpen,
  form,
  setForm,
  handleSubmit,
  error,
  success,
  mode = "add",
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  form: {
    name: string;
    description: string;
    location: string;
    size: string;
    images: string;
  };
  setForm: (form: {
    name: string;
    description: string;
    location: string;
    size: string;
    images: string;
  }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error?: string;
  success?: string;
  mode?: "add" | "edit";
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 p-6 rounded-2xl shadow-2xl w-full max-w-md mx-2 sm:mx-0">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white text-center">
          {mode === "add" ? "Thêm nông trại mới" : "Sửa nông trại"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Tên nông trại"
            className="border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mô tả"
            className="border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            className="border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <input
            type="number"
            placeholder="Diện tích (ha)"
            className="border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            required
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ảnh (dán nhiều link, cách nhau dấu phẩy)"
            className="border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            required
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
          />
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}
          <div className="flex gap-2 mt-2 flex-col sm:flex-row">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-white hover:text-black border border-black transition"
            >
              {mode === "add" ? "Thêm" : "Lưu"}
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2 bg-white text-black rounded-lg font-semibold border border-black hover:bg-black hover:text-white transition"
              onClick={() => {
                setOpen(false);
                setForm({
                  name: "",
                  description: "",
                  location: "",
                  size: "",
                  images: "",
                });
              }}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
