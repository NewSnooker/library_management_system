import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: true,
      },
    });
    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบหมวดหมู่นี้",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(existingCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่", error },
      { status: 500 }
    );
  }
}
