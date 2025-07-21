// Import dữ liệu cây từ file tree
import { TREE_ITEMS } from "@/data/tree";

interface Props {
  farmId: string; // Thêm prop farmId để xác định nông trại
}

export default function ScheduleSection({ farmId }: Props) {
  // Lấy danh sách cây thuộc nông trại này
  const trees = TREE_ITEMS.filter((tree) => tree.farm === farmId);

  // Gộp tất cả công việc chăm sóc từ careSchedule của các cây
  const schedules =
    trees
      .flatMap((tree) =>
        (tree.careSchedule || []).map((schedule, idx) => ({
          id: `${tree.id}-month-${schedule.month}-${idx}`,
          name: tree.name,
          month: schedule.month,
          activities: schedule.activities,
          treeId: tree.id,
        }))
      )
      .sort((a, b) => a.month - b.month) || [];

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white rounded p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Danh sách công việc chăm sóc cây trồng
        </h2>
      </div>
      {schedules.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 italic">
          Không có lịch trình chăm sóc nào cho nông trại này.
        </div>
      ) : (
        <div className="space-y-6">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-black shadow"
            >
              <div className="font-bold text-lg text-black dark:text-white mb-2">
                {schedule.name} - Tháng {schedule.month}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                <span className="font-medium">Hoạt động:</span>{" "}
                {schedule.activities.join(", ")}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Mã cây: {schedule.treeId}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
