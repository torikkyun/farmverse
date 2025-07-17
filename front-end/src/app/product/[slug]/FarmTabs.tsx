import React, { useEffect, useState } from "react";
import TabMenu from "../components/tab-menu";
import NFTCard from "../components/nft-card";
import DungCard from "../components/dung-card";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle2, Circle } from "lucide-react";

type Schedule = {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: boolean;
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

function ScheduleCard({ schedule }: { schedule: Schedule }) {
  return (
    <div className="border border-black rounded-lg p-4 bg-white mb-4 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-base text-black">{schedule.name}</span>
        {schedule.status ? (
          <CheckCircle2 className="w-4 h-4 text-black" />
        ) : (
          <Circle className="w-4 h-4 text-gray-400" />
        )}
      </div>
      <p className="text-xs text-gray-700 mb-2">{schedule.description}</p>
      <div className="text-xs text-gray-500">
        <div>
          <span className="font-medium text-black">Bắt đầu:</span>{" "}
          {new Date(schedule.startTime).toLocaleString()}
        </div>
        <div>
          <span className="font-medium text-black">Kết thúc:</span>{" "}
          {new Date(schedule.endTime).toLocaleString()}
        </div>
        <div>
          <span className="font-medium text-black">Trạng thái:</span>{" "}
          <span className="text-black">
            {schedule.status ? "Đã hoàn thành" : "Chưa hoàn thành"}
          </span>
        </div>
      </div>
    </div>
  );
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
  const filteredSchedules = selectedDate
    ? schedules.filter(
        (s) =>
          new Date(s.startTime).toDateString() ===
          selectedDate.toDateString()
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
          <div className="flex gap-8">
            {/* Cột trái: Lịch */}
            <div className="bg-white rounded-lg p-4 w-[320px] shadow-md h-fit">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="bg-white text-black"
                modifiers={{
                  scheduled: (date) =>
                    scheduleDates.includes(date.toDateString()),
                }}
                modifiersClassNames={{
                  scheduled: "bg-gray-200 text-black",
                  selected: "bg-black text-white",
                  today: "bg-black",
                }}
              />
              <div className="mt-2 text-xs text-gray-700">
                <span className="inline-block w-3 h-3 bg-gray-200 rounded-full mr-1"></span>
                Ngày có công việc
              </div>
            </div>
            {/* Cột phải: Nội dung công việc */}
            <div className="flex-1 bg-white rounded-lg p-4 min-h-[400px] shadow-md">
              {loading && <div className="text-black">Đang tải lịch trình...</div>}
              {error && <div className="text-red-600">{error}</div>}
              {!loading && !error && (
                <>
                  {selectedDate ? (
                    <>
                      <div className="font-semibold text-lg mb-4 text-black">
                        Công việc ngày {selectedDate.toLocaleDateString("vi-VN")}:
                      </div>
                      {filteredSchedules.length > 0 ? (
                        filteredSchedules.map((schedule) => (
                          <ScheduleCard key={schedule.id} schedule={schedule} />
                        ))
                      ) : (
                        <div className="text-gray-500">Không có công việc nào cho ngày này.</div>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-500">Chọn ngày để xem công việc.</div>
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
