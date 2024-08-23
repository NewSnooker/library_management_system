import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        book: true,
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
export async function DELETE(request, { params: { id } }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        id,
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
    const booksInCategory = await db.book.findMany({
      where: {
        categoryId: id,
      },
    });

    if (booksInCategory.length > 0) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่สามารถลบหมวดหมู่นี้ได้ เนื่องจากมีหนังสือที่ใช้งานอยู่",
        },
        { status: 409 }
      );
    }
    const deletedCategory = await db.category.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการลบหมวดหมู่", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const { title, slug, imageUrl, description, adminId } =
      await request.json();

    const existingCategory = await db.category.findUnique({
      where: {
        id,
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
    const updateCategory = await db.category.update({
      where: {
        id,
      },
      data: { title, slug, imageUrl, description },
    });

    await db.activity.create({
      data: {
        type: "UPDATE_CATEGORY",
        categoryId: updateCategory.id,
        userProfileId: adminId,
      },
    });
    console.log("UPDATE_CATEGORY");

    return NextResponse.json(updateCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัพเดทหมวดหมู่", error },
      { status: 500 }
    );
  }
}
