"use client";

import Link from "next/link";
import { Pizza, Search, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useSearchStore } from "@/store/useSearchStore";
import { formatPrice } from "@/lib/utils";

export default function Header() {
  const totalCount = useCartStore((state) => state.getTotalCount());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const searchValue = useSearchStore((state) => state.searchValue);
  const setSearchValue = useSearchStore((state) => state.setSearchValue);

  return (
    <header
      className={
        "sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      }
    >
      <div
        className={
          "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4"
        }
      >
        <Link href="/" className={"flex items-center gap-2 shrink-0"}>
          <div
            className={
              "flex items-center justify-center w-10 h-10 rounded-full bg-[#fe5f1e]"
            }
          >
            <Pizza className="w-6 h-6 text-white" />
          </div>
          <span className={"text-xl font-bold text-[#1f2937] hidden sm:block"}>
            Pizza House
          </span>
        </Link>

        <div className={"flex-1 max-w-md relative"}>
          <Search
            className={
              "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            }
          />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Найти пиццу..."
            className={
              "w-full pl-11 pr-4 py-2.5 rounded-full bg-gray-100 text-sm text-[#1f2937] border border-transparent focus:border-[#fe5f1e] focus:bg-white transition-colors"
            }
          />
        </div>

        <Link
          href="/cart"
          className={
            "flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#fe5f1e] text-white text-sm font-semibold shrink-0 relative"
          }
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:block">{formatPrice(totalPrice)}</span>
          {totalCount > 0 && (
            <span
              className={
                "absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#fe5f1e] text-xs font-bold"
              }
            >
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
