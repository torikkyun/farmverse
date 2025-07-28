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
      <div className="text-center text-gray-500 py-8 flex flex-col items-center gap-2">
        <svg
          className="w-7 h-7 text-gray-400 animate-spin"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span>Đang lấy dữ liệu lịch trình, vui lòng chờ trong giây lát...</span>
      </div>
    );
  }

  if (!schedule.length) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-7 h-7 text-gray-400"
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
        <h4 className="text-base font-semibold text-gray-900 mb-2">
          Chưa có lịch trình
        </h4>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Hiện tại chưa có lịch chăm sóc nào được thiết lập cho cây này.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading with icon */}
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-left justify-left gap-2">
        <svg
          className="w-6 h-6 text-green-600"
          width="20"
          height="20"
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
        Lịch trình chăm sóc cây
      </h3>
      <div
        className="relative py-3"
        style={{ maxHeight: 440, overflowY: "auto" }}
      >
        {/* Timeline line chạy xuyên suốt */}
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            left: 25, // tương đương left-8
            top: 0,
            bottom: 0,
            width: "3px",
            height: "205vh",
            background: "#a3a3a3", // gray-400
            borderRadius: "9999px",
            zIndex: 0,
          }}
        ></div>
        <div className="flex flex-col gap-10">
          {schedule.map((item, idx) => (
            <div key={idx} className="relative flex items-center min-h-[100px]">
              {/* Dot */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-700 shadow flex items-center justify-center"></div>
              </div>
              {/* Label tháng */}
              <div className="absolute left-12 top-1/2 -translate-y-1/2 z-10">
                <div className="px-3 py-1 bg-gray-50 border border-gray-300 rounded-md text-xs font-semibold text-gray-800 shadow whitespace-nowrap">
                  Tháng {item.month}
                </div>
              </div>
              {/* Card nội dung */}
              <div className="ml-32 flex-1">
                <div
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200"
                  style={{ minWidth: 200, maxWidth: 400 }}
                >
                  <div className="font-bold text-gray-900 mb-2 text-base">
                    Hoạt động tháng {item.month}
                  </div>
                  <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                    {item.activities.map((activity, activityIdx) => (
                      <li key={activityIdx}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
