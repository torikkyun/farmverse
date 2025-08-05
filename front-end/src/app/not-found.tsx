"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number with Farm Icon */}
        <div className="mb-8 relative">
          <h1 className="text-8xl sm:text-9xl font-bold text-gray-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Leaf className="w-16 h-16 text-black opacity-80" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
            Trang không tìm thấy
          </h2>
          <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed">
            Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển. Hãy quay
            lại hoặc khám phá các tính năng khác của Farmverse.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="px-5 py-2.5 border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <Link href="/">
            <Button className="w-full sm:w-auto px-5 py-2.5 bg-black text-white hover:bg-gray-800 transition-all duration-200">
              <Home className="w-4 h-4 mr-2" />
              Trang chủ
            </Button>
          </Link>

          <Link href="/market/search">
            <Button
              variant="outline"
              className="px-5 py-2.5 border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all duration-200"
            >
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <p className="text-sm text-gray-500 mb-4 font-medium">
            Trang phổ biến:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
            <Link
              href="/market"
              className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-black hover:text-black transition-all duration-200 hover:shadow-sm"
            >
              Chợ nông sản
            </Link>
            <Link
              href="/farm"
              className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-black hover:text-black transition-all duration-200 hover:shadow-sm"
            >
              Nông trại
            </Link>
            <Link
              href="/tree"
              className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-black hover:text-black transition-all duration-200 hover:shadow-sm"
            >
              Cây trồng
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Cần hỗ trợ?
            <a
              href="mailto:support@farmverse.com"
              className="text-black hover:underline ml-1 font-medium"
            >
              Liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
