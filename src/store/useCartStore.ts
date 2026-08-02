import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, DoughType } from "@/types/pizza";

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    size: number,
    type: DoughType,
    price: number,
  ) => void;
  removeItem: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, type, price) => {
        const cartItemId = product.id + "-" + size + "-" + type;

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.cartItemId === cartItemId,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.cartItemId === cartItemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          const newItem: CartItem = {
            cartItemId,
            productId: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            size,
            type,
            price,
            quantity: 1,
          };

          return { item: [...state.items, newItem] };
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      increaseQuantity: (cartItemId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },

      decreaseQuantity: (cartItemId) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.cartItemId === cartItemId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
      getTotalPrice: () => {
        const items = get().items;
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTotalCount: () => {
        const itmes = get().items;
        return itmes.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "pizza-cart-storage",
    },
  ),
);
