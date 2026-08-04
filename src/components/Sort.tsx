"use client";

import { use, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { useSortStore, SortTepy } from "@/store/useSortStore";
import { buffer } from "stream/consumers";

const sortLables: Record<SortTepy, string> = {
  rating: "По популярности",
  priceAsc: "Цена: по возрастанию",
  priceDesc: "Цена: по убиванию",
  alphabet: "По алфавиту",
};

export default function Sort() {
  const [isOpen, setIsopen] = useState(false);

  const sortType = useSortStore((state) => state.sortType);
  const setSortType = useSortStore((state) => state.setSortType);

  const sortOptions = Object.keys(sortLables) as SortTepy[];

  function handleSelect(type: SortTepy) {
    setSortType(type);
    setIsopen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsopen(!isOpen)}
        className={
          "flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-[#1f2937] font-medium transition-colors"
        }
      >
        <ArrowUpDown className="w-4 h-4" />
        {sortLables[sortType]}
      </button>

      {isOpen && (
        <div
          className={
            "absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-40"
          }
        >
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={
                "w-full text-left px-4 py-2 text-sm transition-colors " +
                (sortType === option
                  ? "text-[#fe5f1e] font-semibold"
                  : "text-[#1f2937] hover:bg-gray-50")
              }
            >
              {sortLables[option]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
