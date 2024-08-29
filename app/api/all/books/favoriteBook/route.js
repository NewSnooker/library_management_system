// api/books
import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function POST(request) {
  try {
    const { userId, bookId } = await request.json();

    // ตรวจสอบว่าหนังสือเล่มนี้อยู่ในรายการโปรดอยู่แล้วหรือไม่
    const existingFavorite = await db.favoriteBook.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { message: "หนังสือเล่มนี้อยู่ในรายการโปรดแล้ว" },
        { status: 400 }
      );
    }

    // เพิ่มหนังสือในรายการโปรด
    const newFavorite = await db.favoriteBook.create({
      data: {
        userId,
        bookId,
      },
    });

    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการเพิ่มหนังสือในรายการโปรด", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { userId, bookId } = await request.json();

    // ตรวจสอบว่าหนังสือเล่มนี้อยู่ในรายการโปรดหรือไม่
    const existingFavorite = await db.favoriteBook.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    if (!existingFavorite) {
      return NextResponse.json(
        { message: "หนังสือเล่มนี้ไม่ได้อยู่ในรายการโปรด" },
        { status: 404 }
      );
    }

    // ลบหนังสือออกจากรายการโปรด
    await db.favoriteBook.delete({
      where: {
        id: existingFavorite.id,
      },
    });

    return NextResponse.json(
      { message: "ลบหนังสือออกจากรายการโปรดเรียบร้อยแล้ว" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการลบหนังสือออกจากรายการโปรด", error },
      { status: 500 }
    );
  }
}
