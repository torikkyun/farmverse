import { useState, useEffect, useCallback } from "react";
import { TransactionDetail } from "./PaymentDetailDialog";
import type { Transaction } from "./PaymentHistory";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function usePayment() {
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState<TransactionDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const getToken = () => {
    if (typeof window === "undefined") return "";
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return "";
      const userObj = JSON.parse(raw);
      return userObj?.accessToken || "";
    } catch {
      return "";
    }
  };

  // Fetch lịch sử giao dịch
  useEffect(() => {
    const fetchHistory = async () => {
      setLoadingHistory(true);
      try {
        const token = getToken();
        const res = await fetch(`${API_URL}/transactions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!res.ok) throw new Error("Không lấy được lịch sử giao dịch!");
        const data = await res.json();
        setHistory(
          Array.isArray(data.data?.transactions) ? data.data.transactions : []
        );
      } catch {
        setHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, [success]);

  // Nạp tiền
  const handleDeposit = useCallback(async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Vui lòng nhập số tiền hợp lệ.");
      setSuccess(false);
      return;
    }
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/transactions/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      if (!res.ok) throw new Error("Nạp tiền thất bại!");
      setSuccess(true);
      setError(null);
      setTimeout(() => setSuccess(false), 2500);
    } catch {
      setError("Có lỗi xảy ra khi nạp tiền!");
      setSuccess(false);
    }
  }, [amount]);

  // Tự động ẩn thông báo lỗi
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Xem chi tiết giao dịch
  const handleShowDetail = useCallback(async (transactionId?: string) => {
    if (!transactionId) return;
    setLoadingDetail(true);
    setOpenDetail(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Không lấy được chi tiết giao dịch!");
      const data = await res.json();
      setDetail(data.data); // Sửa lại lấy data.data
    } catch {
      setDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  return {
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
  };
}
