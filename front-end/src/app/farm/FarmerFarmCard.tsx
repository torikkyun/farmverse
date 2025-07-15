import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FarmerFarmCardProps {
  farm: {
    name: string;
    description?: string;
    location?: string;
    size?: string | number;
    images?: string[] | string;
  };
}

export default function FarmerFarmCard({ farm }: FarmerFarmCardProps) {
  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <Card className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-2xl rounded-3xl p-0 sm:p-0 transition-all duration-300">
        <CardHeader className="pt-8 pb-2 px-8">
          <CardTitle className="text-4xl font-extrabold text-center text-black dark:text-white tracking-tight mb-2">
            {farm.name}
          </CardTitle>
          {farm.description && (
            <div className="text-gray-600 dark:text-gray-300 text-lg text-center mb-4">
              {farm.description}
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
                    `${
                      typeof farm.size === "number"
                        ? farm.size.toFixed(0)
                        : Number(farm.size).toFixed(0)
                    } ha`
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
                {Array.isArray(farm.images) ? (
                  farm.images.length > 0 ? (
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
                  )
                ) : farm.images ? (
                  <a
                    href={farm.images}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline break-all hover:text-blue-800 dark:hover:text-blue-200 transition"
                  >
                    {farm.images}
                  </a>
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
