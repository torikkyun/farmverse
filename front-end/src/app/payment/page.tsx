"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAccount } from "wagmi";

const FVT_ADDRESS = process.env.NEXT_PUBLIC_FVT_ADDRESS;
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const ETHERSCAN_API = "https://api.etherscan.io/v2/api";

interface PaymentTx {
  hash: string;
  timeStamp: string;
  value: string;
  tokenDecimal: string;
  from: string;
  to: string;
  blockNumber: string;
  // Add other fields as needed
}

function PaymentHistory({
  address,
  onShowDetail,
}: {
  address: string;
  onShowDetail: (tx: PaymentTx) => void;
}) {
  const [txs, setTxs] = useState<PaymentTx[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    fetch(
      `${ETHERSCAN_API}?chainid=11155111&module=account&action=tokentx&contractaddress=${FVT_ADDRESS}&address=${address}&page=1&offset=20&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTxs(data.result || []);
      })
      .finally(() => setLoading(false));
  }, [address]);

  if (!address) return <div>Vui lòng kết nối ví để xem lịch sử giao dịch.</div>;
  if (loading) return <div>Đang tải lịch sử...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Lịch sử giao dịch FVT</h2>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Thời gian</th>
              <th className="px-4 py-2 text-left">Hash</th>
              <th className="px-4 py-2 text-left">Số lượng</th>
              <th className="px-4 py-2 text-left">Từ</th>
              <th className="px-4 py-2 text-left">Đến</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {txs.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  Không có giao dịch nào.
                </td>
              </tr>
            )}
            {txs.map((tx) => (
              <tr key={tx.hash} className="border-b hover:bg-muted/50">
                <td className="px-4 py-2">
                  {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    <Badge variant="outline">
                      {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
                    </Badge>
                  </a>
                </td>
                <td className="px-4 py-2">
                  {(
                    Number(tx.value) /
                    10 ** Number(tx.tokenDecimal)
                  ).toLocaleString()}{" "}
                  FVT
                </td>
                <td className="px-4 py-2">
                  <Badge variant="outline">
                    {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                  </Badge>
                </td>
                <td className="px-4 py-2">
                  <Badge variant="outline">
                    {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                  </Badge>
                </td>
                <td className="px-4 py-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onShowDetail(tx)}
                  >
                    Chi tiết
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentDetailDialog({
  open,
  setOpen,
  tx,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  tx: PaymentTx | null;
}) {
  if (!tx) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết giao dịch</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Hash: </span>{" "}
            <a
              href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              <Badge variant="outline">{tx.hash}</Badge>
            </a>
          </div>
          <div>
            <span className="font-medium">Thời gian:</span>{" "}
            {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Từ: </span>
            <Badge variant="outline">{tx.from}</Badge>
          </div>
          <div>
            <span className="font-medium">Đến: </span>
            <Badge variant="outline">{tx.to}</Badge>
          </div>
          <div>
            <span className="font-medium">Số lượng:</span>{" "}
            {(
              Number(tx.value) /
              10 ** Number(tx.tokenDecimal)
            ).toLocaleString()}{" "}
            FVT
          </div>
          <div>
            <span className="font-medium">Block:</span> {tx.blockNumber}
          </div>
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="w-full mt-2">
            Đóng
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default function PaymentPage() {
  const { address } = useAccount();
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState<PaymentTx | null>(null);

  const handleShowDetail = (tx: PaymentTx) => {
    setDetail(tx);
    setOpenDetail(true);
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
        <div className="flex min-h-screen bg-white">
          <div className="flex px-4 py-4 gap-5 w-full">
            <div className="w-full">
              <PaymentHistory
                address={address ?? ""}
                onShowDetail={handleShowDetail}
              />
            </div>
          </div>
        </div>
        <PaymentDetailDialog
          open={openDetail}
          setOpen={setOpenDetail}
          tx={detail}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
