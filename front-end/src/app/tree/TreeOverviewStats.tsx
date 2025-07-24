import { Wallet, TreePine, Clock } from "lucide-react";

type Props = {
  totalPaid: number;
  activeTreesCount: number;
  expiringSoonCount: number;
};

export function TreeOverviewStats({
  totalPaid,
  activeTreesCount,
  expiringSoonCount,
}: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h1 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
        <TreePine className="w-8 h-8 text-green-600" />
        Cây Đã Thuê Của Tôi
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tổng chi phí đã trả */}
        <div className="bg-black text-white p-4 rounded-lg border-1 border-black">
          <div className="text-center">
            <Wallet className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm opacity-80">Tổng chi phí đã trả</div>
            <div className="text-xl font-bold">
              {totalPaid.toLocaleString()} FVT
            </div>
          </div>
        </div>
        {/* Cây đang thuê */}
        <div className="bg-white border-1 border-black p-4 rounded-lg">
          <div className="text-center">
            <TreePine className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-sm text-gray-600">Đang thuê</div>
            <div className="text-xl font-bold text-black">
              {activeTreesCount} cây
            </div>
          </div>
        </div>
        {/* Cây sắp hết hạn */}
        <div className="bg-white border-1 border-black p-4 rounded-lg">
          <div className="text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-sm text-gray-600">Sắp hết hạn</div>
            <div className="text-xl font-bold text-black">
              {expiringSoonCount} cây
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
