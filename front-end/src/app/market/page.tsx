"use client";

import { useState, useCallback, useMemo } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DepositModal from "@/components/DepositModal";
import { useRouter } from "next/navigation";
import { useSearch } from "./useSearch";
import ResultsSection from "./search/ResultsSection";
import HeroSection from "./search/HeroSection";
import ContentPreview from "./search/ContentPreview";
import SearchResultsHeader from "./SearchResultsHeader";

export default function MarketPage() {
  const [showResults, setShowResults] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openDeposit, setOpenDeposit] = useState(false);
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

  const locations = useMemo(
    () =>
      Array.from(
        new Set(
          farms
            .map((f) => f.address?.city)
            .filter(
              (city): city is string =>
                typeof city === "string" && city.length > 0
            )
        )
      ),
    [farms]
  );

  const filteredFarms = useMemo(
    () =>
      farms.filter(
        (f) =>
          (!search ||
            [f.name, f.description].some((field) =>
              field?.toLowerCase().includes(search.toLowerCase())
            )) &&
          (!location || location === "all" || f.address.city === location)
      ),
    [farms, search, location]
  );

  const filteredItems = useMemo(
    () =>
      items.filter(
        (i) =>
          (!search ||
            [i.name, i.description, i.type, i.farm?.name].some((field) =>
              field?.toLowerCase().includes(search.toLowerCase())
            )) &&
          (!location || location === "all" || i.farm?.address.city === location)
      ),
    [items, search, location]
  );

  const hasActiveFilters = !!(search.trim() || location);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions) return;
      const total = suggestions.length + searchHistory.length;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestion((prev) => (prev < total - 1 ? prev + 1 : -1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestion((prev) => (prev > -1 ? prev - 1 : total - 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          const selected = [...searchHistory, ...suggestions][
            selectedSuggestion
          ];
          setSearch(selected);
          setShowSuggestions(false);
          handleSearch(selected);
        } else handleSearch();
      }
      if (e.key === "Escape") {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    },
    [showSuggestions, suggestions, searchHistory, selectedSuggestion]
  );

  const handleSearch = useCallback(
    (searchTerm?: string) => {
      const query = searchTerm || search;
      if (query.trim() || location) {
        saveToHistory(query);
        setShowResults(true);
        setShowSuggestions(false);
      }
    },
    [search, location, saveToHistory]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setSearch(suggestion);
      setShowSuggestions(false);
      handleSearch(suggestion);
    },
    [handleSearch]
  );

  const handleClearSearch = useCallback(() => {
    setSearch("");
    setLocation("");
    setShowResults(false);
    setShowSuggestions(false);
  }, []);

  const sidebarStyle = {
    "--sidebar-width": "calc(var(--spacing) * 72)",
    "--header-height": "calc(var(--spacing) * 12)",
  } as React.CSSProperties;

  const handleDeposit = useCallback(() => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Vui lòng nhập số tiền hợp lệ!");
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
    setTimeout(() => {
      setOpenDeposit(false);
      setAmount("");
      setSuccess(false);
    }, 1500);
  }, [amount]);

  return (
    <SidebarProvider style={sidebarStyle}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div
          className={`w-full flex flex-1 flex-col ${
            showResults
              ? "bg-gray-50 dark:bg-gray-900"
              : "bg-white dark:bg-black"
          } min-h-screen`}
        >
          {showResults ? (
            <>
              <SearchResultsHeader
                search={search}
                location={location}
                totalResults={filteredFarms.length + filteredItems.length}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onClearSearch={handleClearSearch}
              />
              <div className="flex-1 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
                  <ResultsSection
                    farms={filteredFarms}
                    items={filteredItems}
                    viewMode={viewMode}
                    onClearSearch={handleClearSearch}
                    setShowResults={setShowResults}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <HeroSection
                search={search}
                setSearch={setSearch}
                location={location}
                setLocation={setLocation}
                locations={locations}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                suggestions={suggestions}
                selectedSuggestion={selectedSuggestion}
                setSelectedSuggestion={setSelectedSuggestion}
                searchHistory={searchHistory}
                searchInputRef={searchInputRef}
                suggestionsRef={suggestionsRef}
                saveToHistory={saveToHistory}
                clearHistory={clearHistory}
                handleKeyDown={handleKeyDown}
                handleSearch={handleSearch}
                handleSuggestionClick={handleSuggestionClick}
                hasActiveFilters={hasActiveFilters}
              />
              <ContentPreview farms={farms} items={items} router={router} />
            </>
          )}
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
