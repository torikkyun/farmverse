"use client";
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import FarmModal from "./FarmModal";
import { useAddFarmForm } from "./useFarmActions";
import { useFarmerFarm } from "./useFarmerFarm";
import FarmMenu from "./FarmMenu";
import FarmContent from "./FarmContent";
import DepositModal from "@/components/DepositModal";

export default function FarmPage() {
  const [selectedMenu, setSelectedMenu] = useState<string>("farm-info");
  const [token, setToken] = useState<string | null>(null);
  const { userFarm, userRole } = useFarmerFarm();
  const addFarm = useAddFarmForm();

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

  // Lấy token safely sau khi component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        const accessToken = parsed.accessToken || parsed.accessToken;
        setToken(accessToken || null);
      } catch {
        setToken(null);
      }
    }
  }, []);

  const handleAddFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    addFarm.setError(null);
    addFarm.setSuccess(null);

    if (!token) {
      addFarm.setError("Không tìm thấy token xác thực");
      return;
    }

    try {
      const imagesArray = Array.isArray(addFarm.form.images)
        ? addFarm.form.images
        : addFarm.form.images
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/farms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        const errorData = await res.json().catch(() => ({}));
        addFarm.setError(errorData.message || "Thêm nông trại thất bại");
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
      window.location.reload();
    } catch (error) {
      console.error("Error adding farm:", error);
      addFarm.setError("Thêm nông trại thất bại");
    }
  };

  // Đã bỏ toàn bộ phần xử lý overload/loading

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
          <div className="w-full px-2 sm:px-4 py-6 flex-1 flex flex-col gap-3">
            {userRole === "FARMER" && (
              <>
                {userFarm && userFarm.id ? (
                  <div className="flex flex-row gap-5">
                    <FarmMenu
                      selected={selectedMenu}
                      onSelect={setSelectedMenu}
                    />
                    <div className="flex-1">
                      <FarmContent selected={selectedMenu} farm={userFarm} />
                    </div>
                  </div>
                ) : (
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
                  </>
                )}
              </>
            )}
          </div>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
