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
      <DialogContent className="max-w-5xl p-0" style={{ minWidth: 1200 }}>
        {selectedTree && (
          <div className="flex flex-col md:flex-row gap-0 p-8">
            {/* Cột 1: Thông tin cây */}
            <div className="flex-1 flex flex-col items-center py-4 px-6 border-r border-neutral-200">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300 uppercase tracking-wide mb-6 text-center">
                Thông tin cây
              </div>
              <Image
                src={selectedTree.img}
                alt={selectedTree.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-2xl border-2 border-green-300 dark:border-green-700 object-cover bg-white dark:bg-black shadow mb-4"
              />
              <div className="font-bold text-black dark:text-white text-lg mb-2">
                {selectedTree.name}
              </div>
              <div className="text-base text-green-700 dark:text-green-300 font-medium mb-2">
                {selectedTree.type}
              </div>
              <div className="text-base text-black dark:text-gray-300 font-semibold mb-1">
                Tuổi: {selectedTree.age} năm
              </div>
              <div className="text-base text-black dark:text-gray-300 font-semibold mb-4">
                Sản lượng: {selectedTree.yield} kg/năm
              </div>
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
            {/* Cột 2: Lịch trình chăm sóc cây */}
            <div className="flex-1 flex flex-col py-4 px-6 border-r border-neutral-200 items-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300 uppercase tracking-wide mb-6 text-center">
                Lịch trình chăm sóc cây
              </div>
              <ul className="relative border-l-2 border-green-400 pl-6 space-y-8 w-full max-w-xs mx-auto">
                {selectedTree.schedule && selectedTree.schedule.length > 0 ? (
                  selectedTree.schedule.map((item, idx) => (
                    <li key={idx} className="relative flex flex-col">
                      <span className="absolute left-[-32px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white dark:border-neutral-900"></span>
                      <span className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
                        {item.date}
                      </span>
                      <span className="text-base text-black dark:text-white ml-1">
                        {item.action}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">Chưa có lịch trình.</li>
                )}
              </ul>
            </div>
            {/* Cột 3: Thông số IOT */}
            <div className="flex-1 flex flex-col py-4 px-6 items-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300 uppercase tracking-wide mb-6 text-center">
                Thông số IOT
              </div>
              <div className="flex flex-col gap-4 text-black dark:text-white text-base w-full max-w-xs mx-auto">
                <div className="flex items-center gap-2">
                  <Thermometer size={20} className="text-orange-500" />
                  <span className="font-semibold">Nhiệt độ:</span>
                  <span className="text-blue-700">
                    {iotInfo.temperature} °C
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets size={20} className="text-blue-500" />
                  <span className="font-semibold">Độ ẩm:</span>
                  <span className="text-blue-700">{iotInfo.humidity} %</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf size={20} className="text-green-600" />
                  <span className="font-semibold">Nitơ:</span>
                  <span className="text-blue-700">
                    {iotInfo.nitogenLevel} mg/kg
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FlaskConical size={20} className="text-purple-600" />
                  <span className="font-semibold">Photpho:</span>
                  <span className="text-blue-700">
                    {iotInfo.phosphorusLevel} mg/kg
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout size={20} className="text-lime-600" />
                  <span className="font-semibold">Kali:</span>
                  <span className="text-blue-700">
                    {iotInfo.kaliumLevel} mg/kg
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-yellow-500" />
                  <span className="font-semibold">Độ dẫn điện:</span>
                  <span className="text-blue-700">
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
