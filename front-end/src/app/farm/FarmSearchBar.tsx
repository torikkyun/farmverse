import React from "react";

export function FarmSearchBar({
  search,
  setSearch,
  handleSearch,
  setShowAdd,
  inputRef,
}: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mb-2">
      <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm theo tên nông trại..."
          className="px-3 py-2 border rounded w-full sm:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded font-semibold"
        >
          Tìm kiếm
        </button>
      </form>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded font-semibold"
        onClick={() => setShowAdd(true)}
      >
        + Thêm nông trại
      </button>
    </div>
  );
}
