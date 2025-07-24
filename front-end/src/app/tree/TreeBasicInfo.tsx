import { Leaf } from "lucide-react";
import { TreeItem } from "./types";
import { getStatusIcon } from "./treeUtils";

export function TreeBasicInfo({ tree }: { tree: TreeItem }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Leaf className="text-emerald-600" size={20} />
        Thông tin cơ bản
      </h3>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Tuổi cây
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {tree.age}
            <span className="text-sm font-normal ml-1">năm</span>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Sản lượng
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {tree.yield}
            <span className="text-sm font-normal ml-1">kg/năm</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap mt-4">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
          {getStatusIcon(tree.status)}
          <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
            {tree.status}
          </span>
        </div>
      </div>
    </div>
  );
}
