import { useEffect, useState } from "react";
import { Farm } from "./types";

export function useFarmDetail(API_URL: string, farmId: string) {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!farmId) return;
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/farms/${farmId}`)
      .then((res) => res.json())
      .then((json) =>
        json?.data
          ? setFarm(json.data)
          : setError("Không tìm thấy dữ liệu nông trại.")
      )
      .catch(() => setError("Lỗi khi lấy dữ liệu nông trại."))
      .finally(() => setLoading(false));
  }, [API_URL, farmId]);

  return { farm, loading, error, setFarm };
}
