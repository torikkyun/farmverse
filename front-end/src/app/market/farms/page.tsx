"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  TreePine,
  Loader2,
  AlertCircle,
  Grid3x3,
  Search,
  Star,
  MapPin,
  User,
  Ruler,
  ChevronRight,
} from "lucide-react";
import { Farm } from "../types/market";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/["']/g, "") || "";

export default function AllFarmsPage() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/farms`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không thể tải dữ liệu");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Debug để kiểm tra
        setFarms(data?.data?.farms || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching farms:", err);
        setError(err.message || "Có lỗi xảy ra");
        setFarms([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="w-full flex flex-1 flex-col bg-white min-h-screen">
          <div className="flex-1 px-4 md:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6 animate-in fade-in duration-700">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                    <TreePine className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-black uppercase tracking-wide hover:scale-105 transition-transform duration-300">
                      Tất cả nông trại
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 text-gray-400 fill-gray-400" />
                      <span className="text-gray-600 font-medium">
                        Khám phá các nông trại uy tín và chất lượng
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="flex items-center gap-6 bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-black transition-colors duration-300 animate-in slide-in-from-bottom duration-500 delay-300">
                  <div className="flex items-center gap-3">
                    <Grid3x3 className="w-6 h-6 text-black" />
                    <span className="text-lg font-bold text-black">
                      {loading
                        ? "Đang tải..."
                        : `${farms.length} nông trại có sẵn`}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-3">
                    <Search className="w-6 h-6 text-gray-600" />
                    <span className="text-gray-600 font-medium">
                      Hiển thị tất cả nông trại
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <Card className="bg-white border-3 border-gray-200 rounded-3xl shadow-xl p-8 hover:border-black hover:shadow-2xl transition-all duration-500">
                {loading ? (
                  <div className="text-center py-16 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Loader2 className="w-10 h-10 text-black animate-spin" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                      Đang tải nông trại...
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Vui lòng chờ trong giây lát
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center py-16 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-600 mb-3">
                      Oops! Có lỗi xảy ra
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors duration-300 hover:scale-105"
                    >
                      Thử lại
                    </button>
                  </div>
                ) : farms.length === 0 ? (
                  <div className="text-center py-16 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <TreePine className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                      Chưa có nông trại nào
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Hãy quay lại sau để khám phá thêm nông trại mới
                    </p>
                  </div>
                ) : (
                  <div className="@container/main flex flex-1 flex-col gap-8">
                    {/* Header Section giống FarmList */}
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
                              Tất cả nông trại ({farms.length} trang trại)
                            </h2>
                            <div className="flex items-center gap-2 mt-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <p className="text-lg text-gray-600 dark:text-gray-400">
                                Khám phá những trang trại uy tín từ Farmverse
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Farms Grid giống FarmList */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    farm.user?.avatar ||
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
                                    {farm.size?.toLocaleString() || 0} ha
                                  </Badge>
                                </div>

                                {/* Owner info overlay */}
                                <div className="absolute bottom-4 left-4 z-20">
                                  <div className="bg-black/90 dark:bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                                    <div className="flex items-center gap-1.5">
                                      <User className="w-3.5 h-3.5 text-white dark:text-black" />
                                      <span className="font-bold text-sm text-white dark:text-black">
                                        {farm.user?.name || "Chưa cập nhật"}
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
                                      {[farm.address?.province]
                                        .filter(Boolean)
                                        .join(", ") || "Chưa cập nhật"}
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
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
