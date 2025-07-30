import { useEffect, useState } from "react";

interface TreeItem {
  id: string;
  name: string;
  farm: string;
  careSchedule?: {
    month: number;
    activities: string[];
  }[];
}

interface Schedule {
  id: string;
  name: string;
  month: number;
  activities: string[];
  treeId: string;
}

interface Props {
  farmId: string; // Thêm prop farmId để xác định nông trại
}

export default function ScheduleSection({ farmId }: Props) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/farms/${farmId}/schedules`
        );

        if (!response.ok) {
          throw new Error("Không thể tải lịch trình chăm sóc");
        }

        const data = await response.json();

        // Xử lý data từ API thành format schedules
        const processedSchedules = data.trees?.flatMap(
          (tree: TreeItem) =>
            (tree.careSchedule || [])
              .map((schedule, idx) => ({
                id: `${tree.id}-month-${schedule.month}-${idx}`,
                name: tree.name,
                month: schedule.month,
                activities: schedule.activities,
                treeId: tree.id,
              }))
              .sort((a: Schedule, b: Schedule) => a.month - b.month) || []
        );

        setSchedules(processedSchedules);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    if (farmId) {
      fetchSchedules();
    }
  }, [farmId]);

  if (loading) {
    return (
      <div className="bg-white border-2 border-black rounded-lg p-4 sm:p-6 md:p-8">
        <div className="text-center text-gray-600 py-8">
          <div className="animate-pulse">Đang tải lịch trình chăm sóc...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border-2 border-black rounded-lg p-4 sm:p-6 md:p-8">
        <div className="text-center text-red-600 py-8">
          <div className="font-bold mb-2">Lỗi!</div>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-black rounded-lg p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black uppercase tracking-wide">
          DANH SÁCH CÔNG VIỆC CHĂM SÓC CÂY TRỒNG
        </h2>
      </div>

      {schedules.length === 0 ? (
        <div className="text-center text-gray-500 italic py-8">
          Không có lịch trình chăm sóc nào cho nông trại này.
        </div>
      ) : (
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="font-bold text-lg text-black mb-2">
                {schedule.name} - Tháng {schedule.month}
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Hoạt động:</span>{" "}
                {schedule.activities.join(", ")}
              </div>
              <div className="text-xs text-gray-500">
                Mã cây: {schedule.treeId}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
