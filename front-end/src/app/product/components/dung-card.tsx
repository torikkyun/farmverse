import Image from "next/image";
import { DungItem } from "../[slug]/types";

interface DungCardProps {
  dungs: DungItem;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function DungCard({ dungs, selected, onSelect }: DungCardProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`group bg-white border rounded-lg p-0 flex flex-col items-stretch text-black relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer
        ${
          selected
            ? "border-black ring-2 ring-gray-300"
            : "border-gray-200 hover:border-gray-400"
        }
        h-full w-full`}
    >
      <div className="relative">
        <Image
          src={
            Array.isArray(dungs.images) && dungs.images.length > 0
              ? dungs.images[0]
              : "/no-image.png"
          }
          alt={dungs.name}
          width={200}
          height={200}
          className="w-full h-60 object-cover rounded-t-lg transition-all duration-300 group-hover:scale-105"
          priority
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect(dungs.id);
          }}
          className={`absolute top-2 right-2 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 shadow-md
            ${
              selected
                ? "bg-black text-white opacity-100 scale-100"
                : "bg-white/95 text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:text-black scale-90 group-hover:scale-100"
            }
          `}
          title={selected ? "Bỏ chọn" : "Thêm vào giỏ hàng"}
        >
          {selected ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 flex flex-col px-3 py-3 gap-1">
        <h3 className="font-medium text-sm text-gray-900 truncate group-hover:text-black transition-colors leading-tight">
          {dungs.name}
        </h3>

        <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            SL: {dungs.quantity ?? 1}
          </span>
        </div>

        <div className="mt-2 pt-1 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <span className="font-bold text-base text-black">
              {dungs.price}
              <span className="text-base font-medium text-gray-600 ml-1">
                FVT
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
