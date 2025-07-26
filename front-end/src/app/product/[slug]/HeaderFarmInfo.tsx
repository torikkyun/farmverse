import React, { useEffect, useState } from "react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  farmId: string;
  loading: boolean;
  error: string | null;
  currentUserId?: string;
}

interface Farm {
  id: string;
  name: string;
  address: {
    houseNumber?: string;
    street?: string;
    commune?: string;
    province?: string;
    city?: string;
    country?: string;
  };
  size: number;
  description: string;
  images: string[];
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
    address?: object;
    fvtBalance?: number;
    role?: string;
  };
  schedule?: Array<{
    month: number;
    activities: string[];
  }>;
}

export default function HeaderFarmInfo({ farmId, loading }: Props) {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (!farmId) return;
    setIsLoading(true);
    fetch(`${API_URL}/farms/${farmId}`)
      .then((res) => res.json())
      .then((data) => {
        setFarm(data.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [farmId]);

  if (isLoading || !farm) {
    return (
      <div className="flex items-center gap-4 p-6 border-b border-black/10 bg-white">
        <span>Đang tải thông tin nông trại...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-6 border-b border-black/10 bg-white">
      <Image
        src={
          farm.images && farm.images.length > 0
            ? farm.images[0]
            : farm.user.avatar || "/nft/9917.png"
        }
        alt="Collection"
        width={64}
        height={64}
        className="w-16 h-16 rounded grayscale border border-black/20"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-black">{farm.name}</h1>
        <div className="flex gap-2 text-sm text-black/60">
          <span>Chủ nông trại: {farm.user.name}</span>
          <span>
            Địa chỉ: {farm.address?.street}, {farm.address?.commune},{" "}
            {farm.address?.province || farm.address?.city},{" "}
          </span>
          <span>
            Diện tích: {farm.size ? Number(farm.size).toLocaleString() : ""} ha
          </span>
        </div>
      </div>
    </div>
  );
}
