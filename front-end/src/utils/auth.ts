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
  localStorage.setItem(
    "user",
    JSON.stringify({
      ...data,
      accessTokenExpireTime: expireTime,
    })
  );
}

export function getAuth() {
  return JSON.parse(localStorage.getItem("user") || "{}");
}

export function getToken() {
  const auth = getAuth();
  return auth.accessToken || "";
}

export function isAccessTokenExpired() {
  const auth = getAuth();
  return !auth.accessTokenExpireTime || Date.now() > auth.accessTokenExpireTime;
}

export async function getValidAccessToken() {
  // Không tự động refresh, chỉ trả về token nếu còn hạn
  if (isAccessTokenExpired()) {
    return "";
  }
  return getToken();
}
