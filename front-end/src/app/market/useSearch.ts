import { useState, useEffect, useRef } from "react";
import { FARMS_MARKET, ITEMS_MARKET } from "@/data/market";
import { Farm, Item, FarmMarket } from "@/app/market/types/market";

// const farms: Farm[] = (FARMS_MARKET as FarmMarket[]).map((f) => ({
//   ...f,
//   description: f.description ?? "",
//   cropType: f.crops?.[0] ?? "",
//   owner: f.owner ?? {
//     id: "",
//     name: "",
//     email: "",
//     phone: "",
//     role: "",
//     avatar: "",
//   },
//   size: typeof f.size === "number" ? f.size : 0,
//   images: f.images ?? [],
// }));
// const items: Item[] = ITEMS_MARKET.map((i) => ({
//   ...i,
//   description: typeof i.description === "string" ? i.description : "",
//   farm: farms.find((f) => f.id === i.farm),
//   images: i.images ?? [],
//   price: i.price ?? 0,
//   quantity: i.quantity ?? 0,
// }));

export function useSearch() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Gọi API lấy danh sách farms
  useEffect(() => {
    fetch("http://localhost:2412/api/farms?page=1&pageSize=10")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.items)) {
          setFarms(data.data.items);
          // Nếu cần map lại dữ liệu cho phù hợp với type Farm, có thể chỉnh sửa tại đây
        }
      });
  }, []);

  // Map items khi farms thay đổi
  useEffect(() => {
    setItems(
      ITEMS_MARKET.map((i) => ({
        ...i,
        description: typeof i.description === "string" ? i.description : "",
        farm: farms.find((f) => f.id === i.farm),
        images: i.images ?? [],
        price: i.price ?? 0,
        quantity: i.quantity ?? 0,
      }))
    );
  }, [farms]);

  useEffect(() => {
    const history = localStorage.getItem("farmverse-search-history");
    if (history) setSearchHistory(JSON.parse(history));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }
    const allSuggestions = [
      ...farms.map((f) => f.name),
      ...items.map((i) => i.name),
      "Phân bón",
      "Cây trồng",
    ];
    setSuggestions(
      allSuggestions
        .filter((s) => s.toLowerCase().includes(search.toLowerCase()))
        .filter((s, i, arr) => arr.indexOf(s) === i)
        .slice(0, 8)
    );
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveToHistory = (query: string) => {
    if (!query.trim()) return;
    const newHistory = [
      query,
      ...searchHistory.filter((h) => h !== query),
    ].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem(
      "farmverse-search-history",
      JSON.stringify(newHistory)
    );
  };

  return {
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
    clearHistory: () => {
      setSearchHistory([]);
      localStorage.removeItem("farmverse-search-history");
    },
    farms,
    items,
  };
}
