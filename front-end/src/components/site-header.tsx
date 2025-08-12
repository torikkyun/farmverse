"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import ConnectWalletButton from "./connect-wallet-button";
import WalletInfo from "./wallet-info";
import DepositFvtModal from "./deposit-fvt-modal";

const routeTitles: { [key: string]: string } = {
  "/dashboard": "Quản lý trang trại",
  "/farm": "Quản lý nông trại",
  "/market": "Chợ nông sản",
  "/tree": "Cây trồng",
  "/warehouse": "Kho",
  "/settings": "Cài đặt",
  "/order": "Quản lý đơn hàng",
};

export function SiteHeader() {
  const pathname = usePathname();
  const safePathname = pathname ?? ""; // fallback nếu null
  const title =
    routeTitles[
      Object.keys(routeTitles).find((path) => safePathname.startsWith(path)) ||
        ""
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
          <WalletInfo />
          <DepositFvtModal />
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
