import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        book: true,
      },
    });
    // console.log(books);
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ", error },
      { status: 500 }
    );
  }
}
