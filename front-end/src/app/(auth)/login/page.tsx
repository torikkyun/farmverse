"use client";
import { Tractor } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

import { LoginForm } from "@/components/login-form";
import { saveAuth } from "@/utils/auth";

export default function LoginPage() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fetch(`${apiURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Đăng nhập thất bại");
    const data = await res.json();

    // Lưu vào localStorage
    if (data.data) {
      saveAuth(data.data);
    }

    return data;
  };

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <div className="flex flex-col gap-4 p-6 md:p-10 flex-1">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Tractor className="size-4" />
            </div>
            Farmverse
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 py-10">
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
      {/* Nếu cần thêm cột thứ 2, thêm div ở đây */}
    </div>
  );
}
