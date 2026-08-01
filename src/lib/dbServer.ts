import fs from "fs/promises";
import path from "path";
import { Category, Product, Order } from "@/types/pizza";

const dbPath = path.join(process.cwd(), "src", "data", "db.json");

interface Database {
  categories: Category[];
  products: Product[];
  orders: Order[];
}

export async function readDb(): Promise<Database> {
  const fileContent = await fs.readFile(dbPath, "utf-8");
  const data: Database = JSON.parse(fileContent);
  return data;
}

export async function writeDb(data: Database): Promise<void> {
  const jsonString = JSON.stringify(data, null, 2);
  await fs.writeFile(dbPath, jsonString, "utf-8");
}
