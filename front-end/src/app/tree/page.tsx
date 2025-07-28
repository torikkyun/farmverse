"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TreeDetailModal from "./TreeDetailModal";
import { TreeHarvestModal } from "./TreeHarvestModal";
import Pagination from "@/components/ui/pagination";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Search, Clipboard } from "lucide-react";
import { TreeCard } from "./TreeCard";
import type { TreeItem } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Định nghĩa interface cho cây thuê
interface RentedTree {
  id: string;
  name: string;
  description: string;
  images: string[];
  status: string;
  totalProfit: number;
  startDate: string;
  endDate: string;
}

export default function TreePage() {
  const [open, setOpen] = useState(false);
  const [harvestOpen, setHarvestOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState<RentedTree | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [trees, setTrees] = useState<RentedTree[]>([]);
  const [loadingTrees, setLoadingTrees] = useState(false);

  const fetchTrees = async () => {
    setLoadingTrees(true);
    try {
      // Lấy token từ localStorage
      const userStr = localStorage.getItem("user");
      const userObj = userStr ? JSON.parse(userStr) : null;
      const token = userObj?.accessToken;

      const params = new URLSearchParams({
        page: meta.currentPage.toString(),
        pageSize: meta.pageSize.toString(),
        ...(search ? { search } : {}),
        ...(status ? { status } : {}),
      });

      const res = await fetch(`${API_URL}/rented-trees?${params}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json();
      setTrees(data.data.items || []);
      setMeta((prev) => ({
        ...prev,
        totalPages: data.data.meta.totalPages || 1,
        totalItems: data.data.meta.totalItems || 0,
      }));
    } catch {
      setTrees([]);
    }
    setLoadingTrees(false);
  };

  useEffect(() => {
    fetchTrees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.currentPage, search, status]);

  const handleOpenModal = (item: RentedTree) => {
    setSelectedTree(item);
    setOpen(true);
  };

  const handleOpenHarvestModal = (item: RentedTree) => {
    setSelectedTree(item);
    setHarvestOpen(true);
  };

  const handleHarvest = (
    mode: "sell" | "storage",
    quantity: number,
    price?: number
  ) => {
    if (!selectedTree) return;

    setIsLoading(true);
    setShowAlert(false);

    setTimeout(() => {
      setIsLoading(false);
      setAlertContent({
        title: "Thu hoạch thành công!",
        description: `Đã thu hoạch ${quantity}kg ${selectedTree.name} - ${
          mode === "sell"
            ? `Bán với giá ${price?.toLocaleString()} VNĐ`
            : "Lấy vật phẩm và lưu vào kho"
        }`,
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }, 5000);
  };

  const handlePageChange = (page: number) => {
    setMeta((prev) => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, prev.totalPages)),
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setMeta((prev) => ({ ...prev, currentPage: 1 }));
  };

  function mapRentedTreeToTreeItem(tree: RentedTree | null): TreeItem | null {
    if (!tree) return null;
    return {
      id: tree.id,
      name: tree.name,
      img: tree.images?.[0] || "",
      type: "",
      age: 0,
      yield: 0,
      status: tree.status,
      ownerName: "",
      rentStartDate: tree.startDate,
      rentEndDate: tree.endDate,
      monthlyRent: 0,
      totalPaid: 0,
      remainingMonths: 0,
      schedule: [],
    };
  }

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
        <div className="flex flex-1 flex-col bg-gray-50 min-h-screen">
          <div className="w-full px-2 sm:px-4 py-8 flex-1 flex flex-col gap-6">
            {/* Thanh tìm kiếm và lọc */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <div className="relative flex-1 w-full sm:min-w-[320px]">
                    <input
                      type="text"
                      placeholder="Tìm kiếm cây, chủ vườn..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setMeta((prev) => ({ ...prev, currentPage: 1 }));
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-4 h-4" />
                  </div>
                  <select
                    className="w-auto px-4 py-3 rounded-lg bg-white text-black focus:outline-none"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <option value="">Tất cả trạng thái</option>
                    <option value="GROWING">Đang thuê</option>
                    <option value="READY_TO_HARVEST">Sắp hết hạn</option>
                    <option value="HARVESTING">Đã hết hạn</option>
                    <option value="HARVESTED">Đã thu hoạch</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Danh sách cây đã thuê */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-bold text-black mb-4 pb-2 border-b-2 border-black flex items-center gap-2">
                  <Clipboard className="w-5 h-5" />
                  Danh sách Cây Đã Thuê
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {loadingTrees ? (
                    <div className="col-span-full text-center text-gray-500 py-8">
                      Đang tải dữ liệu...
                    </div>
                  ) : trees.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-8">
                      Không tìm thấy cây phù hợp.
                    </div>
                  ) : (
                    trees.map((item) => {
                      const mappedItem: TreeItem = {
                        id: item.id,
                        name: item.name,
                        img: item.images?.[0] || "",
                        type: "",
                        age: 0,
                        yield: 0,
                        status: item.status,
                        ownerName: "",
                        rentStartDate: item.startDate,
                        rentEndDate: item.endDate,
                        monthlyRent: 0,
                        totalPaid: 0,
                        remainingMonths: 0,
                        schedule: [], // Nếu có trường schedule thì lấy, không thì để []
                      };
                      return (
                        <TreeCard
                          key={item.id}
                          item={mappedItem}
                          onDetail={() => handleOpenModal(item)}
                          onHarvest={() => handleOpenHarvestModal(item)}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Modal chi tiết cây */}
            <TreeDetailModal
              open={open}
              setOpen={setOpen}
              selectedTree={mapRentedTreeToTreeItem(selectedTree)}
            />

            {/* Modal thu hoạch */}
            <TreeHarvestModal
              open={harvestOpen}
              setOpen={setHarvestOpen}
              selectedTree={mapRentedTreeToTreeItem(selectedTree)}
              onHarvest={handleHarvest}
            />

            {/* Phân trang */}
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </div>

          {/* Overlay loading */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/70 z-[100] flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-white mb-6"></div>
              <div className="text-white text-lg font-semibold mb-2">
                Đang xử lý thu hoạch...
              </div>
              <div className="text-white text-sm text-center max-w-md">
                Vui lòng chờ trong giây lát, hệ thống đang xác nhận thu hoạch và
                cập nhật dữ liệu.
              </div>
            </div>
          )}

          {/* Alert thành công */}
          {showAlert && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
              <Alert className="bg-white border-2 border-black">
                <AlertTitle className="text-black font-bold">
                  {alertContent.title}
                </AlertTitle>
                <AlertDescription className="text-gray-700">
                  {alertContent.description}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
