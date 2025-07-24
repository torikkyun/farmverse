import {
  Thermometer,
  Droplets,
  Leaf,
  FlaskConical,
  Sprout,
  Zap,
} from "lucide-react";

type IotInfo = {
  temperature: number;
  humidity: number;
  nitogenLevel: number;
  phosphorusLevel: number;
  kaliumLevel: number;
  semiconductorLevel: number;
};

export function TreeIotInfo({ iotInfo }: { iotInfo: IotInfo }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <Zap className="text-amber-600" size={20} />
        Thông số IOT
        <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full">
          Live
        </span>
      </h3>
      <div className="space-y-4 mt-4">
        <div>
          <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">
            Môi trường
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer size={14} className="text-orange-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Nhiệt độ
                </span>
              </div>
              <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {iotInfo.temperature}°C
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Droplets size={14} className="text-blue-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Độ ẩm
                </span>
              </div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {iotInfo.humidity}%
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">
            Chất dinh dưỡng
          </h4>
          <div className="space-y-2">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf size={14} className="text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nitơ (N)
                  </span>
                </div>
                <span className="text-sm font-bold text-emerald-600">
                  {iotInfo.nitogenLevel} mg/kg
                </span>
              </div>
            </div>
            <div className="bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FlaskConical size={14} className="text-violet-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Photpho (P)
                  </span>
                </div>
                <span className="text-sm font-bold text-violet-600">
                  {iotInfo.phosphorusLevel} mg/kg
                </span>
              </div>
            </div>
            <div className="bg-lime-50 dark:bg-lime-900/20 p-3 rounded-lg border border-lime-200 dark:border-lime-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sprout size={14} className="text-lime-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Kali (K)
                  </span>
                </div>
                <span className="text-sm font-bold text-lime-600">
                  {iotInfo.kaliumLevel} mg/kg
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-amber-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Độ dẫn điện
            </span>
          </div>
          <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
            {iotInfo.semiconductorLevel} µS/cm
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Chỉ số độ mặn của đất
          </p>
        </div>
      </div>
    </div>
  );
}
