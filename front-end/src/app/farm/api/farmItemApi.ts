export interface FarmItemPayload {
  name: string;
  type: "FERTILIZER" | "TREEROOT";
  description?: string;
  images: string[];
  price: number;
  quantity: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getAccessToken() {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        return userObj.data?.accessToken || "";
      } catch {
        return "";
      }
    }
  }
  return "";
}

export async function createFarmItem(data: FarmItemPayload) {
  const token = getAccessToken();
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateFarmItem(itemId: string, data: FarmItemPayload) {
  const token = getAccessToken();
  const res = await fetch(`${API_URL}/items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
