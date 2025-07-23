"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { TreeCard } from "./TreeCard";
import { TreeDetailModal } from "./TreeDetailModal";
import { TreeHarvestModal } from "./TreeHarvestModal";
import Pagination from "@/components/ui/pagination";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Wallet, TreePine, Clock, Search, Clipboard } from "lucide-react";

const rentedTrees = [
  {
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
  const userRole = "CUSTOMER";

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
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
                <TreePine className="w-8 h-8 text-green-600" />
                Cây Đã Thuê Của Tôi
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tổng chi phí đã trả */}
                <div className="bg-black text-white p-4 rounded-lg border-1 border-black">
                  <div className="text-center">
                    <Wallet className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm opacity-80">
                      Tổng chi phí đã trả
                    </div>
                    <div className="text-xl font-bold">
                      {totalPaid.toLocaleString()} FVT
                    </div>
                  </div>
                </div>

                {/* Cây đang thuê */}
                <div className="bg-white border-1 border-black p-4 rounded-lg">
                  <div className="text-center">
                    <TreePine className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-sm text-gray-600">Đang thuê</div>
                    <div className="text-xl font-bold text-black">
                      {activeTreesCount} cây
                    </div>
                  </div>
                </div>

                {/* Cây sắp hết hạn */}
                <div className="bg-white border-1 border-black p-4 rounded-lg">
                  <div className="text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-sm text-gray-600">Sắp hết hạn</div>
                    <div className="text-xl font-bold text-black">
                      {expiringSoonCount} cây
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thanh tìm kiếm và lọc */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <div className="relative flex-1 w-full sm:min-w-[320px]">
                    <input
                      type="text"
                      placeholder="Tìm kiếm cây, chủ vườn..."
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
                  {rentedTrees.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg overflow-hidden shadow-2xl hover:border border-black transition-all duration-200"
                    >
                      {/* Hình ảnh cây */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Badge trạng thái */}
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              item.status === "Đang thuê"
                                ? "bg-green-600 text-white"
                                : "bg-orange-600 text-white"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>

                      {/* Thông tin cây */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-black mb-2">
                          {item.name}
                        </h3>

                        {/* Thông tin cơ bản */}
                        <div className="space-y-2 text-sm text-gray-700 mb-4">
                          <div className="flex justify-between">
                            <span>Chủ vườn:</span>
                            <span className="font-semibold text-black">
                              {item.ownerName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Năng suất:</span>
                            <span className="font-semibold text-black">
                              {item.yield}kg/năm
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Phí thuê:</span>
                            <span className="font-semibold text-black">
                              {item.monthlyRent} FVT/tháng
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Còn lại:</span>
                            <span className="font-semibold text-black">
                              {item.remainingMonths} tháng
                            </span>
                          </div>
                        </div>

                        {/* Thông tin hợp đồng */}
                        <div
                          className={`p-3 rounded-lg border mb-4 ${
                            item.status === "Đang thuê"
                              ? "bg-green-50 border-green-200"
                              : "bg-orange-50 border-orange-200"
                          }`}
                        >
                          <div
                            className={`text-sm text-center font-semibold ${
                              item.status === "Đang thuê"
                                ? "text-green-700"
                                : "text-orange-700"
                            }`}
                          >
                            <div>
                              Đã trả: {item.totalPaid.toLocaleString()} FVT
                            </div>
                            <div className="text-xs mt-1">
                              {new Date(item.rentStartDate).toLocaleDateString(
                                "vi-VN"
                              )}{" "}
                              -{" "}
                              {new Date(item.rentEndDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Nút hành động */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(item)}
                            className="flex-1 bg-black text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
                          >
                            Chi tiết
                          </button>
                          {item.yield > 0 && (
                            <button
                              onClick={() => handleOpenHarvestModal(item)}
                              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                            >
                              Thu hoạch
                            </button>
                          )}
                        </div>
                      </div>
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
