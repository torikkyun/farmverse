import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Farm } from "./FarmList";
import { ItemModal } from "./ItemModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export type Item = {
  id: string;
  name: string;
  type: string;
  description?: string | null;
  images: string[];
  price: number;
  quantity: number | null;
  farm?: Farm;
};

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

  // Hiển thị tối đa 6 sản phẩm (2 hàng x 3 cột)
  const maxShow = 6;
  const sortedItems = [...items].sort(compareMongoIdDesc);
  const displayItems = showAll ? sortedItems : sortedItems.slice(0, maxShow);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <h2 className="text-2xl font-bold text-primary mb-1">
        Các cây trồng & phân bón mới nhất
      </h2>
      <p className="text-muted-foreground mb-5">
        Các vật phẩm mới nhất của Farmverse
      </p>
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            : "grid-cols-1 gap-4"
        }`}
        style={{
          overflowX: "hidden",
          overflowY: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {displayItems.map((item, idx) => (
          <button
            key={item.id || idx}
            className="block focus:outline-none"
            onClick={() => setSelectedItem(item)}
            type="button"
          >
            <Card className="w-full h-full flex flex-col bg-card border border-muted-foreground/10 hover:scale-[1.03] transition-transform duration-200 overflow-x-hidden">
              <CardContent className="flex flex-col flex-1 p-0">
                <Image
                  src={item.images?.[0] || "/images/default.png"}
                  alt={item.name}
                  width={600}
                  height={176}
                  className="rounded-t-xl h-44 w-full object-cover"
                  priority
                />
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-left gap-2">
                      <span className="font-semibold text-base">
                        {item.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-1 text-xs border-green-500 text-green-600"
                      >
                        {item.type === "FERTILIZER"
                          ? "Phân bón"
                          : item.type === "TREEROOT"
                          ? "Cây trồng"
                          : item.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <span className="text-muted-foreground">Nông trại:</span>
                      <span className="font-medium">{item.farm?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <span className="text-muted-foreground">Giá:</span>
                      <span className="font-medium">{item.price} ETH</span>
                      <span className="text-muted-foreground ml-2">
                        Số lượng:
                      </span>
                      <span className="font-medium">
                        {item.quantity ?? "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
      {sortedItems.length > maxShow && !showAll && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="px-6 py-2 rounded-lg font-semibold transition text-black dark:text-white border-gray-300 dark:border-gray-700 bg-white dark:bg-black"
            onClick={() => setShowAll(true)}
          >
            Xem thêm
          </Button>
        </div>
      )}
      {showAll && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            className="px-6 py-2 rounded-lg font-semibold transition text-black dark:text-white border-gray-300 dark:border-gray-700 bg-white dark:bg-black"
            onClick={() => setShowAll(false)}
          >
            Thu gọn
          </Button>
        </div>
      )}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
      {sortedItems.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">
          Không có sản phẩm nào.
        </div>
      )}
    </div>
  );
}
