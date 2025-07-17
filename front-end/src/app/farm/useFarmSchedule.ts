import { useState, useCallback } from "react";
import { getFarmSchedules } from "../api/farmScheduleApi";

export interface Schedule {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: boolean;
  farm: {
    id: string;
    name: string;
  };
}

export function useFarmSchedule(farmId?: string) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reloadSchedules = useCallback(() => {
    if (!farmId) return;
    setLoading(true);
    getFarmSchedules(String(farmId))
      .then((data) => {
        const schArr =
          Array.isArray(data?.data?.schedules) && data.data.schedules;
        setSchedules(schArr ?? []);
        setError(null);
      })
      .catch(() => setError("Không lấy được lịch chăm sóc!"))
      .finally(() => setLoading(false));
  }, [farmId]);

  return {
    schedules,
    loading,
    error,
    reloadSchedules,
    setSchedules,
    setError,
    setLoading,
  };
}
