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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <TrendingUp className="text-teal-600" size={20} />
        Tình trạng sức khỏe
      </h3>
      <div
        className={`p-4 rounded-lg ${healthStatus.bg} border border-gray-200 dark:border-gray-600`}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-3 h-3 rounded-full ${healthStatus.dotColor}`}
          ></div>
          <span className={`font-semibold ${healthStatus.color}`}>
            {healthStatus.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Dựa trên nhiệt độ và độ ẩm hiện tại
        </p>
      </div>
    </div>
  );
}
