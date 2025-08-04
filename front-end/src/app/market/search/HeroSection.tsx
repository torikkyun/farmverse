import {
  Sparkles,
  Star,
  Truck,
  Shield,
  Search,
  X,
  MapPin,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchSuggestions } from "../SearchSuggestions";
import { RefObject } from "react";

export interface HeroSectionProps {
  search: string;
  setSearch: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  locations: string[];
  showSuggestions: boolean;
  setShowSuggestions: (v: boolean) => void;
  suggestions: string[];
  selectedSuggestion: number;
  setSelectedSuggestion: (v: number) => void;
  searchHistory: string[];
  searchInputRef: RefObject<HTMLInputElement | null>;
  suggestionsRef: RefObject<HTMLDivElement | null>;
  saveToHistory: (v: string) => void;
  clearHistory: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSearch: (term?: string) => void;
  handleSuggestionClick: (term: string) => void;
  hasActiveFilters: boolean;
}

export default function HeroSection(props: HeroSectionProps) {
  const {
    search,
    setSearch,
    location,
    setLocation,
    locations,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    selectedSuggestion,
    // setSelectedSuggestion,
    searchHistory,
    searchInputRef,
    suggestionsRef,
    clearHistory,
    handleKeyDown,
    handleSearch,
    handleSuggestionClick,
    hasActiveFilters,
  } = props;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800"></div>
      <div className="absolute top-10 left-5 w-96 h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-5 w-80 h-80 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full mb-12 shadow-lg">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400 animate-pulse" />
            <div className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full blur-sm opacity-30 animate-ping"></div>
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
            Farmverse Marketplace
          </span>
        </div>
        {/* Heading */}
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white leading-tight tracking-tight">
            Kết nối
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-600 dark:text-gray-400 leading-tight">
            trang trại & bạn
          </h2>
        </div>
        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-12">
          Mua trực tiếp từ nông dân,{" "}
          <span className="text-green-600 dark:text-green-400 font-medium">
            tươi ngon
          </span>{" "}
          -{" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            giá tốt
          </span>
        </p>
        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="group flex items-center gap-3 px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full group-hover:scale-110 transition-transform">
              <Star className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Tươi ngon
            </span>
          </div>
          <div className="group flex items-center gap-3 px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full group-hover:scale-110 transition-transform">
              <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Giao nhanh
            </span>
          </div>
          <div className="group flex items-center gap-3 px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full group-hover:scale-110 transition-transform">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Uy tín
            </span>
          </div>
        </div>
        {/* Search Card */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 md:p-6">
            <div className="space-y-4">
              {/* Search Title */}
              <div className="text-center space-y-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Bắt đầu mua sắm ngay hôm nay
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  Tìm kiếm sản phẩm nông nghiệp phù hợp với nhu cầu của bạn
                </p>
              </div>
              {/* Search Input */}
              <div className="relative group">
                <div className="relative">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Nhập tên sản phẩm, trang trại hoặc địa điểm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-12 pl-12 pr-12 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500/30 focus:border-green-500 dark:focus:ring-green-400/30 dark:focus:border-green-400 shadow-sm transition-all duration-300 placeholder:text-gray-400"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Search className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                    </button>
                  )}
                </div>
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
              {/* Filters & Search Button */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="h-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-2 px-2">
                        <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <SelectValue
                          placeholder="Chọn khu vực"
                          className="text-xs font-medium"
                        />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl">
                      <SelectItem value="all" className="text-xs py-1.5">
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3 h-3" />
                          Toàn quốc
                        </div>
                      </SelectItem>
                      {locations.map((loc) => (
                        <SelectItem
                          key={loc}
                          value={loc || ""}
                          className="text-xs py-1.5"
                        >
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            {loc || "Không xác định"}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={() => handleSearch()}
                  disabled={!hasActiveFilters}
                  className="h-10 px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Search className="w-3 h-3 mr-1.5" />
                  Khám phá ngay
                </Button>
              </div>
              {/* Popular Searches */}
              <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Phổ biến:
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {[
                    "Rau xanh",
                    "Trái cây",
                    "Gạo sạch",
                    "Thịt heo",
                    "Cá tươi",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearch(term);
                        handleSearch(term);
                      }}
                      className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
