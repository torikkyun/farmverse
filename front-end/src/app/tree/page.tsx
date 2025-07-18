"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TreeCard } from "./TreeCard";
import { TreeDetailModal } from "./TreeDetailModal";
import Pagination from "@/components/ui/pagination";

const treeItems = [
  {
    name: "Cây 1",
    type: "Giống A",
    age: 2,
    yield: 50,
    status: "Đang phát triển",
    img: "https://api.dicebear.com/7.x/icons/png?seed=tree1&backgroundColor=ffffff,000000&backgroundType=solid",
    schedule: [
      { date: "2025-07-01", action: "Tưới nước" },
      { date: "2025-07-05", action: "Bón phân" },
      { date: "2025-07-10", action: "Kiểm tra sâu bệnh" },
    ],
  },
  {
    name: "Cây 2",
    type: "Giống B",
    age: 3,
    yield: 100,
    status: "Đã thu hoạch",
    img: "https://api.dicebear.com/7.x/icons/png?seed=tree2&backgroundColor=ffffff,000000&backgroundType=solid",
  },
  // ...thêm các cây khác tương tự...
];

export default function TreePage() {
  const [open, setOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState<
    (typeof treeItems)[0] | null
  >(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
  });

  const handleOpenModal = (item: (typeof treeItems)[0]) => {
    setSelectedTree(item);
    setOpen(true);
  };

  const handlePageChange = (page: number) => {
    setMeta((prev) => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, prev.totalPages)),
    }));
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col dark:from-neutral-900 dark:via-black dark:to-neutral-900 min-h-screen transition-colors">
          <div className="w-full px-2 sm:px-4 py-8 flex-1 flex flex-col gap-10">
            {/* Thanh tìm kiếm và lọc */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 w-full">
                <div className="relative flex-1 w-full sm:min-w-[320px]">
                  <input
                    type="text"
                    placeholder="Tìm kiếm cây, giống cây..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border bg-white/90 dark:bg-neutral-900/90 text-black dark:text-white focus:outline-none focus:ring-2 transition"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </span>
                </div>
                <select className="w-auto px-4 py-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-black dark:text-white border focus:outline-none">
                  <option>Lọc theo trạng thái</option>
                  <option>Đang phát triển</option>
                  <option>Đã thu hoạch</option>
                  <option>Đã bán</option>
                </select>
              </div>
            </div>
            {/* Card danh sách cây */}
            <div className="rounded-2xl bg-white/95 dark:bg-neutral-900/95">
              <div className="p-6">
                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    gap-8
                  "
                >
                  {treeItems.map((item, i) => (
                    <TreeCard
                      key={i}
                      item={item}
                      onClick={() => handleOpenModal(item)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal chi tiết cây */}
            <TreeDetailModal
              open={open}
              setOpen={setOpen}
              selectedTree={selectedTree}
            />

            {/* Phân trang */}
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
