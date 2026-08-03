"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Category } from "@/types/pizza";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const selectedCategoryId = useCategoryStore(
    (state) => state.selectedCategoryId,
  );

  const setSelectedCategoryId = useCategoryStore(
    (state) => state.setSelectedCategoryId,
  );

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get<Category[]>("/manage?type=categories");
      setCategories(response.data);
    }

    fetchCategories();
  }, []);
  return (
    <div className={"flex items-center gap-2 overflow-x-auto pb-2"}>
      <button
        className={
          "shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors " +
          (selectedCategoryId === null
            ? "bg-[#fe5f1e] text-white"
            : "bg-gray-100 text-[#1f2937] hover:bg-gray-200")
        }
        onClick={() => setSelectedCategoryId(null)}
      >
        Все
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategoryId(category.id)}
          className={
            "shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors " +
            (selectedCategoryId === category.id
              ? "bg-[#fe5f1e] text-white"
              : "bg-gray-100 text-[#1f2937] hover:bg-gray-200")
          }
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
