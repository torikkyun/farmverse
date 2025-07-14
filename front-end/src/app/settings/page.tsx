"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import SettingsTabMenu from "./SettingsTabMenu";
import ProfileTabForm from "./ProfileTabForm";
import AccountTabForm from "./AccountTabForm";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [activeTab, setActiveTab] = useState<"profile" | "account">("profile");

  useEffect(() => {
    // Lấy user từ localStorage và parse ra object
    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    const userObj = JSON.parse(userStr);
    const userId = userObj?.id;
    if (!userId) return;

    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        const data = res.data?.user || res.user || res.data || res;
        setUser(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          avatar: data.avatar || "",
        });
      });
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
        <div className="flex flex-1 flex-col items-center py-8 px-2 bg-white min-h-screen">
          <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8 min-h-[500px]">
            <div className="w-full md:w-[260px] mb-6 md:mb-0 h-full flex">
              <SettingsTabMenu
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <div className="flex-1 flex flex-col h-full">
              <Card className="p-6 sm:p-10 rounded-2xl shadow-lg space-y-10 h-full flex flex-col justify-between">
                {activeTab === "profile" && (
                  <ProfileTabForm form={form} user={user} setForm={setForm} />
                )}
                {activeTab === "account" && (
                  <AccountTabForm form={form} setForm={setForm} />
                )}
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
