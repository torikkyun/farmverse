import { useState } from "react";

type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export function useAddSchedule(
  API_URL: string,
  farmId: string | undefined,
  reloadSchedules: () => void
) {
  const [addScheduleOpen, setAddScheduleOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    description: "",
    status: true,
  });
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const handleChange = (field: string, value: string | boolean) => {
    setNewSchedule((prev) => ({ ...prev, [field]: value }));
  };

  const handleRangeChange = (r: DateRange | undefined) => {
    setRange(r);
  };

  const handleSave = async () => {
    setAddLoading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("user") || "{}")?.accessToken || ""
          : "";
      console.log("token", token);
      const res = await fetch(`${API_URL}/schedules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newSchedule,
          farmId,
          startTime: range?.from ? range.from.toISOString() : "",
          endTime: range?.to ? range.to.toISOString() : "",
        }),
      });
      if (!res.ok) throw new Error("Thêm công việc thất bại!");
      setAlert({ type: "success", message: "Thêm công việc thành công!" });
      setAddScheduleOpen(false);
      setNewSchedule({
        name: "",
        description: "",
        status: true,
      });
      setRange(undefined);
      reloadSchedules();
    } catch {
      setAlert({ type: "error", message: "Thêm công việc thất bại!" });
    } finally {
      setAddLoading(false);
    }
  };

  return {
    addScheduleOpen,
    setAddScheduleOpen,
    addLoading,
    alert,
    setAlert,
    newSchedule,
    range,
    handleChange,
    handleRangeChange,
    handleSave,
  };
}
