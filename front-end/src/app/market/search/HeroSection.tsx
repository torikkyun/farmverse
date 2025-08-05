import { Search, X, MapPin, Globe, TrendingUp } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-3xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-black mb-4">Farmverse</h1>
          <p className="text-xl text-gray-600 mb-8">
            Kết nối nông trại với bạn
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          {/* Search Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">
              Bắt đầu mua sắm ngay hôm nay
            </h2>
            <p className="text-gray-600">
              Tìm kiếm sản phẩm nông nghiệp phù hợp với nhu cầu của bạn
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Nhập tên sản phẩm, trang trại hoặc địa điểm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              className="w-full h-14 pl-12 pr-12 text-lg border-2 border-gray-200 rounded-xl focus:border-black transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400" />
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

          {/* Filters & Search Button */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-14 border-2 border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <SelectValue placeholder="Chọn khu vực" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Toàn quốc
                    </div>
                  </SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc || ""}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
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
              className="h-14 px-8 bg-black text-white hover:bg-gray-800 rounded-xl font-semibold text-lg transition-colors disabled:opacity-50"
            >
              <Search className="w-5 h-5 mr-2" />
              Tìm kiếm
            </Button>
          </div>

          {/* Popular Searches */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Tìm kiếm phổ biến</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {["Rau xanh", "Trái cây", "Gạo sạch", "Thịt heo", "Cá tươi"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearch(term);
                      handleSearch(term);
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
