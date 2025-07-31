import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFarmerFarm } from "./useFarmerFarm";
import type { Address } from "./useFarmerFarm";

export default function FarmerFarmCard() {
  const { userFarm: farm } = useFarmerFarm();

  if (!farm) {
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

  // Helper để hiển thị địa chỉ
  const renderAddress = (address?: Address) => {
    if (!address)
      return <span className="italic text-gray-400">Chưa cập nhật</span>;
    const { houseNumber, street, commune, city } = address;
    return (
      <span>
        {[houseNumber, street, commune, city].filter(Boolean).join(", ") || (
          <span className="italic text-gray-400">Chưa cập nhật</span>
        )}
      </span>
    );
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <Card className="w-full max-w-2xl bg-white shadow-lg rounded-lg">
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
                  {renderAddress(farm.address)}
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

            {/* Mô tả */}
            <div>
              <div className="text-xs font-bold text-gray-600 uppercase mb-2 tracking-wide">
                Mô tả
              </div>
              <div className="text-base text-black">
                {farm.description || (
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
