"use client";

import { useEffect, useState } from "react";
import { ItemList } from "../ItemList";
import { Item } from "../types/market"; // Import từ file types
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card } from "@/components/ui/card";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/["']/g, "") || "";

export default function AllItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/items`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không thể tải dữ liệu");
        }
        return res.json();
      })
      .then((data) => {
        setItems(data?.data?.items || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setError(err.message || "Có lỗi xảy ra");
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="w-full flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          <div className="flex-1 px-4 md:px-8 py-8">
            <div className="max-w-6xl mx-auto">
              <Card className="bg-white dark:bg-black shadow-none border-2 border-black p-6">
                <h1 className="text-3xl font-bold mb-6 text-black dark:text-white uppercase tracking-wide">
                  TẤT CẢ VẬT PHẨM
                </h1>

                {loading ? (
                  <div className="text-center py-8 text-gray-600">
                    <div className="animate-pulse">Đang tải vật phẩm...</div>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-600">
                    <div className="font-bold mb-2">Lỗi!</div>
                    <div>{error}</div>
                  </div>
                ) : (
                  <ItemList items={items} />
                )}
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
