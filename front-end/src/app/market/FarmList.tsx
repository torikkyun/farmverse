import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Farm } from "./types/market";
import {
  MapPin,
  User,
  Ruler,
  Star,
  TreePine,
  ChevronRight,
} from "lucide-react";

export default function FarmList({
  farms,
  viewMode = "grid",
}: {
  farms: Farm[];
  viewMode?: "grid" | "list";
}) {
  return (
    <div className="@container/main flex flex-1 flex-col gap-8">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-3xl"></div>
        <div className="relative p-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative p-3 bg-black dark:bg-white rounded-2xl shadow-lg">
                <TreePine className="w-8 h-8 text-white dark:text-black" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-black dark:text-white">
                Trang trại nổi bật
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Những trang trại uy tín nhất tuần từ Farmverse
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farms Grid */}
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            : "grid-cols-1 gap-6"
        }`}
      >
        {farms.map((farm, idx) => (
          <Link
            key={farm.id || idx}
            href={`/product/${farm.id}`}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
          >
            <Card className="relative h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden rounded-2xl">
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl"></div>

              <CardContent className="p-0 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                  <Image
                    src={
                      farm.images?.[0] ||
                      farm.user.avatar ||
                      "/images/default-farm.jpg"
                    }
                    alt={farm.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    priority
                  />

                  {/* Size Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-green-500 text-white border-0 px-3 py-1.5 flex items-center gap-2 font-semibold text-sm shadow-md transform group-hover:scale-105 transition-transform duration-300">
                      <Ruler className="w-4 h-4" />
                      {farm.size.toLocaleString()} ha
                    </Badge>
                  </div>

                  {/* Owner info overlay */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="bg-black/90 dark:bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-white dark:text-black" />
                        <span className="font-bold text-sm text-white dark:text-black">
                          {farm.user.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white dark:bg-gray-900">
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-black dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {farm.name}
                    </h3>

                    {/* Location Info */}
                    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg">
                          <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Địa điểm:
                        </span>
                      </div>
                      <span className="font-semibold text-base text-black dark:text-white text-right max-w-[50%] line-clamp-1">
                        {[farm.address?.province].filter(Boolean).join(", ") ||
                          "Chưa cập nhật"}
                      </span>
                    </div>
                  </div>

                  {/* Action Area */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      className="w-full group/btn hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-black dark:text-white font-semibold group-hover/btn:text-gray-700 dark:group-hover/btn:text-gray-300 flex items-center gap-2">
                        Xem trang trại
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {farms.length === 0 && (
        <div className="text-center py-24">
          <div className="mb-8">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded-full blur-xl opacity-30"></div>
              <div className="relative p-8 bg-gray-100 dark:bg-gray-800 rounded-full shadow-xl border border-gray-200 dark:border-gray-700">
                <TreePine className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
            Chưa có trang trại nào
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Hãy quay lại sau để khám phá những trang trại nổi bật.
          </p>
        </div>
      )}
    </div>
  );
}
