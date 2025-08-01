"use client";

import { useState, useCallback } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import FarmList from "./FarmList";
import { ItemList } from "./ItemList";
import { Input } from "@/components/ui/input";
import DepositModal from "@/components/DepositModal"; // Thêm dòng này

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchResultsHeader } from "./SearchResultsHeader";
import { SearchSuggestions } from "./SearchSuggestions";
import { useSearch } from "./useSearch";

export default function MarketPage() {
  const [showResults, setShowResults] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openDeposit, setOpenDeposit] = useState(false); // Thêm state này

  // State cho modal nạp tiền
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const {
    search,
    setSearch,
    location,
    setLocation,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    selectedSuggestion,
    setSelectedSuggestion,
    searchHistory,
    searchInputRef,
    suggestionsRef,
    saveToHistory,
    clearHistory,
    farms,
    items,
  } = useSearch();

  const locations = Array.from(
    new Set(farms.map((farm) => farm.address?.city).filter(Boolean))
  );

  // Filter data
  const filteredFarms = farms.filter((farm) => {
    const matchesSearch =
      !search ||
      [farm.name, farm.description].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      );
    const matchesLocation =
      !location || location === "all" || farm.address.city === location;
    return matchesSearch && matchesLocation;
  });

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !search ||
      [item.name, item.description, item.type, item.farm?.name].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      );
    const matchesLocation =
      !location || location === "all" || item.farm?.address.city === location;
    return matchesSearch && matchesLocation;
  });

  // Handlers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    const totalSuggestions = suggestions.length + searchHistory.length;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < totalSuggestions - 1 ? prev + 1 : -1
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev > -1 ? prev - 1 : totalSuggestions - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          const selected = [...searchHistory, ...suggestions][
            selectedSuggestion
          ];
          setSearch(selected);
          setShowSuggestions(false);
          handleSearch(selected);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  const handleSearch = (searchTerm?: string) => {
    const query = searchTerm || search;
    if (query.trim() || location) {
      saveToHistory(query);
      setShowResults(true);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleClearSearch = () => {
    setSearch("");
    setLocation("");
    setShowResults(false);
    setShowSuggestions(false);
  };

  const totalResults = filteredFarms.length + filteredItems.length;
  const hasActiveFilters = search.trim() || location;

  const sidebarStyle = {
    "--sidebar-width": "calc(var(--spacing) * 72)",
    "--header-height": "calc(var(--spacing) * 12)",
  } as React.CSSProperties;

  // Hàm xử lý nạp tiền (giả lập, bạn có thể thay bằng API thực tế)
  const handleDeposit = useCallback(() => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Vui lòng nhập số tiền hợp lệ!");
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
    // Sau khi nạp thành công, có thể reset hoặc đóng modal
    setTimeout(() => {
      setOpenDeposit(false);
      setAmount("");
      setSuccess(false);
    }, 1500);
  }, [amount]);

  if (showResults) {
    return (
      <SidebarProvider style={sidebarStyle}>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader onOpenDeposit={() => setOpenDeposit(true)} />{" "}
          {/* Sửa dòng này */}
          <div className="w-full flex flex-1 flex-col bg-gray-50 dark:bg-gray-900 min-h-screen">
            <SearchResultsHeader
              search={search}
              location={location}
              totalResults={totalResults}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onClearSearch={handleClearSearch}
            />

            <div className="flex-1 bg-gray-50 dark:bg-gray-900">
              <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
                <div className="space-y-10">
                  {/* Farms */}
                  {filteredFarms.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-green-200 dark:border-green-700">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-xl">
                            <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                              Nông trại
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {filteredFarms.length} kết quả
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <FarmList farms={filteredFarms} viewMode={viewMode} />
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  {filteredItems.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-blue-200 dark:border-blue-700">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl">
                            <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                              Vật phẩm
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {filteredItems.length} kết quả
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <ItemList items={filteredItems} viewMode={viewMode} />
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {totalResults === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="text-center py-16">
                        <div className="mb-6">
                          <div className="inline-flex p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Không tìm thấy kết quả
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          Hãy thử với từ khóa khác hoặc điều chỉnh bộ lọc để tìm
                          thấy những gì bạn đang tìm kiếm
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            variant="outline"
                            onClick={handleClearSearch}
                            className="px-6 py-3 rounded-xl font-medium"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Xóa bộ lọc
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => setShowResults(false)}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-medium"
                          >
                            <Search className="w-4 h-4 mr-2" />
                            Tìm kiếm mới
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DepositModal
            open={openDeposit}
            onOpenChange={setOpenDeposit}
            amount={amount}
            setAmount={setAmount}
            success={success}
            error={error}
            handleDeposit={handleDeposit}
          />
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider style={sidebarStyle}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader onOpenDeposit={() => setOpenDeposit(true)} />{" "}
        {/* Sửa dòng này */}
        <div className="w-full flex flex-1 flex-col bg-white dark:bg-black min-h-screen">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 md:px-8 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Khám phá thế giới nông nghiệp
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Tìm kiếm nông trại và vật phẩm nông nghiệp chất lượng cao
              </p>

              {/* Search Box */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl mx-auto relative">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Tìm kiếm nông trại hoặc vật phẩm..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={handleKeyDown}
                      className="pl-12 pr-4 py-3 text-lg border-0 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}

                    <SearchSuggestions
                      showSuggestions={showSuggestions}
                      search={search}
                      searchHistory={searchHistory}
                      suggestions={suggestions}
                      selectedSuggestion={selectedSuggestion}
                      suggestionsRef={suggestionsRef}
                      onSuggestionClick={handleSuggestionClick}
                      onClearHistory={clearHistory}
                    />
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
                            <SelectItem key={loc} value={loc || ""}>
                              {loc || "Không xác định"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={() => handleSearch()}
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
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <FarmList farms={farms.slice(0, 6)} />
                {farms.length > 6 && (
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/market/farms")}
                      className="px-6 py-2 rounded-lg font-semibold"
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
                      className="px-6 py-2 rounded-lg font-semibold"
                    >
                      Xem thêm
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DepositModal
          open={openDeposit}
          onOpenChange={setOpenDeposit}
          amount={amount}
          setAmount={setAmount}
          success={success}
          error={error}
          handleDeposit={handleDeposit}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
