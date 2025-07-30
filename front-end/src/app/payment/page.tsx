"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PaymentHistory } from "./PaymentHistory";
import { PaymentDetailDialog } from "./PaymentDetailDialog";
import DepositModal from "@/components/DepositModal";
import { usePayment } from "./usePayment";

export default function PaymentPage() {
  const {
    amount,
    setAmount,
    success,
    error,
    history,
    loadingHistory,
    handleDeposit,
    openDetail,
    setOpenDetail,
    detail,
    loadingDetail,
    handleShowDetail,
  } = usePayment();
  const [openDeposit, setOpenDeposit] = React.useState(false);

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
        <SiteHeader onOpenDeposit={() => setOpenDeposit(true)} />
        <div className="flex min-h-screen bg-white">
          <div className="flex px-4 py-4 gap-5 w-full">
            <div className="w-full">
              <PaymentHistory
                history={history}
                loadingHistory={loadingHistory}
                onShowDetail={handleShowDetail}
              />
            </div>
          </div>
        </div>
        {/* Modal nạp tiền */}
        <DepositModal
          open={openDeposit}
          onOpenChange={setOpenDeposit}
          amount={amount}
          setAmount={setAmount}
          success={success}
          error={error ?? ""}
          handleDeposit={handleDeposit}
        />
        {/* Modal chi tiết giao dịch */}
        <PaymentDetailDialog
          open={openDetail}
          setOpen={setOpenDetail}
          loadingDetail={loadingDetail}
          detail={detail}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
