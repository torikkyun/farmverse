import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Farm } from "./FarmList";
import { ItemModal } from "./ItemModal";

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

export function ItemList({ items }: { items: Item[] }) {
  const sortedItems = [...items].sort(compareMongoIdDesc).slice(0, 6);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <h2 className="text-2xl font-bold text-primary mb-1">
        Các cây trồng & phân bón mới nhất
      </h2>
      <p className="text-muted-foreground mb-5">
        Hiển thị 6 sản phẩm mới nhất
      </p>
      <div className="flex gap-6 flex-wrap">
        {sortedItems.map((item, idx) => (
          <button
            key={item.id || idx}
            className="block focus:outline-none"
            onClick={() => setSelectedItem(item)}
            type="button"
          >
            <Card className="w-80 min-w-[320px] bg-card border border-muted-foreground/10 hover:scale-[1.03] transition-transform duration-200 overflow-x-hidden">
              <CardContent className="p-0">
                <img
                  src={item.images?.[0] || "/images/default.png"}
                  alt={item.name}
                  className="rounded-t-xl h-44 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2">
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
                    <span className="text-muted-foreground ml-2">Số lượng:</span>
                    <span className="font-medium">{item.quantity ?? "-"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
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
