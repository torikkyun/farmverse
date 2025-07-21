import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import {
  Thermometer,
  Droplets,
  Leaf,
  FlaskConical,
  Sprout,
  Zap,
} from "lucide-react";
import Image from "next/image";

type ScheduleItem = {
  date: string;
  action: string;
  stage: string;
};

export type TreeItem = {
  name: string;
  type: string;
  age: number;
  yield: number;
  status: string;
  img: string;
  schedule?: ScheduleItem[];
};

type TreeDetailModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTree: TreeItem | null;
};

function getRandomFloat(min: number, max: number, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

export function TreeDetailModal({
  open,
  setOpen,
  selectedTree,
}: TreeDetailModalProps) {
  // Random IOT info liên tục khi modal mở
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
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-8xl p-0" style={{ minWidth: 1400 }}>
        {selectedTree && (
          <div className="flex flex-col md:flex-row gap-0 p-8">
            {/* Cột 1: Thông tin cây */}
            <div className="flex-1 flex flex-col items-center py-4 px-6 border-r border-black dark:border-white bg-white dark:bg-black">
              <div className="text-2xl font-bold text-black dark:text-white uppercase tracking-wide mb-6 text-center">
                Thông tin cây
              </div>
              <Image
                src={selectedTree.img}
                alt={selectedTree.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-2xl border-2 border-black dark:border-white object-cover bg-white dark:bg-black shadow mb-4"
              />
              <div className="font-bold text-black dark:text-white text-lg mb-2">
                {selectedTree.name}
              </div>
              <div className="text-base text-black dark:text-white font-medium mb-2">
                {selectedTree.type}
              </div>
              <div className="text-base text-black dark:text-white font-semibold mb-1">
                Tuổi: {selectedTree.age} năm
              </div>
              <div className="text-base text-black dark:text-white font-semibold mb-4">
                Sản lượng: {selectedTree.yield} kg/năm
              </div>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow bg-opacity-90 whitespace-nowrap
                  ${
                    selectedTree.status === "Đang phát triển"
                      ? "bg-black text-white"
                      : selectedTree.status === "Đã thu hoạch"
                      ? "bg-white text-black border border-black"
                      : "bg-gray-300 text-black dark:bg-neutral-700 dark:text-white"
                  }
                `}
              >
                {selectedTree.status}
              </span>
            </div>
            {/* Cột 2: Lịch trình chăm sóc cây */}
            <div className="flex-1 flex flex-col py-4 px-6 border-r border-black items-center">
              <div className="text-2xl font-bold text-black uppercase tracking-wide mb-6 text-center">
                Lịch trình chăm sóc cây
              </div>
              <div className="mt-4 w-full">
                <div
                  className="overflow-y-auto relative"
                  style={{
                    maxHeight: "320px",
                    paddingRight: "8px",
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE 10+
                  }}
                >
                  <style>
                    {`
                      .overflow-y-auto::-webkit-scrollbar {
                        display: none;
                      }
                    `}
                  </style>
                  <div className="relative pl-8">
                    {/* Timeline vertical line */}
                    <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
                    {selectedTree?.schedule &&
                      selectedTree.schedule.length === 0 && (
                        <div className="text-gray-500 dark:text-gray-400 italic">
                          Không có lịch trình nào.
                        </div>
                      )}
                    {selectedTree?.schedule &&
                      selectedTree.schedule
                        .sort(
                          (a, b) =>
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime()
                        )
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="relative flex items-start mb-10 group"
                          >
                            {/* Timeline dot with date */}
                            <div className="absolute left-2 top-8 flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black shadow transition-transform group-hover:scale-110"></div>
                              <span className="mt-2 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                                {new Date(item.date).getDate()}/
                                {new Date(item.date).getMonth() + 1}
                              </span>
                            </div>
                            {/* Timeline content */}
                            <div className="ml-12 flex-1 p-5 border border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-black shadow-sm transition group-hover:shadow-lg group-hover:border-black dark:group-hover:border-white">
                              <div className="font-bold text-lg mb-2 text-black dark:text-white">
                                {item.stage === "seedling"
                                  ? "Gieo hạt"
                                  : item.stage === "care"
                                  ? "Chăm sóc"
                                  : item.stage === "protect"
                                  ? "Bảo vệ"
                                  : item.stage === "harvest"
                                  ? "Thu hoạch"
                                  : "Khác"}
                              </div>
                              <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Công việc:</span>{" "}
                                {item.action}
                              </div>
                              <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Ngày:</span>{" "}
                                {new Date(item.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Cột 3: Thông số IOT */}
            <div className="flex-1 flex flex-col py-4 px-6 items-center bg-white dark:bg-black">
              <div className="text-2xl font-bold text-black dark:text-white uppercase tracking-wide mb-6 text-center">
                Thông số IOT
              </div>
              <div className="flex flex-col gap-4 text-black dark:text-white text-base w-full max-w-xs mx-auto">
                <div className="flex items-center gap-2">
                  <Thermometer size={20} className="text-orange-500" />
                  <span className="font-semibold">Nhiệt độ:</span>
                  <span className="text-black dark:text-white">
                    {iotInfo.temperature} °C
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets size={20} className="text-blue-500" />
                  <span className="font-semibold">Độ ẩm:</span>
                  <span className="text-black dark:text-white">
                    {iotInfo.humidity} %
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf size={20} className="text-green-600" />
                  <span className="font-semibold">Nitơ:</span>
                  <span className="text-black dark:text-white">
                    {iotInfo.nitogenLevel} mg/kg
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FlaskConical size={20} className="text-purple-600" />
                  <span className="font-semibold">Photpho:</span>
                  <span className="text-black dark:text-white">
                    {iotInfo.phosphorusLevel} mg/kg
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout size={20} className="text-lime-600" />
                  <span className="font-semibold">Kali:</span>
                  <span className="text-black dark:text-white">
                    {iotInfo.kaliumLevel} mg/kg
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-yellow-500" />
                  <span className="font-semibold">Độ dẫn điện:</span>
                  <span className="text-black dark:text-white">
                    {iotInfo.semiconductorLevel} µS/cm
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
