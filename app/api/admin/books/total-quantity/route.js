import db from "@/lib/db";
import { NextResponse } from "next/server";

// api/admin/books/total-quantity
export async function GET(request) {
  try {
    // รวมจำนวน quantity ของหนังสือทั้งหมด
    const totalQuantity = await db.book.aggregate({
      _sum: {
        quantity: true,
      },
    });

    return NextResponse.json({ totalQuantity: totalQuantity._sum.quantity || 0 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการนับจำนวนหนังสือทั้งหมดใน quantity", error },
      { status: 500 }
    );
  }
}
