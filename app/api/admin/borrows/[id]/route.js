import db from "@/lib/db";
import { NextResponse } from "next/server";

// api/admin/books
export async function GET(request, { params: { id }}) {
  try {
    const borrow = await db.borrow.findUnique({
      where: {
        id
      },
      include: {
        book: true, 
        borrower: true, 
        approver: true, 
      },
    });

    return NextResponse.json(borrow);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลการยืม", error },
      { status: 500 }
    );
  }
}
