"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user)?.accessToken : null;

    // Chỉ check token cho các trang cần authentication
    const requiresAuth = [
      "/market",
      "/farm",
      "/tree",
      "/warehouse",
      "/settings",
      "/profile",
      "/dashboard",
    ].some((p) => pathname?.startsWith(p));

    if (!token && requiresAuth) {
      setShowModal(true);
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = "/login";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setShowModal(false);
    }
  }, [pathname]);

  if (!mounted) return null;

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
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 16,
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              textAlign: "center",
              minWidth: 400,
              maxWidth: "90vw",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                background: "#000",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <AlertTriangle size={32} color="#fff" strokeWidth={2} />
            </div>
            <h2
              style={{
                color: "#111",
                fontWeight: 700,
                fontSize: 24,
                marginBottom: 12,
              }}
            >
              Phiên đăng nhập đã hết hạn
            </h2>
            <p
              style={{
                color: "#333",
                fontSize: 16,
                marginBottom: 20,
                lineHeight: 1.5,
              }}
            >
              Để bảo mật tài khoản, bạn cần đăng nhập lại để tiếp tục sử dụng
              các tính năng của <strong>Farmverse</strong>.
            </p>
            <div
              style={{
                background: "#f3f3f3",
                padding: "12px 16px",
                borderRadius: 8,
                marginBottom: 24,
                border: "1px solid #222",
                color: "#222",
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              Tự động chuyển hướng sau{" "}
              <span style={{ fontWeight: 700, fontSize: 16, color: "#000" }}>
                {countdown}
              </span>{" "}
              giây
            </div>
            <button
              onClick={() => (window.location.href = "/login")}
              style={{
                background: "#000",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#222")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#000")}
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
