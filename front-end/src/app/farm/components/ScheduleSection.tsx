import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { vi } from "date-fns/locale";
import AddScheduleModal from "../AddScheduleModal";
import { Schedule } from "../useFarmSchedule";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
  handleRangeChange: (
    range: { from: Date | undefined; to?: Date | undefined } | undefined
  ) => void;
  handleSave: () => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date?: Date) => void;
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
  handleRangeChange,
  handleSave,
  selectedDate,
  setSelectedDate,
}: Props) {
  function getDatesInRange(start: Date, end: Date) {
    const dates = [];
    const current = new Date(start); // Đổi từ let sang const
    while (current <= end) {
      dates.push(current.toDateString());
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  const scheduleDates = schedules.flatMap((sch) =>
    getDatesInRange(new Date(sch.startTime), new Date(sch.endTime))
  );
  const selectedSchedules = schedules.filter(
    (sch) =>
      selectedDate &&
      new Date(sch.startTime) <= selectedDate &&
      selectedDate <= new Date(sch.endTime)
  );

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
        onRangeChange={handleRangeChange}
        onClose={() => setAddScheduleOpen(false)}
        onSave={handleSave}
      />
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-5 items-stretch">
          <div className="bg-white dark:bg-black rounded-xl shadow p-2 sm:p-4 md:w-[320px] flex-shrink-0 flex flex-col items-center min-h-[400px]">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={vi}
              modifiers={{
                hasSchedule: (date) =>
                  scheduleDates.includes(date.toDateString()),
              }}
              modifiersClassNames={{
                hasSchedule:
                  "bg-black text-white dark:bg-white dark:text-black font-bold rounded-lg w-8 h-8 text-sm flex items-center justify-center mx-1",
                selected:
                  "text-white font-bold rounded-lg w-8 h-8 text-sm flex items-center justify-center mx-1",
              }}
              className="w-full"
            />
          </div>
          <div className="bg-white dark:bg-black rounded-xl shadow p-2 sm:p-4 flex-1 min-h-[400px] flex flex-col justify-start">
            <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
              {selectedDate
                ? `Công việc ngày ${selectedDate.toLocaleDateString()}:`
                : "Bạn hãy chọn ngày để xem công việc"}
            </h3>
            {selectedDate && selectedSchedules.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 italic">
                Không có lịch trình nào.
              </div>
            )}
            {selectedDate && selectedSchedules.length > 0 && (
              <div className="space-y-4 sm:space-y-6">
                {selectedSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="p-3 sm:p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
                  >
                    <div className="font-semibold text-base mb-2">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 align-middle"></span>
                      {schedule.name}
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">Mô tả:</span>{" "}
                      {schedule.description}
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">Thời gian:</span>{" "}
                      {new Date(schedule.startTime).toLocaleDateString()} -{" "}
                      {new Date(schedule.endTime).toLocaleDateString()}
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">Trạng thái:</span>{" "}
                      <span
                        className={
                          schedule.status
                            ? "text-green-600 font-semibold"
                            : "text-gray-600"
                        }
                      >
                        {schedule.status ? "Đang hoạt động" : "Đã kết thúc"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Nông trại:</span>{" "}
                      {schedule.farm?.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
