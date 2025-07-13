import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";

export function ItemDetailModal({ open, onOpenChange, item }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">
        {item && (
          <div className="flex flex-col gap-6 p-8">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide text-center mb-4 drop-shadow">
              Thông tin vật phẩm
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-28 h-28 rounded-2xl border-2 border-blue-300 dark:border-blue-700 object-cover bg-white dark:bg-black shadow-xl"
              />
              <div className="flex flex-col gap-3 flex-1 items-center sm:items-start">
                <div className="text-xl font-bold text-black dark:text-white text-center sm:text-left">
                  {item.name}
                </div>
                <div className="text-base text-blue-700 dark:text-blue-300 text-center sm:text-left font-semibold">
                  <span className="font-bold text-black dark:text-white">
                    Mã vật phẩm:
                  </span>{" "}
                  {item.code}
                </div>
                <div className="text-base text-gray-700 dark:text-gray-300 text-center sm:text-left">
                  <span className="font-semibold text-black dark:text-white">
                    Số lượng:
                  </span>{" "}
                  {item.amount} - {item.unit}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
