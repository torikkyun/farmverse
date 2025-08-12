import { Leaf } from "lucide-react";
import { TreeItem } from "./types";
import { getStatusIcon } from "./treeUtils";

// Hàm chuyển trạng thái sang tiếng Việt
function getStatusText(status: string) {
  switch (status) {
    case "READY_TO_HARVEST":
      return "Sẵn sàng thu hoạch";
    case "GROWING":
      return "Đang phát triển";
    case "HARVESTING":
      return "Đang thu hoạch";
    case "HARVESTED":
      return "Đã thu hoạch";
    default:
      return status;
  }
}

// Hàm lấy màu theo trạng thái
function getStatusColor(status: string) {
  switch (status) {
    case "READY_TO_HARVEST":
      return "bg-yellow-600 text-white";
    case "GROWING":
      return "bg-green-600 text-white";
    case "HARVESTING":
      return "bg-blue-600 text-white";
    case "HARVESTED":
      return "bg-gray-600 text-white";
    default:
      return "bg-black text-white";
  }
}

export function TreeBasicInfo({ tree }: { tree: TreeItem }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-black rounded-lg">
          <Leaf className="text-white" size={20} />
        </div>
        <h3 className="text-xl font-semibold text-black">Thông tin cơ bản</h3>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500 mb-2 font-medium">Tuổi cây</div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-black">{tree.age}</span>
            <span className="text-sm text-gray-600 font-medium">năm</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500 mb-2 font-medium">
            Sản lượng
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-black">{tree.yield}</span>
            <span className="text-sm text-gray-600 font-medium">kg/năm</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500 mb-3 font-medium">Trạng thái</div>
        <div
          className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 ${getStatusColor(
            tree.status
          )}`}
        >
          <div className="flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full">
            {getStatusIcon(tree.status)}
          </div>
          <span className="font-semibold uppercase tracking-wide">
            {getStatusText(tree.status)}
          </span>
        </div>
      </div>
    </div>
  );
}
