import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { TreeItem } from "./TreeCard";

export function TreeDetailModal({
  open,
  setOpen,
  selectedTree,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  selectedTree: TreeItem | null;
}) {
  if (!selectedTree) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-0">
        <div className="flex flex-col gap-6 p-8">
          <div className="text-2xl font-bold text-green-700 dark:text-green-300 uppercase tracking-wide text-center mb-4 drop-shadow">
            Thông tin cây
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8">
            <Image
              src={selectedTree.img}
              alt={selectedTree.name}
              width={128}
              height={128}
              className="w-32 h-32 rounded-2xl border-2 border-green-300 dark:border-green-700 object-cover bg-white dark:bg-black shadow-xl"
              priority
            />
            <div className="flex flex-col gap-3 flex-1 items-center sm:items-start">
              <div className="text-xl font-bold text-black dark:text-white text-center sm:text-left">
                {selectedTree.name}
              </div>
              <div className="text-base text-green-700 dark:text-green-300 text-center sm:text-left font-semibold">
                <span className="font-bold text-black dark:text-white">
                  Giống:
                </span>{" "}
                {selectedTree.type}
              </div>
              <div className="text-base text-gray-700 dark:text-gray-300 text-center sm:text-left">
                <span className="font-semibold text-black dark:text-white">
                  Tuổi:
                </span>{" "}
                {selectedTree.age} năm
              </div>
              <div className="text-base text-gray-700 dark:text-gray-300 text-center sm:text-left">
                <span className="font-semibold text-black dark:text-white">
                  Sản lượng:
                </span>{" "}
                {selectedTree.yield} kg/năm
              </div>
              <div className="mt-2 text-center sm:text-left">
                <span className="font-semibold text-black dark:text-white mr-1">
                  Trạng thái:
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow bg-opacity-90 whitespace-nowrap
                    ${
                      selectedTree.status === "Đang phát triển"
                        ? "bg-green-600 text-white"
                        : selectedTree.status === "Đã thu hoạch"
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-300 text-black dark:bg-neutral-700 dark:text-white"
                    }
                  `}
                >
                  {selectedTree.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
