import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AccountTabFormProps {
  form: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      phone: string;
      avatar: string;
    }>
  >;
}

export default function AccountTabForm({ form, setForm }: AccountTabFormProps) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Tự động ẩn thông báo sau 1 giây
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        if (userObj?.user) {
          setForm((f) => ({
            ...f,
            name: userObj.user.name || "",
            email: userObj.user.email || "",
            phone: userObj.user.phone || "",
            avatar: userObj.user.avatar || "",
          }));
        }
      } catch {
        // Nếu lỗi thì giữ nguyên form
      }
    }
  }, [setForm]);

  const handleChangePassword = async () => {
    setLoading(true);
    setAlert(null);
    try {
      const userStr = localStorage.getItem("user");
      console.log("Raw userStr:", userStr); // Thêm dòng này
      if (!userStr) throw new Error("Không tìm thấy thông tin người dùng.");
      const userObj = JSON.parse(userStr);
      console.log("Parsed userObj:", userObj); // Thêm dòng này
      const accessToken = userObj?.accessToken;
      if (!accessToken) throw new Error("Thiếu thông tin xác thực.");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL?.replace(
          /\/$/,
          ""
        )}/users/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            email: form.email,
            password,
            newPassword,
            confirmNewPassword,
          }),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Đổi mật khẩu thất bại!");
      }
      setAlert({ type: "success", message: "Đổi mật khẩu thành công!" });
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      // Nếu muốn cập nhật lại email trong localStorage:
      const updatedUser = {
        ...userObj,
        user: { ...userObj.user, email: form.email },
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
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
        <Label htmlFor="email" className="mb-2 block">
          Email
        </Label>
        <Input
          id="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="Nhập email"
          type="email"
          disabled
        />
        <p className="text-xs text-muted-foreground mt-1">
          Email dùng để đăng nhập và nhận thông báo.
        </p>
      </div>
      <div>
        <Label htmlFor="password" className="mb-2 block">
          Mật khẩu hiện tại
        </Label>
        <Input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu hiện tại"
          type="password"
        />
      </div>
      <div>
        <Label htmlFor="newPassword" className="mb-2 block">
          Mật khẩu mới
        </Label>
        <Input
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nhập mật khẩu mới"
          type="password"
        />
      </div>
      <div>
        <Label htmlFor="confirmNewPassword" className="mb-2 block">
          Xác nhận mật khẩu mới
        </Label>
        <Input
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Xác nhận mật khẩu mới"
          type="password"
        />
      </div>
      <Button
        className="mt-4 w-full sm:w-fit px-8"
        onClick={handleChangePassword}
        disabled={loading}
      >
        {loading ? "Đang lưu..." : "Lưu thay đổi"}
      </Button>
    </div>
  );
}
