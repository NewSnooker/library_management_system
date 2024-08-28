import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request, { params: { slug } }) {
  try {
    const categories = await db.category.findUnique({
      where: {
        slug,
      },
      include: {
        book: {
          where: {
            active: true,
          },
          orderBy: {
            title: "asc",
          },
        },
      },
    });
    if (!categories) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบหนังสือหมวดหมู่นี้",
        },
        { status: 404 }
      );
    }
    // console.log(books);
    return NextResponse.json(categories, {
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
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่", error },
      { status: 500 }
    );
  }
}
