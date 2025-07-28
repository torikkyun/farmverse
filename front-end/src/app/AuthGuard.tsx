"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getValidAccessToken } from "../utils/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null; // Chỉ render trên client

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
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "40px 32px",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              textAlign: "center",
              minWidth: 320,
              maxWidth: "90vw",
            }}
          >
            <svg
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              style={{ marginBottom: 12 }}
            >
              <circle cx="12" cy="12" r="12" fill="#FDE68A" />
              <path
                d="M12 8v4m0 4h.01"
                stroke="#B45309"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2
              style={{
                color: "#B45309",
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 8,
              }}
            >
              Bạn cần đăng nhập để tiếp tục
            </h2>
            <p
              style={{
                color: "#444",
                fontSize: 16,
                marginBottom: 0,
              }}
            >
              Vui lòng đăng nhập để sử dụng các tính năng của Farmverse.
              <br />
              Đang chuyển hướng đến trang đăng nhập...
            </p>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
