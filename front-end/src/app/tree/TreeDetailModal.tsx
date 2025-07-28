import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";
import { TreeBasicInfo } from "./TreeBasicInfo";
import { TreeHealthStatus } from "./TreeHealthStatus";
import { TreeScheduleTimeline } from "./TreeScheduleTimeline";
import { TreeIotInfo } from "./TreeIotInfo";
import { TreeItem } from "./types";

type TreeDetailModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTree: TreeItem | null;
};

function getRandomFloat(min: number, max: number, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

export default function TreeDetailModal({
  open,
  setOpen,
  selectedTree,
}: TreeDetailModalProps) {
  const [iotInfo, setIotInfo] = React.useState({
    temperature: 0,
    humidity: 0,
    nitogenLevel: 0,
    phosphorusLevel: 0,
    kaliumLevel: 0,
    semiconductorLevel: 0,
  });

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (open) {
      setIotInfo({
        temperature: getRandomFloat(18, 40, 1),
        humidity: getRandomFloat(30, 90, 1),
        nitogenLevel: 30,
        phosphorusLevel: 12,
        kaliumLevel: 25,
        semiconductorLevel: getRandomFloat(100, 1000, 0),
      });
      interval = setInterval(() => {
        setIotInfo({
          temperature: getRandomFloat(18, 40, 1),
          humidity: getRandomFloat(30, 90, 1),
          nitogenLevel: 30,
          phosphorusLevel: 12,
          kaliumLevel: 25,
          semiconductorLevel: getRandomFloat(100, 1000, 0),
        });
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[98vw] w-full max-h-[98vh] p-0 sm:max-w-[95vw] sm:max-h-[95vh]">
        {selectedTree && (
          <div className="flex flex-col h-full max-h-[98vh] sm:max-h-[95vh]">
            <div className="p-4 sm:p-6 flex-shrink-0">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="relative group flex-shrink-0">
                  <Image
                    src={selectedTree.img}
                    alt={selectedTree.name}
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-gray-200 dark:border-gray-600 object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                    {selectedTree.name}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium">
                    {selectedTree.type}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <div className="hidden lg:grid lg:grid-cols-3 h-full">
                <div className="border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
                  <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    <TreeBasicInfo tree={selectedTree} />
                    <TreeHealthStatus
                      temperature={iotInfo.temperature}
                      humidity={iotInfo.humidity}
                    />
                  </div>
                </div>
                <div className="border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden">
                  <div className="p-6 pb-3 flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
                    <TreeScheduleTimeline rentedTreeId={selectedTree.id} />
                  </div>
                </div>
                <div className="flex flex-col h-full">
                  <div className="p-6 pb-3 flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
                    <TreeIotInfo iotInfo={iotInfo} />
                  </div>
                </div>
              </div>
              {/* Mobile layout: bạn có thể tái sử dụng các component trên cho mobile */}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
