"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import SelectedBar from "../components/selected-bar";
import HeaderFarmInfo from "./HeaderFarmInfo";
import FarmTabs from "./FarmTabs";
import ModalCheckout from "../components/ModalCheckout";
import { useFarmDetail } from "./useFarmDetail";
import { useFarmItems } from "./useFarmItems";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const farmId = slug as string;

  // Lấy dữ liệu farm từ API
  const { loading, error } = useFarmDetail(API_URL, farmId);

  // Lấy cây trồng và phân bón từ API
  const { items, dungs } = useFarmItems(API_URL, farmId);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedPlants, setSelectedPlants] = useState<number[]>([]);
  const [selectedDungs, setSelectedDungs] = useState<number[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  React.useEffect(() => {
    setSelectedPlants([]);
    setSelectedDungs([]);
  }, [farmId]);

  // Lấy userId từ localStorage nếu cần
  let userId: string | undefined = undefined;
  if (typeof window !== "undefined") {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userObj = JSON.parse(userStr);
        userId = userObj?.user?.id || userObj?.id;
      }
    } catch {
      userId = undefined;
    }
  }

  const handleSelectPlant = (id: number) => {
    setSelectedPlants((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectDung = (id: number) => {
    setSelectedDungs((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const tabItems = activeTab === 1 ? dungs : items;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-white min-h-screen">
          <HeaderFarmInfo
            farmId={farmId}
            loading={loading}
            error={error}
            currentUserId={userId}
          />
          <FarmTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            items={items}
            dungs={dungs}
            selectedItems={activeTab === 0 ? selectedPlants : selectedDungs}
            handleSelect={
              activeTab === 0 ? handleSelectPlant : handleSelectDung
            }
            farmId={farmId}
          />
          {(activeTab === 0 ? selectedPlants.length : selectedDungs.length) >
            0 && (
            <SelectedBar
              items={tabItems}
              selectedItems={activeTab === 0 ? selectedPlants : selectedDungs}
              setSelectedItems={
                activeTab === 0
                  ? (ids: number[]) => setSelectedPlants(ids)
                  : (ids: number[]) => setSelectedDungs(ids)
              }
              activeTab={activeTab}
              onCheckout={() => setShowCheckout(true)}
            />
          )}
          {showCheckout && (
            <ModalCheckout
              items={tabItems.filter((item) =>
                (activeTab === 0 ? selectedPlants : selectedDungs).includes(
                  item.id
                )
              )}
              onClose={() => setShowCheckout(false)}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
