import React from "react";

interface FarmSearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  setShowAdd: (show: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function FarmSearchBar({
  search,
  setSearch,
  handleSearch,
  setShowAdd,
  inputRef,
}: FarmSearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
      <form
        onSubmit={handleSearch}
        className="flex gap-2 w-full sm:w-auto bg-white border border-black/10 rounded-lg px-3 py-2"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm theo tên nông trại..."
          className="px-3 py-2 border border-black/10 rounded-lg w-full sm:w-72 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/30 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition"
        >
          Tìm kiếm
        </button>
      </form>
      <button
        className="px-5 py-2 bg-white text-black border border-black rounded-lg font-semibold shadow hover:bg-black hover:text-white transition"
        onClick={() => setShowAdd(true)}
      >
        + Thêm nông trại
      </button>
    </div>
  );
}
