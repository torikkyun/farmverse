export function saveAuth(data: Record<string, unknown>) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function getAuth() {
  return JSON.parse(localStorage.getItem("user") || "{}");
}

export function getToken() {
  const auth = getAuth();
  return auth.accessToken || "";
}
