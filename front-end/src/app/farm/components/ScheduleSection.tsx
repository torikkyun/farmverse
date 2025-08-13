import { useEffect } from "react";
import { Calendar, Clock, Leaf, ChevronRight } from "lucide-react";
import { useFarmSchedule } from "../useFarmSchedule";

interface Props {
  farmId: string;
}

export default function ScheduleSection({ farmId }: Props) {
  const { schedules, loading, error, reloadSchedules } =
    useFarmSchedule(farmId);

  useEffect(() => {
    reloadSchedules();
  }, [reloadSchedules]);

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
          <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Lịch Chăm Sóc Cây Trồng
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Theo dõi tiến độ chăm sóc hàng tháng
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <Clock className="w-5 h-5 animate-spin" />
            <span>Đang tải lịch trình...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 dark:text-red-400 font-medium">
            {error}
          </div>
        </div>
      ) : schedules.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
              <Leaf className="w-8 h-8 text-gray-400 dark:text-gray-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
            Chưa có lịch chăm sóc
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Trang trại này chưa có lịch trình chăm sóc nào.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {schedules.map((schedule, idx) => (
            <div
              key={idx}
              className="group border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white">
                      Tháng {schedule.month}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {schedule.activities.length} hoạt động
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {schedule.activities.map((activity, activityIdx) => (
                    <span
                      key={activityIdx}
                      className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
