"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { ItemCard } from "./ItemCard";
import { ItemFormModal } from "./ItemFormModal";
import { ItemSearchBar } from "./ItemSearchBar";
import Pagination from "@/components/ui/pagination";
import DepositModal from "@/components/DepositModal"; // Thêm dòng này

// Sửa type WarehouseItem để có trường images là mảng string
type WarehouseItem = {
  id: number;
  name: string;
  type: string;
  image: string;
  images?: string[]; // Thêm dòng này
  farm: { owner: { id: number }; name: string };
  quantity: number;
  price: number;
};

const FAKE_ITEMS: WarehouseItem[] = [
  {
    id: 1,
    name: "Phân bón hữu cơ",
    type: "FERTILIZER",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=Felix",
    farm: { owner: { id: 1 }, name: "Farm A" },
    quantity: 10,
    price: 50,
  },
  {
    id: 2,
    name: "Phân bón NPK",
    type: "FERTILIZER",
    image: "https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
    farm: { owner: { id: 1 }, name: "Farm A" },
    quantity: 5,
    price: 75,
  },
  {
    id: 3,
    name: "Cây lúa",
    type: "TREEROOT",
    image: "https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
    farm: { owner: { id: 2 }, name: "Farm B" },
    quantity: 100,
    price: 60,
  },
  {
    id: 4,
    name: "Cây ngô",
    type: "TREEROOT",
    image: "https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
    farm: { owner: { id: 2 }, name: "Farm B" },
    quantity: 80,
    price: 40,
  },
  {
    id: 5,
    name: "Cây khoai",
    type: "TREEROOT",
    image: "https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
    farm: { owner: { id: 1 }, name: "Farm A" },
    quantity: 60,
    price: 55,
  },
];

type WarehouseItemForm = {
  name: string;
  type: string;
  description: string;
  images: string;
  price: number;
  quantity: number;
};

export default function WarehousePage() {
  const [items, setItems] = useState<WarehouseItem[]>(FAKE_ITEMS);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: FAKE_ITEMS.length,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WarehouseItem | null>(null);

  // State cho modal nạp tiền
  const [openDeposit, setOpenDeposit] = useState(false);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  // Hàm xử lý nạp tiền (giả lập, bạn có thể thay bằng API thực tế)
  const handleDeposit = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Vui lòng nhập số tiền hợp lệ!");
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
    setTimeout(() => {
      setOpenDeposit(false);
      setAmount("");
      setSuccess(false);
    }, 1500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Lọc dữ liệu fake theo search và type
    let filtered = FAKE_ITEMS;
    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (type) {
      filtered = filtered.filter((item) => item.type === type);
    }
    setItems(filtered);
    setMeta((m) => ({
      ...m,
      currentPage: 1,
      totalItems: filtered.length,
      totalPages: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setMeta((prev) => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, prev.totalPages)),
    }));
  };

  // Chuyển WarehouseItem sang WarehouseItemForm
  const toForm = (item: WarehouseItem): WarehouseItemForm => ({
    name: item.name,
    type: item.type,
    description: "", // Nếu có trường description thì lấy từ item
    images: item.image, // Nếu là nhiều ảnh thì sửa lại cho phù hợp
    price: item.price,
    quantity: item.quantity,
  });

  // Khi click vào card
  const handleCardClick = (item: WarehouseItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  // Dummy submit (không làm gì)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
  };

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
        <SiteHeader /> {/* Thêm prop này */}
        <div className="flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          <div className="w-full mx-auto sm:px-4 py-6 flex-1 flex flex-col gap-8">
            {/* Thanh tìm kiếm và lọc */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 w-full">
                <ItemSearchBar
                  search={search}
                  setSearch={setSearch}
                  type={type}
                  setType={setType}
                  onSearch={handleSearch}
                />
              </div>
            </div>
            {/* Card danh sách vật phẩm */}
            <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow">
              <div className="p-6">
                {items.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                    Không có vật phẩm nào trong kho của bạn.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <ItemCard
                          item={{ ...item, images: [item.image] }}
                          onEdit={() => {}}
                          onDelete={() => {}}
                          showMenu={null}
                          setShowMenu={() => {}}
                          onOpenDetail={() => {}}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </div>
        </div>
        {/* Modal hiển thị thông tin vật phẩm */}
        <ItemFormModal
          open={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          form={
            selectedItem
              ? toForm(selectedItem)
              : {
                  name: "",
                  type: "",
                  description: "",
                  images: "",
                  price: 0,
                  quantity: 0,
                }
          }
          setForm={() => {}}
          isEdit={false}
        />
        <DepositModal
          open={openDeposit}
          onOpenChange={setOpenDeposit}
          amount={amount}
          setAmount={setAmount}
          success={success}
          error={error}
          handleDeposit={handleDeposit}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
