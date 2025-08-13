"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  History,
  Calendar,
  Package,
  DollarSign,
  TreePine,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  User,
  Truck,
  Star,
  Weight,
  Timer,
} from "lucide-react";

// Mock data cho lịch sử thu hoạch
const harvestHistory = [
  {
    id: 1,
    farmName: "Nông trại xanh",
    farmOwner: "Nguyễn Văn A",
    cropName: "Cà chua",
    harvestDate: "2024-08-10",
    quantity: 150,
    price: 25000,
    totalRevenue: 3750000,
    status: "completed",
    image: "https://picsum.photos/seed/tomato/200/150",
    location: "Đà Lạt, Lâm Đồng",
    harvestTime: "06:30 AM",
    quality: "Loại A",
    rating: 4.8,
    deliveryMethod: "Tự vận chuyển",
    notes: "Cà chua chín đều, chất lượng cao",
  },
  {
    id: 2,
    farmName: "Vườn hữu cơ ABC",
    farmOwner: "Trần Thị B",
    cropName: "Rau xanh",
    harvestDate: "2024-08-08",
    quantity: 80,
    price: 18000,
    totalRevenue: 1440000,
    status: "completed",
    image: "https://picsum.photos/seed/greens/200/150",
    location: "Cần Thơ, An Giang",
    harvestTime: "05:00 AM",
    quality: "Loại B",
    rating: 4.5,
    deliveryMethod: "Giao hàng tận nơi",
    notes: "Rau tươi, không thuốc trừ sâu",
  },
  {
    id: 3,
    farmName: "Trang trại hoa quả",
    farmOwner: "Lê Văn C",
    cropName: "Cam sành",
    harvestDate: "2024-08-05",
    quantity: 200,
    price: 35000,
    totalRevenue: 7000000,
    status: "processing",
    image: "https://picsum.photos/seed/orange/200/150",
    location: "Hòa Bình, Hòa Bình",
    harvestTime: "07:00 AM",
    quality: "Loại A+",
    rating: 5.0,
    deliveryMethod: "Đang vận chuyển",
    notes: "Cam ngọt, múi đều",
  },
];

export default function HistoryPage() {
  const totalQuantity = harvestHistory.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalRevenue = harvestHistory.reduce(
    (sum, item) => sum + item.totalRevenue,
    0
  );
  const completedHarvests = harvestHistory.filter(
    (item) => item.status === "completed"
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
        <div className="w-full flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          <div className="w-full px-2 sm:px-4 py-6 flex-1 flex flex-col gap-6">
            {/* Header Section */}
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl">
                  <History className="w-6 h-6 text-black dark:text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-black dark:text-white">
                    Lịch sử thu hoạch
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Theo dõi các lần thu hoạch và giao dịch của bạn
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-black dark:text-white" />
                    <span className="font-semibold text-black dark:text-white">
                      Tổng sản lượng
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-black dark:text-white">
                    {totalQuantity} kg
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-black dark:text-white" />
                    <span className="font-semibold text-black dark:text-white">
                      Tổng doanh thu
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-black dark:text-white">
                    {totalRevenue.toLocaleString()}₫
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <TreePine className="w-5 h-5 text-black dark:text-white" />
                    <span className="font-semibold text-black dark:text-white">
                      Số lần thu hoạch
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-black dark:text-white">
                    {harvestHistory.length}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-black dark:text-white" />
                    <span className="font-semibold text-black dark:text-white">
                      Hoàn thành
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-black dark:text-white">
                    {completedHarvests}
                  </div>
                </div>
              </div>
            </div>

            {/* History List */}
            <div className="space-y-4">
              {harvestHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full lg:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.cropName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      {/* Header Row */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white">
                            {item.cropName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {item.farmName} - {item.farmOwner}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {item.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          )}
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.status === "completed"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                            }`}
                          >
                            {item.status === "completed"
                              ? "Hoàn thành"
                              : "Đang xử lý"}
                          </span>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-black dark:text-white">
                            {item.harvestDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-black dark:text-white">
                            {item.harvestTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Weight className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-black dark:text-white">
                            {item.quantity} kg
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-semibold text-black dark:text-white">
                            {item.price.toLocaleString()}₫/kg
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-black dark:text-white">
                            {item.quality}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-black dark:text-white">
                            {item.rating}/5.0
                          </span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Truck className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-black dark:text-white">
                              Vận chuyển:
                            </span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                            {item.deliveryMethod}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-black dark:text-white mb-1">
                            Tổng doanh thu:
                          </div>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            {item.totalRevenue.toLocaleString()}₫
                          </span>
                        </div>
                      </div>

                      {/* Notes */}
                      {item.notes && (
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400 italic">
                            {item.notes}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {harvestHistory.length === 0 && (
              <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  Chưa có lịch sử thu hoạch
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Hãy bắt đầu thu hoạch để xem lịch sử tại đây.
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
