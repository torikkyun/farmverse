"use client";
import { Tractor } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

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
    // Chuyển hướng sang dashboard
    router.replace("/dashboard");

    return data;
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Tractor className="size-4" />
            </div>
            Farmverse
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="https://picsum.photos/600/800"
          alt="Random Image"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
