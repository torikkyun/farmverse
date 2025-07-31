import { useState, useCallback } from "react";

export interface Schedule {
  month: number;
  activities: string[];
}

export function useFarmSchedule(farmId?: string) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reloadSchedules = useCallback(() => {
    if (!farmId) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/farms/${farmId}`)
      .then((res) => res.json())
      .then((data) => {
        const schArr = Array.isArray(data?.data?.schedule)
          ? data.data.schedule
          : [];
        setSchedules(schArr);
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
