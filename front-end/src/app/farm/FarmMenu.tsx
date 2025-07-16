import React from "react";

interface Props {
  selected: string;
  onSelect: (key: string) => void;
}

export default function FarmMenu({ selected, onSelect }: Props) {
  return (
    <div className="w-1/4 min-w-[200px] border-r pr-4">
      <ul className="flex flex-col gap-2">
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded ${selected === "farm-info" ? "bg-gray-200 dark:bg-gray-700 font-bold" : ""}`}
            onClick={() => onSelect("farm-info")}
          >
            Thông tin nông trại
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded ${selected === "plants" ? "bg-gray-200 dark:bg-gray-700 font-bold" : ""}`}
            onClick={() => onSelect("plants")}
          >
            Cây trồng
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded ${selected === "fertilizers" ? "bg-gray-200 dark:bg-gray-700 font-bold" : ""}`}
            onClick={() => onSelect("fertilizers")}
          >
            Phân bón
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded ${selected === "schedule" ? "bg-gray-200 dark:bg-gray-700 font-bold" : ""}`}
            onClick={() => onSelect("schedule")}
          >
            Lịch chăm sóc cây trồng
          </button>
        </li>
      </ul>
    </div>
  );
}