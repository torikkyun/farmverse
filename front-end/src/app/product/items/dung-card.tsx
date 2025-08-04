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
      className={`group bg-white border-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2
        ${
          selected
            ? "border-black ring-4 ring-black/20 shadow-2xl scale-105"
            : "border-gray-200 hover:border-black/50"
        }
        h-full w-full`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Image
          src={
            Array.isArray(dungs.images) && dungs.images.length > 0
              ? dungs.images[0]
              : "/no-image.png"
          }
          alt={dungs.name}
          width={280}
          height={220}
          className={`w-full h-48 object-cover transition-all duration-500 ${
            selected ? "scale-110" : "group-hover:scale-110"
          }`}
          priority
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            selected ? "bg-black/20" : "bg-black/0 group-hover:bg-black/10"
          }`}
        />

        {/* Select Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect(dungs.id);
          }}
          className={`absolute top-3 right-3 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 border-2
            ${
              selected
                ? "bg-black text-white border-black scale-100 opacity-100"
                : "bg-white/90 text-black border-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 hover:bg-black hover:text-white"
            }
          `}
          title={selected ? "Bỏ chọn" : "Thêm vào giỏ hàng"}
        >
          {selected ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
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

        {/* Stock Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full border border-black/20">
            <span className="text-xs font-semibold">
              Còn lại: {dungs.stock}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg text-black leading-tight group-hover:text-gray-800 transition-colors">
          {dungs.name}
        </h3>

        {/* Separator */}
        <div
          className={`w-full h-px transition-all duration-300 ${
            selected ? "bg-black" : "bg-gray-200 group-hover:bg-black/50"
          }`}
        />

        {/* Price */}
        <div className="flex items-center justify-center">
          <div
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              selected
                ? "bg-black text-white"
                : "bg-gray-100 text-black group-hover:bg-black group-hover:text-white"
            }`}
          >
            <span className="font-black text-xl">
              {dungs.price.toLocaleString()}
            </span>
            <span className="text-sm font-medium ml-2 opacity-80">FVT</span>
          </div>
        </div>

        {/* Selection Indicator */}
        {selected && (
          <div className="flex items-center justify-center pt-2">
            <div className="bg-black/10 text-black px-3 py-1 rounded-full border border-black/20">
              <span className="text-xs font-bold">✓ Đã chọn</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
