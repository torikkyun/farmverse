import { Search, Clock, TrendingUp } from "lucide-react";
import React from "react";

interface SearchSuggestionsProps {
  showSuggestions: boolean;
  search: string;
  searchHistory: string[];
  suggestions: string[];
  selectedSuggestion: number;
  suggestionsRef: React.RefObject<HTMLDivElement | null>;
  onSuggestionClick: (suggestion: string) => void;
  onClearHistory: () => void;
}

export function SearchSuggestions({
  showSuggestions,
  search,
  searchHistory,
  suggestions,
  selectedSuggestion,
  suggestionsRef,
  onSuggestionClick,
  onClearHistory,
}: SearchSuggestionsProps) {
  if (!showSuggestions || (!search && !searchHistory.length)) return null;

  return (
    <div
      ref={suggestionsRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-80 overflow-y-auto"
    >
      {/* History */}
      {!search && searchHistory.length > 0 && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tìm kiếm gần đây
              </span>
            </div>
            <button
              onClick={onClearHistory}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Xóa tất cả
            </button>
          </div>
          {searchHistory.map((item: string, index: number) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(item)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                selectedSuggestion === index
                  ? "bg-gray-100 dark:bg-gray-700"
                  : ""
              }`}
            >
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </button>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="p-3">
          {!search && (
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Đề xuất cho bạn
              </span>
            </div>
          )}
          {suggestions.map((suggestion: string, index: number) => {
            const adjustedIndex = search ? index : searchHistory.length + index;
            return (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                  selectedSuggestion === adjustedIndex
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <Search className="w-3 h-3 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {search
                    ? suggestion
                        .split(new RegExp(`(${search})`, "gi"))
                        .map((part, i) =>
                          part.toLowerCase() === search.toLowerCase() ? (
                            <span
                              key={i}
                              className="font-semibold text-green-600 dark:text-green-400"
                            >
                              {part}
                            </span>
                          ) : (
                            part
                          )
                        )
                    : suggestion}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {search && suggestions.length === 0 && (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          Không có đề xuất nào cho {search}
        </div>
      )}
    </div>
  );
}
