"use client";

import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendHorizontal } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function ForgotForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      try {
        const res = await fetch(`${apiURL}/auth/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Gửi yêu cầu thất bại");
          timeoutRef.current = setTimeout(() => setError(null), 3000);
          return;
        }
        setSuccess(data.message || "Yêu cầu đã được gửi thành công!");
        timeoutRef.current = setTimeout(() => setSuccess(null), 3000);
      } catch {
        setError("Gửi yêu cầu thất bại, vui lòng thử lại");
        timeoutRef.current = setTimeout(() => setError(null), 3000);
      } finally {
        setIsLoading(false);
      }
    },
    [email, isLoading]
  );

  return (
    <>
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
          <h1 className="text-3xl font-bold">Quên mật khẩu tài khoản</h1>
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
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              className="text-base"
            />
          </div>
          <Button
            type="submit"
            className="w-full text-base px-4 py-6 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}{" "}
            {!isLoading && <SendHorizontal />}
          </Button>
        </div>
        <div className="text-center text-base">
          <a
            href="login"
            className="underline underline-offset-4 cursor-pointer font-medium"
          >
            Quay lại trang đăng nhập
          </a>
        </div>
      </form>
    </>
  );
}
