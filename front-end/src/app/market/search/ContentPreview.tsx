import { Button } from "@/components/ui/button";
import FarmList from "../FarmList";
import { ItemList } from "../ItemList";
import type { Farm, Item } from "../types/market";
import { useRouter } from "next/navigation";

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
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        <div>
          <FarmList farms={farms.slice(0, 6)} />
          {farms.length > 6 && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => nav.push("/market/farms")}
                className="px-8 py-4 rounded-2xl font-semibold text-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Xem thêm trang trại
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
                className="px-8 py-4 rounded-2xl font-semibold text-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Xem thêm sản phẩm
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
