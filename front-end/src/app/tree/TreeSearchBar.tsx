import { Search } from "lucide-react";

interface TreeSearchBarProps {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  setPage: (page: number) => void;
}

export default function TreeSearchBar({
  search,
  setSearch,
  status,
  setStatus,
  setPage,
}: TreeSearchBarProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <div className="relative flex-1 w-full sm:min-w-[320px]">
            <input
              type="text"
              placeholder="Tìm kiếm cây, chủ vườn..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-4 h-4" />
          </div>
          <select
            className="w-auto px-4 py-3 rounded-lg bg-white text-black focus:outline-none"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="GROWING">Đang thuê</option>
            <option value="READY_TO_HARVEST">Sắp hết hạn</option>
            <option value="HARVESTING">Đã hết hạn</option>
            <option value="HARVESTED">Đã thu hoạch</option>
          </select>
        </div>
      </div>
    </div>
  );
}
