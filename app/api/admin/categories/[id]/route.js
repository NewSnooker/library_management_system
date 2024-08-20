import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
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
    const deletedCategory = await db.category.delete({
      where: {
        id,
      },
      include: {
        //เป็นการ cascade
        products: true,
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
    const { title, slug, imageUrl, description } =
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
      data: { title, slug, imageUrl, description, },
    });
    return NextResponse.json(updateCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัพเดทหมวดหมู่", error },
      { status: 500 }
    );
  }
}
