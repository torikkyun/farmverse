"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { ItemCard } from "./ItemCard";
import { ItemFormModal } from "./ItemFormModal";
import { ItemDetailModal } from "./ItemDetailModal";
import { ItemSearchBar } from "./ItemSearchBar";
import Pagination from "@/components/ui/pagination";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function WarehousePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    type: "",
    description: "",
    images: "",
    price: "",
    quantity: "",
  });
  // const [editItem, setEditItem] = useState<any | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  // const [userId, setUserId] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchItems(1, meta.pageSize, search, type);
    setMeta((m) => ({ ...m, currentPage: 1 }));
  };

  // Phân trang
  const handlePageChange = (page: number) => {
    setMeta((prev) => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, prev.totalPages)),
    }));
  };

  // // Thêm vật phẩm
  // const handleAddItem = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await fetch(`${apiURL}/items`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       name: addForm.name,
  //       type: addForm.type,
  //       description: addForm.description,
  //       images: addForm.images
  //         .split(",")
  //         .map((url) => url.trim())
  //         .filter(Boolean),
  //       price: Number(addForm.price),
  //       quantity: Number(addForm.quantity),
  //     }),
  //   });
  //   setShowAdd(false);
  //   setAddForm({
  //     name: "",
  //     type: "",
  //     description: "",
  //     images: "",
  //     price: "",
  //     quantity: "",
  //   });
  //   fetchItems(1, meta.pageSize, search, type);
  //   setMeta((m) => ({ ...m, currentPage: 1 }));
  // };

  // // Sửa vật phẩm
  // const handleEditItem = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await fetch(`${apiURL}/items/${editItem.id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       name: editItem.name,
  //       type: editItem.type,
  //       description: editItem.description,
  //       images: editItem.images
  //         .split(",")
  //         .map((url: string) => url.trim())
  //         .filter(Boolean),
  //       price: Number(editItem.price),
  //       quantity: Number(editItem.quantity),
  //     }),
  //   });
  //   setEditItem(null);
  //   fetchItems(meta.currentPage, meta.pageSize, search, type);
  // };

  // // Xóa vật phẩm
  // const handleDeleteItem = async (id: string) => {
  //   await fetch(`${apiURL}/items/${id}`, { method: "DELETE" });
  //   fetchItems(meta.currentPage, meta.pageSize, search, type);
  // };

  // const [open, setOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(
  //   null
  // );

  // const handleOpenModal = (item: (typeof items)[0]) => {
  //   setSelectedItem(item);
  //   setOpen(true);
  // };

  const fetchItems = async (
    page = 1,
    pageSize = 10,
    searchValue = "",
    typeValue = ""
  ) => {
    if (!userId) return;
    setLoading(true);
    try {
      const url = `${apiURL}/items?page=${page}&pageSize=${pageSize}${
        searchValue ? `&search=${encodeURIComponent(searchValue)}` : ""
      }${typeValue ? `&type=${typeValue}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();
      console.log("userId for filter:", userId);
      console.log(
        "owner ids:",
        json.data.items.map((item: any) => item.farm?.owner?.id)
      );
      const filteredItems = json.data.items.filter(
        (item: any) => String(item.farm?.owner?.id) === String(userId)
      );
      setItems(filteredItems);
      setMeta(json.data.meta || meta);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const id = localStorage.getItem("userId");
  //     console.log("userId in localStorage:", id);
  //     setUserId(id);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (userId) {
  //     fetchItems(meta.currentPage, meta.pageSize, search, type);
  //   }
  //   // eslint-disable-next-line
  // }, [userId]);

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
              {/* <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition-colors"
                onClick={() => setShowAdd(true)}
              >
                + Thêm vật phẩm
              </button> */}
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
                      <ItemCard
                        key={item.id}
                        item={item}
                        onEdit={(item: any) =>
                          setEditItem({
                            ...item,
                            images: Array.isArray(item.images)
                              ? item.images.join(", ")
                              : item.images || "",
                          })
                        }
                        onDelete={handleDeleteItem}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                        onOpenDetail={handleOpenModal}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ItemDetailModal
              open={open}
              onOpenChange={setOpen}
              item={selectedItem}
            />
            <ItemFormModal
              open={showAdd}
              onClose={() => setShowAdd(false)}
              onSubmit={handleAddItem}
              form={addForm}
              setForm={setAddForm}
              isEdit={false}
            />
            <ItemFormModal
              open={!!editItem}
              onClose={() => setEditItem(null)}
              onSubmit={handleEditItem}
              form={editItem || {}}
              setForm={setEditItem}
              isEdit={true}
            />
            {/* Phân trang */}
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
