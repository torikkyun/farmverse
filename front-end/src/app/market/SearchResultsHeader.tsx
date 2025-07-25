import { Button } from "@/components/ui/button";
import { Search, MapPin, Grid3X3, List, X, Filter } from "lucide-react";

interface SearchResultsHeaderProps {
  search: string;
  location: string;
  totalResults: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onClearSearch: () => void;
}

export function SearchResultsHeader({
  search,
  location,
  totalResults,
  viewMode,
  setViewMode,
  onClearSearch,
}: SearchResultsHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onClearSearch}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
            Quay lại trang chủ
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-xl">
                <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Kết quả tìm kiếm
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Tìm thấy{" "}
              <span className="font-bold text-green-600 dark:text-green-400">
                {totalResults}
              </span>{" "}
              kết quả
              {search && (
                <>
                  {" "}
                  cho{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {search}
                  </span>
                </>
              )}
              {location && location !== "all" && (
                <>
                  {" "}
                  tại{" "}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {location}
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-1">
              {[
                { mode: "grid" as const, icon: Grid3X3, label: "Lưới" },
                { mode: "list" as const, icon: List, label: "Danh sách" },
              ].map(({ mode, icon: Icon, label }) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === mode
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
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
              className="px-6 py-2 bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium transition-all shadow-lg"
            >
              <X className="w-4 h-4 mr-2" />
              Xóa bộ lọc
            </Button>
          </div>
        </div>

        {(search || (location && location !== "all")) && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Bộ lọc hiện tại:
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {search && (
                <div className="group flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700 shadow-sm">
                  <Search className="w-3 h-3" />
                  <span className="font-medium">{search}</span>
                  <button
                    onClick={onClearSearch}
                    className="ml-1 p-1 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-full transition-colors group-hover:scale-110"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {location && location !== "all" && (
                <div className="group flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full border border-green-200 dark:border-green-700 shadow-sm">
                  <MapPin className="w-3 h-3" />
                  <span className="font-medium">{location}</span>
                  <button
                    onClick={onClearSearch}
                    className="ml-1 p-1 hover:bg-green-200 dark:hover:bg-green-700 rounded-full transition-colors group-hover:scale-110"
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
