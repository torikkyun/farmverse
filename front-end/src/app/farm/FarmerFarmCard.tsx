import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Farm {
  id: string;
  name: string;
  location?: string;
  size?: number;
  images?: string[];
  crops?: string[];
  user?: {
    name?: string;
  };
}

interface FarmerFarmCardProps {
  farmId: string;
}

export default function FarmerFarmCard({ farmId }: FarmerFarmCardProps) {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/farms/${farmId}`
        );

        if (!response.ok) {
          throw new Error("Không thể tải thông tin nông trại");
        }

        const farmData = await response.json();
        setFarm(farmData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    if (farmId) {
      fetchFarm();
    }
  }, [farmId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[60vh]">
        <Card className="w-full max-w-2xl bg-white border-2 border-black shadow-lg rounded-lg">
          <CardContent className="p-8">
            <div className="text-center text-gray-600">
              <div className="animate-pulse">
                Đang tải thông tin nông trại...
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !farm) {
    return (
      <div className="flex justify-center items-center w-full min-h-[60vh]">
        <Card className="w-full max-w-2xl bg-white border-2 border-black shadow-lg rounded-lg">
          <CardHeader className="pt-8 pb-2 px-8">
            <CardTitle className="text-2xl font-bold text-center text-black uppercase tracking-wide">
              Không tìm thấy nông trại
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="text-center text-gray-600">
              {error ||
                "Vui lòng kiểm tra lại thông tin hoặc chọn nông trại khác."}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <Card className="w-full max-w-2xl bg-white border-2 border-black shadow-lg rounded-lg">
        <CardHeader className="pt-8 pb-4 px-8 bg-black text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center uppercase tracking-wide">
            {farm.name}
          </CardTitle>
          {farm.user?.name && (
            <div className="text-gray-300 text-lg text-center">
              Chủ nông trại: {farm.user.name}
            </div>
          )}
        </CardHeader>

        <CardContent className="px-8 py-6">
          <div className="space-y-6">
            {/* Địa chỉ & Diện tích */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold text-gray-600 uppercase mb-2 tracking-wide">
                  Địa chỉ
                </div>
                <div className="text-lg text-black font-semibold">
                  {farm.location || (
                    <span className="italic text-gray-400">Chưa cập nhật</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-600 uppercase mb-2 tracking-wide">
                  Diện tích
                </div>
                <div className="text-lg text-black font-semibold">
                  {farm.size ? (
                    `${farm.size} ha`
                  ) : (
                    <span className="italic text-gray-400">Chưa cập nhật</span>
                  )}
                </div>
              </div>
            </div>

            {/* Cây trồng */}
            <div>
              <div className="text-xs font-bold text-gray-600 uppercase mb-2 tracking-wide">
                Cây trồng
              </div>
              <div className="text-lg text-black font-semibold">
                {farm.crops && farm.crops.length > 0 ? (
                  farm.crops.join(", ")
                ) : (
                  <span className="italic text-gray-400">Chưa cập nhật</span>
                )}
              </div>
            </div>

            {/* Hình ảnh */}
            <div>
              <div className="text-xs font-bold text-gray-600 uppercase mb-2 tracking-wide">
                Hình ảnh nông trại
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Array.isArray(farm.images) && farm.images.length > 0 ? (
                  farm.images.map((img, idx) =>
                    img ? (
                      <img
                        key={idx}
                        src={img}
                        alt={`${farm.name} - Ảnh ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-300"
                      />
                    ) : null
                  )
                ) : (
                  <span className="italic text-gray-400 col-span-full">
                    Chưa có hình ảnh
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
