import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    unoptimized: true, // Thêm dòng này để tắt tối ưu hóa hình ảnh
  },
  dangerouslyAllowSVG: true,
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua ESLint warning về img tag
  },
};

export default nextConfig;
