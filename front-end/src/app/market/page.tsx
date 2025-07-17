"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FarmList, Farm } from "./FarmList";
import { ItemList, Item } from "./ItemList";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Grid3X3, List } from "lucide-react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/["']/g, "") || "";

export default function MarketPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data?.data?.items || []))
      .catch(() => setItems([]));

    fetch(`${API_URL}/farms`)
      .then((res) => res.json())
      .then((data) => setFarms(data?.data?.items || []))
      .catch(() => setFarms([]));
  }, []);

  // Lấy danh sách vị trí duy nhất từ farms
  const locations = Array.from(
    new Set(farms.map((farm) => farm.location).filter(Boolean))
  );

  // Lọc dữ liệu theo search và location
  const filteredFarms = farms.filter(
    (farm) =>
      (!search || farm.name.toLowerCase().includes(search.toLowerCase())) &&
      (!location || location === "all" || farm.location === location)
  );

  // Chỉ lấy các vật phẩm thuộc các nông trại đã lọc
  const filteredFarmIds = filteredFarms.map((farm) => farm.id);
  const filteredItems = items.filter(
    (item) =>
      (!search || item.name.toLowerCase().includes(search.toLowerCase())) &&
      item.farm &&
      filteredFarmIds.includes(item.farm.id)
  );

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleClearSearch = () => {
    setSearch("");
    setLocation("");
    setShowResults(false);
  };

  const hasActiveFilters = search || location;
  const totalResults = filteredFarms.length + filteredItems.length;

  if (showResults) {
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
          <div className="w-full flex flex-1 flex-col bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
            {/* Header kết quả tìm kiếm */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Kết quả tìm kiếm
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Tìm thấy {totalResults} kết quả
                      {search && ` cho "${search}"`}
                      {location && location !== "all" && ` tại ${location}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="px-3"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="px-3"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleClearSearch}
                      className="flex items-center gap-2"
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                </div>

                {/* Bộ lọc nhanh */}
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {search && (
                    <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                      <Search className="w-3 h-3" />
                      {search}
                    </div>
                  )}
                  {location && location !== "all" && (
                    <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                      <MapPin className="w-3 h-3" />
                      {location}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Nội dung kết quả */}
            <div className="flex-1 px-4 md:px-8 py-6">
              <div className="max-w-6xl mx-auto space-y-8">
                {filteredFarms.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Nông trại ({filteredFarms.length})
                    </h2>
                    <FarmList farms={filteredFarms} viewMode={viewMode} />
                  </div>
                )}

                {filteredItems.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Vật phẩm ({filteredItems.length})
                    </h2>
                    <ItemList items={filteredItems} viewMode={viewMode} />
                  </div>
                )}

                {totalResults === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                      🔍
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Không tìm thấy kết quả
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Hãy thử với từ khóa khác hoặc điều chỉnh bộ lọc
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
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
        <div className="w-full flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          {/* Hero Section với Search */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 md:px-8 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Khám phá thế giới nông nghiệp
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Tìm kiếm nông trại và vật phẩm nông nghiệp chất lượng cao
              </p>

              {/* Search Box */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Tìm kiếm nông trại hoặc vật phẩm..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-12 pr-4 py-3 text-lg border-0 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 transition-all"
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>

                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger className="h-12 border-0 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <SelectValue placeholder="Chọn vị trí" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả vị trí</SelectItem>
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleSearch}
                      disabled={!hasActiveFilters}
                      className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Tìm kiếm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Content */}
          <div className="flex-1 px-4 md:px-8 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="space-y-8">
                <div>
                  <FarmList farms={farms.slice(0, 6)} />
                  {farms.length > 6 && (
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => router.push("/market/farms")}
                        className="px-6 py-2 rounded-lg font-semibold transition"
                      >
                        Xem thêm
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <ItemList items={items.slice(0, 6)} />
                  {items.length > 6 && (
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => router.push("/market/items")}
                        className="px-6 py-2 rounded-lg font-semibold transition"
                      >
                        Xem thêm
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
