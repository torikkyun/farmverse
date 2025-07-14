import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountTabFormProps {
  form: {
    email: string;
  };
  setForm: (f: (prev: any) => any) => void;
}

export default function AccountTabForm({ form, setForm }: AccountTabFormProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label htmlFor="email" className="mb-2 block">
          Email
        </Label>
        <Input
          id="email"
          value={form.email}
          onChange={(e) =>
            setForm((f: any) => ({ ...f, email: e.target.value }))
          }
          placeholder="Nhập email"
          type="email"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Email dùng để đăng nhập và nhận thông báo.
        </p>
      </div>
      <div>
        <Label htmlFor="email" className="mb-2 block">
          Email
        </Label>
        <Input
          id="email"
          value={form.email}
          onChange={(e) =>
            setForm((f: any) => ({ ...f, email: e.target.value }))
          }
          placeholder="Nhập email"
          type="email"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Email dùng để đăng nhập và nhận thông báo.
        </p>
      </div>
      <div>
        <Label htmlFor="email" className="mb-2 block">
          Email
        </Label>
        <Input
          id="email"
          value={form.email}
          onChange={(e) =>
            setForm((f: any) => ({ ...f, email: e.target.value }))
          }
          placeholder="Nhập email"
          type="email"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Email dùng để đăng nhập và nhận thông báo.
        </p>
      </div>
      <Button className="mt-4 w-full sm:w-fit px-8">Lưu thay đổi</Button>
    </div>
  );
}
