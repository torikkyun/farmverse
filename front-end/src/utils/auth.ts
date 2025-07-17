export function getToken(): string | null {
  if (typeof window !== "undefined") {
    const token =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "{}")?.data?.accessToken ||
          ""
        : "";
    console.log("getToken - token value:", token);
    return token;
  }
  return null;
}
