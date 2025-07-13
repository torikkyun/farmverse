"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Warehouse, KeyRound } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("TENANT");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${apiURL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          phone,
          role,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Đăng ký thất bại");
        setTimeout(() => setError(null), 2000);
        return;
      }
      setSuccess("Đăng ký thành công!");
      setTimeout(() => setSuccess(null), 2000);
      // window.location.href = "/login";
    } catch {
      setError("Đăng ký thất bại");
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng ký tài khoản</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            id="name"
            type="text"
            placeholder="Nhập họ tên của bạn"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            type="text"
            placeholder="Nhập số điện thoại của bạn"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
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
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label>Bạn là?</Label>
          <RadioGroup
            value={role}
            onValueChange={(value) =>
              setRole(value === "option-farmer" ? "FARMER" : "TENANT")
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="TENANT" id="option-user" />
              <Label htmlFor="option-user">
                <div className="text-[#000000] flex size-6 items-center justify-center rounded-md">
                  <User className="size-4" />
                </div>
                Người dùng
              </Label>
              <RadioGroupItem value="FARMER" id="option-farmer" />
              <Label htmlFor="option-farmer">
                <div className="text-[#000000] flex size-6 items-center justify-center rounded-md">
                  <Warehouse className="size-4" />
                </div>
                Nông dân
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Button
          type="submit"
          className="w-full text-sm px-4 py-6 cursor-pointer"
        >
          Đăng ký <KeyRound />
        </Button>
      </div>
      <div className="text-center text-sm">
        Bạn đã có tài khoản?{" "}
        <a
          href="login"
          className="underline underline-offset-4 cursor-pointer font-medium"
        >
          Đăng nhập ngay
        </a>
      </div>
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
    </form>
  );
}
