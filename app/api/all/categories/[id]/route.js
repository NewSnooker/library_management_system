import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const categories = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        book: {
          where: {
            active: true,
          },
          orderBy: {
            title: "asc",
          },
          take: 10,// จำกัดจำนวนหนังสือที่ดึงมา
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
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่", error },
      { status: 500 }
    );
  }
}
