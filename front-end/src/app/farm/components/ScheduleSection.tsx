import { useEffect } from "react";
import { useFarmSchedule } from "../useFarmSchedule"; // import đúng đường dẫn

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
    <div className="bg-white border-2 border-black rounded-lg p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black uppercase tracking-wide">
          DANH SÁCH CÔNG VIỆC CHĂM SÓC CÂY TRỒNG
        </h2>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 italic py-8">
          Đang tải lịch trình chăm sóc...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 italic py-8">{error}</div>
      ) : schedules.length === 0 ? (
        <div className="text-center text-gray-500 italic py-8">
          Không có lịch trình chăm sóc nào cho nông trại này.
        </div>
      ) : (
        <div className="space-y-4">
          {schedules.map((schedule, idx) => (
            <div
              key={idx}
              className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="font-bold text-lg text-black mb-2">
                Tháng {schedule.month}
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Hoạt động:</span>{" "}
                {schedule.activities.join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
