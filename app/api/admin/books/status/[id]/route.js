import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params: { id } }) {
  try {
    const { adminId, status } = await request.json();
    const isActive =
      status === "true" ? true : status === "false" ? false : null;

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
        active: isActive,
      },
    });

    await db.activity.create({
      data: {
        type: "UPDATE_BOOK",
        bookId: updateBook.id,
        userProfileId: adminId,
      },
    });
    console.log("UPDATE_BOOK");

    return NextResponse.json(updateBook);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัพเดทหนังสือ", error },
      { status: 500 }
    );
  }
}
