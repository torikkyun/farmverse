"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form"> & {
  onLogin?: (data: { email: string; password: string }) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Sử dụng ref để clear timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout khi component unmount
  const clearExistingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Tối ưu handleSubmit với useCallback
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Prevent double submission
      if (isLoading) return;

      setIsLoading(true);
      setError(null);
      setSuccess(null);
      clearExistingTimeout();

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const res = await fetch(`${apiURL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const data = await res.json().catch(() => ({
            message: "Đăng nhập thất bại",
          }));
          setError(data.message || "Đăng nhập thất bại");

          timeoutRef.current = setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }

        const data = await res.json();
        setSuccess(data.message || "Đăng nhập thành công!");

        // Lưu token
        if (data.token) {
          localStorage.setItem("accessToken", data.token);
        } else {
          localStorage.setItem("user", JSON.stringify(data));
        }

        // Chuyển hướng ngay lập tức thay vì đợi 2s
        timeoutRef.current = setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } catch (error: any) {
        if (error.name === "AbortError") {
          setError("Yêu cầu quá thời gian, vui lòng thử lại");
        } else {
          setError("Đăng nhập thất bại, vui lòng kiểm tra kết nối");
        }

        timeoutRef.current = setTimeout(() => {
          setError(null);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, isLoading, router, clearExistingTimeout]
  );

  // Tối ưu onChange handlers
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  return (
    <>
      {/* Alert tối ưu */}
      {(error || success) && (
        <div className="fixed left-1/2 top-8 z-50 -translate-x-1/2 w-full max-w-xs">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertTitle>Thành công</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Đăng nhập tài khoản</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Nhập gmail của bạn"
              required
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Mật khẩu</Label>
              <a href="forgot" className="ml-auto text-sm underline-offset-4">
                Bạn quên mật khẩu?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              required
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
          <Button
            type="submit"
            className="w-full text-sm px-4 py-6 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}{" "}
            {!isLoading && <LogIn />}
          </Button>
        </div>
        <div className="text-center text-sm">
          Bạn không có tài khoản?{" "}
          <a
            href="signup"
            className="underline underline-offset-4 cursor-pointer font-medium"
          >
            Đăng ký ngay
          </a>
        </div>
      </form>
    </>
  );
}
