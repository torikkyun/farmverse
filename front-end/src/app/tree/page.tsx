"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TreeDetailModal from "./TreeDetailModal";
import { TreeHarvestModal } from "./TreeHarvestModal";
import Pagination from "@/components/ui/pagination";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Search, Clipboard } from "lucide-react";
import { TreeOverviewStats } from "./TreeOverviewStats";
import { TreeCard } from "./TreeCard";

const rentedTrees = [
  {
    id: "1",
    name: "Cây Xoài",
    type: "Cây trồng",
    age: 3,
    yield: 150,
    status: "Đang thuê",
    ownerName: "Nông trại ABC",
    rentStartDate: "2024-01-15",
    rentEndDate: "2025-01-15",
    monthlyRent: 80,
    totalPaid: 560, // Số tiền đã trả
    remainingMonths: 5, // Số tháng còn lại
    img: "https://cayxanhgiapham.com/wp-content/uploads/2020/06/cay-xoa-3-600x450.jpg",
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
    id: "2",
    name: "Cây Sầu Riêng",
    type: "Cây trồng",
    age: 2,
    yield: 80,
    status: "Đang thuê",
    ownerName: "Vườn Nhiệt Đới XYZ",
    rentStartDate: "2024-03-01",
    rentEndDate: "2025-03-01",
    monthlyRent: 150,
    totalPaid: 750,
    remainingMonths: 7,
    img: "https://th.bing.com/th/id/R.f8ea8c40cdead4e44f25a0c866b3f021?rik=GohkeybcLR4k6Q&pid=ImgRaw&r=0",
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
    id: "3",
    name: "Cây Chôm Chôm",
    type: "Cây trồng",
    age: 3,
    yield: 40,
    status: "Sắp hết hạn",
    ownerName: "Trang trại DEF",
    rentStartDate: "2024-06-01",
    rentEndDate: "2025-06-01",
    monthlyRent: 40,
    totalPaid: 320,
    remainingMonths: 1,
    img: "https://elead.com.vn/wp-content/uploads/2022/09/cay-chom-chom-22.jpg",
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
    (typeof rentedTrees)[0] | null
  >(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleOpenModal = (item: (typeof rentedTrees)[0]) => {
    setSelectedTree(item);
    setOpen(true);
  };

  const handleOpenHarvestModal = (item: (typeof rentedTrees)[0]) => {
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

  // Lọc cây theo từ khóa tìm kiếm
  const filteredTrees = rentedTrees.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(search.toLowerCase())
  );

  // Tính tổng chi phí đã trả
  const totalPaid = rentedTrees.reduce((sum, item) => sum + item.totalPaid, 0);
  const activeTreesCount = rentedTrees.filter(
    (item) => item.status === "Đang thuê"
  ).length;
  const expiringSoonCount = rentedTrees.filter(
    (item) => item.status === "Sắp hết hạn"
  ).length;

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
            {/* Header và thống kê tổng quan */}
            <TreeOverviewStats
              totalPaid={totalPaid}
              activeTreesCount={activeTreesCount}
              expiringSoonCount={expiringSoonCount}
            />

            {/* Thanh tìm kiếm và lọc */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <div className="relative flex-1 w-full sm:min-w-[320px]">
                    <input
                      type="text"
                      placeholder="Tìm kiếm cây, chủ vườn..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-4 h-4" />
                  </div>
                  <select className="w-auto px-4 py-3 rounded-lg bg-white text-black focus:outline-none">
                    <option>Tất cả trạng thái</option>
                    <option>Đang thuê</option>
                    <option>Sắp hết hạn</option>
                    <option>Đã hết hạn</option>
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
                  {filteredTrees.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-8">
                      Không tìm thấy cây phù hợp.
                    </div>
                  ) : (
                    filteredTrees.map((item) => (
                      <TreeCard
                        key={item.id}
                        item={item}
                        onDetail={handleOpenModal}
                        onHarvest={handleOpenHarvestModal}
                      />
                    ))
                  )}
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
