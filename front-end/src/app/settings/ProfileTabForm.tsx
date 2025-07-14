import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface ProfileTabFormProps {
  form: {
    name: string;
    phone: string;
    avatar: string;
  };
  user: {
    role: string;
  } | null;
  setForm: (f: (prev: any) => any) => void;
}

export default function ProfileTabForm({
  form,
  user,
  setForm,
}: ProfileTabFormProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
        <Image
          src={form.avatar || "/avatar.png"}
          alt="Avatar"
          width={72}
          height={72}
          className="rounded-full border border-gray-200 dark:border-gray-700"
        />
        <div className="text-center sm:text-left">
          <div className="font-semibold text-lg">{form.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {user?.role}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Tên
          </Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, name: e.target.value }))
            }
            placeholder="Nhập tên của bạn"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Đây là tên hiển thị công khai của bạn.
          </p>
        </div>
        <div>
          <Label htmlFor="phone" className="mb-2 block">
            Số điện thoại
          </Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, phone: e.target.value }))
            }
            placeholder="Nhập số điện thoại"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Số điện thoại liên hệ của bạn.
          </p>
        </div>
        <div>
          <Label htmlFor="avatar" className="mb-2 block">
            Avatar
          </Label>
          <Input
            id="avatar"
            value={form.avatar}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, avatar: e.target.value }))
            }
            placeholder="Link ảnh avatar"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Dán link ảnh để thay đổi avatar.
          </p>
        </div>
      </div>
      <Button className="mt-4 w-full sm:w-fit px-8">Lưu thay đổi</Button>
    </>
  );
}
