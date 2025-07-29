import React, { useMemo } from "react";
import TabMenu from "../components/tab-menu";
import NFTCard from "../components/nft-card";
import DungCard from "../components/dung-card";
import { NFTItem, DungItem } from "./types"; // Import cả 2 types
import { useFarmDetail } from "./useFarmDetail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type CareSchedule = {
  month: number;
  activities: string[];
};

interface Props {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  items: NFTItem[]; // Cây trồng
  dungs: DungItem[]; // Phân bón
  selectedItems: { id: string; quantity: number }[]; // <-- sửa lại kiểu này
  handleSelect: (id: string) => void;
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
  // Lấy thông tin farm từ API
  const { farm } = useFarmDetail(API_URL || "", farmId || "");

  // Lấy danh sách lịch chăm sóc từ API
  const schedules: CareSchedule[] = useMemo(() => {
    if (!farm?.schedule) return [];
    return farm.schedule.sort((a, b) => a.month - b.month);
  }, [farm]);

  return (
    <>
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
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

      <main className="flex-1 bg-gray-50 min-h-screen">
        {activeTab === 2 ? (
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header Section */}
              <div className="bg-black px-8 py-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-3xl text-white mb-2">
                      Lịch chăm sóc cây trồng
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Theo dõi và quản lý lịch trình chăm sóc cây trồng của{" "}
                      {farm?.name || "nông trại"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-12">
                {schedules.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Chưa có lịch trình
                    </h4>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">
                      Hiện tại chưa có lịch chăm sóc nào được thiết lập cho
                      trang trại này.
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1 top-0 w-1 h-full bg-gray-800 rounded-full"></div>

                    {schedules.map((schedule, idx) => (
                      <div
                        key={idx}
                        className="relative flex items-start mb-16 group"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-5 top-[40%] flex flex-col items-center z-10">
                          <div className="w-10 h-10 rounded-full bg-white border-4 border-black shadow-xl transition-all duration-300 group-hover:border-gray-800 group-hover:scale-110">
                            <div className="w-full h-full rounded-full bg-black group-hover:bg-gray-800 transition-all duration-300"></div>
                          </div>
                          <div className="mt-4 px-4 py-2 bg-gray-100 rounded-full shadow-sm">
                            <span className="text-sm font-bold text-black">
                              Tháng {schedule.month}
                            </span>
                          </div>
                        </div>

                        {/* Content card */}
                        <div className="ml-32 flex-1 bg-white border-2 border-gray-200 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-gray-400 group-hover:-translate-y-1">
                          <div className="flex items-start justify-between mb-8">
                            <div className="flex-1">
                              <h4 className="font-bold text-2xl text-gray-900 mb-3">
                                Hoạt động tháng {schedule.month}
                              </h4>
                              <div className="flex items-center gap-3 text-gray-500">
                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                  <svg
                                    className="w-4 h-4 text-gray-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <span className="text-base font-medium">
                                  Lịch trình chăm sóc
                                </span>
                              </div>
                            </div>
                            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center shadow-sm">
                              <svg
                                className="w-8 h-8 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>

                          <div className="space-y-5">
                            {schedule.activities.map(
                              (activity, activityIdx) => (
                                <div
                                  key={activityIdx}
                                  className="flex items-center gap-6 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors"
                                >
                                  <div className="w-4 h-4 bg-black rounded-full flex-shrink-0 shadow-sm"></div>
                                  <span className="text-gray-800 font-medium text-lg">
                                    {activity}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : activeTab === 0 ? (
          // Tab Cây trồng
          <div className="px-8 py-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {items.map((item, index) => (
                  <div
                    key={`nft-${item.id || index}`}
                    className="group transform hover:-translate-y-2 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <NFTCard
                      item={item}
                      selected={selectedItems.includes(item)}
                      onSelect={handleSelect}
                    />
                  </div>
                ))}
              </div>

              {items.length === 0 && (
                <div className="text-center py-24">
                  <div className="w-28 h-28 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    Chưa có cây trồng
                  </h4>
                  <p className="text-gray-500 text-xl max-w-md mx-auto">
                    Hiện tại chưa có cây trồng nào có sẵn.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Tab Phân bón
          <div className="px-8 py-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {dungs.map((dung, index) => (
                  <div
                    key={`dung-${dung.id || index}`}
                    className="group transform hover:-translate-y-2 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DungCard
                      dungs={dung}
                      selected={selectedItems.includes(dung)}
                      onSelect={handleSelect}
                    />
                  </div>
                ))}
              </div>

              {dungs.length === 0 && (
                <div className="text-center py-24">
                  <div className="w-28 h-28 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    Chưa có phân bón
                  </h4>
                  <p className="text-gray-500 text-xl max-w-md mx-auto">
                    Hiện tại chưa có phân bón nào có sẵn.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
