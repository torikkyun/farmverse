import React from "react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white mb-8"></div>
      <div className="text-white text-2xl font-bold mb-2">
        Đang xử lý hợp đồng...
      </div>
      <div className="text-white text-lg">
        FarmVerse đang tạo hợp đồng thông minh trên blockchain 🌱
      </div>
    </div>
  );
}
