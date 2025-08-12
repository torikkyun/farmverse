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
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-black flex items-center gap-2 mb-6">
        <Zap className="text-black" size={20} />
        Thông số IOT
        <span className="text-xs bg-black text-white px-2 py-1 rounded-full ml-2">
          Live
        </span>
      </h3>
      <div className="space-y-6">
        {/* Môi trường */}
        <div>
          <h4 className="text-base font-semibold text-black mb-3">
            Môi trường
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer size={16} className="text-black" />
                <span className="text-xs font-medium text-gray-700">
                  Nhiệt độ
                </span>
              </div>
              <div className="text-xl font-bold text-black">
                {iotInfo.temperature}°C
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1">
                <Droplets size={16} className="text-black" />
                <span className="text-xs font-medium text-gray-700">Độ ẩm</span>
              </div>
              <div className="text-xl font-bold text-black">
                {iotInfo.humidity}%
              </div>
            </div>
          </div>
        </div>
        {/* Chất dinh dưỡng */}
        <div>
          <h4 className="text-base font-semibold text-black mb-3">
            Chất dinh dưỡng
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col justify-between h-25">
              <div>
                <div className="flex items-center gap-2">
                  <Leaf size={16} className="text-black" />
                  <span className="text-xs font-medium text-gray-700">
                    Nitơ (N)
                  </span>
                </div>
              </div>
              <div>
                <span className="text-base font-bold text-black">
                  {iotInfo.nitogenLevel} mg/kg
                </span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col justify-between h-25">
              <div>
                <div className="flex items-center gap-2">
                  <FlaskConical size={16} className="text-black" />
                  <span className="text-xs font-medium text-gray-700">
                    Photpho (P)
                  </span>
                </div>
              </div>
              <div>
                <span className="text-base font-bold text-black">
                  {iotInfo.phosphorusLevel} mg/kg
                </span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col justify-between h-25">
              <div>
                <div className="flex items-center gap-2">
                  <Sprout size={16} className="text-black" />
                  <span className="text-xs font-medium text-gray-700">
                    Kali (K)
                  </span>
                </div>
              </div>
              <div>
                <span className="text-base font-bold text-black">
                  {iotInfo.kaliumLevel} mg/kg
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Độ dẫn điện */}
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} className="text-black" />
            <span className="text-xs font-medium text-gray-700">
              Độ dẫn điện
            </span>
          </div>
          <div className="text-xl font-bold text-black">
            {iotInfo.semiconductorLevel} µS/cm
          </div>
          <p className="text-xs text-gray-500 mt-1">Chỉ số độ mặn của đất</p>
        </div>
      </div>
    </div>
  );
}
