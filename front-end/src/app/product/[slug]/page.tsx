"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import React, { useState, useCallback } from "react";
import SelectedBar from "../components/selected-bar";
import HeaderFarmInfo from "./HeaderFarmInfo";
import FarmTabs from "./FarmTabs";
import { useFarmDetail } from "./useFarmDetail";
import { useFarmItems } from "./useFarmItems";
// import DungCard from "../components/dung-card";
import ModalCheckout from "../components/ModalCheckout";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/['"]/g, "") || "";

export interface NFTItem {
  id: number;
  name: string;
  price: number;
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

interface Item {
  id?: number;
  _id?: number;
  name: string;
  price: number | string;
  images: string[];
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const farmId = slug as string;

  const { farm, loading, error } = useFarmDetail(API_URL, farmId);
  const { items, setItems, dungs, setDungs } = useFarmItems(API_URL, farmId);

  // Đặt reloadItems lên trên trước khi dùng trong useEffect
  const reloadItems = useCallback(() => {
    fetch(`${API_URL}/items/farm/${farmId}?type=TREEROOT&page=1&pageSize=10`)
      .then((res) => res.json())
      .then((json) => {
        setItems(
          (json?.data?.items || []).map((item: Item) => ({
            id: item.id || item._id,
            name: item.name,
            price: Number(item.price),
            image: Array.isArray(item.images) ? item.images[0] : "",
          }))
        );
      });
    fetch(`${API_URL}/items/farm/${farmId}?type=FERTILIZER&page=1&pageSize=10`)
      .then((res) => res.json())
      .then((json) => {
        setDungs(
          (json?.data?.items || []).map((item: Item) => ({
            id: item.id || item._id,
            name: item.name,
            price: Number(item.price),
            image: Array.isArray(item.images) ? item.images[0] : "",
          }))
        );
      });
  }, [farmId, setItems, setDungs]); // <-- XÓA API_URL khỏi dependency

  const [activeTab, setActiveTab] = useState(0);
  const [selectedPlants, setSelectedPlants] = useState<number[]>([]);
  const [selectedDungs, setSelectedDungs] = useState<number[]>([]);
  const [action, setAction] = useState<"buy" | "sell">("buy");
  const [showCheckout, setShowCheckout] = useState(false);

  // Reset selectedItems khi đổi farmId
  React.useEffect(() => {
    setSelectedPlants([]);
    setSelectedDungs([]);
    setAction("buy");
  }, [farmId]);

  // Reload vật phẩm khi đổi farmId
  React.useEffect(() => {
    reloadItems();
  }, [farmId, reloadItems]);

  // Lấy user từ localStorage
  let userId: string | undefined = undefined;
  if (typeof window !== "undefined") {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userObj = JSON.parse(userStr);
        userId =
          userObj?.data?.user?.id ||
          userObj?.data?.id ||
          userObj?.user?.id ||
          userObj?.id;
      }
    } catch {
      userId = undefined;
    }
  }

  const handleSelect = (id: number, type: "plant" | "dung") => {
    if (type === "plant") {
      setSelectedPlants((prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedDungs((prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      );
    }
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
            currentUserId={userId}
          />
          <FarmTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            items={items}
            dungs={dungs}
            selectedItems={activeTab === 0 ? selectedPlants : selectedDungs}
            handleSelect={handleSelect}
            farmId={farmId}
          />
          {(activeTab === 0 ? selectedPlants.length : selectedDungs.length) > 0 && (
            <SelectedBar
              items={tabItems}
              selectedItems={activeTab === 0 ? selectedPlants : selectedDungs}
              action={action}
              setAction={setAction}
              setSelectedItems={
                activeTab === 0 ? setSelectedPlants : setSelectedDungs
              }
              activeTab={activeTab}
              onCheckout={() => setShowCheckout(true)}
            />
          )}
          {showCheckout && (
            <ModalCheckout
              items={tabItems.filter(item => (activeTab === 0 ? selectedPlants : selectedDungs).includes(item.id))}
              onClose={() => setShowCheckout(false)}
              action={action}
            />
          )}
          {/* {activeTab === 1 &&
            dungs.map((item) => (
              // <DungCard
              //   key={item.id}
              //   dungs={item}
              //   selected={selectedDungs.includes(item.id)}
              //   onSelect={(id) => handleSelect(Number(id), "dung")}
              // />
            ))} */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
