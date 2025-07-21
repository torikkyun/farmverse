import React, { useMemo } from "react";
import TabMenu from "../components/tab-menu";
import NFTCard from "../components/nft-card";
import DungCard from "../components/dung-card";
import { TREE_ITEMS } from "@/data/tree";

type CareSchedule = {
  month: number;
  activities: string[];
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

  // Lấy danh sách lịch chăm sóc từ cây trồng của farm hiện tại
  const schedules: CareSchedule[] = useMemo(() => {
    if (!farmId) return [];
    return TREE_ITEMS.filter((tree) => tree.farm === farmId).flatMap(
      (tree) => tree.careSchedule || []
    );
  }, [farmId]);

  // Thêm log để debug
  console.log("FarmTabs - farmId:", farmId);
  console.log("FarmTabs - TREE_ITEMS:", TREE_ITEMS);
  console.log("FarmTabs - schedules:", schedules);

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
              {schedules.length === 0 && (
                <div className="text-gray-500 dark:text-gray-400 italic">
                  Không có lịch trình nào.
                </div>
              )}
              {schedules.length > 0 && (
                <div className="relative pl-8">
                  <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
                  {schedules.map((schedule, idx) => (
                    <div
                      key={idx}
                      className="relative flex items-start mb-10 group"
                    >
                      <div className="absolute left-1 top-8 flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black shadow transition-transform group-hover:scale-110"></div>
                        <span className="mt-2 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                          Tháng {schedule.month}
                        </span>
                      </div>
                      <div className="ml-15 flex-1 p-5 border border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-black shadow-sm transition group-hover:shadow-lg group-hover:border-black dark:group-hover:border-white">
                        <div className="font-bold text-lg mb-2 text-black dark:text-white">
                          Hoạt động
                        </div>
                        <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                          {schedule.activities.join(", ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
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
