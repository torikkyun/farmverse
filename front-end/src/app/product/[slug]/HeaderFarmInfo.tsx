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
      <div className="relative bg-gradient-to-r from-white via-gray-100 to-white border-b border-black/20">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative flex items-center justify-center p-12">
          <div className="flex items-center gap-4 text-black">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium">
              Đang tải thông tin nông trại...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative bg-gradient-to-r from-white via-gray-50 to-white border-b border-black/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22grid%22%20width%3D%2220%22%20height%3D%2220%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2020%200%20L%200%200%200%2020%22%20fill%3D%22none%22%20stroke%3D%22black%22%20stroke-width%3D%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23grid)%22%20/%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative flex items-center gap-8 p-8 md:p-12">
          {/* Farm Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-black/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative">
              <Image
                src={
                  farm.images && farm.images.length > 0
                    ? farm.images[0]
                    : farm.user.avatar || "/nft/9917.png"
                }
                alt="Farm"
                width={100}
                height={100}
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-black/30 object-cover shadow-2xl hover:scale-105 transition-all duration-300"
              />
              {/* Size Badge */}
              <div className="absolute -bottom-2 -right-2 bg-black text-white px-3 py-1 rounded-xl text-xs font-bold shadow-lg">
                {farm.size ? `${Number(farm.size).toLocaleString()} ha` : "N/A"}
              </div>
            </div>
          </div>

          {/* Farm Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1
                className="text-3xl md:text-4xl font-black text-black mb-
2 tracking-tight"
              >
                {farm.name}
              </h1>
              <div className="w-20 h-1 bg-black rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Owner Info */}
              <div className="flex items-center gap-3 p-3 bg-black/10 backdrop-blur-sm rounded-xl border border-black/20">
                <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-black/60 text-xs uppercase tracking-wide font-semibold">
                    Chủ nông trại
                  </p>
                  <p className="text-black font-semibold">{farm.user.name}</p>
                </div>
              </div>

              {/* Location Info */}
              <div className="flex items-center gap-3 p-3 bg-black/10 backdrop-blur-sm rounded-xl border border-black/20">
                <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1011.314-11.314z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-black/60 text-xs uppercase tracking-wide font-semibold">
                    Địa chỉ
                  </p>
                  <p className="text-black font-semibold text-sm">
                    {farm.address?.street}, {farm.address?.commune},{" "}
                    {farm.address?.province || farm.address?.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {farm.description && (
              <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-black/10 shadow-sm">
                <p className="text-black/80 text-sm leading-relaxed italic">
                  {farm.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
