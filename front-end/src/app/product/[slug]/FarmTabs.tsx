import { useEffect, useState } from "react";
import { getFarmSchedules } from "./farmScheduleApi";
import TabMenu from "../components/tab-menu";
import NFTCard from "../components/nft-card";
import DungCard from "../components/dung-card";

type NFTItem = {
  id: number;
  image: string;
  name: string;
  price: number;
};

type Schedule = {
  id: string;
  name: string;
  date: string;
};

interface Props {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  items: NFTItem[];
  dungs: NFTItem[];
  selectedItems: number[];
  handleSelect: (id: number, type: "plant" | "dung") => void; // sửa lại
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

  // State cho lịch trình farm
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [errorSchedule, setErrorSchedule] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 2 && farmId) {
      setLoadingSchedule(true);
      getFarmSchedules(String(farmId))
        .then((data) => {
          const tasks = Array.isArray(data?.data?.schedule?.tasks)
            ? data.data.schedule.tasks
            : [];
          setSchedules(tasks);
          setErrorSchedule(null);
        })
        .catch(() => setErrorSchedule("Không lấy được lịch chăm sóc!"))
        .finally(() => setLoadingSchedule(false));
    }
  }, [activeTab, farmId]);

  return (
    <>
      <TabMenu
        tabs={[
          { label: "Cây trồng" },
          { label: "Phân bón" },
          { label: "Lịch trình farm" },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 p-6 bg-white">
        <div>
          {activeTab === 2 ? (
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-2">
                Lịch chăm sóc cây trồng
              </h2>
              {loadingSchedule ? (
                <div>Đang tải...</div>
              ) : errorSchedule ? (
                <div className="text-red-500">{errorSchedule}</div>
              ) : schedules.length === 0 ? (
                <div>Không có lịch chăm sóc nào.</div>
              ) : (
                <ul className="list-disc pl-5">
                  {schedules.map((task: Schedule) => (
                    <li key={task.id}>
                      {task.name} - {task.date}
                    </li>
                  ))}
                </ul>
              )}
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
        </div>
      </main>
    </>
  );
}
