import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function FarmPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="#60a5fa"
                    d="M12 2C7.03 2 2.5 6.03 2.5 11c0 4.97 4.53 9 9.5 9s9.5-4.03 9.5-9c0-4.97-4.53-9-9.5-9Zm0 16c-3.87 0-7-3.13-7-7 0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.87-3.13 7-7 7Z"
                  />
                  <path
                    fill="#60a5fa"
                    d="M12 6a5 5 0 1 0 0 10A5 5 0 0 0 12 6Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                  />
                </svg>
                Quản lý Nông Trại NFT (Admin)
              </h1>
              <button className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition">
                + Thêm NFT mới
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm NFT, chủ sở hữu..."
                className="flex-1 px-4 py-2 rounded-lg bg-[#23272f] text-white border border-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-3 py-2 rounded-lg bg-[#23272f] text-white border border-blue-900/30 focus:outline-none">
                <option>Lọc theo trạng thái</option>
                <option>Đang bán</option>
                <option>Đã bán</option>
                <option>Ẩn</option>
              </select>
            </div>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-blue-900/30 bg-[#18191A]">
              <table className="min-w-full text-sm text-left text-white">
                <thead>
                  <tr className="bg-[#23272f] text-blue-300">
                    <th className="px-4 py-3">Ảnh</th>
                    <th className="px-4 py-3">Tên NFT</th>
                    <th className="px-4 py-3">Chủ sở hữu</th>
                    <th className="px-4 py-3">Sản lượng</th>
                    <th className="px-4 py-3">Cấp</th>
                    <th className="px-4 py-3">Giá</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(8)].map((_, i) => (
                    <tr
                      key={i}
                      className="border-t border-blue-900/20 hover:bg-[#23272f] transition"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={`https://api.dicebear.com/7.x/bottts/svg?seed=farm${i}`}
                          alt="NFT"
                          className="w-10 h-10 rounded-lg border-2 border-blue-500 object-cover"
                        />
                      </td>
                      <td className="px-4 py-3 font-bold">Vật phẩm #{i + 1}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2">
                          <img
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=owner${i}`}
                            alt="owner"
                            className="w-6 h-6 rounded-full border border-blue-400"
                          />
                          user{i + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3">120</td>
                      <td className="px-4 py-3">
                        <span className="bg-gradient-to-r from-blue-500 to-green-400 text-xs px-2 py-0.5 rounded-full text-white font-bold shadow">
                          SR
                        </span>
                      </td>
                      <td className="px-4 py-3 text-green-400 font-bold">
                        0.{i + 2} ETH
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold shadow
                ${
                  i % 3 === 0
                    ? "bg-green-600/80"
                    : i % 3 === 1
                    ? "bg-yellow-500/80"
                    : "bg-gray-500/60"
                }
              `}
                        >
                          {i % 3 === 0
                            ? "Đang bán"
                            : i % 3 === 1
                            ? "Đã bán"
                            : "Ẩn"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold transition mr-2">
                          Sửa
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold transition">
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Phân trang giả lập */}
              <div className="flex justify-end items-center gap-2 px-4 py-3 bg-[#23272f] border-t border-blue-900/20">
                <button className="px-3 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition">
                  Trước
                </button>
                <span className="text-white/80">1 / 5</span>
                <button className="px-3 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
