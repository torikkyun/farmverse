"use client";
import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import FarmModal from "./FarmModal";
import { FarmPagination } from "./FarmPagination";
import FarmSearchBar from "./FarmSearchBar";
import FarmTable from "./FarmTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FarmerFarmCard from "./FarmerFarmCard";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function FarmPage() {
  interface Farm {
    id: string | number;
    name: string;
    description?: string;
    location?: string;
    size?: string | number;
    images?: string[] | string;
    ownerId?: string;
  }
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<{
    name: string;
    description: string;
    location: string;
    size: string;
    images: string;
  }>({
    name: "",
    description: "",
    location: "",
    size: "",
    images: "",
  });
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);
  const [editFarm, setEditFarm] = useState<Farm | null>(null);
  const [showMenu, setShowMenu] = useState<string | number | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);

  const [userFarm, setUserFarm] = useState<Farm | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Lấy user info từ localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      setUserRole(userObj.data?.user?.role || null);
    }
  }, []);

  // Lấy farm cá nhân nếu là FARMER
  const fetchFarmByOwner = async () => {
    setLoading(true);
    try {
      const userData = localStorage.getItem("user");
      const userObj = userData ? JSON.parse(userData) : null;
      const ownerId = userObj?.data?.user?.id;
      const token = userObj?.data?.accessToken;
      if (!ownerId) {
        setUserFarm(null);
        setLoading(false);
        return;
      }
      const url = `${apiURL}/farms/owner/${ownerId}`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const json = await res.json();
      console.log("API /farms/owner/{ownerId} trả về:", json);
      const farm = json.data?.farm;
      setUserFarm(farm && farm.id ? farm : null);
    } catch (err) {
      console.error("Lỗi lấy farm:", err);
      setUserFarm(null);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách farm cho các role khác
  const fetchFarms = async (page = 1, pageSize = 10, searchValue = "") => {
    setLoading(true);
    const userData = localStorage.getItem("user");
    const token = userData ? JSON.parse(userData).data?.accessToken : null;
    try {
      const url = `${apiURL}/farms?page=${page}&pageSize=${pageSize}${
        searchValue ? `&search=${encodeURIComponent(searchValue)}` : ""
      }`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const json = await res.json();
      setFarms(json.data.items || []);
      setMeta(json.data.meta || meta);
    } catch {
      setFarms([]);
    } finally {
      setLoading(false);
    }
  };

  // Gọi đúng API theo role
  useEffect(() => {
    if (userRole === "FARMER") {
      fetchFarmByOwner();
    } else if (userRole) {
      fetchFarms(meta.currentPage, meta.pageSize, search);
    }
    // eslint-disable-next-line
  }, [userRole, meta.currentPage, meta.pageSize, search]);

  const handlePageChange = (next: boolean) => {
    const newPage = next
      ? Math.min(meta.currentPage + 1, meta.totalPages)
      : Math.max(meta.currentPage - 1, 1);
    setMeta((m) => ({ ...m, currentPage: newPage }));
  };

  useEffect(() => {
    if (userRole && userRole !== "FARMER") {
      fetchFarms(meta.currentPage, meta.pageSize, search);
    }
    // eslint-disable-next-line
  }, [meta.currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMeta((m) => ({ ...m, currentPage: 1 }));
    if (userRole === "FARMER") {
      fetchFarmByOwner();
    } else {
      fetchFarms(1, meta.pageSize, search);
    }
  };

  const [editForm, setEditForm] = useState<{
    id?: string;
    name: string;
    description: string;
    location: string;
    size: string; // <-- chỉ string
    images: string;
  }>({
    name: "",
    description: "",
    location: "",
    size: "",
    images: "",
  });

  const handleAddFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    setAddSuccess(null);
    setLoading(true); // Bắt đầu loading
    const userData = localStorage.getItem("user");
    const token = userData ? JSON.parse(userData).data?.accessToken : null;
    try {
      const imagesArray = Array.isArray(addForm.images)
        ? addForm.images
        : addForm.images
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean);

      const res = await fetch(`${apiURL}/farms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: addForm.name,
          description: addForm.description,
          location: addForm.location,
          size: Number(addForm.size),
          images: imagesArray,
        }),
      });
      if (!res.ok) {
        setAddError("Thêm nông trại thất bại");
        setLoading(false);
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
      // Tự động reload trang
      window.location.reload();
    } catch {
      setAddError("Thêm nông trại thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleEditFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditSuccess(null);
    if (!editFarm) {
      setEditError("Không có thông tin nông trại để sửa");
      return;
    }
    const userData = localStorage.getItem("user");
    const token = userData ? JSON.parse(userData).data?.accessToken : null;
    try {
      const res = await fetch(`${apiURL}/farms`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          location: editForm.location,
          size: Number(editForm.size),
          images: editForm.images
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean),
        }),
      });
      if (!res.ok) {
        setEditError("Sửa nông trại thất bại");
        return;
      }
      setEditSuccess("Sửa nông trại thành công!");
      setEditFarm(null);
      setEditForm({
        name: "",
        description: "",
        location: "",
        size: "",
        images: "",
      });
      fetchFarms(meta.currentPage, meta.pageSize, search);
    } catch {
      setEditError("Sửa nông trại thất bại");
    }
  };

  // UI
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
            {userRole === "FARMER" && userFarm && userFarm.id ? (
              <FarmerFarmCard farm={userFarm} />
            ) : (
              // Chưa có farm: chỉ cho tạo farm
              <>
                <FarmModal
                  open={showAdd}
                  setOpen={setShowAdd}
                  form={addForm}
                  setForm={setAddForm}
                  handleSubmit={handleAddFarm}
                  error={addError ?? undefined}
                  success={addSuccess ?? undefined}
                  mode="add"
                />
                <button
                  className="px-4 py-2 bg-black text-white rounded font-semibold w-fit mt-4"
                  onClick={() => setShowAdd(true)}
                >
                  + Tạo nông trại của bạn
                </button>
              </>
            )}
          </div>
        </div>
      </SidebarInset>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <span className="mt-4 text-white font-semibold">Đang xử lý...</span>
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
