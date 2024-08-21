import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params: { id } }) {
  try {
    const { status, adminId } = await request.json();
    const existingBook = await db.book.findUnique({
      where: {
        id,
      },
    });
    if (!existingBook) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบหนังสือนี้",
        },
        { status: 404 }
      );
    }
    const updateBook = await db.book.update({
      where: {
        id,
      },
      data: {
        status,
        updaterId: adminId,
      },
    });
    return NextResponse.json(updateBook);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัพเดทหนังสือ", error },
      { status: 500 }
    );
  }
}
