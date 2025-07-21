import React, { useEffect, useState } from "react";
import TabMenu from "../components/tab-menu";
import NFTCard from "../components/nft-card";
import DungCard from "../components/dung-card";

type Schedule = {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: boolean;
  farm?: {
    name: string;
  };
  farmName?: string;
};

type NFTItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity?: number;
};

interface Props {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  items: NFTItem[];
  dungs: NFTItem[];
  selectedItems: number[];
  handleSelect: (id: number, type: "plant" | "dung") => void;
  farmId?: string;
}

export default function FarmTabs({
  activeTab,
  setActiveTab,
  items,
  dungs,
  selectedItems,
  handleSelect,
  farmId,
}: Props) {
  const data = activeTab === 0 ? items : dungs;
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 2 && farmId) {
      setLoading(true);
      setError(null);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      fetch(`${apiUrl}/schedules/farm/${farmId}`)
        .then((res) => res.json())
        .then((json) => {
          setSchedules(json.data?.schedules || []);
        })
        .catch(() => setError("Không thể tải lịch trình"))
        .finally(() => setLoading(false));
    }
  }, [activeTab, farmId]);

  return (
    <>
      <div className="sticky top-0 z-30 bg-white dark:bg-black">
        <TabMenu
          tabs={[
            { label: "Cây trồng" },
            { label: "Phân bón" },
            { label: "Lịch trình chăm sóc" },
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <main className="flex-1 p-6 bg-white">
        {activeTab === 2 ? (
          <div className="flex flex-col md:flex-row gap-5 items-stretch">
            <div className="bg-white dark:bg-black rounded-xl shadow p-2 sm:p-4 flex-1 min-h-[400px] flex flex-col justify-start">
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
                Lịch chăm sóc cây trồng
              </h3>
              {loading && <div>Đang tải...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {schedules.length === 0 && !loading && (
                <div className="text-gray-500 dark:text-gray-400 italic">
                  Không có lịch trình nào.
                </div>
              )}
              {schedules.length > 0 && !loading && (
                <div className="relative pl-8">
                  {/* Timeline vertical line */}
                  <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
                  {schedules
                    .sort(
                      (a, b) =>
                        new Date(a.startTime).getTime() -
                        new Date(b.startTime).getTime()
                    )
                    .map((schedule) => (
                      <div
                        key={schedule.id}
                        className="relative flex items-start mb-10 group"
                      >
                        {/* Timeline dot with date */}
                        <div className="absolute left-2 top-8 flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black shadow transition-transform group-hover:scale-110"></div>
                          <span className="mt-2 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                            {new Date(schedule.startTime).getDate()}/
                            {new Date(schedule.startTime).getMonth() + 1}
                          </span>
                        </div>
                        {/* Timeline content */}
                        <div className="ml-12 flex-1 p-5 border border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-black shadow-sm transition group-hover:shadow-lg group-hover:border-black dark:group-hover:border-white">
                          <div className="font-bold text-lg mb-2 text-black dark:text-white">
                            {schedule.name}
                          </div>
                          <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Mô tả:</span>{" "}
                            {schedule.description}
                          </div>
                          <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Thời gian:</span>{" "}
                            {new Date(schedule.startTime).toLocaleDateString()}{" "}
                            - {new Date(schedule.endTime).toLocaleDateString()}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Nông trại:</span>{" "}
                            {schedule.farm?.name ||
                              schedule.farmName ||
                              "Chưa xác định"}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((item) =>
              activeTab === 0 ? (
                <NFTCard
                  key={item.id}
                  item={item}
                  selected={selectedItems.includes(item.id)}
                  onSelect={() => handleSelect(item.id, "plant")}
                />
              ) : (
                <DungCard
                  key={item.id}
                  dungs={item}
                  selected={selectedItems.includes(item.id)}
                  onSelect={() => handleSelect(item.id, "dung")}
                />
              )
            )}
          </div>
        )}
      </main>
    </>
  );
}
