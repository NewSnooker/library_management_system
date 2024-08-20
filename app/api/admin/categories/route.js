import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, slug, imageUrl, description } =
      await request.json();
    const newCategory = {
      title,
      slug,
      imageUrl,
      description,
    };
    console.log(newCategory);
    
    const exitingCategory = await db.category.findUnique({
      where: {
        slug,
      },
    });
    if (exitingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "มีหมวดหมู่นี้อยู่แล้ว",
        },
        { status: 409 }
      );
    }
    const category = await db.category.create({
      data: newCategory,
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการสร้างหมวดหมู่", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const category = await db.category.findMany({
      orderBy: {
        title: "desc",
      },
      include:{
        book: true
      }
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่", error },
      { status: 500 }
    );
  }
}

