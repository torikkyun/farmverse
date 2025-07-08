import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Warehouse, KeyRound } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng ký tài khoản</h1>
        {/* <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p> */}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="text">Họ và tên</Label>
          <Input
            id="name"
            type="text"
            placeholder="Nhập họ tên của bạn"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            type="number"
            placeholder="Nhập số điện thoại của bạn"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Nhập gmail của bạn"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Bạn là?</Label>
          <RadioGroup defaultValue="option-user">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-user" id="option-user" />
              <Label htmlFor="option-user">
                <div className="text-[#000000] flex size-6 items-center justify-center rounded-md">
                  <User className="size-4" />
                </div>
                Người dùng
              </Label>
              <RadioGroupItem value="option-farmer" id="option-farmer" />
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
    </form>
  );
}
