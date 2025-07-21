import { Calendar } from "@/components/ui/calendar";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/button";

type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

interface AddScheduleModalProps {
  open: boolean;
  loading: boolean;
  newSchedule: {
    name: string;
    description: string;
    status: boolean;
  };
  range: DateRange | undefined;
  onChange: (field: string, value: string | boolean) => void;
  onClose: () => void;
  onSave: () => void;
}

export default function AddScheduleModal({
  open,
  loading,
  newSchedule,
  range,
  onChange,
  onClose,
  onSave,
}: AddScheduleModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(30, 41, 59, 0.4)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        transition: "background 0.2s",
      }}
    >
      <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto relative border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white text-center">
          Thêm công việc mới
        </h3>
        <div className="space-y-4">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Tên công việc
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
            placeholder="Nhập tên công việc"
            value={newSchedule.name}
            onChange={(e) => onChange("name", e.target.value)}
            disabled={loading}
          />
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Mô tả
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
            placeholder="Nhập mô tả"
            value={newSchedule.description}
            onChange={(e) => onChange("description", e.target.value)}
            disabled={loading}
          />
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Chọn khoảng ngày
            </label>
            <Calendar
              mode="range"
              selected={range}
              disabled={loading}
              locale={vi}
              className="rounded-lg border border-gray-300 dark:border-gray-700 w-full"
            />
          </div>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={newSchedule.status}
              onChange={(e) => onChange("status", e.target.checked)}
              disabled={loading}
              className="accent-blue-500"
            />
            Đang hoạt động
          </label>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            variant="default"
            onClick={onSave}
            disabled={loading || !range?.from || !range?.to}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </div>
  );
}
