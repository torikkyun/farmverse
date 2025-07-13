"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { useState } from "react";
import TabMenu from "../components/tab-menu";
import NFTGrid from "../components/nft-grid";
import DungGrid from "../components/dung-grid";
import SelectedBar from "../components/selected-bar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Dummy data cho NFT items
const items = [
  {
    id: 9917,
    name: "goblintown #9917",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/1011/200/200",
  },
  {
    id: 7898,
    name: "goblintown #7898",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/1025/200/200",
  },
  {
    id: 6483,
    name: "goblintown #6483",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/1035/200/200",
  },
  {
    id: 9014,
    name: "goblintown #9014",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/1043/200/200",
  },
  {
    id: 9015,
    name: "goblintown #9015",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/1052/200/200",
  },
  {
    id: 9016,
    name: "goblintown #9016",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/1062/200/200",
  },
  {
    id: 9017,
    name: "goblintown #9017",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/1074/200/200",
  },
  {
    id: 9018,
    name: "goblintown #9018",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/1084/200/200",
  },
  {
    id: 9019,
    name: "goblintown #9019",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/109/200/200",
  },
  {
    id: 9020,
    name: "goblintown #9020",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/110/200/200",
  },
  {
    id: 9021,
    name: "goblintown #9021",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/111/200/200",
  },
  {
    id: 9022,
    name: "goblintown #9022",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/112/200/200",
  },
  {
    id: 9023,
    name: "goblintown #9023",
    price: "0.185 ETH",
    image: "https://picsum.photos/id/113/200/200",
  },
];

const dungs = [
  {
    id: 1,
    name: "Organic Compost NFT",
    price: "0.05 ETH",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=200&h=200",
  },
  {
    id: 2,
    name: "Super Growth Fertilizer NFT",
    price: "0.08 ETH",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=200&h=200",
  },
  {
    id: 3,
    name: "Bio Humus NFT",
    price: "0.06 ETH",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=facearea&w=200&h=200",
  },
  {
    id: 4,
    name: "Mineral Mix NFT",
    price: "0.07 ETH",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=200&h=200",
  },
  {
    id: 5,
    name: "Worm Castings NFT",
    price: "0.09 ETH",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=200&h=200",
  },
  {
    id: 6,
    name: "Seaweed Extract NFT",
    price: "0.04 ETH",
    image:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=200&h=200",
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
          {/* Menu item */}
          <main className="flex-1 p-6 bg-white">
            {activeTab === 0 && (
              <NFTGrid
                items={items}
                selectedItems={selectedItems}
                onSelect={handleSelect}
              />
            )}
            {activeTab === 1 && (
              <DungGrid
                dungs={dungs}
                selectedItems={selectedItems}
                onSelect={handleSelect}
              />
            )}
            {activeTab === 2 && (
              <div className="max-w-5xl mx-auto w-full">
                <Card className="w-full shadow-lg border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                      Lịch trình nông trại
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Gantt Chart */}
                    <div className="overflow-x-auto pb-6">
                      {/* Dòng tháng/thứ/ngày */}
                      <div className="flex flex-col border-b border-gray-200">
                        {/* Tháng */}
                        <div className="flex text-xs font-semibold text-gray-600 bg-gray-50">
                          <div className="w-48"></div>
                          <div className="flex-1 grid grid-cols-24">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div
                                key={i}
                                className="py-1 text-center border-l border-gray-100"
                              >
                                Tháng 7
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Thứ */}
                        <div className="flex text-xs font-medium text-gray-500 bg-gray-50">
                          <div className="w-48"></div>
                          <div className="flex-1 grid grid-cols-24">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div
                                key={i}
                                className="py-1 text-center border-l border-gray-100"
                              >
                                {
                                  ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][
                                    (i + 5) % 7
                                  ]
                                }
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Ngày */}
                        <div className="flex text-xs font-semibold text-gray-500 border-b border-gray-200 bg-gray-50">
                          <div className="w-48 py-2 pl-2">Hạng mục</div>
                          <div className="flex-1 grid grid-cols-24">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div
                                key={i}
                                className="py-2 text-center border-l border-gray-100"
                              >
                                {i + 5}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Planning */}
                      <div className="flex border-b border-gray-100 bg-white hover:bg-gray-50 transition">
                        <div className="w-48 py-3 pl-2 font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                          Planning
                        </div>
                        <div className="flex-1 relative h-12">
                          <div
                            className="absolute left-[0%] top-2 h-7 bg-green-500 rounded-l-full rounded-r px-5 flex items-center text-white text-xs font-bold shadow-lg"
                            style={{ width: "8.5%" }}
                          >
                            First draft
                          </div>
                          <div
                            className="absolute left-[8.5%] top-2 h-7 bg-orange-400 rounded px-5 flex items-center text-white text-xs font-bold shadow-lg"
                            style={{ width: "8.5%" }}
                          >
                            Second draft
                          </div>
                          <div
                            className="absolute left-[17%] top-2 h-7 bg-gray-300 rounded px-5 flex items-center text-gray-700 text-xs font-bold shadow-lg"
                            style={{ width: "4.2%" }}
                          >
                            Planning complete
                          </div>
                        </div>
                      </div>
                      {/* Book Chapters */}
                      <div className="flex border-b border-gray-100 bg-white hover:bg-gray-50 transition">
                        <div className="w-48 py-3 pl-6 font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          Book Chapters
                        </div>
                        <div className="flex-1 relative" style={{ height: 96 }}>
                          <div
                            className="absolute left-[17%] top-2 h-7 bg-green-500 rounded-l-full rounded-r px-5 flex items-center text-white text-xs font-bold shadow-lg"
                            style={{ width: "10.5%" }}
                          >
                            Ch. 1
                          </div>
                          <div
                            className="absolute left-[27.5%] top-2 h-7 bg-indigo-400 rounded px-5 flex items-center text-white text-xs font-bold shadow-lg"
                            style={{ width: "10.5%" }}
                          >
                            Ch. 2
                          </div>
                          <div
                            className="absolute left-[38%] top-2 h-7 bg-rose-400 rounded px-5 flex items-center text-white text-xs font-bold shadow-lg"
                            style={{ width: "10.5%" }}
                          >
                            Ch. 3
                          </div>
                          <div
                            className="absolute left-[38%] top-10 h-7 bg-green-400 rounded px-5 flex items-center text-white text-xs font-bold shadow-lg"
                            style={{ width: "10.5%" }}
                          >
                            Intro
                          </div>
                          <div
                            className="absolute left-[38%] top-20 h-7 bg-green-300 rounded px-5 flex items-center text-white text-xs font-bold shadow-lg"
                            style={{ width: "10.5%" }}
                          >
                            Epilogue
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End Gantt */}
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
          {selectedItems.length > 0 && (
            <SelectedBar
              items={activeTab === 1 ? dungs : items}
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
