import { useState } from "react";
import type { TreeItem } from "./types";

export interface RentedTree {
  id: string;
  name: string;
  description: string;
  images: string[];
  status: string;
  totalProfit: number;
  startDate: string;
  endDate: string;
}

export function useDepositModal() {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

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

  return {
    openDeposit,
    setOpenDeposit,
    amount,
    setAmount,
    success,
    error,
    handleDeposit,
  };
}

export function mapRentedTreeToTreeItem(
  tree: RentedTree | null
): TreeItem | null {
  if (!tree) return null;
  return {
    id: tree.id,
    name: tree.name,
    img: tree.images?.[0] || "",
    type: "",
    age: 0,
    yield: 0,
    status: tree.status,
    ownerName: "",
    rentStartDate: tree.startDate,
    rentEndDate: tree.endDate,
    monthlyRent: 0,
    totalPaid: 0,
    remainingMonths: 0,
    schedule: [],
  };
}
