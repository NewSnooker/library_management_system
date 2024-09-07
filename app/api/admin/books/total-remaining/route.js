import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;
// api/admin/books/total-remaining
export async function GET(request) {
  try {
    // รวมจำนวน remaining ของหนังสือทั้งหมด
    const totalRemaining = await db.book.aggregate({
      _sum: {
        remaining: true,
      },
    });

    return NextResponse.json({ totalRemaining: totalRemaining._sum.remaining || 0 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการนับจำนวนหนังสือทั้งหมดใน quantity", error },
      { status: 500 }
    );
  }
}
