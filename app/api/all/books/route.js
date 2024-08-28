// api/books
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const books = await db.book.findMany({
      where: {
        active: true,
      },
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json(books, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ", error },
      { status: 500 }
    );
  }
}