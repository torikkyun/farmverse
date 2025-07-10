"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { useState } from "react";
import TabMenu from "../components/tab-menu";
import NFTGrid from "../components/nft-grid";
import SelectedBar from "../components/selected-bar";

// Dummy data cho NFT items
const items = [
  {
    id: 9917,
    name: "goblintown #9917",
    price: "0.185 ETH",
    image: "/nft/9917.png",
    endsIn: "05:09",
    rank: "#5,295",
  },
  {
    id: 7898,
    name: "goblintown #7898",
    price: "0.185 ETH",
    image: "/nft/7898.png",
    endsIn: "14:07",
    rank: "#7,830",
  },
  {
    id: 6483,
    name: "goblintown #6483",
    price: "0.185 ETH",
    image: "/nft/6483.png",
    endsIn: "",
    rank: "#5,934",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "/nft/9014.png",
    endsIn: "",
    rank: "#4,432",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const title =
    slug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
    "Product";

  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  const menuTabs = [
    { label: "Cây trồng", href: "#" },
    { label: "Phân bón", href: "#" },
    { label: "Lịch trình farm", href: "#" },
  ];

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [action, setAction] = useState<"buy" | "sell">("buy");
  const handleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-white min-h-screen">
          {/* Header collection */}
          <div className="flex items-center gap-4 p-6 border-b border-black/10 bg-white">
            <img
              src="/nft/9917.png"
              alt="Collection"
              className="w-16 h-16 rounded grayscale border border-black/20"
            />
            <div>
              <h1 className="text-2xl font-bold text-black">{title}</h1>
              <div className="flex gap-2 text-sm text-black/60">
                <span>BY KINGOFTHEGOB...</span>
                <span>• ETHEREUM</span>
                <span>• 9,640</span>
                <span>• MAY 2022</span>
                <span>• PFPS</span>
              </div>
            </div>
          </div>
          {/* Tab menu */}
          <TabMenu
            tabs={menuTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* Main content */}
          <main className="flex-1 p-6 bg-white">
            {activeTab === 0 && (
              <NFTGrid
                items={items}
                selectedItems={selectedItems}
                onSelect={handleSelect}
              />
            )}
            {activeTab === 1 && (
              <div className="text-black text-lg font-semibold flex items-center justify-center h-64">
                Đang phát triển tính năng Phân bón...
              </div>
            )}
            {activeTab === 2 && (
              <div className="text-black text-lg font-semibold flex items-center justify-center h-64">
                Đang phát triển tính năng Lịch trình farm...
              </div>
            )}
          </main>
          {selectedItems.length > 0 && (
            <SelectedBar
              items={items}
              selectedItems={selectedItems}
              action={action}
              setAction={setAction}
              setSelectedItems={setSelectedItems}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
