import React from "react";

export function ItemSearchBar({
  search,
  setSearch,
  type,
  setType,
  onSearch,
}: any) {
  return (
    <form
      onSubmit={onSearch}
      className="flex gap-2 w-full sm:w-auto bg-white dark:bg-black border border-black/10 dark:border-neutral-700 rounded-lg px-3 py-2"
    >
      <input
        type="text"
        placeholder="Tìm kiếm NFT, mã vật phẩm..."
        className="px-3 py-2 border border-black/10 dark:border-neutral-700 rounded-lg w-full sm:w-72 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/30 dark:focus:ring-white/30 transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded font-semibold"
      >
        Tìm kiếm
      </button>
      <select
        className="px-3 py-2 border border-black/10 dark:border-neutral-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Tất cả loại</option>
        <option value="FERTILIZER">Phân bón</option>
        <option value="TREEROOT">Cây trồng</option>
      </select>
    </form>
  );
}
