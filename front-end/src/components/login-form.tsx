import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng nhập tài khoản</h1>
        {/* <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p> */}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Nhập gmail của bạn"
            required
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
  );
}
