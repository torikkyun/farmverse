import { TrendingUp } from "lucide-react";
import { getHealthStatus } from "./treeUtils";

export function TreeHealthStatus({
  temperature,
  humidity,
}: {
  temperature: number;
  humidity: number;
}) {
  const healthStatus = getHealthStatus(temperature, humidity);
  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
        <TrendingUp className="text-black" size={20} />
        Tình trạng sức khỏe
      </h3>
      <div className="p-4 rounded-lg bg-white border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-black"></div>
          <span className="font-semibold text-black">
            {healthStatus.status}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Dựa trên nhiệt độ và độ ẩm hiện tại
        </p>
      </div>
    </div>
  );
}
