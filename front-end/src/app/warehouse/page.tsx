import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const nftItems = [
  {
    name: "NFT Sách quý",
    code: "NFT-001",
    amount: 1,
    unit: "Item",
    status: "Còn hàng",
    img: "https://api.dicebear.com/7.x/icons/svg?seed=book&backgroundColor=ffffff,000000&backgroundType=solid",
  },
  {
    name: "NFT Hòm báu",
    code: "NFT-002",
    amount: 2,
    unit: "Item",
    status: "Còn hàng",
    img: "https://api.dicebear.com/7.x/icons/svg?seed=chest&backgroundColor=ffffff,000000&backgroundType=solid",
  },
  {
    name: "NFT Khiên bạc",
    code: "NFT-003",
    amount: 0,
    unit: "Item",
    status: "Hết hàng",
    img: "https://api.dicebear.com/7.x/icons/svg?seed=shield&backgroundColor=ffffff,000000&backgroundType=solid",
  },
  {
    name: "NFT Kiếm đen",
    code: "NFT-004",
    amount: 1,
    unit: "Item",
    status: "Đã xuất kho",
    img: "https://api.dicebear.com/7.x/icons/svg?seed=sword&backgroundColor=ffffff,000000&backgroundType=solid",
  },
  {
    name: "NFT Vương miện",
    code: "NFT-005",
    amount: 3,
    unit: "Item",
    status: "Còn hàng",
    img: "https://api.dicebear.com/7.x/icons/svg?seed=crown&backgroundColor=ffffff,000000&backgroundType=solid",
  },
];

export default function WarehousePage() {
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
        <div className="flex flex-1 flex-col bg-white dark:bg-black min-h-screen transition-colors">
          <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-6 flex-1 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 w-full">
                <button className="bg-black dark:bg-white text-white dark:text-black font-bold px-6 py-2 rounded-full shadow hover:scale-105 transition border border-black dark:border-white whitespace-nowrap w-full sm:w-auto">
                  + Thêm vật phẩm NFT
                </button>
                <input
                  type="text"
                  placeholder="Tìm kiếm NFT, mã vật phẩm..."
                  className="flex-1 min-w-[140px] sm:min-w-[220px] px-4 py-2 rounded-full bg-gray-100 dark:bg-neutral-900 text-black dark:text-white border border-gray-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
                <select className="w-full sm:w-auto px-4 py-2 rounded-full bg-gray-100 dark:bg-neutral-900 text-black dark:text-white border border-gray-300 dark:border-neutral-700 focus:outline-none">
                  <option>Lọc theo trạng thái</option>
                  <option>Còn hàng</option>
                  <option>Hết hàng</option>
                  <option>Đã xuất kho</option>
                </select>
              </div>
            </div>
            <div className="rounded-xl shadow border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-neutral-800 text-black dark:text-white">
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap w-20">
                        NFT
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Tên vật phẩm
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Mã vật phẩm
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Số lượng
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Đơn vị
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                        Trạng thái
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nftItems.map((item, i) => (
                      <TableRow
                        key={item.code}
                        className="border-t border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                      >
                        <TableCell className="px-4 py-3 whitespace-nowrap w-20">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg border border-black dark:border-white object-cover bg-white dark:bg-black"
                          />
                        </TableCell>
                        <TableCell className="px-4 py-3 font-bold text-black dark:text-white whitespace-nowrap">
                          {item.name}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-black dark:text-white whitespace-nowrap text-center">
                          {item.code}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-black dark:text-white whitespace-nowrap text-center">
                          {item.amount}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-black dark:text-white whitespace-nowrap text-center">
                          {item.unit}
                        </TableCell>
                        <TableCell className="px-4 py-3 whitespace-nowrap text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold shadow whitespace-nowrap
                              ${
                                item.status === "Còn hàng"
                                  ? "bg-black text-white dark:bg-white dark:text-black"
                                  : item.status === "Hết hàng"
                                  ? "bg-gray-300 text-black dark:bg-neutral-700 dark:text-white"
                                  : "bg-gray-100 text-black dark:bg-neutral-800 dark:text-white"
                              }
                            `}
                          >
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            {/* Phân trang */}
            <div className="flex flex-col items-center gap-2 py-4 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 rounded-b-xl shadow-sm">
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-full text-xs bg-black dark:bg-white text-white dark:text-black font-semibold border border-black dark:border-white shadow hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Trước
                </button>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-semibold text-xs shadow border border-gray-200 dark:border-neutral-700">
                  1 / 1
                </span>
                <button className="px-3 py-1.5 rounded-full text-xs bg-black dark:bg-white text-white dark:text-black font-semibold border border-black dark:border-white shadow hover:bg-gray-800 dark:hover:bg-gray-200 transition">
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
