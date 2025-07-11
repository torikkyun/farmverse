"use client";

import { MetamaskButton } from './MetamaskButton';
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
// Đã thay thế connectWallet bằng Web3Modal

const routeTitles: { [key: string]: string } = {
  "/dashboard": "Quản lý trang trại",
  "/farm": "Quản lý nông trại",
  "/market": "Chợ nông sản",
  "/tree": "Cây trồng",
  "/warehouse": "Kho",
  "/settings": "Cài đặt",
  // Thêm các route khác ở đây
};

export function SiteHeader() {
  const pathname = usePathname();
  const title =
    routeTitles[
      Object.keys(routeTitles).find((path) => pathname.startsWith(path)) || ""
    ] || " ";


  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <MetamaskButton />
        </div>
      </div>
      {/* Hiển thị thông báo kết nối ví thành công */}
    </header>
  );
}
