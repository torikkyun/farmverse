import Image from "next/image";
import { DungItem } from "../[slug]/types";
import { ShoppingCart, Check, Sprout, Package } from "lucide-react";

interface DungCardProps {
  dungs: DungItem;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function DungCard({ dungs, selected, onSelect }: DungCardProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`group bg-white border-2 rounded-2xl overflow-hidden flex flex-col h-full relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]
        ${
          selected
            ? "border-black ring-2 ring-gray-300 shadow-gray-200"
            : "border-gray-200 hover:border-gray-300"
        }`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Image
          src={
            Array.isArray(dungs.images) && dungs.images.length > 0
              ? dungs.images[0]
              : "/no-image.png"
          }
          alt={dungs.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Select Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect(dungs.id);
          }}
          className={`absolute top-3 right-3 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm border
            ${
              selected
                ? "bg-black text-white border-gray-700 scale-100 opacity-100"
                : "bg-white/90 text-gray-700 border-white/50 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110"
            }
          `}
          title={selected ? "Đã chọn" : "Thêm vào giỏ hàng"}
        >
          {selected ? (
            <Check className="w-5 h-5" />
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )}
        </button>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
            <Sprout className="w-3 h-3" />
            Phân bón
          </div>
        </div>

        {/* Stock Badge */}
        {dungs.stock && dungs.stock > 0 && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-black/80 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 backdrop-blur-sm">
              <Package className="w-4 h-4" />
              SL: {dungs.stock}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-4">
        {/* Title */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-black transition-colors duration-300 leading-tight mb-2">
            {dungs.name}
          </h3>

          {/* Description if available */}
          {dungs.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {dungs.description}
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-black text-green-600">
                    {dungs.price}
                  </span>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    FVT
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  mỗi gói phân
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-3 text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelect(dungs.id);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer hover:scale-105 shadow-md
              ${
                selected
                  ? "bg-black text-white border border-gray-700 hover:bg-gray-800"
                  : "bg-black text-white border border-black hover:bg-gray-800"
              }`}
              title={selected ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
            >
              {selected ? (
                <>
                  <Check className="w-4 h-4" />
                  Đã thêm vào giỏ
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Thêm vào giỏ hàng
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Selection Overlay */}
      {selected && (
        <div className="absolute inset-0 bg-black/5 rounded-2xl pointer-events-none" />
      )}
    </div>
  );
}
