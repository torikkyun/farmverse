"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getValidAccessToken } from "../utils/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function checkToken() {
      const token = await getValidAccessToken();
      // Kiểm tra nếu đang ở trong cụm trang auth thì không hiển thị modal
      const isAuthPage =
        pathname?.startsWith("/login") ||
        pathname?.startsWith("/signup") ||
        pathname?.startsWith("/forgot") ||
        pathname?.startsWith("/confirm");

      if (!token && !isAuthPage) {
        setShowModal(true);
        const timeout = setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return () => clearTimeout(timeout);
      } else {
        setShowModal(false);
      }
      setIsLoading(false);
    }
    checkToken();
  }, [pathname]);

  // Kiểm tra isAuthPage một lần duy nhất
  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/forgot") ||
    pathname?.startsWith("/confirm");

  if (isLoading) {
    return <div>Loading...</div>; // Hoặc loading spinner
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "32px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <h2>Bạn chưa đăng nhập</h2>
            <p>Đang chuyển hướng đến trang đăng nhập...</p>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
