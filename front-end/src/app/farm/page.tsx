"use client";
import { useEffect, useState } from "react";
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

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function FarmPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const fetchFarms = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${apiURL}/farms?page=${page}&pageSize=${pageSize}`
      );
      const json = await res.json();
      setFarms(json.data.items || []);
      setMeta(json.data.meta || meta);
    } catch {
      setFarms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms(meta.currentPage, meta.pageSize);
    // eslint-disable-next-line
  }, []);

  const handlePageChange = (next: boolean) => {
    const newPage = next
      ? Math.min(meta.currentPage + 1, meta.totalPages)
      : Math.max(meta.currentPage - 1, 1);
    fetchFarms(newPage, meta.pageSize);
    setMeta((m) => ({ ...m, currentPage: newPage }));
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
        <div className="w-full flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          <div className="w-full px-2 sm:px-4 py-6 flex-1 flex flex-col gap-6">
            <div className="rounded-xl shadow border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ảnh</TableHead>
                      <TableHead>Tên nông trại</TableHead>
                      <TableHead>Chủ nông trại</TableHead>
                      <TableHead>Địa chỉ</TableHead>
                      <TableHead>Diện tích (ha)</TableHead>
                      <TableHead>Mô tả</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6}>Đang tải...</TableCell>
                      </TableRow>
                    ) : farms.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>Không có dữ liệu</TableCell>
                      </TableRow>
                    ) : (
                      farms.map((farm) => (
                        <TableRow key={farm.id}>
                          <TableCell>
                            <img
                              src={
                                farm.images?.[0] ||
                                `https://api.dicebear.com/7.x/shapes/svg?seed=farm${farm.id}`
                              }
                              alt="Farm"
                              className="w-12 h-12 rounded-lg object-cover border"
                            />
                          </TableCell>
                          <TableCell className="font-bold">
                            {farm.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img
                                src={
                                  farm.owner?.avatar ||
                                  `https://api.dicebear.com/7.x/adventurer/svg?seed=owner${
                                    farm.owner?.id || ""
                                  }`
                                }
                                alt="owner"
                                className="w-7 h-7 rounded-full border"
                              />
                              <span>{farm.owner?.name || "Chưa rõ"}</span>
                            </div>
                          </TableCell>
                          <TableCell>{farm.location}</TableCell>
                          <TableCell className="text-center">
                            {farm.size}
                          </TableCell>
                          <TableCell>{farm.description}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            {/* Phân trang */}
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
