import React from "react";
import { Farm } from "./page";

interface Props {
  farm: Farm | null;
  loading: boolean;
  error: string | null;
  onCreateItem?: () => void;
  currentUserId?: string; // thêm prop này
}

export default function HeaderFarmInfo({
  farm,
  loading,
  error,
  onCreateItem,
  currentUserId,
}: Props) {
  const isOwner = farm && currentUserId && farm.owner?.id === currentUserId;

  return (
    <div className="flex items-center gap-4 p-6 border-b border-black/10 bg-white">
      <img
        src={farm?.images?.[0] || "/nft/9917.png"}
        alt="Collection"
        className="w-16 h-16 rounded grayscale border border-black/20"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-black">
          {loading ? "Đang tải..." : error ? "Lỗi" : farm?.name}
        </h1>
        <div className="flex gap-2 text-sm text-black/60">
          <span>Chủ nông trại: {farm?.owner?.name}</span>
          <span>Địa chỉ: {farm?.location}</span>
          <span>
            Diện tích: {farm?.size ? Number(farm.size).toFixed(2) : ""} ha
          </span>
        </div>
        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      </div>
      {isOwner && (
        <button
          className="ml-4 px-4 py-2 bg-white text-black border border-black rounded hover:bg-black hover:text-white transition"
          onClick={onCreateItem}
          type="button"
        >
          + Tạo vật phẩm
        </button>
      )}
    </div>
  );
}
