import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const existingBook = await db.book.findUnique({
      where: {
        id,
      },
      include: {
        activities:true
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
    return NextResponse.json(existingBook);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ", error },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  try {
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
    const deletedBook = await db.book.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedBook);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการลบหนังสือ", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const {
      title,
      slug,
      price,
      quantity,
      remaining,
      author,
      imageUrls,
      imageUrl = imageUrls[0],
      description,
      categoryId,
      adminId,
    } = await request.json();

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
      data:{
        title,
        slug,
        price: parseInt(price),
        quantity: parseInt(quantity),
        remaining: parseInt(remaining),
        author,
        // status,
        imageUrl,
        imageUrls,
        description,
        categoryId,
      }
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
