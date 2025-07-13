import React from "react";

export function FarmPagination({ meta, handlePageChange }: any) {
  return (
    <div className="flex flex-col items-center gap-2 py-4 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 rounded-b-xl shadow-sm">
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1.5 rounded-full text-xs bg-black dark:bg-white text-white dark:text-black font-semibold border border-black dark:border-white shadow hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={meta.currentPage === 1}
          onClick={() => handlePageChange(false)}
        >
          Trước
        </button>
        <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-semibold text-xs shadow border border-gray-200 dark:border-neutral-700">
          {meta.currentPage} / {meta.totalPages}
        </span>
        <button
          className="px-3 py-1.5 rounded-full text-xs bg-black dark:bg-white text-white dark:text-black font-semibold border border-black dark:border-white shadow hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={meta.currentPage === meta.totalPages}
          onClick={() => handlePageChange(true)}
        >
          Sau
        </button>
      </div>
      <div className="text-xs text-gray-500">
        Tổng số: {meta.totalItems} nông trại
      </div>
    </div>
  );
}
