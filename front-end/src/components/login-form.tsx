import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-5">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <a
                    href="forgot"
                    className="ml-auto inline-block text-sm font-medium opacity-70 hover:opacity-100 transition-opacity duration-200"
                  >
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
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full text-sm px-4 py-6">
                  Đăng nhập
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Bạn không có tài khoản?{" "}
              <a
                href="signup"
                className="font-medium opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                Đăng ký
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
