import { TrendingUp } from "lucide-react";
import { HarvestMode } from "./types";

type HarvestModeSelectorProps = {
  harvestMode: HarvestMode;
  onModeChange: (mode: HarvestMode) => void;
};

export function HarvestModeSelector({
  harvestMode,
  onModeChange,
}: HarvestModeSelectorProps) {
  const modes = [
    {
      key: "sell" as const,
      icon: TrendingUp,
      title: "Bán ngay",
      description: "Nhận FVT ngay lập tức",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-black rounded-full"></div>
        Phương thức xử lý
      </h3>
      <div className="space-y-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = harvestMode === mode.key;

          return (
            <button
              key={mode.key}
              onClick={() => onModeChange(mode.key)}
              className={`w-full rounded-xl p-4 border-2 transition-all duration-200 text-left ${
                isSelected
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? "bg-white/20" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <div className="font-bold text-base">{mode.title}</div>
                  <div
                    className={`text-sm ${
                      isSelected ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {mode.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
