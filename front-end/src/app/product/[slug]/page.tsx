"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import SelectedBar from "../components/selected-bar";
import HeaderFarmInfo from "./HeaderFarmInfo";
import FarmTabs from "./FarmTabs";
import CreateItemModal from "./CreateItemModal";
import { useFarmDetail } from "./useFarmDetail";
import { useFarmItems } from "./useFarmItems";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/['"]/g, "") || "";

export interface NFTItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface FarmOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

export interface Farm {
  id: string;
  name: string;
  description: string;
  location: string;
  size: number;
  images: string[];
  owner: FarmOwner;
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const farmId = slug as string;

  const { farm, loading, error } = useFarmDetail(API_URL, farmId);
  const { items, setItems, dungs, setDungs } = useFarmItems(API_URL, farmId);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [action, setAction] = useState<"buy" | "sell">("buy");
  const [showModal, setShowModal] = useState(false);

  // Reset selectedItems khi đổi farmId
  React.useEffect(() => {
    setSelectedItems([]);
    setAction("buy");
    setShowModal(false);
  }, [farmId]);

  // Thêm useEffect này để reload vật phẩm khi đổi farmId
  React.useEffect(() => {
    reloadItems();
  }, [farmId]);

  // Lấy user từ localStorage
  let userId: string | undefined = undefined;
  if (typeof window !== "undefined") {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userObj = JSON.parse(userStr);
        // Tùy vào cấu trúc trả về, có thể là userObj.data.user.id hoặc userObj.data.id
        userId =
          userObj?.data?.user?.id ||
          userObj?.data?.id ||
          userObj?.user?.id ||
          userObj?.id;
      }
    } catch (e) {
      userId = undefined;
    }
  }

  const handleSelect = (id: number) =>
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );

  const reloadItems = () => {
    fetch(`${API_URL}/items/farm/${farmId}?type=TREEROOT&page=1&pageSize=10`)
      .then((res) => res.json())
      .then((json) => {
        setItems(
          (json?.data?.items || []).map((item: any) => ({
            id: item.id || item._id,
            name: item.name,
            price: String(item.price),
            image: Array.isArray(item.images) ? item.images[0] : "",
          }))
        );
      });
    fetch(`${API_URL}/items/farm/${farmId}?type=FERTILIZER&page=1&pageSize=10`)
      .then((res) => res.json())
      .then((json) => {
        setDungs(
          (json?.data?.items || []).map((item: any) => ({
            id: item.id || item._id,
            name: item.name,
            price: String(item.price),
            image: Array.isArray(item.images) ? item.images[0] : "",
          }))
        );
      });
  };

  // Render đúng vật phẩm theo tab
  const tabItems = activeTab === 1 ? dungs : items;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-white min-h-screen">
          <HeaderFarmInfo
            farm={farm}
            loading={loading}
            error={error}
            onCreateItem={() => setShowModal(true)}
            currentUserId={userId}
          />
          <FarmTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            items={items}
            dungs={dungs}
            selectedItems={selectedItems}
            handleSelect={handleSelect}
          />
          {selectedItems.length > 0 && (
            <SelectedBar
              items={tabItems}
              selectedItems={selectedItems}
              action={action}
              setAction={setAction}
              setSelectedItems={setSelectedItems}
              activeTab={activeTab}
            />
          )}
          <CreateItemModal
            open={showModal}
            onClose={() => setShowModal(false)}
            farmId={farmId}
            onCreated={reloadItems}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
