"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FarmList, Farm } from "./FarmList";
import { ItemList, Item } from "./ItemList";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/["']/g, "") || "";

export default function MarketPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

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

  // Lấy danh sách vị trí duy nhất từ farms
  const locations = Array.from(
    new Set(farms.map((farm) => farm.location).filter(Boolean))
  );

  // Lọc dữ liệu theo search và location
  const filteredFarms = farms.filter(
    (farm) =>
      (!search || farm.name.toLowerCase().includes(search.toLowerCase())) &&
      (location === "all" || farm.location === location)
  );
  const filteredItems = items.filter((item) =>
    !search || item.name.toLowerCase().includes(search.toLowerCase())
  );

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
          {/* Thanh tìm kiếm và lọc tone trắng đen */}
          <Card className="flex flex-col md:flex-row items-center justify-between gap-4 my-6 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900">
            <div className="relative w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Tìm kiếm nông trại hoặc vật phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
            </div>
            <div className="w-full md:w-1/3">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition">
                  <SelectValue placeholder="Tất cả vị trí" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-neutral-900 text-black dark:text-white">
                  <SelectItem value="all">Tất cả vị trí</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
          <FarmList farms={filteredFarms} />
          <ItemList items={filteredItems} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
