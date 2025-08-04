import { MapPin, Package, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FarmList from "../FarmList";
import { ItemList } from "../ItemList";
import type { Farm, Item } from "../types/market";

interface ResultsSectionProps {
  farms: Farm[];
  items: Item[];
  viewMode: "grid" | "list";
  onClearSearch: () => void;
  setShowResults: (show: boolean) => void;
}

export default function ResultsSection({
  farms,
  items,
  viewMode,
  onClearSearch,
  setShowResults,
}: ResultsSectionProps) {
  const totalResults = farms.length + items.length;
  return (
    <div className="space-y-10">
      {farms.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white">
                  Trang trại
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {farms.length} kết quả
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <FarmList farms={farms} viewMode={viewMode} />
          </div>
        </div>
      )}
      {items.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-xl">
                <Package className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white">
                  Sản phẩm
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {items.length} kết quả
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ItemList items={items} viewMode={viewMode} />
          </div>
        </div>
      )}
      {totalResults === 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="inline-flex p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Hãy thử với từ khóa khác hoặc điều chỉnh bộ lọc
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={onClearSearch}
                className="px-6 py-3 rounded-xl font-medium border-gray-300 dark:border-gray-600"
              >
                <X className="w-4 h-4 mr-2" /> Xóa bộ lọc
              </Button>
              <Button
                onClick={() => setShowResults(false)}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-xl font-medium"
              >
                <Search className="w-4 h-4 mr-2" /> Tìm kiếm mới
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
