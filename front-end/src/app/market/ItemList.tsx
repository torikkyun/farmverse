import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Item } from "./types/market";
import { ItemModal } from "./ItemModal";
import {
  Package,
  Coins,
  Warehouse,
  ChevronDown,
  ChevronUp,
  Flower2,
  Sprout,
  Star,
  TrendingUp,
} from "lucide-react";

function compareMongoIdDesc(a: Item, b: Item) {
  return b.id.localeCompare(a.id);
}

export function ItemList({
  items,
  viewMode = "grid",
}: {
  items: Item[];
  viewMode?: "grid" | "list";
}) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAll, setShowAll] = useState(false);

  const maxShow = 6;
  const sortedItems = [...items].sort(compareMongoIdDesc);
  const displayItems = showAll ? sortedItems : sortedItems.slice(0, maxShow);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "FERTILIZER":
        return <Sprout className="w-4 h-4" />;
      case "TREEROOT":
        return <Flower2 className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "FERTILIZER":
        return "Phân bón";
      case "TREEROOT":
        return "Cây trồng";
      default:
        return "Khác";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "FERTILIZER":
        return "bg-amber-500 text-white shadow-md";
      case "TREEROOT":
        return "bg-green-500 text-white shadow-md";
      default:
        return "bg-blue-500 text-white shadow-md";
    }
  };

  const formatStock = (stock: number | null | undefined) => {
    if (stock === null || stock === undefined) {
      return "∞";
    }
    return stock.toString();
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-8">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-3xl"></div>
        <div className="relative p-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative p-3 bg-black dark:bg-white rounded-2xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white dark:text-black" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-black dark:text-white">
                Sản phẩm mới nhất
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Khám phá những sản phẩm chất lượng cao từ Farmverse
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            : "grid-cols-1 gap-6"
        }`}
      >
        {displayItems.map((item, idx) => (
          <div
            key={item.id || idx}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
            onClick={() => setSelectedItem(item)}
          >
            <Card className="relative h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden rounded-2xl">
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl"></div>

              <CardContent className="p-0 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                  <Image
                    src={item.images?.[0] || "/images/default.png"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    priority
                  />

                  {/* Type Badge - Color accent */}
                  <div className="absolute top-4 right-4 z-20">
                    <Badge
                      className={`border-0 px-3 py-1.5 flex items-center gap-2 font-semibold text-sm ${getTypeColor(
                        item.type
                      )} transform group-hover:scale-105 transition-transform duration-300`}
                    >
                      {getTypeIcon(item.type)}
                      {getTypeName(item.type)}
                    </Badge>
                  </div>

                  {/* Price overlay - Important accent */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="bg-black/90 dark:bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-white" />
                        <span className="font-bold text-sm text-white dark:text-black">
                          {item.price} FVT
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col bg-white dark:bg-gray-900">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-black dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 mb-4">
                      {item.name}
                    </h3>
                  </div>

                  {/* Stock Info & Action Area - Grouped together */}
                  <div className="space-y-3">
                    {/* Stock Info */}
                    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg">
                          <Warehouse className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Kho:
                        </span>
                      </div>
                      <span className="font-bold text-base text-black dark:text-white min-w-[3rem] text-right">
                        {formatStock(item.stock)}
                      </span>
                    </div>

                    {/* Action Area */}
                    <Button
                      variant="ghost"
                      className="w-full group/btn hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-black dark:text-white font-semibold group-hover/btn:text-gray-700 dark:group-hover/btn:text-gray-300">
                        Xem chi tiết
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Show More/Less Buttons */}
      {sortedItems.length > maxShow && !showAll && (
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            className="px-12 py-4 text-lg rounded-2xl font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            onClick={() => setShowAll(true)}
          >
            <ChevronDown className="w-5 h-5" />
            Xem thêm sản phẩm
          </Button>
        </div>
      )}

      {showAll && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="px-12 py-4 text-lg rounded-2xl font-semibold border-2 border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            onClick={() => setShowAll(false)}
          >
            <ChevronUp className="w-5 h-5" />
            Thu gọn
          </Button>
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-24">
          <div className="mb-8">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded-full blur-xl opacity-30"></div>
              <div className="relative p-8 bg-gray-100 dark:bg-gray-800 rounded-full shadow-xl border border-gray-200 dark:border-gray-700">
                <Package className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
            Chưa có sản phẩm nào
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Hãy quay lại sau để khám phá những sản phẩm mới nhất.
          </p>
        </div>
      )}
    </div>
  );
}
