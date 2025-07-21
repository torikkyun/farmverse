import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "picsum.photos",
      "loremflickr.com",
      "api.dicebear.com",
      "th.bing.com",
      "bbt.1cdn.vn",
      "songgianh.com.vn",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "images.pexels.com",
      "cdn.pixabay.com",
      "cayxanhgiapham.com",
    ],
  },
  dangerouslyAllowSVG: true,
};

export default nextConfig;
