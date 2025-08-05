"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";

interface ProfileTabFormProps {
  form: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  user: {
    role: string;
  } | null;
  setForm: (
    f: (prev: {
      name: string;
      email: string;
      phone: string;
      avatar: string;
    }) => {
      name: string;
      email: string;
      phone: string;
      avatar: string;
    }
  ) => void;
}

export default function ProfileTabForm({
  form,
  user,
  setForm,
}: ProfileTabFormProps) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Thêm đoạn này để tự động lấy user từ localStorage khi vào trang
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        const info = userObj?.user;
        if (info) {
          setForm((prev) => ({
            ...prev,
            name: info.name || "",
            email: info.email || "",
            phone: info.phone || "",
            avatar: info.avatar || "",
          }));
        }
      } catch {}
    }
  }, [setForm]);

  // Tự động ẩn thông báo sau 1 giây
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSave = async () => {
    setLoading(true);
    setAlert(null);
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) throw new Error("Không tìm thấy thông tin người dùng.");
      const userObj = JSON.parse(userStr);
      const accessToken = userObj?.accessToken;
      if (!accessToken) throw new Error("Thiếu thông tin xác thực.");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/users`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            avatar: form.avatar,
          }),
        }
      );
      if (!res.ok) throw new Error("Lưu thay đổi thất bại!");
      setAlert({ type: "success", message: "Lưu thay đổi thành công!" });
    } catch (e) {
      const error = e as Error;
      setAlert({ type: "error", message: error.message || "Có lỗi xảy ra!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {alert && (
        <Alert
          variant={alert.type === "success" ? "default" : "destructive"}
          className="mb-4"
          style={{
            position: "fixed",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <AlertTitle>
            {alert.type === "success" ? "Thành công" : "Lỗi"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <div>
        <Label htmlFor="name" className="mb-2 block">
          Tên
        </Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              name: e.target.value,
            }))
          }
          placeholder="Nhập tên của bạn"
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Đây là tên hiển thị công khai của bạn.
        </p>
      </div>
      <div>
        <Label htmlFor="email" className="mb-2 block">
          Email
        </Label>
        <Input
          id="email"
          value={form.email}
          readOnly
          placeholder="Nhập email của bạn"
          type="email"
          disabled
        />
      </div>
      <div>
        <Label htmlFor="role" className="mb-2 block">
          Vai trò
        </Label>
        <Input
          id="role"
          value={user?.role || ""}
          readOnly
          placeholder="Vai trò"
          disabled
        />
      </div>
       <div>
        <Label htmlFor="avatar" className="mb-2 block">
          Avatar
        </Label>
        <Input
          id="avatar"
          value={form.avatar}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              avatar: e.target.value,
            }))
          }
          placeholder="Link ảnh avatar"
          disabled={loading}
        />
      </div>
      <Button
        className="mt-4 w-full sm:w-fit px-8"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Đang lưu..." : "Lưu thay đổi"}
      </Button>
    </div>
  );
}
