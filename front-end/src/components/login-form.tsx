"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { saveAuth } from "../utils/auth";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function LoginForm({
  className,
  onLogin, // lấy ra riêng
  ...props
}: React.ComponentProps<"form"> & {
  onLogin?: (data: { email: string; password: string }) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearExistingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isLoading) return;

      setIsLoading(true);
      setError(null);
      clearExistingTimeout();

      try {
        // Nếu có onLogin prop thì gọi nó
        if (onLogin) {
          await onLogin({ email, password });
          router.push("/market");
          return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

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
          setIsLoading(false);
          return;
        }

        const data = await res.json();
        if (data.data) {
          saveAuth(data.data);
        }
        // Chuyển sang trang market ngay lập tức, không setSuccess, không delay
        router.push("/market");
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error &&
          "name" in error &&
          (error as { name: string }).name === "AbortError"
        ) {
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
    [email, password, isLoading, router, clearExistingTimeout, onLogin]
  );

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
      {error && (
        <div className="fixed left-1/2 top-8 z-50 -translate-x-1/2 w-full max-w-xs">
          <Alert variant="destructive">
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">Đăng nhập tài khoản</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-lg">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Nhập gmail của bạn"
              required
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              autoComplete="email"
              className="text-base"
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password" className="text-lg">
                Mật khẩu
              </Label>
              <a href="forgot" className="ml-auto text-base underline-offset-4">
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
              className="text-base"
            />
          </div>
          <Button
            type="submit"
            className="w-full text-base px-4 py-6 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}{" "}
            {!isLoading && <LogIn />}
          </Button>
        </div>
        <div className="text-center text-base">
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
