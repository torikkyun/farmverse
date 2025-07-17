"use client";

import { useEffect, useState } from "react";
import { ItemList, Item } from "../ItemList";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card } from "@/components/ui/card"; // Shadcn UI Card

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/["']/g, "") || "";

export default function AllItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data?.data?.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="w-full flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          <div className="flex-1 px-4 md:px-8 py-8">
            <div className="max-w-6xl mx-auto">
              <Card className="bg-white dark:bg-black shadow-none border-none p-6">
                <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
                  Tất cả vật phẩm
                </h1>
                <ItemList items={items} />
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
