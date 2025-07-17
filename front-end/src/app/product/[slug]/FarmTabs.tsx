import React, { useEffect, useState } from "react";
import TabMenu from "../components/tab-menu";
import NFTCard from "../components/nft-card";
import DungCard from "../components/dung-card";
import { Calendar } from "@/components/ui/calendar";
import { vi } from "date-fns/locale";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Lấy danh sách ngày có lịch trình
  const scheduleDates = schedules.map((s) =>
    new Date(s.startTime).toDateString()
  );

  // Lọc lịch trình theo ngày chọn
  const selectedSchedules = selectedDate
    ? schedules.filter(
        (s) =>
          new Date(s.startTime).toDateString() === selectedDate.toDateString()
      )
    : [];

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
      <TabMenu
        tabs={[
          { label: "Cây trồng" },
          { label: "Phân bón" },
          { label: "Lịch trình chăm sóc" },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 p-6 bg-white">
        {activeTab === 2 ? (
          <div className="flex flex-col md:flex-row gap-5 items-stretch">
            <div className="bg-white dark:bg-black rounded-xl shadow p-2 sm:p-4 md:w-[320px] flex-shrink-0 flex flex-col items-center min-h-[400px]">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={vi}
                modifiers={{
                  hasSchedule: (date) =>
                    scheduleDates.includes(date.toDateString()),
                }}
                modifiersClassNames={{
                  hasSchedule:
                    "bg-black text-white dark:bg-white dark:text-black font-bold rounded-lg w-8 h-8 text-sm flex items-center justify-center mx-1",
                  selected:
                    "text-white font-bold rounded-lg w-8 h-8 text-sm flex items-center justify-center mx-1",
                }}
                className="w-full"
              />
            </div>

            <div className="bg-white dark:bg-black rounded-xl shadow p-2 sm:p-4 flex-1 min-h-[400px] flex flex-col justify-start">
              {loading && (
                <div className="text-black">Đang tải lịch trình...</div>
              )}
              {error && <div className="text-red-600">{error}</div>}
              {!loading && !error && (
                <>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
                    {selectedDate
                      ? `Công việc ngày ${selectedDate.toLocaleDateString()}:`
                      : "Bạn hãy chọn ngày để xem công việc"}
                  </h3>

                  {selectedDate && selectedSchedules.length === 0 && (
                    <div className="text-gray-500 dark:text-gray-400 italic">
                      Không có lịch trình nào.
                    </div>
                  )}

                  {selectedDate && selectedSchedules.length > 0 && (
                    <div className="space-y-4 sm:space-y-6">
                      {selectedSchedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="p-3 sm:p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
                        >
                          <div className="font-semibold text-base mb-2">
                            <span
                              className={`inline-block w-2 h-2 rounded-full mr-2 align-middle ${
                                schedule.status ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></span>
                            {schedule.name}
                          </div>
                          <div className="mb-1">
                            <span className="font-medium">Mô tả:</span>{" "}
                            {schedule.description}
                          </div>
                          <div className="mb-1">
                            <span className="font-medium">Thời gian:</span>{" "}
                            {new Date(schedule.startTime).toLocaleDateString()}{" "}
                            - {new Date(schedule.endTime).toLocaleDateString()}
                          </div>
                          <div className="mb-1">
                            <span className="font-medium">Trạng thái:</span>{" "}
                            <span
                              className={
                                schedule.status
                                  ? "text-green-600 font-semibold"
                                  : "text-red-600 font-semibold"
                              }
                            >
                              {schedule.status
                                ? "Đã kết thúc"
                                : "Đang tiến hành"}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Nông trại:</span>{" "}
                            {schedule.farm?.name ||
                              schedule.farmName ||
                              "Chưa xác định"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
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
