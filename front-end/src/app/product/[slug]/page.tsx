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
      type: "Cây trồng" as const, // Đúng kiểu cho SelectedBar
    })
  );

  // Lấy phân bón/dụng cụ từ ITEMS
  const dungs = ITEMS.filter((item) => item.farm === farmId).map((item) => ({
    id: Number(item.id),
    name: item.name,
    price: item.price,
    image: item.images[0],
    quantity: item.quantity,
    type: "Phân bón" as const, // Đúng kiểu cho SelectedBar
  }));

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

  // Tạo 2 hàm riêng biệt thay vì 1 hàm với type
  const handleSelectPlant = (id: number) => {
    console.log("handleSelectPlant called with id:", id);
    console.log("current selectedPlants:", selectedPlants);
    setSelectedPlants((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      console.log("new selectedPlants:", newSelection);
      return newSelection;
    });
  };

  const handleSelectDung = (id: number) => {
    console.log("handleSelectDung called with id:", id);
    console.log("current selectedDungs:", selectedDungs);
    setSelectedDungs((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      console.log("new selectedDungs:", newSelection);
      return newSelection;
    });
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
            selectedItems={activeTab === 0 ? selectedPlants : selectedDungs}
            handleSelect={
              activeTab === 0 ? handleSelectPlant : handleSelectDung
            } // Truyền đúng hàm
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
