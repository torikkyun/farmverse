"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const treeItems = [
  {
    name: "Cây 1",
    type: "Giống A",
    age: 2,
    yield: 50,
    status: "Đang phát triển",
    img: "https://api.dicebear.com/7.x/icons/png?seed=tree1&backgroundColor=ffffff,000000&backgroundType=solid",
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

  const handleOpenModal = (item: (typeof treeItems)[0]) => {
    setSelectedTree(item);
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
                      className="flex flex-col items-center w-full dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 rounded-2xl border shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 p-4 cursor-pointer group"
                      onClick={() => handleOpenModal(item)}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-24 h-24 rounded-2xl border-2 border-green-300 dark:border-green-700 object-cover bg-white dark:bg-black mb-4 shadow group-hover:scale-110 transition"
                      />
                      <div className="font-bold text-black dark:text-white text-center text-base mb-1 truncate w-full">
                        {item.name}
                      </div>
                      <div className="text-base text-green-700 dark:text-green-300 mb-1 text-center w-full font-medium">
                        {item.type}
                      </div>
                      <div className="font-semibold text-base text-black dark:text-gray-300 mb-1 text-center w-full">
                        Tuổi: {item.age} năm
                      </div>
                      <div className="font-semibold text-base text-black dark:text-gray-300 mb-1 text-center w-full">
                        Sản lượng: {item.yield} kg/năm
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow bg-opacity-90 whitespace-nowrap
                            ${
                              item.status === "Đang phát triển"
                                ? "bg-green-600 text-white"
                                : item.status === "Đã thu hoạch"
                                ? "bg-yellow-400 text-black"
                                : "bg-gray-300 text-black dark:bg-neutral-700 dark:text-white"
                            }
                          `}
                        >
                          {item.status === "Đang phát triển" && (
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 2a1 1 0 0 1 1 1v2.382l.447.276a7 7 0 1 1-2.894 0l.447-.276V3a1 1 0 0 1 1-1z" />
                            </svg>
                          )}
                          {item.status === "Đã thu hoạch" && (
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal chi tiết cây */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-md p-0">
                {selectedTree && (
                  <div className="flex flex-col gap-6 p-8">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300 uppercase tracking-wide text-center mb-4 drop-shadow">
                      Thông tin cây
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8">
                      <img
                        src={selectedTree.img}
                        alt={selectedTree.name}
                        className="w-32 h-32 rounded-2xl border-2 border-green-300 dark:border-green-700 object-cover bg-white dark:bg-black shadow-xl"
                      />
                      <div className="flex flex-col gap-3 flex-1 items-center sm:items-start">
                        <div className="text-xl font-bold text-black dark:text-white text-center sm:text-left">
                          {selectedTree.name}
                        </div>
                        <div className="text-base text-green-700 dark:text-green-300 text-center sm:text-left font-semibold">
                          <span className="font-bold text-black dark:text-white">
                            Giống:
                          </span>{" "}
                          {selectedTree.type}
                        </div>
                        <div className="text-base text-gray-700 dark:text-gray-300 text-center sm:text-left">
                          <span className="font-semibold text-black dark:text-white">
                            Tuổi:
                          </span>{" "}
                          {selectedTree.age} năm
                        </div>
                        <div className="text-base text-gray-700 dark:text-gray-300 text-center sm:text-left">
                          <span className="font-semibold text-black dark:text-white">
                            Sản lượng:
                          </span>{" "}
                          {selectedTree.yield} kg/năm
                        </div>
                        <div className="mt-2 text-center sm:text-left">
                          <span className="font-semibold text-black dark:text-white mr-1">
                            Trạng thái:
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow bg-opacity-90 whitespace-nowrap
                              ${
                                selectedTree.status === "Đang phát triển"
                                  ? "bg-green-600 text-white"
                                  : selectedTree.status === "Đã thu hoạch"
                                  ? "bg-yellow-400 text-black"
                                  : "bg-gray-300 text-black dark:bg-neutral-700 dark:text-white"
                              }
                            `}
                          >
                            {selectedTree.status === "Đang phát triển" && (
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 2a1 1 0 0 1 1 1v2.382l.447.276a7 7 0 1 1-2.894 0l.447-.276V3a1 1 0 0 1 1-1z" />
                              </svg>
                            )}
                            {selectedTree.status === "Đã thu hoạch" && (
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {selectedTree.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Phân trang */}
            <div className="flex flex-col items-center gap-3 py-6 bg-white dark:bg-neutral-900 border-t border-green-200 dark:border-green-700 rounded-b-2xl shadow-lg mt-2">
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center justify-center px-3 py-2 rounded-full text-sm font-semibold border border-green-600 dark:border-green-400 bg-white dark:bg-neutral-800 text-green-700 dark:text-green-200 shadow hover:bg-green-50 dark:hover:bg-green-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-bold text-base shadow border border-green-200 dark:border-green-700 tracking-wide flex items-center gap-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="7" cy="10" r="2.5" />
                    <circle cx="13" cy="10" r="2.5" fillOpacity="0.5" />
                  </svg>
                </span>
                <button
                  className="flex items-center justify-center px-3 py-2 rounded-full text-sm font-semibold border border-green-600 dark:border-green-400 bg-white dark:bg-neutral-800 text-green-700 dark:text-green-200 shadow hover:bg-green-50 dark:hover:bg-green-900 transition"
                  aria-label="Trang sau"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
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
