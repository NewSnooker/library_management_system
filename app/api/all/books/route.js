// api/books
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const books = await db.book.findMany({
      where: {
        active: false,
      },
      orderBy: {
        title: "asc",
      },
    });
    // console.log(books);
    return NextResponse.json(books, {
      headers: { "Cache-Control": "no-cache" },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ", error },
      { status: 500 }
    );
  }
}
