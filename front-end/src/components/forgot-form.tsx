import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendHorizontal } from "lucide-react";

export function ForgotForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Quên mật khẩu tài khoản</h1>
        {/* <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p> */}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Nhập gmail của bạn"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full text-sm px-4 py-6 cursor-pointer"
        >
          Gửi yêu cầu <SendHorizontal />
        </Button>
      </div>
      <div className="text-center text-sm">
        <a
          href="login"
          className="underline underline-offset-4 cursor-pointer font-medium"
        >
          Quay lại trang đăng nhập
        </a>
      </div>
    </form>
  );
}
