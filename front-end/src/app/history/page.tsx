"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  ClipboardList,
  Calendar,
  Package2,
  Banknote,
  Sprout,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Building2,
  Truck,
  Star,
  Scale,
  Timer,
  X,
  ChevronRight,
  ShoppingCart,
  PackageCheck,
  TruckIcon,
  CircleCheck,
  Eye,
} from "lucide-react";
import { useState } from "react";

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
    timeline: [
      {
        id: 1,
        title: "Đặt hàng thành công",
        description: "Đơn hàng được tạo và xác nhận từ hệ thống",
        date: "2024-08-10",
        time: "08:00 AM",
        status: "completed",
        icon: "order",
      },
      {
        id: 2,
        title: "Chuẩn bị hàng",
        description: "Nông trại bắt đầu thu hoạch và đóng gói sản phẩm",
        date: "2024-08-10",
        time: "09:30 AM",
        status: "completed",
        icon: "prepare",
      },
      {
        id: 3,
        title: "Đang vận chuyển",
        description: "Hàng hóa đã được bàn giao cho đơn vị vận chuyển",
        date: "2024-08-10",
        time: "02:00 PM",
        status: "completed",
        icon: "shipping",
      },
      {
        id: 4,
        title: "Giao hàng thành công",
        description: "Đơn hàng đã được giao đến địa chỉ nhận hàng",
        date: "2024-08-10",
        time: "05:45 PM",
        status: "completed",
        icon: "delivered",
      },
    ],
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
    timeline: [
      {
        id: 1,
        title: "Đặt hàng thành công",
        description: "Đơn hàng được tạo và xác nhận từ hệ thống",
        date: "2024-08-08",
        time: "07:00 AM",
        status: "completed",
        icon: "order",
      },
      {
        id: 2,
        title: "Chuẩn bị hàng",
        description: "Nông trại bắt đầu thu hoạch và đóng gói sản phẩm",
        date: "2024-08-08",
        time: "08:30 AM",
        status: "completed",
        icon: "prepare",
      },
      {
        id: 3,
        title: "Đang vận chuyển",
        description: "Hàng hóa đã được bàn giao cho đơn vị vận chuyển",
        date: "2024-08-08",
        time: "01:00 PM",
        status: "completed",
        icon: "shipping",
      },
      {
        id: 4,
        title: "Giao hàng thành công",
        description: "Đơn hàng đã được giao đến địa chỉ nhận hàng",
        date: "2024-08-08",
        time: "04:30 PM",
        status: "completed",
        icon: "delivered",
      },
    ],
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
    timeline: [
      {
        id: 1,
        title: "Đặt hàng thành công",
        description: "Đơn hàng được tạo và xác nhận từ hệ thống",
        date: "2024-08-05",
        time: "09:00 AM",
        status: "completed",
        icon: "order",
      },
      {
        id: 2,
        title: "Chuẩn bị hàng",
        description: "Nông trại bắt đầu thu hoạch và đóng gói sản phẩm",
        date: "2024-08-05",
        time: "10:30 AM",
        status: "completed",
        icon: "prepare",
      },
      {
        id: 3,
        title: "Đang vận chuyển",
        description: "Hàng hóa đang được vận chuyển đến địa chỉ nhận hàng",
        date: "2024-08-06",
        time: "08:00 AM",
        status: "processing",
        icon: "shipping",
      },
      {
        id: 4,
        title: "Giao hàng",
        description: "Dự kiến giao hàng trong ngày hôm nay",
        date: "2024-08-07",
        time: "Dự kiến",
        status: "pending",
        icon: "delivered",
      },
    ],
  },
];

type HarvestHistoryItem = (typeof harvestHistory)[number];

