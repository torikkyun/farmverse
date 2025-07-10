import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FarmPage() {
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
        <div className="w-full flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          <div className="w-full px-2 sm:px-4 py-6 flex-1 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                <button className="bg-black dark:bg-white text-white dark:text-black font-bold px-6 py-2 rounded-full shadow hover:scale-105 transition border border-black dark:border-white whitespace-nowrap">
                  + Thêm nông trại mới
                </button>
                <input
                  type="text"
                  placeholder="Tìm kiếm nông trại, chủ nông trại..."
                  className="flex-1 min-w-[200px] sm:min-w-[320px] px-4 py-2 rounded-full bg-gray-100 dark:bg-neutral-900 text-black dark:text-white border border-gray-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
                <select className="w-auto px-4 py-2 rounded-full bg-gray-100 dark:bg-neutral-900 text-black dark:text-white border border-gray-300 dark:border-neutral-700 focus:outline-none">
                  <option>Lọc theo trạng thái</option>
                  <option>Đang hoạt động</option>
                  <option>Tạm dừng</option>
                  <option>Đã đóng</option>
                </select>
              </div>
            </div>
            <div className="rounded-xl shadow border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-neutral-800 text-black dark:text-white">
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap w-20">
                        Ảnh
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Tên nông trại
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Chủ nông trại
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Địa chỉ
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Diện tích (ha)
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Sản lượng (tấn/năm)
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Trạng thái
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Hành động
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...Array(8)].map((_, i) => (
                      <TableRow
                        key={i}
                        className="border-t border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                      >
                        <TableCell className="px-4 py-3 whitespace-nowrap w-20">
                          <img
                            src={`https://api.dicebear.com/7.x/shapes/svg?seed=farm${i}`}
                            alt="Farm"
                            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-neutral-700 object-cover"
                          />
                        </TableCell>
                        <TableCell className="px-4 py-3 font-bold text-black dark:text-white whitespace-nowrap">
                          Nông trại #{i + 1}
                        </TableCell>
                        <TableCell className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-2">
                            <img
                              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=owner${i}`}
                              alt="owner"
                              className="w-6 h-6 rounded-full border border-gray-300 dark:border-neutral-700"
                            />
                            <span className="text-black dark:text-white">
                              Chủ{i + 1}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-black dark:text-white whitespace-nowrap">
                          Thôn {i + 1}, Xã ABC
                        </TableCell>
                        <TableCell className="px-4 py-3 text-black dark:text-white whitespace-nowrap text-center">
                          {(i + 2) * 5}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-black dark:text-white whitespace-nowrap text-center">
                          {(i + 1) * 20}
                        </TableCell>
                        <TableCell className="px-4 py-3 whitespace-nowrap text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold shadow whitespace-nowrap
                              ${
                                i % 3 === 0
                                  ? "bg-black text-white dark:bg-white dark:text-black"
                                  : i % 3 === 1
                                  ? "bg-gray-300 text-black dark:bg-neutral-700 dark:text-white"
                                  : "bg-gray-100 text-black dark:bg-neutral-800 dark:text-white"
                              }
                            `}
                          >
                            {i % 3 === 0
                              ? "Đang hoạt động"
                              : i % 3 === 1
                              ? "Tạm dừng"
                              : "Đã đóng"}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 flex gap-2 whitespace-nowrap justify-center">
                          <button className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-xs font-bold border border-black dark:border-white hover:scale-105 transition">
                            Sửa
                          </button>
                          <button className="bg-white dark:bg-black text-black dark:text-white px-3 py-1 rounded-full text-xs font-bold border border-black dark:border-white hover:scale-105 transition">
                            Xoá
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            {/* Phân trang */}
            <div className="flex flex-col items-center gap-2 py-4 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 rounded-b-xl shadow-sm">
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-full text-xs bg-black dark:bg-white text-white dark:text-black font-semibold border border-black dark:border-white shadow hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Trước
                </button>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-semibold text-xs shadow border border-gray-200 dark:border-neutral-700">
                  1 / 5
                </span>
                <button className="px-3 py-1.5 rounded-full text-xs bg-black dark:bg-white text-white dark:text-black font-semibold border border-black dark:border-white shadow hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
