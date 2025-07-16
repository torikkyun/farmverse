import React from "react";

interface Props {
  selected: string;
  onSelect: (key: string) => void;
}

export default function FarmMenu({ selected, onSelect }: Props) {
  return (
    <div className="fixed top-12 left-0 right-0 z-40 bg-white dark:bg-black border-b sm:static sm:z-auto sm:w-1/4 min-w-0 sm:border-b-0 sm:border-r pr-0 sm:pr-4 mb-4 sm:mb-0">
      <ul
        className="
          flex flex-row sm:flex-col gap-3 sm:gap-2 overflow-x-auto
          justify-start sm:justify-center
          items-start sm:items-center
          px-3 sm:px-0
        "
      >
        <li className="flex-shrink-0 min-w-[120px] sm:w-full">
          <button
            className={`w-full text-left sm:text-center px-4 py-2 rounded whitespace-nowrap ${
              selected === "farm-info"
                ? "bg-gray-200 dark:bg-gray-700 font-bold"
                : ""
            }`}
            onClick={() => onSelect("farm-info")}
          >
            Thông tin nông trại
          </button>
        </li>
        <li className="flex-shrink-0 min-w-[120px] sm:w-full">
          <button
            className={`w-full text-left sm:text-center px-4 py-2 rounded whitespace-nowrap ${
              selected === "plants"
                ? "bg-gray-200 dark:bg-gray-700 font-bold"
                : ""
            }`}
            onClick={() => onSelect("plants")}
          >
            Cây trồng
          </button>
        </li>
        <li className="flex-shrink-0 min-w-[120px] sm:w-full">
          <button
            className={`w-full text-left sm:text-center px-4 py-2 rounded whitespace-nowrap ${
              selected === "fertilizers"
                ? "bg-gray-200 dark:bg-gray-700 font-bold"
                : ""
            }`}
            onClick={() => onSelect("fertilizers")}
          >
            Phân bón
          </button>
        </li>
        <li className="flex-shrink-0 min-w-[120px] sm:w-full">
          <button
            className={`w-full text-left sm:text-center px-4 py-2 rounded whitespace-nowrap ${
              selected === "schedule"
                ? "bg-gray-200 dark:bg-gray-700 font-bold"
                : ""
            }`}
            onClick={() => onSelect("schedule")}
          >
            Lịch trình
          </button>
        </li>
      </ul>
    </div>
  );
}
