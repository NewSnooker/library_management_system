import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const books = await db.book.findMany({
      orderBy: {
        title: "desc",
      },
    });
// console.log(books);
    return NextResponse.json(books);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ", error },
      { status: 500 }
    );
  }
}
