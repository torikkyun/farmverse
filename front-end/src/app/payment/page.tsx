"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PaymentHistory } from "./PaymentHistory";
import { PaymentDetailDialog } from "./PaymentDetailDialog";
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
        <div className="flex flex-1 flex-col min-h-screen bg-white">
          <div className="flex flex-1 flex-col md:flex-row justify-start items-start px-4 py-4 gap-5 max-w-6xl mx-auto w-full">
            {/* Cột trái: Nạp tiền */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <Card className="w-full max-w-md border-black/10 shadow-xl bg-white p-7">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-black text-center">
                    Nạp tiền vào tài khoản
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {success && (
                    <Alert
                      variant="default"
                      className="mb-4 border border-black bg-white text-black"
                    >
                      <AlertTitle>Thành công</AlertTitle>
                      <AlertDescription>
                        Bạn đã nạp {amount} FVT vào tài khoản!
                      </AlertDescription>
                    </Alert>
                  )}
                  {error && (
                    <Alert
                      variant="destructive"
                      className="mb-4 border border-black bg-white text-black"
                    >
                      <AlertTitle>Lỗi</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="mb-6">
                    <label
                      htmlFor="amount"
                      className="block font-semibold text-black mb-2"
                    >
                      Số tiền cần nạp (FVT)
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      min={1}
                      placeholder="Nhập số tiền..."
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border border-black text-black bg-white"
                    />
                  </div>
                  <Button
                    className="w-full bg-black text-white font-bold hover:bg-gray-900 transition"
                    onClick={handleDeposit}
                  >
                    Nạp tiền
                  </Button>
                </CardContent>
              </Card>
            </div>
            {/* Cột phải: Lịch sử giao dịch */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <PaymentHistory
                history={history}
                loadingHistory={loadingHistory}
                onShowDetail={handleShowDetail}
              />
            </div>
          </div>
        </div>
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
