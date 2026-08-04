import { ReactNode } from "react";

export type DoughType = 0 | 1;

export interface ProductVarinat {
  size: number;
  type: DoughType;
  price: number;
}

export interface Category {
  name: ReactNode;
  id: number;
  nama: string;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  imageUrl: string;
  variants: ProductVarinat[];
  ingredients?: string[];
  rating: number;
}

export interface CartItem {
  cartItemId: string;
  productId: number;
  name: string;
  imageUrl: string;
  size: number;
  type: DoughType;
  price: number;
  quantity: number;
}

export type OrderStatus =
  | "new"
  | "cooking"
  | "delivering"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: number;
  name: string;
  imageUrl: string;
  size: number;
  type: DoughType;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  phone: string;
  name: string;
  address?: string;
  comment?: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}
