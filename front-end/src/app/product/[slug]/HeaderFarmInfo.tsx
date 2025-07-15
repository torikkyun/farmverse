import React from "react";
import { Farm } from "./page";

interface Props {
  farm: Farm | null;
  loading: boolean;
  error: string | null;
}

export default function HeaderFarmInfo({ farm, loading, error }: Props) {
  return (
    <div className="flex items-center gap-4 p-6 border-b border-black/10 bg-white">
      <img
        src={farm?.images?.[0] || "/nft/9917.png"}
        alt="Collection"
        className="w-16 h-16 rounded grayscale border border-black/20"
      />
      <div>
        <h1 className="text-2xl font-bold text-black">
          {loading ? "Đang tải..." : error ? "Lỗi" : farm?.name}
        </h1>
        <div className="flex gap-2 text-sm text-black/60">
          <span>Chủ nông trại: {farm?.owner?.name}</span>
          <span>Địa chỉ: {farm?.location}</span>
          <span>Diện tích: {farm?.size} m²</span>
        </div>
        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      </div>
    </div>
  );
}