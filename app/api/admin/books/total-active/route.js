import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;
// api/admin/books/total-active
export async function GET(request) {
  try {
    // นับจำนวนหนังสือทั้งหมด
    const totalBooks = await db.book.count();

    // นับจำนวนหนังสือที่ active เป็น true
    const totalActiveBooks = await db.book.count({
      where: {
        active: true, // กรองเฉพาะหนังสือที่ active เป็น true
      },
    });

    return NextResponse.json({ totalBooks, totalActiveBooks });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการนับจำนวนหนังสือ", error },
      { status: 500 }
    );
  }
}
