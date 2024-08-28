import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";

export async function GET(request, { params: { slug } }) {
  try {
    const book = await db.book.findUnique({
      where: {
        slug,
      },
      include:{
        category:true
      }
    });
    // console.log(books);
    if (!book) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบหนังสือเล่มนี้",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(book, {
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
