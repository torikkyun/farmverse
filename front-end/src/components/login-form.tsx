"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useState } from "react";
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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${apiURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Đăng nhập thất bại");
        setTimeout(() => setError(null), 1000); // Ẩn alert lỗi sau 2s
        return;
      }
      setSuccess(data.message || "Đăng nhập thành công!");
      // Lưu token hoặc thông tin vào localStorage
      if (data.token) {
        localStorage.setItem("accessToken", data.token);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
      }
      setTimeout(() => {
        setSuccess(null); // Ẩn alert thành công sau 2s
        router.push("/dashboard");
      }, 2000);
    } catch {
      setError("Đăng nhập thất bại");
      setTimeout(() => setError(null), 1000); // Ẩn alert lỗi sau 1s
    }
  };

  return (
    <>
      {/* Alert fixed ở giữa trên màn hình */}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-sm px-4 py-6 cursor-pointer"
          >
            Đăng nhập <LogIn />
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
