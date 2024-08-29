// api/books
import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request, { params: { id } }) {
  try {
    if (!id) {
      return NextResponse.json(
        { message: "ไม่มี userId ใน พารามิเตอร์" },
        { status: 400 }
      );
    }
    // console.log(id);

    const favoriteBooks = await db.favoriteBook.findMany({
      where: {
        userId: id,
      },
      include: {
        book: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (favoriteBooks.length === 0) {
      return NextResponse.json(
        [],
        { message: "ไม่มีหนังสือในรายการโปรด" },
        { status: 404 }
      );
    }

    return NextResponse.json(favoriteBooks, {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
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
