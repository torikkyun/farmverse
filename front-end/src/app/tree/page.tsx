"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TreeCard } from "./TreeCard";
import { TreeDetailModal } from "./TreeDetailModal";
import { TreeHarvestModal } from "./TreeHarvestModal";
import Pagination from "@/components/ui/pagination";

const treeItems = [
  {
    name: "Cây Xoài",
    type: "Giống Xoài Cát Chu",
    age: 1,
    yield: 0,
    status: "Đang phát triển",
    img: "https://api.dicebear.com/7.x/icons/png?seed=mango&backgroundColor=ffffff,000000&backgroundType=solid",
    schedule: [
      {
        date: "2025-07-01",
        action: "Gieo hạt/Trồng cây con",
        stage: "seedling",
      },
      { date: "2025-07-05", action: "Tưới nước hàng ngày", stage: "care" },
      { date: "2025-07-10", action: "Bón phân hữu cơ lần 1", stage: "care" },
      { date: "2025-07-15", action: "Kiểm tra sâu bệnh", stage: "protect" },
      { date: "2025-07-20", action: "Cắt tỉa cành non", stage: "care" },
      { date: "2025-08-01", action: "Bón phân hữu cơ lần 2", stage: "care" },
      { date: "2025-08-10", action: "Phun thuốc phòng sâu", stage: "protect" },
      { date: "2025-09-01", action: "Kiểm tra quả non", stage: "care" },
      {
        date: "2025-10-01",
        action: "Thu hoạch quả đầu tiên",
        stage: "harvest",
      },
    ],
  },
  {
    name: "Cây Cam",
    type: "Giống Cam Sành",
    age: 2,
    yield: 30,
    status: "Đang phát triển",
    img: "https://api.dicebear.com/7.x/icons/png?seed=orange&backgroundColor=ffffff,000000&backgroundType=solid",
    schedule: [
      { date: "2025-07-01", action: "Trồng cây giống", stage: "seedling" },
      { date: "2025-07-03", action: "Tưới nước hàng ngày", stage: "care" },
      { date: "2025-07-07", action: "Bón phân NPK lần 1", stage: "care" },
      { date: "2025-07-14", action: "Kiểm tra lá và thân", stage: "protect" },
      { date: "2025-07-21", action: "Cắt tỉa lá già", stage: "care" },
      { date: "2025-08-01", action: "Bón phân NPK lần 2", stage: "care" },
      { date: "2025-08-15", action: "Phun thuốc phòng bệnh", stage: "protect" },
      { date: "2025-09-10", action: "Kiểm tra quả", stage: "care" },
      { date: "2025-10-05", action: "Thu hoạch quả", stage: "harvest" },
    ],
  },
  {
    name: "Cây Bưởi",
    type: "Giống Bưởi Da Xanh",
    age: 3,
    yield: 60,
    status: "Có thể thu hoạch",
    img: "https://api.dicebear.com/7.x/icons/png?seed=grapefruit&backgroundColor=ffffff,000000&backgroundType=solid",
    schedule: [
      { date: "2025-07-01", action: "Trồng cây giống", stage: "seedling" },
      { date: "2025-07-04", action: "Tưới nước", stage: "care" },
      { date: "2025-07-09", action: "Bón phân hữu cơ", stage: "care" },
      { date: "2025-07-16", action: "Kiểm tra sâu bệnh", stage: "protect" },
      { date: "2025-07-23", action: "Cắt tỉa cành", stage: "care" },
      { date: "2025-08-02", action: "Bón phân vi sinh", stage: "care" },
      { date: "2025-08-18", action: "Phun thuốc phòng sâu", stage: "protect" },
      { date: "2025-09-15", action: "Kiểm tra quả", stage: "care" },
      { date: "2025-10-10", action: "Thu hoạch quả", stage: "harvest" },
    ],
  },
];

export default function TreePage() {
  const [open, setOpen] = useState(false);
  const [harvestOpen, setHarvestOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState<
    (typeof treeItems)[0] | null
  >(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
  });
  const userRole = "FARMER"; // hoặc lấy từ context, redux, v.v.

  const handleOpenModal = (item: (typeof treeItems)[0]) => {
    setSelectedTree(item);
    setOpen(true);
  };

  const handleOpenHarvestModal = (item: (typeof treeItems)[0]) => {
    setSelectedTree(item);
    setHarvestOpen(true);
  };

  const handleHarvest = (
    mode: "sell" | "storage",
    quantity: number,
    price?: number
  ) => {
    if (!selectedTree) return;

    console.log("Thu hoạch:", {
      tree: selectedTree.name,
      mode,
      quantity,
      price,
    });

    // Thực hiện logic thu hoạch ở đây
    // Ví dụ: gọi API, cập nhật state, hiển thị thông báo thành công

    alert(
      `Đã thu hoạch ${quantity}kg ${selectedTree.name} - ${
        mode === "sell"
          ? `Bán với giá ${price?.toLocaleString()} VNĐ`
          : "Lưu vào kho"
      }`
    );
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
                    <div
                      key={i}
                      className="relative flex flex-col items-center"
                    >
                      {/* Badge trạng thái thu hoạch nằm ngoài border */}
                      {item.status === "Có thể thu hoạch" && (
                        <span
                          className="mb-[-16px] z-10 bg-green-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow"
                          style={{ marginBottom: "-16px" }}
                        >
                          Có thể thu hoạch
                        </span>
                      )}
                      <div
                        className={`relative rounded-xl transition-all w-full ${
                          item.status === "Có thể thu hoạch"
                            ? "border-2 border-green-600 shadow-lg"
                            : "border border-transparent"
                        }`}
                      >
                        <TreeCard
                          item={item}
                          onClick={() => handleOpenModal(item)}
                        />
                      </div>
                      {/* Nút thu hoạch nằm dưới card, căn giữa */}
                      {item.status === "Có thể thu hoạch" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenHarvestModal(item);
                          }}
                          className="mt-3 bg-black text-white rounded-lg px-2 py-2 text-sm font-medium transition shadow"
                        >
                          Thu hoạch
                        </button>
                      )}
                    </div>
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

            {/* Modal thu hoạch */}
            <TreeHarvestModal
              open={harvestOpen}
              setOpen={setHarvestOpen}
              selectedTree={selectedTree}
              onHarvest={handleHarvest}
              userRole={userRole}
            />

            {/* Phân trang */}
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
