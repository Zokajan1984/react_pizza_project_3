import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/dbServer";
import { Category, Product, Order } from "@/types/pizza";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  if (type !== "categories" && type !== "products" && type !== "orders") {
    return NextResponse.json(
      { error: "Некорректный параметр type" },
      { status: 400 },
    );
  }

  const db = await readDb();

  return NextResponse.json(db[type]);
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  if (type !== "categories" && type !== "products" && type !== "orders") {
    return NextResponse.json(
      { error: "Некорректный параметр type" },
      { status: 400 },
    );
  }

  const body = await request.json();
  const db = await readDb();

  const existingIds = db[type].map((item) => item.id);
  const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

  const newItem = { ...body, id: newId };

  db[type].push(newItem);
  await writeDb(db);

  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const idParam = searchParams.get("id");

  if (type !== "categories" && type !== "products" && type !== "orders") {
    return NextResponse.json(
      { error: "Некорректный параметр type" },
      { status: 400 },
    );
  }

  if (!idParam) {
    return NextResponse.json(
      { error: "Параметр id обязятелен" },
      { status: 400 },
    );
  }

  const id = Number(idParam);
  const body = await request.json();
  const db = await readDb();

  const itemIndex = db[type].findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return NextResponse.json(
      { error: "Элемент с такими id не найден" },
      { status: 404 },
    );
  }

  db[type][itemIndex] = { ...db[type][itemIndex], ...body, id };
  await writeDb(db);

  return NextResponse.json(db[type][itemIndex]);
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const idParam = searchParams.get("id");

  if (type !== "categories" && type !== "products" && type !== "orders") {
    return NextResponse.json(
      { error: "Некорректный параметр type" },
      { status: 400 },
    );
  }

  if (!idParam) {
    return NextResponse.json(
      { error: "Параметр id обязателен" },
      { status: 400 },
    );
  }

  const id = Number(idParam);
  const db = await readDb();

  const itemIndex = db[type].findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return NextResponse.json(
      { error: "Элемент с таким id не найден" },
      { status: 404 },
    );
  }

  db[type].splice(itemIndex, 1);
  await writeDb(db);

  return NextResponse.json({ success: true });
}
