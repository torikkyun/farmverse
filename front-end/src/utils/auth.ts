export function saveAuth(data: Record<string, unknown>) {
  let expireTime = Date.now() + 60 * 60 * 1000; // mặc định 1h
  if (data.accessTokenExpiresIn) {
    // Nếu trả về dạng "1h", "3600", hoặc số giây
    const match = String(data.accessTokenExpiresIn).match(/^(\d+)$/);
    if (match) {
      expireTime = Date.now() + Number(match[1]) * 1000;
    } else if (data.accessTokenExpiresIn === "1h") {
      expireTime = Date.now() + 60 * 60 * 1000;
    }
  }
  localStorage.setItem("user", JSON.stringify({
    ...data,
    accessTokenExpireTime: expireTime,
  }));
}

export function getAuth() {
  return JSON.parse(localStorage.getItem("user") || "{}");
}

export function getToken() {
  const auth = getAuth();
  return auth.accessToken || "";
}

export function getRefreshToken() {
  const auth = getAuth();
  return auth.refreshToken || "";
}

export function isAccessTokenExpired() {
  const auth = getAuth();
  return !auth.accessTokenExpireTime || Date.now() > auth.accessTokenExpireTime;
}

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) return "";
  const data = await res.json();
  if (data.success && data.data?.accessToken) {
    saveAuth({ ...getAuth(), ...data.data });
    return data.data.accessToken;
  }
  return "";
}

export async function getValidAccessToken() {
  if (isAccessTokenExpired()) {
    return await refreshAccessToken();
  }
  return getToken();
}
