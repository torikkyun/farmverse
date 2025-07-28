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
import { NFTItem, DungItem } from "./types"; // Import cả 2 types

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const farmId = slug as string;

  // Lấy dữ liệu farm từ API
  const { loading, error } = useFarmDetail(API_URL, farmId);

  // Lấy cây trồng và phân bón từ API
  const { items, dungs } = useFarmItems(API_URL, farmId);

  console.log("Items: ", items);
  console.log("Dungs: ", dungs);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Thay đổi từ number[] sang string[]
  const [showCheckout, setShowCheckout] = useState(false);

  React.useEffect(() => {
    setSelectedItems([]);
  }, [farmId]);

  // Thêm useEffect này để clear selectedItems khi chuyển tab
  React.useEffect(() => {
    setSelectedItems([]);
  }, [activeTab]);

  const handleSelect = (id: string) => {
    // Kiểm tra ID hợp lệ
    if (!id || id === null || id === undefined) {
      return;
    }

    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        const newSelection = prev.filter((itemId) => itemId !== id);
        return newSelection;
      } else {
        const newSelection = [...prev, id];
        return newSelection;
      }
    });
  };

  // Sửa tabItems để có thể là cả NFTItem hoặc DungItem
  const tabItems: (NFTItem | DungItem)[] = activeTab === 1 ? dungs : items; // Thêm type annotation

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
            // currentUserId={userId}
          />
          <FarmTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            items={items}
            dungs={dungs}
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            farmId={farmId}
          />
          {selectedItems.length > 0 && (
            <SelectedBar
              items={tabItems}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              activeTab={activeTab}
              onCheckout={() => setShowCheckout(true)}
            />
          )}
          {showCheckout && (
            <ModalCheckout
              items={tabItems.filter((item) => selectedItems.includes(item.id))}
              onClose={() => setShowCheckout(false)}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
