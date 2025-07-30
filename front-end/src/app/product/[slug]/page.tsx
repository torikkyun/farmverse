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
  const { loading, error, farm } = useFarmDetail(API_URL, farmId);

  // Lấy cây trồng và phân bón từ API
  const { items, dungs } = useFarmItems(API_URL, farmId);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedItems, setSelectedItems] = useState<
    { id: string; quantity: number }[]
  >([]);
  const [showCheckout, setShowCheckout] = useState(false);

  React.useEffect(() => {
    setSelectedItems([]);
  }, [farmId]);

  // Thêm useEffect này để clear selectedItems khi chuyển tab
  React.useEffect(() => {
    setSelectedItems([]);
  }, [activeTab]);

  const handleSelect = (id: string) => {
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        // Nếu đã có thì bỏ chọn
        return prev.filter((item) => item.id !== id);
      } else {
        // Nếu chưa có thì thêm mới với quantity mặc định là 1
        return [...prev, { id, quantity: 1 }];
      }
    });
  };

  // Sửa tabItems để có thể là cả NFTItem hoặc DungItem
  const tabItems: (NFTItem | DungItem)[] = activeTab === 1 ? dungs : items; // Thêm type annotation

  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

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
          {selectedItems.length > 0 && farm && (
            <SelectedBar
              items={tabItems}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              activeTab={activeTab}
              onCheckout={() => setShowCheckout(true)}
              farm={farm}
            />
          )}
          {showCheckout && farm && (
            <ModalCheckout
              items={tabItems.filter((item) =>
                selectedItems.some((s) => s.id === item.id)
              )}
              totalQuantity={totalQuantity}
              onClose={() => setShowCheckout(false)}
              farm={farm}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
