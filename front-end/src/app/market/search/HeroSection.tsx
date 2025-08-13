import {
  Search,
  X,
  MapPin,
  Globe,
  TrendingUp,
  Sparkles,
  Leaf,
  ShieldCheck,
  Truck,
  Star,
  Award,
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
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-in fade-in duration-1000">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center shadow-lg animate-in zoom-in duration-700 delay-200 hover:rotate-12 transition-transform">
              <Leaf className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="animate-in slide-in-from-right duration-800 delay-300">
              <h1 className="text-4xl font-black text-black hover:scale-105 transition-transform duration-300">
                Farmverse
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Star className="w-4 h-4 text-gray-400 fill-gray-400 animate-bounce delay-1000" />
                <span className="text-sm text-gray-500 font-medium">
                  Nông trại từ tương lai
                </span>
              </div>
            </div>
          </div>

          <p className="text-3xl text-black font-bold mb-4 animate-in slide-in-from-bottom duration-800 delay-500">
            Kết nối trực tiếp với nông trại
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-700">
            Khám phá hệ sinh thái nông nghiệp bền vững với sản phẩm tươi ngon,
            chất lượng cao từ những trang trại uy tín nhất Việt Nam
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-gray-50 rounded-3xl shadow-2xl p-10 mb-16 animate-in slide-in-from-bottom duration-1000 delay-300 hover:shadow-3xl transition-shadow">
          {/* Search Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4 animate-in zoom-in duration-700 delay-500">
              <Search className="w-8 h-8 text-black animate-pulse" />
              <h2 className="text-4xl font-black text-black hover:scale-105 transition-transform duration-300">
                Tìm kiếm thông minh
              </h2>
            </div>
            <p className="text-xl text-gray-700 font-medium animate-in fade-in duration-800 delay-600">
              Khám phá hàng ngàn sản phẩm nông nghiệp chất lượng cao
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-8 animate-in slide-in-from-left duration-800 delay-700">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Tìm kiếm sản phẩm, trang trại, hoặc danh mục..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              className="w-full h-15 pl-16 pr-16 text-base placeholder:text-lg border-3 border-gray-300 rounded-2xl focus:border-black transition-all duration-300 bg-white shadow-lg focus:shadow-xl placeholder:text-gray-400 hover:scale-[1.02] focus:scale-[1.02]"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-500 animate-pulse" />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 animate-in zoom-in duration-300"
              >
                <X className="w-6 h-6 text-gray-500 hover:rotate-90 transition-transform duration-300" />
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
          <div className="flex flex-col lg:flex-row gap-6 mb-12 animate-in slide-in-from-right duration-800 delay-800">
            <div className="flex-1">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-[60px] px-6 border-3 border-gray-300 rounded-2xl bg-white hover:border-black transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]">
                  <div className="flex items-center gap-4 text-lg">
                    <MapPin className="w-6 h-6 text-gray-500 animate-bounce delay-1000" />
                    <SelectValue placeholder="Chọn khu vực giao hàng" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-3 hover:scale-105 transition-transform">
                      <Globe className="w-5 h-5" />
                      <span className="font-medium">Toàn quốc</span>
                    </div>
                  </SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc || ""}>
                      <div className="flex items-center gap-3 hover:scale-105 transition-transform">
                        <MapPin className="w-5 h-5" />
                        <span>{loc || "Không xác định"}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:w-auto w-full">
              <Button
                onClick={() => handleSearch()}
                disabled={!hasActiveFilters}
                className="w-full lg:w-auto h-[60px] px-10 bg-black text-white hover:bg-gray-800 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Search className="w-4 h-4 mr-3 animate-pulse" />
                Khám phá ngay
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="text-center animate-in fade-in duration-1000 delay-900">
            <div className="flex items-center justify-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-black animate-bounce" />
              <span className="text-xl text-black font-bold hover:scale-105 transition-transform duration-300">
                Xu hướng tìm kiếm
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { term: "Rau xanh", icon: Leaf },
                { term: "Trái cây", icon: Sparkles },
              ].map(({ term, icon: Icon }, index) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearch(term);
                    handleSearch(term);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg hover:scale-105 animate-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${1000 + index * 100}ms` }}
                >
                  <Icon className="w-5 h-5 hover:rotate-12 transition-transform duration-300" />
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Chất lượng",
              description: "Sản phẩm được kiểm định nghiêm ngặt",
            },
            {
              icon: Truck,
              title: "Giao hàng nhanh",
              description: "Vận chuyển tại chỗ trong 24h",
            },
            {
              icon: Leaf,
              title: "100% tự nhiên",
              description: "Không chất bảo quản, hoá chất",
            },
            {
              icon: Award,
              title: "Giá tốt nhất",
              description: "Mua trực tiếp từ nông trại",
            },
          ].map(({ icon: Icon, title, description }, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gray-50 border-2 border-gray-200 rounded-2xl hover:border-black transition-all duration-500 hover:shadow-lg hover:scale-105 animate-in slide-in-from-bottom duration-700 group"
              style={{ animationDelay: `${800 + index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Icon className="w-8 h-8 text-white group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3 group-hover:scale-105 transition-transform duration-300">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-0 group-hover:text-gray-800 transition-colors duration-300">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
