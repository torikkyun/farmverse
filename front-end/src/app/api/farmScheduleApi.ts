export async function getFarmSchedules(farmId: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")?.data?.accessToken || ""
      : "";
  const res = await fetch(`${API_URL}/schedules?farmId=${farmId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });
  return res.json();
}