import { Button } from "@/components/ui/button";
import FarmList from "../FarmList";
import { ItemList } from "../ItemList";
import type { Farm, Item } from "../types/market";
import { useRouter } from "next/navigation";
import { ChevronRight, Sprout, ShoppingBag } from "lucide-react";

interface ContentPreviewProps {
  farms: Farm[];
  items: Item[];
  router?: ReturnType<typeof useRouter>;
}

export default function ContentPreview({
  farms,
  items,
  router,
}: ContentPreviewProps) {
  const defaultRouter = useRouter();
  const nav = router ?? defaultRouter;

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        <div>
          <FarmList farms={farms.slice(0, 6)} />
          {farms.length > 6 && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => nav.push("/market/farms")}
                className="px-8 py-4 rounded-2xl font-semibold text-lg bg-black border-2 border-black text-white hover:bg-white hover:text-black transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <Sprout className="w-5 h-5 mr-2" />
                Xem thêm trang trại
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
        <div>
          <ItemList items={items.slice(0, 8)} />
          {items.length > 8 && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => nav.push("/market/items")}
                className="px-8 py-4 rounded-2xl font-semibold text-lg bg-black border-2 border-black text-white hover:bg-white hover:text-black transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Xem thêm sản phẩm
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
