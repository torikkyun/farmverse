import { Button } from "@/components/ui/button";
import { Search, MapPin, Grid3X3, List, X, Filter } from "lucide-react";

interface Props {
  search: string;
  location: string;
  totalResults: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onClearSearch: () => void;
}

export default function SearchResultsHeader({
  search,
  location,
  totalResults,
  viewMode,
  setViewMode,
  onClearSearch,
}: Props) {
  return (
    <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <Button
          variant="ghost"
          onClick={onClearSearch}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
          Quay lại trang chủ
        </Button>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-black dark:bg-white rounded-xl">
                <Search className="w-6 h-6 text-white dark:text-black" />
              </div>
              <h1 className="text-3xl font-bold text-black dark:text-white">
                Kết quả tìm kiếm
              </h1>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Tìm thấy{" "}
              <span className="font-bold text-black dark:text-white">
                {totalResults}
              </span>{" "}
              kết quả
              {search && (
                <>
                  {" "}
                  cho{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {search}
                  </span>
                </>
              )}
              {location && location !== "all" && (
                <>
                  {" "}
                  tại{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {location}
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-1">
              {[
                { mode: "grid", icon: Grid3X3, label: "Lưới" },
                { mode: "list", icon: List, label: "Danh sách" },
              ].map(({ mode, icon: Icon, label }) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(mode as "grid" | "list")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === mode
                      ? "bg-black text-white shadow-md dark:bg-white dark:text-black"
                      : "text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={onClearSearch}
              className="px-6 py-2 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl font-medium transition-all shadow-lg"
            >
              <X className="w-4 h-4 mr-2" />
              Xóa bộ lọc
            </Button>
          </div>
        </div>
        {(search || (location && location !== "all")) && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Bộ lọc hiện tại:
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {search && (
                <div className="group flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm">
                  <Search className="w-3 h-3" />
                  <span className="font-medium">{search}</span>
                  <button
                    onClick={onClearSearch}
                    className="ml-1 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors group-hover:scale-110"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {location && location !== "all" && (
                <div className="group flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm">
                  <MapPin className="w-3 h-3" />
                  <span className="font-medium">{location}</span>
                  <button
                    onClick={onClearSearch}
                    className="ml-1 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors group-hover:scale-110"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
