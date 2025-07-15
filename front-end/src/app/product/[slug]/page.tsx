"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectedBar from "../components/selected-bar";
import HeaderFarmInfo from "./HeaderFarmInfo";
import FarmTabs from "./FarmTabs";

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
  const [farm, setFarm] = useState<Farm | null>(null);
  const [items, setItems] = useState<NFTItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [action, setAction] = useState<"buy" | "sell">("buy");

  // Lấy thông tin farm
  useEffect(() => {
    if (!farmId) return;
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/farms/${farmId}`)
      .then((res) => res.json())
      .then((json) =>
        json?.data
          ? setFarm(json.data)
          : setError("Không tìm thấy dữ liệu nông trại.")
      )
      .catch(() => setError("Lỗi khi lấy dữ liệu nông trại."))
      .finally(() => setLoading(false));
  }, [farmId]);

  // Lấy danh sách cây trồng
  useEffect(() => {
    if (!farmId) return;
    fetch(`${API_URL}/items/farm/${farmId}?type=TREEROOT`)
      .then((res) => res.json())
      .then((json) => setItems(json?.data?.items || []))
      .catch(() => setItems([]));
  }, [farmId]);

  const handleSelect = (id: number) =>
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-white min-h-screen">
          <HeaderFarmInfo farm={farm} loading={loading} error={error} />
          <FarmTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            items={items}
            dungs={[]}
            selectedItems={selectedItems}
            handleSelect={handleSelect}
          />
          {selectedItems.length > 0 && (
            <SelectedBar
              items={activeTab === 1 ? [] : items}
              selectedItems={selectedItems}
              action={action}
              setAction={setAction}
              setSelectedItems={setSelectedItems}
              activeTab={activeTab}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
