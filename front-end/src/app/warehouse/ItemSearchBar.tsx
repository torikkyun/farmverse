import React from "react";

export function ItemSearchBar({
  search,
  setSearch,
  type,
  setType,
  onSearch,
}: any) {
  return (
    <form onSubmit={onSearch} className="flex gap-2 w-full sm:w-auto">
      <input
        type="text"
        placeholder="Tìm kiếm NFT, mã vật phẩm..."
        className="px-3 py-2 border rounded w-full sm:w-72"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="px-3 py-2 border rounded"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Tất cả loại</option>
        <option value="FERTILIZER">Phân bón</option>
        <option value="TREEROOT">Cây trồng</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded font-semibold"
      >
        Tìm kiếm
      </button>
    </form>
  );
}
