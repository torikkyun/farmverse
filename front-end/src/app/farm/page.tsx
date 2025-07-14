"use client";
import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import FarmModal from "./FarmModal";
import { FarmPagination } from "./FarmPagination";
import FarmSearchBar from "./FarmSearchBar";
import FarmTable from "./FarmTable";

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
    size: string | number;
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
      // Nếu user đã có farm, lấy farm của họ
      if (userObj.data?.user?.farm) {
        setUserFarm(userObj.data.user.farm);
      }
    }
  }, []);

  // Fetch danh sách farm nếu chưa có farm cá nhân
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

  useEffect(() => {
    // Nếu user chưa có farm thì fetch danh sách
    if (!userFarm) {
      fetchFarms(meta.currentPage, meta.pageSize, search);
    }
    // eslint-disable-next-line
  }, [userFarm]);

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

  const [editForm, setEditForm] = useState<{
    id?: string;
    name: string;
    description: string;
    location: string;
    size: string | number;
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
    const userData = localStorage.getItem("user");
    const token = userData ? JSON.parse(userData).data?.accessToken : null;
    try {
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
            {/* Nếu user đã có farm, chỉ hiển thị farm của họ */}
            {userFarm && userFarm.id ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Nông trại của bạn</h2>
                <div className="border rounded-lg p-4 bg-white dark:bg-black shadow">
                  <div className="font-semibold text-lg">{userFarm.name}</div>
                  <div className="text-gray-600 dark:text-gray-300 mb-2">{userFarm.description}</div>
                  <div>Địa chỉ: {userFarm.location}</div>
                  <div>Diện tích: {userFarm.size} ha</div>
                  <div>
                    Ảnh:{" "}
                    {Array.isArray(userFarm.images)
                      ? userFarm.images.join(", ")
                      : userFarm.images}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Thanh tìm kiếm và nút thêm (chỉ hiện nút nếu là FARMER) */}
                <FarmSearchBar
                  search={search}
                  setSearch={setSearch}
                  handleSearch={handleSearch}
                  {...(userRole === "FARMER" ? { setShowAdd } : {})}
                  inputRef={inputRef}
                />

                {/* Dialog thêm nông trại (chỉ FARMER mới tạo được) */}
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

                {/* Dialog sửa nông trại */}
                <FarmModal
                  open={!!editFarm}
                  setOpen={() => {
                    setEditFarm(null);
                    setEditForm({
                      name: "",
                      description: "",
                      location: "",
                      size: "",
                      images: "",
                    });
                  }}
                  form={editForm}
                  setForm={setEditForm}
                  handleSubmit={handleEditFarm}
                  error={editError ?? undefined}
                  success={editSuccess ?? undefined}
                  mode="edit"
                />

                {/* Bảng danh sách nông trại */}
                <FarmTable
                  farms={farms}
                  loading={loading}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  setEditFarm={(farm) => {
                    setEditFarm(farm);
                    setEditForm({
                      id: farm.id?.toString?.() ?? "",
                      name: farm.name ?? "",
                      description: farm.description ?? "",
                      location: farm.location ?? "",
                      size: farm.size ?? "",
                      images: Array.isArray(farm.images)
                        ? farm.images.join(", ")
                        : farm.images || "",
                    });
                  }}
                />
                {/* Phân trang */}
                <FarmPagination meta={meta} handlePageChange={handlePageChange} />
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
