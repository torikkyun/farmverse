"use client";
import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import FarmModal from "./FarmModal";
import Pagination from "@/components/ui/pagination";

import FarmerFarmCard from "./FarmerFarmCard";
import { useAddFarmForm, useEditFarmForm } from "./useFarmActions";

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
  const [userFarm, setUserFarm] = useState<Farm | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Phân trang
  const handlePageChange = (page: number) => {
    setMeta((prev) => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, prev.totalPages)),
    }));
  };

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
    if (!userRole) return;
    if (userRole === "FARMER") {
      fetchFarmByOwner();
    } else {
      fetchFarms(meta.currentPage, meta.pageSize, search);
    }
    // eslint-disable-next-line
  }, [userRole, meta.currentPage, meta.pageSize, search]);

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

  // Thay thế các state liên quan đến nút bằng custom hook
  const addFarm = useAddFarmForm();
  const editFarmForm = useEditFarmForm();

  const handleAddFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    addFarm.setError(null);
    addFarm.setSuccess(null);
    setLoading(true);
    const userData = localStorage.getItem("user");
    const token = userData ? JSON.parse(userData).data?.accessToken : null;
    try {
      const imagesArray = Array.isArray(addFarm.form.images)
        ? addFarm.form.images
        : addFarm.form.images
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
          name: addFarm.form.name,
          description: addFarm.form.description,
          location: addFarm.form.location,
          size: Number(addFarm.form.size),
          images: imagesArray,
        }),
      });
      if (!res.ok) {
        addFarm.setError("Thêm nông trại thất bại");
        setLoading(false);
        return;
      }
      addFarm.setSuccess("Thêm nông trại thành công!");
      addFarm.setForm({
        name: "",
        description: "",
        location: "",
        size: "",
        images: "",
      });
      addFarm.setOpen(false);
      // Tự động reload trang
      window.location.reload();
    } catch {
      addFarm.setError("Thêm nông trại thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleEditFarm = async (e: React.FormEvent) => {
  e.preventDefault();
  editFarmForm.setError(null);
  editFarmForm.setSuccess(null);
  if (!editFarmForm.farm) {
    editFarmForm.setError("Không có thông tin nông trại để sửa");
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
        name: editFarmForm.form.name,
        description: editFarmForm.form.description,
        location: editFarmForm.form.location,
        size: Number(editFarmForm.form.size),
        images: editFarmForm.form.images
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean),
      }),
    });
    if (!res.ok) {
      editFarmForm.setError("Sửa nông trại thất bại");
      return;
    }
    editFarmForm.setSuccess("Sửa nông trại thành công!");
    editFarmForm.farm = null;
    editFarmForm.setForm({
      name: "",
      description: "",
      location: "",
      size: "",
      images: "",
    });
    fetchFarms(meta.currentPage, meta.pageSize, search);
  } catch {
    editFarmForm.setError("Sửa nông trại thất bại");
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
              // FARMER đã có farm: chỉ hiện farm của họ
              <FarmerFarmCard farm={userFarm} />
            ) : (
              // FARMER chưa có farm hoặc role khác: hiện danh sách farm và nút tạo farm
              <>
                <FarmModal
                  open={addFarm.open}
                  setOpen={addFarm.setOpen}
                  form={addFarm.form}
                  setForm={addFarm.setForm}
                  handleSubmit={handleAddFarm}
                  error={addFarm.error ?? undefined}
                  success={addFarm.success ?? undefined}
                  mode="add"
                />
                <button
                  className="px-4 py-2 bg-black text-white rounded font-semibold w-fit mt-4"
                  onClick={() => addFarm.setOpen(true)}
                >
                  + Tạo nông trại của bạn
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                  {farms.map((farm) => (
                    <FarmerFarmCard key={farm.id} farm={farm} />
                  ))}
                </div>
                <Pagination meta={meta} onPageChange={handlePageChange} />
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
