export function getToken(): string | null {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken"); // ✅ Đổi thành "accessToken"
    console.log("getToken - token value:", token);
    return token;
  }
  return null;
}
