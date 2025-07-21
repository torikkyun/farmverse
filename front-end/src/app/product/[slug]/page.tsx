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
import { FARMS_MARKET } from "@/data/market";
import { TREE_ITEMS, ITEMS } from "@/data/product";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const farmId = slug as string;

  // Lấy dữ liệu farm từ FARMS_MARKET
  const farm = FARMS_MARKET.find((f) => f.id === farmId);

  // Lấy cây trồng từ TREE_ITEMS
  const items = TREE_ITEMS.filter((item) => item.farm === farmId).map(
    (item) => ({
      id: Number(item.id),
      name: item.name,
      price: item.price,
      image: item.images[0],
      quantity: item.quantity,
      type: "tree" as const, // Đúng kiểu cho SelectedBar
    })
  );

  // Lấy phân bón/dụng cụ từ ITEMS
  const dungs = ITEMS.filter((item) => item.farm === farmId).map((item) => ({
    id: Number(item.id),
    name: item.name,
    price: item.price,
    image: item.images[0],
    quantity: item.quantity,
    type: "fertilizer" as const, // Đúng kiểu cho SelectedBar
  }));

  const [activeTab, setActiveTab] = useState(0);
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
  const [selectedDungs, setSelectedDungs] = useState<string[]>([]);
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

  const handleSelect = (id: number, type: "plant" | "dung") => {
    const idStr = String(id);
    if (type === "plant") {
      setSelectedPlants((prev) =>
        prev.includes(idStr)
          ? prev.filter((itemId) => itemId !== idStr)
          : [...prev, idStr]
      );
    } else {
      setSelectedDungs((prev) =>
        prev.includes(idStr)
          ? prev.filter((itemId) => itemId !== idStr)
          : [...prev, idStr]
      );
    }
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
            loading={false}
            error={farm ? null : "Không tìm thấy nông trại"}
            currentUserId={userId}
          />
          <FarmTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            items={items}
            dungs={dungs}
            selectedItems={
              activeTab === 0
                ? selectedPlants.map(Number)
                : selectedDungs.map(Number)
            }
            handleSelect={handleSelect}
            farmId={farmId}
          />
          {(activeTab === 0 ? selectedPlants.length : selectedDungs.length) >
            0 && (
            <SelectedBar
              items={tabItems}
              selectedItems={
                activeTab === 0
                  ? selectedPlants.map(Number)
                  : selectedDungs.map(Number)
              }
              setSelectedItems={
                activeTab === 0
                  ? (ids: number[]) => setSelectedPlants(ids.map(String))
                  : (ids: number[]) => setSelectedDungs(ids.map(String))
              }
              activeTab={activeTab}
              onCheckout={() => setShowCheckout(true)}
            />
          )}
          {showCheckout && (
            <ModalCheckout
              items={tabItems.filter((item) =>
                (activeTab === 0 ? selectedPlants : selectedDungs).includes(
                  String(item.id)
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
