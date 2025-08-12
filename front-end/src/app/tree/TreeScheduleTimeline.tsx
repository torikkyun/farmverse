import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ScheduleMonth = {
  month: number;
  activities: string[];
};

export function TreeScheduleTimeline({
  rentedTreeId,
}: {
  rentedTreeId: string;
}) {
  const [schedule, setSchedule] = useState<ScheduleMonth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      const userStr = localStorage.getItem("user");
      const userObj = userStr ? JSON.parse(userStr) : null;
      const token = userObj?.accessToken;
      const res = await fetch(`${API_URL}/rented-trees/${rentedTreeId}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      setSchedule(
        (data.data?.rentedTree?.schedule || []).sort(
          (a: ScheduleMonth, b: ScheduleMonth) => a.month - b.month
        )
      );
      setLoading(false);
    };
    fetchSchedule();
  }, [rentedTreeId]);

  if (loading) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center space-y-4 p-8">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 text-sm font-medium text-center max-w-xs">
          Đang tải lịch trình chăm sóc...
        </p>
      </div>
    );
  }

  if (!schedule.length) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center p-8">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
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
        <h3 className="text-xl font-bold text-black mb-3 text-center">
          Chưa có lịch trình
        </h3>
        <p className="text-gray-600 text-center max-w-sm leading-relaxed">
          Hiện tại chưa có lịch chăm sóc nào được thiết lập cho cây này.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] flex flex-col bg-white">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22V12m0 0c-4.418 0-8-2.239-8-5s3.582-5 8-5 8 2.239 8 5-3.582 5-8 5zm0 0v10"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black">Lịch trình chăm sóc</h2>
        </div>
        <p className="text-gray-600 ml-11">
          Theo dõi các hoạt động chăm sóc cây theo từng tháng
        </p>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(500px - 120px)" }}
      >
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          {/* Timeline */}
          <div className="relative pb-8">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-8 w-0.5 bg-gray-300"></div>

            <div className="space-y-6 sm:space-y-8">
              {schedule.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-2 sm:left-6 top-4 w-4 h-4 bg-black rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Content */}
                  <div className="ml-12 sm:ml-20">
                    {/* Month badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-sm font-semibold mb-3">
                      Tháng {item.month}
                    </div>

                    {/* Activities card */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300">
                      <h3 className="text-base sm:text-lg font-bold text-black mb-3">
                        Hoạt động chăm sóc
                      </h3>

                      <div className="space-y-2">
                        {item.activities.map((activity, activityIdx) => (
                          <div
                            key={activityIdx}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-800 text-sm sm:text-base leading-relaxed">
                              {activity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
