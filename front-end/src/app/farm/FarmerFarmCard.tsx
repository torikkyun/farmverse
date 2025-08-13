// import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Ruler, FileText, ImageIcon, User, Home } from "lucide-react";
import { useFarmerFarm } from "./useFarmerFarm";
import type { Address } from "./useFarmerFarm";

export default function FarmerFarmCard() {
  const { userFarm: farm } = useFarmerFarm();

  if (!farm) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Đang tải thông tin nông trại...</span>
          </div>
        </div>
      </div>
    );
  }

  // Helper để hiển thị địa chỉ
  const renderAddress = (address?: Address) => {
    if (!address)
      return (
        <span className="italic text-gray-400 dark:text-gray-500">
          Chưa cập nhật
        </span>
      );
    const { houseNumber, street, commune, city } = address;
    return (
      <span className="text-black dark:text-white">
        {[houseNumber, street, commune, city].filter(Boolean).join(", ") || (
          <span className="italic text-gray-400 dark:text-gray-500">
            Chưa cập nhật
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="relative bg-black dark:bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/30 dark:border-black/30">
            <Home className="w-8 h-8 text-white dark:text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white dark:text-black">
              {farm.name}
            </h1>
            {farm.user?.name && (
              <div className="flex items-center gap-2 mt-2">
                <User className="w-4 h-4 text-white/80 dark:text-black/80" />
                <span className="text-white/90 dark:text-black/90">
                  Chủ trang trại: {farm.user.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Địa chỉ */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-black dark:text-white" />
              <h3 className="font-semibold text-black dark:text-white">
                Địa chỉ
              </h3>
            </div>
            <div className="text-sm">{renderAddress(farm.address)}</div>
          </div>

          {/* Diện tích */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Ruler className="w-5 h-5 text-black dark:text-white" />
              <h3 className="font-semibold text-black dark:text-white">
                Diện tích
              </h3>
            </div>
            <div className="text-sm text-black dark:text-white">
              {farm.size ? (
                `${farm.size} ha`
              ) : (
                <span className="italic text-gray-400 dark:text-gray-500">
                  Chưa cập nhật
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mô tả */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-black dark:text-white" />
            <h3 className="font-semibold text-black dark:text-white">Mô tả</h3>
          </div>
          <div className="text-sm text-black dark:text-white">
            {farm.description || (
              <span className="italic text-gray-400 dark:text-gray-500">
                Chưa cập nhật
              </span>
            )}
          </div>
        </div>

        {/* Hình ảnh */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="w-5 h-5 text-black dark:text-white" />
            <h3 className="font-semibold text-black dark:text-white">
              Hình ảnh trang trại
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.isArray(farm.images) && farm.images.length > 0 ? (
              farm.images.map((img, idx) =>
                img ? (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt={`${farm.name} - Ảnh ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : null
              )
            ) : (
              <div className="col-span-full text-center py-8">
                <ImageIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <span className="italic text-gray-400 dark:text-gray-500">
                  Chưa có hình ảnh
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
