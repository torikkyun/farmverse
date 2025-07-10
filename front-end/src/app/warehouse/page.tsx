"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const nftItems = [
  {
    name: "Hạt giống lúa",
    code: "SEED-001",
    amount: 50,
    unit: "Túi",
    img: "https://api.dicebear.com/7.x/icons/png?seed=seed&backgroundColor=ffffff,000000&backgroundType=solid",
  },
  {
    name: "Phân bón hữu cơ",
    code: "FERT-002",
    amount: 20,
    unit: "Bao",
    img: "https://api.dicebear.com/7.x/icons/png?seed=leaf&backgroundColor=ffffff,000000&backgroundType=solid",
  },
  {
    name: "Máy cày mini",
    code: "TRACTOR-003",
    amount: 2,
    unit: "Chiếc",
    img: "https://api.dicebear.com/7.x/icons/png?seed=tractor&backgroundColor=ffffff,000000&backgroundType=solid",
  },
  {
    name: "Thuốc trừ sâu sinh học",
    code: "PEST-004",
    amount: 10,
    unit: "Chai",
    img: "https://api.dicebear.com/7.x/icons/png?seed=bottle&backgroundColor=ffffff,000000&backgroundType=solid",
  },
  {
    name: "Nước tưới tự động",
    code: "WATER-005",
    amount: 5,
    unit: "Bộ",
    img: "https://api.dicebear.com/7.x/icons/png?seed=water&backgroundColor=ffffff,000000&backgroundType=solid",
  },
];

export default function WarehousePage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof nftItems)[0] | null>(
    null
  );

  const handleOpenModal = (item: (typeof nftItems)[0]) => {
    setSelectedItem(item);
    setOpen(true);
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
        <div className="flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          <div className="w-full mx-auto sm:px-4 py-6 flex-1 flex flex-col gap-8">
            {/* Thanh tìm kiếm và lọc */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 w-full">
                <input
                  type="text"
                  placeholder="Tìm kiếm NFT, mã vật phẩm..."
                  className="flex-1 min-w-[140px] sm:min-w-[220px] px-4 py-2 rounded-full bg-white dark:bg-neutral-900 text-black dark:text-white border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition shadow-md"
                />
                <select className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-neutral-900 text-black dark:text-white border border-blue-200 dark:border-blue-700 focus:outline-none shadow-md">
                  <option>Lọc theo trạng thái</option>
                  <option>Còn hàng</option>
                  <option>Hết hàng</option>
                  <option>Đã xuất kho</option>
                </select>
              </div>
            </div>
            {/* Card danh sách vật phẩm */}
            <div className="rounded-2xl shadow-2xl border border-blue-200 dark:border-blue-700 bg-white dark:bg-neutral-900">
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
                  {nftItems.map((item) => (
                    <div
                      key={item.code}
                      className="flex flex-col items-center w-full bg-white dark:bg-neutral-800 rounded-2xl border border-blue-100 dark:border-blue-800 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 p-6 cursor-pointer"
                      onClick={() => handleOpenModal(item)}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-24 h-24 rounded-xl border-2 border-blue-300 dark:border-blue-700 object-cover bg-white dark:bg-black mb-4 shadow group-hover:scale-110 transition"
                      />
                      <div className="font-bold text-black dark:text-white text-center text-lg mb-1 truncate w-full">
                        {item.name}
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300 mb-1 text-center w-full font-medium">
                        Mã: {item.code}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-1 text-center w-full">
                        Số lượng:{" "}
                        <span className="font-semibold text-black dark:text-white">
                          {item.amount}
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-300">
                          {item.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal xem chi tiết vật phẩm */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-md p-0">
                {selectedItem && (
                  <div className="flex flex-col gap-6 p-8">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide text-center mb-4 drop-shadow">
                      Thông tin vật phẩm
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                      <img
                        src={selectedItem.img}
                        alt={selectedItem.name}
                        className="w-28 h-28 rounded-2xl border-2 border-blue-300 dark:border-blue-700 object-cover bg-white dark:bg-black shadow-xl"
                      />
                      <div className="flex flex-col gap-3 flex-1 items-center sm:items-start">
                        <div className="text-xl font-bold text-black dark:text-white text-center sm:text-left">
                          {selectedItem.name}
                        </div>
                        <div className="text-base text-blue-700 dark:text-blue-300 text-center sm:text-left font-semibold">
                          <span className="font-bold text-black dark:text-white">
                            Mã vật phẩm:
                          </span>{" "}
                          {selectedItem.code}
                        </div>
                        <div className="text-base text-gray-700 dark:text-gray-300 text-center sm:text-left">
                          <span className="font-semibold text-black dark:text-white">
                            Số lượng:
                          </span>{" "}
                          {selectedItem.amount} - {selectedItem.unit}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Phân trang chỉ dùng icon */}
            <div className="flex flex-col items-center gap-3 py-6 bg-white dark:bg-neutral-900 border-t border-blue-200 dark:border-blue-700 rounded-b-2xl shadow-lg mt-2">
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center justify-center px-3 py-2 rounded-full text-sm font-semibold border border-blue-600 dark:border-blue-400 bg-white dark:bg-neutral-800 text-blue-700 dark:text-blue-200 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                  aria-label="Trang trước"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold text-base shadow border border-blue-200 dark:border-blue-700 tracking-wide flex items-center gap-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="7" cy="10" r="2.5" />
                    <circle cx="13" cy="10" r="2.5" fillOpacity="0.5" />
                  </svg>
                </span>
                <button
                  className="flex items-center justify-center px-3 py-2 rounded-full text-sm font-semibold border border-blue-600 dark:border-blue-400 bg-white dark:bg-neutral-800 text-blue-700 dark:text-blue-200 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                  aria-label="Trang sau"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
