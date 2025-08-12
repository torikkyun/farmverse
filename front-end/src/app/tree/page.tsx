"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TreeDetailModal from "./TreeDetailModal";
import { TreeHarvestModal } from "./TreeHarvestModal";
import Pagination from "@/components/ui/pagination";
import DepositModal from "@/components/DepositModal";
import TreeList from "./TreeList";
import TreeSearchBar from "./TreeSearchBar";
import TreeLoadingOverlay from "./TreeLoadingOverlay";
import TreeSuccessAlert from "./TreeSuccessAlert";
import {
  useDepositModal,
  mapRentedTreeToTreeItem,
  RentedTree,
} from "./treeHooks";
import { Clipboard } from "lucide-react";
import SellPriceModal from "./price/SellPriceModal";
// import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TreePage() {
  const [open, setOpen] = useState(false);
  const [sellPrice, setSellPrice] = useState(0);
  const [harvestOpen, setHarvestOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState<RentedTree | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [trees, setTrees] = useState<RentedTree[]>([]);
  const [loadingTrees, setLoadingTrees] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const {
    openDeposit,
    setOpenDeposit,
    amount,
    setAmount,
    success,
    error,
    handleDeposit,
  } = useDepositModal();

  useEffect(() => {
    setLoadingTrees(true);
    (async () => {
      try {
        const userStr = localStorage.getItem("user");
        const userObj = userStr ? JSON.parse(userStr) : null;
        const token = userObj?.accessToken;
        const params = new URLSearchParams({
          page: meta.currentPage.toString(),
          pageSize: meta.pageSize.toString(),
          ...(search ? { search } : {}),
          ...(status ? { status } : {}),
        });
        const res = await fetch(`${API_URL}/rented-trees?${params}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = await res.json();
        setTrees(data.data.items || []);
        setMeta((prev) => ({
          ...prev,
          totalPages: data.data.meta.totalPages || 1,
          totalItems: data.data.meta.totalItems || 0,
        }));
      } catch {
        setTrees([]);
      }
      setLoadingTrees(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.currentPage, search, status]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      const userObj = userStr ? JSON.parse(userStr) : null;
      setRole(userObj?.user?.role || null);
      console.log("PAGE role:", userObj?.user?.role);
    }
  }, []);

  const handleOpenModal = (item: RentedTree) => {
    setSelectedTree(item);
    setOpen(true);
  };
  const handleOpenHarvestModal = (item: RentedTree) => {
    setSelectedTree(item);
    setHarvestOpen(true);
  };

  const handleHarvest = (
    mode: "sell" | "storage",
    quantity: number,
    price?: number
  ) => {
    if (!selectedTree) return;
    setIsLoading(true);
    setShowAlert(false);
    setTimeout(() => {
      setIsLoading(false);
      setAlertContent({
        title: "Thu hoạch thành công!",
        description: `Đã thu hoạch ${quantity}kg ${selectedTree.name} - ${
          mode === "sell"
            ? `Bán với giá ${price?.toLocaleString()} VNĐ`
            : "Lấy vật phẩm và lưu vào kho"
        }`,
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }, 5000);
  };

  const handlePageChange = (page: number) =>
    setMeta((prev) => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, prev.totalPages)),
    }));

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-gray-50 min-h-screen">
          <div className="w-full px-2 sm:px-4 py-8 flex-1 flex flex-col gap-6">
            <TreeSearchBar
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              setPage={(page) =>
                setMeta((prev) => ({ ...prev, currentPage: page }))
              }
            />
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-bold text-black mb-4 pb-2 border-b-2 border-black flex items-center gap-2">
                  <Clipboard className="w-5 h-5" />
                  Danh sách Cây Đã Thuê
                </h2>
                <TreeList
                  trees={trees}
                  loading={loadingTrees}
                  onDetail={handleOpenModal}
                  onHarvest={handleOpenHarvestModal}
                  role={role}
                  onOpenSellPriceModal={(tree) => {
                    setSelectedTree(tree);
                    setSellModalOpen(true);
                  }}
                />
              </div>
            </div>
            <TreeDetailModal
              open={open}
              setOpen={setOpen}
              selectedTree={mapRentedTreeToTreeItem(selectedTree)}
            />
            <TreeHarvestModal
              open={harvestOpen}
              setOpen={setHarvestOpen}
              selectedTree={mapRentedTreeToTreeItem(selectedTree)}
              onHarvest={handleHarvest}
              initialSellPrice={sellPrice}
            />
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </div>
          {isLoading && <TreeLoadingOverlay />}
          {showAlert && (
            <TreeSuccessAlert
              title={alertContent.title}
              description={alertContent.description}
            />
          )}
        </div>
        <DepositModal
          open={openDeposit}
          onOpenChange={setOpenDeposit}
          amount={amount}
          setAmount={setAmount}
          success={success}
          error={error}
          handleDeposit={handleDeposit}
        />
        <SellPriceModal
          open={sellModalOpen}
          onClose={() => setSellModalOpen(false)}
          onSubmit={(price) => setSellPrice(price)}
          defaultPrice={sellPrice}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
