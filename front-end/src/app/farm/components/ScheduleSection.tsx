import { Button } from "@/components/ui/button";
import AddScheduleModal from "../AddScheduleModal";
import { Schedule } from "../useFarmSchedule";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { startOfMonth, endOfMonth } from "date-fns";

interface Props {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
  alert: { type: "success" | "error"; message: string } | null;
  addScheduleOpen: boolean;
  setAddScheduleOpen: (open: boolean) => void;
  addLoading: boolean;
  newSchedule: {
    name: string;
    description: string;
    status: boolean;
  };
  range:
    | {
        from: Date | undefined;
        to?: Date | undefined;
      }
    | undefined;
  handleChange: (field: string, value: string | boolean) => void;
  handleRangeChange?: (
    range: { from: Date | undefined; to?: Date | undefined } | undefined
  ) => void;
  handleSave: () => void;
  selectedDate?: Date; // thêm dòng này
  setSelectedDate?: (date: Date | undefined) => void; // thêm dòng này
}

export default function ScheduleSection({
  schedules,
  loading,
  error,
  alert,
  addScheduleOpen,
  setAddScheduleOpen,
  addLoading,
  newSchedule,
  range,
  handleChange,
  handleSave,
}: Props) {
  // Lấy ngày đầu và cuối tháng hiện tại
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Lọc các lịch trình thuộc tháng hiện tại
  const monthSchedules = schedules.filter((sch) => {
    const schStart = new Date(sch.startTime);
    const schEnd = new Date(sch.endTime);
    return schEnd >= monthStart && schStart <= monthEnd;
  });

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white rounded p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Lịch chăm sóc cây trồng
        </h2>
        <Button
          variant="default"
          className="font-semibold flex items-center gap-2"
          onClick={() => setAddScheduleOpen(true)}
        >
          <span>+</span> Thêm công việc
        </Button>
      </div>
      {alert && (
        <div
          style={{
            position: "fixed",
            top: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            minWidth: "320px",
            maxWidth: "90vw",
          }}
        >
          <Alert
            variant={alert.type === "success" ? "default" : "destructive"}
            className="text-left"
          >
            <AlertTitle>
              {alert.type === "success" ? "Thành công" : "Lỗi"}
            </AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}
      <AddScheduleModal
        open={addScheduleOpen}
        loading={addLoading}
        newSchedule={newSchedule}
        range={range}
        onChange={handleChange}
        onClose={() => setAddScheduleOpen(false)}
        onSave={handleSave}
      />
      <div className=" dark:bg-black rounded-xl flex-1 min-h-[400px] flex flex-col justify-start">
        {loading && <div>Đang tải...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {monthSchedules.length === 0 && !loading && (
          <div className="text-gray-500 dark:text-gray-400 italic">
            Không có lịch trình nào trong tháng này.
          </div>
        )}
        {monthSchedules.length > 0 && !loading && (
          <div className="relative pl-8">
            {/* Timeline vertical line */}
            <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
            {monthSchedules
              .sort(
                (a, b) =>
                  new Date(a.startTime).getTime() -
                  new Date(b.startTime).getTime()
              )
              .map((schedule) => (
                <div
                  key={schedule.id}
                  className="relative flex items-start mb-10 group"
                >
                  {/* Timeline dot with date */}
                  <div className="absolute left-2 top-8 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black shadow transition-transform group-hover:scale-110"></div>
                    <span className="mt-2 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                      {new Date(schedule.startTime).getDate()}/
                      {new Date(schedule.startTime).getMonth() + 1}
                    </span>
                  </div>
                  {/* Timeline content */}
                  <div className="ml-12 flex-1 p-5 border border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-black shadow-sm transition group-hover:shadow-lg group-hover:border-black dark:group-hover:border-white">
                    <div className="font-bold text-lg mb-2 text-black dark:text-white">
                      {schedule.name}
                    </div>
                    <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Mô tả:</span>{" "}
                      {schedule.description}
                    </div>
                    <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Thời gian:</span>{" "}
                      {new Date(schedule.startTime).toLocaleDateString()} -{" "}
                      {new Date(schedule.endTime).toLocaleDateString()}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Nông trại:</span>{" "}
                      {schedule.farm?.name || "Chưa xác định"}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
