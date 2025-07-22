"use client";

import * as React from "react";

import {
  Tractor,
  ShoppingBasket,
  TreePine,
  Warehouse,
  CircleUser,
} from "lucide-react";

import Link from "next/link";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "farmverse",
    email: "admin@farmve.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Chợ",
      url: "/market",
      icon: ShoppingBasket,
    },
    // {
    //   title: "Nông trại",
    //   url: "/farm",
    //   icon: Tractor,
    // },
    {
      title: "Cây thuê",
      url: "/tree",
      icon: TreePine,
    },
    {
      title: "Kho vật phẩm",
      url: "/warehouse",
      icon: Warehouse,
    },
    {
      title: "Trang cá nhân",
      url: "/settings",
      icon: CircleUser,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-5"
            >
              <Link href="/dashboard">
                <Tractor className="!size-5" />
                <span className="text-base font-semibold">Farmverse</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
