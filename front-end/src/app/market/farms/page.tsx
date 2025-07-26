"use client";

import { useState } from "react";
import FarmList from "../FarmList";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card } from "@/components/ui/card"; // Shadcn UI Card
import { Farm } from "../types/market";

export default function AllFarmsPage() {
  const [farms] = useState<Farm[]>([]);

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
                  Tất cả nông trại
                </h1>
                <FarmList farms={farms} />
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
