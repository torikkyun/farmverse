import React, { useState } from "react";
import DungCard from "./dung-card";

interface DungItem {
  id: number;
  image: string;
  name: string;
  price: number;
  description?: string;
  type?: string;
  quantity?: number;
}

interface DungListProps {
  dungs: DungItem[];
  selectedId: number | null;
  onSelect: (id: string) => void;
}

export default function DungList({ dungs, selectedId, onSelect }: DungListProps) {
  const [showAll, setShowAll] = useState(false);
  const maxCards = 12;
  const visibleDungs = showAll ? dungs : dungs.slice(0, maxCards);

  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {visibleDungs.map((dung) => (
          <DungCard
            key={dung.id}
            dungs={dung}
            selected={selectedId === dung.id}
            onSelect={onSelect}
          />
        ))}
      </div>
      {dungs.length > maxCards && !showAll && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-900 transition"
            onClick={() => setShowAll(true)}
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
}