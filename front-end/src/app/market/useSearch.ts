import { useState, useEffect, useRef } from "react";
import { Farm, Item } from "@/app/market/types/market";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useSearch(page = 1, pageSize = 10) {
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
    fetch(`${API_URL}/farms?page=${page}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.items)) {
          setFarms(data.data.items);
        }
      });
  }, [page, pageSize]);

  // Gọi API lấy danh sách items
  useEffect(() => {
    fetch(`${API_URL}/items?page=${page}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.items)) {
          setItems(data.data.items);
        }
      });
  }, [page, pageSize]);

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
  }, [search, farms, items]);

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
