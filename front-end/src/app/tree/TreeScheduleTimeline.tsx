import { Calendar } from "lucide-react";
import { getStageColor, getStageIcon } from "./treeUtils";
import { ScheduleItem } from "./types";
import React from "react";

export function TreeScheduleTimeline({
  schedule,
}: {
  schedule?: ScheduleItem[];
}) {
  if (!schedule || schedule.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Calendar className="text-indigo-600" size={20} />
          Lịch trình chăm sóc
        </h3>
        <div className="text-center text-gray-500 dark:text-gray-400 italic py-8">
          Không có lịch trình nào.
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <Calendar className="text-indigo-600" size={20} />
        Lịch trình chăm sóc
      </h3>
      <div
        className="flex-1 overflow-y-auto px-2 py-4 scrollbar-hide"
        style={{ maxHeight: 420, minHeight: 0 }}
      >
        {schedule
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((item, idx) => {
            const stageColors = getStageColor(item.stage);
            const isLast = idx === schedule.length - 1;
            return (
              <div key={idx} className="relative flex">
                {!isLast && (
                  <div
                    className={`absolute left-4 top-8 w-0.5 h-full ${stageColors.line} z-0`}
                    style={{ height: "calc(100% + 12px)" }}
                  />
                )}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full ${stageColors.dot} flex items-center justify-center shadow-md`}
                  >
                    <div className="text-white">
                      {React.cloneElement(getStageIcon(item.stage), {
                        size: 16,
                        className: "text-white",
                      })}
                    </div>
                  </div>
                </div>
                <div className="ml-4 pb-6 flex-1 min-w-0">
                  <div
                    className={`p-4 rounded-lg ${stageColors.bg} border ${stageColors.border}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                        {item.stage === "seedling"
                          ? "Gieo hạt"
                          : item.stage === "care"
                          ? "Chăm sóc"
                          : item.stage === "protect"
                          ? "Bảo vệ"
                          : item.stage === "harvest"
                          ? "Thu hoạch"
                          : "Khác"}
                      </h4>
                      <span className="text-xs bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-2 py-1 rounded flex-shrink-0 ml-2">
                        {new Date(item.date).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap leading-relaxed">
                      {item.action}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
