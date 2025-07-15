"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FarmList, Farm } from "./FarmList";
import { ItemList, Item } from "./ItemList";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/["']/g, "") || "";

export default function MarketPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data?.data?.items || []))
      .catch(() => setItems([]));

    fetch(`${API_URL}/farms`)
      .then((res) => res.json())
      .then((data) => setFarms(data?.data?.items || []))
      .catch(() => setFarms([]));
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="w-full flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors px-4 md:px-8 max-w-6xl mx-auto">
          <FarmList farms={farms} />
          <ItemList items={items} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
