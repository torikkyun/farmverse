"use client";
import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Dialog } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { FarmEditModal } from "./FarmEditModal";
import { FarmAddModal } from "./FarmAddModal";
import { FarmPagination } from "./FarmPagination";
import { FarmSearchBar } from "./FarmSearchBar";
import { FarmTable } from "./FarmTable";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function FarmPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    location: "",
    size: "",
    images: "",
  });
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);
  const [editFarm, setEditFarm] = useState<any | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchFarms = async (page = 1, pageSize = 10, searchValue = "") => {
    setLoading(true);
    try {
      const url = `${apiURL}/farms?page=${page}&pageSize=${pageSize}${
        searchValue ? `&search=${encodeURIComponent(searchValue)}` : ""
      }`;
      const res = await fetch(url);
      const json = await res.json();
      setFarms(json.data.items || []);
      setMeta(json.data.meta || meta);
    } catch {
      setFarms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms(meta.currentPage, meta.pageSize, search);
    // eslint-disable-next-line
  }, []);

  const handlePageChange = (next: boolean) => {
    const newPage = next
      ? Math.min(meta.currentPage + 1, meta.totalPages)
      : Math.max(meta.currentPage - 1, 1);
    fetchFarms(newPage, meta.pageSize, search);
    setMeta((m) => ({ ...m, currentPage: newPage }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFarms(1, meta.pageSize, search);
    setMeta((m) => ({ ...m, currentPage: 1 }));
  };

  const handleAddFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    setAddSuccess(null);
    try {
      const res = await fetch(`${apiURL}/farms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: addForm.name,
          description: addForm.description,
          location: addForm.location,
          size: Number(addForm.size),
          images: addForm.images
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean),
        }),
      });
      if (!res.ok) {
        setAddError("Thêm nông trại thất bại");
        return;
      }
      setAddSuccess("Thêm nông trại thành công!");
      setAddForm({
        name: "",
        description: "",
        location: "",
        size: "",
        images: "",
      });
      setShowAdd(false);
      fetchFarms(1, meta.pageSize, search);
      setMeta((m) => ({ ...m, currentPage: 1 }));
    } catch {
      setAddError("Thêm nông trại thất bại");
    }
  };

  const handleEditFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditSuccess(null);
    try {
      const res = await fetch(`${apiURL}/farms`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editFarm.id, // Nếu API yêu cầu id, giữ lại dòng này
          name: editFarm.name,
          description: editFarm.description,
          location: editFarm.location,
          size: Number(editFarm.size),
          images: editFarm.images
            .split(",")
            .map((url: string) => url.trim())
            .filter(Boolean),
        }),
      });
      if (!res.ok) {
        setEditError("Sửa nông trại thất bại");
        return;
      }
      setEditSuccess("Sửa nông trại thành công!");
      setEditFarm(null);
      fetchFarms(meta.currentPage, meta.pageSize, search);
    } catch {
      setEditError("Sửa nông trại thất bại");
    }
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
        <SiteHeader />
        <div className="w-full flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          <div className="w-full px-2 sm:px-4 py-6 flex-1 flex flex-col gap-6">
            {/* Thanh tìm kiếm và nút thêm */}
            <FarmSearchBar
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              setShowAdd={setShowAdd}
              inputRef={inputRef}
            />

            {/* Dialog thêm nông trại */}
            <FarmAddModal
              showAdd={showAdd}
              setShowAdd={setShowAdd}
              addForm={addForm}
              setAddForm={setAddForm}
              handleAddFarm={handleAddFarm}
              addError={addError}
              addSuccess={addSuccess}
            />

            {/* Dialog sửa nông trại */}
            <FarmEditModal
              editFarm={editFarm}
              setEditFarm={setEditFarm}
              handleEditFarm={handleEditFarm}
              editError={editError}
              editSuccess={editSuccess}
            />

            {/* Bảng danh sách nông trại */}
            <FarmTable
              farms={farms}
              loading={loading}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              setEditFarm={setEditFarm}
            />
            {/* Phân trang */}
            <FarmPagination meta={meta} handlePageChange={handlePageChange} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
