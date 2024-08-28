import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";

export async function GET(request) {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const books = await db.book.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

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
