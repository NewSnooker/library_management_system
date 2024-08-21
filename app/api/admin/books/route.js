import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      title,
      slug,
      price,
      quantity,
      author,
      imageUrls,
      imageUrl = imageUrls[0],
      description,
      categoryId,
      adminId,
    } = await request.json();
    const newBook = {
      title,
      slug,
      price: parseInt(price),
      quantity: parseInt(quantity),
      remaining: parseInt(quantity),
      author,
      imageUrl,
      imageUrls,
      description,
      categoryId,
      creatorId: adminId,
    };

    const exitingBook = await db.book.findUnique({
      where: {
        slug,
      },
    });
    if (exitingBook) {
      return NextResponse.json(
        {
          data: null,
          message: "มีหนังสือนี้อยู่แล้ว",
        },
        { status: 409 }
      );
    }
    const res = await db.book.create({
      data: newBook,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการสร้างหนังสือ", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const books = await db.book.findMany({
      orderBy: {
        title: "desc",
      },
      include:{
        category: true,
        creator: true,
        updater: true,
      }
    });
    const processedBooks = books.map(item => ({
      ...item,
      creator: item.creator?.username || null,
      updater: item.updater?.username || null,
    }));
    return NextResponse.json(processedBooks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ", error },
      { status: 500 }
    );
  }
}
