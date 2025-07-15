import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
}

export interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  // Hiển thị tối đa 3 trang: prev, current, next
  const pages: number[] = [];
  if (meta.totalPages <= 3) {
    for (let i = 1; i <= meta.totalPages; i++) pages.push(i);
  } else {
    if (meta.currentPage === 1) {
      pages.push(1, 2, 3);
    } else if (meta.currentPage === meta.totalPages) {
      pages.push(meta.totalPages - 2, meta.totalPages - 1, meta.totalPages);
    } else {
      pages.push(meta.currentPage - 1, meta.currentPage, meta.currentPage + 1);
    }
  }

  return (
    <nav
      className="flex w-full justify-center py-6 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 rounded-b-2xl shadow-lg mt-2"
      aria-label="pagination"
    >
      <ul className="flex items-center gap-4">
        <li>
          <button
            className="flex items-center gap-2 px-5 h-10 rounded-lg font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            disabled={meta.currentPage === 1}
            onClick={() => onPageChange(meta.currentPage - 1)}
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Trang Trước</span>
          </button>
        </li>
        {pages.map((page) =>
          page > 0 && page <= meta.totalPages ? (
            <li key={page}>
              <button
                className={`w-10 h-10 rounded-md flex items-center justify-center font-semibold text-sm ${
                  page === meta.currentPage
                    ? "bg-transparent text-black border-2 border-black dark:text-white dark:border-white"
                    : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                } transition`}
                style={
                  page === meta.currentPage
                    ? { boxShadow: "0 0 0 0 #fff, 0 0 0 1px #000" }
                    : {}
                }
                onClick={() => onPageChange(page)}
                aria-current={page === meta.currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ) : null
        )}
        <li>
          <button
            className="flex items-center gap-2 px-5 h-10 rounded-lg font-semibold text-black dark:text-white transition disabled:opacity-40 disabled:cursor-not-allowed text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800"
            disabled={meta.currentPage === meta.totalPages}
            onClick={() => onPageChange(meta.currentPage + 1)}
          >
            <span className="hidden sm:inline">Trang Sau</span>
            <ChevronRight size={18} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
