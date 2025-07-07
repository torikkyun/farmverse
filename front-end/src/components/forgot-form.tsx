import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

export function ForgotForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex items-center text-center">
            <ArrowLeftCircleIcon className="h-6 w-6 mr-3 cursor-pointer leading-none" />
            <CardTitle>Quên mật khẩu</CardTitle>
          </div>
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
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full text-sm px-4 py-6">
                  Gửi yêu cầu
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
