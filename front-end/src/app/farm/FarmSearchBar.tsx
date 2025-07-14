import React from "react";

interface FarmSearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  setShowAdd?: (show: boolean) => void;
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
        className="flex gap-2 w-full sm:w-auto bg-white dark:bg-black border border-black/10 dark:border-neutral-700 rounded-lg px-3 py-2"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm theo tên nông trại..."
          className="px-3 py-2 border border-black/10 dark:border-neutral-700 rounded-lg w-full sm:w-72 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/30 dark:focus:ring-white/30 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold shadow hover:bg-gray-900 dark:hover:bg-gray-200 transition"
        >
          Tìm kiếm
        </button>
      </form>
      {setShowAdd && (
        <button
          className="px-5 py-2 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white rounded-lg font-semibold shadow hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          onClick={() => setShowAdd(true)}
        >
          + Thêm nông trại
        </button>
      )}
    </div>
  );
}
