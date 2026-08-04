"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { Product } from "@/types/pizza";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

interface PizzaCardPrps {
  product: Product;
}

const doughLabels = {
  0: "Тонкое",
  1: "Традитционное",
};

export default function PizzaCard({ product }: PizzaCardPrps) {
  const availableSizes = Array.from(
    new Set(product.variants.map((variant) => variant.size)),
  );
  const availableTypes = Array.from(
    new Set(product.variants.map((variant) => variant.type)),
  );

  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
  const [selectedType, setSelectedType] = useState(availableTypes[0]);

  const addItem = useCartStore((state) => state.addItem);

  const currentVariant = product.variants.find(
    (variant) => variant.size === selectedSize && variant.type === selectedType,
  );

  function handleAddToCart() {
    if (!currentVariant) return;

    addItem(product, selectedSize, selectedType, currentVariant.price);
  }
  return (
    <div
      className={
        "flex flex-col items-center bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
      }
    >
      <div
        className={
          "relative w-40 h-40 rounded-full overflow-hidden bg-gray-100 mb-4"
        }
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className={"text-base font-bold text-[#1f2937] text-center"}>
        {product.name}
      </h3>
      {product.ingredients && (
        <p className={"text-xs text-gray-400 text-center mt-1 line-clamp-2"}>
          {product.ingredients.join(", ")}
        </p>
      )}

      <div
        className={"flex items-center gap-1 bg-gray-100 rounded-full p-1 mt-4"}
      >
        {availableTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (selectedType === type
                ? "bg-white text-[#1f2937] shadow-sm"
                : "text-gray-500")
            }
          >
            {doughLabels[type]}
          </button>
        ))}
      </div>

      <div
        className={"flex items-center gap-1 bg-gray-100 rounded-full p-1 mt-2"}
      >
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (selectedSize === size
                ? "bg-white text-[#1f2937] shadow-sm"
                : "text-gray-500")
            }
          >
            {size} см
          </button>
        ))}
      </div>

      <div className={"flex items-center justify-between w-full mt-4"}>
        <span className={"text-lg font-extrabold text-[#1f2937]"}>
          {currentVariant ? formatPrice(currentVariant.price) : "-"}
        </span>

        <button
          onClick={handleAddToCart}
          className={
            "flex items-center gap-1 px-4 py-2 rounded-xl bg-[#fe5f1e] hover:bg-[#e5540f] text-white text-sm font-semibold transition-colors"
          }
        >
          <Plus className="w-4 h-4" />
          Добавить
        </button>
      </div>
    </div>
  );
}
