export default function TreeLoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-white mb-6"></div>
      <div className="text-white text-lg font-semibold mb-2">
        Đang xử lý thu hoạch...
      </div>
      <div className="text-white text-sm text-center max-w-md">
        Vui lòng chờ trong giây lát, hệ thống đang xác nhận thu hoạch và cập
        nhật dữ liệu.
      </div>
    </div>
  );
}
