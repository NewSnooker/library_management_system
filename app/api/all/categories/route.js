import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;

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
    return NextResponse.json(categories, {
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
