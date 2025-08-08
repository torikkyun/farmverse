import { TreeCard } from "./TreeCard";
import type { RentedTree } from "./treeHooks";

interface TreeListProps {
  trees: RentedTree[];
  loading: boolean;
  onDetail: (tree: RentedTree) => void;
  onHarvest: (tree: RentedTree) => void;
  role?: string | null;
  onOpenSellPriceModal?: (tree: RentedTree) => void;
}

export default function TreeList({
  trees,
  loading,
  onDetail,
  onHarvest,
  role,
  onOpenSellPriceModal,
}: TreeListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {loading ? (
        <div className="col-span-full text-center text-gray-500 py-8">
          Đang tải dữ liệu...
        </div>
      ) : trees.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 py-8">
          Không tìm thấy cây phù hợp.
        </div>
      ) : (
        trees.map((item) => (
          <TreeCard
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              img: item.images?.[0] || "",
              type: "",
              age: 0,
              yield: 0,
              status: item.status,
              ownerName: "",
              rentStartDate: item.startDate,
              rentEndDate: item.endDate,
              monthlyRent: 0,
              totalPaid: 0,
              remainingMonths: 0,
              schedule: [],
            }}
            onDetail={() => onDetail(item)}
            onHarvest={() => onHarvest(item)}
            role={role}
            onOpenSellPriceModal={
              onOpenSellPriceModal
                ? () => onOpenSellPriceModal(item)
                : undefined
            }
          />
        ))
      )}
    </div>
  );
}