export default function HistoryPage() {
  const [selectedItem, setSelectedItem] = useState<HarvestHistoryItem | null>(
    null
  );

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

  const getTimelineIcon = (iconType: string, status: string) => {
    const iconClasses = `w-5 h-5 ${
      status === "completed"
        ? "text-white"
        : status === "processing"
        ? "text-white"
        : "text-gray-600"
    }`;

    switch (iconType) {
      case "order":
        return <ShoppingCart className={iconClasses} />;
      case "prepare":
        return <PackageCheck className={iconClasses} />;
      case "shipping":
        return <TruckIcon className={iconClasses} />;
      case "delivered":
        return <CircleCheck className={iconClasses} />;
      default:
        return <Clock className={iconClasses} />;
    }
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

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-950 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Page Header */}
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-black dark:bg-white rounded-2xl">
                  <ClipboardList className="w-8 h-8 text-white dark:text-black" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
                    Lịch sử thu hoạch
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Theo dõi và quản lý các đơn hàng thu hoạch của bạn
                  </p>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-black dark:bg-white rounded-xl">
                      <Scale className="w-6 h-6 text-white dark:text-black" />
                    </div>
                    <span className="text-2xl font-bold text-black dark:text-white">
                      {totalQuantity}
                    </span>
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">
                    Tổng sản lượng
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Kilogram
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-black dark:bg-white rounded-xl">
                      <Banknote className="w-6 h-6 text-white dark:text-black" />
                    </div>
                    <span className="text-2xl font-bold text-black dark:text-white">
                      {Math.round(totalRevenue / 1000000)}M
                    </span>
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">
                    Tổng doanh thu
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {totalRevenue.toLocaleString()}₫
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-black dark:bg-white rounded-xl">
                      <Sprout className="w-6 h-6 text-white dark:text-black" />
                    </div>
                    <span className="text-2xl font-bold text-black dark:text-white">
                      {harvestHistory.length}
                    </span>
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">
                    Đơn hàng
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tổng số đơn
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-black dark:bg-white rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-white dark:text-black" />
                    </div>
                    <span className="text-2xl font-bold text-black dark:text-white">
                      {completedHarvests}
                    </span>
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">
                    Hoàn thành
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Đã giao hàng
                  </p>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {harvestHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Image */}
                    <div className="w-full lg:w-64 h-48 lg:h-40 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.cropName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-black dark:text-white">
                            {item.cropName}
                          </h3>
                          <div className="flex items-center gap-3">
                            <Building2 className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                              {item.farmName}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {item.farmOwner}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {item.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-black dark:text-white">
                              {item.totalRevenue.toLocaleString()}₫
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Tổng doanh thu
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.status === "completed" ? (
                              <div className="p-2 bg-black dark:bg-white rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-white dark:text-black" />
                              </div>
                            ) : (
                              <div className="p-2 bg-gray-600 rounded-xl">
                                <Clock className="w-5 h-5 text-white" />
                              </div>
                            )}
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-sm font-medium text-black dark:text-white">
                              {item.harvestDate}
                            </div>
                            <div className="text-xs text-gray-500">
                              Ngày thu hoạch
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Timer className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-sm font-medium text-black dark:text-white">
                              {item.harvestTime}
                            </div>
                            <div className="text-xs text-gray-500">
                              Thời gian
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Scale className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-sm font-medium text-black dark:text-white">
                              {item.quantity} kg
                            </div>
                            <div className="text-xs text-gray-500">
                              Khối lượng
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Banknote className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-sm font-medium text-black dark:text-white">
                              {item.price.toLocaleString()}₫
                            </div>
                            <div className="text-xs text-gray-500">Giá/kg</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Package2 className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-sm font-medium text-black dark:text-white">
                              {item.quality}
                            </div>
                            <div className="text-xs text-gray-500">
                              Chất lượng
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <div>
                            <div className="text-sm font-medium text-black dark:text-white">
                              {item.rating}/5.0
                            </div>
                            <div className="text-xs text-gray-500">
                              Đánh giá
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status & Delivery */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Truck className="w-5 h-5 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {item.deliveryMethod}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                              item.status === "completed"
                                ? "bg-black dark:bg-white text-white dark:text-black"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {item.status === "completed"
                              ? "Hoàn thành"
                              : "Đang xử lý"}
                          </span>
                          <div className="flex items-center gap-2 text-gray-500">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">Xem chi tiết</span>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {item.notes && (
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            💬 {item.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {harvestHistory.length === 0 && (
              <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-16 text-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                  Chưa có lịch sử thu hoạch
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Hãy bắt đầu thu hoạch để xem lịch sử tại đây.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Timeline Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden">
              {/* Modal Header */}
              <div className="border-b border-gray-200 dark:border-gray-800 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
                      Timeline giao hàng
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {selectedItem.cropName} • {selectedItem.farmName}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-2xl transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(85vh-120px)]">
                {/* Product Summary */}
                <div className="flex gap-6 mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.cropName}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                      {selectedItem.cropName}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">
                          {selectedItem.quantity} kg
                        </span>{" "}
                        × {selectedItem.price.toLocaleString()}₫
                      </p>
                      <p className="text-xl font-bold text-black dark:text-white">
                        Tổng: {selectedItem.totalRevenue.toLocaleString()}₫
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-8">
                  {selectedItem.timeline.map((step, index) => (
                    <div key={step.id} className="flex gap-6">
                      {/* Timeline Indicator */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${
                            step.status === "completed"
                              ? "bg-black dark:bg-white border-black dark:border-white"
                              : step.status === "processing"
                              ? "bg-gray-600 border-gray-600"
                              : "bg-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-700"
                          }`}
                        >
                          {getTimelineIcon(step.icon, step.status)}
                        </div>
                        {index < selectedItem.timeline.length - 1 && (
                          <div
                            className={`w-1 h-16 mt-4 rounded-full ${
                              step.status === "completed"
                                ? "bg-black dark:bg-white"
                                : "bg-gray-300 dark:bg-gray-700"
                            }`}
                          />
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div className="flex-1 pb-12">
                        <div className="flex items-center justify-between mb-3">
                          <h4
                            className={`text-xl font-bold ${
                              step.status === "completed"
                                ? "text-black dark:text-white"
                                : step.status === "processing"
                                ? "text-gray-600 dark:text-gray-400"
                                : "text-gray-400 dark:text-gray-600"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                              step.status === "completed"
                                ? "bg-black dark:bg-white text-white dark:text-black"
                                : step.status === "processing"
                                ? "bg-gray-600 text-white"
                                : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {step.status === "completed"
                              ? "Hoàn thành"
                              : step.status === "processing"
                              ? "Đang xử lý"
                              : "Chờ xử lý"}
                          </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg leading-relaxed">
                          {step.description}
                        </p>

                        <div className="flex items-center gap-6 text-gray-500 dark:text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {step.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {step.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
