import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Import dữ liệu nông trại từ file market
import { FARMS_MARKET } from "@/data/market";

interface FarmerFarmCardProps {
  farmId: string; // Truyền vào id nông trại muốn hiển thị
}

export default function FarmerFarmCard({ farmId }: FarmerFarmCardProps) {
  console.log("farmId:", farmId);
  console.log("FARMS_MARKET:", FARMS_MARKET);

  // Tìm nông trại theo id từ dữ liệu file market
  const farm = FARMS_MARKET.find((f) => f.id === farmId);

  if (!farm) {
    return (
      <div className="flex justify-center items-center w-full min-h-[60vh]">
        <Card className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-2xl rounded-3xl p-0 sm:p-0 transition-all duration-300">
          <CardHeader className="pt-8 pb-2 px-8">
            <CardTitle className="text-4xl font-extrabold text-center text-black dark:text-white tracking-tight mb-2">
              Không tìm thấy nông trại
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-10 pt-2">
            <div className="text-center text-gray-500 dark:text-gray-400">
              Vui lòng kiểm tra lại thông tin hoặc chọn nông trại khác.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <Card className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-2xl rounded-3xl p-0 sm:p-0 transition-all duration-300">
        <CardHeader className="pt-8 pb-2 px-8">
          <CardTitle className="text-4xl font-extrabold text-center text-black dark:text-white tracking-tight mb-2">
            {farm.name}
          </CardTitle>
          {farm.user?.name && (
            <div className="text-gray-600 dark:text-gray-300 text-lg text-center mb-2">
              Chủ nông trại: {farm.user.name}
            </div>
          )}
        </CardHeader>
        <CardContent className="px-8 pb-10 pt-2">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10">
              <div className="flex-1 mb-4 sm:mb-0">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 tracking-widest">
                  Địa chỉ
                </div>
                <div className="text-lg text-black dark:text-white font-semibold">
                  {farm.location || (
                    <span className="italic text-gray-400">Chưa cập nhật</span>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 tracking-widest">
                  Diện tích
                </div>
                <div className="text-lg text-black dark:text-white font-semibold">
                  {farm.size ? (
                    `${farm.size} ha`
                  ) : (
                    <span className="italic text-gray-400">Chưa cập nhật</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 tracking-widest">
                Ảnh
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(farm.images) && farm.images.length > 0 ? (
                  farm.images.map((img, idx) =>
                    img ? (
                      <a
                        key={idx}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline break-all hover:text-blue-800 dark:hover:text-blue-200 transition"
                      >
                        {img}
                      </a>
                    ) : null
                  )
                ) : (
                  <span className="italic text-gray-400">Chưa cập nhật</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 tracking-widest">
                Cây trồng
              </div>
              <div className="text-lg text-black dark:text-white font-semibold">
                {farm.crops && farm.crops.length > 0 ? (
                  farm.crops.join(", ")
                ) : (
                  <span className="italic text-gray-400">Chưa cập nhật</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
