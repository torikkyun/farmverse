import React from "react";

export function Pagination({ meta, onPageChange }: any) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 bg-white dark:bg-neutral-900 border-t border-blue-200 dark:border-blue-700 rounded-b-2xl shadow-lg mt-2">
      <div className="flex items-center gap-2">
        <button
          className="flex items-center justify-center px-3 py-2 rounded-full text-sm font-semibold border border-blue-600 dark:border-blue-400 bg-white dark:bg-neutral-800 text-blue-700 dark:text-blue-200 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={meta.currentPage === 1}
          onClick={() => onPageChange(false)}
        >
          &lt;
        </button>
        <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold text-base shadow border border-blue-200 dark:border-blue-700 tracking-wide flex items-center gap-1">
          {meta.currentPage} / {meta.totalPages}
        </span>
        <button
          className="flex items-center justify-center px-3 py-2 rounded-full text-sm font-semibold border border-blue-600 dark:border-blue-400 bg-white dark:bg-neutral-800 text-blue-700 dark:text-blue-200 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition"
          disabled={meta.currentPage === meta.totalPages}
          onClick={() => onPageChange(true)}
        >
          &gt;
        </button>
      </div>
      <div className="text-xs text-gray-500">
        Tổng số: {meta.totalItems} vật phẩm
      </div>
    </div>
  );
}
